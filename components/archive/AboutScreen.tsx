"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import type { ReactNode } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { ChartBlock } from "@seed-archive/ui/chart";

import { chartSpec } from "@/lib/archive/chart-spec";
import {
  Article,
  CellMark,
  DataTable,
  GalaxyLink,
} from "@/components/archive/Article";
import { GuidedTour } from "@/components/archive/GuidedTour";
import {
  amount,
  euclid,
  histogramRows,
  inVoxel,
  OWN_OFFERS,
  type Say,
  share,
  STARS_PER_REGION,
  stats,
  stepOf,
} from "@/lib/archive/about";
import { RANK_OPTIONS } from "@/lib/archive/kinds";

// The page's messages, `about.<id>`, and its numbers in their words.
function useSay() {
  const intl = useIntl();
  const say: Say = (id, values) => intl.formatMessage({ id }, values);
  const t = (id: string, values?: Record<string, string>) =>
    say(`about.${id}`, values);
  const count = (value: number) => amount(value, say);
  return { intl, say, t, count };
}

// The page in one narrowing column: each step links to the section that
// tells it.
function Tiles() {
  const { t, count } = useSay();
  const steps = [
    [count(stats.galaxy.systems), t("tileSystems"), "the-size-of-the-haystack"],
    [
      count(stepOf(euclid.tools, "ground")),
      t("tileSpots"),
      "where-a-multitool-comes-from",
    ],
    [
      count(stepOf(euclid.tools, "sources")),
      t("tileSources"),
      "the-multitool-funnel",
    ],
    [
      count(stepOf(euclid.tools, "offers")),
      t("tileOffers"),
      "where-a-multitool-comes-from",
    ],
    [
      count(stepOf(euclid.tools, "connected")),
      t("tileConnected"),
      "the-multitool-funnel",
    ],
    ["6 + 2", t("tilePage"), "what-a-good-system-looks-like"],
    ["1", t("tileSquare"), "the-star-of-the-show"],
  ];
  return (
    <Stack
      component="nav"
      aria-label={t("onThisPage")}
      spacing={0.75}
      sx={{ alignItems: "center" }}
    >
      {steps.map(([value, label, anchor], index) => (
        <Box
          key={label}
          component="a"
          href={`#${anchor}`}
          sx={(theme) => ({
            width: { xs: `${100 - index * 4}%`, sm: `${100 - index * 7}%` },
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "center", sm: "baseline" },
            justifyContent: "center",
            columnGap: 1,
            py: 1,
            px: 2,
            borderRadius: 1,
            color: "text.primary",
            textDecoration: "none",
            textAlign: "center",
            bgcolor: alpha(theme.palette.primary.main, 0.08 + index * 0.05),
            "&:hover": {
              bgcolor: alpha(theme.palette.primary.main, 0.16 + index * 0.05),
            },
          })}
        >
          <Typography variant="h6" component="span">
            {value}
          </Typography>
          <Typography variant="body2" component="span" color="text.secondary">
            {label}
          </Typography>
        </Box>
      ))}
    </Stack>
  );
}

function Scale() {
  const { t, count } = useSay();
  const { galaxy } = stats;
  const planets = euclid.planets_per_system;
  const rows: [string, number][] = [
    [t("scaleRegions"), galaxy.regions],
    [t("scaleStars"), STARS_PER_REGION],
    [t("scaleSystems"), galaxy.systems],
    [t("scalePlanets"), planets],
    [t("scaleRegionPlanets"), planets * STARS_PER_REGION],
  ];
  return (
    <DataTable
      head={[t("theCount"), t("roughly")]}
      rows={rows.map(([label, value]) => ({
        key: label,
        cells: [label, count(value)],
      }))}
    />
  );
}

