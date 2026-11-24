---
paths:
  - "app/**"
  - "components/**"
  - "lib/**"
  - "next.config.ts"
---

# Site code

The stack, the principles, forms, localization and Supabase types follow the archive's `site-code.md`. Here besides:

- This Next.js is newer than most examples: read the guide in `node_modules/next/dist/docs/` before using an API
  (`01-app/01-getting-started` covers server and client components, data, caching, metadata).
- Material UI for every control and layout; theme tokens over literal colours.
- Supabase types (`lib/db/supabase.types.ts`) come from `npm run supabase:generate`, then prettier.

## Data

- Paths of guides are built with `guidePath` and `groupPath`, never typed; paths of the Database and the tools with
  `lib/archive/paths.ts` (`databasePath`, `kindPath`, `recordPath`, `toolGroupPath`, `toolPath`), which also makes
  the Markdown's short links long (`longArchiveLinks`).
- Statistics numbers print only through `lib/archive/statistics-format.ts`. A galaxy in a table goes through
  `GalaxyLink`; a new galaxy on a page needs a line in `lib/archive/galaxies.ts`.
- Every table of numbers gets a chart, in `lib/archive/statistics-charts.ts`, on the server, from `rawTableOf`, drawn by
  `ChartBlock` of `@seed-archive/ui/chart` with Chart first and the table kept in the HTML. Charts use `@mui/x-charts`, free version. Colours
  live in `lib/archive/chart-colors.ts`, one per thing, on every chart. A chart draws counts on one scale, never two
  shares of different wholes side by side.
- The code keeps the old names (`statistics.json`, `content/en/statistics/`, `StatisticsScreen`); only what a visitor
  reads changed.
- A canvas never reads a weight from alpha: a browser zeroes the colour of a pixel of alpha 0.

## Languages

Every page's address names its language, `/no-mans-sky/<en|ru|es|de>/…` (the portal's `docs/architecture.md`, D20,
2026-11-24). How the code keeps it:

- Every route lives under `app/[lang]`; `lib/i18n/languages.ts` holds the codes and `localPath`.
- A path in the code is written without a language (`/guides`, `guidePath(…)`). A link goes through
  `components/archive/LocalLink` (next/link that adds the page's language), a server trail through `Trail`, a router
  call through `useLocalRouter`, and HTML a helper writes through `localPath`.
- A page exports `generateMetadata` through `localMetadata(path, …)` (canonical to itself, hreflang to each
  translation, x-default to English) and starts with `requireTranslation(path)`, which answers 307 to English when
  the page is not translated.
- A page counts as translated in a language only once it is listed in `lib/i18n/translations.ts`; that list also
  feeds hreflang and the sitemap.
- `indexable(language, path)` (`lib/i18n/indexing.ts`) says whether search engines index a page: the Database
  (`/database…`) in English only (the owner, 2026-11-24). `localMetadata` makes the others noindex,follow and leaves
  them out of hreflang; the sitemap leaves them out.
- An address without a language answers 308 to English: the proxy for every page, `next.config.ts` for the section's
  root and the old addresses (straight to `/en/`, one hop). A two-letter code the archive does not have answers 404.
- The browser's language never redirects: `LanguageNotice` offers the page in it, in that language, and keeps the
  reader's answer in `localStorage` under `LANGUAGE_KEY` of `@seed-archive/ui/language-switcher`
  (`seed-archive.language`), shared by every section of the domain. The header's `HeaderLanguages` is the package's
  `LanguageSwitcher` over the page's translations; it writes the same key.
- Long text is `content/<language>/…`; labels are `lib/i18n/<language>.json`, loaded on the server for the page's
  language only.
- The guides' tables and sentences are keys in `statistics.json`; their text is `lib/i18n/statistics/<language>.json`
  (English written by the generator; part 1 in the other languages), with a file a menu group in
  `lib/i18n/statistics/<language>/<group>.json` for the later parts (`lib/i18n/catalogue-groups.ts`), read through
  `lib/i18n/statistics.ts` on the server; the menu's through messages and `useText`.
- A word beside a number in a guide's Markdown is `{{name, plural, one {# …} other {# …}}}`, formatted alone by
  `intl-messageformat` in `fillStatistics`.
- A translated page keeps the English page's heading ids, heading by heading (`readContent`).
- `npm test` (`test/translations.test.ts`) fails when a language lacks a label of `en.json`, or when a guide listed
  as translated lacks a key of its catalogue or its Markdown.
- Numbers print in the page's language: `statistics-format.ts` takes a `NumberStyle` (the locale for `count` and
  `share` of `@seed-archive/ui` 1.6, and the words of `numbers` in `lib/i18n/<locale>.json`); charts get the locale.
- One word for one thing: `lib/i18n/glossary.json` names, for each term the game and the interface fix, the form a
  language uses and the forms it replaced; `test/glossary.test.ts` fails when a replaced form appears in a
  language's labels, catalogue or Markdown. A translator's new decision of a term is added there.
