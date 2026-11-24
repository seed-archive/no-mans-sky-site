import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { RecordScreen } from "@/components/archive/RecordScreen";
import { StructuredData } from "@/components/archive/StructuredData";
import { childKinds, isKind, isRecordKind } from "@/lib/archive/kinds";
import { recordPath } from "@/lib/archive/paths";
import { recordTrail } from "@/lib/archive/trails";
import { catalogKey, parseCatalogQuery } from "@/lib/archive/query";
import {
  readCatalog,
  readRecord,
  type AssetCard,
  type TrailStep,
} from "@/lib/archive/read";
import { createArchiveClient } from "@/lib/db/supabase.server";
import { trailData, type PageStep } from "@/lib/archive/trail";
import { type Language, localPath } from "@/lib/i18n/languages";
import { messageOf } from "@/lib/i18n/messages";
import {
  localMetadata,
  pageLanguage,
  requireTranslation,
} from "@/lib/i18n/page";
import { getQueryClient } from "@/lib/query-client";

type Search = Record<string, string | string[] | undefined>;

// The stored value of a term field: its key in the field's message group.
function valueOf(record: AssetCard, label: string): string | null {
  const field = record.fields.find((one) => one.label === label);
  return field && field.type === "term" && field.value ? field.value : null;
}

// The value of a term field, in the words of the page's language.
function termOf(
  language: Language,
  record: AssetCard,
  label: string,
): string | null {
  const field = record.fields.find((one) => one.label === label);
  if (!field || field.type !== "term" || !field.value) {
    return null;
  }
  const id = `${field.group}.${field.value}`;
  const text = messageOf(language, id);
  return text === id ? field.value : text;
}

function stepOf(record: AssetCard, kind: TrailStep["kind"]) {
  return record.trail.find((step) => step.kind === kind)?.name ?? null;
}

// "on Burgh V in the Iroish system of Dugnowarilda Galaxy", from what the
// trail holds: one message for each depth of a record, from its planet or
// space station up to its galaxy.
function placeOf(language: Language, record: AssetCard) {
  const planet = stepOf(record, "planet");
  const station = stepOf(record, "building");
  const system = stepOf(record, "system");
  const galaxy = stepOf(record, "galaxy");
  if (!galaxy) {
    return "";
  }
  const depth = !system
    ? "galaxy"
    : planet
      ? "planet"
      : station
        ? "station"
        : "system";
  return messageOf(language, `recordMeta.place.${depth}`, {
    planet: planet ?? "",
    system: system ?? "",
    galaxy,
  });
}

// A record's title and description, in the words players search: the
// messages `recordMeta.<kind>.*`.
function recordMeta(
  language: Language,
  record: AssetCard,
): { title: string; description: string } {
  const say = (id: string, values: Record<string, string>) =>
    messageOf(language, `recordMeta.${record.kind}.${id}`, values);
  const name = record.name;
  const place = placeOf(language, record);
  const rank = termOf(language, record, "archive.rank") ?? "none";
  switch (record.kind) {
    case "tool": {
      const head = termOf(language, record, "archive.headItem");
      const what = head
        ? say("staff", { rank, head })
        : say("multitool", {
            rank,
            body: termOf(language, record, "archive.toolBody") ?? "",
          });
      return {
        title: say("title", { name, what }),
        description: say("description", { name, what, place }),
      };
    }
    case "ship": {
      const what =
        valueOf(record, "archive.hull") === "interceptor"
          ? say("interceptor", { rank })
          : say("crashed", {
              rank,
              hull: termOf(language, record, "archive.hull") ?? "",
            });
      return {
        title: say("title", { name, what }),
        description: say("description", { name, what, place }),
      };
    }
    case "creature": {
      const allS = ["archive.combat", "archive.agility", "archive.health"]
        .every((label) => valueOf(record, label) === "S")
        .toString();
      const planet = stepOf(record, "planet");
      return {
        title: planet
          ? say("titleOn", { name, allS, planet })
          : say("title", { name, allS }),
        description: say("description", { name, allS, place }),
      };
    }
    case "planet":
      return {
        title: say("title", { name, system: stepOf(record, "system") ?? "" }),
        description: say("description", { name, place }),
      };
    case "building": {
      const system = stepOf(record, "system") ?? name;
      return {
        title: say("title", { system }),
        description: say("description", { system }),
      };
    }
    case "system":
      return {
        title: say("title", { name }),
        description: say("description", { name, place }),
      };
    case "galaxy":
      return {
        title: name,
        description: say("description", {
          name,
          type: termOf(language, record, "archive.galaxyType") ?? "",
          empty: String(valueOf(record, "archive.galaxyType") === "empty"),
        }),
      };
  }
}

export async function generateMetadata(props: {
  params: Promise<{ kind: string; id: string }>;
}): Promise<Metadata> {
  const { kind, id } = await props.params;
  if (!isRecordKind(kind)) {
    return {};
  }
  const supabase = await createArchiveClient();
  const record = supabase ? await readRecord(supabase, kind, id) : null;
  if (!record) {
    return {};
  }
  const language = await pageLanguage();
  const meta = recordMeta(language, record);
  return localMetadata(recordPath(kind, id), {
    title: messageOf(language, "recordMeta.page", { title: meta.title }),
    description: meta.description,
  });
}

export default async function RecordPage(props: {
  params: Promise<{ kind: string; id: string }>;
  searchParams: Promise<Search>;
}) {
  const { kind: kindParam, id } = await props.params;
  if (!isRecordKind(kindParam)) {
    notFound();
  }
  const language = await requireTranslation(recordPath(kindParam, id));
  const children = childKinds(kindParam);
  const raw = await props.searchParams;
  const query = parseCatalogQuery(
    children.length > 0 ? children : [kindParam],
    raw,
    id,
  );
  const queryClient = getQueryClient();
  const supabase = await createArchiveClient();
  let trail: PageStep[] | null = null;
  if (supabase) {
    const record = await readRecord(supabase, kindParam, id);
    if (!record) {
      notFound();
    }
    trail = recordTrail(
      language,
      kindParam,
      record.name,
      record.trail,
      isKind(kindParam),
    ).map((step) =>
      step.href ? { ...step, href: localPath(language, step.href) } : step,
    );
    queryClient.setQueryData(["record", kindParam, id], record);
    if (children.length > 0) {
      await queryClient.prefetchQuery({
        queryKey: catalogKey(query),
        queryFn: () => readCatalog(supabase, query),
      });
    }
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {trail ? <StructuredData data={trailData(trail)} /> : null}
      <RecordScreen
        kind={kindParam}
        id={id}
        pathname={recordPath(kindParam, id)}
        query={query}
      />
    </HydrationBoundary>
  );
}
