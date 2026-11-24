// Every address of the Database and the tools, built here and never typed (the
// owner, 2026-11-24). The paths carry no language: a link adds it.
//
// The catalog is the Database, under its menu segment: /database, its lists
// /database/<kind>, its records /database/<kind>/<id>. The tools stand under
// their group: /tools/<group>/<tool>. Imported by next.config.ts too, so only
// relative imports.

import { KINDS, type Kind } from "./kinds";
import { TOOL_GROUPS, TOOLS, type ToolGroupSlug, type ToolSlug } from "./tools";

export const DATABASE_PATH = "/database";

export const TOOLS_PATH = "/tools";

export function databasePath() {
  return DATABASE_PATH;
}

export function kindPath(kind: Kind) {
  return `${DATABASE_PATH}/${kind}`;
}

export function recordPath(kind: Kind, id: string) {
  return `${kindPath(kind)}/${id}`;
}

export function toolGroupPath(group: ToolGroupSlug) {
  return `${TOOLS_PATH}/${group}`;
}

const GROUP_OF_TOOL = new Map<string, ToolGroupSlug>(
  TOOLS.map((tool) => [tool.slug, tool.group]),
);

export function isToolSlug(value: string): value is ToolSlug {
  return GROUP_OF_TOOL.has(value);
}

export function toolPath(slug: ToolSlug) {
  return `${toolGroupPath(GROUP_OF_TOOL.get(slug) as ToolGroupSlug)}/${slug}`;
}

export function toolGroupOf(slug: ToolSlug) {
  return TOOL_GROUPS.find((group) => group.slug === GROUP_OF_TOOL.get(slug));
}

// The Markdown keeps the short links, `/<kind>/<id>` to the Database and
// `/tools/<slug>` to a tool (`site-text.md` → Links), so a move needs no edit
// of the text; they are made long here, their section or query kept.
const SHORT_RECORD = new RegExp(`\\]\\(/(${KINDS.join("|")})(?=[/)#?])`, "g");
const SHORT_TOOL = /\]\(\/tools\/([a-z0-9-]+)(?=[)#?])/g;

export function longArchiveLinks(markdown: string) {
  return markdown
    .replace(SHORT_RECORD, (_, kind: string) => `](${DATABASE_PATH}/${kind}`)
    .replace(SHORT_TOOL, (link, slug: string) =>
      isToolSlug(slug) ? `](${toolPath(slug)}` : link,
    );
}
