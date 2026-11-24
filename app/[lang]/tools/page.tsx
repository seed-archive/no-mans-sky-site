import { Article } from "@/components/archive/Article";
import { Trail } from "@/components/archive/Trail";
import { readContent } from "@/lib/archive/content";
import { localMetadata, requireTranslation } from "@/lib/i18n/page";

const PATH = "/tools";
const TRAIL = [{ name: "Home", href: "/" }, { name: "Tools" }];

export function generateMetadata() {
  return localMetadata(PATH, {
    title:
      "No Man's Sky tools: ship builders, luck score, and recipes — Seed Archive",
    description:
      "No Man's Sky tools: build an Interceptor, a freighter, or a living ship, score a find, and look up every refiner, cooking, and crafting recipe.",
  });
}

export default async function ToolsPage() {
  await requireTranslation(PATH);
  return (
    <>
      <Trail steps={TRAIL} />
      <Article html={await readContent("tools")} widgets={{}} />
    </>
  );
}
