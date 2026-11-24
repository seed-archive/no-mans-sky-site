import { PlanetGlobe } from "@/components/archive/PlanetGlobe";
import { Trail } from "@/components/archive/Trail";
import { readContent } from "@/lib/archive/content";
import { readGlobePlanets } from "@/lib/archive/read/globe";
import { createArchiveClient } from "@/lib/db/supabase.server";
import { localMetadata, requireTranslation } from "@/lib/i18n/page";

const PATH = "/tools/planet-globe";
const TRAIL = [
  { name: "Home", href: "/" },
  { name: "Tools", href: "/tools" },
  { name: "Planet globe" },
];

export function generateMetadata() {
  return localMetadata(PATH, {
    title:
      "No Man's Sky planet globe: land, sea, and what stands where — Seed Archive",
    description:
      "Turn a No Man's Sky planet of the catalog as a globe: its land and seas in the planet's own colours, its mountains, and the buildings, multitools, and crashed ships on it.",
  });
}

export default async function PlanetGlobePage(props: {
  searchParams: Promise<{ planet?: string }>;
}) {
  await requireTranslation(PATH);
  const { planet } = await props.searchParams;
  const supabase = await createArchiveClient();
  const planets = supabase ? await readGlobePlanets(supabase) : [];
  return (
    <>
      <Trail steps={TRAIL} />
      <PlanetGlobe
        html={await readContent("planet-globe")}
        planets={planets}
        planet={planet ?? null}
      />
    </>
  );
}