function Colours() {
  const shares = euclid.star_colours as Record<string, number>;
  const { intl, t } = useSay();
  const rows = Object.entries(
    euclid.star_colours as Record<string, number>,
  ).sort((one, other) => other[1] - one[1]);
  return (
    <ChartBlock
      spec={chartSpec({
        kind: "bars",
        labels: rows.map(([colour]) =>
          intl.formatMessage({ id: `star.${colour}` }),
        ),
        series: [{ label: t("share"), values: rows.map(([, value]) => value) }],
        format: "share",
        label: t("starColours"),
      })}
    >
      <DataTable
        head={[t("star"), t("share")]}
        rows={Object.entries(shares)
          .sort((one, other) => other[1] - one[1])
          .map(([colour, value]) => ({
            key: colour,
            cells: [
              <FormattedMessage key={colour} id={`star.${colour}`} />,
              share(value),
            ],
          }))}
      />
    </ChartBlock>
  );
}

function Sources() {
  const { t } = useSay();
  const spots = euclid.cells as Record<string, number>;
  const kinds = [
    "beacon",
    "droppod",
    "debris",
    "shop",
    "freighter",
    "monolith",
    "head",
    "pillar",
    "camp",
  ];
  const rows: [string, number][] = [
    ...kinds.map((kind): [string, number] => [
      t(`sources.${kind}`),
      spots[kind],
    ]),
    [t("sources.station"), spots.station / euclid.planets_per_system],
  ];
  // Fewest first: this table is no step of the funnel (the owner, 2026-11-04).
  rows.sort((one, other) => one[1] - other[1]);
  const total = rows.reduce((sum, [, spot]) => sum + spot, 0);
  return (
    <ChartBlock
      spec={chartSpec({
        kind: "bars",
        labels: rows.map(([label]) => label),
        series: [
          {
            label: t("spotShare"),
            values: rows.map(([, spot]) => spot / total),
          },
        ],
        format: "share",
        label: t("spotShare"),
      })}
    >
      <DataTable
        head={[t("sourceHead"), t("spotShare")]}
        rows={rows.map(([label, spot]) => ({
          key: label,
          cells: [label, share(spot / total)],
        }))}
      />
    </ChartBlock>
  );
}

// The steps of a funnel, each a message `about.step.<key>`.
const STEP_KEYS = new Set([
  "ground",
  "sources",
  "offers",
  "connected",
  "square",
  "class",
  "own_load",
  "kept",
  "shown",
]);

// One spot offers a tool for every place you can start from.
const STARTS = Math.round(
  stepOf(euclid.tools, "offers") / stepOf(euclid.tools, "sources"),
);

function Funnel(props: { steps: typeof euclid.tools }) {
  const { t, count } = useSay();
  const label = (key: string) =>
    STEP_KEYS.has(key) ? t(`step.${key}`, { starts: String(STARTS) }) : key;
  return (
    <ChartBlock
      spec={chartSpec({
        kind: "bars",
        labels: props.steps.map((step) => label(step.key)),
        series: [
          {
            label: t("system"),
            values: props.steps.map((step) =>
              Math.log10(Math.max(step.per_system, 1)),
            ),
            exact: props.steps.map((step) => count(step.per_system)),
          },
        ],
        format: "power",
        label: t("funnel"),
      })}
    >
      <DataTable
        head={[t("stepHead"), t("planet"), t("system"), t("voxel")]}
        rows={props.steps.map((step) => ({
          key: step.key,
          cells: [
            label(step.key),
            count(step.per_planet),
            count(step.per_system),
            count(step.per_system * STARS_PER_REGION),
          ],
        }))}
      />
    </ChartBlock>
  );
}

// Counts too far apart for one straight scale, as powers of ten. Under one in
// a voxel draws no bar; the tooltip and the table keep the number.
function countSeries(
  label: string,
  values: number[],
  count: (value: number) => string,
) {
  return {
    label,
    values: values.map((value) => Math.log10(Math.max(value, 1))),
    exact: values.map((value) => count(value)),
  };
}

