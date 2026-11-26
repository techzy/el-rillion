export type Pack = { id: string; name: string; description: string; sort: number };
export type Prompt = {
  id: string; pack_id: string; title: string; blurb: string; sort: number; answer_count: number;
};

export type Daily = {
  daily_date: string; daily_number: number; prompt_id: string; title: string; blurb: string;
  pack_id: string; answer_count: number; players: number;
};

export type FoundAnswer = { answer_id: number; name: string; rarity: number; megaohm: boolean };

export type StartResult =
  | { already_played: true; round_id: string }
  | {
      already_played: false; round_id: string; ranked: boolean; ends_at: string; server_now: string;
      prompt_id: string; title: string; blurb: string; answer_count: number;
    };

export type LiveRound = {
  over: false; round_id: string; mode: "daily" | "pack"; ranked: boolean; ends_at: string;
  server_now: string; score: number; prompt_id: string; title: string; blurb: string;
  answer_count: number; found: FoundAnswer[];
};

export type RevealAnswer = FoundAnswer & { found: boolean; found_pct: number };

export type FinishedRound = {
  over: true; round_id: string; mode: "daily" | "pack"; ranked: boolean;
  daily_date: string | null; daily_number: number | null; score: number; misses: number;
  got_megaohm: boolean; prompt_id: string; pack_id: string; title: string; blurb: string;
  answer_count: number; found_count: number; answers: RevealAnswer[];
};

export type GuessResult =
  | { status: "hit"; answer_id: number; name: string; rarity: number; megaohm: boolean; score: number; found_count: number }
  | { status: "dupe"; name: string; score: number }
  | { status: "miss" | "empty" | "time_up"; score: number };

export type MyStats = {
  display_name: string | null; total_score: number; dailies_played: number; megaohms: number;
  current_streak: number; best_streak: number; played_today: boolean;
  pack_rounds: Record<string, { score: number; megaohm: boolean; round_id: string }>;
} | null;
