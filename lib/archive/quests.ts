import data from "@/lib/archive/statistics.json";
import { pageTopic, type Topic } from "@/lib/archive/statistics";

// The pages of the Quests section, in order. The No Man's Sky generator writes them
// into statistics.json beside the guides and lists them under `quests`, off the
// guides menu and their trail, so a quest is read and drawn as a guide is.
export const QUESTS: Topic[] = data.quests.map((slug) => pageTopic(slug));

export function questOf(slug: string) {
  return QUESTS.find((quest) => quest.slug === slug);
}
