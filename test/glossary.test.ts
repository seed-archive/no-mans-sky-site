import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import glossary from "../lib/i18n/glossary.json";

// One word for one thing (the coordinator, 2026-11-24): each term the game's
// tables and the interface fix has one form a language, and the forms it
// replaced never come back, in the labels, the guides' catalogue or their
// Markdown. `lib/i18n/glossary.json` holds them; a form is matched whole, with
// its case.

type Entry = { use: string; avoid: string[] };
const TERMS = glossary as Record<string, Record<string, Entry>>;
const ROOT = path.join(__dirname, "..");

function textsOf(language: string): [string, string][] {
  const texts: [string, string][] = [];
  const add = (file: string) => {
    if (existsSync(file)) {
      texts.push([path.relative(ROOT, file), readFileSync(file, "utf8")]);
    }
  };
  add(path.join(ROOT, "lib/i18n", `${language}.json`));
  add(path.join(ROOT, "lib/i18n/statistics", `${language}.json`));
  const groups = path.join(ROOT, "lib/i18n/statistics", language);
  if (existsSync(groups)) {
    for (const file of readdirSync(groups)) {
      add(path.join(groups, file));
    }
  }
  const folder = path.join(ROOT, "content", language);
  if (existsSync(folder)) {
    for (const file of readdirSync(folder, { recursive: true })) {
      if (String(file).endsWith(".md")) {
        add(path.join(folder, String(file)));
      }
    }
  }
  return texts;
}

const whole = (word: string) =>
  new RegExp(
    `(?<![\\p{L}])${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?![\\p{L}])`,
    "u",
  );

describe.each(["ru", "es", "de"])("%s", (language) => {
  const texts = textsOf(language);
  for (const [term, forms] of Object.entries(TERMS)) {
    const entry = forms[language];
    if (!entry) {
      continue;
    }
    it(`says "${term}" as "${entry.use}" only`, () => {
      const found = texts.flatMap(([file, text]) =>
        entry.avoid
          .filter((word) => whole(word).test(text))
          .map((word) => `${file}: ${word}`),
      );
      expect(found).toEqual([]);
    });
  }
});
