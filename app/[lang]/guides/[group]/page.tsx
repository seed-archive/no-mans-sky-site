import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { TopicList } from "@/components/archive/StatisticsScreen";
import { Trail } from "@/components/archive/Trail";
import { guideQuestions } from "@/lib/archive/content";
import statisticsMenu from "@/lib/archive/statistics-menu.json";
import { groupPath } from "@/lib/archive/guides";
import { topicsIn } from "@/lib/archive/statistics";
import { messageOf } from "@/lib/i18n/messages";
import {
  localMetadata,
  pageLanguage,
  requireTranslation,
} from "@/lib/i18n/page";
import { menuText } from "@/lib/i18n/statistics";

// A group's own page: its guides, each with its question and short answer. It
// tells nothing of its own (the owner, 2026-11-05) and stands outside the
// trail of the guides, which goes from the last guide of a group straight to
// the first of the next.

type Props = { params: Promise<{ group: string }> };

export const dynamicParams = false;

const groupOf = (slug: string) =>
  statisticsMenu.find((one) => one.slug === slug);

export function generateStaticParams() {
  return statisticsMenu.map((group) => ({ group: group.slug }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const group = groupOf((await props.params).group);
  if (!group) {
    return {};
  }
  const language = await pageLanguage();
  const title = menuText(language, group.title);
  const pages = new Intl.ListFormat(language).format(
    group.pages.map((page) => menuText(language, page.title).toLowerCase()),
  );
  return localMetadata(groupPath(group.slug), {
    title: messageOf(language, "meta.page", {
      title: messageOf(language, "archive.groupTitle", { title }),
    }),
    description: messageOf(language, "archive.groupDescription", {
      title,
      pages,
    }),
  });
}

export default async function GroupPage(props: Props) {
  const group = groupOf((await props.params).group);
  if (!group) {
    notFound();
  }
  const language = await requireTranslation(groupPath(group.slug));
  const trail = [
    { name: messageOf(language, "archive.home"), href: "/" },
    { name: messageOf(language, "archive.statistics"), href: "/guides" },
    { name: menuText(language, group.title) },
  ];
  const questions = await guideQuestions(group.pages.map((page) => page.slug));
  return (
    <>
      <Trail steps={trail} />
      <TopicList
        topics={topicsIn(language)}
        questions={questions}
        group={group.slug}
      />
    </>
  );
}
