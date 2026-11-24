import { count, roundEven, share, twoFigures } from "@seed-archive/ui/numbers";

import type { LoopGroup } from "@/components/archive/RecipeTree";

// How a value of statistics.json prints: the one place a share, a count, or a
// "one in N" becomes text. The file holds numbers, so tables can be charted and
// localised.

export type Kind =
  | "share"
  | "count"
  | "median"
  | "oneIn"
  | "smallShare"
  | "tenths"
  | "about"
  | "plain"
  | "plus";

// A number with how it prints.
export type Mark = { k: Kind; v: number };
// Words with marks in them: `{0}` stands for `v[0]`.
export type Template = { t: string; v: Mark[] };
export type Value = string | Mark | Template;
// In a table a bare number takes its column's kind, and null is a dash.
export type Cell = Value | number | null;

export type ColumnKind = Kind | "text" | "mixed";

// One item of a table cell: its name, how many (0 prints no count), and its tile.
export type ItemPart = [string, number, number | null];

export type RawTable = {
  head: string[];
  kinds: ColumnKind[];
  rows: Cell[][];
  note: string;
  // Where a row names a figure: its four cells.
  marks?: [number, number][][];
  // One cell of each row's figure drawn apart, such as a weapon's.
  accents?: [number, number][];
  // Column heads set upright, for a table with many narrow columns.
  upright?: boolean;
  // How many columns from the start hold words.
  text?: number;
  // Each row's tile in the page's sprite, or null for a row with no picture.
  icons?: (number | null)[];
  // The sprite: a grid of square tiles, `columns` to a row.
  sprite?: { src: string; columns: number };
  // Columns that hold items: for each row, each column's items as `[name,
  // amount, tile]`, or null where the column holds plain text or a number.
  items?: (ItemPart[] | null)[][];
  // Refiner loops drawn as recipe trees, one group a circle (`components/archive/RecipeTree`).
  trees?: LoopGroup[];
  // Dishes whose whole recipe the site draws (`lib/archive/recipe-tree`), by id.
  dishes?: string[];
};

export const DASH = "—";

export { count, share };

// How numbers print in a page's language: the locale for the digits, and the
// words around a number (`numbers` of lib/i18n/<locale>.json), each with its
// number as `{n}`.
export type NumberWords = {
  about: string;
  oneIn: string;
  under: string;
  over: string;
};
export type NumberStyle = { locale: string; words: NumberWords };

export const ENGLISH_NUMBERS: NumberStyle = {
  locale: "en",
  words: {
    about: "about {n}",
    oneIn: "one in {n}",
    under: "under {n}",
    over: "over {n}",
  },
};

const said = (template: string, n: string) => template.replace("{n}", n);

function percent(value: number, style: NumberStyle) {
  return share(value, style.locale, (shown) => said(style.words.over, shown));
}

function decimal(value: number, style: NumberStyle) {
  return value.toLocaleString(style.locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}

function median(value: number, style: NumberStyle) {
  return value >= 10 || value === Math.trunc(value)
    ? count(value, style.locale)
    : decimal(value, style);
}

// Below a thousand the two figures print without a separator, as before.
function oneIn(value: number, style: NumberStyle) {
  const figures = twoFigures(value);
  return said(
    style.words.oneIn,
    figures >= 1000 ? count(figures, style.locale) : String(figures),
  );
}

// The smallest share a table prints as a number, 0.01%: below it the share
// reads "under 0.01%" (our own choice).
const SMALLEST_SHARE = 0.0001;

function smallShare(value: number, style: NumberStyle) {
  return value >= SMALLEST_SHARE
    ? percent(value, style)
    : said(style.words.under, percent(SMALLEST_SHARE, style));
}

// A count in running text, to two figures: the exact number moves with every
// recount.
function about(value: number, style: NumberStyle) {
  if (value < 100) {
    return count(value, style.locale);
  }
  const scale = 10 ** (String(Math.round(value)).length - 2);
  return said(
    style.words.about,
    count(roundEven(value / scale) * scale, style.locale),
  );
}

export function printNumber(
  kind: Kind,
  value: number,
  style: NumberStyle = ENGLISH_NUMBERS,
) {
  switch (kind) {
    case "share":
      return percent(value, style);
    case "count":
      return count(value, style.locale);
    case "median":
      return median(value, style);
    case "oneIn":
      return oneIn(value, style);
    case "smallShare":
      return smallShare(value, style);
    case "tenths":
      return decimal(value, style);
    case "about":
      return about(value, style);
    case "plain":
      return plain(value, style);
    case "plus":
      return `+${plain(value, style)}`;
  }
}

// A number as it stands, every digit kept and no separator, in the language's
// form: 0.7 is "0,7" in Russian, Spanish and German.
function plain(value: number, style: NumberStyle) {
  return new Intl.NumberFormat(style.locale, {
    useGrouping: false,
    maximumFractionDigits: 20,
  }).format(value);
}

export function printValue(
  value: Value,
  style: NumberStyle = ENGLISH_NUMBERS,
): string {
  if (typeof value === "string") {
    return value;
  }
  if ("t" in value) {
    return value.t.replace(/\{(\d+)\}/g, (_, at: string) =>
      printValue(value.v[Number(at)], style),
    );
  }
  return printNumber(value.k, value.v, style);
}

export function printCell(
  cell: Cell,
  kind: ColumnKind,
  style: NumberStyle = ENGLISH_NUMBERS,
) {
  if (cell === null) {
    return DASH;
  }
  if (typeof cell === "number") {
    return printNumber(kind as Kind, cell, style);
  }
  return printValue(cell, style);
}
