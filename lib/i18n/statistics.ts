import menu from "@/lib/archive/statistics-menu.json";

import { groupTexts } from "./catalogue-groups";
import de from "./statistics/de.json";
import en from "./statistics/en.json";
import es from "./statistics/es.json";
import gameDe from "./statistics/game/de.json";
import gameEs from "./statistics/game/es.json";
import gameRu from "./statistics/game/ru.json";
import ru from "./statistics/ru.json";
import type { Language } from "./languages";

// The generator writes `statistics.json` and `statistics-menu.json` with a key in
// place of every text, and the English of each key into `statistics/en.json`
// (the generator's docs/translation.md). The other languages keep their text
// under the same keys beside it.
export type Catalogue = Record<string, string>;

export const ENGLISH: Catalogue = en;

// Read on the server only (a page, the layout): no client component imports
// this module, so the catalogues never reach a browser.
// A language's catalogue: the game's own names (`game/<lang>.json`, written by
// the generator's `loc_emit.py catalogue` from the game's tables by key) with
// the translators' texts (`<lang>.json`, and a file a menu group in `<lang>/`)
// laid over them.
const CATALOGUES: Record<Language, Catalogue> = {
  en,
  ru: { ...gameRu, ...ru, ...groupTexts("ru") },
  es: { ...gameEs, ...es, ...groupTexts("es") },
  de: { ...gameDe, ...de, ...groupTexts("de") },
};

export function catalogueOf(language: Language): Catalogue {
  return CATALOGUES[language];
}

// Every string of `value` that is a key, as its text: in the catalogue, or in
// English where the catalogue has no such key yet. A string that is no key
// (a sprite, a code, a number) stays as it is.
export function resolved<T>(value: T, catalogue: Catalogue): T {
  if (typeof value === "string") {
    return (catalogue[value] ?? ENGLISH[value] ?? value) as T;
  }
  if (Array.isArray(value)) {
    return value.map((one) => resolved(one, catalogue)) as T;
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([name, one]) => [
        name,
        resolved(one, catalogue),
      ]),
    ) as T;
  }
  return value;
}

// A text of the guides menu (a group's or a guide's title) on the server.
export function menuText(language: Language, key: string) {
  return catalogueOf(language)[key] ?? ENGLISH[key] ?? key;
}

// The texts of the guides menu in a language, as messages: the client's menus
// read them through react-intl, so the catalogue itself never reaches a browser.
export function menuMessages(language: Language) {
  const catalogue = catalogueOf(language);
  const keys = menu.flatMap((group) => [
    group.title,
    ...group.pages.map((page) => page.title),
  ]);
  return Object.fromEntries(
    keys.map((key) => [key, catalogue[key] ?? ENGLISH[key] ?? key]),
  );
}
