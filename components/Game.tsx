"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "./AuthProvider";
import { AnswerChip } from "./Tier";
import { Sweep } from "./Sweep";
import { lsDel, lsGet, lsSet, rpc, sb } from "@/lib/supabase";
import { ROUND_SECONDS, tierFor } from "@/lib/tiers";
import type { Daily, FinishedRound, FoundAnswer, GuessResult, LiveRound, Prompt, StartResult } from "@/lib/types";

type Phase = "loading" | "ready" | "playing" | "ending" | "error";
type Meta = { title: string; blurb: string; answer_count: number; label: string; dailyDate?: string; players?: number };

export function Game({ mode, promptId }: { mode: "daily" | "pack"; promptId?: string }) {
  const router = useRouter();
  const { ready: authReady, session, stats, refresh } = useAuth();
  const [phase, setPhase] = useState<Phase>("loading");
  const [error, setError] = useState("");
  const [meta, setMeta] = useState<Meta | null>(null);
  const [previous, setPrevious] = useState<string | null>(null); // a finished round the player can view
  const [roundId, setRoundId] = useState<string | null>(null);
  const [ranked, setRanked] = useState(false);
  const [found, setFound] = useState<FoundAnswer[]>([]);
  const [score, setScore] = useState(0);
  const [guess, setGuess] = useState("");
  const [fb, setFb] = useState<{ kind: "hit" | "dupe" | "miss"; text: string; n: number } | null>(null);
  const [remaining, setRemaining] = useState(ROUND_SECONDS * 1000);
  const endsAt = useRef(0);
  const offset = useRef(0);
  const ending = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const activeKey = (dateOrId: string) => `elr:active:${mode}:${dateOrId}`;

  // ---------- load pre-round info, resume an in-progress round if there is one ----------
  useEffect(() => {
    if (!authReady) return;
    let cancelled = false;
    (async () => {
      try {
        let m: Meta;
        let key: string;
        if (mode === "daily") {
          const d = await rpc<Daily>("get_daily");
          m = { title: d.title, blurb: d.blurb, answer_count: d.answer_count, label: `El-rillion #${d.daily_number}`, dailyDate: d.daily_date, players: d.players };
          key = activeKey(d.daily_date);
        } else {
          const { data, error } = await sb().from("prompts").select("*").eq("id", promptId!).single<Prompt>();
          if (error || !data) throw new Error("That prompt doesn't exist.");
          const { data: pack } = await sb().from("packs").select("name").eq("id", data.pack_id).single<{ name: string }>();
          m = { title: data.title, blurb: data.blurb, answer_count: data.answer_count, label: pack?.name ?? "Pack" };
          key = activeKey(data.id);
        }
        if (cancelled) return;
        setMeta(m);

        const saved = lsGet(key);
        if (saved) {
          try {
            const r = await rpc<LiveRound | FinishedRound>("get_round", { p_round_id: saved });
            if (cancelled) return;
            if (!r.over) return beginPlaying(r.round_id, r.ranked, r.ends_at, r.server_now, r.found, r.score);
            setPrevious(r.round_id);
          } catch { lsDel(key); }
        }
        setPhase("ready");
      } catch (e: any) {
        if (!cancelled) { setError(e.message ?? String(e)); setPhase("error"); }
      }
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authReady, mode, promptId, session?.user.id]);

  const beginPlaying = (id: string, isRanked: boolean, ends: string, serverNow: string, f: FoundAnswer[], s: number) => {
    offset.current = Date.parse(serverNow) - Date.now();
    endsAt.current = Date.parse(ends);
    ending.current = false;
    setRoundId(id); setRanked(isRanked); setFound(f); setScore(s);
    setRemaining(endsAt.current - (Date.now() + offset.current));
    setPhase("playing");
    setTimeout(() => inputRef.current?.focus(), 30);
  };

  const start = async () => {
    setPhase("loading");
    try {
      const r = await rpc<StartResult>("start_round", { p_mode: mode, p_prompt_id: mode === "pack" ? promptId : null });
      if (r.already_played) { router.push(`/round/${r.round_id}`); return; }
      lsSet(activeKey(mode === "daily" ? meta!.dailyDate! : promptId!), r.round_id);
      setMeta((m) => m && { ...m, title: r.title, blurb: r.blurb });
      beginPlaying(r.round_id, r.ranked, r.ends_at, r.server_now, [], 0);
    } catch (e: any) { setError(e.message); setPhase("error"); }
  };

  const end = useCallback(async () => {
    if (ending.current || !roundId) return;
    ending.current = true;
    setPhase("ending");
    try { await rpc("finish_round", { p_round_id: roundId }); } catch { /* the round is over server-side regardless */ }
    if (session) refresh();
    router.push(`/round/${roundId}`);
  }, [roundId, router, session, refresh]);

  // ---------- clock ----------
  useEffect(() => {
    if (phase !== "playing") return;
    const t = setInterval(() => {
      const left = endsAt.current - (Date.now() + offset.current);
      setRemaining(left);
      if (left <= 0) end();
    }, 100);
    return () => clearInterval(t);
  }, [phase, end]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const g = guess.trim();
    if (!g || !roundId || phase !== "playing") return;
    setGuess("");
    try {
      const r = await rpc<GuessResult>("submit_guess", { p_round_id: roundId, p_guess: g });
      const n = Date.now();
      if (r.status === "hit") {
        setScore(r.score);
        setFound((f) => [{ answer_id: r.answer_id, name: r.name, rarity: r.rarity, megaohm: r.megaohm }, ...f]);
        const t = tierFor(r.rarity, r.megaohm);
        setFb({ kind: "hit", n, text: r.megaohm ? `⚡ ${r.name}: YOU FOUND THE MEGAOHM! +${r.rarity + 100}` : `✓ ${r.name} · ${t.label} · +${r.rarity}` });
      } else if (r.status === "dupe") {
        setFb({ kind: "dupe", n, text: `Already got ${r.name}` });
      } else if (r.status === "time_up") {
        end();
      } else if (r.status === "miss") {
        setFb({ kind: "miss", n, text: `✗ "${g}" isn't on the list` });
      }
    } catch (err: any) {
      setFb({ kind: "miss", n: Date.now(), text: `Connection problem: ${err.message}` });
    }
  };

  // ---------- render ----------
  if (phase === "error") return <div className="panel"><p className="error">{error}</p><Link href="/">Back home</Link></div>;
  if (phase === "loading" || !meta) return <div className="panel muted">Charging capacitors…</div>;

  if (phase === "ready") {
    const signedIn = !!session;
    const playedPack = mode === "pack" && signedIn && stats?.pack_rounds?.[promptId!];
    const playedDaily = mode === "daily" && signedIn && stats?.played_today;
    return (
      <div className="panel stack">
        <div className="eyebrow">{meta.label}{mode === "daily" && meta.players != null ? ` · ${meta.players} played today` : ""}</div>
        {mode === "daily" && !playedDaily ? (
          <>
            <div className="prompt-title">Today&apos;s prompt is hidden until you start.</div>
            <p className="muted">{meta.answer_count} accepted answers · {ROUND_SECONDS} seconds · one hidden Megaohm.</p>
          </>
        ) : (
          <>
            <div className="prompt-title">{meta.title}</div>
            <p className="muted">{meta.blurb} · {meta.answer_count} accepted answers · {ROUND_SECONDS} seconds</p>
          </>
        )}
        {playedDaily ? (
          <div className="row">
            <button className="btn" onClick={start}>See today&apos;s result</button>
            <Link className="btn ghost" href="/packs">Play a pack</Link>
          </div>
        ) : (
          <div className="row">
            <button className="btn" onClick={start}>{previous ? "Play again" : "Start ▶"}</button>
            {previous && <Link className="btn ghost" href={`/round/${previous}`}>See your last result</Link>}
          </div>
        )}
        {!signedIn && (
          <p className="notice">Playing as a guest. <Link href="/account">Sign in</Link> to save your score, keep a streak and appear on the leaderboards.</p>
        )}
        {playedPack && <p className="notice">You&apos;ve already played this prompt. Your first score ({playedPack.score}) is the one that counts, so a replay is practice only.</p>}
        {signedIn && mode === "daily" && !playedDaily && <p className="notice">Ranked: you get one attempt at the daily.</p>}
      </div>
    );
  }

  const secs = Math.max(0, Math.ceil(remaining / 1000));
  const mmss = `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, "0")}`;
  const progress = 1 - remaining / (ROUND_SECONDS * 1000);
  return (
    <div className="panel">
      <div className="hud">
        <div>
          <div className="label">Found</div>
          <div className="big-num">{found.length}<span className="muted" style={{ fontSize: 18 }}>/{meta.answer_count}</span></div>
        </div>
        <div className="center" style={{ textAlign: "center" }}>
          <div className="label">{ranked ? "Ranked" : "Practice"} · time</div>
          <div className={`big-num ${secs <= 10 ? "crit" : secs <= 30 ? "warn" : ""}`}>{mmss}</div>
        </div>
        <div className="score">
          <div className="label">Score</div>
          <div className="big-num">{score}</div>
        </div>
      </div>
      <Sweep progress={progress} />
      <div className="eyebrow" style={{ marginTop: 14 }}>{meta.label}</div>
      <div className="prompt-title">{meta.title}</div>
      <form onSubmit={submit} style={{ marginTop: 12 }}>
        <input
          ref={inputRef}
          className={`input guess-input ${fb?.kind === "miss" ? "shake" : ""}`}
          key={fb?.kind === "miss" ? fb.n : "in"}
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Type an answer and press Enter"
          autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck={false}
          disabled={phase !== "playing"}
          aria-label="Your guess"
          autoFocus
        />
      </form>
      <div className={`feedback ${fb?.kind ?? ""}`} aria-live="polite">{fb?.text ?? "Rarer answers are worth more. Small typos are forgiven."}</div>
      <div className="chips" style={{ marginTop: 8 }}>
        {found.map((a) => <AnswerChip key={a.answer_id} {...a} className="pop" />)}
      </div>
      <div className="spread" style={{ marginTop: 20 }}>
        <span className="muted" style={{ fontSize: 13 }}>{phase === "ending" ? "Measuring…" : ""}</span>
        <button className="btn danger small" onClick={end} disabled={phase !== "playing"}>End round</button>
      </div>
    </div>
  );
}
