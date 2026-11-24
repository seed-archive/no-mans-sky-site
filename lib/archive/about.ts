import { IntlMessageFormat } from "intl-messageformat";

import stats from "@/lib/archive/about-stats.json";
import { galaxyHref } from "@/lib/archive/galaxies";
import { type Language, localPath } from "@/lib/i18n/languages";
import { BASE_PATH } from "@/lib/site";

export { stats };

// A message of the page's language: `messageOf` on the server, react-intl's
// `formatMessage` in the browser, so this module reads no messages itself.
export type Say = (id: string, values?: Record<string, string>) => string;

// The messages `about.<word>` that name the very large.
const WORDS: [number, string][] = [
  [1e12, "trillion"],
  [1e9, "billion"],
  [1e6, "million"],
];

// Two significant digits, or words for the very large.
export function amount(value: number, say: Say) {
  for (const [size, word] of WORDS) {
    if (value >= size) {
      return say(`about.${word}`, {
        n: String(Number((value / size).toPrecision(2))),
      });
    }
  }
  if (value >= 10) {
    return Number(value.toPrecision(2)).toLocaleString("en-US");
  }
  return String(Number(value.toPrecision(2)));
}

export function share(value: number) {
  const percent = value * 100;
  if (percent >= 10) {
    return `${Math.round(percent)}%`;
  }
  return `${Number(percent.toPrecision(2))}%`;
}

// A share as "one in N", N with two significant digits at most.
function oneIn(value: number, say: Say) {
  return amount(1 / value, say);
}

export const euclid = stats.euclid;

export function stepOf(steps: typeof euclid.tools, key: string) {
  return steps.find((step) => step.key === key)?.per_system ?? 0;
}

export const STARS_PER_REGION = stats.galaxy.stars_per_region;

// The shares of a whole as counts in one voxel. `tool_types` and `tool_classes`
// share out the offers on a tool's own load, the kept shares the kept tools, so
// two counts of one row stand on one scale and the kept never pass the whole.
export function inVoxel(
  shares: Record<string, number>,
  perSystem: number,
): Record<string, number> {
  return Object.fromEntries(
    Object.entries(shares).map(([key, part]) => [
      key,
      part * perSystem * STARS_PER_REGION,
    ]),
  );
}

// The offers on a tool's own load per system. A file written before `pages`
// wrote it falls back on every offer, which is larger, so the kept still stay
// under it.
export const OWN_OFFERS =
  (euclid as { own_offers_per_system?: number }).own_offers_per_system ??
  stepOf(euclid.tools, "offers");

// The most multitools a system page lists (the No Man's Sky generator's cap).
const TOOL_CAP = 6;

function bucket(histogram: Record<string, number>, keys: string[]) {
  return keys.reduce((sum, key) => sum + (histogram[key] ?? 0), 0);
}

// Each number of the page: the value a plural chooses its word by, and the
// text the page prints for it.
type Printed = { raw: number | null; shown: string };

