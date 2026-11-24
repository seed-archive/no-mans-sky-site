import { describe, expect, it } from "vitest";

import messagesDe from "../lib/i18n/de.json";
import messagesRu from "../lib/i18n/ru.json";
import { printNumber } from "../lib/archive/statistics-format";

// Intl puts a no-break space (and in Russian a narrow one) between groups and
// before %: compare with plain spaces.
const plain = (text: string) => text.replace(/[  ]/g, " ");

describe("numbers in a page's language", () => {
  const ru = { locale: "ru", words: messagesRu.numbers };
  const de = { locale: "de", words: messagesDe.numbers };

  it("rounds and words a count in running text", () => {
    expect(plain(printNumber("about", 217185, ru))).toBe("около 220 000");
    expect(plain(printNumber("about", 217185, de))).toBe("etwa 220.000");
  });

  it("prints a share with the language's comma and sign", () => {
    expect(plain(printNumber("share", 0.098, ru))).toBe("9,8 %");
    expect(plain(printNumber("smallShare", 0.00001, de))).toBe("unter 0,01 %");
  });

  it("words a one-in", () => {
    expect(plain(printNumber("oneIn", 33_000_000, ru))).toBe(
      "один из 33 000 000",
    );
  });

  it("keeps English as it was", () => {
    expect(printNumber("about", 217185)).toBe("about 220,000");
    expect(printNumber("share", 0.098)).toBe("9.8%");
    expect(printNumber("oneIn", 33_000_000)).toBe("one in 33,000,000");
  });
});
