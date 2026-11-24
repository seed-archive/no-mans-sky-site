import "server-only";

import { createClient } from "@supabase/supabase-js";

import { supabasePublishableKey, supabaseUrl } from "@/lib/db/env";
import type { Database } from "@/lib/db/supabase.types";
import type { Kind } from "@/lib/archive/kinds";
import { recordPath } from "@/lib/archive/paths";
import { type Language, localPath } from "@/lib/i18n/languages";
import { messageOf } from "@/lib/i18n/messages";
import { pageLanguage } from "@/lib/i18n/page";
import { BASE_PATH } from "@/lib/site";

// One item of each type from the catalog, the highest class first, so a guide
// links to items that exist whatever the showcase holds. `{{catalogTools}}` and
// `{{catalogShips}}` in a guide's text become the sentence. The words of each
// type are `catalogExamples.tool.<type>` and `.ship.<type>` of the language.
const TOOL_WORDS = [
  "pistol",
  "rifle",
  "atlantid",
  "sentinel",
  "experimental",
  "alien",
  "royal",
];

const SHIP_WORDS = [
  "shuttle",
  "fighter",
  "hauler",
  "explorer",
  "solar",
  "interceptor",
  "exotic",
];

const CLASS_ORDER = ["S", "A", "B", "C"];

type Row = {
  id: string;
  name: string;
  kind: Kind;
  word: string;
  rank: number;
};

function escaped(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// "X is a pistol, Y a rifle, …, and Z a Royal", each name a link: the first
// item and the others are messages of the language, joined as its lists are.
function sentence(
  rows: Row[],
  words: string[],
  kind: "tool" | "ship",
  language: Language,
) {
  const parts = words.flatMap((word) => {
    const best = rows
      .filter((row) => row.word === word)
      .sort(
        (one, other) =>
          one.rank - other.rank || one.name.localeCompare(other.name),
      )[0];
    return best
      ? [
          {
            name: `<a href="${BASE_PATH}${localPath(language, recordPath(best.kind, best.id))}">${escaped(best.name)}</a>`,
            type: messageOf(language, `catalogExamples.${kind}.${word}`),
          },
        ]
      : [];
  });
  const items = parts.map((part, at) =>
    messageOf(
      language,
      at === 0 ? "catalogExamples.first" : "catalogExamples.next",
      part,
    ),
  );
  return new Intl.ListFormat(language, { type: "conjunction" }).format(items);
}

async function read(language: Language) {
  const url = supabaseUrl();
  const key = supabasePublishableKey();
  if (!url || !key) {
    return null;
  }
  const supabase = createClient<Database>(url, key);
  const [tools, ships] = await Promise.all([
    supabase
      .from("assets")
      .select("id, name, tools!inner(body, class)")
      .eq("kind", "tool"),
    supabase
      .from("assets")
      .select("id, name, ships!inner(hull, class)")
      .eq("kind", "ship"),
  ]);
  if (tools.error || ships.error) {
    return null;
  }
  const rank = (letter: string) => CLASS_ORDER.indexOf(letter);
  const toolRows: Row[] = tools.data.map((row) => {
    const tool = Array.isArray(row.tools) ? row.tools[0] : row.tools;
    return {
      id: row.id,
      name: row.name,
      kind: "tool",
      word: tool.body,
      rank: rank(tool.class),
    };
  });
  const shipRows: Row[] = ships.data.map((row) => {
    const ship = Array.isArray(row.ships) ? row.ships[0] : row.ships;
    return {
      id: row.id,
      name: row.name,
      kind: "ship",
      word: ship.hull,
      rank: rank(ship.class),
    };
  });
  return {
    catalogTools: sentence(toolRows, TOOL_WORDS, "tool", language),
    catalogShips: sentence(shipRows, SHIP_WORDS, "ship", language),
  };
}

// Writes the catalog sentences into a guide's rendered text. Without a
// database the token stays visible, as an unknown number does.
export async function fillCatalogExamples(html: string) {
  if (!html.includes("{{catalog")) {
    return html;
  }
  const found = await read(await pageLanguage());
  if (!found) {
    return html;
  }
  return html.replace(
    /\{\{(catalogTools|catalogShips)\}\}/g,
    (_, name: "catalogTools" | "catalogShips") => found[name],
  );
}
