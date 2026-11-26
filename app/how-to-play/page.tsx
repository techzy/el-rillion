import Link from "next/link";
import { Resistor } from "@/components/Tier";
import { TIERS } from "@/lib/tiers";

export const metadata = { title: "How to play" };

const RANGES = ["1–19 pts", "20–39 pts", "40–59 pts", "60+ pts", "+100 bonus"];

export default function HowToPlay() {
  return (
    <div className="stack" style={{ maxWidth: 760 }}>
      <div>
        <div className="eyebrow">How to play</div>
        <h1>One in a megaohm.</h1>
      </div>
      <div className="panel stack">
        <h2>The round</h2>
        <p>Each prompt is an electrical-engineering category, like <em>&quot;Name a type of diode&quot;</em>. You have <strong>90 seconds</strong> to type as many accepted answers as you can. Press Enter after each one.</p>
        <p>Capitals, spaces, hyphens and plurals don&apos;t matter, and small typos are forgiven. Common abbreviations and alternate names count too (<em>BJT</em> or <em>bipolar junction transistor</em>). Two names for the same thing only score once.</p>
      </div>
      <div className="panel stack">
        <h2>Scoring</h2>
        <p>Every answer has a rarity from 1 to 100, and that&apos;s how many points it scores. Everyone thinks of <em>MOSFET</em>. Far fewer remember the <em>Sziklai pair</em>.</p>
        <p>Rarity tiers are named like resistor values and coloured by the multiplier band:</p>
        <div className="stack" style={{ marginTop: 4 }}>
          {TIERS.map((t, i) => (
            <div key={t.key} className="row" style={{ ["--c" as any]: t.color }}>
              <Resistor tier={t} width={44} />
              <span className="tier-label" style={{ width: 60 }}>{t.label}</span>
              <span>{t.name}</span>
              <span className="muted">· {RANGES[i]}</span>
            </div>
          ))}
        </div>
        <p>Each prompt hides exactly one <strong className="glow">Megaohm</strong>, its rarest answer. Find it for a <strong>+100</strong> bonus.</p>
      </div>
      <div className="panel stack">
        <h2>Daily, packs and leaderboards</h2>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          <li>The <Link href="/play/daily">daily prompt</Link> changes at midnight Eastern time and is the same for everyone. Signed-in players get one attempt.</li>
          <li><Link href="/packs">Themed packs</Link> group prompts by subfield. Your first attempt at each prompt counts, and replays are practice.</li>
          <li>Anyone can play as a guest. <Link href="/account">Sign in</Link> by email link to save scores, build a streak, and appear on the <Link href="/leaderboard">leaderboards</Link> (today, all-time, per pack, streaks).</li>
          <li>After each round you&apos;ll see every accepted answer and what share of rounds found it.</li>
        </ul>
      </div>
    </div>
  );
}
