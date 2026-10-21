import { describe, expect, it, vi } from "vitest";
import { DEFAULT_STEP_COLOR, parseBlocks, parsePathDocument, parseQuestionSet } from "./parse";

describe("parsePathDocument", () => {
  it("keeps valid steps and sanitises ids and colours", () => {
    const doc = parsePathDocument({
      title: "Roadmap",
      description: "d",
      steps: [
        { name: "1. A", description: "x", color: "#3776AB", module: "module1" },
        { name: "2. B", description: "y", color: "red", module: "../../etc" },
      ],
    });
    expect(doc.steps[0]).toEqual({ name: "1. A", description: "x", color: "#3776AB", module: "module1" });
    expect(doc.steps[1]).toEqual({ name: "2. B", description: "y", color: DEFAULT_STEP_COLOR });
  });

  it("rejects documents without steps", () => {
    expect(() => parsePathDocument({ title: "x" })).toThrow(TypeError);
  });
});

describe("parseBlocks", () => {
  it("parses nested collapsibles and skips unknown blocks", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    const blocks = parseBlocks([
      { type: "paragraph", text: "hi" },
      { type: "video", src: "x" },
      { type: "collapsible", title: "Solution", content: [{ type: "code", text: "print(1)" }] },
    ]);
    expect(blocks).toEqual([
      { type: "paragraph", text: "hi" },
      {
        type: "collapsible",
        title: "Solution",
        content: [{ type: "code", text: "print(1)", language: "python" }],
      },
    ]);
    expect(warn).toHaveBeenCalledOnce();
  });

  it("drops images with script URLs", () => {
    expect(parseBlocks([{ type: "image", src: "javascript:alert(1)" }])).toEqual([]);
  });
});

describe("parseQuestionSet", () => {
  it("drops questions that have no correct option", () => {
    const questions = parseQuestionSet({
      questions: [
        { id: 1, type: "true-false", content: [], options: [{ label: "True", text: "Sí", correct: true }] },
        { id: 2, type: "true-false", content: [], options: [{ label: "True", text: "Sí", correct: false }] },
      ],
    });
    expect(questions.map((q) => q.id)).toEqual([1]);
  });
});
