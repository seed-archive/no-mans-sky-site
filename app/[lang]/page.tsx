import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import { HomeScreen } from "@/components/archive/HomeScreen";
import { readContent } from "@/lib/archive/content";
import { readFeed, type FeedSection } from "@/lib/archive/read";
import { createArchiveClient } from "@/lib/db/supabase.server";
import { localMetadata, requireTranslation } from "@/lib/i18n/page";
import { getQueryClient } from "@/lib/query-client";

const PATH = "/";

export function generateMetadata() {
  return localMetadata(PATH, {
    title: "Best items in No Man's Sky and where to find them — Seed Archive",
    description:
      "How to get the best item in No Man's Sky: multitools and crashed ships with four adjacent supercharged slots and all-S creatures, with portal glyphs, plus guides to where each one comes from.",
  });
}

export default async function Page() {
  await requireTranslation(PATH);
  const queryClient = getQueryClient();
  const supabase = await createArchiveClient();
  const sections: FeedSection[] = ["galaxies", "top"];
  if (supabase) {
    await Promise.all(
      sections.map((section) =>
        queryClient.prefetchQuery({
          queryKey: ["feed", section],
          queryFn: () => readFeed(supabase, section),
        }),
      ),
    );
  }

  const confession = await readContent("confession");

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomeScreen confession={confession} />
    </HydrationBoundary>
  );
}
