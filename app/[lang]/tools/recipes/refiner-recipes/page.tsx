import { RecipeBook } from "@/components/archive/RecipeBook";
import { Trail } from "@/components/archive/Trail";
import { readContent } from "@/lib/archive/content";
import { bookOf } from "@/lib/archive/recipes";
import { toolPath } from "@/lib/archive/paths";
import { toolTrail } from "@/lib/archive/trails";
import { messageMetadata, requireTranslation } from "@/lib/i18n/page";

const SLUG = "refiner-recipes";
const PATH = toolPath(SLUG);

export function generateMetadata() {
  return messageMetadata(PATH, SLUG);
}

export default async function RefinerRecipesPage() {
  const language = await requireTranslation(PATH);
  return (
    <>
      <Trail steps={toolTrail(language, SLUG)} />
      <RecipeBook
        html={await readContent("refiner-recipes")}
        book={bookOf("refiner")}
      />
    </>
  );
}
