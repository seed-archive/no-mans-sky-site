"use client";

import { useCallback } from "react";
import { useIntl } from "react-intl";

// The names of a builder's groups and options, as the No Man's Sky generator
// writes them into `*-groups.json`, are English; the page shows each through
// the messages: a numbered name by its pattern (`part.numbered.<pattern>`), a
// count of sections by `part.sections`, any other by its English made a key
// (`part.name.<key>`). A name the messages lack, one of the game's own part
// codes (AccJ, SWC, WingJoint), prints as it is.
const NUMBERED =
  /^(Variant|Shape|Teeth|Jets|Left wing) (\d+)( accessory| wings| hull)?$/;
const SECTIONS = /^(\d+) sections?$/;

function keyOf(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "");
}

export function usePartText() {
  const intl = useIntl();
  return useCallback(
    (text: string) => {
      const sections = SECTIONS.exec(text);
      if (sections) {
        return intl.formatMessage(
          { id: "part.sections" },
          { n: Number(sections[1]) },
        );
      }
      const numbered = NUMBERED.exec(text);
      if (numbered) {
        return intl.formatMessage(
          { id: `part.numbered.${keyOf(numbered[1] + (numbered[3] ?? ""))}` },
          { n: numbered[2] },
        );
      }
      const id = `part.name.${keyOf(text)}`;
      return id in intl.messages ? intl.formatMessage({ id }) : text;
    },
    [intl],
  );
}