function numbers(language: Language, say: Say): Record<string, Printed> {
  const counts: Record<string, number> = {
    regions: stats.sample.regions,
    otherRegions: stats.sample.regions_per_other_galaxy,
    regionsCounted: stats.sample.regions_counted,
    starsPerRegion: stats.sample.stars_per_region,
    galaxyAcross: stats.galaxy.light_years_across,
    galaxyThick: stats.galaxy.light_years_thick,
    regionsInGalaxy: stats.galaxy.regions,
  };
  const offers = stepOf(euclid.tools, "offers");
  const kept = stepOf(euclid.tools, "kept");
  const ships = stepOf(euclid.ships, "kept");
  const pillars = euclid.pillar_survey;
  const secondsPerYear = 365.25 * 24 * 3600;
  const star = stats.star_of_the_show;
  const regular = stats.showcase.filter((row) => row.name !== star.galaxy);
  const big = (value: number): Printed => ({
    raw: value,
    shown: amount(value, say),
  });
  const plain = (value: number): Printed => ({
    raw: value,
    shown: String(value),
  });
  const countWord = (n: number): Printed => ({
    raw: n,
    shown: say("about.countWord", { n: String(n) }),
  });
  const text = (shown: string): Printed => ({ raw: null, shown });
  const shares = (value: number) => text(share(value));
  const showcaseRegular = regular.reduce((sum, row) => sum + row.systems, 0);
  return {
    regions: plain(counts.regions),
    otherRegions: plain(counts.otherRegions),
    regionsCounted: big(counts.regionsCounted),
    starsPerRegion: plain(counts.starsPerRegion),
    galaxyAcross: big(counts.galaxyAcross),
    galaxyThick: big(counts.galaxyThick),
    regionsInGalaxy: big(counts.regionsInGalaxy),
    yearsToLook: big(stats.galaxy.systems / secondsPerYear),
    yellowShare: shares(euclid.star_colours.yellow),
    offersPerSystem: big(offers),
    groundToolShare: shares(
      1 - stepOf(euclid.tools, "sources") / stepOf(euclid.tools, "ground"),
    ),
    groundShipShare: shares(
      1 - stepOf(euclid.ships, "sources") / stepOf(euclid.ships, "ground"),
    ),
    touchingShare: shares(euclid.tool_touching_share),
    touchingOneIn: plain(Math.round((1 - euclid.tool_touching_share) * 100)),
    toolCap: countWord(TOOL_CAP),
    toolsPerSystem: big(kept),
    shipsPerSystem: big(ships),
    toolRatio: big(offers / kept),
    royalOneIn: plain(Math.round(1 / pillars.royal_share)),
    planetTools: shares(euclid.planet_shares.tool),
    planetShips: shares(euclid.planet_shares.ship),
    toolPlacements: plain(stats.grids.tool),
    shipPlacements: plain(stats.grids.ship),
    squareShare: shares(euclid.tool_figures.O),
    squareOneIn: {
      raw: 1 / pillars.square_share,
      shown: oneIn(pillars.square_share, say),
    },
    pistolPlacements: plain(stats.whole_region.pistol_placements),
    wrecksPerShip: big(stepOf(euclid.ships, "connected") / ships),
    interceptorAll: shares(euclid.ship_hulls.interceptor),
    interceptorKept: shares(euclid.kept_ship_hulls.interceptor),
    toolSystems: shares(1 - euclid.system_shares.tool),
    noShipSystems: shares(1 - euclid.system_shares.ship),
    shipsPerFinding: big(euclid.per_finding_system.ships),
    toolsPerFinding: big(euclid.per_finding_system.tools),
    fullOneIn: text(
      say("numbers.oneIn", { n: oneIn(euclid.system_shares.full, say) }),
    ),
    // The star's galaxy holds the star alone; the others hold the systems
    // without a square.
    showcaseRegular: plain(showcaseRegular),
    showcaseList: text(
      new Intl.ListFormat(language, { type: "unit", style: "short" }).format(
        regular.map((row) => {
          const name = row.name.replace(" Galaxy", "");
          const href = galaxyHref(name);
          return href
            ? `<a href="${BASE_PATH}${localPath(language, href)}">${name}</a>`
            : name;
        }),
      ),
    ),
    showcaseGalaxies: countWord(regular.length),
    starTool: text(star.tool),
    starSystem: text(star.system),
    starGalaxy: text(star.galaxy),
  };
}

// `{{name}}`, or `{{name, plural, one {# year} other {# years}}}` where a word
// stands beside the number, as the guides write it (`fillStatistics`).
const NUMBER = /\{\{(\w+)((?:,(?:[^{}]|\{[^{}]*\})*)?)\}\}/g;

// Writes the numbers into the rendered text; a name it does not know stays
// visible, so a typo in about.md shows on the page. A plural is formatted
// alone by intl-messageformat in the page's language, choosing by the bare
// number, and `#` prints the number as the page prints it.
export function fillNumbers(html: string, language: Language, say: Say) {
  const values = numbers(language, say);
  return html.replace(NUMBER, (found, name: string, rule: string) => {
    const value = values[name];
    if (!value) {
      return found;
    }
    if (!rule) {
      return value.shown;
    }
    if (value.raw === null) {
      return found;
    }
    const shown = rule.replace(/#/g, "{shown}");
    return String(
      new IntlMessageFormat(`{${name}${shown}}`, language).format({
        [name]: value.raw,
        shown: value.shown,
      }),
    );
  });
}

export function histogramRows(say: Say) {
  const tools = euclid.tool_histogram as Record<string, number>;
  const ships = euclid.ship_histogram as Record<string, number>;
  const many = ["6", "7", "8", "9", "10", "11", "12"];
  return [
    ...["0", "1", "2", "3", "4", "5"].map((key) => ({
      label: key,
      tools: tools[key] ?? 0,
      ships: ships[key] ?? 0,
    })),
    {
      label: say("about.orMore", { n: many[0] }),
      tools: bucket(tools, many),
      ships: bucket(ships, many),
    },
  ];
}
