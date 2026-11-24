// Every page's address names its language right after the section's prefix,
// English included: /no-mans-sky/<language>/… (the portal's docs/architecture.md,
// D20, 2026-11-24). The codes are the archive's four languages.
export const LANGUAGES = ["en", "ru", "es", "de"] as const;

export type Language = (typeof LANGUAGES)[number];

// The language of an address without one, and of x-default: always English, so
// one address always answers the same (D20).
export const DEFAULT_LANGUAGE: Language = "en";

export function isLanguage(value: string): value is Language {
  return (LANGUAGES as readonly string[]).includes(value);
}

// A path of this section in a language: `/guides` in Russian is `/ru/guides`,
// and the home `/` is `/ru`.
export function localPath(language: Language, path: string) {
  return path === "/" ? `/${language}` : `/${language}${path}`;
}
