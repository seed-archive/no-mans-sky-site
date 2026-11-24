import { LivingShipFinder } from "@/components/archive/LivingShipFinder";
import { Trail } from "@/components/archive/Trail";
import { readContent } from "@/lib/archive/content";
import { localMetadata, requireTranslation } from "@/lib/i18n/page";

const PATH = "/tools/living-ship-finder";
const TRAIL = [
  { name: "Home", href: "/" },
  { name: "Tools", href: "/tools" },
  { name: "Living ships" },
];

export function generateMetadata() {
  return localMetadata(PATH, {
    title:
      "No Man's Sky living ships: every shape of a living ship — Seed Archive",
    description:
      "Living ships in No Man's Sky: put a living ship together from its head, underside, wings, and parts, and see every shape the game makes.",
  });
}

export default async function LivingShipFinderPage() {
  await requireTranslation(PATH);
  return (
    <>
      <Trail steps={TRAIL} />
      <LivingShipFinder html={await readContent("living-ship-finder")} />
    </>
  );
}
