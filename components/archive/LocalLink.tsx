"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";

import { useLocalPath } from "@/components/providers/LanguageProvider";

// next/link that keeps the page's language: a path of this section, written
// without a language (`/guides/…`), leads to the same page in the language the
// reader is on. A hash, a query alone, or an outside address stays as it is.
export default function LocalLink(props: ComponentProps<typeof NextLink>) {
  const { href, ...rest } = props;
  const localPath = useLocalPath();
  const local =
    typeof href === "string" && href.startsWith("/") && !href.startsWith("//")
      ? localPath(href)
      : href;
  return <NextLink href={local} {...rest} />;
}
