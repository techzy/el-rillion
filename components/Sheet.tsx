"use client";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "./AuthProvider";
import { Resistor } from "./Tier";
import { Sweep } from "./Sweep";
import { lsDel, lsGet, lsSet, rpc, sb } from "@/lib/supabase";
import { MAX_SCORE, PROMPTS_PER_SHEET, PROMPT_SECONDS, SITE_URL, tierFor } from "@/lib/tiers";
import type { Daily, GuessResult, Sheet as SheetT, SheetItem } from "@/lib/types";

type Props = { mode: "daily" | "pack"; packId?: string; chapter?: number };

export function Sheet({ mode, packId, chapter }: Props) {
  const { ready, session, stats, refresh } = useAuth();
  const [phase, setPhase] = useState<"loading" | "intro" | "sheet" | "error">("loading");
  const [error, setError] = useState("");
  const [daily, setDaily] = useState<Daily | null>(null);
  const [packName, setPackName] = useState("");
  const [sheet, setSheet] = useState<SheetT | null>(null);
  const [reveal, setReveal] = useState<number | null>(null); // idx whose result card is showing
  const [guess, setGuess] = useState("");
  const [shake, setShake] = useState(0);
  const [missText, setMissText] = useState("");
  const [now, setNow] = useState(Date.now());
  const offset = useRef(0);
  const busy = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const apply = useCallback((s: SheetT) => {
    offset.current = Date.parse(s.server_now) - Date.now();
    setSheet(s);
    setPhase("sheet");
  }, []);

  // ---------- load ----------
  useEffect(() => {
    if (!ready) return;
    let cancelled = false;
    (async () => {
      try {
        let key: string;
        if (mode === "daily") {
          const d = await rpc<Daily>("get_daily");
          if (cancelled) return;
          setDaily(d);
          key = `elr:sheet:daily:${d.daily_date}`;
        } else {
          const { data } = await sb().from("packs").select("name").eq("id", packId!).single<{ name: string }>();
          if (!data) throw new Error("That pack doesn't exist.");
          setPackName(data.name);
          key = `elr:sheet:pack:${packId}:${chapter}`;
        }
        // Resume: a signed-in player's daily lives on the server; anything else is remembered in this browser.
        const resumeId = mode === "daily" && session ? stats?.today?.play_id ?? null : lsGet(key);
        if (resumeId) {
          try {
            const s = await rpc<SheetT>("get_play", { p_play: resumeId });
            if (cancelled) return;
            if (!s.finished || mode === "daily") return apply(s);
          } catch { lsDel(key); }
        }
        if (!cancelled) setPhase("intro");
      } catch (e: any) {
        if (!cancelled) { setError(e.message ?? String(e)); setPhase("error"); }
      }
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, mode, packId, chapter, session?.user.id, stats?.today?.play_id]);

  const current: SheetItem | undefined = sheet?.items.find((i) => i.state !== "done");
  const active = current?.state === "active" ? current : undefined;
  const remaining = active?.ends_at ? Date.parse(active.ends_at) - (now + offset.current) : PROMPT_SECONDS * 1000;

  const call = useCallback(async (fn: string, args: Record<string, unknown>) => {
    if (busy.current) return null;
    busy.current = true;
    try { return await rpc<SheetT>(fn, args); }
    catch (e: any) { setError(e.message); return null; }
    finally { busy.current = false; }
  }, []);

  const startSheet = async () => {
    setPhase("loading");
    try {
      const s = await rpc<SheetT>("start_play", { p_mode: mode, p_pack: packId ?? null, p_chapter: chapter ?? null });
      lsSet(mode === "daily" ? `elr:sheet:daily:${s.daily_date}` : `elr:sheet:pack:${packId}:${chapter}`, s.play_id);
      apply(s);
      if (session) refresh();
    } catch (e: any) { setError(e.message); setPhase("error"); }
  };

  const startItem = async (idx: number) => {
    if (!sheet) return;
    setReveal(null); setMissText(""); setGuess("");
    const s = await call("start_item", { p_play: sheet.play_id, p_idx: idx });
    if (s) { apply(s); setTimeout(() => inputRef.current?.focus(), 30); }
  };

  const timeOut = useCallback(async () => {
    if (!sheet || !active) return;
    const idx = active.idx;
    const s = await call("skip_item", { p_play: sheet.play_id, p_idx: idx });
    if (s) { apply(s); setReveal(idx); if (session) refresh(); }
  }, [sheet, active, call, apply, session, refresh]);

  // ---------- clock ----------
  useEffect(() => {
    if (!active) return;
    const t = setInterval(() => setNow(Date.now()), 100);
    return () => clearInterval(t);
  }, [active]);
  useEffect(() => { if (active && remaining <= 0) timeOut(); }, [active, remaining, timeOut]);

  // Enter advances between prompts.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Enter" || active || !current || phase !== "sheet") return;
      e.preventDefault();
      startItem(current.idx);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const g = guess.trim();
    if (!g || !sheet || !active) return;
    setGuess("");
    try {
      const r = await rpc<GuessResult>("guess_item", { p_play: sheet.play_id, p_idx: active.idx, p_guess: g });
      if (r.status === "miss") { setShake((n) => n + 1); setMissText(`✗ "${g}" isn't on the list`); return; }
      const idx = active.idx;
      const s = await rpc<SheetT>("get_play", { p_play: sheet.play_id });
      apply(s); setReveal(idx);
      if (session) refresh();
    } catch (err: any) { setMissText(`Connection problem: ${err.message}`); }
  };

  // ---------- render ----------
  if (phase === "error") return <div className="panel"><p className="error">{error}</p><Link href="/">Back home</Link></div>;
  if (phase === "loading") return <div className="panel muted">Charging capacitors…</div>;

  const heading = mode === "daily" ? `El-rillion #${daily?.daily_number ?? sheet?.daily_number ?? ""}` : `${packName} · Chapter ${chapter}`;

  if (phase === "intro" || !sheet) {
    return (
      <div className="panel stack">
        <div className="eyebrow">{heading}{mode === "daily" && daily ? ` · ${daily.players} played today` : ""}</div>
        <div className="prompt-title">{PROMPTS_PER_SHEET} prompts. {PROMPT_SECONDS} seconds each. One answer.</div>
        <p className="muted" style={{ margin: 0 }}>
          Each prompt stays hidden until you start it. Your first correct answer locks in, and rarer answers are worth more.
          Every prompt hides one <span className="glow">Megaohm</span> worth 100. A perfect sheet is {MAX_SCORE}.
        </p>
        <div className="row"><button className="btn" onClick={startSheet}>Start ▶</button></div>
        {!session && <p className="notice">Playing as a guest. <Link href="/account">Sign in</Link> to save your score, keep a streak and appear on the leaderboards.</p>}
        {session && mode === "daily" && <p className="notice">Ranked: you get one attempt at the daily.</p>}
        {session && mode === "pack" && <p className="notice">Replays are allowed. Your best score on each prompt counts toward the pack leaderboard.</p>}
      </div>
    );
  }

  return (
    <div className="stack">
      <div className="panel">
        <div className="spread">
          <div className="eyebrow" style={{ margin: 0 }}>{heading} · {sheet.ranked ? "ranked" : "practice"}</div>
          <div className="label">Score <span className="glow" style={{ fontSize: 16, fontWeight: 800 }}>{sheet.total}</span> / {MAX_SCORE}</div>
        </div>
        <Slots items={sheet.items} />
      </div>

      {sheet.finished ? (
        <Summary sheet={sheet} heading={heading} packName={packName} chapter={chapter} signedIn={!!session} />
      ) : reveal !== null ? (
        <ResultCard item={sheet.items[reveal]} onNext={() => current && startItem(current.idx)} />
      ) : active ? (
        <div className="panel">
          <div className="hud">
            <div><div className="label">Prompt</div><div className="big-num">{active.idx + 1}<span className="muted" style={{ fontSize: 18 }}>/{PROMPTS_PER_SHEET}</span></div></div>
            <div className="center" style={{ textAlign: "center" }}>
              <div className="label">Time</div>
              <div className={`big-num ${remaining <= 5000 ? "crit" : remaining <= 10000 ? "warn" : ""}`}>{Math.max(0, Math.ceil(remaining / 1000))}</div>
            </div>
            <div className="score"><div className="label">Misses</div><div className="big-num">{active.misses}</div></div>
          </div>
          <Sweep progress={1 - remaining / (PROMPT_SECONDS * 1000)} />
          <div className="prompt-title" style={{ marginTop: 14 }}>{active.title}</div>
          <form onSubmit={submit} style={{ marginTop: 12 }}>
            <input
              ref={inputRef}
              key={shake}
              className={`input guess-input ${shake ? "shake" : ""}`}
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="Type one answer and press Enter"
              autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck={false}
              aria-label="Your answer"
              autoFocus
            />
          </form>
          <div className="feedback miss" aria-live="polite">{missText || <span className="muted">Wrong guesses are free. Keep trying until the trace runs out.</span>}</div>
          <div className="spread" style={{ marginTop: 8 }}>
            <span />
            <button className="btn danger small" onClick={timeOut}>Give up on this one</button>
          </div>
        </div>
      ) : current ? (
        <div className="panel stack">
          <div className="eyebrow">Prompt {current.idx + 1} of {PROMPTS_PER_SHEET}</div>
          <div className="prompt-title">Ready?</div>
          <p className="muted" style={{ margin: 0 }}>The prompt appears when you start, and the {PROMPT_SECONDS}-second trace begins.</p>
          <div className="row"><button className="btn" onClick={() => startItem(current.idx)}>Start prompt {current.idx + 1} ▶</button></div>
        </div>
      ) : null}
    </div>
  );
}

function Slots({ items }: { items: SheetItem[] }) {
  return (
    <div className="slots" aria-label="Sheet progress">
      {items.map((it) => {
        const t = tierFor(it.points);
        return (
          <div key={it.idx} className={`slot ${it.state}`} style={{ ["--c" as any]: it.state === "done" ? t.color : undefined }}
            title={it.state === "done" ? `${it.answer ?? "No answer"} · ${it.points} pts` : `Prompt ${it.idx + 1}`}>
            {it.state === "done" ? (it.points ?? 0) : it.idx + 1}
          </div>
        );
      })}
    </div>
  );
}

function ResultCard({ item, onNext }: { item: SheetItem; onNext: () => void }) {
  const t = tierFor(item.points);
  const last = item.idx === PROMPTS_PER_SHEET - 1;
  return (
    <div className={`panel stack ${item.megaohm ? "megaohm-card" : ""}`} style={{ ["--c" as any]: t.color }}>
      <div className="eyebrow">Prompt {item.idx + 1} · {item.title}</div>
      <div className="row" style={{ gap: 14 }}>
        <Resistor tier={t} width={56} />
        <div>
          <div className="tier-label" style={{ fontSize: 14 }}>{t.label} · {t.name.toUpperCase()}</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: "var(--c)" }}>{item.answer ?? "No answer"}</div>
          <div className="muted" style={{ fontSize: 13 }}>{t.line}</div>
        </div>
        <div className="big-num" style={{ marginLeft: "auto", color: "var(--c)" }}>+{item.points ?? 0}</div>
      </div>
      <div className="muted" style={{ fontSize: 13 }}>{item.accepted} accepted answers{item.misses ? ` · ${item.misses} miss${item.misses === 1 ? "" : "es"}` : ""}</div>
      {!last && <div className="row"><button className="btn" onClick={onNext} autoFocus>Next prompt ▶</button><span className="muted" style={{ fontSize: 12 }}>or press Enter</span></div>}
    </div>
  );
}

