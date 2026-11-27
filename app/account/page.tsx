"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { rpc, sb } from "@/lib/supabase";

export default function AccountPage() {
  const { ready, session, stats, refresh } = useAuth();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [name, setName] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => { if (stats?.display_name) setName(stats.display_name); }, [stats?.display_name]);

  if (!ready) return <div className="panel muted">Loading…</div>;

  if (!session) {
    const send = async (e: React.FormEvent) => {
      e.preventDefault();
      setBusy(true); setErr("");
      const { error } = await sb().auth.signInWithOtp({
        email: email.trim(),
        options: { emailRedirectTo: `${window.location.origin}/account` },
      });
      setBusy(false);
      if (error) setErr(error.message); else setSent(true);
    };
    return (
      <div className="panel stack" style={{ maxWidth: 520 }}>
        <div className="eyebrow">Account</div>
        <h1>Sign in</h1>
        <p className="muted">No password needed. We&apos;ll email you a sign-in link. Signing in saves your scores, tracks your streak and puts you on the leaderboards.</p>
        {sent ? (
          <p className="notice">Check <strong>{email}</strong> for a link from EL-RILLION and open it in this browser. You can close this tab.</p>
        ) : (
          <form onSubmit={send} className="stack">
            <input className="input" type="email" required placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" aria-label="Email address" />
            <button className="btn" disabled={busy}>{busy ? "Sending…" : "Email me a sign-in link"}</button>
            {err && <p className="error">{err}</p>}
          </form>
        )}
      </div>
    );
  }

  const saveName = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(""); setSaved(false);
    try {
      const r = await rpc<{ ok: boolean; error?: string }>("set_display_name", { p_name: name.trim() });
      if (!r.ok) setErr(r.error ?? "Couldn't save."); else { setSaved(true); refresh(); }
    } catch (e: any) { setErr(e.message); }
  };

  return (
    <div className="stack">
      <div>
        <div className="eyebrow">Account</div>
        <h1>{stats?.display_name ?? "Welcome"}</h1>
        <p className="muted">Signed in as {session.user.email}</p>
      </div>
      <div className="panel stack" style={{ maxWidth: 520 }}>
        <h2>Display name</h2>
        <p className="muted" style={{ margin: 0 }}>This is how you appear on the leaderboards. Use 3 to 20 letters, numbers, dots, dashes or underscores.</p>
        <form onSubmit={saveName} className="row">
          <input className="input" style={{ flex: 1, minWidth: 180 }} value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. tesla_coil" aria-label="Display name" />
          <button className="btn">Save</button>
        </form>
        {saved && <p className="glow" style={{ margin: 0 }}>Saved ✓</p>}
        {err && <p className="error" style={{ margin: 0 }}>{err}</p>}
      </div>
      {stats && (
        <div className="stat-row">
          <div className="stat"><div className="label">Total points</div><div className="v">{stats.total_score}</div></div>
          <div className="stat"><div className="label">Dailies played</div><div className="v">{stats.dailies_played}</div></div>
          <div className="stat"><div className="label">Current streak</div><div className="v">{stats.current_streak}</div></div>
          <div className="stat"><div className="label">Best streak</div><div className="v">{stats.best_streak}</div></div>
          <div className="stat"><div className="label">Megaohms</div><div className="v">{stats.megaohms}</div></div>
          <div className="stat"><div className="label">Pack prompts</div><div className="v">{Object.keys(stats.pack_best ?? {}).length}/84</div></div>
        </div>
      )}
      <div className="row">
        <Link className="btn ghost" href="/leaderboard">Leaderboards</Link>
        <button className="btn danger" onClick={() => sb().auth.signOut()}>Sign out</button>
      </div>
    </div>
  );
}
