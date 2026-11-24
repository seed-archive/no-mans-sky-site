import type { NestedMessages } from "@seed-archive/ui/localization";

import type { NoticeTexts } from "@/components/archive/LanguageNotice";

import { type Language, LANGUAGES } from "./languages";

// The messages of each language, loaded on the server for the page's language
// only, so a client bundle never carries the other three.
const MESSAGES: Record<Language, () => Promise<NestedMessages>> = {
  en: () => import("./en.json").then((module) => module.default),
  ru: () => import("./ru.json").then((module) => module.default),
  es: () => import("./es.json").then((module) => module.default),
  de: () => import("./de.json").then((module) => module.default),
};

export function messagesOf(language: Language) {
  return MESSAGES[language]();
}

// The language notice in every language, since it speaks the language it
// offers, not the page's.
export async function noticeTexts(): Promise<NoticeTexts> {
  const all = await Promise.all(
    LANGUAGES.map(
      async (language) =>
        [
          language,
          (await messagesOf(language)).languageNotice as NoticeTexts[Language],
        ] as const,
    ),
  );
  return Object.fromEntries(all) as NoticeTexts;
}
