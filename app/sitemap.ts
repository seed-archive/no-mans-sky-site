import type { MetadataRoute } from "next";

import statisticsMenu from "@/lib/archive/statistics-menu.json";
import { FEED_KINDS, type Kind, STATION_BUILDING } from "@/lib/archive/kinds";
import {
  databasePath,
  kindPath,
  recordPath,
  toolGroupPath,
  TOOLS_PATH,
  toolPath,
} from "@/lib/archive/paths";
import { TOOL_GROUPS, TOOLS } from "@/lib/archive/tools";
import { indexable } from "@/lib/i18n/indexing";
import { TOPICS } from "@/lib/archive/statistics";
import { createArchiveClient } from "@/lib/db/supabase.server";
import {
  groupPath,
  guidePath,
  QUESTS_PATH,
  questPath,
} from "@/lib/archive/guides";
import { QUESTS } from "@/lib/archive/quests";
import { localPath } from "@/lib/i18n/languages";
import { translationsOf } from "@/lib/i18n/translations";

const BATCH = 1000;
// The showcase star's galaxy stays off the map: a reader finds it, Google does not.
const HIDDEN_GALAXY = "galaxy:245";

// Every record under a galaxy other than the hidden one.
async function recordEntries(base: string): Promise<MetadataRoute.Sitemap> {
  const supabase = await createArchiveClient();
  if (!supabase) {
    return [];
  }
  const rows: {
    id: string;
    kind: string;
    name: string;
    locator: string | null;
    parent_id: string | null;
  }[] = [];
  for (let from = 0; ; from += BATCH) {
    const { data, error } = await supabase
      .from("assets")
      .select("id, kind, name, locator, parent_id")
      .order("id")
      .range(from, from + BATCH - 1);
    if (error) {
      throw error;
    }
    rows.push(...data);
    if (data.length < BATCH) {
      break;
    }
  }
  const parentOf = new Map(rows.map((row) => [row.id, row.parent_id]));
  const hidden = rows.find((row) => row.locator === HIDDEN_GALAXY)?.id;
  const isHidden = (id: string) => {
    for (let at: string | null = id; at; at = parentOf.get(at) ?? null) {
      if (at === hidden) {
        return true;
      }
    }
    return false;
  };
  // A galaxy with nothing listed is an empty page.
  const parents = new Set(rows.map((row) => row.parent_id));
  return rows
    .filter((row) => !isHidden(row.id))
    .filter((row) => row.kind !== "galaxy" || parents.has(row.id))
    .filter((row) => row.kind !== "building" || row.name === STATION_BUILDING)
    .map((row) => ({
      url: `${base}${recordPath(row.kind as Kind, row.id)}`,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    }));
}

// Each page once in every language it is translated into and indexed in, each
// entry naming the others (D20): an address `/x` of the list below becomes
// `/en/x`, `/ru/x`, ….
function inLanguages(
  base: string,
  pages: MetadataRoute.Sitemap,
): MetadataRoute.Sitemap {
  return pages.flatMap((page) => {
    const path = page.url.slice(base.length) || "/";
    const languages = translationsOf(path).filter((language) =>
      indexable(language, path),
    );
    const urls = Object.fromEntries(
      languages.map((language) => [
        language,
        `${base}${localPath(language, path)}`,
      ]),
    );
    return languages.map((language) => ({
      ...page,
      url: urls[language],
      alternates: { languages: urls },
    }));
  });
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:5010";
  return inLanguages(base, await pages(base));
}

async function pages(base: string): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${base}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    // The tools: their own page, each group's, and every tool.
    ...[
      TOOLS_PATH,
      ...TOOL_GROUPS.map((group) => toolGroupPath(group.slug)),
      ...TOOLS.map((tool) => toolPath(tool.slug)),
    ].map((path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    {
      url: `${base}/guides`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...statisticsMenu.map((group) => ({
      url: `${base}${groupPath(group.slug)}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    ...TOPICS.map((topic) => ({
      url: `${base}${guidePath(topic.slug)}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    {
      url: `${base}${QUESTS_PATH}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...QUESTS.map((quest) => ({
      url: `${base}${questPath(quest.slug)}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    {
      url: `${base}/game-bugs`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${base}${databasePath()}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...FEED_KINDS.map((kind) => ({
      url: `${base}${kindPath(kind)}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...(await recordEntries(base)),
  ];
}
