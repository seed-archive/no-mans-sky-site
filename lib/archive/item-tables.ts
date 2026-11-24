import {
  ends,
  ITEMS,
  median,
  toolRow,
  type ItemRow,
  type Stat,
} from "@/lib/archive/items";
import type { StatTable } from "@/lib/archive/statistics";
import type { Language } from "@/lib/i18n/languages";
import { messageOf } from "@/lib/i18n/messages";

const S = 3;

// The words and numbers of one language: labels of lib/i18n/<language>.json,
// numbers with one decimal in its own form.
function wordsOf(language: Language) {
  const text = (id: string, values?: Record<string, string>) =>
    messageOf(language, id, values);
  const decimal = (value: number, least = 1) =>
    new Intl.NumberFormat(language, {
      minimumFractionDigits: least,
      maximumFractionDigits: 1,
    }).format(value);
  const share = (value: number, least = 1) =>
    new Intl.NumberFormat(language, {
      style: "percent",
      minimumFractionDigits: least,
      maximumFractionDigits: 1,
    }).format(value / 100);
  const span = (low: string, high: string) =>
    text("itemTables.to", { low, high });
  return { text, decimal, share, span };
}
type Words = ReturnType<typeof wordsOf>;

// A row's name: a multitool type by its key in `toolBody`, a ship type in
// `hull`, an upgraded row by its label (`Atlantid, yellow` is
// `toolBody.atlantid-yellow`).
const toolName = (words: Words, row: ItemRow) =>
  words.text(`toolBody.${row.key}`);
const shipName = (words: Words, row: ItemRow) => words.text(`hull.${row.key}`);
const labelKey = (label: string) =>
  label.toLowerCase().replace(/[^a-z0-9]+/g, "-");

function ranges(
  words: Words,
  rows: ItemRow[],
  name: (words: Words, row: ItemRow) => string,
) {
  return rows.map((row) => [
    name(words, row),
    ...row.classes[S].ranges.map(([low, high]) =>
      high === 0
        ? words.decimal(0, 0)
        : low === high
          ? words.decimal(high, 0)
          : words.span(words.decimal(low, 0), words.decimal(high, 0)),
    ),
  ]);
}

function statRows(
  words: Words,
  rows: ItemRow[],
  name: (words: Words, row: ItemRow) => string,
  at: number,
  cell: (value: number) => string,
) {
  return rows.flatMap((row) => {
    const stat = row.classes[S].stats[at];
    if (!stat) {
      return [];
    }
    const [low, high] = ends(stat);
    return [
      [
        name(words, row),
        cell(low),
        cell(high),
        cell(stat.mean),
        cell(median(stat)),
      ],
    ];
  });
}

function statHead(words: Words, first: string) {
  return [
    first,
    words.text("itemTables.lowest"),
    words.text("itemTables.highest"),
    words.text("itemTables.mean"),
    words.text("itemTables.median"),
  ];
}

function multitoolStats(words: Words): Record<string, StatTable> {
  const note = words.text("itemTables.toolNote");
  const head = statHead(words, words.text("itemTables.type"));
  const rows = (at: number) =>
    statRows(words, ITEMS.tools, toolName, at, (value) => words.share(value));
  return {
    ranges: {
      head: [
        words.text("itemTables.type"),
        words.text("itemTables.damage"),
        words.text("itemTables.mining"),
        words.text("itemTables.scanner"),
      ],
      rows: ranges(words, ITEMS.tools, toolName),
      note: words.text("itemTables.allowedNote"),
    },
    damage: {
      head,
      rows: rows(0),
      note: `${note} ${words.text("itemTables.noPistolDamage")}`,
    },
    mining: {
      head,
      rows: rows(1),
      note: `${note} ${words.text("itemTables.noRifleMining")}`,
    },
    scanner: { head, rows: rows(2), note },
  };
}

function shipStats(words: Words): Record<string, StatTable> {
  const note = words.text("itemTables.shipNote");
  const head = statHead(words, words.text("itemTables.ship"));
  const rows = (at: number) =>
    statRows(words, ITEMS.ships, shipName, at, (value) => words.decimal(value));
  return {
    ranges: {
      head: [
        words.text("itemTables.ship"),
        words.text("itemTables.damage"),
        words.text("itemTables.shield"),
        words.text("itemTables.hyperdrive"),
        words.text("itemTables.maneuverability"),
      ],
      rows: ranges(words, ITEMS.ships, shipName),
      note: words.text("itemTables.allowedNote"),
    },
    damage: {
      head,
      rows: rows(0),
      note: `${note} ${words.text("itemTables.noExplorerDamage")}`,
    },
    shield: { head, rows: rows(1), note },
    hyperdrive: {
      head,
      rows: rows(2),
      note: `${note} ${words.text("itemTables.noFighterHyperdrive")}`,
    },
    agile: { head, rows: rows(3), note },
  };
}

function foundBand(words: Words, stat: Stat) {
  const [low, high] = ends(stat);
  return words.span(words.share(low, 0), words.share(high, 0));
}

function raised(words: Words): Record<string, StatTable> {
  const rows = ITEMS.raised.map((row) => {
    const held = toolRow(row.key).classes[S];
    const [low, high] = held.ranges[0];
    const place = (share: number) => low + share * (high - low);
    const least = row.keepsZero ? 1 : 0;
    return [
      words.text(`toolBody.${labelKey(row.label)}`),
      words.span(
        words.share(place(row.share[0]), least),
        words.share(place(row.share[1]), least),
      ),
      foundBand(words, held.stats[0] as Stat),
    ];
  });
  const staff = toolRow("staff").classes[S].stats[0] as Stat;
  rows.push([
    words.text("toolBody.staff"),
    words.share(ITEMS.staffUpgraded[S][0]),
    foundBand(words, staff),
  ]);
  return {
    raised: {
      head: [
        words.text("itemTables.type"),
        words.text("itemTables.upgradedToS"),
        words.text("itemTables.foundAtS"),
      ],
      rows,
      note: words.text("itemTables.raisedNote"),
    },
  };
}

// The tables of a page that lives in the item values, in a language.
export function itemTables(
  slug: string,
  language: Language,
): Record<string, StatTable> {
  const words = wordsOf(language);
  switch (slug) {
    case "multitool-stats":
      return multitoolStats(words);
    case "ship-stats":
      return shipStats(words);
    case "multitool-upgrades":
      return raised(words);
    default:
      return {};
  }
}

// The numbers of a page's text that live in the item values, in a language.
export function itemNumbers(
  slug: string,
  language: Language,
): Record<string, string> {
  const words = wordsOf(language);
  if (slug === "multitool-upgrades") {
    const [damage, mining, scanner] = ITEMS.staffUpgraded[S];
    return {
      staffDamage: words.share(damage),
      staffMining: words.share(mining),
      staffScanner: words.share(scanner),
    };
  }
  if (slug !== "ship-stats") {
    return {};
  }
  const names = ITEMS.shipStats;
  const out: Record<string, string> = {};
  for (const row of ITEMS.ships) {
    row.classes[S].stats.forEach((stat, at) => {
      if (stat) {
        const name = `${names[at]}${row.label}`;
        const [low, high] = ends(stat);
        out[`${name}Low`] = words.decimal(low);
        out[`${name}High`] = words.decimal(high);
        out[`${name}Median`] = words.decimal(median(stat));
      }
    });
  }
  return out;
}
