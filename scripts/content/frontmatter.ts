import { parse, YAMLParseError } from "yaml";
import type { Language } from "../../src/i18n/languages";
import { ContentError } from "./errors";
import { renderInlineMarkdown, type MarkdownContext } from "./markdown";

export const FRONTMATTER = /^---\n([\s\S]*?)\n---(?:\n|$)/;
const HEX_COLOR = /^#[0-9a-f]{6}$/i;
const UNIT_PATH = /^module\d+\/learning-unit\d+$/;
export const FINGERPRINT = /^[0-9a-f]{12}$/;

type Fields = Record<string, unknown>;

export interface UnitMeta {
  title: string;
  summary: string;
  description: string;
  order?: number | undefined;
  color?: string | undefined;
  aliases: string[];
  source?: string | undefined;
}

export interface ModuleMeta {
  title: string;
  description: string;
  order?: number | undefined;
  color?: string | undefined;
  source?: string | undefined;
}

export interface RoadmapMeta {
  title: string;
  description: string;
  source?: string | undefined;
}

export function normalizeNewlines(source: string): string {
  return source.replace(/\r\n?/g, "\n");
}

function parseYaml(text: string, file: string, firstLine: number): Fields {
  let data: unknown;
  try {
    data = parse(text);
  } catch (error) {
    if (error instanceof YAMLParseError) {
      const position = error.linePos?.[0];
      throw new ContentError(error.message.split("\n")[0] ?? error.message, {
        file,
        line: position ? position.line + firstLine - 1 : undefined,
        column: position?.col,
      });
    }
    throw error;
  }
  if (data === null || data === undefined) return {};
  if (typeof data !== "object" || Array.isArray(data)) {
    throw new ContentError("The header must be a list of fields like title: …", { file, line: firstLine });
  }
  return data as Fields;
}

export function splitFrontmatter(source: string, file: string): { fields: Fields; body: string; lineOffset: number } {
  const text = normalizeNewlines(source);
  const match = FRONTMATTER.exec(text);
  if (!match) {
    throw new ContentError("The file must start with a header between two --- lines.", { file, line: 1 });
  }
  return {
    fields: parseYaml(match[1] ?? "", file, 2),
    body: text.slice(match[0].length),
    lineOffset: match[0].split("\n").length - 1,
  };
}

export function readYamlFile(source: string, file: string): Fields {
  return parseYaml(normalizeNewlines(source), file, 1);
}

class FieldReader {
  readonly #fields: Fields;
  readonly #ctx: MarkdownContext;
  readonly #used = new Set<string>();

  constructor(fields: Fields, ctx: MarkdownContext) {
    this.#fields = fields;
    this.#ctx = ctx;
  }

  #fail(message: string): never {
    throw new ContentError(message, { file: this.#ctx.file });
  }

  #take(key: string): unknown {
    this.#used.add(key);
    return this.#fields[key];
  }

  text(key: string, required: boolean): string {
    const value = this.#take(key);
    if (value === undefined || value === null) {
      if (required) this.#fail(`The header needs a "${key}" field.`);
      return "";
    }
    if (typeof value !== "string" && typeof value !== "number") this.#fail(`"${key}" must be text.`);
    const rendered = renderInlineMarkdown(String(value).trim(), this.#ctx);
    if (required && rendered === "") this.#fail(`"${key}" cannot be empty.`);
    return rendered;
  }

  order(allowed: boolean): number | undefined {
    const value = this.#take("order");
    if (!allowed) {
      if (value !== undefined) this.#fail(`"order" only goes in the Spanish file.`);
      return undefined;
    }
    if (typeof value !== "number" || !Number.isInteger(value) || value < 1) {
      this.#fail(`The header needs an "order" field with a whole number from 1 upwards.`);
    }
    return value;
  }

  color(allowed: boolean): string | undefined {
    const value = this.#take("color");
    if (value === undefined) return undefined;
    if (!allowed) this.#fail(`"color" only goes in the Spanish file.`);
    if (typeof value !== "string" || !HEX_COLOR.test(value)) this.#fail(`"color" must look like "#3776AB".`);
    return value;
  }

  aliases(allowed: boolean): string[] {
    const value = this.#take("aliases");
    if (value === undefined) return [];
    if (!allowed) this.#fail(`"aliases" only goes in the Spanish file.`);
    if (!Array.isArray(value) || !value.every((item) => typeof item === "string" && UNIT_PATH.test(item))) {
      this.#fail(`"aliases" must be a list like [module6/learning-unit2].`);
    }
    return value as string[];
  }

  source(allowed: boolean): string | undefined {
    const value = this.#take("source");
    if (value === undefined) return undefined;
    if (!allowed) this.#fail(`"source" only goes in translations. The Spanish file is the source.`);
    if (typeof value !== "string" || !FINGERPRINT.test(value)) {
      this.#fail(`"source" must be the 12-character fingerprint written by npm run content:translations.`);
    }
    return value;
  }

  finish(): void {
    const unknown = Object.keys(this.#fields).filter((key) => !this.#used.has(key));
    if (unknown.length > 0) this.#fail(`Unknown header field "${unknown.join('", "')}".`);
  }
}

function context(file: string, language: Language): MarkdownContext {
  return { file, language, lineOffset: 0 };
}

export function readUnitMeta(fields: Fields, file: string, language: Language, isBase: boolean): UnitMeta {
  const reader = new FieldReader(fields, context(file, language));
  const meta: UnitMeta = {
    title: reader.text("title", true),
    summary: reader.text("summary", false),
    description: reader.text("description", false),
    order: reader.order(isBase),
    color: reader.color(isBase),
    aliases: reader.aliases(isBase),
    source: reader.source(!isBase),
  };
  reader.finish();
  return meta;
}

export function readModuleMeta(fields: Fields, file: string, language: Language, isBase: boolean): ModuleMeta {
  const reader = new FieldReader(fields, context(file, language));
  const meta: ModuleMeta = {
    title: reader.text("title", true),
    description: reader.text("description", false),
    order: reader.order(isBase),
    color: reader.color(isBase),
    source: reader.source(!isBase),
  };
  reader.finish();
  return meta;
}

export function readRoadmapMeta(fields: Fields, file: string, language: Language, isBase: boolean): RoadmapMeta {
  const reader = new FieldReader(fields, context(file, language));
  const meta: RoadmapMeta = {
    title: reader.text("title", true),
    description: reader.text("description", false),
    source: reader.source(!isBase),
  };
  reader.finish();
  return meta;
}
