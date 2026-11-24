import { StarshipFinder } from "@/components/archive/StarshipFinder";
import { Trail } from "@/components/archive/Trail";
import { readContent } from "@/lib/archive/content";
import { localMetadata, requireTranslation } from "@/lib/i18n/page";

const PATH = "/tools/starship-finder";
const TRAIL = [
  { name: "Home", href: "/" },
  { name: "Tools", href: "/tools" },
  { name: "Starships" },
];

export function generateMetadata() {
  return localMetadata(PATH, {
    title:
      "No Man's Sky starship builder: every shape of every ship type — Seed Archive",
    description:
      "Starships in No Man's Sky: put an exotic, a solar ship, a Fighter, a hauler, an explorer, or a shuttle together from its parts and see every shape the game makes, the rare squid included.",
  });
}

export default async function StarshipFinderPage() {
  await requireTranslation(PATH);
  return (
    <>
      <Trail steps={TRAIL} />
      <StarshipFinder html={await readContent("starship-finder")} />
    </>
  );
}