// Types that read as one family stay together in the table.
const TOOL_GROUPS = [
  ["pistol"],
  ["rifle"],
  ["atlantid-plain", "atlantid-yellow", "atlantid-blue"],
  ["sentinel-pistol", "sentinel-rifle"],
  ["experimental"],
  ["alien"],
  ["royal"],
];

const STAFF_TYPES = [
  "staff-transducer",
  "staff-aerator",
  "staff-coil",
  "staff-claw",
  "staff-head",
  "staff-heart",
  "staff-focus",
];

// The part of `shares` that `types` hold, summing to one.
function among(
  shares: Record<string, number>,
  types: string[],
): Record<string, number> {
  const total = types.reduce((sum, type) => sum + (shares[type] ?? 0), 0);
  return Object.fromEntries(
    types.map((type) => [type, total ? (shares[type] ?? 0) / total : 0]),
  );
}

// Largest family first, and largest type first inside a family.
function orderedTypes(shares: Record<string, number>, types: string[]) {
  const of = (type: string) => shares[type] ?? 0;
  const total = (group: string[]) =>
    group.reduce((sum, type) => sum + of(type), 0);
  const groups = TOOL_GROUPS.filter((group) => types.includes(group[0]));
  return [...(groups.length ? groups : [types])]
    .sort((left, right) => total(right) - total(left))
    .flatMap((group) => [...group].sort((left, right) => of(right) - of(left)));
}

// The kinds of place that pay a type, in the order a row names them; each a
// message `about.source.<kind>`.
const SOURCE_KINDS = [
  "shop",
  "monolith",
  "camp",
  "station",
  "pillar",
  "head",
  "beacon",
  "freighter",
  "droppod",
  "debris",
];

function TypeTable(props: { types: string[] }) {
  const bySource = (
    euclid as { by_type_source?: Record<string, Record<string, number>> }
  ).by_type_source;
  const all = inVoxel(euclid.tool_types, OWN_OFFERS);
  const kept = inVoxel(euclid.kept_tool_types, stepOf(euclid.tools, "kept"));
  const order = orderedTypes(among(all, props.types), props.types);
  const { intl, t, count } = useSay();
  // The kinds of place that pay a type.
  const paidBy = (counts: Record<string, number> | undefined) => {
    const names = SOURCE_KINDS.filter((kind) => (counts?.[kind] ?? 0) > 0);
    return names.length
      ? intl.formatList(
          names.map((kind) => t(`source.${kind}`)),
          { type: "unit", style: "short" },
        )
      : "—";
  };
  return (
    <ChartBlock
      spec={chartSpec({
        kind: "bars",
        labels: order.map((type) =>
          intl.formatMessage({ id: `toolBody.${type}` }),
        ),
        series: [
          countSeries(
            t("allSources"),
            order.map((type) => all[type] ?? 0),
            count,
          ),
          countSeries(
            t("weKeep"),
            order.map((type) => kept[type] ?? 0),
            count,
          ),
        ],
        format: "power",
        label: t("typesChart"),
      })}
    >
      <DataTable
        head={[t("type"), t("allSources"), t("from"), t("weKeep")]}
        rows={order.map((type) => ({
          key: type,
          cells: [
            <FormattedMessage key={type} id={`toolBody.${type}`} />,
            count(all[type] ?? 0),
            paidBy(bySource?.[type]),
            count(kept[type] ?? 0),
          ],
        }))}
      />
    </ChartBlock>
  );
}

function Types() {
  return <TypeTable types={TOOL_GROUPS.flat()} />;
}

function Staffs() {
  return <TypeTable types={STAFF_TYPES} />;
}

const FIGURE_CELLS: Record<string, [number, number][]> = {
  I: [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
  ],
  O: [
    [0, 0],
    [1, 0],
    [0, 1],
    [1, 1],
  ],
  T: [
    [0, 0],
    [1, 0],
    [2, 0],
    [1, 1],
  ],
  S: [
    [1, 0],
    [2, 0],
    [0, 1],
    [1, 1],
  ],
  Z: [
    [0, 0],
    [1, 0],
    [1, 1],
    [2, 1],
  ],
  J: [
    [1, 0],
    [1, 1],
    [0, 2],
    [1, 2],
  ],
  L: [
    [0, 0],
    [0, 1],
    [0, 2],
    [1, 2],
  ],
};

