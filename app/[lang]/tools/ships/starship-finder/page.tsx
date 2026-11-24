import { StarshipFinder } from "@/components/archive/StarshipFinder";
import { Trail } from "@/components/archive/Trail";
import { readContent } from "@/lib/archive/content";
import { toolPath } from "@/lib/archive/paths";
import { toolTrail } from "@/lib/archive/trails";
import { messageMetadata, requireTranslation } from "@/lib/i18n/page";

const SLUG = "starship-finder";
const PATH = toolPath(SLUG);

export function generateMetadata() {
  return messageMetadata(PATH, SLUG);
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
