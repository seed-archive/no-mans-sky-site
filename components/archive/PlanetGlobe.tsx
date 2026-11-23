"use client";

import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import type { GlobeClient } from "@seed-archive/globe/client";
import type { GlobeMarker } from "@seed-archive/globe/globe";

import { Article } from "@/components/archive/Article";
import type { GlobePlanet } from "@/lib/archive/read/globe";
import { BASE_PATH } from "@/lib/site";

// three.js is large and only this page needs it: it loads with the globe.
const Globe = dynamic(() => import("@seed-archive/globe/globe"), {
  ssr: false,
});

// Space behind the globe, as the ship renders have it.
const SPACE = "#161a20";
// A point the globe marks; one with an item found there is drawn brighter.
const DOT = { radius: 5, fill: "#f2c94c" };
const DOT_BARE = { radius: 4, fill: "#c9d1d9" };
// The ground a pixel covers at the closest view, metres: agreed with the map session for now (the generator's
// docs/planet/globe.md), the terrain having detail of metres.
const CLOSEST_PIXEL = 16;
// The package's tile, pixels a side.
const TILE = 256;

// How deep the globe splits a face for a planet of `radius` metres: a face spans about a quarter of its
// circumference, and depth d cuts it into 2^d tiles of `TILE` pixels.
function maxDepth(radius: number) {
  const face = (radius * Math.PI) / 2;
  return Math.max(0, Math.ceil(Math.log2(face / (TILE * CLOSEST_PIXEL))));
}

// The generator, built to WebAssembly, computing the planet in the visitor's workers; made in the browser only.
function useGlobeClient() {
  const [client, setClient] = useState<GlobeClient | null>(null);
  useEffect(() => {
    let made: GlobeClient | null = null;
    let live = true;
    void import("@seed-archive/globe/client").then(({ GlobeClient }) => {
      if (live) {
        made = new GlobeClient(
          new URL(`${BASE_PATH}/wasm/globe.js`, location.href).href,
        );
        setClient(made);
      }
    });
    return () => {
      live = false;
      made?.close();
    };
  }, []);
  return client;
}

// What the page asks once a planet: its 256 colours and its radius, for the depth.
type Planet = { seed: string; palette: Uint8ClampedArray; maxDepth: number };

function usePlanet(client: GlobeClient | null, seed: string | null) {
  const [planet, setPlanet] = useState<Planet | null>(null);
  useEffect(() => {
    if (!client || !seed) {
      return;
    }
    let live = true;
    void Promise.all([
      client.palette(seed),
      client.call<number>("planetRadius", [seed]),
    ]).then(([palette, radius]) => {
      if (live) {
        setPlanet({ seed, palette, maxDepth: maxDepth(radius) });
      }
    });
    return () => {
      live = false;
    };
  }, [client, seed]);
  return planet?.seed === seed ? planet : null;
}

type PointMarker = GlobeMarker & { href: string | null };

// The globe of one planet of the catalog, picked from a list; the pick lives in
// the address (`?planet=`), so a planet's page links to its globe.
function Finder(props: { planets: GlobePlanet[]; planet: string | null }) {
  const { planets } = props;
  const router = useRouter();
  const intl = useIntl();
  const planet =
    planets.find((one) => one.id === props.planet) ?? planets[0] ?? null;
  const client = useGlobeClient();
  const seed = planet?.locator ?? null;
  const asked = usePlanet(client, seed);
  const surface = useMemo(
    () =>
      client && asked
        ? {
            kind: "tiles" as const,
            client,
            seed: asked.seed,
            palette: asked.palette,
            maxDepth: asked.maxDepth,
          }
        : null,
    [client, asked],
  );
  const markers = useMemo<PointMarker[]>(
    () =>
      (planet?.points ?? []).map((point) => ({
        layer: "points",
        lat: point.lat,
        lon: point.lon,
        title: point.title,
        dot: point.href ? DOT : DOT_BARE,
        href: point.href,
      })),
    [planet],
  );
  return (
    <Stack spacing={2}>
      <Autocomplete
        options={planets}
        value={planet}
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        disableClearable
        onChange={(_event, value) =>
          router.replace(`/tools/planet-globe?planet=${value.id}`, {
            scroll: false,
          })
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label={intl.formatMessage({ id: "archive.globePlanet" })}
          />
        )}
      />
      <Box
        sx={{
          height: { xs: 360, sm: 520 },
          borderRadius: 1,
          overflow: "hidden",
        }}
      >
        {surface ? (
          <Globe
            surface={surface}
            background={SPACE}
            markers={markers}
            onMarkerClick={(marker) => {
              const href = (marker as PointMarker).href;
              if (href) {
                router.push(href);
              }
            }}
          />
        ) : null}
      </Box>
      <Typography variant="body2" color="text.secondary">
        <FormattedMessage id="archive.globeNote" />
      </Typography>
    </Stack>
  );
}

export function PlanetGlobe(props: {
  html: string;
  planets: GlobePlanet[];
  planet: string | null;
}) {
  const { planets, planet } = props;
  return (
    <Article
      html={props.html}
      widgets={{ finder: () => <Finder planets={planets} planet={planet} /> }}
    />
  );
}
