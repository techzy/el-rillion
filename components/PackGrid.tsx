"use client";
import Link from "next/link";
import { useAuth } from "./AuthProvider";
import { usePacks } from "./usePacks";

export function PackGrid() {
  const { packs, prompts } = usePacks();
  const { stats } = useAuth();
  if (!packs) return <div className="muted">Loading packs…</div>;
  return (
    <div className="grid">
      {packs.map((p) => {
        const list = prompts.filter((q) => q.pack_id === p.id);
        const done = list.filter((q) => stats?.pack_rounds?.[q.id]).length;
        return (
          <Link key={p.id} href={`/packs/${p.id}`} className="panel pack-card">
            <div className="eyebrow">{list.length} prompts</div>
            <h3>{p.name}</h3>
            <p className="muted" style={{ margin: 0, fontSize: 14 }}>{p.description}</p>
            {stats && (
              <>
                <div className="progress" aria-label={`${done} of ${list.length} played`}><span style={{ width: `${list.length ? (done / list.length) * 100 : 0}%` }} /></div>
                <div className="muted" style={{ fontSize: 12, marginTop: 6 }}>{done}/{list.length} played</div>
              </>
            )}
          </Link>
        );
      })}
    </div>
  );
}
