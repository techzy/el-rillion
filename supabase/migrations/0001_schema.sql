-- EL-RILLION schema.
-- Answers are never readable by clients: all gameplay goes through
-- SECURITY DEFINER functions that check the clock and compute scores server-side.

create extension if not exists unaccent with schema extensions;
create extension if not exists fuzzystrmatch with schema extensions;

-- ---------------------------------------------------------------- content
create table public.packs (
  id text primary key,
  name text not null,
  description text not null,
  sort int not null
);

create table public.prompts (
  id text primary key,
  pack_id text not null references public.packs(id) on delete cascade,
  title text not null,
  blurb text not null,
  sort int not null,
  daily_order int not null unique,
  answer_count int not null default 0
);

create table public.answers (
  id serial primary key,
  prompt_id text not null references public.prompts(id) on delete cascade,
  name text not null,
  rarity int not null check (rarity between 1 and 100),
  is_megaohm boolean not null default false
);
create index on public.answers(prompt_id);

create table public.answer_keys (
  prompt_id text not null references public.prompts(id) on delete cascade,
  key text not null,
  answer_id int not null references public.answers(id) on delete cascade,
  primary key (prompt_id, key)
);

-- ---------------------------------------------------------------- players
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null unique
    check (display_name ~ '^[A-Za-z0-9_.-]{3,20}$'),
  created_at timestamptz not null default now()
);

create table public.rounds (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  prompt_id text not null references public.prompts(id) on delete cascade,
  mode text not null check (mode in ('daily', 'pack')),
  daily_date date,
  started_at timestamptz not null default now(),
  ends_at timestamptz not null,
  found int[] not null default '{}',
  misses int not null default 0,
  score int not null default 0,
  got_megaohm boolean not null default false,
  ranked boolean not null default false,
  finished boolean not null default false
);
create index on public.rounds(prompt_id);
create index on public.rounds(user_id) where ranked;
create unique index rounds_one_ranked_daily on public.rounds(user_id, daily_date)
  where ranked and mode = 'daily';
create unique index rounds_one_ranked_pack on public.rounds(user_id, prompt_id)
  where ranked and mode = 'pack';

-- ---------------------------------------------------------------- RLS
alter table public.packs enable row level security;
alter table public.prompts enable row level security;
alter table public.answers enable row level security;
alter table public.answer_keys enable row level security;
alter table public.profiles enable row level security;
alter table public.rounds enable row level security;

create policy "packs are public" on public.packs for select using (true);
create policy "prompts are public" on public.prompts for select using (true);
create policy "profiles are public" on public.profiles for select using (true);
-- answers, answer_keys, rounds: no policies => no direct client access.

-- ---------------------------------------------------------------- helpers
create or replace function public.el_norm(t text)
returns text language sql stable set search_path = public, extensions as $$
  select case when length(x) > 3 and right(x, 1) = 's' then left(x, -1) else x end
  from (
    select regexp_replace(
      lower(extensions.unaccent(
        replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(
          coalesce(t, ''),
          'Ω', 'omega'), 'ω', 'omega'), 'μ', 'u'), 'µ', 'u'), 'σ', 'sigma'), 'Σ', 'sigma'),
          'δ', 'delta'), 'Δ', 'delta'), 'α', 'alpha'), 'β', 'beta'), 'π', 'pi'), '²', '2')
      )),
      '[^a-z0-9]', '', 'g') as x
  ) s
$$;

create or replace function public.el_today()
returns date language sql stable as $$
  select (now() at time zone 'America/Toronto')::date
$$;

-- El-rillion #1 is 2026-11-26.
create or replace function public.el_daily_prompt(d date)
returns text language sql stable set search_path = public as $$
  select id from prompts
  order by daily_order
  offset (((d - date '2026-11-26') % (select count(*) from prompts)::int)
          + (select count(*) from prompts)::int) % (select count(*) from prompts)::int
  limit 1
$$;

