# EL-RILLION

*one in a megaohm.* A daily electrical-engineering category game at **https://el-rillion.lifeofjeso.ca**.

Each sheet is **7 prompts, 25 seconds each**. A prompt stays hidden until you start it, and your first correct
answer locks in. Answers are tiered 10 / 15 / 30 / 60 / 85 / 100 points. The single 100 in each prompt is the
**Megaohm**. A perfect sheet is 700. Answer lists are never revealed: players see only their own answer and the
accepted-answer count.

- **Daily sheet**: the same 7 prompts for everyone, changing at midnight America/Toronto. It walks a fresh shuffle
  of the whole bank each cycle. Signed-in players get one attempt.
- **Themed packs**: 6 packs × 2 chapters × 7 prompts (84 prompts). Replays are allowed, and your best score per prompt counts.
- **Accounts**: email magic link via Supabase Auth. Guests can play; only signed-in players with a display name are ranked.
- **Leaderboards**: today's daily, all-time (daily totals + pack bests), per pack, and streaks.

## Stack

- Next.js 15 (App Router) on Vercel.
- Supabase (Postgres + Auth), project `el-rillion` (`ypfgxjyenazwtapiqjbu`, ca-central-1).
- Answers are never sent to the browser. `answers`, `answer_keys`, `plays` and `play_items` have RLS with no
  policies, and prompt titles are column-restricted until a prompt is started. All gameplay goes through
  `SECURITY DEFINER` functions (`start_play`, `start_item`, `guess_item`, `skip_item`, `get_play`, `lb_*`, `my_stats`)
  that enforce the 25-second clock and score on the server.

## Editing content

Prompts live in `content/packs/*.mjs` (the original 30 are in `content/legacy.mjs`), one answer per line:

```
<tier> <Canonical name> | alias | alias
```

```bash
npm run seed   # validates everything and writes supabase/seed.sql
```

The validator checks for 7 prompts per chapter, exactly one 100 per prompt, and no two answers sharing a
normalized spelling. Running `supabase/seed.sql` replaces **all** content and play history. To add a single
prompt to a live database, run its `select public.el_seed_prompt(...)` line from that file instead.

## Local development

```bash
cp .env.example .env.local
npm install
npm run dev
```
