import { LivingFrigateFinder } from "@/components/archive/LivingFrigateFinder";
import { Trail } from "@/components/archive/Trail";
import { readContent } from "@/lib/archive/content";
import { toolPath } from "@/lib/archive/paths";
import { toolTrail } from "@/lib/archive/trails";
import { messageMetadata, requireTranslation } from "@/lib/i18n/page";

const SLUG = "living-frigate-finder";
const PATH = toolPath(SLUG);

export function generateMetadata() {
  return messageMetadata(PATH, SLUG);
}

export default async function LivingFrigateFinderPage() {
  const language = await requireTranslation(PATH);
  return (
    <>
      <Trail steps={toolTrail(language, SLUG)} />
      <LivingFrigateFinder html={await readContent("living-frigate-finder")} />
    </>
  );
}
