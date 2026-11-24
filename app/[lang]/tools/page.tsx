import { Article } from "@/components/archive/Article";
import { Trail } from "@/components/archive/Trail";
import { readContent } from "@/lib/archive/content";
import { TOOLS_PATH } from "@/lib/archive/paths";
import { messageOf } from "@/lib/i18n/messages";
import { localMetadata, requireTranslation } from "@/lib/i18n/page";

export function generateMetadata() {
  return localMetadata(TOOLS_PATH, {
    title:
      "No Man's Sky tools: ship builders, luck score, and recipes — Seed Archive",
    description:
      "No Man's Sky tools: build an Interceptor, a freighter, or a living ship, score a find, and look up every refiner, cooking, and crafting recipe.",
  });
}

export default async function ToolsPage() {
  const language = await requireTranslation(TOOLS_PATH);
  const trail = [
    { name: messageOf(language, "archive.home"), href: "/" },
    { name: messageOf(language, "archive.tools") },
  ];
  return (
    <>
      <Trail steps={trail} />
      <Article html={await readContent("tools")} widgets={{}} />
    </>
  );
}
