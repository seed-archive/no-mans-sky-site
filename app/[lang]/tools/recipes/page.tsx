import {
  ToolGroupPage,
  toolGroupMetadata,
} from "@/components/archive/ToolGroupPage";

export function generateMetadata() {
  return toolGroupMetadata("recipes");
}

export default function RecipeToolsPage() {
  return <ToolGroupPage slug="recipes" />;
}
