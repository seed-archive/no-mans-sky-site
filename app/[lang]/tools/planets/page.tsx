import {
  ToolGroupPage,
  toolGroupMetadata,
} from "@/components/archive/ToolGroupPage";

export function generateMetadata() {
  return toolGroupMetadata("planets");
}

export default function PlanetToolsPage() {
  return <ToolGroupPage slug="planets" />;
}
