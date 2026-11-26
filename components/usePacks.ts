"use client";
import { useEffect, useState } from "react";
import { sb } from "@/lib/supabase";
import type { Pack, Prompt } from "@/lib/types";

export function usePacks() {
  const [packs, setPacks] = useState<Pack[] | null>(null);
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  useEffect(() => {
    (async () => {
      const [{ data: p }, { data: q }] = await Promise.all([
        sb().from("packs").select("*").order("sort"),
        sb().from("prompts").select("id, pack_id, title, blurb, sort, answer_count").order("sort"),
      ]);
      setPacks((p ?? []) as Pack[]);
      setPrompts((q ?? []) as Prompt[]);
    })();
  }, []);
  return { packs, prompts };
}
