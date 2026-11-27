import type { Tier } from "@/lib/tiers";

export function Resistor({ tier, width = 34 }: { tier: Tier; width?: number }) {
  const [a, b, c] = tier.bands;
  return (
    <svg className="resistor" width={width} height={width * 0.36} viewBox="0 0 50 18" aria-hidden="true">
      <line x1="0" y1="9" x2="50" y2="9" stroke="#8a9a90" strokeWidth="1.5" />
      <rect x="10" y="2" width="30" height="14" rx="6" fill={tier.points ? "#d9c7a3" : "#3a4a40"} />
      <rect x="15" y="2" width="3" height="14" fill={a} />
      <rect x="21" y="2" width="3" height="14" fill={b} />
      <rect x="27" y="2" width="3" height="14" fill={c} />
      {tier.points > 0 && <rect x="34" y="2" width="2" height="14" fill="#c9a227" />}
    </svg>
  );
}
