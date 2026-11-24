import { RecipeBook } from "@/components/archive/RecipeBook";
import { Trail } from "@/components/archive/Trail";
import { readContent } from "@/lib/archive/content";
import { bookOf } from "@/lib/archive/recipes";
import { toolPath } from "@/lib/archive/paths";
import { toolTrail } from "@/lib/archive/trails";
import { localMetadata, requireTranslation } from "@/lib/i18n/page";

const SLUG = "cooking-recipes";
const PATH = toolPath(SLUG);

export function generateMetadata() {
  return localMetadata(PATH, {
    title:
      "No Man's Sky cooking recipes: every Nutrient Processor dish — Seed Archive",
    description:
      "Every No Man's Sky Nutrient Processor recipe, filtered by ingredient or dish, with each dish's sell value and its bonus in the Nutrient Ingestor.",
  });
}

export default async function CookingRecipesPage() {
  const language = await requireTranslation(PATH);
  return (
    <>
      <Trail steps={toolTrail(language, SLUG)} />
      <RecipeBook
        html={await readContent("cooking-recipes")}
        book={bookOf("cooking")}
      />
    </>
  );
}
