// Rarity tiers are named like resistor values; the colour is that value's multiplier band.
export type Tier = { key: string; label: string; name: string; color: string; bands: [string, string, string]; emoji: string };

export const TIERS: Tier[] = [
  { key: "t1", label: "1Ω", name: "Common", color: "var(--t1)", bands: ["#8b5a2b", "#111", "#c9a227"], emoji: "🟫" },
  { key: "t2", label: "1kΩ", name: "Uncommon", color: "var(--t2)", bands: ["#8b5a2b", "#111", "#e03131"], emoji: "🟥" },
  { key: "t3", label: "10kΩ", name: "Rare", color: "var(--t3)", bands: ["#8b5a2b", "#111", "#f08c00"], emoji: "🟧" },
  { key: "t4", label: "100kΩ", name: "Epic", color: "var(--t4)", bands: ["#8b5a2b", "#111", "#fcc419"], emoji: "🟨" },
  { key: "mega", label: "1MΩ", name: "The Megaohm", color: "var(--mega)", bands: ["#8b5a2b", "#111", "#2f9e44"], emoji: "🟩" },
];

export function tierFor(rarity: number, megaohm: boolean): Tier {
  if (megaohm) return TIERS[4];
  if (rarity >= 60) return TIERS[3];
  if (rarity >= 40) return TIERS[2];
  if (rarity >= 20) return TIERS[1];
  return TIERS[0];
}

export const MEGAOHM_BONUS = 100;
export const ROUND_SECONDS = 90;
export const SITE_URL = "el-rillion.lifeofjeso.ca";
