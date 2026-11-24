import { Article } from "@/components/archive/Article";
import { readContent } from "@/lib/archive/content";
import { localMetadata, requireTranslation } from "@/lib/i18n/page";

const PATH = "/game-bugs";

export function generateMetadata() {
  return localMetadata(PATH, {
    title: "No Man's Sky game bugs — Seed Archive",
    description:
      "Bugs of No Man's Sky where a card says one thing and the game does another, and what each changes in what you farm.",
  });
}

// A page of text: the shared Article, with no widgets of another page.
export default async function GameBugsPage() {
  await requireTranslation(PATH);
  return <Article html={await readContent("game-bugs")} widgets={{}} />;
}
