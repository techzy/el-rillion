-- Internal helper used by supabase/seed.sql. Not callable by site visitors.
create or replace function public.el_seed_prompt(
  p_pack text, p_id text, p_title text, p_blurb text, p_sort int, p_daily int, items text[])
returns void language plpgsql security definer set search_path = public as $$
declare it text; parts text[]; nm text; rar int; mx int; aid int; al text;
begin
  select max(split_part(x, '|', 2)::int) into mx from unnest(items) x;
  insert into prompts (id, pack_id, title, blurb, sort, daily_order, answer_count)
    values (p_id, p_pack, p_title, p_blurb, p_sort, p_daily, cardinality(items));
  foreach it in array items loop
    parts := string_to_array(it, '|');
    nm := parts[1]; rar := parts[2]::int;
    insert into answers (prompt_id, name, rarity, is_megaohm) values (p_id, nm, rar, rar = mx)
      returning id into aid;
    insert into answer_keys (prompt_id, key, answer_id) values (p_id, el_norm(nm), aid);
    if coalesce(parts[3], '') <> '' then
      foreach al in array string_to_array(parts[3], ';') loop
        insert into answer_keys (prompt_id, key, answer_id) values (p_id, el_norm(al), aid)
          on conflict (prompt_id, key) do update set answer_id = excluded.answer_id
          where answer_keys.answer_id = excluded.answer_id;
      end loop;
    end if;
  end loop;
end $$;
revoke all on function public.el_seed_prompt(text, text, text, text, int, int, text[]) from public, anon, authenticated;

-- Hardening (applied after initial deploy).
alter function public.el_today() set search_path = public;
revoke execute on function public.set_display_name(text) from public, anon;
grant execute on function public.set_display_name(text) to authenticated;
