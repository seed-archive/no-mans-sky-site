import { TopicList } from "@/components/archive/StatisticsScreen";
import { Trail } from "@/components/archive/Trail";
import { guideQuestions } from "@/lib/archive/content";
import { QUESTS_PATH, questPath } from "@/lib/archive/guides";
import { QUESTS } from "@/lib/archive/quests";
import { messageOf } from "@/lib/i18n/messages";
import {
  localMetadata,
  pageLanguage,
  requireTranslation,
} from "@/lib/i18n/page";

// The Quests section's own page: its pages, each with its question and short
// answer. Like a group of the guides, it tells nothing of its own.

export async function generateMetadata() {
  const language = await pageLanguage();
  const quests = new Intl.ListFormat(language, {
    type: "unit",
    style: "short",
  }).format(QUESTS.map((quest) => quest.title.toLowerCase()));
  return localMetadata(QUESTS_PATH, {
    title: messageOf(language, "meta.quests.title"),
    description: messageOf(language, "meta.quests.description", { quests }),
  });
}

export default async function QuestsPage() {
  const language = await requireTranslation(QUESTS_PATH);
  const title = messageOf(language, "archive.quests");
  const trail = [
    { name: messageOf(language, "archive.home"), href: "/" },
    { name: title },
  ];
  const questions = await guideQuestions(
    QUESTS.map((quest) => quest.slug),
    "quests",
  );
  return (
    <>
      <Trail steps={trail} />
      <TopicList
        topics={QUESTS}
        questions={questions}
        section={{
          title,
          pages: QUESTS.map((quest) => ({
            slug: quest.slug,
            title: quest.title,
            href: questPath(quest.slug),
          })),
        }}
      />
    </>
  );
}