-- ---------------------------------------------------------------- public API
create or replace function public.get_daily()
returns json language sql stable security definer set search_path = public as $$
  select json_build_object(
    'daily_date', el_today(),
    'daily_number', (el_today() - date '2026-11-26') + 1,
    'prompt_id', p.id, 'title', p.title, 'blurb', p.blurb,
    'pack_id', p.pack_id, 'answer_count', p.answer_count,
    'players', (select count(*) from rounds r where r.mode = 'daily' and r.daily_date = el_today())
  )
  from prompts p where p.id = el_daily_prompt(el_today())
$$;

create or replace function public.start_round(p_mode text, p_prompt_id text default null)
returns json language plpgsql volatile security definer set search_path = public as $$
declare
  uid uuid := auth.uid();
  pid text;
  d date := null;
  existing uuid;
  is_ranked boolean := false;
  r rounds;
  p prompts;
begin
  if p_mode = 'daily' then
    d := el_today();
    pid := el_daily_prompt(d);
    if uid is not null then
      select id into existing from rounds
        where user_id = uid and mode = 'daily' and daily_date = d and ranked;
      if existing is not null then
        return json_build_object('already_played', true, 'round_id', existing);
      end if;
      is_ranked := true;
    end if;
  elsif p_mode = 'pack' then
    pid := p_prompt_id;
    if not exists (select 1 from prompts where id = pid) then
      raise exception 'unknown prompt';
    end if;
    if uid is not null then
      is_ranked := not exists (
        select 1 from rounds where user_id = uid and mode = 'pack' and prompt_id = pid and ranked);
    end if;
  else
    raise exception 'bad mode';
  end if;

  insert into rounds (user_id, prompt_id, mode, daily_date, ends_at, ranked)
    values (uid, pid, p_mode, d, now() + interval '90 seconds', is_ranked)
    returning * into r;
  select * into p from prompts where id = pid;

  return json_build_object(
    'already_played', false,
    'round_id', r.id, 'ranked', r.ranked,
    'ends_at', r.ends_at, 'server_now', now(),
    'prompt_id', p.id, 'title', p.title, 'blurb', p.blurb, 'answer_count', p.answer_count
  );
end $$;

create or replace function public.submit_guess(p_round_id uuid, p_guess text)
returns json language plpgsql volatile security definer set search_path = public, extensions as $$
declare
  uid uuid := auth.uid();
  r rounds;
  n text := el_norm(p_guess);
  aid int;
  a answers;
begin
  select * into r from rounds where id = p_round_id for update;
  if not found then raise exception 'unknown round'; end if;
  if r.user_id is not null and r.user_id is distinct from uid then
    raise exception 'not your round';
  end if;
  if r.finished or now() > r.ends_at + interval '2 seconds' then
    return json_build_object('status', 'time_up', 'score', r.score);
  end if;
  if length(n) = 0 then
    return json_build_object('status', 'empty', 'score', r.score);
  end if;

  select answer_id into aid from answer_keys where prompt_id = r.prompt_id and key = n;

  if aid is null and length(n) >= 5 then
    select k.answer_id into aid
    from answer_keys k
    where k.prompt_id = r.prompt_id
      and length(k.key) >= 5
      and abs(length(k.key) - length(n)) <= 2
      and levenshtein(k.key, n) <= case when length(n) >= 10 then 2 else 1 end
    order by levenshtein(k.key, n), length(k.key)
    limit 1;
  end if;

  if aid is null then
    update rounds set misses = misses + 1 where id = r.id;
    return json_build_object('status', 'miss', 'score', r.score);
  end if;

  select * into a from answers where id = aid;

  if aid = any(r.found) then
    return json_build_object('status', 'dupe', 'name', a.name, 'score', r.score);
  end if;

  update rounds set
    found = rounds.found || aid,
    score = rounds.score + a.rarity + case when a.is_megaohm then 100 else 0 end,
    got_megaohm = rounds.got_megaohm or a.is_megaohm
  where rounds.id = r.id
  returning * into r;

  return json_build_object(
    'status', 'hit', 'answer_id', a.id, 'name', a.name, 'rarity', a.rarity,
    'megaohm', a.is_megaohm, 'score', r.score, 'found_count', cardinality(r.found));
end $$;

