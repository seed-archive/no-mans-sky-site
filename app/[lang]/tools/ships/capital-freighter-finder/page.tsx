import { CapitalFreighterFinder } from "@/components/archive/CapitalFreighterFinder";
import { Trail } from "@/components/archive/Trail";
import { readContent } from "@/lib/archive/content";
import { toolPath } from "@/lib/archive/paths";
import { toolTrail } from "@/lib/archive/trails";
import { localMetadata, requireTranslation } from "@/lib/i18n/page";

const SLUG = "capital-freighter-finder";
const PATH = toolPath(SLUG);

export function generateMetadata() {
  return localMetadata(PATH, {
    title:
      "No Man's Sky capital freighters: every capital freighter shape — Seed Archive",
    description:
      "Pick the hull, length, and parts of a No Man's Sky capital freighter and see the ship the game builds.",
  });
}

export default async function CapitalFreighterFinderPage() {
  const language = await requireTranslation(PATH);
  return (
    <>
      <Trail steps={toolTrail(language, SLUG)} />
      <CapitalFreighterFinder
        html={await readContent("capital-freighter-finder")}
      />
    </>
  );
}
