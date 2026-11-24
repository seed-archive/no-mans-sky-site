import { RecipeBook } from "@/components/archive/RecipeBook";
import { Trail } from "@/components/archive/Trail";
import { readContent } from "@/lib/archive/content";
import { bookOf } from "@/lib/archive/recipes";
import { localMetadata, requireTranslation } from "@/lib/i18n/page";

const PATH = "/tools/cooking-recipes";
const TRAIL = [
  { name: "Home", href: "/" },
  { name: "Tools", href: "/tools" },
  { name: "Nutrient Processor recipes" },
];

export function generateMetadata() {
  return localMetadata(PATH, {
    title:
      "No Man's Sky cooking recipes: every Nutrient Processor dish — Seed Archive",
    description:
      "Every No Man's Sky Nutrient Processor recipe, filtered by ingredient or dish, with each dish's sell value and its bonus in the Nutrient Ingestor.",
  });
}

export default async function CookingRecipesPage() {
  await requireTranslation(PATH);
  return (
    <>
      <Trail steps={TRAIL} />
      <RecipeBook
        html={await readContent("cooking-recipes")}
        book={bookOf("cooking")}
      />
    </>
  );
}
