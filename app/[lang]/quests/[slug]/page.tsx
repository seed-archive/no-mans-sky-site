import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { TopicScreen } from "@/components/archive/StatisticsScreen";
import { StructuredData } from "@/components/archive/StructuredData";
import { Trail } from "@/components/archive/Trail";
import { readContent } from "@/lib/archive/content";
import { QUESTS_PATH, questPath } from "@/lib/archive/guides";
import { QUESTS, questOf } from "@/lib/archive/quests";
import { fillStatistics, tablesOf } from "@/lib/archive/statistics";
import { chartsOf } from "@/lib/archive/statistics-charts";
import { articleData } from "@/lib/archive/trail";
import { localHref, localMetadata, requireTranslation } from "@/lib/i18n/page";

// One page of the Quests section, drawn as a guide is: its Markdown with the
// `{{name}}` numbers and `<!-- widget:KEY -->` tables of its page in
// statistics.json.

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return QUESTS.map((quest) => ({ slug: quest.slug }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const quest = questOf((await props.params).slug);
  return quest
    ? localMetadata(questPath(quest.slug), {
        title: `${quest.title} in No Man's Sky — Seed Archive`,
        description: quest.fact,
      })
    : {};
}

export default async function QuestPage(props: Props) {
  const quest = questOf((await props.params).slug);
  if (!quest) {
    notFound();
  }
  const path = questPath(quest.slug);
  const language = await requireTranslation(path);
  const trail = [
    { name: "Home", href: "/" },
    { name: "Quests", href: QUESTS_PATH },
    { name: quest.title },
  ];
  const html = await readContent(`quests/${quest.slug}`);
  return (
    <>
      <StructuredData
        data={articleData(quest.title, quest.fact, await localHref(path))}
      />
      <Trail steps={trail} />
      <TopicScreen
        html={fillStatistics(html, quest.slug, language)}
        tables={tablesOf(quest.slug, language)}
        charts={chartsOf(quest.slug, language)}
      />
    </>
  );
}
