import { LivingShipFinder } from "@/components/archive/LivingShipFinder";
import { Trail } from "@/components/archive/Trail";
import { readContent } from "@/lib/archive/content";
import { toolPath } from "@/lib/archive/paths";
import { toolTrail } from "@/lib/archive/trails";
import { localMetadata, requireTranslation } from "@/lib/i18n/page";

const SLUG = "living-ship-finder";
const PATH = toolPath(SLUG);

export function generateMetadata() {
  return localMetadata(PATH, {
    title:
      "No Man's Sky living ships: every shape of a living ship — Seed Archive",
    description:
      "Living ships in No Man's Sky: put a living ship together from its head, underside, wings, and parts, and see every shape the game makes.",
  });
}

export default async function LivingShipFinderPage() {
  const language = await requireTranslation(PATH);
  return (
    <>
      <Trail steps={toolTrail(language, SLUG)} />
      <LivingShipFinder html={await readContent("living-ship-finder")} />
    </>
  );
}
