import type { MetadataRoute } from "next";

import { LANGUAGES } from "@/lib/i18n/languages";
import { BASE_PATH } from "@/lib/site";

// Served at /no-mans-sky/robots.txt; the domain's /robots.txt redirects here
// (next.config.ts). Its rules name paths from the root of the domain.
export default function robots(): MetadataRoute.Robots {
  const base =
    process.env.NEXT_PUBLIC_BASE_URL ?? `http://localhost:5010${BASE_PATH}`;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // A reader's likes, in every language (D20).
      disallow: LANGUAGES.map((language) => `${BASE_PATH}/${language}/likes`),
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
