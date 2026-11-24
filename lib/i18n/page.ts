import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { lang } from "next/root-params";

import {
  DEFAULT_LANGUAGE,
  isLanguage,
  type Language,
  localPath,
} from "./languages";
import { translationsOf } from "./translations";

// The language of the page being rendered, from its address.
export async function pageLanguage(): Promise<Language> {
  const language = await lang();
  if (!isLanguage(language)) {
    notFound();
  }
  return language;
}

// A path of this section in the page's language.
export async function localHref(path: string) {
  return localPath(await pageLanguage(), path);
}

// A page not yet translated into the address's language answers 307 to its
// English page (D20); a translated one renders in that language.
export async function requireTranslation(path: string): Promise<Language> {
  const language = await pageLanguage();
  if (!translationsOf(path).includes(language)) {
    redirect(localPath(DEFAULT_LANGUAGE, path));
  }
  return language;
}

// A page's metadata with its canonical, its own address in its own language,
// and hreflang to each translation plus x-default to English (D20).
export async function localMetadata(
  path: string,
  metadata: Metadata,
): Promise<Metadata> {
  const language = await pageLanguage();
  const languages: Record<string, string> = Object.fromEntries(
    translationsOf(path).map((one) => [one, localPath(one, path)]),
  );
  languages["x-default"] = localPath(DEFAULT_LANGUAGE, path);
  return {
    ...metadata,
    alternates: { canonical: localPath(language, path), languages },
  };
}
