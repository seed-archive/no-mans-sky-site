import type { Metadata } from "next";

import { IndexList } from "@/components/archive/IndexList";
import { Trail } from "@/components/archive/Trail";
import { PAGE_KINDS } from "@/lib/archive/kinds";
import { databasePath, kindPath } from "@/lib/archive/paths";
import { databaseTrail } from "@/lib/archive/trails";
import { messageOf } from "@/lib/i18n/messages";
import {
  localMetadata,
  pageLanguage,
  requireTranslation,
} from "@/lib/i18n/page";

// The Database's own page (the owner, 2026-11-24): every list, a line each of
// what it holds; its title and heading are the menu's label.

export async function generateMetadata(): Promise<Metadata> {
  const language = await pageLanguage();
  return localMetadata(databasePath(), {
    title: `${messageOf(language, "archive.browse")} — Seed Archive`,
    description: PAGE_KINDS.map((kind) =>
      messageOf(language, `kindLine.${kind}`),
    ).join(" "),
  });
}

export default async function DatabasePage() {
  const language = await requireTranslation(databasePath());
  return (
    <>
      <Trail steps={databaseTrail(language)} />
      <IndexList
        title="archive.browse"
        entries={PAGE_KINDS.map((kind) => ({
          href: kindPath(kind),
          label: `kinds.${kind}`,
          line: `kindLine.${kind}`,
        }))}
      />
    </>
  );
}
