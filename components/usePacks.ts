"use client";
import { useEffect, useState } from "react";
import { sb } from "@/lib/supabase";
import type { Pack, PromptMeta } from "@/lib/types";

export function usePacks() {
  const [packs, setPacks] = useState<Pack[] | null>(null);
  const [prompts, setPrompts] = useState<PromptMeta[]>([]);
  useEffect(() => {
    (async () => {
      const [{ data: p }, { data: q }] = await Promise.all([
        sb().from("packs").select("*").order("sort"),
        sb().from("prompts").select("id, pack_id, chapter, sort, answer_count").order("sort"),
      ]);
      setPacks((p ?? []) as Pack[]);
      setPrompts((q ?? []) as PromptMeta[]);
    })();
  }, []);
  return { packs, prompts };
}

/** Best total for one chapter (sum of best points per prompt). */
export function chapterBest(prompts: PromptMeta[], packId: string, chapter: number, best: Record<string, number> | undefined) {
  const list = prompts.filter((q) => q.pack_id === packId && q.chapter === chapter);
  return { played: list.filter((q) => best?.[q.id] !== undefined).length, score: list.reduce((s, q) => s + (best?.[q.id] ?? 0), 0) };
}
