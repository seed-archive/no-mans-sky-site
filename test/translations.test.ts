import { existsSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import menu from "../lib/archive/statistics-menu.json";
import messagesEn from "../lib/i18n/en.json";
import messagesRu from "../lib/i18n/ru.json";
import messagesEs from "../lib/i18n/es.json";
import messagesDe from "../lib/i18n/de.json";
import { groupTexts } from "../lib/i18n/catalogue-groups";
import { LANGUAGES, type Language } from "../lib/i18n/languages";
import catalogueEn from "../lib/i18n/statistics/en.json";
import catalogueRu from "../lib/i18n/statistics/ru.json";
import catalogueEs from "../lib/i18n/statistics/es.json";
import catalogueDe from "../lib/i18n/statistics/de.json";
import gameRu from "../lib/i18n/statistics/game/ru.json";
import gameEs from "../lib/i18n/statistics/game/es.json";
import gameDe from "../lib/i18n/statistics/game/de.json";
import { translationsOf } from "../lib/i18n/translations";

// A page reaches the site in a language only whole (the coordinator's condition
// 3, 2026-11-24): every text of its catalogue, its Markdown and every label.
// The generator names a catalogue key by its English, so a key whose English
// changed is a new key, missing here until it is translated again.

type Nested = { [key: string]: string | Nested };

const CATALOGUES: Record<Language, Record<string, string>> = {
  en: catalogueEn,
  ru: { ...gameRu, ...catalogueRu, ...groupTexts("ru") },
  es: { ...gameEs, ...catalogueEs, ...groupTexts("es") },
  de: { ...gameDe, ...catalogueDe, ...groupTexts("de") },
};
const MESSAGES: Record<Language, Nested> = {
  en: messagesEn,
  ru: messagesRu,
  es: messagesEs,
  de: messagesDe,
};

function keysOf(messages: Nested, prefix = ""): string[] {
  return Object.entries(messages).flatMap(([key, value]) =>
    typeof value === "string"
      ? [`${prefix}${key}`]
      : keysOf(value, `${prefix}${key}.`),
  );
}

const GUIDES = menu.flatMap((group) =>
  group.pages.map((page) => ({
    slug: page.slug,
    path: `/guides/${group.slug}/${page.slug}`,
  })),
);

describe.each(LANGUAGES.filter((language) => language !== "en"))(
  "%s",
  (language) => {
    it("holds every label of the English messages", () => {
      const missing = keysOf(MESSAGES.en).filter(
        (key) => !keysOf(MESSAGES[language]).includes(key),
      );
      expect(missing).toEqual([]);
    });

    for (const guide of GUIDES.filter((one) =>
      translationsOf(one.path).includes(language),
    )) {
      it(`has the whole of ${guide.slug}`, () => {
        const missing = Object.keys(CATALOGUES.en).filter(
          (key) =>
            key.startsWith(`${guide.slug}.`) && !(key in CATALOGUES[language]),
        );
        expect(missing).toEqual([]);
        const text = path.join(
          __dirname,
          "../content",
          language,
          "statistics",
          `${guide.slug}.md`,
        );
        expect(existsSync(text), text).toBe(true);
      });
    }
  },
);
