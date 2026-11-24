"use client";

import Link from "@/components/archive/LocalLink";
import MuiLink from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ChartBlock } from "@seed-archive/ui/chart";
import { SlotTile } from "@seed-archive/ui/slot-tile";

import {
  Article,
  CellMark,
  DataTable,
  GalaxyLink,
} from "@/components/archive/Article";
import { SentinelMeme } from "@/components/archive/SentinelMeme";
import { DishList, LoopList } from "@/components/archive/RecipeTree";
import {
  DreadnoughtCannons,
  DreadnoughtEngines,
  DreadnoughtRender,
  DreadnoughtShields,
  SentinelRender,
  SentinelShields,
} from "@/components/archive/ShipRender";
import { useText } from "@/components/archive/useText";
import statisticsMenu from "@/lib/archive/statistics-menu.json";
import { groupPath, guidePath } from "@/lib/archive/guides";
import type { StatTable, Topic } from "@/lib/archive/statistics";
import type { ItemPart } from "@/lib/archive/statistics-format";
import type { ChartSpec } from "@/lib/archive/chart-spec";
import { BASE_PATH } from "@/lib/site";

// A module's picture from the game, then its name: one tile of the page's
// sprite, framed as an inventory slot.
function iconCell(
  cell: string,
  tile: number | null | undefined,
  sprite: { src: string; columns: number },
) {
  return (
    <Stack
      key="icon"
      direction="row"
      spacing={1.5}
      sx={{ alignItems: "center", minHeight: 52 }}
    >
      <SlotTile tile={tile} sprite={sprite} basePath={BASE_PATH} />
      <Typography variant="body2">{cell}</Typography>
    </Stack>
  );
}

// Items of one cell, one under another, each on its slot with its count, as the
// recipe pages draw them.
function itemsCell(
  key: number,
  parts: ItemPart[],
  sprite: { src: string; columns: number },
) {
  return (
    <Stack key={key} spacing={0.5}>
      {parts.map(([name, amount, tile], at) => (
        <Stack
          key={at}
          direction="row"
          spacing={1.5}
          sx={{ alignItems: "center" }}
        >
          <SlotTile tile={tile} sprite={sprite} basePath={BASE_PATH} />
          <Typography variant="body2">
            {amount > 1 ? `${amount.toLocaleString("en")} × ` : ""}
            {name}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
}

function galaxyCell(cell: string) {
  const [name, ...rest] = cell.split(" ");
  return (
    <>
      <GalaxyLink name={name} /> {rest.join(" ")}
    </>
  );
}

function TableNote(props: { note: string }) {
  return (
    <Typography variant="caption" color="text.secondary">
      {props.note}
    </Typography>
  );
}

// `noted` false leaves the note to the caller: under a chart it stands below
// the Chart and Table switch, so both views show it.
function StatisticsTable(props: { table: StatTable; noted?: boolean }) {
  const { table, noted = true } = props;
  return (
    <Stack spacing={0.75}>
      <DataTable
        head={table.head}
        upright={table.upright}
        textColumns={table.text}
        rows={table.rows.map((row, index) => ({
          key: `${index}.${row[0]}`,
          cells: table.marks
            ? [
                <Stack
                  key="mark"
                  direction="row"
                  spacing={1.5}
                  sx={{ alignItems: "center", minHeight: 52 }}
                >
                  <CellMark
                    cells={table.marks[index]}
                    accent={table.accents?.[index]}
                  />
                  {row[0] ? (
                    <Typography variant="body2">{row[0]}</Typography>
                  ) : null}
                </Stack>,
                ...row.slice(1),
              ]
            : table.items && table.sprite
              ? row.map((cell, at) => {
                  const parts = table.items?.[index]?.[at];
                  return parts && table.sprite
                    ? itemsCell(at, parts, table.sprite)
                    : cell;
                })
              : table.icons && table.sprite
                ? [
                    iconCell(row[0], table.icons[index], table.sprite),
                    ...row.slice(1),
                  ]
                : table.head[0] === "Galaxy"
                  ? [galaxyCell(row[0]), ...row.slice(1)]
                  : row,
        }))}
      />
      {noted && table.note ? <TableNote note={table.note} /> : null}
    </Stack>
  );
}

// Pictures a page's text may place besides its tables.
const PICTURES = {
  meme: SentinelMeme,
  dreadnoughtRender: DreadnoughtRender,
  dreadnoughtShields: DreadnoughtShields,
  dreadnoughtEngines: DreadnoughtEngines,
  dreadnoughtCannons: DreadnoughtCannons,
  sentinelRender: SentinelRender,
  sentinelShields: SentinelShields,
};

function widgetsOf(
  tables: Record<string, StatTable>,
  charts: Record<string, ChartSpec>,
) {
  return Object.fromEntries([
    ...Object.entries(PICTURES),
    ...Object.entries(tables).map(([name, table]) => [
      name,
      function Widget() {
        const spec = charts[name];
        if (table.dishes) {
          return <DishList dishes={table.dishes} note={table.note} />;
        }
        if (table.trees && table.sprite) {
          return (
            <LoopList
              groups={table.trees}
              sprite={table.sprite}
              note={table.note}
            />
          );
        }
        return spec ? (
          <Stack spacing={0.75}>
            <ChartBlock spec={spec}>
              <StatisticsTable table={table} noted={false} />
            </ChartBlock>
            <TableNote note={table.note} />
          </Stack>
        ) : (
          <StatisticsTable table={table} />
        );
      },
    ]),
  ]);
}

export function TopicScreen(props: {
  html: string;
  tables: Record<string, StatTable>;
  charts: Record<string, ChartSpec>;
}) {
  return (
    <Article
      html={props.html}
      widgets={widgetsOf(props.tables, props.charts)}
    />
  );
}

// The guides of each group with the question and the short answer of each.
// The guides page lists every group under a link to the group's own page; a
// group's page lists its own guides alone, under its title. A section outside
// the guides (Quests) passes its own title and pages, each with its path.
export function TopicList(props: {
  topics: Topic[];
  questions: Record<string, string | undefined>;
  group?: string;
  section?: {
    title: string;
    pages: { slug: string; title: string; href: string }[];
  };
}) {
  const text = useText();
  const factOf = new Map(props.topics.map((row) => [row.slug, row.fact]));
  const groups = props.section
    ? [{ slug: "", ...props.section }]
    : statisticsMenu
        .filter((group) => !props.group || group.slug === props.group)
        .map((group) => ({
          ...group,
          pages: group.pages.map((page) => ({
            ...page,
            href: guidePath(page.slug),
          })),
        }));
  const own = Boolean(props.group || props.section);
  return (
    <Stack spacing={3} sx={{ maxWidth: 760 }}>
      {groups.map((group) => (
        <Stack key={group.slug || group.title} spacing={1.5}>
          {own ? (
            <Typography variant="h3" component="h1">
              {text(group.title)}
            </Typography>
          ) : (
            <MuiLink
              component={Link}
              href={groupPath(group.slug)}
              variant="h4"
              underline="hover"
              color="text.primary"
            >
              {text(group.title)}
            </MuiLink>
          )}
          <Stack component="ul" spacing={2} sx={{ p: 0, m: 0 }}>
            {group.pages.map((page) => (
              <Stack key={page.slug} component="li" sx={{ listStyle: "none" }}>
                <MuiLink component={Link} href={page.href} variant="h6">
                  {text(page.title)}
                </MuiLink>
                {props.questions[page.slug] && (
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    {props.questions[page.slug]}
                  </Typography>
                )}
                <Typography variant="body2" color="text.secondary">
                  {factOf.get(page.slug)}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
}
