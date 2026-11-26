"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthProvider";
import { AnswerChip, Resistor } from "./Tier";
import { sb } from "@/lib/supabase";
import { SITE_URL, TIERS, tierFor } from "@/lib/tiers";
import type { FinishedRound, Prompt } from "@/lib/types";

export function Results({ round }: { round: FinishedRound }) {
  const { session } = useAuth();
  const [packName, setPackName] = useState("");
  const [nextPrompt, setNextPrompt] = useState<Prompt | null>(null);
  const [copied, setCopied] = useState(false);
  const [filter, setFilter] = useState<"all" | "found" | "missed">("all");

  useEffect(() => {
    (async () => {
      const { data: pack } = await sb().from("packs").select("name").eq("id", round.pack_id).single<{ name: string }>();
      setPackName(pack?.name ?? "");
      const { data: prompts } = await sb().from("prompts").select("*").eq("pack_id", round.pack_id).order("sort");
      const list = (prompts ?? []) as Prompt[];
      const i = list.findIndex((p) => p.id === round.prompt_id);
      setNextPrompt(list[(i + 1) % list.length] ?? null);
    })();
  }, [round.pack_id, round.prompt_id]);

  const mega = round.answers.find((a) => a.megaohm)!;
  const mine = useMemo(() => round.answers.filter((a) => a.found).sort((a, b) => b.rarity - a.rarity), [round]);
  const all = useMemo(() => [...round.answers].sort((a, b) => Number(b.megaohm) - Number(a.megaohm) || b.rarity - a.rarity), [round]);
  const shown = all.filter((a) => filter === "all" || (filter === "found" ? a.found : !a.found));

  const heading = round.mode === "daily" ? `El-rillion #${round.daily_number}` : packName || "Pack";

  const share = async () => {
    const bands = mine.map((a) => tierFor(a.rarity, a.megaohm).emoji).join("") || "·";
    const lines = [
      `EL-RILLION ${round.mode === "daily" ? `#${round.daily_number}` : `· ${round.title}`} ⚡`,
      `${round.score} pts · ${round.found_count}/${round.answer_count} found${round.got_megaohm ? " · found the Megaohm!" : ""}`,
      bands,
      `https://${SITE_URL}`,
    ];
    const text = lines.join("\n");
    try {
      if (navigator.share && /Mobi|Android/i.test(navigator.userAgent)) await navigator.share({ text });
      else { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1800); }
    } catch { /* user cancelled */ }
  };

  return (
    <div className="stack">
      <div className="panel stack">
        <div className="eyebrow">{heading} · {round.ranked ? "ranked" : "practice"} result</div>
        <div className="prompt-title">{round.title}</div>
        <div className="stat-row">
          <div className="stat"><div className="label">Score</div><div className="v">{round.score}</div></div>
          <div className="stat"><div className="label">Found</div><div className="v">{round.found_count}<span className="muted" style={{ fontSize: 15 }}>/{round.answer_count}</span></div></div>
          <div className="stat"><div className="label">Misses</div><div className="v">{round.misses}</div></div>
          <div className="stat"><div className="label">Megaohm</div><div className="v">{round.got_megaohm ? "✓" : "✗"}</div></div>
        </div>

        <div className="megaohm-card">
          <div className="row" style={{ gap: 10 }}>
            <Resistor tier={TIERS[4]} width={40} />
            <div>
              <div className="label">The Megaohm · 1MΩ</div>
              <div style={{ fontSize: 20, fontWeight: 800 }} className="glow">{mega.name}</div>
              <div className="muted" style={{ fontSize: 13 }}>
                {round.got_megaohm ? `You found it! +${mega.rarity} +100 bonus.` : "The rarest answer on the list. Maybe next time."}
                {" "}Found by {mega.found_pct}% of rounds.
              </div>
            </div>
          </div>
        </div>

        {mine.length > 0 && (
          <div>
            <div className="label" style={{ marginBottom: 8 }}>Your answers</div>
            <div className="chips">{mine.map((a) => <AnswerChip key={a.answer_id} {...a} />)}</div>
          </div>
        )}

        <div className="row">
          <button className="btn" onClick={share}>{copied ? "Copied ✓" : "Share result"}</button>
          {nextPrompt && <Link className="btn ghost" href={`/play/${nextPrompt.id}`}>Next in {packName || "pack"} →</Link>}
          <Link className="btn ghost" href="/leaderboard">Leaderboards</Link>
        </div>
        {!session && <p className="notice">This round wasn&apos;t saved to a leaderboard. <Link href="/account">Sign in</Link> to rank your next one.</p>}
      </div>

      <div className="panel">
        <div className="spread" style={{ marginBottom: 12 }}>
          <h2 style={{ margin: 0 }}>Every accepted answer</h2>
          <div className="tabs" role="tablist" style={{ margin: 0 }}>
            {(["all", "found", "missed"] as const).map((f) => (
              <button key={f} className="tab" role="tab" aria-selected={filter === f} onClick={() => setFilter(f)}>{f}</button>
            ))}
          </div>
        </div>
        <div className="reveal">
          {shown.map((a) => {
            const t = tierFor(a.rarity, a.megaohm);
            return (
              <div key={a.answer_id} className={`reveal-item ${a.found ? "found" : "missed"}`} style={{ ["--c" as any]: t.color }}>
                <Resistor tier={t} width={28} />
                <span className="nm">{a.name}</span>
                <span className="meta"><span className="tier-label">{t.label}</span> · {a.rarity}pt<br />{a.found_pct}% found</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
