import { Article } from "@/components/archive/Article";
import { TopicList } from "@/components/archive/StatisticsScreen";
import { Trail } from "@/components/archive/Trail";
import { guideQuestions, readContent } from "@/lib/archive/content";
import { fillStatistics, topicsIn } from "@/lib/archive/statistics";
import { messageOf } from "@/lib/i18n/messages";
import {
  localMetadata,
  pageLanguage,
  requireTranslation,
} from "@/lib/i18n/page";

const PATH = "/guides";

export async function generateMetadata() {
  const language = await pageLanguage();
  return localMetadata(PATH, {
    title: messageOf(language, "guidesPage.title"),
    description: messageOf(language, "guidesPage.description"),
  });
}

export default async function GuidesPage() {
  const language = await requireTranslation(PATH);
  const trail = [
    { name: messageOf(language, "archive.home"), href: "/" },
    { name: messageOf(language, "archive.statistics") },
  ];
  const html = fillStatistics(
    await readContent("statistics"),
    "index",
    language,
  );
  const topics = topicsIn(language);
  const questions = await guideQuestions(topics.map((topic) => topic.slug));
  return (
    <>
      <Trail steps={trail} />
      <Article html={html} widgets={{}} />
      <TopicList topics={topics} questions={questions} />
    </>
  );
}
