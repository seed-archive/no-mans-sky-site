import { RegularFreighterFinder } from "@/components/archive/RegularFreighterFinder";
import { Trail } from "@/components/archive/Trail";
import { readContent } from "@/lib/archive/content";
import { toolPath } from "@/lib/archive/paths";
import { toolTrail } from "@/lib/archive/trails";
import { messageMetadata, requireTranslation } from "@/lib/i18n/page";

const SLUG = "freighter-finder";
const PATH = toolPath(SLUG);

export function generateMetadata() {
  return messageMetadata(PATH, SLUG);
}

export default async function FreighterFinderPage() {
  const language = await requireTranslation(PATH);
  return (
    <>
      <Trail steps={toolTrail(language, SLUG)} />
      <RegularFreighterFinder html={await readContent("freighter-finder")} />
    </>
  );
}
