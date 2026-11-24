import { PlanetGlobe } from "@/components/archive/PlanetGlobe";
import { Trail } from "@/components/archive/Trail";
import { readContent } from "@/lib/archive/content";
import { readGlobePlanets } from "@/lib/archive/read/globe";
import { createArchiveClient } from "@/lib/db/supabase.server";
import { toolPath } from "@/lib/archive/paths";
import { toolTrail } from "@/lib/archive/trails";
import { localMetadata, requireTranslation } from "@/lib/i18n/page";

const SLUG = "planet-globe";
const PATH = toolPath(SLUG);

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
  const language = await requireTranslation(PATH);
  const { planet } = await props.searchParams;
  const supabase = await createArchiveClient();
  const planets = supabase ? await readGlobePlanets(supabase) : [];
  return (
    <>
      <Trail steps={toolTrail(language, SLUG)} />
      <PlanetGlobe
        html={await readContent("planet-globe")}
        planets={planets}
        planet={planet ?? null}
      />
    </>
  );
}
