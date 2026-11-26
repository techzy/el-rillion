# EL-RILLION

*one in a megaohm.* A daily electrical-engineering category game at **https://el-rillion.lifeofjeso.ca**.

Each prompt (e.g. "Name a type of diode") has a list of accepted answers. You get 90 seconds to name as many
as you can. Each answer scores its rarity (1–100), and the rarest answer in every prompt, the **Megaohm**, is worth
+100 extra.

- **Daily prompt**: the same for everyone, changes at midnight America/Toronto, and gives signed-in players one ranked attempt.
- **Themed packs**: 6 packs × 5 prompts. Your first attempt at each prompt is ranked, and replays are practice.
- **Accounts**: email magic link via Supabase Auth. Guests can play; only signed-in players with a display name are ranked.
- **Leaderboards**: today's daily, all-time, per pack, and streaks.

## Stack

- Next.js 15 (App Router) on Vercel.
- Supabase (Postgres + Auth), project `el-rillion` (`ypfgxjyenazwtapiqjbu`, ca-central-1).
- Answers are never sent to the browser before a round ends. Tables `answers`, `answer_keys` and `rounds` have
  RLS with no policies, and all gameplay goes through `SECURITY DEFINER` functions (`start_round`, `submit_guess`,
  `finish_round`, `get_round`, `lb_*`, `my_stats`) that check the 90-second clock and compute the score on the server.

## Editing content

All prompts and answers live in `content/packs.mjs` (`"Name|rarity|alias1;alias2"`).

```bash
npm run seed   # validates content and writes supabase/seed.sql
```

Then run `supabase/seed.sql` in the Supabase SQL editor. It replaces all content. Because it deletes and
re-inserts answers, past rounds' found-answer IDs stop matching, so reseed only before launch or between seasons.
To add a prompt without a reseed, run a single `select public.el_seed_prompt(...)` line from the generated file.

## Local development

```bash
cp .env.example .env.local
npm install
npm run dev
```
