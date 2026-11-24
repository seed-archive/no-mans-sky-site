import { IntlMessageFormat } from "intl-messageformat";

import de from "./de.json";
import en from "./en.json";
import es from "./es.json";
import ru from "./ru.json";
import type { Language } from "./languages";

// A label of lib/i18n/<language>.json on the server, where no react-intl
// provider is: a page's title, its trail. Only server code imports this
// module, so the four files never reach a browser.
type Nested = { [key: string]: string | Nested };
const MESSAGES: Record<Language, Nested> = { en, ru, es, de };

export function messageOf(
  language: Language,
  id: string,
  values?: Record<string, string>,
): string {
  const found = id
    .split(".")
    .reduce<string | Nested | undefined>(
      (node, part) =>
        node && typeof node === "object" ? node[part] : undefined,
      MESSAGES[language],
    );
  const text = typeof found === "string" ? found : id;
  return values
    ? String(new IntlMessageFormat(text, language).format(values))
    : text;
}