create or replace function public.finish_round(p_round_id uuid)
returns void language plpgsql volatile security definer set search_path = public as $$
declare uid uuid := auth.uid(); r rounds;
begin
  select * into r from rounds where id = p_round_id for update;
  if not found then raise exception 'unknown round'; end if;
  if r.user_id is not null and r.user_id is distinct from uid then
    raise exception 'not your round';
  end if;
  update rounds set ends_at = least(ends_at, now()), finished = true where id = r.id;
end $$;

-- Round state while playing (no answers), full reveal once the round is over.
create or replace function public.get_round(p_round_id uuid)
returns json language plpgsql stable security definer set search_path = public as $$
declare uid uuid := auth.uid(); r rounds; p prompts; total int; over boolean;
begin
  select * into r from rounds where id = p_round_id;
  if not found then raise exception 'unknown round'; end if;
  if r.user_id is not null and r.user_id is distinct from uid then
    raise exception 'not your round';
  end if;
  select * into p from prompts where id = r.prompt_id;
  over := now() >= r.ends_at;

  if not over then
    return json_build_object(
      'over', false, 'round_id', r.id, 'mode', r.mode, 'ranked', r.ranked,
      'ends_at', r.ends_at, 'server_now', now(), 'score', r.score,
      'prompt_id', p.id, 'title', p.title, 'blurb', p.blurb, 'answer_count', p.answer_count,
      'found', coalesce((
        select json_agg(json_build_object('answer_id', a.id, 'name', a.name, 'rarity', a.rarity,
                                          'megaohm', a.is_megaohm) order by array_position(r.found, a.id))
        from answers a where a.id = any(r.found)), '[]'::json));
  end if;

  select count(*) into total from rounds x
    where x.prompt_id = r.prompt_id and x.ends_at <= now();

  return json_build_object(
    'over', true, 'round_id', r.id, 'mode', r.mode, 'ranked', r.ranked,
    'daily_date', r.daily_date,
    'daily_number', case when r.daily_date is null then null else (r.daily_date - date '2026-11-26') + 1 end,
    'score', r.score, 'misses', r.misses, 'got_megaohm', r.got_megaohm,
    'prompt_id', p.id, 'pack_id', p.pack_id, 'title', p.title, 'blurb', p.blurb,
    'answer_count', p.answer_count, 'found_count', cardinality(r.found),
    'answers', (
      select json_agg(json_build_object(
        'answer_id', a.id, 'name', a.name, 'rarity', a.rarity, 'megaohm', a.is_megaohm,
        'found', a.id = any(r.found),
        'found_pct', case when total = 0 then 0 else round(100.0 * (
            select count(*) from rounds x
            where x.prompt_id = r.prompt_id and x.ends_at <= now() and a.id = any(x.found)) / total) end
      ) order by a.rarity, a.name)
      from answers a where a.prompt_id = r.prompt_id));
end $$;

-- ---------------------------------------------------------------- accounts
create or replace function public.set_display_name(p_name text)
returns json language plpgsql volatile security definer set search_path = public as $$
declare uid uuid := auth.uid();
begin
  if uid is null then raise exception 'sign in first'; end if;
  if p_name !~ '^[A-Za-z0-9_.-]{3,20}$' then
    return json_build_object('ok', false, 'error', 'Use 3-20 letters, numbers, dots, dashes or underscores.');
  end if;
  if exists (select 1 from profiles where lower(display_name) = lower(p_name) and id <> uid) then
    return json_build_object('ok', false, 'error', 'That name is taken.');
  end if;
  insert into profiles (id, display_name) values (uid, p_name)
    on conflict (id) do update set display_name = excluded.display_name;
  return json_build_object('ok', true);
end $$;

-- Consecutive-day streaks from a user's ranked daily rounds.
create or replace function public.el_streaks(p_uid uuid)
returns table (current_streak int, best_streak int)
language sql stable security definer set search_path = public as $$
  with days as (
    select distinct daily_date d from rounds
    where user_id = p_uid and mode = 'daily' and ranked
  ), grp as (
    select d, d - (row_number() over (order by d))::int as g from days
  ), runs as (
    select max(d) as last_day, count(*)::int as len from grp group by g
  )
  select
    coalesce((select len from runs where last_day >= el_today() - 1 order by last_day desc limit 1), 0),
    coalesce((select max(len) from runs), 0)
