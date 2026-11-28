"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import GlobalStyles from "@mui/material/GlobalStyles";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import NextLink from "@/components/archive/LocalLink";
import type { PropsWithChildren, ReactNode } from "react";
import { FormattedMessage } from "react-intl";

import { ArchiveBar, BAR_HEIGHT } from "@/components/archive/ArchiveBar";
import { useText } from "@/components/archive/useText";
import { useLanguage } from "@/components/providers/LanguageProvider";
import game from "@/lib/archive/game.json";
import { PAGE_KINDS } from "@/lib/archive/kinds";
import statisticsMenu from "@/lib/archive/statistics-menu.json";
import { kindPath, toolPath } from "@/lib/archive/paths";
import { TOOLS } from "@/lib/archive/tools";
import { groupPath, QUESTS_PATH, questPath } from "@/lib/archive/guides";

// `portal` marks a page of the domain's root (the shared legal pages): a plain link,
// since next/link would add this section's prefix, in the page's language, as
// the portal's pages carry it too (D20).
type Column = {
  title: ReactNode;
  links: { href: string; label: ReactNode; portal?: boolean }[];
};

// The quest pages the footer names by slug and message id, so this client
// component does not load the guides' data for their titles.
const FOOTER_QUESTS = [
  ["puzzles", "archive.puzzleAnswers"],
  ["the-artemis-path", "archive.artemisPath"],
  ["the-atlas-path", "archive.atlasPath"],
  ["starbirth", "archive.starbirth"],
] as const;

// The sections in plain links, one column each, so a crawler reaches what the
// menus hold.
const COLUMNS: Column[] = [
  {
    title: <FormattedMessage id="archive.game" />,
    links: [
      { href: "/about", label: <FormattedMessage id="archive.about" /> },
      {
        href: "/privacy",
        label: <FormattedMessage id="archive.privacy" />,
        portal: true,
      },
      {
        href: "/terms",
        label: <FormattedMessage id="archive.terms" />,
        portal: true,
      },
      {
        href: "/release-notes",
        label: <FormattedMessage id="archive.releaseNotes" />,
        portal: true,
      },
      // Donations live on one page of the portal (the owner, 2026-11-24).
      {
        href: "/support",
        label: <FormattedMessage id="archive.support" />,
        portal: true,
      },
      {
        href: "/game-bugs",
        label: <FormattedMessage id="archive.gameBugs" />,
      },
    ],
  },
  {
    title: <FormattedMessage id="archive.browse" />,
    links: PAGE_KINDS.map((kind) => ({
      href: kindPath(kind),
      label: <FormattedMessage id={`kinds.${kind}`} />,
    })),
  },
  // One link a group of guides, to the group's own page.
  {
    title: <FormattedMessage id="archive.statistics" />,
    links: statisticsMenu.map((group) => ({
      href: groupPath(group.slug),
      label: group.title,
    })),
  },
  // The Quests section: the puzzle answers and the main story chains, then the
  // section's own page with every quest (the owner, 2026-11-14).
  {
    title: <FormattedMessage id="archive.quests" />,
    links: [
      ...FOOTER_QUESTS.map(([slug, id]) => ({
        href: questPath(slug),
        label: <FormattedMessage id={id} />,
      })),
      { href: QUESTS_PATH, label: <FormattedMessage id="archive.allQuests" /> },
    ],
  },
  {
    title: <FormattedMessage id="archive.tools" />,
    links: TOOLS.map((tool) => ({
      href: toolPath(tool.slug),
      label: <FormattedMessage id={tool.id} />,
    })),
  },
];

// Air between the sticky bar and an anchor scrolled under it, pixels (our own choice).
const ANCHOR_GAP = 8;

export function ArchiveShell({ children }: PropsWithChildren) {
  const language = useLanguage();
  const text = useText();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {/* Every anchor scrolls below the sticky bar, whatever element it names. */}
      <GlobalStyles
        styles={(theme) => ({
          html: {
            scrollPaddingTop: BAR_HEIGHT.xs + ANCHOR_GAP,
            [theme.breakpoints.up("sm")]: {
              scrollPaddingTop: BAR_HEIGHT.sm + ANCHOR_GAP,
            },
          },
        })}
      />
      <ArchiveBar />
      <Container component="main" sx={{ py: 4, flexGrow: 1 }}>
        {children}
      </Container>
      <Box
        component="footer"
        sx={{ borderTop: 1, borderColor: "divider", py: 4 }}
      >
        <Container
          component="nav"
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              sm: "repeat(3, 1fr)",
              md: "repeat(5, 1fr)",
            },
            columnGap: 3,
            rowGap: 3,
          }}
        >
          {COLUMNS.map((column, index) => (
            <Stack key={index} spacing={0.75}>
              <Typography variant="subtitle2" component="h2">
                {column.title}
              </Typography>
              {column.links.map((link) => (
                <Link
                  key={link.href}
                  component={link.portal ? "a" : NextLink}
                  href={link.portal ? `/${language}${link.href}` : link.href}
                  color="text.secondary"
                  variant="body2"
                  underline="hover"
                >
                  {typeof link.label === "string"
                    ? text(link.label)
                    : link.label}
                </Link>
              ))}
            </Stack>
          ))}
        </Container>
        {/* The game version the section's data comes from (the owner, 2026-11-28), written by the generator. */}
        <Container sx={{ mt: 3 }}>
          <Typography variant="body2" color="text.secondary">
            <FormattedMessage
              id="archive.gameVersion"
              values={{ version: game.gameVersion }}
            />
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
