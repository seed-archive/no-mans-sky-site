// The tools in groups, as the header's Tools menu and /tools show them (the
// owner, 2026-11-24: grouped as the guides are), in the order a player looks
// for them: ships first, then rating a find, the recipes, and the planets.
// Each group is a level of the address, /tools/<group>/<tool>, with a page of
// its own; its slug is short, stable and English (the owner, 2026-11-24). The
// paths are built in `paths.ts`.
export const TOOL_GROUPS = [
  {
    slug: "ships",
    id: "archive.toolsShips",
    tools: [
      { slug: "interceptor-finder", id: "archive.interceptorFinder" },
      {
        slug: "capital-freighter-finder",
        id: "archive.capitalFreighterFinder",
      },
      { slug: "freighter-finder", id: "archive.freighterFinder" },
      { slug: "living-ship-finder", id: "archive.livingShipFinder" },
      { slug: "living-frigate-finder", id: "archive.livingFrigateFinder" },
      { slug: "starship-finder", id: "archive.starshipFinder" },
    ],
  },
  {
    slug: "finds",
    id: "archive.toolsFinds",
    tools: [{ slug: "how-lucky-am-i", id: "archive.luckCalculator" }],
  },
  {
    slug: "recipes",
    id: "archive.toolsRecipes",
    tools: [
      { slug: "refiner-recipes", id: "archive.refinerRecipes" },
      { slug: "cooking-recipes", id: "archive.cookingRecipes" },
      { slug: "crafting-recipes", id: "archive.craftingRecipes" },
    ],
  },
  {
    slug: "planets",
    id: "archive.toolsPlanets",
    tools: [{ slug: "planet-globe", id: "archive.planetGlobe" }],
  },
] as const;

export type ToolGroup = (typeof TOOL_GROUPS)[number];

export type ToolGroupSlug = ToolGroup["slug"];

export type ToolSlug = ToolGroup["tools"][number]["slug"];

// Every tool with its group, in the groups' order: the footer and the
// redirects.
export const TOOLS = TOOL_GROUPS.flatMap((group) =>
  group.tools.map((tool) => ({ ...tool, group: group.slug })),
);
