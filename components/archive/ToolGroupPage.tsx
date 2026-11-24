import type { Metadata } from "next";

import { IndexList } from "@/components/archive/IndexList";
import { Trail } from "@/components/archive/Trail";
import { toolGroupPath, toolPath } from "@/lib/archive/paths";
import { TOOL_GROUPS, type ToolGroupSlug } from "@/lib/archive/tools";
import { toolGroupTrail } from "@/lib/archive/trails";
import { messageOf } from "@/lib/i18n/messages";
import {
  localMetadata,
  pageLanguage,
  requireTranslation,
} from "@/lib/i18n/page";

// A tool group's own page, /tools/<group> (the owner, 2026-11-24): its title and
// heading are the group's menu label, then a line a tool. Each group's static
// folder renders it.

function groupOf(slug: ToolGroupSlug) {
  return TOOL_GROUPS.find((group) => group.slug === slug) ?? TOOL_GROUPS[0];
}

export async function toolGroupMetadata(
  slug: ToolGroupSlug,
): Promise<Metadata> {
  const language = await pageLanguage();
  const group = groupOf(slug);
  return localMetadata(toolGroupPath(slug), {
    title: messageOf(language, "meta.page", {
      title: messageOf(language, group.id),
    }),
    description: group.tools
      .map((tool) => messageOf(language, `toolLine.${tool.slug}`))
      .join(" "),
  });
}

export async function ToolGroupPage(props: { slug: ToolGroupSlug }) {
  const { slug } = props;
  const language = await requireTranslation(toolGroupPath(slug));
  const group = groupOf(slug);
  return (
    <>
      <Trail steps={toolGroupTrail(language, slug)} />
      <IndexList
        title={group.id}
        entries={group.tools.map((tool) => ({
          href: toolPath(tool.slug),
          label: tool.id,
          line: `toolLine.${tool.slug}`,
        }))}
      />
    </>
  );
}
