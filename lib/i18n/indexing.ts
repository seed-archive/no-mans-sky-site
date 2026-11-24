import { DATABASE_PATH } from "../archive/paths";
import { DEFAULT_LANGUAGE, type Language } from "./languages";

// Whether search engines index a page in a language (the owner, 2026-11-24):
// the Database is indexed in English only, since its records are the game's
// names and numbers whatever the interface; ru/es/de serve it, noindex, and
// leave it out of hreflang and the sitemap. Every other page is indexed in each
// language it is translated into.
export function indexable(language: Language, path: string) {
  return (
    language === DEFAULT_LANGUAGE ||
    !(path === DATABASE_PATH || path.startsWith(`${DATABASE_PATH}/`))
  );
}
