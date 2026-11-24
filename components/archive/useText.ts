"use client";

import { useIntl } from "react-intl";

// A text of the guides menu: `statistics-menu.json` holds keys, and the layout
// puts their text into the messages (`menuMessages`); a string that is no
// message, such as a title a page passes itself, prints as it is.
export function useText() {
  const intl = useIntl();
  return (text: string) =>
    text in intl.messages ? intl.formatMessage({ id: text }) : text;
}
