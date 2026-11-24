import { LivingFrigateFinder } from "@/components/archive/LivingFrigateFinder";
import { Trail } from "@/components/archive/Trail";
import { readContent } from "@/lib/archive/content";
import { localMetadata, requireTranslation } from "@/lib/i18n/page";

const PATH = "/tools/living-frigate-finder";
const TRAIL = [
  { name: "Home", href: "/" },
  { name: "Tools", href: "/tools" },
  { name: "Living frigates" },
];

export function generateMetadata() {
  return localMetadata(PATH, {
    title:
      "No Man's Sky living frigates: every shape of an organic frigate — Seed Archive",
    description:
      "Living frigates in No Man's Sky: put a cosmic whale together from its front accessory, tail, wings, and side parts, and see every shape the game makes.",
  });
}

export default async function LivingFrigateFinderPage() {
  await requireTranslation(PATH);
  return (
    <>
      <Trail steps={TRAIL} />
      <LivingFrigateFinder html={await readContent("living-frigate-finder")} />
    </>
  );
}
