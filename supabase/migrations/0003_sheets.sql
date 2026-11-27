-- MEC-style format: a "sheet" is 7 prompts, 25 seconds each, one locked-in answer per prompt,
-- scored by tier (10/15/30/60/85/100; the Megaohm is the single 100 in each prompt). Max 700.
-- Answer lists are never revealed: players only see their own answer and the accepted count.

drop function if exists public.start_round(text, text);
drop function if exists public.submit_guess(uuid, text);
drop function if exists public.finish_round(uuid);
drop function if exists public.get_round(uuid);
drop function if exists public.get_daily();
drop function if exists public.my_stats();
drop function if exists public.lb_daily(date);
drop function if exists public.lb_alltime();
drop function if exists public.lb_pack(text);
drop function if exists public.lb_streaks();
drop function if exists public.el_streaks(uuid);
drop function if exists public.el_daily_prompt(date);
drop function if exists public.el_seed_prompt(text, text, text, text, int, int, text[]);
drop table if exists public.rounds;

-- ---------------------------------------------------------------- content: rarity -> tier
alter table public.answers add column if not exists tier int;
update public.answers set tier = case
  when is_megaohm then 100 when rarity <= 5 then 10 when rarity <= 15 then 15
  when rarity <= 35 then 30 when rarity <= 60 then 60 else 85 end
  where tier is null;
alter table public.answers alter column tier set not null;
alter table public.answers add constraint answers_tier_check check (tier in (10, 15, 30, 60, 85, 100));
alter table public.answers drop column rarity;

alter table public.prompts drop column daily_order, drop column blurb;
alter table public.prompts add column chapter int not null default 1;
alter table public.prompts alter column chapter drop default;
create unique index prompts_slot on public.prompts(pack_id, chapter, sort);

-- Prompt titles stay hidden until a prompt is started.
revoke select on public.prompts from anon, authenticated;
grant select (id, pack_id, chapter, sort, answer_count) on public.prompts to anon, authenticated;

-- ---------------------------------------------------------------- sheets
create table public.plays (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  mode text not null check (mode in ('daily', 'pack')),
  daily_date date,
  pack_id text references public.packs(id) on delete cascade,
  chapter int,
  created_at timestamptz not null default now()
);
create unique index plays_one_daily on public.plays(user_id, daily_date) where mode = 'daily' and user_id is not null;
create index on public.plays(user_id);

create table public.play_items (
  play_id uuid not null references public.plays(id) on delete cascade,
  idx int not null check (idx between 0 and 6),
  prompt_id text not null references public.prompts(id) on delete cascade,
  started_at timestamptz,
  ends_at timestamptz,
  answer_id int references public.answers(id) on delete set null,
  points int,
  misses int not null default 0,
  primary key (play_id, idx)
);
create index on public.play_items(prompt_id);

alter table public.plays enable row level security;
alter table public.play_items enable row level security;

-- ---------------------------------------------------------------- helpers
-- 7 prompts per day: walk a fresh shuffle of the whole bank each cycle, so nothing repeats within a cycle.
create or replace function public.el_daily_ids(d date)
returns text[] language sql stable set search_path = public as $$
  with k as (
    select greatest(0, d - date '2026-11-26') as day_idx,
           greatest(1, (select count(*) from prompts)::int / 7) as per_cycle
  ), shuffled as (
    select id, row_number() over (order by md5((k.day_idx / k.per_cycle)::text || ':' || id)) - 1 as ord, k.*
    from prompts, k
  )
  select array_agg(id order by ord) from shuffled
  where ord >= (day_idx % per_cycle) * 7 and ord < (day_idx % per_cycle) * 7 + 7
$$;

create or replace function public.el_own_play(p_play uuid)
returns public.plays language plpgsql stable security definer set search_path = public as $$
declare pl plays;
begin
  select * into pl from plays where id = p_play;
  if not found then raise exception 'unknown sheet'; end if;
  if pl.user_id is not null and pl.user_id is distinct from auth.uid() then raise exception 'not your sheet'; end if;
  return pl;
end $$;

