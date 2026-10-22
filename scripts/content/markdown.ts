import type { Code, Node, PhrasingContent, Root, RootContent, Table } from "mdast";
import type { ContainerDirective } from "mdast-util-directive";
import { gfmTableFromMarkdown } from "mdast-util-gfm-table";
import { gfmTable } from "micromark-extension-gfm-table";
import remarkDirective from "remark-directive";
import remarkParse from "remark-parse";
import { unified, type Plugin } from "unified";
import type { ContentBlock, TextBlockType } from "../../src/content/types";
import type { Language } from "../../src/i18n/languages";
import { ContentError } from "./errors";
import { DEFAULT_LABELS } from "./labels";

export interface MarkdownContext {
  file: string;
  language: Language;
  lineOffset: number;
}

const remarkTables: Plugin<[], Root> = function () {
  const data = this.data();
  (data.micromarkExtensions ??= []).push(gfmTable());
  (data.fromMarkdownExtensions ??= []).push(gfmTableFromMarkdown());
};

const processor = unified().use(remarkParse).use(remarkDirective).use(remarkTables).freeze();

const SUBTITLE_BY_DEPTH: Partial<Record<number, TextBlockType>> = {
  2: "subtitle1",
  3: "subtitle2",
  4: "subtitle3",
  5: "subtitle4",
};

const ICONS = new Set(["check", "cross"]);

const HTML_ESCAPES: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;" };

export function escapeHtml(text: string): string {
  return text.replace(/[&<>]/g, (char) => HTML_ESCAPES[char] ?? char);
}

function fail(ctx: MarkdownContext, node: Pick<Node, "position"> | undefined, message: string): never {
  const start = node?.position?.start;
  throw new ContentError(message, {
    file: ctx.file,
    line: start ? start.line + ctx.lineOffset : undefined,
    column: start?.column,
  });
}

function hasAttributes(node: { attributes?: Record<string, string | null | undefined> | null | undefined }): boolean {
  return Object.keys(node.attributes ?? {}).length > 0;
}

function renderInline(nodes: readonly PhrasingContent[], ctx: MarkdownContext): string {
  return nodes.map((node) => renderPhrasing(node, ctx)).join("");
}

function renderPhrasing(node: PhrasingContent, ctx: MarkdownContext): string {
  switch (node.type) {
    case "text":
    case "html":
      return escapeHtml(node.value.replace(/\n/g, " "));
    case "inlineCode":
      return `<code class="language-python">${escapeHtml(node.value)}</code>`;
    case "strong":
      return `<strong>${renderInline(node.children, ctx)}</strong>`;
    case "emphasis":
      return `<em>${renderInline(node.children, ctx)}</em>`;
    case "break":
      return "<br>";
    case "textDirective":
      if (node.children.length > 0 || hasAttributes(node)) {
        return fail(
          ctx,
          node,
          `":${node.name}" followed by [ or { is read as a directive. Escape the colon as "\\:" to show it as text.`,
        );
      }
      return ICONS.has(node.name) ? `<icon-${node.name}></icon-${node.name}>` : escapeHtml(`:${node.name}`);
    default:
      return fail(ctx, node, `Unsupported inline element "${node.type}".`);
  }
}

export function renderInlineMarkdown(text: string, ctx: MarkdownContext): string {
  const tree = processor.parse(text);
  const [first, ...rest] = tree.children;
  if (!first) return "";
  if (first.type !== "paragraph" || rest.length > 0) {
    return fail(ctx, undefined, `"${text}" must be a single line of text.`);
  }
  return renderInline(first.children, ctx);
}

export type CodeOptions =
  | { kind: "python"; run?: string | undefined; hidden: boolean; error: boolean; inputs: string[] }
  | { kind: "output"; label?: string | undefined; static: boolean };

type MetaValue = string | true;

export const INPUT_SEPARATOR = "|";

