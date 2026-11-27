// Content format. One answer per line:
//   <tier> <Canonical name> | alias | alias
// Tiers: 10 everyone says it · 15 textbook · 30 lab bench · 60 datasheet deep-cut · 85 footnote
//        100 the Megaohm (exactly one per prompt).
// Matching ignores case, spaces, punctuation, accents and a trailing plural "s", and forgives small typos.
export function p(id, title, body) {
  return { id, title, body: body.trim() };
}
