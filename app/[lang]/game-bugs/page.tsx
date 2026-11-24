import { Article } from "@/components/archive/Article";
import { readContent } from "@/lib/archive/content";
import { messageMetadata, requireTranslation } from "@/lib/i18n/page";

const PATH = "/game-bugs";

export function generateMetadata() {
  return messageMetadata(PATH, "gameBugs");
}

// A page of text: the shared Article, with no widgets of another page.
export default async function GameBugsPage() {
  await requireTranslation(PATH);
  return <Article html={await readContent("game-bugs")} widgets={{}} />;
}
