import { describe, expect, it } from "vitest";
import { buildSnippets, typingFrames } from "./terminalScript";

const text = (line: { text: string }[] | undefined) => line?.map((token) => token.text).join("");

describe("buildSnippets", () => {
  it("ends with the translated print(), used as the reduced-motion frame", () => {
    const last = buildSnippets("¡vas muy bien!", "salida").at(-1);
    expect(text(last?.[0])).toBe('>>> print("¡vas muy bien!")');
    expect(text(last?.[1])).toBe("¡vas muy bien!  # salida");
  });
});

describe("typingFrames", () => {
  it("types every character in order and finishes on the full snippet", () => {
    const [snippet] = buildSnippets("hi", "out");
    if (!snippet) throw new Error("missing snippet");
    const frames = [...typingFrames(snippet)];
    const characters = snippet.flat().reduce((count, token) => count + token.text.length, 0);

    expect(frames).toHaveLength(characters);
    expect(frames.at(-1)?.lines.map(text)).toEqual(snippet.map(text));
    expect(frames[0]?.lines.map(text)).toEqual([">", ""]);
  });
});
