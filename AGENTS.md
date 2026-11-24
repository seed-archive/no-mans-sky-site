<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# No Man's Sky site

The No Man's Sky section of Seed Archive, live at https://seedarchive.gg/no-mans-sky/ (`basePath` `/no-mans-sky`,
`lib/site.ts`); the No Man's Sky generator fills its data. How to work and write code here is `.claude/rules/`; how the
games and the portal fit together is `../.claude/rules/architecture.md`.

## Parts

| Part | What it is |
|---|---|
| `app` | Next.js routes: the Database (`database/[kind]`), `guides`, `quests`, the tools (`tools/<group>/<tool>`), `about`, the legal pages, `api` |
| `components` | `archive` (screens and widgets), `legal`, `providers` (theme, intl, auth) |
| `lib` | `site.ts` (the section's prefix), `archive` (queries, statistics, guides), `db` (Supabase client and generated types), `i18n` (messages) |
| `content` | Markdown of every long text, one folder a locale |
| `public` | pictures: ship part layers, renders, module icons, fonts |
| `supabase` | the schema: `migrations`, `config.toml` |
| `docs` | `seo.md`: the semantic core, the link map, the review before a release |
| `.github/workflows` | `production.yml`: a merge to `main` deploys and migrates production |

## Run

```bash
npm run dev                    # the site on localhost:5010/no-mans-sky
npx supabase start             # the local database, Docker stack supabase_*_no-mans-sky-site
npx supabase migration up --local
npm run supabase:generate      # types from the local database
npm run lint
npm run build
```

## Rules

How to work here is `.claude/rules/` (this site's own) and `../.claude/rules/` (the whole archive: editing, working,
site-code, site-text, docs, architecture).
