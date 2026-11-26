import { PackGrid } from "@/components/PackGrid";

export const metadata = { title: "Themed packs" };

export default function PacksPage() {
  return (
    <div className="stack">
      <div>
        <div className="eyebrow">Themed packs</div>
        <h1>Pick a subfield</h1>
        <p className="muted">Each pack has five prompts. When you&apos;re signed in, your first attempt at each prompt counts toward that pack&apos;s leaderboard. Replays are for practice.</p>
      </div>
      <PackGrid />
    </div>
  );
}
