import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { lang } from "next/root-params";

import {
  DEFAULT_LANGUAGE,
  isLanguage,
  type Language,
  localPath,
} from "./languages";
import { indexable } from "./indexing";
import { messageOf } from "./messages";
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
// and hreflang to each indexed translation plus x-default to English (D20); a
// page not indexed in its language is noindex, its links still followed.
export async function localMetadata(
  path: string,
  metadata: Metadata,
): Promise<Metadata> {
  const language = await pageLanguage();
  const languages: Record<string, string> = Object.fromEntries(
    translationsOf(path)
      .filter((one) => indexable(one, path))
      .map((one) => [one, localPath(one, path)]),
  );
  languages["x-default"] = localPath(DEFAULT_LANGUAGE, path);
  return {
    ...metadata,
    ...(indexable(language, path)
      ? {}
      : { robots: { index: false, follow: true } }),
    alternates: { canonical: localPath(language, path), languages },
  };
}

// A page's metadata whose title and description are the messages
// `meta.<key>.title` and `meta.<key>.description` of the page's language.
export async function messageMetadata(
  path: string,
  key: string,
): Promise<Metadata> {
  const language = await pageLanguage();
  return localMetadata(path, {
    title: messageOf(language, `meta.${key}.title`),
    description: messageOf(language, `meta.${key}.description`),
  });
}
