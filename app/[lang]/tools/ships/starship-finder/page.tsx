import { StarshipFinder } from "@/components/archive/StarshipFinder";
import { Trail } from "@/components/archive/Trail";
import { readContent } from "@/lib/archive/content";
import { toolPath } from "@/lib/archive/paths";
import { toolTrail } from "@/lib/archive/trails";
import { localMetadata, requireTranslation } from "@/lib/i18n/page";

const SLUG = "starship-finder";
const PATH = toolPath(SLUG);

export function generateMetadata() {
  return localMetadata(PATH, {
    title:
      "No Man's Sky starship builder: every shape of every ship type — Seed Archive",
    description:
      "Starships in No Man's Sky: put an exotic, a solar ship, a Fighter, a hauler, an explorer, or a shuttle together from its parts and see every shape the game makes, the rare squid included.",
  });
}

export default async function StarshipFinderPage() {
  const language = await requireTranslation(PATH);
  return (
    <>
      <Trail steps={toolTrail(language, SLUG)} />
      <StarshipFinder html={await readContent("starship-finder")} />
    </>
  );
}
