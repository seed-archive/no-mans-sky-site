// The tools in groups, as the header's Tools menu and /tools show them (the
// owner, 2026-11-24: grouped as the guides are), in the order a player looks
// for them: ships first, then rating a find, the recipes, and the planets.
export const TOOL_GROUPS = [
  {
    id: "archive.toolsShips",
    tools: [
      { href: "/tools/interceptor-finder", id: "archive.interceptorFinder" },
      {
        href: "/tools/capital-freighter-finder",
        id: "archive.capitalFreighterFinder",
      },
      { href: "/tools/freighter-finder", id: "archive.freighterFinder" },
      { href: "/tools/living-ship-finder", id: "archive.livingShipFinder" },
      {
        href: "/tools/living-frigate-finder",
        id: "archive.livingFrigateFinder",
      },
      { href: "/tools/starship-finder", id: "archive.starshipFinder" },
    ],
  },
  {
    id: "archive.toolsFinds",
    tools: [{ href: "/tools/how-lucky-am-i", id: "archive.luckCalculator" }],
  },
  {
    id: "archive.toolsRecipes",
    tools: [
      { href: "/tools/refiner-recipes", id: "archive.refinerRecipes" },
      { href: "/tools/cooking-recipes", id: "archive.cookingRecipes" },
      { href: "/tools/crafting-recipes", id: "archive.craftingRecipes" },
    ],
  },
  {
    id: "archive.toolsPlanets",
    tools: [{ href: "/tools/planet-globe", id: "archive.planetGlobe" }],
  },
];

// Every tool, in the groups' order: the footer and the redirects.
export const TOOLS = TOOL_GROUPS.flatMap((group) => group.tools);
