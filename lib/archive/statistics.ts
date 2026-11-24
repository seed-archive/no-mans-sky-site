import { IntlMessageFormat } from "intl-messageformat";

import { itemNumbers, itemTables } from "@/lib/archive/item-tables";
import {
  printCell,
  printValue,
  type ItemPart,
  type NumberStyle,
  type RawTable,
  type Value,
} from "@/lib/archive/statistics-format";
import data from "@/lib/archive/statistics.json";
import messagesDe from "@/lib/i18n/de.json";
import messagesEn from "@/lib/i18n/en.json";
import messagesEs from "@/lib/i18n/es.json";
import messagesRu from "@/lib/i18n/ru.json";
import type { Language } from "@/lib/i18n/languages";
import { catalogueOf, resolved } from "@/lib/i18n/statistics";
import type { DishCard, LoopGroup } from "@/components/archive/RecipeTree";
import { dishTrees } from "@/lib/archive/recipe-tree";
import recipes from "@/lib/archive/recipes.json";
import type { Stored } from "@/lib/archive/recipes";

// Each dish named by a table, with its whole recipe and what it raises.
function dishCards(ids: string[]): DishCard[] {
  const items = recipes.items as Record<string, Stored>;
  return ids.flatMap((id) => {
    const trees = dishTrees(id);
    const item = items[id];
    return trees && item
      ? [
          {
            name: item.name,
            caption: item.food ? `${item.food.stat} ${item.food.bonus}` : "",
            ...trees,
          },
        ]
      : [];
  });
}

// A table as the page prints it.
export type StatTable = {
  head: string[];
  rows: string[][];
  note: string;
  marks?: [number, number][][];
  // One cell of each row's figure drawn apart, such as a weapon's.
  accents?: [number, number][];
  upright?: boolean;
  // How many columns from the start hold words.
  text?: number;
  // Each row's tile in the page's sprite, or null for a row with no picture.
  icons?: (number | null)[];
  // The sprite: a grid of square tiles, `columns` to a row.
  sprite?: { src: string; columns: number };
  // Columns that hold items, each with its own picture (`RawTable.items`).
  items?: (ItemPart[] | null)[][];
  // Refiner loops drawn as recipe trees, one group a circle (`components/archive/RecipeTree`).
  trees?: LoopGroup[];
  // Dishes drawn with their whole recipe, built here from `recipes.json`.
  dishes?: DishCard[];
};

export type Topic = { slug: string; title: string; fact: string };

type Page = {
  title: string;
  fact: Value;
  numbers: Record<string, Value>;
  tables: Record<string, RawTable>;
};

// How numbers print in each language: its locale and its words around a number.
const NUMBERS: Record<Language, NumberStyle> = {
  en: { locale: "en", words: messagesEn.numbers },
  ru: { locale: "ru", words: messagesRu.numbers },
  es: { locale: "es", words: messagesEs.numbers },
  de: { locale: "de", words: messagesDe.numbers },
};

// The file holds keys; its pages are read in a language through that
// language's catalogue (lib/i18n/statistics.ts), once a language.
const PAGES = new Map<Language, Record<string, Page>>();

function pagesIn(language: Language) {
  let pages = PAGES.get(language);
  if (!pages) {
    pages = resolved(data.pages, catalogueOf(language)) as unknown as Record<
      string,
      Page
    >;
    PAGES.set(language, pages);
  }
  return pages;
}

// A page of the file by its slug: its title and its fact.
export function pageTopic(slug: string, language: Language = "en"): Topic {
  const page = pagesIn(language)[slug];
  return {
    slug,
    title: page.title,
    fact: printValue(page.fact, NUMBERS[language]),
  };
}

// The guides in reading order, in English: their slugs for the routes and the
// sitemap; a page lists them in its own language with `topicsIn`.
export const TOPICS: Topic[] = data.order.map((slug) => pageTopic(slug));

export function topicsIn(language: Language): Topic[] {
  return data.order.map((slug) => pageTopic(slug, language));
}

export function topicOf(slug: string, language: Language = "en") {
  return data.order.includes(slug) ? pageTopic(slug, language) : undefined;
}

function printed(table: RawTable, style: NumberStyle): StatTable {
  const {
    head,
    kinds,
    rows,
    note,
    marks,
    accents,
    upright,
    text,
    icons,
    sprite,
    items,
    trees,
    dishes,
  } = table;
  return {
    head,
    note,
    rows: rows.map((row) =>
      row.map((cell, at) => printCell(cell, kinds?.[at] ?? "text", style)),
    ),
    ...(marks ? { marks } : {}),
    ...(accents ? { accents } : {}),
    ...(upright ? { upright } : {}),
    ...(text ? { text } : {}),
    ...(icons && sprite ? { icons, sprite } : {}),
    ...(items && sprite ? { items, sprite } : {}),
    ...(trees && sprite ? { trees, sprite } : {}),
    ...(dishes ? { dishes: dishCards(dishes) } : {}),
  };
}

export function tablesOf(slug: string, language: Language = "en") {
  const tables = Object.entries(pagesIn(language)[slug].tables).map(
    ([name, table]) => [name, printed(table, NUMBERS[language])] as const,
  );
  return { ...Object.fromEntries(tables), ...itemTables(slug) };
}

// The numbers of a table, for a chart.
export function rawTableOf(
  slug: string,
  name: string,
  language: Language = "en",
) {
  return pagesIn(language)[slug].tables[name];
}

function printedNumbers(slug: string, language: Language) {
  const page = pagesIn(language)[slug];
  const numbers = (page?.numbers ?? data.numbers) as Record<string, Value>;
  const out: Record<string, string> = {};
  for (const [name, value] of Object.entries(numbers)) {
    out[name] = printValue(value, NUMBERS[language]);
  }
  return page ? { ...out, ...itemNumbers(slug) } : out;
}

// The bare numbers of a page, for the word beside a number in its language.
function rawNumbers(slug: string, language: Language) {
  const page = pagesIn(language)[slug];
  const numbers = (page?.numbers ?? data.numbers) as Record<string, Value>;
  const out: Record<string, number> = {};
  for (const [name, value] of Object.entries(numbers)) {
    const number =
      typeof value === "object" && value && "v" in value ? value.v : value;
    if (typeof number === "number") {
      out[name] = number;
    } else if (typeof number === "string" && /^\d+$/.test(number)) {
      out[name] = Number(number);
    }
  }
  return out;
}

// `{{name}}`, or `{{name, plural, one {# system} other {# systems}}}` where a
// word beside the number takes its form in the page's language (the shared
// site-code.md: only the marked expression goes through ICU).
const NUMBER = /\{\{(\w+)((?:,(?:[^{}]|\{[^{}]*\})*)?)\}\}/g;

// Writes the numbers into the rendered text; a name it does not know stays
// visible, so a typo in a page shows.
export function fillStatistics(
  html: string,
  slug: string,
  language: Language = "en",
) {
  const values = printedNumbers(slug, language);
  const raw = rawNumbers(slug, language);
  return html.replace(NUMBER, (found, name: string, rule: string) => {
    if (!rule) {
      return name in values ? values[name] : found;
    }
    if (!(name in raw)) {
      return found;
    }
    // `#` would print the raw number; the page prints it as the site rounds it.
    const shown = rule.replace(/#/g, "{shown}");
    return String(
      new IntlMessageFormat(`{${name}${shown}}`, language).format({
        [name]: raw[name],
        shown: values[name],
      }),
    );
  });
}
