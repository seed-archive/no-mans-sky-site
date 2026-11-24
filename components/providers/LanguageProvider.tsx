"use client";

import { useRouter } from "next/navigation";
import { createContext, PropsWithChildren, useContext } from "react";

import {
  DEFAULT_LANGUAGE,
  type Language,
  localPath,
} from "@/lib/i18n/languages";

type NavigateOptions = Parameters<ReturnType<typeof useRouter>["push"]>[1];

const LanguageContext = createContext<Language>(DEFAULT_LANGUAGE);

export function LanguageProvider(
  props: PropsWithChildren<{ language: Language }>,
) {
  const { children, language } = props;
  return (
    <LanguageContext.Provider value={language}>
      {children}
    </LanguageContext.Provider>
  );
}

// The page's language, from its address.
export function useLanguage() {
  return useContext(LanguageContext);
}

// A path of this section in the page's language: `/guides` → `/ru/guides`.
export function useLocalPath() {
  const language = useLanguage();
  return (path: string) => localPath(language, path);
}

// The router, with every path it opens kept in the page's language.
export function useLocalRouter() {
  const router = useRouter();
  const local = useLocalPath();
  return {
    push: (path: string, options?: NavigateOptions) =>
      router.push(local(path), options),
    replace: (path: string, options?: NavigateOptions) =>
      router.replace(local(path), options),
  };
}
