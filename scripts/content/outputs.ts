import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { Code, RootContent } from "mdast";
import { isLanguage, type Language } from "../../src/i18n/languages";
import { ContentError } from "./errors";
import { normalizeNewlines, splitFrontmatter } from "./frontmatter";
import { BASE_LANGUAGE } from "./labels";
import { INPUT_SEPARATOR, parseMarkdown, readCodeOptions, type MarkdownContext } from "./markdown";
import type { PythonExecutor, RunResult } from "./python/executor";

export interface OutputBlock {
  text: string;
  static: boolean;
  start: number;
  end: number;
  opening: string;
  closing: string;
}

export interface Example {
  file: string;
  line: number;
  code: string;
  inputs: string[];
  expectError: boolean;
  output: OutputBlock | null;
}

export interface Problem {
  file: string;
  line: number;
  message: string;
}

export interface CheckReport {
  examples: number;
  verified: number;
  updated: number;
  unchecked: number;
  problems: Problem[];
}

const FENCE = /^(`{3,}|~{3,})/;

function languageOf(file: string): Language {
  const match = /\.([a-z]{2})\.md$/.exec(file);
  return match && isLanguage(match[1]) ? match[1] : BASE_LANGUAGE;
}

function outputBlock(node: Code, text: string, bodyStart: number, ctx: MarkdownContext): OutputBlock {
  const options = readCodeOptions(node, ctx);
  const start = bodyStart + (node.position?.start.offset ?? 0);
  const end = bodyStart + (node.position?.end.offset ?? 0);
  const source = text.slice(start, end);
  const opening = source.slice(0, source.indexOf("\n") === -1 ? source.length : source.indexOf("\n"));
  const closing = source.slice(source.lastIndexOf("\n") + 1);
  if (source.indexOf("\n") === -1 || !FENCE.test(closing.trim()) || closing.trim()[0] !== opening.trim()[0]) {
    throw new ContentError("This output block is not closed.", {
      file: ctx.file,
      line: (node.position?.start.line ?? 0) + ctx.lineOffset,
    });
  }
  return { text: node.value, static: options.kind === "output" && options.static, start, end, opening, closing };
}

export function findExamples(source: string, file: string): Example[] {
  const text = normalizeNewlines(source);
  const { body, lineOffset } = splitFrontmatter(text, file);
  const bodyStart = text.length - body.length;
  const ctx: MarkdownContext = { file, language: languageOf(file), lineOffset };
  const examples: Example[] = [];

  const visit = (children: readonly RootContent[]) => {
    children.forEach((node, index) => {
      if ("children" in node && node.type !== "paragraph" && node.type !== "heading") {
        visit(node.children);
      }
      if (node.type !== "code") return;
      const options = readCodeOptions(node, ctx);
      if (options.kind !== "python" || options.run === undefined) return;
      const next = children[index + 1];
      examples.push({
        file,
        line: (node.position?.start.line ?? 0) + lineOffset,
        code: node.value,
        inputs: options.inputs,
        expectError: options.error,
        output: next?.type === "code" && next.lang === "output" ? outputBlock(next, text, bodyStart, ctx) : null,
      });
    });
  };

  visit(parseMarkdown(body).children);
  return examples;
}

export function transcriptText(transcript: string): string {
  return transcript.endsWith("\n") ? transcript.slice(0, -1) : transcript;
}

export function renderOutputFence(block: OutputBlock, text: string): string {
  const marker = block.opening.trim()[0] ?? "`";
  const fence = /^(`+|~+)/.exec(block.opening.trim())?.[1] ?? "```";
  const longest = Math.max(0, ...[...text.matchAll(new RegExp(`^\\${marker}{3,}`, "gm"))].map((run) => run[0].length));
  const size = Math.max(fence.length, longest + 1);
  const opening = `${marker.repeat(size)}${block.opening.trim().slice(fence.length)}`;
  const closing = marker.repeat(size);
  return text === "" ? `${opening}\n${closing}` : `${opening}\n${text}\n${closing}`;
}

function firstDifference(expected: string, actual: string): string {
  const before = expected.split("\n");
  const after = actual.split("\n");
  const show = (line: string | undefined) => (line === undefined ? "nothing" : JSON.stringify(line));
  for (let index = 0; index < Math.max(before.length, after.length); index++) {
    if (before[index] !== after[index]) {
      return `line ${index + 1} of the output: expected ${show(before[index])}, got ${show(after[index])}`;
    }
  }
  return "the outputs differ";
}

function lastLine(transcript: string): string {
  return transcriptText(transcript).split("\n").filter(Boolean).at(-1) ?? "";
}

function runProblems(example: Example, result: RunResult): string[] {
  if (result.status === "timeout" || result.status === "crash") return [result.message ?? "The example could not run."];
  const problems: string[] = [];
  if (result.missingInput) {
    const prompt = result.prompts.at(-1) ?? "";
    problems.push(
      `input(${JSON.stringify(prompt)}) needs a value. Add the answers with input="first${INPUT_SEPARATOR}second".`,
    );
  } else if (result.status === "error" && !example.expectError) {
    problems.push(`The example failed with ${lastLine(result.transcript)}. If that is intended, add "error" to the block.`);
  }
  if (result.unusedInputs > 0) {
    problems.push(`${result.unusedInputs} of the input values were not used.`);
  }
  if (result.status === "ok" && example.expectError) {
    problems.push(`The block is marked with "error" but it ran without errors.`);
  }
  return problems;
}

async function markdownFiles(dir: string): Promise<string[]> {
  const files: string[] = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".") || entry.name.startsWith("_") || entry.name === "README.md") continue;
    const target = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await markdownFiles(target)));
    else if (entry.name.endsWith(".md")) files.push(target);
  }
  return files.sort();
}

export async function checkContent(
  root: string,
  executor: PythonExecutor,
  { write = false }: { write?: boolean } = {},
): Promise<CheckReport> {
  const report: CheckReport = { examples: 0, verified: 0, updated: 0, unchecked: 0, problems: [] };

  for (const absolute of await markdownFiles(root)) {
    const file = path.relative(path.dirname(root), absolute).split(path.sep).join("/");
    const text = normalizeNewlines(await readFile(absolute, "utf8"));
    const replacements: { start: number; end: number; text: string }[] = [];

    for (const example of findExamples(text, file)) {
      report.examples++;
      const result = await executor.run({ code: example.code, inputs: example.inputs });
      const problems = runProblems(example, result);
      for (const message of problems) report.problems.push({ file, line: example.line, message });

      const output = example.output;
      if (!output) continue;
      if (output.static) {
        report.unchecked++;
        continue;
      }
      if (result.status === "timeout" || result.status === "crash" || result.missingInput) continue;
      const actual = transcriptText(result.transcript);
      if (actual === output.text) {
        report.verified++;
      } else if (write) {
        replacements.push({ start: output.start, end: output.end, text: renderOutputFence(output, actual) });
        report.updated++;
      } else {
        report.problems.push({
          file,
          line: example.line,
          message: `The output does not match what the code prints: ${firstDifference(output.text, actual)}. Run npm run content:outputs to update it.`,
        });
      }
    }

    if (replacements.length > 0) {
      let updated = text;
      for (const replacement of [...replacements].sort((a, b) => b.start - a.start)) {
        updated = updated.slice(0, replacement.start) + replacement.text + updated.slice(replacement.end);
      }
      await writeFile(absolute, updated);
    }
  }
  return report;
}
