"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { usePacks } from "@/components/usePacks";
import { rpc } from "@/lib/supabase";

type Tab = "daily" | "alltime" | "pack" | "streaks";
const TABS: { id: Tab; label: string }[] = [
  { id: "daily", label: "Today" },
  { id: "alltime", label: "All-time" },
  { id: "pack", label: "Packs" },
  { id: "streaks", label: "Streaks" },
];

function Board() {
  const params = useSearchParams();
  const router = useRouter();
  const tab = (params.get("tab") as Tab) || "daily";
  const { packs } = usePacks();
  const packId = params.get("pack") || packs?.[0]?.id || "";
  const { stats } = useAuth();
  const [rows, setRows] = useState<any[] | null>(null);
  const [error, setError] = useState("");

  const go = (t: Tab, p?: string) => router.replace(`/leaderboard?tab=${t}${t === "pack" ? `&pack=${p ?? packId}` : ""}`);

  useEffect(() => {
    if (tab === "pack" && !packId) return;
    setRows(null); setError("");
    const call =
      tab === "daily" ? rpc("lb_daily", { p_date: null }) :
      tab === "alltime" ? rpc("lb_alltime") :
      tab === "pack" ? rpc("lb_pack", { p_pack_id: packId }) :
      rpc("lb_streaks");
    call.then((r) => setRows(r as any[])).catch((e) => setError(e.message));
  }, [tab, packId]);

  const me = stats?.display_name;
  const cols: Record<Tab, { key: string; label: string; n?: boolean }[]> = {
    daily: [{ key: "score", label: "Score /700", n: true }, { key: "megaohms", label: "MΩ", n: true }],
    alltime: [{ key: "score", label: "Points", n: true }, { key: "dailies", label: "Dailies", n: true }],
    pack: [{ key: "score", label: "Best /1400", n: true }, { key: "prompts_played", label: "Prompts", n: true }, { key: "megaohms", label: "MΩ", n: true }],
    streaks: [{ key: "best_streak", label: "Best", n: true }, { key: "current_streak", label: "Current", n: true }],
  };

  return (
    <div className="stack">
      <div>
        <div className="eyebrow">Leaderboards</div>
        <h1>Who has the highest resistance to forgetting?</h1>
        <p className="muted">Only signed-in players with a display name are ranked. Today ranks your one attempt at the daily sheet. All-time adds up your daily scores plus your best score on every pack prompt. Packs rank the sum of your best score on each prompt. A streak is consecutive days of playing the daily.</p>
      </div>
      <div className="panel">
        <div className="tabs" role="tablist">
          {TABS.map((t) => <button key={t.id} role="tab" className="tab" aria-selected={tab === t.id} onClick={() => go(t.id)}>{t.label}</button>)}
        </div>
        {tab === "pack" && packs && (
          <div className="tabs" role="tablist" aria-label="Pack">
            {packs.map((p) => <button key={p.id} className="tab" aria-selected={packId === p.id} onClick={() => go("pack", p.id)}>{p.name}</button>)}
          </div>
        )}
        {error && <p className="error">{error}</p>}
        {!rows && !error && <p className="muted">Measuring…</p>}
        {rows && rows.length === 0 && <p className="muted">No ranked players yet. Be the first.</p>}
        {rows && rows.length > 0 && (
          <div className="table-scroll">
            <table className="lb">
              <thead><tr><th>#</th><th>Player</th>{cols[tab].map((c) => <th key={c.key} className={c.n ? "n" : ""}>{c.label}</th>)}</tr></thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} className={me && r.display_name === me ? "me" : ""}>
                    <td>{r.rank}</td>
                    <td>{r.display_name}</td>
                    {cols[tab].map((c) => <td key={c.key} className="n">{r[c.key]}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default function LeaderboardPage() {
  return <Suspense fallback={<div className="panel muted">Loading…</div>}><Board /></Suspense>;
}
