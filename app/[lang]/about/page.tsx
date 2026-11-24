import { AboutScreen } from "@/components/archive/AboutScreen";
import { fillNumbers } from "@/lib/archive/about";
import { readContent } from "@/lib/archive/content";
import { messageOf } from "@/lib/i18n/messages";
import { messageMetadata, requireTranslation } from "@/lib/i18n/page";

const PATH = "/about";

export function generateMetadata() {
  return messageMetadata(PATH, "about");
}

export default async function AboutPage() {
  const language = await requireTranslation(PATH);
  return (
    <AboutScreen
      html={fillNumbers(await readContent("about"), language, (id, values) =>
        messageOf(language, id, values),
      )}
    />
  );
}
