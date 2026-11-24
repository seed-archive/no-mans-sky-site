import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CatalogScreen } from "@/components/archive/CatalogScreen";
import { Trail } from "@/components/archive/Trail";
import { CATALOG_PAGES, isKind } from "@/lib/archive/kinds";
import { kindPath } from "@/lib/archive/paths";
import { catalogKey, parseCatalogQuery } from "@/lib/archive/query";
import { readCatalog } from "@/lib/archive/read";
import { kindTrail } from "@/lib/archive/trails";
import { createArchiveClient } from "@/lib/db/supabase.server";
import { DEFAULT_LANGUAGE } from "@/lib/i18n/languages";
import { messageOf } from "@/lib/i18n/messages";
import {
  localMetadata,
  pageLanguage,
  requireTranslation,
} from "@/lib/i18n/page";
import { getQueryClient } from "@/lib/query-client";

type Search = Record<string, string | string[] | undefined>;

// English keeps the words players search (`CATALOG_PAGES`); the other
// languages, noindex (`indexing.ts`), name the list and what it holds.
export async function generateMetadata(props: {
  params: Promise<{ kind: string }>;
}): Promise<Metadata> {
  const { kind } = await props.params;
  if (!isKind(kind)) {
    return {};
  }
  const language = await pageLanguage();
  const page =
    language === DEFAULT_LANGUAGE
      ? CATALOG_PAGES[kind]
      : {
          title: messageOf(language, `kinds.${kind}`),
          description: messageOf(language, `kindLine.${kind}`),
        };
  return localMetadata(kindPath(kind), {
    title: `${page.title} — Seed Archive`,
    description: page.description,
  });
}

export default async function KindPage(props: {
  params: Promise<{ kind: string }>;
  searchParams: Promise<Search>;
}) {
  const { kind: kindParam } = await props.params;
  if (!isKind(kindParam)) {
    notFound();
  }
  const language = await requireTranslation(kindPath(kindParam));
  const raw = await props.searchParams;
  const query = parseCatalogQuery([kindParam], raw);
  const queryClient = getQueryClient();
  const supabase = await createArchiveClient();
  if (supabase) {
    await queryClient.prefetchQuery({
      queryKey: catalogKey(query),
      queryFn: () => readCatalog(supabase, query),
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Trail steps={kindTrail(language, kindParam)} />
      <CatalogScreen pathname={kindPath(kindParam)} query={query} heading />
    </HydrationBoundary>
  );
}
