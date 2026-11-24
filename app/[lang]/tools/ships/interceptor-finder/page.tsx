import { InterceptorFinder } from "@/components/archive/InterceptorFinder";
import { Trail } from "@/components/archive/Trail";
import { readContent } from "@/lib/archive/content";
import { toolPath } from "@/lib/archive/paths";
import { toolTrail } from "@/lib/archive/trails";
import { localMetadata, requireTranslation } from "@/lib/i18n/page";

const SLUG = "interceptor-finder";
const PATH = toolPath(SLUG);

export function generateMetadata() {
  return localMetadata(PATH, {
    title:
      "No Man's Sky Sentinel Interceptors: every Interceptor, part by part — Seed Archive",
    description:
      "Put together a No Man's Sky Sentinel Interceptor from every part the game can give it: the cockpit, the wings, the hull, the skirting, and the colour.",
  });
}

export default async function InterceptorFinderPage() {
  const language = await requireTranslation(PATH);
  return (
    <>
      <Trail steps={toolTrail(language, SLUG)} />
      <InterceptorFinder html={await readContent("interceptor-finder")} />
    </>
  );
}
