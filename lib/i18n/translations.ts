import { DATABASE_PATH, toolGroupPath } from "../archive/paths";
import { TOOL_GROUPS } from "../archive/tools";
import { DEFAULT_LANGUAGE, type Language, LANGUAGES } from "./languages";

// The pages translated into each language other than English, by the start of
// their path, without the language: "/guides" holds every guide. A page is added
// here when its text and its labels are translated, and only then is it served
// and listed in hreflang and the sitemap in that language (D20). English holds
// every page.
// Part 1 of the guides (2026-11-24): the Galaxies and Systems groups whole.
// The rest of the guides, a part at a time (2026-11-24), each group whole:
// part 2 planets and crafting, 3 stations, 4 multitools and exosuit, 5 ships,
// 6 freighters and exocraft, 7 creatures: every guide.
// The Database whole (the owner, 2026-11-24: its interface is translated; the
// pages are noindex outside English, `indexing.ts`).
const WHOLE = ["/guides", DATABASE_PATH];

const TRANSLATED: Record<Language, readonly string[]> = {
  en: [],
  ru: WHOLE,
  es: WHOLE,
  de: WHOLE,
};

// Pages translated by themselves, without the pages under them: each tool
// group's own page (the owner, 2026-11-24), while its tools stay English.
const TOOL_GROUP_PAGES = TOOL_GROUPS.map((group) => toolGroupPath(group.slug));

const TRANSLATED_PAGES: Record<Language, readonly string[]> = {
  en: [],
  ru: TOOL_GROUP_PAGES,
  es: TOOL_GROUP_PAGES,
  de: TOOL_GROUP_PAGES,
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
      TRANSLATED[language].some((prefix: string) => covers(prefix, path)) ||
      TRANSLATED_PAGES[language].includes(path),
  );
}
