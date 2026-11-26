"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { Results } from "@/components/Results";
import { rpc } from "@/lib/supabase";
import type { FinishedRound, LiveRound } from "@/lib/types";

export default function RoundPage() {
  const { roundId } = useParams<{ roundId: string }>();
  const { ready } = useAuth();
  const [round, setRound] = useState<FinishedRound | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!ready) return;
    let tries = 0;
    const load = async () => {
      try {
        const r = await rpc<FinishedRound | LiveRound>("get_round", { p_round_id: roundId });
        if (r.over) setRound(r);
        else if (tries++ < 5) setTimeout(load, 600); // the server clock may be a moment behind
        else setError("This round is still in progress.");
      } catch (e: any) {
        setError(e.message.includes("not your round") ? "This round belongs to another player." : "Round not found.");
      }
    };
    load();
  }, [ready, roundId]);

  if (error) return <div className="panel"><p className="error">{error}</p><Link href="/">Back home</Link></div>;
  if (!round) return <div className="panel muted">Reading the trace…</div>;
  return <Results round={round} />;
}
