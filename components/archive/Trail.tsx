import { PageTrail } from "@seed-archive/ui/page-trail";

import { StructuredData } from "@/components/archive/StructuredData";
import { localHref } from "@/lib/i18n/page";
import { type PageStep, trailData } from "@/lib/archive/trail";

// A page's trail, shown and as a search engine reads it, in the page's language.
export async function Trail(props: { steps: PageStep[] }) {
  const steps = await Promise.all(
    props.steps.map(async (step) =>
      step.href ? { ...step, href: await localHref(step.href) } : step,
    ),
  );
  return (
    <>
      <StructuredData data={trailData(steps)} />
      <PageTrail steps={steps} />
    </>
  );
}
