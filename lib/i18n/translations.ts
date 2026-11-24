import { DEFAULT_LANGUAGE, type Language, LANGUAGES } from "./languages";

// The pages translated into each language other than English, by the start of
// their path, without the language: "/guides" holds every guide. A page is added
// here when its text and its labels are translated, and only then is it served
// and listed in hreflang and the sitemap in that language (D20). English holds
// every page.
// Part 1 of the guides (2026-11-24): the Galaxies and Systems groups whole.
const PART_1 = ["/guides/galaxies", "/guides/systems"];

const TRANSLATED: Record<Language, readonly string[]> = {
  en: [],
  ru: PART_1,
  es: PART_1,
  de: PART_1,
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
