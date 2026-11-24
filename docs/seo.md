# Search: the semantic core and the links

What is the No Man's Sky section's own in search: its sections, its menu and the story it tells, its semantic core, and
its link map. What every section of Seed Archive shares (the domain and the prefix, titles and the game's name, the
header and footer, the link rules, robots, sitemaps, Search Console, redirects, analytics, and the general review before
a release) is the portal's `docs/seo.md` (`../seed-archive/docs/seo.md`); read it first. The section lives at
`seedarchive.gg/no-mans-sky/` (`BASE_PATH` in `lib/site.ts`); every path below is under that prefix. The rules of this
section's text (the one question, words) are `.claude/rules/site-text.md`.

## Sections

| Section      | Path                                                                                                                                                                                                                                                                                               | What it is                                                                                                                                                                                                                                                                                                                  |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| How it works | `/about`                                                                                                                                                                                                                                                                                           | the method, as a funnel from the galaxy down to the one square on show                                                                                                                                                                                                                                                      |
| Database     | `/database`, `/database/<kind>` (galaxy, system, planet, ship, tool, creature), `/database/<kind>/<id>`                                                                                                                                                                                                                | finds with their portal glyphs                                                                                                                                                                                                                                                                                              |
| Guides       | `/guides`, `/guides/<group>`, `/guides/<group>/<slug>`                                                                                                                                                                                                                                             | one question a page, with the numbers as proof; built by the No Man's Sky generator                                                                                                                                                                                                                                         |
| Quests       | `/quests`, `/quests/<slug>`                                                                                                                                                                                                                                                                        | the game's quests and puzzles, read whole from the game's files; built by the No Man's Sky generator beside the guides                                                                                                                                                                                                      |
| Tools        | `/tools`, `/tools/<group>` (ships, finds, recipes, planets), `/tools/<group>/<tool>` | builders that give a shape: the Interceptor, both freighters, the living ship and frigate, the starships (every ship type a system offers); no system search yet; the luck score; the recipe books of the refiners, the Nutrient Processor, and crafting by hand, filtered by ingredient or result, each item with its card |

**The header's four questions** (the owner, 2026-11-16; a rule for every game, written for the portal by the
coordinator). A top-level item is the question a visitor came with, not a topic: Catalog, "show me what there is" (one
record a page); Guides, "what is best and why" (text and tables, grouped by item); Tools, "find or compute it for me" (a
page whose point is the result of its form); Quests, "how do I pass it" (quests and puzzles, step by step). A new page
goes where its question is, so the header never holds more than four items on a desktop; on a phone, below `md`, the
whole menu is in the drawer. How it works answers none of the four: it is in the footer only. By this rule the recipe
lists with their filter (Refiner, Crafting, Nutrient Processor) are Tools, their analysis is a group of Guides, and
farming, an answer about income, moves from Quests into that group.

**No flags.** The site has no feature flags since 2026-11-14 (the owner, for the last release): the finders and builders, the living ship and organic frigate guides, and every link to them are shown, and the Markdown blocks the flags kept (`<!-- living -->`, `<!-- interceptor-finder -->` and the other finders, with their `not-` twins) were unwrapped or dropped. `lib/archive/features.ts` is gone. The corvette guides lost their flag the same way on 2026-11-11.

The Guides were Statistics and the Catalog was the Encyclopedia until 2026-11-03. `/statistics` and
`/statistics/<slug>` redirect permanently to `/guides` (`next.config.ts`). The code keeps the old names
(`statistics.json`, `content/en/statistics/`, `StatisticsScreen`); only what a visitor reads changed.

