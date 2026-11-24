import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";

// The translators' texts of the guides' tables beyond part 1, one file a menu
// group and language, `lib/i18n/statistics/<language>/<group>.json`, so each
// group is translated and checked apart. Read on the server only.
export function groupTexts(language: string): Record<string, string> {
  const folder = path.join(process.cwd(), "lib/i18n/statistics", language);
  if (!existsSync(folder)) {
    return {};
  }
  return Object.assign(
    {},
    ...readdirSync(folder)
      .filter((file) => file.endsWith(".json"))
      .sort()
      .map((file) => JSON.parse(readFileSync(path.join(folder, file), "utf8"))),
  );
}
