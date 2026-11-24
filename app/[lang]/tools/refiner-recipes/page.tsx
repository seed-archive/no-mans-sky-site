import { RecipeBook } from "@/components/archive/RecipeBook";
import { Trail } from "@/components/archive/Trail";
import { readContent } from "@/lib/archive/content";
import { bookOf } from "@/lib/archive/recipes";
import { localMetadata, requireTranslation } from "@/lib/i18n/page";

const PATH = "/tools/refiner-recipes";
const TRAIL = [
  { name: "Home", href: "/" },
  { name: "Tools", href: "/tools" },
  { name: "Refiner recipes" },
];

export function generateMetadata() {
  return localMetadata(PATH, {
    title:
      "No Man's Sky refiner recipes: Portable, Medium, and Large — Seed Archive",
    description:
      "Every No Man's Sky refiner recipe, filtered by the ingredients you hold or the item you want, with the refiner each one needs.",
  });
}

export default async function RefinerRecipesPage() {
  await requireTranslation(PATH);
  return (
    <>
      <Trail steps={TRAIL} />
      <RecipeBook
        html={await readContent("refiner-recipes")}
        book={bookOf("refiner")}
      />
    </>
  );
}
