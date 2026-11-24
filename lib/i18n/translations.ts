import { DEFAULT_LANGUAGE, type Language, LANGUAGES } from "./languages";

// The pages translated into each language other than English, by the start of
// their path, without the language. A page is added here when its text and its
// labels are translated, and only then is it served and listed in hreflang and
// the sitemap in that language (D20). English holds every page.
// The guides came a part at a time and the Database, the tools, the quests and
// the rest after them (2026-11-24); every page of the section is translated now.
// The Database stays noindex outside English (`indexing.ts`).
const EVERY_PAGE = ["/"];

const TRANSLATED: Record<Language, readonly string[]> = {
  en: [],
  ru: EVERY_PAGE,
  es: EVERY_PAGE,
  de: EVERY_PAGE,
};

function covers(prefix: string, path: string) {
  return prefix === "/" || path === prefix || path.startsWith(`${prefix}/`);
}

// Every language a page of this section has, English first.
export function translationsOf(path: string): Language[] {
  return LANGUAGES.filter(
    (language) =>
      language === DEFAULT_LANGUAGE ||
      TRANSLATED[language].some((prefix: string) => covers(prefix, path)),
  );
}
