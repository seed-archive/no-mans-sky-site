import { LuckCalculator } from "@/components/archive/LuckCalculator";
import { Trail } from "@/components/archive/Trail";
import { readContent } from "@/lib/archive/content";
import { toolPath } from "@/lib/archive/paths";
import { toolTrail } from "@/lib/archive/trails";
import { localMetadata, requireTranslation } from "@/lib/i18n/page";

const SLUG = "how-lucky-am-i";
const PATH = toolPath(SLUG);

export function generateMetadata() {
  return localMetadata(PATH, {
    title:
      "How lucky am I? Rate your No Man's Sky multitool or ship — Seed Archive",
    description:
      "Enter a No Man's Sky multitool, staff, or claimed ship, with its supercharged slots and stats, and see how it ranks from 0 to 100.",
  });
}

export default async function HowLuckyPage(props: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const language = await requireTranslation(PATH);
  const { tab } = await props.searchParams;
  return (
    <>
      <Trail steps={toolTrail(language, SLUG)} />
      <LuckCalculator html={await readContent("how-lucky-am-i")} tab={tab} />
    </>
  );
}
