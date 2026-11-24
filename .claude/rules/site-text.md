---
paths:
  - "content/**"
  - "lib/i18n/**"
  - "app/**/page.tsx"
---

# Site text

## The one question

The site answers one question: **how to get the best item in No Man's Sky.** Every page is a cut of it, first by item
(multitool, ship, freighter, frigate, creature, upgrade module), then by where (galaxy, system, station, planet). A page
that answers no part of that question does not belong on the site.

## A page

- Every page has one `<h1>`. A menu label equals the `<h1>` of the page it opens.
- Each page opens with its question in bold, in the words a player types, and answers it in the same line. The sections
  back the answer up, biggest point first.
- A guide's `<title>` is `<title> in No Man's Sky — Seed Archive`, or its question for the pages worth the most
  (`TITLES` in `app/guides/[group]/[slug]/page.tsx`); a group's is `<group> guides for No Man's Sky — Seed Archive`.
  A guide's description is its `fact`. A tool's `<title>` names No Man's Sky and the thing found.
- The game's name stands once a page, in its `<title>`. The bold question, the headings, and the `fact` of a guide or
  a quest do not repeat it (the owner, 2026-11-11; `docs/seo.md`, "The game's name").
- A quest (`/quests/<slug>`) follows the guide's rules of text, title, and description: `<title> in No Man's Sky —
  Seed Archive`, its `fact` as the description; `/quests` is `Quests in No Man's Sky — Seed Archive`. A quest stands
  outside the trail of the guides: it ends with a sentence that links the guides, not a next guide.
- A quest page answers what the quest gives and how to pass it: its steps, and every item it hands over with the
  game's description and picture, quest-only items included. An item's stats live only on the guide of its item. The
  quest page links that guide for them, and the guide names the quest in the item's source, linked back (the owner,
  2026-11-11).
- A guide ends with its conclusion, what the reader should now do, and in the same lines the link to the next guide
  of the menu; the last leads back to `/about`. A bare "the next one is X" is not an ending (the owner, 2026-11-21).
  It links in its text to the guides it relies on, the tool that acts on it, and the catalog list it describes. Every
  guide is reached from at least two other pages.
- **A conclusion stands under the data** (the owner, 2026-11-21: the analysed data is what the site brings, and a
  table without its conclusion is not analysis): under a table, or under the tables of one thing, a sentence or two
  say what to take, buy, keep or skip, and why, with the numbers that decide it through `{{name}}`.
- **A table has three rows or more of one kind.** One or two values are a sentence with the values in it
  (the owner, 2026-11-21). A quest's items keep their table at any count: it carries their pictures.
- **A section heading is a question only where a player types that question**: where the page's row of the semantic
  core (`docs/seo.md`) lists it, the heading is that question in his words, and the section's first sentence answers
  it. Every other heading is a short name a reader scans for. The site is written for a living reader who came with
  a question; a heading is never turned into a question for a search engine alone (the owner, 2026-11-21).
- No number of a guide is typed into its text: the numbers of its own line go through `{{name}}`, so a recount moves
  them.
- What to farm, proof of claims, and sample sizes follow the archive's `site-text.md`; the publicly posted farm
  systems of `freighter-modules` are its exception, with their credit.

## Links

The rules of links are the portal's `docs/seo.md`. Here besides:

- A galaxy's name links to its page; in a sentence, only the first Euclid of a page links.
- A link to a guide is the short `/guides/<slug>`; the site makes it long.
- A link to a database list or record is the short `/<kind>/<id>`; a link to a tool the short `/tools/<slug>`; the
  site makes them long (`/database/<kind>/<id>`, `/tools/<group>/<slug>`).

## Words

- Spots start above the sea. Where the sea-level filter appears, it is named sea level, never "water test" or
  "misses", so no reader takes those spots for places that exist and give nothing.
- Never on the site: generator, seed, code; sample sizes, counts of systems, "none of N". A table note names what was
  measured, never how many.
- **multitool**, one word; "Multi-Tool" only when a game item name is quoted.
- Terms as in the game or the community: class S, supercharged slots, crashed ship, Sentinel Interceptor, capital
  freighter, dreadnought, living ship, Void Egg, organic frigate, Dream Aerial, upgrade module, portal glyphs. The
  game's own names stay: Uncharted, dissonant, Crashed Ship, Harmonic Camp, Trait Potential.
- One word for one thing:

| Say | Not | Why |
|---|---|---|
| wealth, low, medium, high; one, two, three stars once on Economy | economy size, the stars | `Economy: Trading, Wealthy` |
| pirate system; Pirate Controlled once on Economy | outlaw system | the conflict readout |
| economy type | economy | the game calls both economy, so the type is named |
| adjacent, adjacent slots | touching | the community word |
| upgrade, upgraded | raise, raised | the community word; a station sells a class upgrade |
| base stats, a stat | base bonuses, a bonus | the owner's card line |
| ship type, the type | hull | the community word |
| as you find it | at its own place, on offer | a reader has no load place |
| tools a system page lists | reaches a list, kept | a list means nothing outside `/about` |
| is class S | lies at class S | |

When a rule changes, change it here; `docs/seo.md` keeps the semantic core and the review before a release.
