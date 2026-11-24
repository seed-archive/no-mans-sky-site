import { AboutScreen } from "@/components/archive/AboutScreen";
import { fillNumbers } from "@/lib/archive/about";
import { readContent } from "@/lib/archive/content";
import { localMetadata, requireTranslation } from "@/lib/i18n/page";

const PATH = "/about";

export function generateMetadata() {
  return localMetadata(PATH, {
    title:
      "How the best multitool is found: adjacent supercharged slots — Seed Archive",
    description:
      "How a galaxy of trillions of stars narrows to a short list of multitools and crashed ships per system, and why four adjacent supercharged slots matter most.",
  });
}

export default async function AboutPage() {
  const language = await requireTranslation(PATH);
  return (
    <AboutScreen html={fillNumbers(await readContent("about"), language)} />
  );
}
