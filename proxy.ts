import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import { supabasePublishableKey, supabaseUrl } from "@/lib/db/env";
import { DEFAULT_LANGUAGE, isLanguage } from "@/lib/i18n/languages";

// A path no page has, so the rewrite renders the section's 404 page.
const MISSING_PAGE = "_missing";

// A first segment of two small letters is read as a language code (D20), so a
// code the archive does not have answers 404 rather than an English redirect.
const LANGUAGE_CODE = /^[a-z]{2}$/;

// Paths that are not pages: Next.js's own, the error monitor's tunnel, Vercel's,
// and every file of public/ (each has an extension).
function isPage(path: string) {
  return (
    !/^\/(_next|_vercel|monitoring)(\/|$)/.test(path) && !/\.[^/]+$/.test(path)
  );
}

// Every page carries its language (D20): an address without one answers 308 to
// the same page in English, never by the browser's language; a code the archive
// does not have answers the section's 404.
function languageAnswer(request: NextRequest) {
  const path = request.nextUrl.pathname;
  if (!isPage(path)) {
    return undefined;
  }
  const first = path.split("/")[1] ?? "";
  if (isLanguage(first)) {
    return undefined;
  }
  const url = request.nextUrl.clone();
  if (LANGUAGE_CODE.test(first)) {
    url.pathname = `/${DEFAULT_LANGUAGE}/${MISSING_PAGE}`;
    return NextResponse.rewrite(url, { status: 404 });
  }
  url.pathname =
    path === "/" ? `/${DEFAULT_LANGUAGE}` : `/${DEFAULT_LANGUAGE}${path}`;
  return NextResponse.redirect(url, 308);
}

export async function proxy(request: NextRequest) {
  const answer = languageAnswer(request);
  if (answer) {
    return answer;
  }
  const url = supabaseUrl();
  const key = supabasePublishableKey();
  if (!url || !key) {
    return localReferrer(request, NextResponse.next());
  }

  let response = NextResponse.next({ request });
  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });
  await supabase.auth.getUser();
  return localReferrer(request, response);
}

function localReferrer(request: NextRequest, response: NextResponse) {
  const host = request.headers.get("host") ?? "";
  if (host.startsWith("localhost") || host.startsWith("127.0.0.1")) {
    response.headers.set("Referrer-Policy", "no-referrer-when-downgrade");
  }
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|monitoring).*)"],
};
