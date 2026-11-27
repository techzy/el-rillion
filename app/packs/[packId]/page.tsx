"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { chapterBest, usePacks } from "@/components/usePacks";
import { MAX_SCORE } from "@/lib/tiers";

export default function PackPage() {
  const { packId } = useParams<{ packId: string }>();
  const { packs, prompts } = usePacks();
  const { stats, session } = useAuth();
  if (!packs) return <div className="panel muted">Loading…</div>;
  const pack = packs.find((p) => p.id === packId);
  if (!pack) return <div className="panel"><p className="error">Pack not found.</p><Link href="/packs">All packs</Link></div>;
  const chapters = [1, 2];
  const total = chapters.reduce((s, c) => s + chapterBest(prompts, pack.id, c, stats?.pack_best).score, 0);

  return (
    <div className="stack">
      <div>
        <Link href="/packs" style={{ fontSize: 13 }}>← All packs</Link>
        <div className="eyebrow" style={{ marginTop: 12 }}>Pack</div>
        <h1>{pack.name}</h1>
        <p className="muted">{pack.description}</p>
        {session && <p>Your pack score: <span className="glow" style={{ fontWeight: 800 }}>{total}</span> / {MAX_SCORE * 2} · <Link href={`/leaderboard?tab=pack&pack=${pack.id}`}>pack leaderboard</Link></p>}
      </div>
      <div className="grid">
        {chapters.map((c) => {
          const best = chapterBest(prompts, pack.id, c, stats?.pack_best);
          return (
            <div key={c} className="panel stack">
              <div className="eyebrow">Chapter {c} · 7 prompts · 25 s each</div>
              <h3 style={{ margin: 0 }}>{pack.name}, chapter {c}</h3>
              {session && (
                <>
                  <div className="muted" style={{ fontSize: 14 }}>Best: <span className="glow" style={{ fontWeight: 800 }}>{best.score}</span> / {MAX_SCORE} · {best.played}/7 prompts played</div>
                  <div className="progress"><span style={{ width: `${(best.score / MAX_SCORE) * 100}%` }} /></div>
                </>
              )}
              <div className="row">
                <Link className={`btn small ${best.played ? "ghost" : ""}`} href={`/play/${pack.id}/${c}`}>{best.played ? "Replay ▶" : "Play ▶"}</Link>
              </div>
            </div>
          );
        })}
      </div>
      <p className="muted" style={{ fontSize: 13 }}>Prompts stay hidden until you start them. You can replay a chapter, and only your best score on each prompt counts.</p>
    </div>
  );
}
