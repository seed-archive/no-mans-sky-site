import { withSentryConfig } from "@sentry/nextjs/config";
import { readFileSync } from "node:fs";
import path from "node:path";

import type { NextConfig } from "next";

import { TOOLS } from "./lib/archive/tools";
import { DEFAULT_LANGUAGE } from "./lib/i18n/languages";
import { BASE_PATH, LEGACY_HOST } from "./lib/site";

// The guides menu the generator writes: each group and its guides.
const MENU: { slug: string; pages: { slug: string }[] }[] = JSON.parse(
  readFileSync(
    path.join(process.cwd(), "lib/archive/statistics-menu.json"),
    "utf8",
  ),
);

type Move = { source: string; destination: string };

// The domain's root, the portal, and the pages of it this section used to serve.
const PORTAL = "https://seedarchive.gg";
const PORTAL_PAGES = ["privacy", "terms", "release-notes"];

// The section's icons, the archive's sprout, served from app/ under the prefix.
const ROOT_ICONS = ["favicon.ico", "icon.svg", "apple-icon.png"];

// The tools, each at /tools/<slug> since 2026-11-16 and at /<slug> before.
const TOOL_SLUGS = TOOLS.map((tool) => tool.href.replace(/^\/tools\//, ""));

// The old paths of the guides, each to its page now, inside this section.
// Statistics became Guides on 2026-11-03, and each guide moved under its group
// on 2026-11-05: /guides/<slug> to /guides/<group>/<slug>. Where a group and a
// guide share a word (galaxies, systems, freighters) the short path is now the
// group's own page and leads to the guide from there.
function guideMoves(): Move[] {
  const long = (slug: string) => {
    const group = MENU.find((one) =>
      one.pages.some((page) => page.slug === slug),
    );
    return group ? `/guides/${group.slug}/${slug}` : "/guides";
  };
  const groups = new Set(MENU.map((group) => group.slug));
  const guides = MENU.flatMap((group) => group.pages.map((page) => page.slug));
  return [
    { source: "/statistics", destination: "/guides" },
    // The guide was Station upgrade modules until 2026-11-05.
    ...["statistics", "guides"].map((root) => ({
      source: `/${root}/station-upgrades`,
      destination: long("technology-merchants"),
    })),
    // Frigate traits became a section of Frigates on 2026-11-07.
    ...[
      "/statistics/frigate-traits",
      "/guides/frigate-traits",
      "/guides/freighters/frigate-traits",
    ].map((source) => ({
      source,
      destination: `${long("frigates")}#frigate-traits`,
    })),
    // Excavation finds became the Fossil Collector's guide on 2026-11-11.
    ...[
      "/statistics/excavation-finds",
      "/guides/excavation-finds",
      "/guides/planets/excavation-finds",
    ].map((source) => ({ source, destination: long("fossil-collector") })),
    // Farming left the Quests for the Crafting guides on 2026-11-16 (the owner:
    // a header holds four questions, and farming answers "what pays best").
    { source: "/quests/farming", destination: long("farming") },
    // The tools moved under /tools on 2026-11-16 (the owner: a tool's address
    // and trail name its section, as a guide's and a quest's do).
    ...TOOL_SLUGS.map((slug) => ({
      source: `/${slug}`,
      destination: `/tools/${slug}`,
    })),
    ...guides.map((slug) => ({
      source: `/statistics/${slug}`,
      destination: long(slug),
    })),
    ...guides
      .filter((slug) => !groups.has(slug))
      .map((slug) => ({ source: `/guides/${slug}`, destination: long(slug) })),
  ];
}

// Every redirect, in the order Next.js tries them. A path from outside this
// section (the old address, a path without the prefix) that names an old guide
// goes straight to the guide's page now, in one step, before the general rule
// that only adds the prefix.
function redirectList() {
  const moves = guideMoves();
  const legacy = { type: "host" as const, value: LEGACY_HOST };
  // Every page names its language since 2026-11-24 (D20), so an old address
  // goes straight to the English page, one redirect rather than two.
  const home = `${BASE_PATH}/${DEFAULT_LANGUAGE}`;
  const newSite = `${PORTAL}${home}`;
  return [
    // The section's icons at a domain's root, where Vercel's dashboard reads a
    // project's icon (from its primary domain, still the old address), first,
    // so neither the old-address rule nor the language rule sends them to a
    // page. On seedarchive.gg the portal serves the root, so visitors never get
    // here.
    ...ROOT_ICONS.flatMap((icon) => [
      ...(process.env.LEGACY_HOST_REDIRECT
        ? [
            {
              source: `/${icon}`,
              has: [legacy],
              destination: `${PORTAL}${BASE_PATH}/${icon}`,
              basePath: false as const,
              permanent: true,
            },
          ]
        : []),
      {
        source: `/${icon}`,
        destination: `${BASE_PATH}/${icon}`,
        basePath: false as const,
        permanent: true,
      },
    ]),
    // The legal pages belong to the portal since 2026-11-14 (D12), the release
    // notes since 2026-11-15 (D16): every old address of them, on any host,
    // straight to the portal's page.
    ...PORTAL_PAGES.flatMap((page) =>
      [`/${page}`, `${BASE_PATH}/${page}`].map((from) => ({
        source: from,
        destination: `${PORTAL}/${page}`,
        basePath: false as const,
        permanent: true,
      })),
    ),
    // The site from before the move: every path to the same page on the new
    // domain. Built in only when the deploy sets LEGACY_HOST_REDIRECT, so the
    // old address keeps working until seedarchive.gg answers.
    ...(process.env.LEGACY_HOST_REDIRECT
      ? [
          // The old home, with or without the prefix, to the section's home
          // itself: the rules below would add a slash and one more step.
          ...["/", BASE_PATH].map((from) => ({
            source: from,
            has: [legacy],
            destination: newSite,
            basePath: false as const,
            permanent: true,
          })),
          ...moves.flatMap(({ source, destination }) =>
            [source, `${BASE_PATH}${source}`].map((from) => ({
              source: from,
              has: [legacy],
              destination: `${newSite}${destination}`,
              basePath: false as const,
              permanent: true,
            })),
          ),
          {
            source: `${BASE_PATH}/:path*`,
            has: [legacy],
            destination: `${newSite}/:path*`,
            basePath: false as const,
            permanent: true,
          },
          {
            source: "/:path*",
            has: [legacy],
            destination: `${newSite}/:path*`,
            basePath: false as const,
            permanent: true,
          },
        ]
      : []),
    // The root becomes the page of Seed Archive itself once there is more than
    // one game, so it leads to this section only for now.
    {
      source: "/",
      destination: home,
      basePath: false as const,
      permanent: false,
    },
    // The section's own root names no language; the proxy never sees it, so
    // it goes to the English home here (D20).
    {
      source: BASE_PATH,
      destination: home,
      basePath: false as const,
      permanent: true,
    },
    // An old guide's path without the prefix, straight to its page.
    ...moves.map(({ source, destination }) => ({
      source,
      destination: `${home}${destination}`,
      basePath: false as const,
      permanent: true,
    })),
    // Every other path without the prefix: the old links of the site and any
    // path written as text. Next.js prefixes only its own links (next/link,
    // redirect, router). /_vercel/ is Vercel's own (Web Analytics), and
    // /no-mans-sky.rsc is the data of the section's own home page, so neither
    // is redirected.
    {
      source: `/:path((?!${BASE_PATH.slice(1)}(?:[/.]|$)|_vercel/).+)`,
      destination: `${home}/:path`,
      basePath: false as const,
      permanent: true,
    },
    // The game's name once more after the prefix, as an outside link wrote it
    // (`/no-mans-sky/no-man's-sky/guides/…`, seen in the visits of 2026-11-18):
    // the stray segment goes, the rest stays.
    {
      source: "/:stray(no-man(?:'|%27)s-sky|no-mans-sky)/:path*",
      destination: "/:path*",
      permanent: true,
    },
    // The old guide paths inside this section.
    ...moves.map(({ source, destination }) => ({
      source,
      destination: `/${DEFAULT_LANGUAGE}${destination}`,
      permanent: true,
    })),
  ];
}

const nextConfig: NextConfig = {
  basePath: BASE_PATH,
  // Pages read content/ at run time, so Vercel has to ship it.
  outputFileTracingIncludes: { "/**": ["./content/**"] },
  async redirects() {
    return redirectList();
  },
};

export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  widenClientFileUpload: true,
  tunnelRoute: "/monitoring",
  webpack: {
    automaticVercelMonitors: false,
  },
});
