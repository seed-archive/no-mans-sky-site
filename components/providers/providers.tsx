"use client";

import { PropsWithChildren } from "react";
import type { NestedMessages } from "@seed-archive/ui/localization";
import { Providers as SharedProviders } from "@seed-archive/ui/providers";

import { ArchiveShell } from "@/components/archive/ArchiveShell";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { ReactQueryClientProvider } from "@/components/providers/ReactQueryClientProvider";
import { getBrowserSupabase } from "@/lib/db/supabase.browser";
import type { Language } from "@/lib/i18n/languages";

export interface ProvidersProps {
  language: Language;
  messages: NestedMessages;
}

export const Providers = (props: PropsWithChildren<ProvidersProps>) => {
  const { children, language, messages } = props;

  return (
    <ReactQueryClientProvider>
      <SharedProviders
        i18n={{ [language]: messages } as Record<Language, NestedMessages>}
        defaultLanguage={language}
        getSupabase={getBrowserSupabase}
        googleClientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
      >
        <LanguageProvider language={language}>
          <ArchiveShell>{children}</ArchiveShell>
        </LanguageProvider>
      </SharedProviders>
    </ReactQueryClientProvider>
  );
};
