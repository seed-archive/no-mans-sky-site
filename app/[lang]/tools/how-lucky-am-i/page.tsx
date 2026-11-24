import { LuckCalculator } from "@/components/archive/LuckCalculator";
import { Trail } from "@/components/archive/Trail";
import { readContent } from "@/lib/archive/content";
import { localMetadata, requireTranslation } from "@/lib/i18n/page";

const PATH = "/tools/how-lucky-am-i";
const TRAIL = [
  { name: "Home", href: "/" },
  { name: "Tools", href: "/tools" },
  { name: "How lucky am I?" },
];

export function generateMetadata() {
  return localMetadata(PATH, {
    title:
      "How lucky am I? Rate your No Man's Sky multitool or ship — Seed Archive",
    description:
      "Enter a No Man's Sky multitool, staff, or claimed ship, with its supercharged slots and stats, and see how it ranks from 0 to 100.",
  });
}

export default async function HowLuckyPage(props: {
  searchParams: Promise<{ tab?: string }>;
}) {
  await requireTranslation(PATH);
  const { tab } = await props.searchParams;
  return (
    <>
      <Trail steps={TRAIL} />
      <LuckCalculator html={await readContent("how-lucky-am-i")} tab={tab} />
    </>
  );
}
