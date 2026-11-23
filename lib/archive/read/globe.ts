import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/lib/db/supabase.types";

// A point the globe marks: a building with its latitude and longitude, and the
// item found there, which the marker opens.
export type GlobePoint = {
  lat: number;
  lon: number;
  title: string;
  href: string | null;
};

// A planet of the catalog with its points. `locator` is the folder of its six
// faces under /globe, written by the No Man's Sky generator.
export type GlobePlanet = {
  id: string;
  name: string;
  locator: string;
  points: GlobePoint[];
};

// Every planet of the catalog with the buildings on it that have a place, each
// with the item found there, if any.
export async function readGlobePlanets(
  supabase: SupabaseClient<Database>,
): Promise<GlobePlanet[]> {
  const planets = await supabase
    .from("assets")
    .select("id, name, locator")
    .eq("kind", "planet")
    .order("name");
  const buildings = await supabase
    .from("pois")
    .select(
      "id, building_type, latitude, longitude, assets!pois_id_fkey!inner(name, parent_id)",
    );
  const found = await supabase.from("poi_items").select("poi_id, item_id");
  for (const result of [planets, buildings, found]) {
    if (result.error) {
      throw result.error;
    }
  }
  const itemIds = (found.data ?? []).map((row) => row.item_id);
  const items = itemIds.length
    ? await supabase.from("assets").select("id, kind, name").in("id", itemIds)
    : { data: [], error: null };
  if (items.error) {
    throw items.error;
  }
  const itemOf = new Map((items.data ?? []).map((item) => [item.id, item]));
  const foundAt = new Map(
    (found.data ?? []).map((row) => [row.poi_id, itemOf.get(row.item_id)]),
  );
  const pointsOf = new Map<string, GlobePoint[]>();
  for (const building of buildings.data ?? []) {
    if (building.latitude === null || building.longitude === null) {
      continue;
    }
    const asset = building.assets as unknown as {
      name: string;
      parent_id: string | null;
    };
    if (!asset.parent_id) {
      continue;
    }
    const item = foundAt.get(building.id);
    const point: GlobePoint = {
      lat: building.latitude,
      lon: building.longitude,
      title: item ? `${item.name} (${asset.name})` : asset.name,
      href: item ? `/${item.kind}/${item.id}` : null,
    };
    pointsOf.set(asset.parent_id, [
      ...(pointsOf.get(asset.parent_id) ?? []),
      point,
    ]);
  }
  return (planets.data ?? [])
    .filter((planet) => planet.locator)
    .map((planet) => ({
      id: planet.id,
      name: planet.name,
      locator: planet.locator as string,
      points: pointsOf.get(planet.id) ?? [],
    }));
}
