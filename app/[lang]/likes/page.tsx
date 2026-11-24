import { LikesScreen } from "@/components/archive/LikesScreen";
import { parseCatalogQuery } from "@/lib/archive/query";
import { requireTranslation } from "@/lib/i18n/page";

type Search = Record<string, string | string[] | undefined>;

export default async function LikesPage(props: {
  searchParams: Promise<Search>;
}) {
  await requireTranslation("/likes");
  const query = parseCatalogQuery(
    ["tool", "creature", "ship"],
    await props.searchParams,
  );
  return <LikesScreen query={query} />;
}
