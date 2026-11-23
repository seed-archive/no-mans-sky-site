import type { Metadata } from "next";
import { PageTrail } from "@seed-archive/ui/page-trail";

import { PlanetGlobe } from "@/components/archive/PlanetGlobe";
import { StructuredData } from "@/components/archive/StructuredData";
import { readContent } from "@/lib/archive/content";
import { readGlobePlanets } from "@/lib/archive/read/globe";
import { trailData } from "@/lib/archive/trail";
import { createArchiveClient } from "@/lib/db/supabase.server";

const TRAIL = [
  { name: "Home", href: "/" },
  { name: "Tools", href: "/tools" },
  { name: "Planet globe" },
];

export const metadata: Metadata = {
  title:
    "No Man's Sky planet globe: land, sea, and what stands where — Seed Archive",
  alternates: { canonical: "/tools/planet-globe" },
  description:
    "Turn a No Man's Sky planet of the catalog as a globe: its land and seas in the planet's own colours, its mountains, and the buildings, multitools, and crashed ships on it.",
};

export default async function PlanetGlobePage(props: {
  searchParams: Promise<{ planet?: string }>;
}) {
  const { planet } = await props.searchParams;
  const supabase = await createArchiveClient();
  const planets = supabase ? await readGlobePlanets(supabase) : [];
  return (
    <>
      <StructuredData data={trailData(TRAIL)} />
      <PageTrail steps={TRAIL} />
      <PlanetGlobe
        html={await readContent("planet-globe")}
        planets={planets}
        planet={planet ?? null}
      />
    </>
  );
}
