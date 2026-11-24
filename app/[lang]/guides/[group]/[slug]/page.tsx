import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TopicScreen } from "@/components/archive/StatisticsScreen";
import { StructuredData } from "@/components/archive/StructuredData";
import { Trail } from "@/components/archive/Trail";
import { fillCatalogExamples } from "@/lib/archive/catalog-examples";
import { readContent } from "@/lib/archive/content";
import {
  fillStatistics,
  tablesOf,
  topicOf,
  TOPICS,
} from "@/lib/archive/statistics";
import { chartsOf } from "@/lib/archive/statistics-charts";
import { groupOfGuide, groupPath, guidePath } from "@/lib/archive/guides";
import { articleData } from "@/lib/archive/trail";
import { messageOf } from "@/lib/i18n/messages";
import {
  localHref,
  localMetadata,
  pageLanguage,
  requireTranslation,
} from "@/lib/i18n/page";
import { menuText } from "@/lib/i18n/statistics";

type Props = { params: Promise<{ group: string; slug: string }> };

export const dynamicParams = false;

// The pages worth the most in search say their question in the title
// (docs/seo.md), the message `guideQuestion.<slug>`; the rest read "<title> in
// No Man's Sky".
const QUESTION_TITLES = new Set([
  "freighters",
  "multitool-classes",
  "ship-classes",
  "interceptors",
  "living-ships",
  "technology-merchants",
  "freighter-modules",
  "galaxies",
  "where-to-look",
  "staffs",
  "economy",
  "forsaken-trader",
]);

export function generateStaticParams() {
  return TOPICS.map((topic) => ({
    group: groupOfGuide(topic.slug)?.slug ?? "",
    slug: topic.slug,
  }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { group, slug } = await props.params;
  const language = await pageLanguage();
  const topic = topicOf(slug, language);
  const named = QUESTION_TITLES.has(slug)
    ? messageOf(language, `guideQuestion.${slug}`)
    : messageOf(language, "archive.guideTitle", {
        title: topic?.title ?? "",
      });
  return topic && groupOfGuide(slug)?.slug === group
    ? localMetadata(guidePath(topic.slug), {
        title: messageOf(language, "meta.page", { title: named }),
        description: topic.fact,
      })
    : {};
}

export default async function TopicPage(props: Props) {
  const { group: groupSlug, slug } = await props.params;
  const group = groupOfGuide(slug);
  if (!topicOf(slug) || !group || group.slug !== groupSlug) {
    notFound();
  }
  const language = await requireTranslation(guidePath(slug));
  const topic = topicOf(slug, language)!;
  const trail = [
    { name: messageOf(language, "archive.home"), href: "/" },
    { name: messageOf(language, "archive.statistics"), href: "/guides" },
    { name: menuText(language, group.title), href: groupPath(group.slug) },
    { name: topic.title },
  ];
  const html = await fillCatalogExamples(
    await readContent(`statistics/${slug}`),
  );
  return (
    <>
      <StructuredData
        data={articleData(
          topic.title,
          topic.fact,
          await localHref(guidePath(slug)),
        )}
      />
      <Trail steps={trail} />
      <TopicScreen
        html={fillStatistics(html, slug, language)}
        tables={tablesOf(slug, language)}
        charts={chartsOf(slug, language)}
      />
    </>
  );
}
