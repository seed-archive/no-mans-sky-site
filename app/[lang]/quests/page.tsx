import { TopicList } from "@/components/archive/StatisticsScreen";
import { Trail } from "@/components/archive/Trail";
import { guideQuestions } from "@/lib/archive/content";
import { QUESTS_PATH, questPath } from "@/lib/archive/guides";
import { QUESTS } from "@/lib/archive/quests";
import { localMetadata, requireTranslation } from "@/lib/i18n/page";

// The Quests section's own page: its pages, each with its question and short
// answer. Like a group of the guides, it tells nothing of its own.

const TITLE = "Quests";
const TRAIL = [{ name: "Home", href: "/" }, { name: TITLE }];

export function generateMetadata() {
  return localMetadata(QUESTS_PATH, {
    title: `${TITLE} in No Man's Sky — Seed Archive`,
    description: `${TITLE} in No Man's Sky: ${QUESTS.map((quest) =>
      quest.title.toLowerCase(),
    ).join(", ")}.`,
  });
}

export default async function QuestsPage() {
  await requireTranslation(QUESTS_PATH);
  const questions = await guideQuestions(
    QUESTS.map((quest) => quest.slug),
    "quests",
  );
  return (
    <>
      <Trail steps={TRAIL} />
      <TopicList
        topics={QUESTS}
        questions={questions}
        section={{
          title: TITLE,
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
