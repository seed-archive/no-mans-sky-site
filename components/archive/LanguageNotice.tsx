"use client";

import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import { LANGUAGE_KEY } from "@seed-archive/ui/language-switcher";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { isLanguage, type Language, localPath } from "@/lib/i18n/languages";
import { translationsOf } from "@/lib/i18n/translations";

export type NoticeTexts = Record<
  Language,
  { text: string; open: string; stay: string }
>;

// The reader's own choice of language is kept under LANGUAGE_KEY for the whole
// of Seed Archive: one origin, so the portal and every game read the same key
// (D20), and the header's switcher writes it too.
const CHOICE = LANGUAGE_KEY;

function storedChoice(): string | null {
  try {
    return localStorage.getItem(CHOICE);
  } catch {
    // No storage: the notice is not shown, so it never nags on every page.
    return "";
  }
}

function remember(language: Language) {
  try {
    localStorage.setItem(CHOICE, language);
  } catch {
    // The choice is not kept; the notice may come back on the next page.
  }
}

// The first language the browser asks for that this page has, other than the
// one it is in.
function offered(path: string, current: Language): Language | undefined {
  const has = translationsOf(path);
  for (const tag of navigator.languages) {
    const code = tag.slice(0, 2).toLowerCase();
    if (isLanguage(code)) {
      return code !== current && has.includes(code) ? code : undefined;
    }
  }
  return undefined;
}

// The browser's language never redirects (D20): when it asks for a language the
// page has, this notice offers that version, in that language, once; the
// reader's answer, either way, is kept.
export function LanguageNotice(props: { texts: NoticeTexts }) {
  const { texts } = props;
  const current = useLanguage();
  const pathname = usePathname();
  const router = useRouter();
  const [offer, setOffer] = useState<Language>();
  // The path without the language: `/ru/guides` → `/guides`.
  const path = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, "") || "/";

  useEffect(() => {
    // Read after the first paint: the server knows neither the storage nor
    // the browser's languages.
    const choice = storedChoice();
    const next = choice === null ? offered(path, current) : undefined;
    queueMicrotask(() => setOffer(next));
  }, [path, current]);

  if (!offer) {
    return null;
  }
  const words = texts[offer];
  return (
    <Snackbar open anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
      <Alert severity="info" lang={offer}>
        {words.text}
        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              remember(offer);
              setOffer(undefined);
              router.push(localPath(offer, path));
            }}
          >
            {words.open}
          </Button>
          <Button
            color="inherit"
            size="small"
            onClick={() => {
              remember(current);
              setOffer(undefined);
            }}
          >
            {words.stay}
          </Button>
        </Stack>
      </Alert>
    </Snackbar>
  );
}