function Summary({ sheet, heading, packName, chapter, signedIn }: { sheet: SheetT; heading: string; packName: string; chapter?: number; signedIn: boolean }) {
  const [copied, setCopied] = useState(false);
  const megas = sheet.items.filter((i) => i.megaohm).length;
  const share = async () => {
    const text = [
      `EL-RILLION ${sheet.mode === "daily" ? `#${sheet.daily_number}` : `· ${packName} ch. ${chapter}`} ⚡`,
      `${sheet.total}/${MAX_SCORE}${megas ? ` · ${megas} Megaohm${megas > 1 ? "s" : ""}` : ""}`,
      sheet.items.map((i) => tierFor(i.points).emoji).join(""),
      `https://${SITE_URL}`,
    ].join("\n");
    try {
      if (navigator.share && /Mobi|Android/i.test(navigator.userAgent)) await navigator.share({ text });
      else { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1800); }
    } catch { /* cancelled */ }
  };
  return (
    <div className="panel stack">
      <div className="eyebrow">{heading} · sheet complete</div>
      <div className="row" style={{ alignItems: "baseline" }}>
        <div className="big-num" style={{ fontSize: 56 }}>{sheet.total}</div>
        <div className="muted">/ {MAX_SCORE}</div>
      </div>
      <div className="summary-rows">
        {sheet.items.map((i) => {
          const t = tierFor(i.points);
          return (
            <div key={i.idx} className="summary-row" style={{ ["--c" as any]: t.color }}>
              <Resistor tier={t} width={30} />
              <div className="nm">
                <div className="muted" style={{ fontSize: 12 }}>{i.title}</div>
                <div style={{ color: i.answer ? "var(--c)" : "var(--dim)", fontWeight: 700 }}>{i.answer ?? "No answer"}{i.megaohm ? " ⚡" : ""}</div>
              </div>
              <div className="meta"><span className="tier-label">{t.label}</span><br />+{i.points ?? 0}</div>
            </div>
          );
        })}
      </div>
      <div className="row">
        <button className="btn" onClick={share}>{copied ? "Copied ✓" : "Share result"}</button>
        {sheet.mode === "pack" && <Link className="btn ghost" href={`/packs/${sheet.pack_id}`}>Back to {packName}</Link>}
        {sheet.mode === "daily" && <Link className="btn ghost" href="/packs">Play a pack</Link>}
        <Link className="btn ghost" href="/leaderboard">Leaderboards</Link>
      </div>
      {!signedIn && <p className="notice">This sheet wasn&apos;t saved to a leaderboard. <Link href="/account">Sign in</Link> to rank your next one.</p>}
      <p className="muted" style={{ fontSize: 12, margin: 0 }}>The answer lists stay secret, so the next player can&apos;t look them up.</p>
    </div>
  );
}
