export type Pack = { id: string; name: string; description: string; sort: number };
/** Public prompt metadata. Titles stay hidden until a prompt is started. */
export type PromptMeta = { id: string; pack_id: string; chapter: number; sort: number; answer_count: number };

export type Daily = { daily_date: string; daily_number: number; prompts: number; players: number };

export type SheetItem = {
  idx: number;
  state: "todo" | "active" | "done";
  title: string | null;
  answer: string | null;
  points: number | null;
  megaohm: boolean;
  accepted: number | null;
  misses: number;
  ends_at: string | null;
};

export type Sheet = {
  play_id: string; mode: "daily" | "pack"; ranked: boolean;
  daily_date: string | null; daily_number: number | null;
  pack_id: string | null; pack_name: string | null; chapter: number | null;
  server_now: string; total: number; finished: boolean; items: SheetItem[];
};

export type GuessResult =
  | { status: "hit"; answer: string; points: number; megaohm: boolean; accepted: number }
  | { status: "miss" | "done" | "time_up" };

export type MyStats = {
  display_name: string | null; total_score: number; dailies_played: number; megaohms: number;
  current_streak: number; best_streak: number;
  today: { play_id: string; total: number; finished: boolean } | null;
  pack_best: Record<string, number>;
} | null;
