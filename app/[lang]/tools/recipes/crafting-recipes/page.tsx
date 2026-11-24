import { RecipeBook } from "@/components/archive/RecipeBook";
import { Trail } from "@/components/archive/Trail";
import { readContent } from "@/lib/archive/content";
import { bookOf } from "@/lib/archive/recipes";
import { toolPath } from "@/lib/archive/paths";
import { toolTrail } from "@/lib/archive/trails";
import { localMetadata, requireTranslation } from "@/lib/i18n/page";

const SLUG = "crafting-recipes";
const PATH = toolPath(SLUG);

export function generateMetadata() {
  return localMetadata(PATH, {
    title:
      "No Man's Sky crafting recipes: everything you craft by hand — Seed Archive",
    description:
      "Every No Man's Sky crafting recipe, filtered by the parts you hold or the item you need, with each item's sell value.",
  });
}

export default async function CraftingRecipesPage() {
  const language = await requireTranslation(PATH);
  return (
    <>
      <Trail steps={toolTrail(language, SLUG)} />
      <RecipeBook
        html={await readContent("crafting-recipes")}
        book={bookOf("crafting")}
      />
    </>
  );
}
