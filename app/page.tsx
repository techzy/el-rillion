"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { PackGrid } from "@/components/PackGrid";
import { rpc } from "@/lib/supabase";
import { MAX_SCORE, PROMPTS_PER_SHEET, PROMPT_SECONDS } from "@/lib/tiers";
import type { Daily } from "@/lib/types";

export default function Home() {
  const { session, stats } = useAuth();
  const [daily, setDaily] = useState<Daily | null>(null);
  useEffect(() => { rpc<Daily>("get_daily").then(setDaily).catch(() => {}); }, []);
  const today = stats?.today;

  return (
    <div className="stack">
      <section style={{ padding: "18px 0 8px" }}>
        <div className="eyebrow">The daily electrical-engineering word game</div>
        <h1>Name it before the <span className="glow">trace</span> runs out.</h1>
        <p className="tagline" style={{ fontSize: 17, margin: 0 }}>one in a megaohm.</p>
      </section>

      <div className="panel stack" style={{ borderColor: "var(--phosphor-dim)" }}>
        <div className="spread">
          <div>
            <div className="eyebrow">{daily ? `El-rillion #${daily.daily_number} · ${daily.daily_date}` : "Today"}</div>
            <h2 style={{ margin: 0 }}>Today&apos;s sheet</h2>
          </div>
          {daily && <span className="muted" style={{ fontSize: 13 }}>{daily.players} {daily.players === 1 ? "player" : "players"} today</span>}
        </div>
        <p className="muted" style={{ margin: 0 }}>
          {PROMPTS_PER_SHEET} electrical-engineering prompts, {PROMPT_SECONDS} seconds each. Your first correct answer locks in, and rarer
          answers score more. Each prompt hides a <span className="glow">Megaohm</span> worth 100 points. Max {MAX_SCORE}.
        </p>
        {session && today?.finished && <p style={{ margin: 0 }}>Today: <span className="glow" style={{ fontWeight: 800 }}>{today.total}</span> / {MAX_SCORE}</p>}
        <div className="row">
          <Link className="btn" href="/play/daily">{today?.finished ? "See today's sheet" : today ? "Continue today's sheet ▶" : "Play today's sheet ▶"}</Link>
          <Link className="btn ghost" href="/how-to-play">How it works</Link>
        </div>
      </div>

      {stats && (
        <div className="stat-row">
          <div className="stat"><div className="label">Current streak</div><div className="v">{stats.current_streak}</div></div>
          <div className="stat"><div className="label">Best streak</div><div className="v">{stats.best_streak}</div></div>
          <div className="stat"><div className="label">Total points</div><div className="v">{stats.total_score}</div></div>
          <div className="stat"><div className="label">Megaohms</div><div className="v">{stats.megaohms}</div></div>
        </div>
      )}
      {session && stats && !stats.display_name && (
        <p className="notice">Pick a display name on your <Link href="/account">account page</Link> so you show up on the leaderboards.</p>
      )}

      <section>
        <div className="spread" style={{ margin: "26px 0 12px" }}>
          <h2 style={{ margin: 0 }}>Themed packs</h2>
          <Link href="/packs" style={{ fontSize: 13 }}>All packs →</Link>
        </div>
        <PackGrid />
      </section>
    </div>
  );
}
