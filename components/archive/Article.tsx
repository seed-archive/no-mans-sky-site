"use client";

import Link from "@/components/archive/LocalLink";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import MuiLink from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import type { ReactNode } from "react";
import { FormattedMessage } from "react-intl";
import { AnchorHeadings } from "@seed-archive/ui/anchor-heading";

import { galaxyHref } from "@/lib/archive/galaxies";

type Row = { key: string; cells: ReactNode[] };

// Four cells of an inventory grid, drawn small.
// A figure of cells; `accent`, when given, is one cell drawn in the second
// colour, such as the weapon's place among its modules.
export function CellMark(props: {
  cells: [number, number][];
  accent?: [number, number];
}) {
  const { cells, accent } = props;
  const columns = Math.max(...cells.map((cell) => cell[0])) + 1;
  const rows = Math.max(...cells.map((cell) => cell[1])) + 1;
  return (
    <Box
      aria-hidden
      sx={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 12px)`,
        gridTemplateRows: `repeat(${rows}, 12px)`,
        gap: "2px",
      }}
    >
      {cells.map(([column, row]) => (
        <Box
          key={`${column}.${row}`}
          sx={{
            gridColumn: column + 1,
            gridRow: row + 1,
            bgcolor:
              accent && accent[0] === column && accent[1] === row
                ? "secondary.main"
                : "primary.main",
            borderRadius: "2px",
          }}
        />
      ))}
    </Box>
  );
}

export function GalaxyLink(props: { name: string }) {
  const { name } = props;
  const href = galaxyHref(name);
  if (!href) {
    return name;
  }
  return (
    <MuiLink component={Link} href={href}>
      {name}
    </MuiLink>
  );
}

export function DataTable(props: {
  caption?: string;
  head: ReactNode[];
  rows: Row[];
  upright?: boolean;
  // How many columns from the start hold text, not numbers.
  textColumns?: number;
}) {
  const { caption, head, rows, upright, textColumns = 1 } = props;
  return (
    <Card variant="outlined">
      <TableContainer>
        <Table size="small" aria-label={caption ?? String(head[0])}>
          <TableHead>
            <TableRow>
              {head.map((title, index) => (
                <TableCell
                  key={index}
                  align={index < textColumns ? "left" : "right"}
                  sx={
                    upright && index
                      ? {
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                          whiteSpace: "nowrap",
                          textAlign: "left",
                        }
                      : undefined
                  }
                >
                  {title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.key}>
                {row.cells.map((cell, index) => (
                  <TableCell
                    key={index}
                    align={index < textColumns ? "left" : "right"}
                    // A cell of several shares puts one on each line.
                    sx={{ whiteSpace: "pre-line" }}
                  >
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}

// Rendered Markdown between widget marks and section headings.
function Prose(props: { html: string }) {
  return (
    <Box
      dangerouslySetInnerHTML={{ __html: props.html }}
      sx={{
        "& h1": { typography: "h4", mt: 0, mb: 2 },
        "& h3": { typography: "h6", mt: 2, mb: 1 },
        "& p, & li": { typography: "body1" },
        "& p": { mt: 0, mb: 2 },
        "& ul, & ol": { mt: 0, mb: 2, pl: 3 },
        "& li": { mb: 0.5 },
        "& a": { color: "primary.main" },
        "& small": { typography: "body2" },
        "& table": {
          width: "100%",
          mb: 2,
          borderCollapse: "collapse",
          typography: "body2",
        },
        "& th, & td": {
          px: 2,
          py: 1,
          textAlign: "left",
          borderBottom: 1,
          borderColor: "divider",
        },
        "& th": { fontWeight: 500 },
      }}
    />
  );
}

type Section = { heading: string; items: ReactNode[] };

const H2_END = "</h2>";

// The article in sections: each `<h2>` opens one that holds every text and
// widget up to the next. The heading is a child of its section, so it stays
// under the bar over the section's tables too. Every heading is an anchor: a
// chain icon, a click copies the address.
export function Article(props: {
  html: string;
  widgets: Record<string, () => ReactNode>;
}) {
  const sections: Section[] = [{ heading: "", items: [] }];
  props.html.split(/<!-- widget:(\w+) -->/).forEach((part, index) => {
    if (index % 2 === 1) {
      const Widget = props.widgets[part];
      if (Widget) {
        sections.at(-1)!.items.push(<Widget key={index} />);
      }
      return;
    }
    part.split(/(?=<h2[\s>])/).forEach((chunk, at) => {
      let text = chunk;
      if (chunk.startsWith("<h2")) {
        const end = chunk.indexOf(H2_END) + H2_END.length;
        sections.push({ heading: chunk.slice(0, end), items: [] });
        text = chunk.slice(end);
      }
      if (text.trim()) {
        sections
          .at(-1)!
          .items.push(<Prose key={`${index}.${at}`} html={text} />);
      }
    });
  });
  return (
    <AnchorHeadings
      component="article"
      copied={<FormattedMessage id="archive.linkCopied" />}
      sx={{
        maxWidth: 760,
        pb: 2,
        "& h2": {
          typography: "h5",
          mt: 0,
          mb: 1,
          py: 1,
        },
      }}
    >
      <Stack spacing={2.5}>
        {sections.map((section, index) => (
          <Box key={index} component="section">
            {section.heading ? (
              <Box
                sx={{ display: "contents" }}
                dangerouslySetInnerHTML={{ __html: section.heading }}
              />
            ) : null}
            <Stack spacing={2.5}>{section.items}</Stack>
          </Box>
        ))}
      </Stack>
    </AnchorHeadings>
  );
}
