import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Manrope } from "next/font/google";
import localFont from "next/font/local";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import { SharedAnalytics } from "@seed-archive/ui/analytics";

import { Providers } from "@/components/providers/providers";
import { LanguageNotice } from "@/components/archive/LanguageNotice";
import { messagesOf, noticeTexts } from "@/lib/i18n";
import { DEFAULT_LANGUAGE, isLanguage, LANGUAGES } from "@/lib/i18n/languages";
import { messageOf } from "@/lib/i18n/messages";
import { menuMessages } from "@/lib/i18n/statistics";
import { BASE_PATH, SHARED_ANALYTICS } from "@/lib/site";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-manrope",
});

// Portal glyphs: the characters 0-9 and A-F draw the sixteen glyphs.
const glyphs = localFont({
  src: "../../public/fonts/NMS-Glyphs-Mono.ttf",
  display: "block",
  variable: "--font-glyphs",
});

export async function generateMetadata(
  props: LayoutProps<"/[lang]">,
): Promise<Metadata> {
  const { lang } = await props.params;
  const language = isLanguage(lang) ? lang : DEFAULT_LANGUAGE;
  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_BASE_URL ?? `http://localhost:5010${BASE_PATH}`,
    ),
    title: messageOf(language, "meta.site.title"),
    description: messageOf(language, "meta.site.description"),
    openGraph: {
      siteName: messageOf(language, "archive.title"),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
    },
    verification: {
      google: "5bJVHey_Y1j3CNcU_hjDHzvmgn248Hw1bSvkQxQiJ6g",
    },
  };
}

// Every language is built ahead; any other code never reaches a page (D20: 404).
export const dynamicParams = false;

export function generateStaticParams() {
  return LANGUAGES.map((lang) => ({ lang }));
}

export default async function RootLayout(props: LayoutProps<"/[lang]">) {
  const { children, params } = props;
  const { lang } = await params;
  if (!isLanguage(lang)) {
    notFound();
  }
  const messages = {
    ...(await messagesOf(lang)),
    ...menuMessages(lang),
  };

  return (
    <html
      lang={lang}
      className={`${manrope.variable} ${glyphs.variable}`}
      suppressHydrationWarning
    >
      <body>
        <InitColorSchemeScript attribute="class" />
        <Providers language={lang} messages={messages}>
          {children}
          <LanguageNotice texts={await noticeTexts()} />
        </Providers>
        <SharedAnalytics basePath={BASE_PATH} endpoint={SHARED_ANALYTICS} />
      </body>
    </html>
  );
}