Since 2026-11-05 each group of the menu is a page of its own, `/guides/<group>` (the group's title in lower case), and
its guides sit under it at `/guides/<group>/<slug>`. A group's page is a contents list: each guide's title, the bold
question its text opens with, and its `fact`; it tells nothing of its own and stands outside the trail of the guides,
so the last guide of a group leads straight to the first of the next. A guide's breadcrumb is Home › Guides › group ›
guide. The text of the pages keeps short `/guides/<slug>` links, and `longGuideLinks` in `lib/archive/guides.ts` makes
them long when a page is read, so a guide moved to another group needs no edit of the text; code builds the paths with
`guidePath` and `groupPath`. `next.config.ts` redirects every old `/guides/<slug>` and `/statistics/<slug>` to the long
path, from the menu file, except `galaxies`, `systems`, and `freighters`: there a group and its first guide share a
word, so the short path is now the group's page, which links to the guide.

**Quests** (the owner, 2026-11-08) is a section of its own beside the Guides, the Catalog, and the Tools, not a group of the guides menu: its contents page `/quests` lists each quest with its question and `fact`, as a group page does, and each quest stands at `/quests/<slug>` (breadcrumb Home › Quests › quest). It has a header item between Guides and Tools, an item in the phone drawer, a footer column, and its rows in the sitemap. Its pages stay off the guides menu and their trail: no guide leads into one, and battle-moves still leads back to `/about`. The No Man's Sky generator writes them into `statistics.json` beside the guides, listed under `quests`, so a quest is drawn as a guide is (`TopicScreen`, `{{name}}`, `<!-- widget:KEY -->`); its text is `content/en/quests/<slug>.md`. The paths are `QUESTS_PATH` and `questPath` in `lib/archive/guides.ts`, the pages `QUESTS` in `lib/archive/quests.ts`. Its first page is `puzzles`, the right answer to every puzzle of a building: the number sequences in one table by their numbers, the questions in words in another by their text. The second, `farming` (2026-11-14), is not a quest: the farm plants, what a harvest sells for, and how much to plant; it stands here as the owner placed it, beside the base quests.

## The site map

**The rule of the menu's order** (the owner, 2026-11-07). Two halves. The places run from the largest to the smallest:
galaxy, system, station, planet. The gear runs in the order a player upgrades it: the game starts on a planet with a
broken ship and a multitool, and the first thing you craft is the multitool's mining upgrade that digs the resources to
fix the ship; then the ship, then the freighter, then the exosuit and the exocraft, which you never find and only
upgrade through their slots. Creatures come last. A later change of the order must keep both halves or say why it
breaks them.

**The story the site tells** (the owner, 2026-11-07): how a player grows strong in No Man's Sky as well and as fast as
possible, from the rules, never a coordinate of a silver bullet. The menu reads as one trip: **where to look** (galaxy,
system, station, planet), **what to find** (multitool, ship, freighter), **what you only upgrade** (exosuit and
exocraft), and **who comes with you** (creatures). Each item group runs find → judge → upgrade → its modules, so a
player who stops at any page knows the next step. Each guide's closing sentence leads to the next guide of the menu, and
the last group's last guide leads back to `/about`.

The menu (2026-11-14), as the No Man's Sky generator writes it into `statistics-menu.json`:

| Group      | Guides, in order                                                                                                                                                                                 |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Galaxies   | galaxies, where-to-look                                                                                                                                                                          |
| Systems    | systems, economy, races                                                                                                                                                                          |
| Stations   | space-stations, technology-merchants, then the merchants: forsaken-trader … anomaly-module-merchant (outside the read-on chain, below)                                                           |
| Planets    | sources-by-size, sources-by-type, empty-worlds, sentinels-and-dissonance, fishing                                                                                                                |
| Multitools | multitool-types, multitool-classes, multitool-stats, multitool-upgrades, figures, square, supercharged-slots, best-multitools, staffs, multitool-modules                                         |
| Ships      | ship-types, ship-classes, ship-stats, ship-upgrades, ship-figures, ship-square, interceptors, best-interceptors, interceptor-prices, living-ships, starship-modules, corvettes, corvette-modules |
| Freighters | freighters, dreadnoughts, freighter-modules, frigates, organic-frigates, sentinel-capital-ship, freighter-technology                                                                             |
| Exosuit    | exosuit-modules                                                                                                                                                                                  |
| Exocraft   | roamer-, nomad-, pilgrim-, colossus-, nautilon-, minotaur-modules                                                                                                                                |
| Creatures  | creature-roles, creature-grades, creature-stats, best-creatures, creature-affinity, battle-moves                                                                                                 |
| Crafting   | farming, best-selling-dishes, food-for-scanning, food-for-hazards, refiner-loops, refining-for-money                                                                                             |

**Exosuit and Exocraft stay two groups** (the owner, 2026-11-07): a merge would move their paths; if made later, it needs
redirects of `/guides/exosuit`, `/guides/exocraft`, and every guide under them. `frigate-traits` was merged into
`frigates` and redirects to `frigates#frigate-traits`.

**Open.**

- Typed numbers. The rule asks every number of a page's own line to come from `{{name}}`. Measured values still typed:
  where-to-look's 500,000 ly; supercharged-slots' "+3% becomes +28%", "more than triples", "under two times". Game
  constants (stat ranges, slot counts, roll shares, creature-grades' 15%) are left typed until the owner decides whether
  the rule covers them.
- The one question of `.claude/rules/site-text.md` still reads "how to get the best item"; the owner's wider aim above is
  to be carried there when the owner approves the wording.

## The semantic core

Primary and secondary queries by page. The order is judgement, not measured search volume. The pages worth the most:
multitool-classes, ship-classes, freighters, interceptors, living-ships, station-upgrades, staffs, multitool-upgrades,
ship-upgrades, organic-frigates, how-lucky-am-i.

| Page                                                                        | Primary query                                                                             | Secondary                                                                |
| --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `/`                                                                         | best items no man's sky                                                                   | where to find S-class multitool; crashed ship locations; portal glyphs   |
| `/about`                                                                    | how supercharged slots work                                                               | adjacent supercharged slots; multitool sources                           |
| `/guides`                                                                   | no man's sky guides                                                                       | where to find class S; farming guide                                     |
| `/database/tool`                                                            | multitools with adjacent supercharged slots (not "S-class": most listed tools are A or B) | multitool glyphs; staff locations                                        |
| `/database/ship`                                                            | crashed ships with adjacent supercharged slots                                            | S-class crashed ship; exotic crashed ship; Sentinel Interceptor wreck    |
| `/database/creature`                                                        | best creature to adopt                                                                    | all-S creature; companion stats                                          |
| `/tools/ships/interceptor-finder`                                           | Sentinel Interceptor builder, Interceptor parts                                           | Interceptor parts; Interceptor colours                                   |
| `/tools/ships/capital-freighter-finder`                                     | capital freighter locations                                                               | best capital freighter; freighter battle system                          |
| `/tools/ships/freighter-finder`                                             | freighter shapes                                                                          | regular freighter; freighter parts                                       |
| `/tools/ships/living-ship-finder`                                           | living ship parts                                                                         | living ship types; Void Egg ship shapes                                  |
| `/tools/ships/organic-frigate-finder`                                       | living frigate parts, organic frigate parts                                                                      | organic frigate shapes; cosmic whale parts                               |
| `/tools/ships/starship-finder`                                              | starship builder; exotic, solar, fighter, hauler, explorer, shuttle parts                 | squid exotic; exotic ship shapes; solar sail ship; starship builder      |
| `/tools/finds/how-lucky-am-i`                                               | multitool rating                                                                          | is my multitool good; ship stats calculator; best staff stats            |
| `/tools/recipes/refiner-recipes`                                            | refiner recipes                                                                           | portable refiner recipes; large refiner recipes; refiner loops           |
| `/tools/recipes/cooking-recipes`                                            | cooking recipes                                                                           | nutrient processor recipes; food bonus; anomalous doughnut               |
| `/tools/recipes/crafting-recipes`                                           | crafting recipes                                                                          | what can I craft; craftable items                                        |
| best-selling-dishes                                                         | best selling food                                                                         | most valuable food; cooking for money                                    |
| food-for-scanning                                                           | best food for scanning                                                                    | anomalous doughnut; fauna analysis rewards; scan bonus food              |
| food-for-hazards                                                            | food for hazard protection                                                                | cold resistance food; radiation food                                     |
| refiner-loops                                                               | refiner loops                                                                             | chlorine loop; gold refiner loop; di-hydrogen jelly loop                 |
| refining-for-money                                                          | what to refine for money                                                                  | refining for profit; how to get nanites from a refiner                   |
| galaxies                                                                    | best galaxy                                                                               | harsh, lush galaxy; galaxy types                                         |
| where-to-look                                                               | where to find multitools                                                                  | galaxy core or rim; uncharted systems                                    |
| systems                                                                     | star system types                                                                         | star colour; how many planets                                            |
| economy                                                                     | wealthy system                                                                            | economy and class S; pirate system                                       |
| races                                                                       | Gek, Korvax, Vy'keen systems                                                              | Atlantid multitool; race and ship type                                   |
| space-stations                                                              | space station merchants                                                                   | technology merchant; pirate station; abandoned station                   |
| station-upgrades                                                            | S-class upgrade modules                                                                   | where to buy S modules; station stock                                    |
| freighters                                                                  | S-class capital freighter                                                                 | free capital freighter; freighter battle                                 |
| dreadnoughts                                                                | pirate dreadnought                                                                        | seize a dreadnought                                                      |
| freighter-modules                                                           | S-class freighter modules farm                                                            | dreadnought modules; hyperdrive module                                   |
| frigates                                                                    | S-class frigate                                                                           | frigate traits; frigate levels; Raider                                   |
| organic-frigates                                                            | organic frigate                                                                           | Dream Aerial; cosmic whale; dream answers                                |
| sentinel-capital-ship                                                       | Sentinel capital ship                                                                     | Carrier AI Fragment; wanted level 5                                      |
| sources-by-size, sources-by-type, empty-worlds                              | best planet for multitools and wrecks                                                     | planet size; biome; sea level                                            |
| sentinels-and-dissonance                                                    | dissonant planet                                                                          | dissonance resonator; corrupted Sentinels                                |
| multitool-types                                                             | multitool types                                                                           | Royal, Sentinel, Atlantid, Alien, staff                                  |
| multitool-classes                                                           | S-class multitool                                                                         | class by wealth                                                          |
| multitool-stats                                                             | best multitool stats                                                                      | max damage; scanner                                                      |
| multitool-upgrades                                                          | upgrade multitool to S                                                                    | upgrade or find at S                                                     |
| figures, square                                                             | adjacent supercharged slots                                                               | 2×2 square; slot layouts                                                 |
| supercharged-slots                                                          | supercharged slots                                                                        | adjacency bonus; best module placement; max multitool damage             |
| roamer-, nomad-, pilgrim-, colossus-modules                                 | Roamer modules (and each exocraft's name)                                                 | exocraft upgrades; exocraft slots; Colossus build                        |
| staffs                                                                      | best staff head                                                                           | Autophage staff; staff terminal                                          |
| ship-types                                                                  | ship types                                                                                | exotic, solar, hauler, fighter, explorer, shuttle                        |
| ship-classes                                                                | S-class crashed ship                                                                      | class by wealth                                                          |
| ship-stats                                                                  | best ship stats                                                                           | max hyperdrive; damage; shield                                           |
| ship-upgrades                                                               | upgrade ship to S                                                                         | do upgrades change stats; ship supercharged slots                        |
| ship-figures, ship-square                                                   | ship supercharged slots                                                                   | adjacent; square                                                         |
| interceptors                                                                | how to get a Sentinel Interceptor                                                         | Interceptor class S; dissonant planet                                    |
| interceptor-prices                                                          | how much is a Sentinel Interceptor worth                                                  | Interceptor price; crashed ship value by slots; sell crashed ship        |
| best-multitools, best-interceptors, best-creatures                          | best multitool; best Interceptor; best creature                                           | god roll; max stats; perfect S class; 100% stats                         |
| living-ships                                                                | how to get a living ship                                                                  | Void Egg; living ship quest                                              |
| creature-roles, creature-grades, creature-stats, creature-affinity          | all-S creature                                                                            | companion; Trait Potential; affinity                                     |
| `/quests`                                                                   | no man's sky quests                                                                       | puzzles and answers                                                      |
| puzzles (`/quests/puzzles`)                                                 | no man's sky puzzle answers                                                               | number sequence puzzle; manufacturing facility answers; monolith answers |
| farming (`/guides/crafting/farming`, 308 from `/quests/farming`)            | best plant to farm                                                                        | Gravitino Ball price; NipNip Buds sell; farming money; Haz-Mat Gauntlet  |
| each quest (`/quests/<slug>`)                                               | the quest's name and "rewards"                                                            | the quest's steps; the item it gives                                     |
| the merchant guides of Stations (forsaken-trader … anomaly-module-merchant) | what the merchant sells                                                                   | its stock; what it takes in trade; where it stands                       |

### The game's name

The shared rule (once a page, in the `<title>`) came from this section on 2026-11-11, when the quest and merchant pages
repeated "No Man's Sky" in the title, the bold question, and the `fact`. Here the template is
`<title> in No Man's Sky — Seed Archive` (`app/guides/[group]/[slug]/page.tsx`, `app/quests/[slug]/page.tsx`), and the
No Man's Sky generator writes each `fact` as an answer of 160 characters or fewer, free of the name.

**Quest and merchant pages outside the read-on chain** (the owner, 2026-11-11). Their closing sentence links the guide
of what the page gives or sells, or a related merchant or quest, not the next page of the menu. The chain of the other
guides stays whole: Station technology merchants still leads to the Forsaken Trader, and the Space Anomaly Module
Merchant still hands on to Sources by planet size, so the Planets group is reached from Stations. A guide that names a
merchant or a quest item links that page in its sentence (corvettes, freighter technology, the module guides' Illegal
modules, ship types, frigates' boosts, space stations' other merchants).

## The links

- **External.** The one external link cites a rule: Google's data policy on the privacy page.
- **Header.** The shared one (the portal's `docs/seo.md`); this section's part is its menu, below.
- **Menus.** Header items are real links (`ArchiveBar.tsx`). The word Guides is a link to `/guides` and the arrow beside it opens the menu, where a group's name opens the group's page; there is no All guides item. Quests is a plain link to `/quests`, in the header and in the drawer. The drawer is the same list on a phone, an accordion inside the Guides one: each name opens its page, the arrow beside it what lies under it.
- **Footer.** `ArchiveShell.tsx`, about the game: five columns, No Man's Sky first (How it works, the legal pages and release notes, both on the portal, game bugs), then the Catalog lists, one link a group of guides (to the group's own page), Quests (Puzzle answers, The Artemis Path, The Atlas Path, Starbirth, All quests; 2026-11-14), and the tools from `lib/archive/tools.ts`. It does not repeat the whole menu.
- **Tools and guides.** Interceptor builder ↔ interceptors, ship-classes, ship-square; capital freighter finder ↔
  freighters, dreadnoughts, freighter-modules; freighter finder ↔ freighters, frigates; living ship finder ↔
  living-ships, organic-frigates; How lucky am I? ↔ multitool-classes, multitool-stats, staffs, figures, ship-stats,
  ship-upgrades, ship-figures, best-multitools, best-interceptors; Interceptor prices ↔ interceptors, farming; farming ↔ exosuit-modules (the Haz-Mat
  Gauntlet, `#every-exosuit-module`).
- **The prefix and the anchors here.** `withBase` in `lib/archive/content.ts` prefixes the links and pictures of the
  Markdown, `BASE_PATH` the sprites, renders, galaxy pictures, placeholders, and the builders' folders; `anchorHeadings`
  in the same file gives every `h2` to `h4` its id.
- **Records.** `RecordNote.tsx` adds one or two sentences under a card, each to a guide or tool the card links nowhere else: a tool or ship below S leads to its upgrade guide, every tool and ship to How lucky am I?, a staff to staffs, an Interceptor to its guide and finder. The class guides are not among them: the card's Class row already links there (2026-11-04). The card's own rows link their guides (`lib/archive/explain.ts`): each base stat row leads to its section of the stats guide, `multitool-stats#damage`, `#mining`, `#scanner`, and `ship-stats#damage`, `#shield`, `#hyperdrive`, `#maneuverability`; a tool card shows Base mining as the base percent, 0% for a rifle, since the game's card has no mining figure and the Mining Beam's own speed is not read; Base damage and Base scanner are the card's absolute figures, a pistol's damage being the bare beam's 333.3 (the owner, 2026-11-04). The card's values link too: Object to the catalog list of its kind (`/tool`, `/ship`, …), and Galaxy, System, and Planet to their pages, as the breadcrumbs do; the row of the record itself stays plain.

## How to review before a release

The shared steps of the portal's `docs/seo.md` first, with `<slug>` = `no-mans-sky`, then:

1. Check each changed page against its row in the core below: the primary query in the title, the lead, and the
   description.
2. Check the text rules of `.claude/rules/site-text.md`: the forbidden words, sample sizes, places on guides, and that
   every claim is proven.
3. Add a page's row to the core when a page is added, and its links to the link map.
