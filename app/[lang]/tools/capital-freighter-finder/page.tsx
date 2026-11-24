import { CapitalFreighterFinder } from "@/components/archive/CapitalFreighterFinder";
import { Trail } from "@/components/archive/Trail";
import { readContent } from "@/lib/archive/content";
import { localMetadata, requireTranslation } from "@/lib/i18n/page";

const PATH = "/tools/capital-freighter-finder";
const TRAIL = [
  { name: "Home", href: "/" },
  { name: "Tools", href: "/tools" },
  { name: "Capital freighters" },
];

export function generateMetadata() {
  return localMetadata(PATH, {
    title:
      "No Man's Sky capital freighters: every capital freighter shape — Seed Archive",
    description:
      "Pick the hull, length, and parts of a No Man's Sky capital freighter and see the ship the game builds.",
  });
}

export default async function CapitalFreighterFinderPage() {
  await requireTranslation(PATH);
  return (
    <>
      <Trail steps={TRAIL} />
      <CapitalFreighterFinder
        html={await readContent("capital-freighter-finder")}
      />
    </>
  );
}
