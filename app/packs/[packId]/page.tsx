"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { usePacks } from "@/components/usePacks";

export default function PackPage() {
  const { packId } = useParams<{ packId: string }>();
  const { packs, prompts } = usePacks();
  const { stats, session } = useAuth();
  if (!packs) return <div className="panel muted">Loading…</div>;
  const pack = packs.find((p) => p.id === packId);
  if (!pack) return <div className="panel"><p className="error">Pack not found.</p><Link href="/packs">All packs</Link></div>;
  const list = prompts.filter((q) => q.pack_id === pack.id);
  const total = list.reduce((s, q) => s + (stats?.pack_rounds?.[q.id]?.score ?? 0), 0);

  return (
    <div className="stack">
      <div>
        <Link href="/packs" style={{ fontSize: 13 }}>← All packs</Link>
        <div className="eyebrow" style={{ marginTop: 12 }}>Pack</div>
        <h1>{pack.name}</h1>
        <p className="muted">{pack.description}</p>
        {session && <p>Your pack score: <span className="glow" style={{ fontWeight: 800 }}>{total}</span> · <Link href={`/leaderboard?tab=pack&pack=${pack.id}`}>pack leaderboard</Link></p>}
      </div>
      <div className="grid">
        {list.map((q, i) => {
          const played = stats?.pack_rounds?.[q.id];
          return (
            <div key={q.id} className="panel stack">
              <div className="eyebrow">Prompt {i + 1} · {q.answer_count} answers</div>
              <h3 style={{ margin: 0 }}>{q.title}</h3>
              <p className="muted" style={{ margin: 0, fontSize: 14 }}>{q.blurb}</p>
              <div className="row">
                <Link className={`btn small ${played ? "ghost" : ""}`} href={`/play/${q.id}`}>{played ? "Replay (practice)" : "Play ▶"}</Link>
                {played && <Link href={`/round/${played.round_id}`} style={{ fontSize: 13 }}>{played.score} pts{played.megaohm ? " · ⚡ Megaohm" : ""} →</Link>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
