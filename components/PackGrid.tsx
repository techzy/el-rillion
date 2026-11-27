"use client";
import Link from "next/link";
import { useAuth } from "./AuthProvider";
import { chapterBest, usePacks } from "./usePacks";
import { MAX_SCORE } from "@/lib/tiers";

export function PackGrid() {
  const { packs, prompts } = usePacks();
  const { stats } = useAuth();
  if (!packs) return <div className="muted">Loading packs…</div>;
  return (
    <div className="grid">
      {packs.map((p) => {
        const score = [1, 2].reduce((s, c) => s + chapterBest(prompts, p.id, c, stats?.pack_best).score, 0);
        return (
          <Link key={p.id} href={`/packs/${p.id}`} className="panel pack-card">
            <div className="eyebrow">2 chapters · 14 prompts</div>
            <h3>{p.name}</h3>
            <p className="muted" style={{ margin: 0, fontSize: 14 }}>{p.description}</p>
            {stats && (
              <>
                <div className="progress" aria-label={`${score} of ${MAX_SCORE * 2}`}><span style={{ width: `${(score / (MAX_SCORE * 2)) * 100}%` }} /></div>
                <div className="muted" style={{ fontSize: 12, marginTop: 6 }}>{score} / {MAX_SCORE * 2}</div>
              </>
            )}
          </Link>
        );
      })}
    </div>
  );
}
