import "server-only";

import type { Kind } from "@/lib/archive/kinds";
import {
  databasePath,
  kindPath,
  recordPath,
  toolGroupOf,
  toolGroupPath,
  TOOLS_PATH,
} from "@/lib/archive/paths";
import type { ToolGroupSlug, ToolSlug } from "@/lib/archive/tools";
import { TOOL_GROUPS, TOOLS } from "@/lib/archive/tools";
import type { TrailStep } from "@/lib/archive/read";
import type { PageStep } from "@/lib/archive/trail";
import type { Language } from "@/lib/i18n/languages";
import { messageOf } from "@/lib/i18n/messages";

// The trails of the Database and the tools, every step's name a message of the
// page's language; the paths carry no language, `Trail` adds it.

const home = (language: Language): PageStep => ({
  name: messageOf(language, "archive.home"),
  href: "/",
});

// Home › Database, the start of every Database trail.
function database(language: Language, linked: boolean): PageStep[] {
  const name = messageOf(language, "archive.browse");
  return [home(language), linked ? { name, href: databasePath() } : { name }];
}

export function databaseTrail(language: Language): PageStep[] {
  return database(language, false);
}

// Home › Database › <kind>.
export function kindTrail(language: Language, kind: Kind): PageStep[] {
  return [
    ...database(language, true),
    { name: messageOf(language, `kinds.${kind}`) },
  ];
}

// Home › Database › <kind list> › every record above › the record. A kind with
// no list of its own (a space station) skips that step.
export function recordTrail(
  language: Language,
  kind: Kind,
  name: string,
  above: TrailStep[],
  hasList: boolean,
): PageStep[] {
  return [
    ...database(language, true),
    ...(hasList
      ? [{ name: messageOf(language, `kinds.${kind}`), href: kindPath(kind) }]
      : []),
    ...above.map((step) => ({
      name: step.name,
      href: recordPath(step.kind, step.id),
    })),
    { name },
  ];
}

function tools(language: Language): PageStep[] {
  return [
    home(language),
    { name: messageOf(language, "archive.tools"), href: TOOLS_PATH },
  ];
}

// Home › Tools › <group>.
export function toolGroupTrail(
  language: Language,
  group: ToolGroupSlug,
): PageStep[] {
  const found = TOOL_GROUPS.find((one) => one.slug === group);
  return [...tools(language), { name: messageOf(language, found?.id ?? "") }];
}

// Home › Tools › <group> › <tool>.
export function toolTrail(language: Language, slug: ToolSlug): PageStep[] {
  const group = toolGroupOf(slug);
  const tool = TOOLS.find((one) => one.slug === slug);
  return [
    ...tools(language),
    ...(group
      ? [
          {
            name: messageOf(language, group.id),
            href: toolGroupPath(group.slug),
          },
        ]
      : []),
    { name: messageOf(language, tool?.id ?? "") },
  ];
}
