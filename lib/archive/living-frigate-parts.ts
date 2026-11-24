import groups from "@/lib/archive/living-frigate-groups.json";
import type { PartGroup } from "@/lib/archive/builder/parts";
import type { ShipModule } from "@/lib/archive/builder/ship";
import { BASE_PATH } from "@/lib/site";

// The living frigate, the whale of the Dream Aerial, on /tools/ships/organic-frigate-finder, a
// builder. The groups are the choices of the game's own tree of living frigate
// parts, written by the No Man's Sky generator: one hull with five lists, the front
// accessory, the tail, the wings, the side detail, and the front wings. Its
// colours come from procedural textures that are not read, so the ship is grey.
export const LIVING_FRIGATE: ShipModule = {
  kind: "living-frigate",
  // Written by the No Man's Sky generator.
  folder: `${BASE_PATH}/living-frigate`,
  format: "grey",
  groups: groups as PartGroup[],
  always: [],
  label: "archive.livingFrigateShip",
};
