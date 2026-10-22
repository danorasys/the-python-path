import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { compileMarkdown } from "./markdown";
import { checkContent, findExamples, renderOutputFence, transcriptText } from "./outputs";
import { startPythonExecutor, type PythonExecutor, type RunRequest, type RunResult } from "./python/executor";

const md = (...lines: string[]) => lines.join("\n");
const unit = (...body: string[]) => md("---", "title: Prueba", "order: 1", "---", "", ...body, "");

function fakeExecutor(respond: (request: RunRequest) => Partial<RunResult>): PythonExecutor {
  return {
    run: (request) =>
      Promise.resolve({
        status: "ok",
        transcript: "",
        prompts: [],
        missingInput: false,
        unusedInputs: 0,
        ...respond(request),
      }),
    close: () => undefined,
  };
}

const printed = (transcript: string) => fakeExecutor(() => ({ transcript }));

let roots: string[] = [];

async function contentWith(source: string): Promise<{ root: string; file: string }> {
  const base = await mkdtemp(path.join(tmpdir(), "tpp-outputs-"));
  roots.push(base);
  const root = path.join(base, "content");
  const file = path.join(root, "module1", "learning-unit1.es.md");
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, source);
  return { root, file };
}

afterEach(async () => {
  await Promise.all(roots.map((root) => rm(root, { recursive: true, force: true })));
  roots = [];
});

describe("findExamples", () => {
  it("finds runnable blocks with their options and attached outputs", () => {
    const examples = findExamples(
      unit(
        '```python run input="Ana|25" error',
        "print(1)",
        "```",
        "",
        "```output static",
        "1",
        "```",
        "",
        ":::details[Solución]",
        "```python run hidden",
        "print(2)",
        "```",
        "```output",
        "2",
        "```",
        ":::",
        "",
        "```python",
        "print(3)",
        "```",
      ),
      "content/module1/learning-unit1.es.md",
    );
    expect(examples).toHaveLength(2);
    expect(examples[0]).toMatchObject({ line: 6, code: "print(1)", inputs: ["Ana", "25"], expectError: true });
    expect(examples[0]?.output).toMatchObject({ text: "1", static: true, opening: "```output static", closing: "```" });
    expect(examples[1]).toMatchObject({ line: 15, code: "print(2)", inputs: [], expectError: false });
    expect(examples[1]?.output?.text).toBe("2");
  });
});

describe("renderOutputFence", () => {
  const block = { text: "", static: false, start: 0, end: 0, opening: '```output label="Resultado:"', closing: "```" };

  it("keeps the options and handles empty output", () => {
    expect(renderOutputFence(block, "5")).toBe('```output label="Resultado:"\n5\n```');
    expect(renderOutputFence(block, "")).toBe('```output label="Resultado:"\n```');
  });

  it("uses a longer fence when the output contains one", () => {
    expect(renderOutputFence(block, "```\nx")).toBe('````output label="Resultado:"\n```\nx\n````');
  });

  it("produces blocks that compile back to the exact output", () => {
    for (const output of ["a\n", "a\n\n", "  sangría", "", "fin   "]) {
      const fence = renderOutputFence({ ...block, opening: "```output" }, output);
      const [, code] = compileMarkdown(fence, { file: "x.md", language: "es", lineOffset: 0 });
      expect(code).toEqual({ type: "code", text: output, language: "python" });
    }
  });
});

describe("transcriptText", () => {
  it("drops only the final line break", () => {
    expect(transcriptText("a\n\n")).toBe("a\n");
    expect(transcriptText("a")).toBe("a");
  });
});

describe("checkContent", () => {
  const example = unit("```python run", 'print("hola")', "```", "", '```output label="Resultado:"', "adios", "```");

  it("reports outputs that do not match the code", async () => {
    const { root } = await contentWith(example);
    const report = await checkContent(root, printed("hola\n"));
    expect(report).toMatchObject({ examples: 1, verified: 0, updated: 0 });
    expect(report.problems).toEqual([
      expect.objectContaining({
        file: "content/module1/learning-unit1.es.md",
        line: 6,
        message: expect.stringContaining('expected "adios", got "hola"') as unknown,
      }),
    ]);
  });

  it("rewrites outputs in write mode and leaves the rest of the file alone", async () => {
    const { root, file } = await contentWith(example);
    const report = await checkContent(root, printed("hola\n"), { write: true });
    expect(report).toMatchObject({ updated: 1, problems: [] });
    expect(await readFile(file, "utf8")).toBe(unit("```python run", 'print("hola")', "```", "", '```output label="Resultado:"', "hola", "```"));
    expect(await checkContent(root, printed("hola\n"))).toMatchObject({ verified: 1, problems: [] });
  });

  it("skips static outputs", async () => {
    const { root } = await contentWith(unit("```python run", "print(1)", "```", "```output static", "lo que sea", "```"));
    expect(await checkContent(root, printed("1\n"))).toMatchObject({ unchecked: 1, verified: 0, problems: [] });
  });

  it("explains failures, missing answers and timeouts", async () => {
    const { root } = await contentWith(
      unit(
        "```python run",
        "fails()",
        "```",
        "```python run error",
        "fine()",
        "```",
        "```python run",
        "asks()",
        "```",
        '```python run input="1|2"',
        "extra()",
        "```",
        "```python run",
        "loops()",
        "```",
      ),
    );
    const executor = fakeExecutor(({ code }) => {
      if (code === "fails()") return { status: "error", transcript: "Traceback\nNameError: fails\n" };
      if (code === "asks()") return { status: "error", missingInput: true, prompts: ["Edad: "] };
      if (code === "extra()") return { unusedInputs: 1 };
      if (code === "loops()") return { status: "timeout", message: "The example did not finish within 4 seconds." };
      return {};
    });
    const messages = (await checkContent(root, executor)).problems.map((problem) => problem.message);
    expect(messages).toEqual([
      'The example failed with NameError: fails. If that is intended, add "error" to the block.',
      'The block is marked with "error" but it ran without errors.',
      'input("Edad: ") needs a value. Add the answers with input="first|second".',
      "1 of the input values were not used.",
      "The example did not finish within 4 seconds.",
    ]);
  });
});

describe("content examples", () => {
  it("run as documented in every unit", async () => {
    const executor = startPythonExecutor();
    try {
      const report = await checkContent(path.resolve("content"), executor);
      expect(report.problems).toEqual([]);
      expect(report.examples).toBeGreaterThan(0);
    } finally {
      executor.close();
    }
  }, 180_000);
});