create or replace function public.el_play_json(p_play uuid)
returns json language sql stable security definer set search_path = public as $$
  with pl as (select * from plays where id = p_play),
  it as (
    select i.idx, i.points, i.misses, i.ends_at, q.title, q.answer_count,
           a.name as answer_name, coalesce(a.is_megaohm, false) as megaohm,
           case when i.points is not null then 'done'
                when i.started_at is null then 'todo'
                when now() > i.ends_at + interval '1.5 seconds' then 'done'
                else 'active' end as state
    from play_items i
    join prompts q on q.id = i.prompt_id
    left join answers a on a.id = i.answer_id
    where i.play_id = p_play
  )
  select json_build_object(
    'play_id', pl.id, 'mode', pl.mode, 'ranked', pl.user_id is not null,
    'daily_date', pl.daily_date,
    'daily_number', case when pl.daily_date is null then null else (pl.daily_date - date '2026-11-26') + 1 end,
    'pack_id', pl.pack_id, 'pack_name', (select name from packs where id = pl.pack_id), 'chapter', pl.chapter,
    'server_now', now(),
    'total', (select coalesce(sum(points), 0) from it),
    'finished', not exists (select 1 from it where state <> 'done'),
    'items', (select json_agg(json_build_object(
        'idx', idx, 'state', state,
        'title', case when state = 'todo' then null else title end,
        'answer', answer_name,
        'points', case when state = 'done' then coalesce(points, 0) end,
        'megaohm', megaohm,
        'accepted', case when state = 'done' then answer_count end,
        'misses', misses,
        'ends_at', case when state = 'active' then ends_at end) order by idx) from it))
  from pl
$$;

-- ---------------------------------------------------------------- gameplay API
create or replace function public.get_daily()
returns json language sql stable security definer set search_path = public as $$
  select json_build_object(
    'daily_date', el_today(),
    'daily_number', (el_today() - date '2026-11-26') + 1,
    'prompts', 7,
    'players', (select count(*) from plays where mode = 'daily' and daily_date = el_today()))
$$;

create or replace function public.start_play(p_mode text, p_pack text default null, p_chapter int default null)
returns json language plpgsql volatile security definer set search_path = public as $$
declare uid uuid := auth.uid(); d date; ids text[]; pid uuid; existing uuid;
begin
  if p_mode = 'daily' then
    d := el_today();
    ids := el_daily_ids(d);
    if uid is not null then
      select id into existing from plays where user_id = uid and mode = 'daily' and daily_date = d;
      if existing is not null then return el_play_json(existing); end if;
    end if;
  elsif p_mode = 'pack' then
    select array_agg(id order by sort) into ids from prompts where pack_id = p_pack and chapter = p_chapter;
    if ids is null then raise exception 'unknown chapter'; end if;
  else
    raise exception 'bad mode';
  end if;

  insert into plays (user_id, mode, daily_date, pack_id, chapter)
    values (uid, p_mode, d, case when p_mode = 'pack' then p_pack end, case when p_mode = 'pack' then p_chapter end)
    returning id into pid;
  insert into play_items (play_id, idx, prompt_id)
    select pid, (o - 1)::int, x from unnest(ids) with ordinality as t(x, o);
  return el_play_json(pid);
end $$;

create or replace function public.get_play(p_play uuid)
returns json language plpgsql stable security definer set search_path = public as $$
begin
  perform el_own_play(p_play);
  return el_play_json(p_play);
end $$;

create or replace function public.start_item(p_play uuid, p_idx int)
returns json language plpgsql volatile security definer set search_path = public as $$
declare it play_items;
begin
  perform el_own_play(p_play);
  update play_items set points = 0
    where play_id = p_play and points is null and started_at is not null and now() > ends_at + interval '1.5 seconds';
  select * into it from play_items where play_id = p_play and idx = p_idx for update;
  if not found then raise exception 'bad prompt index'; end if;
  if it.started_at is null then
    if exists (select 1 from play_items where play_id = p_play and idx < p_idx and points is null) then
      raise exception 'finish the earlier prompts first';
    end if;
    update play_items set started_at = now(), ends_at = now() + interval '25 seconds'
      where play_id = p_play and idx = p_idx;
  end if;
  return el_play_json(p_play);
end $$;

