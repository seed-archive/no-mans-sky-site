import {
  ToolGroupPage,
  toolGroupMetadata,
} from "@/components/archive/ToolGroupPage";

export function generateMetadata() {
  return toolGroupMetadata("ships");
}

export default function ShipToolsPage() {
  return <ToolGroupPage slug="ships" />;
}
