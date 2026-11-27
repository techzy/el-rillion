// Answer tiers, named like resistor values. The colour is that value's multiplier band.
export type Tier = {
  points: number; label: string; name: string; line: string; color: string;
  bands: [string, string, string]; emoji: string;
};

export const TIERS: Tier[] = [
  { points: 10, label: "10Ω", name: "Everyone says it", line: "The first thing out of every mouth.", color: "var(--t10)", bands: ["#8b5a2b", "#111", "#111"], emoji: "⬜" },
  { points: 15, label: "100Ω", name: "Textbook", line: "Straight out of second year.", color: "var(--t15)", bands: ["#8b5a2b", "#111", "#8b5a2b"], emoji: "🟫" },
  { points: 30, label: "1kΩ", name: "Lab bench", line: "Someone's actually used one.", color: "var(--t30)", bands: ["#8b5a2b", "#111", "#e03131"], emoji: "🟥" },
  { points: 60, label: "10kΩ", name: "Datasheet deep-cut", line: "Now we're reading the fine print.", color: "var(--t60)", bands: ["#8b5a2b", "#111", "#f08c00"], emoji: "🟧" },
  { points: 85, label: "100kΩ", name: "Footnote", line: "Straight out of an appendix.", color: "var(--t85)", bands: ["#8b5a2b", "#111", "#fcc419"], emoji: "🟨" },
  { points: 100, label: "1MΩ", name: "The Megaohm", line: "One in a megaohm. Nobody else found this.", color: "var(--mega)", bands: ["#8b5a2b", "#111", "#2f9e44"], emoji: "🟩" },
];

export const OPEN: Tier = {
  points: 0, label: "OPEN", name: "Open circuit", line: "No answer. The trace stayed flat.",
  color: "var(--miss)", bands: ["#444", "#444", "#444"], emoji: "⬛",
};

export function tierFor(points: number | null | undefined): Tier {
  return TIERS.find((t) => t.points === points) ?? OPEN;
}

export const PROMPT_SECONDS = 25;
export const PROMPTS_PER_SHEET = 7;
export const MAX_SCORE = PROMPTS_PER_SHEET * 100;
export const SITE_URL = "el-rillion.lifeofjeso.ca";
