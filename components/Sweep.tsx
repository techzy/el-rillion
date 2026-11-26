// Oscilloscope-style timer: a sine trace drawn left to right as time elapses.
export function Sweep({ progress }: { progress: number }) {
  const p = Math.min(1, Math.max(0, progress));
  const W = 1000, H = 40, cycles = 9;
  const pts: string[] = [];
  for (let x = 0; x <= W; x += 5) {
    const y = H / 2 - Math.sin((x / W) * cycles * Math.PI * 2) * (H / 2 - 5);
    pts.push(`${x},${y.toFixed(1)}`);
  }
  const all = pts.join(" ");
  const cut = Math.round(p * W);
  const done = pts.filter((s) => Number(s.split(",")[0]) <= cut).join(" ");
  const dotY = H / 2 - Math.sin((cut / W) * cycles * Math.PI * 2) * (H / 2 - 5);
  const color = p > 0.89 ? "#ff6b6b" : p > 0.67 ? "#ffa94d" : "#39ff88";
  return (
    <svg className="sweep" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
      <polyline points={all} fill="none" stroke="#39ff88" strokeOpacity="0.12" strokeWidth="2" vectorEffect="non-scaling-stroke" />
      {done && <polyline points={done} fill="none" stroke={color} strokeWidth="2" vectorEffect="non-scaling-stroke"
        style={{ filter: `drop-shadow(0 0 4px ${color})` }} />}
      <circle cx={cut} cy={dotY} r="4" fill={color} style={{ filter: `drop-shadow(0 0 6px ${color})` }} />
    </svg>
  );
}