create or replace function public.guess_item(p_play uuid, p_idx int, p_guess text)
returns json language plpgsql volatile security definer set search_path = public, extensions as $$
declare it play_items; n text := el_norm(left(coalesce(p_guess, ''), 80)); aid int; a answers; cnt int;
begin
  perform el_own_play(p_play);
  select * into it from play_items where play_id = p_play and idx = p_idx for update;
  if not found then raise exception 'bad prompt index'; end if;
  if it.started_at is null then raise exception 'prompt not started'; end if;
  if it.points is not null then return json_build_object('status', 'done'); end if;
  if now() > it.ends_at + interval '1.5 seconds' then
    update play_items set points = 0 where play_id = p_play and idx = p_idx;
    return json_build_object('status', 'time_up');
  end if;
  if length(n) = 0 then return json_build_object('status', 'miss'); end if;

  select answer_id into aid from answer_keys where prompt_id = it.prompt_id and key = n;
  if aid is null and length(n) >= 5 then
    select k.answer_id into aid from answer_keys k
    where k.prompt_id = it.prompt_id and length(k.key) >= 5
      and abs(length(k.key) - length(n)) <= 2
      and levenshtein(k.key, n) <= case when length(n) >= 10 then 2 else 1 end
    order by levenshtein(k.key, n), length(k.key) limit 1;
  end if;

  if aid is null then
    update play_items set misses = misses + 1 where play_id = p_play and idx = p_idx;
    return json_build_object('status', 'miss');
  end if;

  select * into a from answers where id = aid;
  select answer_count into cnt from prompts where id = it.prompt_id;
  update play_items set answer_id = aid, points = a.tier where play_id = p_play and idx = p_idx;
  return json_build_object('status', 'hit', 'answer', a.name, 'points', a.tier, 'megaohm', a.is_megaohm, 'accepted', cnt);
end $$;

-- Give up on (or time out) the active prompt.
create or replace function public.skip_item(p_play uuid, p_idx int)
returns json language plpgsql volatile security definer set search_path = public as $$
begin
  perform el_own_play(p_play);
  update play_items set points = 0
    where play_id = p_play and idx = p_idx and started_at is not null and points is null;
  return el_play_json(p_play);
end $$;

-- ---------------------------------------------------------------- scoring views (internal)
create or replace function public.el_pack_best()
returns table (user_id uuid, prompt_id text, pack_id text, best int)
language sql stable security definer set search_path = public as $$
  select p.user_id, i.prompt_id, q.pack_id, max(coalesce(i.points, 0))::int
  from play_items i join plays p on p.id = i.play_id join prompts q on q.id = i.prompt_id
  where p.mode = 'pack' and p.user_id is not null and i.started_at is not null
  group by 1, 2, 3
$$;

create or replace function public.el_daily_totals()
returns table (user_id uuid, daily_date date, total int, megaohms int)
language sql stable security definer set search_path = public as $$
  select p.user_id, p.daily_date, coalesce(sum(i.points), 0)::int,
         (count(*) filter (where i.points = 100))::int
  from plays p join play_items i on i.play_id = p.id
  where p.mode = 'daily' and p.user_id is not null
  group by 1, 2
  having bool_or(i.started_at is not null)
$$;

create or replace function public.el_streaks(p_uid uuid)
returns table (current_streak int, best_streak int)
language sql stable security definer set search_path = public as $$
  with days as (select daily_date d from el_daily_totals() where user_id = p_uid),
  grp as (select d, d - (row_number() over (order by d))::int as g from days),
  runs as (select max(d) as last_day, count(*)::int as len from grp group by g)
  select
    coalesce((select len from runs where last_day >= el_today() - 1 order by last_day desc limit 1), 0),
    coalesce((select max(len) from runs), 0)
$$;

-- ---------------------------------------------------------------- stats & leaderboards
create or replace function public.my_stats()
returns json language sql stable security definer set search_path = public as $$
  select case when auth.uid() is null then null else json_build_object(
    'display_name', (select display_name from profiles where id = auth.uid()),
    'total_score',
      coalesce((select sum(total) from el_daily_totals() where user_id = auth.uid()), 0)
      + coalesce((select sum(best) from el_pack_best() where user_id = auth.uid()), 0),
    'dailies_played', (select count(*) from el_daily_totals() where user_id = auth.uid()),
    'megaohms', (select count(distinct i.prompt_id) from play_items i join plays p on p.id = i.play_id
                 where p.user_id = auth.uid() and i.points = 100),
    'current_streak', (select current_streak from el_streaks(auth.uid())),
    'best_streak', (select best_streak from el_streaks(auth.uid())),
    'today', (select json_build_object('play_id', id, 'total', (el_play_json(id)->>'total')::int,
                                       'finished', (el_play_json(id)->>'finished')::boolean)
              from plays where user_id = auth.uid() and mode = 'daily' and daily_date = el_today()),
    'pack_best', coalesce((select json_object_agg(prompt_id, best) from el_pack_best() where user_id = auth.uid()), '{}'::json)
  ) end
$$;

create or replace function public.lb_daily(p_date date default null)
returns table (rank bigint, display_name text, score int, megaohms int)
language sql stable security definer set search_path = public as $$
  select rank() over (order by t.total desc), pr.display_name, t.total, t.megaohms
  from el_daily_totals() t join profiles pr on pr.id = t.user_id
  where t.daily_date = coalesce(p_date, el_today())
  order by t.total desc limit 100
