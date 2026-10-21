export type TokenKind = "prompt" | "keyword" | "function" | "string" | "plain" | "comment";

export interface Token {
  text: string;
  kind: TokenKind;
}

export type Line = Token[];
export type Snippet = Line[];

export function buildSnippets(message: string, outputLabel: string): Snippet[] {
  return [
    [
      [
        { text: ">>> ", kind: "prompt" },
        { text: "for", kind: "keyword" },
        { text: " step ", kind: "plain" },
        { text: "in", kind: "keyword" },
        { text: " learning_path:", kind: "plain" },
      ],
      [
        { text: "...     ", kind: "prompt" },
        { text: "master", kind: "function" },
        { text: "(step)", kind: "plain" },
      ],
    ],
    [
      [
        { text: ">>> ", kind: "prompt" },
        { text: "skills = [", kind: "plain" },
        { text: '"if"', kind: "string" },
        { text: ", ", kind: "plain" },
        { text: '"for"', kind: "string" },
        { text: "]", kind: "plain" },
      ],
      [
        { text: ">>> ", kind: "prompt" },
        { text: "len", kind: "function" },
        { text: "(skills)", kind: "plain" },
      ],
      [{ text: "2", kind: "plain" }],
    ],
    [
      [
        { text: ">>> ", kind: "prompt" },
        { text: "print", kind: "function" },
        { text: "(", kind: "plain" },
        { text: `"${message}"`, kind: "string" },
        { text: ")", kind: "plain" },
      ],
      [
        { text: message, kind: "plain" },
        { text: `  # ${outputLabel}`, kind: "comment" },
      ],
    ],
  ];
}

export function* typingFrames(snippet: Snippet): Generator<{ lines: Line[]; caretLine: number }> {
  const lines: Line[] = snippet.map(() => []);
  for (const [lineIndex, line] of snippet.entries()) {
    for (const token of line) {
      for (let length = 1; length <= token.text.length; length++) {
        const current = lines[lineIndex] ?? [];
        const typed = { ...token, text: token.text.slice(0, length) };
        lines[lineIndex] = length === 1 ? [...current, typed] : [...current.slice(0, -1), typed];
        yield { lines: lines.map((l) => [...l]), caretLine: lineIndex };
      }
    }
  }
}
