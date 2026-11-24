import { Article } from "@/components/archive/Article";
import { Trail } from "@/components/archive/Trail";
import { readContent } from "@/lib/archive/content";
import { TOOLS_PATH } from "@/lib/archive/paths";
import { messageOf } from "@/lib/i18n/messages";
import { messageMetadata, requireTranslation } from "@/lib/i18n/page";

export function generateMetadata() {
  return messageMetadata(TOOLS_PATH, "tools");
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
