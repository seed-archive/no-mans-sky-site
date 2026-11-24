import {
  ToolGroupPage,
  toolGroupMetadata,
} from "@/components/archive/ToolGroupPage";

export function generateMetadata() {
  return toolGroupMetadata("finds");
}

export default function FindToolsPage() {
  return <ToolGroupPage slug="finds" />;
}
