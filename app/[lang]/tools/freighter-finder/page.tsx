import { RegularFreighterFinder } from "@/components/archive/RegularFreighterFinder";
import { Trail } from "@/components/archive/Trail";
import { readContent } from "@/lib/archive/content";
import { localMetadata, requireTranslation } from "@/lib/i18n/page";

const PATH = "/tools/freighter-finder";
const TRAIL = [
  { name: "Home", href: "/" },
  { name: "Tools", href: "/tools" },
  { name: "Regular freighters" },
];

export function generateMetadata() {
  return localMetadata(PATH, {
    title:
      "No Man's Sky regular freighters: every shape of a regular freighter — Seed Archive",
    description:
      "Regular freighters in No Man's Sky: put a regular freighter together from its hull, length, and parts, and see every shape the game makes. Fleets bring each shape to any system.",
  });
}

export default async function FreighterFinderPage() {
  await requireTranslation(PATH);
  return (
    <>
      <Trail steps={TRAIL} />
      <RegularFreighterFinder html={await readContent("freighter-finder")} />
    </>
  );
}
