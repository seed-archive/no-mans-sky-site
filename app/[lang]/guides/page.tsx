import { Article } from "@/components/archive/Article";
import { TopicList } from "@/components/archive/StatisticsScreen";
import { Trail } from "@/components/archive/Trail";
import { guideQuestions, readContent } from "@/lib/archive/content";
import { fillStatistics, topicsIn } from "@/lib/archive/statistics";
import { localMetadata, requireTranslation } from "@/lib/i18n/page";

const PATH = "/guides";
const TRAIL = [{ name: "Home", href: "/" }, { name: "Guides" }];

export function generateMetadata() {
  return localMetadata(PATH, {
    title: "No Man's Sky guides: where to find the best items — Seed Archive",
    description:
      "No Man's Sky guides, from the galaxy down to the creature: where to find S-class multitools, ships, freighters, upgrade modules, and creatures, and how rare each one is.",
  });
}

export default async function GuidesPage() {
  const language = await requireTranslation(PATH);
  const html = fillStatistics(
    await readContent("statistics"),
    "index",
    language,
  );
  const topics = topicsIn(language);
  const questions = await guideQuestions(topics.map((topic) => topic.slug));
  return (
    <>
      <Trail steps={TRAIL} />
      <Article html={html} widgets={{}} />
      <TopicList topics={topics} questions={questions} />
    </>
  );
}