$$;

create or replace function public.my_stats()
returns json language sql stable security definer set search_path = public as $$
  select case when auth.uid() is null then null else json_build_object(
    'display_name', (select display_name from profiles where id = auth.uid()),
    'total_score', coalesce((select sum(score) from rounds where user_id = auth.uid() and ranked), 0),
    'dailies_played', (select count(*) from rounds where user_id = auth.uid() and ranked and mode = 'daily'),
    'megaohms', (select count(*) from rounds where user_id = auth.uid() and ranked and got_megaohm),
    'current_streak', (select current_streak from el_streaks(auth.uid())),
    'best_streak', (select best_streak from el_streaks(auth.uid())),
    'played_today', exists (select 1 from rounds where user_id = auth.uid() and ranked
                            and mode = 'daily' and daily_date = el_today()),
    'pack_rounds', coalesce((
      select json_object_agg(prompt_id, json_build_object('score', score, 'megaohm', got_megaohm, 'round_id', id))
      from rounds where user_id = auth.uid() and ranked and mode = 'pack'), '{}'::json)
  ) end
$$;

-- ---------------------------------------------------------------- leaderboards
create or replace function public.lb_daily(p_date date default null)
returns table (rank bigint, display_name text, score int, found int, megaohm boolean)
language sql stable security definer set search_path = public as $$
  select rank() over (order by r.score desc), pr.display_name, r.score,
         cardinality(r.found), r.got_megaohm
  from rounds r join profiles pr on pr.id = r.user_id
  where r.ranked and r.mode = 'daily' and r.daily_date = coalesce(p_date, el_today())
  order by r.score desc, r.started_at
  limit 100
$$;

create or replace function public.lb_alltime()
returns table (rank bigint, display_name text, score bigint, rounds bigint, megaohms bigint)
language sql stable security definer set search_path = public as $$
  select rank() over (order by sum(r.score) desc), pr.display_name, sum(r.score),
         count(*), count(*) filter (where r.got_megaohm)
  from rounds r join profiles pr on pr.id = r.user_id
  where r.ranked
  group by pr.display_name
  order by sum(r.score) desc
  limit 100
$$;

create or replace function public.lb_pack(p_pack_id text)
returns table (rank bigint, display_name text, score bigint, prompts_played bigint, megaohms bigint)
language sql stable security definer set search_path = public as $$
  select rank() over (order by sum(r.score) desc), pr.display_name, sum(r.score),
         count(*), count(*) filter (where r.got_megaohm)
  from rounds r
  join profiles pr on pr.id = r.user_id
  join prompts p on p.id = r.prompt_id
  where r.ranked and r.mode = 'pack' and p.pack_id = p_pack_id
  group by pr.display_name
  order by sum(r.score) desc
  limit 100
$$;

create or replace function public.lb_streaks()
returns table (rank bigint, display_name text, current_streak int, best_streak int)
language sql stable security definer set search_path = public as $$
  select rank() over (order by s.best_streak desc, s.current_streak desc),
         pr.display_name, s.current_streak, s.best_streak
  from profiles pr
  cross join lateral el_streaks(pr.id) s
  where s.best_streak > 0
  order by s.best_streak desc, s.current_streak desc
  limit 100
$$;

-- ---------------------------------------------------------------- grants
revoke all on function public.el_streaks(uuid) from public, anon, authenticated;
revoke all on function public.el_daily_prompt(date) from public, anon, authenticated;
grant execute on function public.get_daily() to anon, authenticated;
grant execute on function public.start_round(text, text) to anon, authenticated;
grant execute on function public.submit_guess(uuid, text) to anon, authenticated;
grant execute on function public.finish_round(uuid) to anon, authenticated;
grant execute on function public.get_round(uuid) to anon, authenticated;
grant execute on function public.set_display_name(text) to authenticated;
grant execute on function public.my_stats() to anon, authenticated;
grant execute on function public.lb_daily(date) to anon, authenticated;
grant execute on function public.lb_alltime() to anon, authenticated;
grant execute on function public.lb_pack(text) to anon, authenticated;
grant execute on function public.lb_streaks() to anon, authenticated;