const ALLOWED_META: Record<CodeOptions["kind"], Record<string, "flag" | "value" | "either">> = {
  python: { run: "either", hidden: "flag", error: "flag", input: "value" },
  output: { label: "value", static: "flag" },
};

const META_TOKEN = /([a-z]+)(?:="([^"]*)")?/g;

function parseMeta(node: Code, kind: CodeOptions["kind"], ctx: MarkdownContext): Map<string, MetaValue> {
  const meta = node.meta ?? "";
  if (meta.replace(META_TOKEN, "").trim() !== "") {
    fail(ctx, node, `Could not read the code block options "${meta}".`);
  }
  const allowed = ALLOWED_META[kind];
  const options = new Map<string, MetaValue>();
  for (const [, key = "", value] of meta.matchAll(META_TOKEN)) {
    const shape = allowed[key];
    if (!shape) fail(ctx, node, `Unknown option "${key}" for a ${kind} block.`);
    if (options.has(key)) fail(ctx, node, `The option "${key}" is repeated.`);
    if (shape === "flag" && value !== undefined) fail(ctx, node, `The option "${key}" does not take a value.`);
    if (shape === "value" && value === undefined) fail(ctx, node, `The option "${key}" needs a value, like ${key}="…".`);
    options.set(key, value ?? true);
  }
  return options;
}

export function readCodeOptions(node: Code, ctx: MarkdownContext): CodeOptions {
  const lang = node.lang ?? "python";
  if (lang !== "python" && lang !== "output") {
    return fail(ctx, node, `Unsupported code block language "${lang}". Use python or output.`);
  }
  const options = parseMeta(node, lang, ctx);
  if (lang === "output") {
    const label = options.get("label");
    return { kind: "output", label: typeof label === "string" ? label : undefined, static: options.has("static") };
  }
  const run = options.get("run");
  const input = options.get("input");
  const hidden = options.has("hidden");
  const error = options.has("error");
  if (run === undefined && (hidden || error || input !== undefined)) {
    fail(ctx, node, `"hidden", "error" and "input" only work together with "run".`);
  }
  return {
    kind: "python",
    run: run === undefined ? undefined : run === true ? DEFAULT_LABELS[ctx.language].run : run,
    hidden,
    error,
    inputs: typeof input === "string" ? input.split(INPUT_SEPARATOR) : [],
  };
}

export function parseMarkdown(body: string): Root {
  return processor.parse(body);
}

function outputBlocks(node: Code, label: string | undefined, ctx: MarkdownContext): ContentBlock[] {
  const text = label ?? DEFAULT_LABELS[ctx.language].output;
  const code: ContentBlock = { type: "code", text: node.value, language: "python" };
  return text === "" ? [code] : [{ type: "paragraph", text: escapeHtml(text) }, code];
}

function tableBlock(node: Table, ctx: MarkdownContext): Extract<ContentBlock, { type: "table" }> {
  const [head, ...body] = node.children;
  const cells = (row: Table["children"][number]) => row.children.map((cell) => renderInline(cell.children, ctx));
  return { type: "table", headers: head ? cells(head) : [], rows: body.map(cells) };
}

