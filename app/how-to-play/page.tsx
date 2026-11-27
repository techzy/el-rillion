import Link from "next/link";
import { Resistor } from "@/components/Tier";
import { MAX_SCORE, OPEN, PROMPTS_PER_SHEET, PROMPT_SECONDS, TIERS } from "@/lib/tiers";

export const metadata = { title: "How to play" };

export default function HowToPlay() {
  return (
    <div className="stack" style={{ maxWidth: 760 }}>
      <div>
        <div className="eyebrow">How to play</div>
        <h1>One in a megaohm.</h1>
      </div>
      <div className="panel stack">
        <h2>The sheet</h2>
        <p>Every sheet has <strong>{PROMPTS_PER_SHEET} prompts</strong>, and each prompt is an electrical-engineering category, like <em>&quot;Name a part of a printed circuit board&quot;</em> or <em>&quot;Name a famous blackout&quot;</em>. A prompt stays hidden until you start it. Then you have <strong>{PROMPT_SECONDS} seconds</strong> to type <strong>one</strong> answer.</p>
        <p>Your first correct answer locks in. Wrong guesses cost nothing, so keep trying until the trace runs out. Capitals, spaces, hyphens and plurals don&apos;t matter, small typos are forgiven, and common abbreviations count.</p>
      </div>
      <div className="panel stack">
        <h2>Scoring</h2>
        <p>Rarer answers are worth more. Tiers are named like resistor values and coloured by the multiplier band:</p>
        <div className="stack" style={{ marginTop: 4 }}>
          {[...TIERS, OPEN].map((t) => (
            <div key={t.label} className="row" style={{ ["--c" as any]: t.color }}>
              <Resistor tier={t} width={44} />
              <span className="tier-label" style={{ width: 60 }}>{t.label}</span>
              <span style={{ minWidth: 150 }}>{t.name}</span>
              <span className="muted">{t.points} pts</span>
            </div>
          ))}
        </div>
        <p>Each prompt hides exactly one <strong className="glow">Megaohm</strong>, its rarest answer, worth 100. A perfect sheet is {MAX_SCORE}. Answer lists are never revealed, so you only ever see your own answer and how many answers were accepted.</p>
      </div>
      <div className="panel stack">
        <h2>Daily, packs and leaderboards</h2>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          <li>The <Link href="/play/daily">daily sheet</Link> changes at midnight Eastern time and is the same for everyone. Signed-in players get one attempt.</li>
          <li><Link href="/packs">Themed packs</Link> have two chapters of 7 prompts. Replay as often as you like. Your best score on each prompt counts.</li>
          <li>Anyone can play as a guest. <Link href="/account">Sign in</Link> by email link to save scores, build a streak, and appear on the <Link href="/leaderboard">leaderboards</Link> (today, all-time, per pack, streaks).</li>
        </ul>
      </div>
    </div>
  );
}
