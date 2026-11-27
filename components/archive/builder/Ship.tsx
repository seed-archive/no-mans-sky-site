import { useEffect, useMemo, useRef, useState } from "react";
import Box from "@mui/material/Box";
import { useIntl } from "react-intl";

import {
  buildStage,
  drawShip,
  paintTexture,
  type Stage,
} from "@/components/archive/builder/stage";
import type { Painted } from "@/lib/archive/builder/paint";
import type { ShipModule } from "@/lib/archive/builder/ship";
import {
  NOT_A_GROUP,
  branchOf,
  layersOf,
  type Assignment,
  type Parts,
  type TreeCore,
} from "@/lib/archive/builder/tree";

// The ship of the walk; a click on a part opens its group.
export function Ship(props: {
  ship: ShipModule;
  parts: Parts;
  core: TreeCore;
  assignment: Assignment;
  active: string;
  painted: Painted | null;
  onSelect: (group: string) => void;
  // A part or paint picture that failed to load.
  onFail: () => void;
}) {
  const { ship, parts, core, assignment, active, painted, onSelect, onFail } =
    props;
  const { folder } = ship;
  const intl = useIntl();
  const canvas = useRef<HTMLCanvasElement>(null);
  const [stage, setStage] = useState<Stage | null>(null);
  const [hover, setHover] = useState(NOT_A_GROUP);
  const [texture, setTexture] = useState<ImageData | null>(null);
  const [tone, setTone] = useState<ImageData | null>(null);
  const activeIndex = core.groups.findIndex((row) => row.id === active);
  // The last paint stays until the next one is made.
  const shown = painted === null ? null : texture;
  // The open group lights up; where it draws nothing of its own on this ship, as
  // the Plated upper wings of a Pod, whose wings belong to the group under it,
  // the groups that hang on it light up instead.
  const lit = useMemo(() => {
    if (!stage || stage.group.includes(activeIndex)) {
      return new Set([activeIndex]);
    }
    return branchOf(core, core.groups[activeIndex]);
  }, [core, stage, activeIndex]);

  useEffect(() => {
    if (!ship.paint) {
      return;
    }
    void paintTexture(folder, ship.paint.tone).then(setTone).catch(onFail);
  }, [folder, ship.paint, onFail]);

  useEffect(() => {
    let current = true;
    void buildStage(ship, parts, layersOf(ship, core, assignment))
      .then((built) => {
        if (current) {
          setStage(built);
        }
      })
      .catch(onFail);
    return () => {
      current = false;
    };
  }, [folder, ship, parts, core, assignment, onFail]);

  useEffect(() => {
    if (painted === null) {
      return;
    }
    let current = true;
    void paintTexture(folder, painted)
      .then((image) => {
        if (current) {
          setTexture(image);
        }
      })
      .catch(onFail);
    return () => {
      current = false;
    };
  }, [folder, painted, onFail]);

  useEffect(() => {
    if (canvas.current && stage) {
      drawShip(canvas.current, stage, lit, hover, shown, tone, ship.bare);
    }
  }, [stage, lit, hover, shown, tone, ship.bare]);

  const groupAt = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!stage) {
      return NOT_A_GROUP;
    }
    const box = event.currentTarget.getBoundingClientRect();
    const x = Math.floor(
      ((event.clientX - box.left) / box.width) * stage.width,
    );
    const y = Math.floor(
      ((event.clientY - box.top) / box.height) * stage.height,
    );
    return stage.group[y * stage.width + x] ?? NOT_A_GROUP;
  };

  return (
    <Box
      component="canvas"
      ref={canvas}
      width={parts.width}
      height={parts.height}
      aria-label={intl.formatMessage({ id: ship.label })}
      onClick={(event: React.MouseEvent<HTMLCanvasElement>) => {
        const group = groupAt(event);
        if (group >= 0) {
          onSelect(core.groups[group].id);
        }
      }}
      onMouseMove={(event: React.MouseEvent<HTMLCanvasElement>) => {
        setHover(Math.max(groupAt(event), NOT_A_GROUP));
      }}
      onMouseLeave={() => setHover(NOT_A_GROUP)}
      sx={{
        display: "block",
        width: "100%",
        height: "auto",
        cursor: hover >= 0 ? "pointer" : "default",
      }}
    />
  );
}