function directiveBlocks(node: ContainerDirective, ctx: MarkdownContext): ContentBlock[] {
  if (hasAttributes(node)) fail(ctx, node, `Blocks like ":::${node.name}" do not accept {…} attributes.`);
  const [first, ...rest] = node.children;
  const labelled = first?.type === "paragraph" && first.data?.directiveLabel === true;
  const label = labelled ? renderInline(first.children, ctx) : undefined;
  const body = labelled ? rest : node.children;

  switch (node.name) {
    case "note":
    case "tip": {
      const paragraphs = body.map((child) =>
        child.type === "paragraph"
          ? renderInline(child.children, ctx)
          : fail(ctx, child, `Only text is allowed inside ":::${node.name}".`),
      );
      if (paragraphs.length === 0) fail(ctx, node, `":::${node.name}" is empty.`);
      const text = paragraphs.join("<br><br>");
      return [{ type: node.name, text: label === undefined ? text : `<strong>${label}</strong><br>${text}` }];
    }
    case "details":
      if (label === undefined) fail(ctx, node, `":::details" needs a title, like :::details[Ver solución].`);
      return [{ type: "collapsible", title: label, content: convertBlocks(body, ctx) }];
    case "table": {
      const [table, ...extra] = body;
      if (label === undefined) fail(ctx, node, `":::table" needs a title, like :::table[Operadores].`);
      if (table?.type !== "table" || extra.length > 0) {
        fail(ctx, node, `":::table" must contain exactly one table.`);
      }
      return [{ ...tableBlock(table, ctx), title: label }];
    }
    default:
      return fail(ctx, node, `Unknown block ":::${node.name}". Available blocks: note, tip, details, table.`);
  }
}

function convertBlock(node: RootContent, ctx: MarkdownContext): ContentBlock[] {
  switch (node.type) {
    case "heading": {
      const type = SUBTITLE_BY_DEPTH[node.depth];
      if (!type) fail(ctx, node, "Use ## to ##### for headings. The unit title goes in the frontmatter.");
      return [{ type, text: renderInline(node.children, ctx) }];
    }
    case "paragraph": {
      const [only, ...rest] = node.children;
      if (only?.type === "image" && rest.length === 0) {
        return [only.alt ? { type: "image", src: only.url, caption: only.alt } : { type: "image", src: only.url }];
      }
      return [{ type: "paragraph", text: renderInline(node.children, ctx) }];
    }
    case "list": {
      if (node.ordered) fail(ctx, node, `Numbered lists are not supported. Start each item with "- ".`);
      const items = node.children.map((item) => {
        const [paragraph, ...rest] = item.children;
        if (typeof item.checked === "boolean") fail(ctx, item, "Checklist items are not supported.");
        if (paragraph?.type !== "paragraph" || rest.length > 0) {
          fail(ctx, item, "Each list item can only contain text.");
        }
        return renderInline(paragraph.children, ctx);
      });
      return [{ type: "list", items }];
    }
    case "table":
      return [tableBlock(node, ctx)];
    case "thematicBreak":
      return [{ type: "divider" }];
    case "containerDirective":
      return directiveBlocks(node, ctx);
    case "leafDirective":
      return fail(ctx, node, `Unknown line "::${node.name}". To start a line with a colon, escape it as "\\:".`);
    case "html":
      return fail(ctx, node, "Raw HTML blocks are not supported.");
    default:
      return fail(ctx, node, `Unsupported Markdown element "${node.type}".`);
  }
}

function convertBlocks(nodes: readonly RootContent[], ctx: MarkdownContext): ContentBlock[] {
  const blocks: ContentBlock[] = [];
  for (let index = 0; index < nodes.length; index++) {
    const node = nodes[index];
    if (!node) continue;
    if (node.type !== "code") {
      blocks.push(...convertBlock(node, ctx));
      continue;
    }
    const options = readCodeOptions(node, ctx);
    if (options.kind === "output") {
      blocks.push(...outputBlocks(node, options.label, ctx));
      continue;
    }
    if (!options.hidden) blocks.push({ type: "code", text: node.value, language: "python" });
    if (options.run === undefined) continue;
    const next = nodes[index + 1];
    if (!options.hidden && next?.type === "code" && next.lang === "output") {
      const output = readCodeOptions(next, ctx);
      if (output.kind === "output") blocks.push(...outputBlocks(next, output.label, ctx));
      index++;
    }
    blocks.push({ type: "test-button", text: options.run, code: node.value });
  }
  return blocks;
}

export function compileMarkdown(body: string, ctx: MarkdownContext): ContentBlock[] {
  return convertBlocks(processor.parse(body).children, ctx);
}
