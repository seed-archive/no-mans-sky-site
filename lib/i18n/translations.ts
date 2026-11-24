import { DEFAULT_LANGUAGE, type Language, LANGUAGES } from "./languages";

// The pages translated into each language other than English, by the start of
// their path, without the language: "/guides" holds every guide. A page is added
// here when its text and its labels are translated, and only then is it served
// and listed in hreflang and the sitemap in that language (D20). English holds
// every page.
// Part 1 of the guides (2026-11-24): the Galaxies and Systems groups whole.
const PART_1 = ["/guides/galaxies", "/guides/systems"];
// The rest of the guides, a part at a time (2026-11-24), each group whole:
// part 2 planets and crafting, 3 stations, 4 multitools and exosuit, 5 ships,
// 7 creatures.
const GUIDES = [
  ...PART_1,
  "/guides/planets",
  "/guides/crafting",
  "/guides/stations",
  "/guides/multitools",
  "/guides/exosuit",
  "/guides/ships",
  "/guides/creatures",
];

const TRANSLATED: Record<Language, readonly string[]> = {
  en: [],
  ru: GUIDES,
  es: GUIDES,
  de: GUIDES,
};

function covers(prefix: string, path: string) {
  return prefix === "/"
    ? path === "/"
    : path === prefix || path.startsWith(`${prefix}/`);
}

// Every language a page of this section has, English first.
export function translationsOf(path: string): Language[] {
  return LANGUAGES.filter(
    (language) =>
      language === DEFAULT_LANGUAGE ||
      TRANSLATED[language].some((prefix: string) => covers(prefix, path)),
  );
}