$$;

create or replace function public.lb_alltime()
returns table (rank bigint, display_name text, score bigint, dailies bigint)
language sql stable security definer set search_path = public as $$
  with s as (
    select user_id, total::bigint as pts, 1 as daily from el_daily_totals()
    union all
    select user_id, best::bigint, 0 from el_pack_best()
  )
  select rank() over (order by sum(s.pts) desc), pr.display_name, sum(s.pts)::bigint, sum(s.daily)::bigint
  from s join profiles pr on pr.id = s.user_id
  group by pr.display_name order by 3 desc limit 100
$$;

create or replace function public.lb_pack(p_pack_id text)
returns table (rank bigint, display_name text, score bigint, prompts_played bigint, megaohms bigint)
language sql stable security definer set search_path = public as $$
  select rank() over (order by sum(b.best) desc), pr.display_name, sum(b.best)::bigint,
         count(*), count(*) filter (where b.best = 100)
  from el_pack_best() b join profiles pr on pr.id = b.user_id
  where b.pack_id = p_pack_id
  group by pr.display_name order by 3 desc limit 100
$$;

create or replace function public.lb_streaks()
returns table (rank bigint, display_name text, current_streak int, best_streak int)
language sql stable security definer set search_path = public as $$
  select rank() over (order by s.best_streak desc, s.current_streak desc), pr.display_name, s.current_streak, s.best_streak
  from profiles pr cross join lateral el_streaks(pr.id) s
  where s.best_streak > 0
  order by s.best_streak desc, s.current_streak desc limit 100
$$;

-- ---------------------------------------------------------------- content loader (internal)
-- body: one answer per line, "<tier> <Name> | alias | alias".
create or replace function public.el_seed_prompt(p_pack text, p_chapter int, p_sort int, p_id text, p_title text, p_body text)
returns void language plpgsql security definer set search_path = public as $$
declare line text; m text[]; names text[]; nm text; aid int; cnt int := 0; tops int := 0;
begin
  insert into prompts (id, pack_id, chapter, sort, title, answer_count) values (p_id, p_pack, p_chapter, p_sort, p_title, 0);
  foreach line in array string_to_array(p_body, E'\n') loop
    line := btrim(line);
    continue when line = '';
    m := regexp_match(line, '^(\d+)\s+(.+)$');
    if m is null then raise exception 'bad line in %: %', p_id, line; end if;
    names := array(select btrim(x) from unnest(string_to_array(m[2], '|')) x where btrim(x) <> '');
    insert into answers (prompt_id, name, tier, is_megaohm) values (p_id, names[1], m[1]::int, m[1]::int = 100)
      returning id into aid;
    foreach nm in array names loop
      insert into answer_keys (prompt_id, key, answer_id) values (p_id, el_norm(nm), aid)
        on conflict (prompt_id, key) do nothing;
    end loop;
    cnt := cnt + 1;
    if m[1]::int = 100 then tops := tops + 1; end if;
  end loop;
  if tops <> 1 then raise exception '% must have exactly one 100-point Megaohm (has %)', p_id, tops; end if;
  update prompts set answer_count = cnt where id = p_id;
end $$;

-- ---------------------------------------------------------------- grants
revoke all on function public.el_daily_ids(date) from public, anon, authenticated;
revoke all on function public.el_own_play(uuid) from public, anon, authenticated;
revoke all on function public.el_play_json(uuid) from public, anon, authenticated;
revoke all on function public.el_pack_best() from public, anon, authenticated;
revoke all on function public.el_daily_totals() from public, anon, authenticated;
revoke all on function public.el_streaks(uuid) from public, anon, authenticated;
revoke all on function public.el_seed_prompt(text, int, int, text, text, text) from public, anon, authenticated;
grant execute on function public.get_daily() to anon, authenticated;
grant execute on function public.start_play(text, text, int) to anon, authenticated;
grant execute on function public.get_play(uuid) to anon, authenticated;
grant execute on function public.start_item(uuid, int) to anon, authenticated;
grant execute on function public.guess_item(uuid, int, text) to anon, authenticated;
grant execute on function public.skip_item(uuid, int) to anon, authenticated;
grant execute on function public.my_stats() to anon, authenticated;
grant execute on function public.lb_daily(date) to anon, authenticated;
grant execute on function public.lb_alltime() to anon, authenticated;
grant execute on function public.lb_pack(text) to anon, authenticated;
grant execute on function public.lb_streaks() to anon, authenticated;
