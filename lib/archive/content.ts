import { readFile } from "node:fs/promises";
import path from "node:path";

import { marked } from "marked";

import { longGuideLinks, questionOf } from "@/lib/archive/guides";
import type { Language } from "@/lib/i18n/languages";
import { pageLanguage } from "@/lib/i18n/page";
import { BASE_PATH } from "@/lib/site";

// Long text lives in content/LOCALE/NAME.md, not in the message files. These
// files are ours, so the HTML is rendered as is.
// A page reads the text of its own language.
export async function readContent(name: string) {
  const language = await pageLanguage();
  const html = await rendered(name, language);
  // A translation keeps the English page's heading ids, heading by heading, so
  // a link to `#section` lands on the same section in every language.
  const ids =
    language === "en" ? undefined : headingIds(await rendered(name, "en"));
  return withBase(anchorHeadings(html, ids), language);
}

async function rendered(name: string, language: Language) {
  const file = path.join(process.cwd(), "content", language, `${name}.md`);
  return marked.parse(longGuideLinks(await readFile(file, "utf8")));
}

const HEADING = /<h([2-4])>(.*?)<\/h\1>/g;

// The ids the headings of an English page get, in order.
function headingIds(html: string) {
  return [...anchorHeadings(html).matchAll(/<h[2-4] id="([^"]*)">/g)].map(
    (found) => found[1],
  );
}

// A path of this site written into the HTML: Next.js prefixes only its own links,
// so a link of the text gets the section's prefix and the page's language here,
// and a picture the prefix alone.
function withBase(html: string, language: Language) {
  return html
    .replace(/href="\/(?!\/)/g, `href="${BASE_PATH}/${language}/`)
    .replace(/src="\/(?!\/)/g, `src="${BASE_PATH}/`);
}

// A section heading gets an id from its words, so a page can link to it; a
// translation passes the English page's ids, used in order.
function anchorHeadings(html: string, ids?: string[]) {
  const used = new Map<string, number>();
  let at = 0;
  return html.replace(HEADING, (_, level: string, inner: string) => {
    const given = ids?.[at++];
    if (given) {
      return `<h${level} id="${given}">${inner}</h${level}>`;
    }
    const base = inner
      .replace(/<[^>]+>/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    // A second heading of the same words gets `-2`, so every id is unique.
    const seen = (used.get(base) ?? 0) + 1;
    used.set(base, seen);
    const id = seen === 1 ? base : `${base}-${seen}`;
    return `<h${level} id="${id}">${inner}</h${level}>`;
  });
}

// The bold question that opens each guide, by its slug, for the lists of the
// guides; `folder` is `quests` for the pages of the Quests section.
export async function guideQuestions(slugs: string[], folder = "statistics") {
  const locale = await pageLanguage();
  const entries = await Promise.all(
    slugs.map(async (slug) => {
      const file = path.join(
        process.cwd(),
        "content",
        locale,
        folder,
        `${slug}.md`,
      );
      return [slug, questionOf(await readFile(file, "utf8"))] as const;
    }),
  );
  return Object.fromEntries(entries);
}
