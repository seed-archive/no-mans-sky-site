"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useIntl } from "react-intl";
import { BASE_PATH } from "@/lib/site";

// A ship drawn whole from the game's own model files, on a dark ground in both
// themes, as space is. Width and height are set so the page does not jump; the
// picture's text and caption are the messages `render.<ship>.alt` and
// `render.<ship>.caption`.
const RENDERS = {
  dreadnought: { src: "/render/dreadnought.webp", width: 1600, height: 816 },
  dreadnoughtShields: {
    src: "/render/dreadnought-shields.webp",
    width: 1600,
    height: 840,
  },
  dreadnoughtEngines: {
    src: "/render/dreadnought-engines.webp",
    width: 1600,
    height: 1216,
  },
  dreadnoughtCannons: {
    src: "/render/dreadnought-cannons.webp",
    width: 1600,
    height: 840,
  },
  sentinel: { src: "/render/sentinel.webp", width: 1600, height: 744 },
  sentinelShields: {
    src: "/render/sentinel-shields.webp",
    width: 1600,
    height: 1424,
  },
} as const;

export function ShipRender(props: { ship: keyof typeof RENDERS }) {
  const intl = useIntl();
  const render = RENDERS[props.ship];
  const text = (part: string) =>
    intl.formatMessage({ id: `render.${props.ship}.${part}` });
  return (
    <Box component="figure" sx={{ m: 0 }}>
      <Box
        sx={{
          borderRadius: 1,
          overflow: "hidden",
          background:
            "radial-gradient(ellipse at 50% 40%, #3b4452 0%, #1f242c 70%, #161a20 100%)",
          p: { xs: 1, sm: 2 },
        }}
      >
        <Box
          component="img"
          src={`${BASE_PATH}${render.src}`}
          alt={text("alt")}
          width={render.width}
          height={render.height}
          loading={
            props.ship === "dreadnought" || props.ship === "sentinel"
              ? "eager"
              : "lazy"
          }
          decoding="async"
          sx={{ display: "block", width: "100%", height: "auto" }}
        />
      </Box>
      <Typography
        component="figcaption"
        variant="caption"
        color="text.secondary"
        sx={{ display: "block", mt: 0.75 }}
      >
        {text("caption")}
      </Typography>
    </Box>
  );
}

export function DreadnoughtRender() {
  return <ShipRender ship="dreadnought" />;
}

export function DreadnoughtShields() {
  return <ShipRender ship="dreadnoughtShields" />;
}

export function DreadnoughtEngines() {
  return <ShipRender ship="dreadnoughtEngines" />;
}

export function DreadnoughtCannons() {
  return <ShipRender ship="dreadnoughtCannons" />;
}

export function SentinelRender() {
  return <ShipRender ship="sentinel" />;
}

export function SentinelShields() {
  return <ShipRender ship="sentinelShields" />;
}