// One row for a shape and everything it turns or mirrors into, its name the
// message `about.shape.<mark>`. Places count where the shape fits on a
// multitool's 7 by 4 and a ship's 10 by 3.
const SHAPES = [
  { mark: "I", members: ["I"], turns: 2, tool: 23, ship: 21 },
  { mark: "O", members: ["O"], turns: 1, tool: 18, ship: 18 },
  { mark: "T", members: ["T"], turns: 4, tool: 54, ship: 50 },
  { mark: "S", members: ["S", "Z"], turns: 4, tool: 54, ship: 50 },
  { mark: "L", members: ["L", "J"], turns: 8, tool: 108, ship: 100 },
];

function Figures() {
  const { t } = useSay();
  const tools = euclid.tool_figures as Record<string, number>;
  const ships = euclid.kept_ship_figures as Record<string, number>;
  const total = (shares: Record<string, number>, members: string[]) =>
    members.reduce((sum, member) => sum + (shares[member] ?? 0), 0);
  const nameOf = (mark: string) => t(`shape.${mark}`);
  return (
    <ChartBlock
      spec={chartSpec({
        kind: "bars",
        labels: SHAPES.map((shape) => nameOf(shape.mark)),
        series: [
          {
            label: t("adjacentTools"),
            values: SHAPES.map((shape) => total(tools, shape.members)),
          },
          {
            label: t("shipsWeKeep"),
            values: SHAPES.map((shape) => total(ships, shape.members)),
          },
        ],
        format: "share",
        label: t("figuresChart"),
      })}
    >
      <DataTable
        head={[
          t("shapeHead"),
          t("name"),
          t("turns"),
          t("places"),
          t("adjacentTools"),
          t("shipsWeKeep"),
        ]}
        textColumns={2}
        rows={SHAPES.map((shape) => ({
          key: shape.mark,
          cells: [
            <Stack
              key={shape.mark}
              sx={{
                alignItems: "flex-start",
                justifyContent: "center",
                minHeight: 52,
              }}
            >
              <CellMark cells={FIGURE_CELLS[shape.mark]} />
            </Stack>,
            nameOf(shape.mark),
            shape.turns,
            `${shape.tool} / ${shape.ship}`,
            share(total(tools, shape.members)),
            share(total(ships, shape.members)),
          ],
        }))}
      />
    </ChartBlock>
  );
}

function Classes() {
  const { t, count } = useSay();
  const columns = [
    [t("allTools"), inVoxel(euclid.tool_classes, OWN_OFFERS)],
    [
      t("toolsWeKeep"),
      inVoxel(euclid.kept_tool_classes, stepOf(euclid.tools, "kept")),
    ],
    [
      t("allWrecks"),
      inVoxel(euclid.ship_classes, stepOf(euclid.ships, "sources")),
    ],
    [
      t("shipsWeKeep"),
      inVoxel(euclid.kept_ship_classes, stepOf(euclid.ships, "kept")),
    ],
  ] as const;
  return (
    <ChartBlock
      spec={chartSpec({
        kind: "bars",
        labels: RANK_OPTIONS.map((letter) => letter),
        series: columns.map(([label, counts]) =>
          countSeries(
            label,
            RANK_OPTIONS.map((letter) => counts[letter] ?? 0),
            count,
          ),
        ),
        format: "power",
        label: t("classesChart"),
      })}
    >
      <DataTable
        head={[t("class"), ...columns.map(([label]) => label)]}
        rows={RANK_OPTIONS.map((letter) => ({
          key: letter,
          cells: [
            letter,
            ...columns.map(([, counts]) => count(counts[letter] ?? 0)),
          ],
        }))}
      />
    </ChartBlock>
  );
}

