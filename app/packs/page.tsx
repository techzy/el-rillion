import { PackGrid } from "@/components/PackGrid";

export const metadata = { title: "Themed packs" };

export default function PacksPage() {
  return (
    <div className="stack">
      <div>
        <div className="eyebrow">Themed packs</div>
        <h1>Pick a subfield</h1>
        <p className="muted">Each pack has two chapters of 7 prompts, 25 seconds each. Replay as often as you like. Your best score on each prompt counts toward the pack leaderboard.</p>
      </div>
      <PackGrid />
    </div>
  );
}
