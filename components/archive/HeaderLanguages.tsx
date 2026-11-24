"use client";

import { LanguageSwitcher } from "@seed-archive/ui/language-switcher";
import { usePathname } from "next/navigation";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { localPath } from "@/lib/i18n/languages";
import { translationsOf } from "@/lib/i18n/translations";
import { BASE_PATH } from "@/lib/site";

// The header's language switcher: the page in each language it is translated
// into (D20). Its links are plain, so each carries the section's prefix.
export function HeaderLanguages() {
  const current = useLanguage();
  // The path without the language: `/ru/guides` → `/guides`.
  const path = usePathname().replace(/^\/[a-z]{2}(?=\/|$)/, "") || "/";
  const translations = translationsOf(path).map((lang) => ({
    lang,
    href: `${BASE_PATH}${localPath(lang, path)}`,
  }));
  return <LanguageSwitcher current={current} translations={translations} />;
}