function Hulls() {
  const all = inVoxel(euclid.ship_hulls, stepOf(euclid.ships, "sources"));
  const kept = inVoxel(euclid.kept_ship_hulls, stepOf(euclid.ships, "kept"));
  const { intl, t, count } = useSay();
  const order = Object.entries(all).sort((one, other) => other[1] - one[1]);
  return (
    <ChartBlock
      spec={chartSpec({
        kind: "bars",
        labels: order.map(([hull]) =>
          intl.formatMessage({ id: `hull.${hull}` }),
        ),
        series: [
          countSeries(
            t("allWrecks"),
            order.map(([, value]) => value),
            count,
          ),
          countSeries(
            t("weKeep"),
            order.map(([hull]) => kept[hull] ?? 0),
            count,
          ),
        ],
        format: "power",
        label: t("hullsChart"),
      })}
    >
      <DataTable
        head={[t("ship"), t("allWrecks"), t("weKeep")]}
        rows={order.map(([hull, value]) => ({
          key: hull,
          cells: [
            <FormattedMessage key={hull} id={`hull.${hull}`} />,
            count(value),
            count(kept[hull] ?? 0),
          ],
        }))}
      />
    </ChartBlock>
  );
}

function Histogram() {
  const { say, t } = useSay();
  const rows = histogramRows(say);
  return (
    <ChartBlock
      spec={chartSpec({
        kind: "line",
        labels: rows.map((row) => row.label),
        series: [
          {
            label: t("byTools"),
            values: rows.map((row) => row.tools),
          },
          {
            label: t("byShips"),
            values: rows.map((row) => row.ships),
          },
        ],
        format: "share",
        label: t("histogramChart"),
      })}
    >
      <DataTable
        head={[t("itemsKept"), t("byTools"), t("byShips")]}
        rows={rows.map((row) => ({
          key: row.label,
          cells: [row.label, share(row.tools), share(row.ships)],
        }))}
      />
    </ChartBlock>
  );
}

function Galaxies() {
  const { t, count } = useSay();
  const all = [stats.euclid, ...stats.galaxies];
  return (
    <ChartBlock
      spec={chartSpec({
        kind: "bars",
        labels: all.map((galaxy) => galaxy.name.replace(" Galaxy", "")),
        series: [
          {
            label: t("toolsPerSystem"),
            values: all.map((galaxy) => stepOf(galaxy.tools, "offers")),
            exact: all.map((galaxy) => count(stepOf(galaxy.tools, "offers"))),
          },
        ],
        format: "count",
        label: t("galaxiesChart"),
      })}
    >
      <DataTable
        head={[
          t("galaxy"),
          t("starsPerVoxel"),
          t("toolsPerSystem"),
          t("wrecksPerSystem"),
        ]}
        rows={all.map((galaxy) => ({
          key: galaxy.name,
          cells: [
            <>
              <GalaxyLink name={galaxy.name.replace(" Galaxy", "")} />
              {" ("}
              <FormattedMessage id={`galaxyType.${galaxy.type}`} />
              {")"}
            </>,
            count(galaxy.stars_per_region),
            count(stepOf(galaxy.tools, "offers")),
            count(stepOf(galaxy.ships, "sources")),
          ],
        }))}
      />
    </ChartBlock>
  );
}

const WIDGETS: Record<string, () => ReactNode> = {
  tiles: Tiles,
  scale: Scale,
  colours: Colours,
  sources: Sources,
  toolFunnel: () => <Funnel steps={euclid.tools} />,
  types: Types,
  staffs: Staffs,
  figures: Figures,
  classes: Classes,
  shipFunnel: () => <Funnel steps={euclid.ships} />,
  hulls: Hulls,
  histogram: Histogram,
  galaxies: Galaxies,
};

// How it works: its text, its widgets, and the guided tour.
export function AboutScreen(props: { html: string }) {
  return (
    <Stack spacing={1}>
      <GuidedTour />
      <Article html={props.html} widgets={WIDGETS} />
    </Stack>
  );
}
