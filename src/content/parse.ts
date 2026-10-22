import type {
  ContentBlock,
  ModuleId,
  PathDocument,
  PathStep,
  Question,
  QuestionOption,
  Redirects,
  TextBlockType,
  UnitAddress,
  UnitDocument,
  UnitId,
} from "./types";

const MODULE_ID = /^module\d+$/;
const UNIT_ID = /^learning-unit\d+$/;
const HEX_COLOR = /^#[0-9a-f]{6}$/i;
const UNSAFE_URL = /^\s*(javascript|vbscript|data):/i;

export const DEFAULT_STEP_COLOR = "#FFD43B";

const TEXT_BLOCK_TYPES = new Set<TextBlockType>([
  "subtitle1",
  "subtitle2",
  "subtitle3",
  "subtitle4",
  "paragraph",
  "note",
  "tip",
]);

type JsonObject = Record<string, unknown>;

function isObject(value: unknown): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asText(value: unknown, fallback = ""): string {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  return fallback;
}

function asTextList(value: unknown): string[] {
  return Array.isArray(value) ? value.map((item) => asText(item)) : [];
}

export function isModuleId(value: unknown): value is ModuleId {
  return typeof value === "string" && MODULE_ID.test(value);
}

export function isUnitId(value: unknown): value is UnitId {
  return typeof value === "string" && UNIT_ID.test(value);
}

function invalid(what: string): never {
  throw new TypeError(`Invalid ${what} document`);
}

function parseStep(raw: JsonObject): PathStep {
  const color = asText(raw.color);
  const step: PathStep = {
    name: asText(raw.name),
    description: asText(raw.description),
    color: HEX_COLOR.test(color) ? color : DEFAULT_STEP_COLOR,
  };
  if (isModuleId(raw.module)) step.module = raw.module;
  if (isUnitId(raw.unit)) step.unit = raw.unit;
  return step;
}

export function parsePathDocument(raw: unknown): PathDocument {
  if (!isObject(raw) || !Array.isArray(raw.steps)) invalid("path");
  return {
    title: asText(raw.title),
    description: asText(raw.description),
    steps: raw.steps.filter(isObject).map(parseStep),
  };
}

function parseBlock(raw: unknown): ContentBlock | null {
  if (!isObject(raw)) return null;
  const type = asText(raw.type);

  if (TEXT_BLOCK_TYPES.has(type as TextBlockType)) {
    return { type: type as TextBlockType, text: asText(raw.text) };
  }

  switch (type) {
    case "list":
      return { type, items: asTextList(raw.items) };
    case "code":
      return { type, text: asText(raw.text), language: asText(raw.language, "python") };
    case "test-button":
      return { type, text: asText(raw.text), code: asText(raw.code) };
    case "image": {
      const src = asText(raw.src);
      if (!src || UNSAFE_URL.test(src)) return null;
      const caption = asText(raw.caption);
      return caption ? { type, src, caption } : { type, src };
    }
    case "divider":
      return { type };
    case "collapsible":
      return { type, title: asText(raw.title), content: parseBlocks(raw.content) };
    case "table": {
      const rows = Array.isArray(raw.rows) ? raw.rows.map(asTextList) : [];
      const table = { type, headers: asTextList(raw.headers), rows } as const;
      const title = asText(raw.title);
      return title ? { ...table, title } : table;
    }
    default:
      console.warn(`[content] Skipping unknown block type "${type}".`);
      return null;
  }
}

export function parseBlocks(raw: unknown): ContentBlock[] {
  if (!Array.isArray(raw)) return [];
  return raw.map(parseBlock).filter((block): block is ContentBlock => block !== null);
}

export function parseUnitDocument(raw: unknown): UnitDocument {
  if (!isObject(raw) || !Array.isArray(raw.content)) invalid("unit");
  return {
    title: asText(raw.title),
    description: asText(raw.description),
    content: parseBlocks(raw.content),
  };
}

function parseOption(raw: JsonObject): QuestionOption {
  return { label: asText(raw.label), text: asText(raw.text), correct: raw.correct === true };
}

function parseQuestion(raw: unknown): Question | null {
  if (!isObject(raw)) return null;
  const type = raw.type;
  if (type !== "multiple-choice" && type !== "true-false") return null;
  const options = Array.isArray(raw.options) ? raw.options.filter(isObject).map(parseOption) : [];
  if (!options.some((option) => option.correct)) return null;
  return {
    id: typeof raw.id === "number" ? raw.id : 0,
    type,
    content: parseBlocks(raw.content),
    options,
  };
}

export function parseQuestionSet(raw: unknown): Question[] {
  if (!isObject(raw) || !Array.isArray(raw.questions)) invalid("question set");
  return raw.questions.map(parseQuestion).filter((q): q is Question => q !== null);
}

function parseUnitAddress(value: unknown): UnitAddress | null {
  if (typeof value !== "string") return null;
  const [module, unit, ...rest] = value.split("/");
  return isModuleId(module) && isUnitId(unit) && rest.length === 0 ? { module, unit } : null;
}

export function parseRedirects(raw: unknown): Redirects {
  if (!isObject(raw)) invalid("redirects");
  const redirects: Redirects = {};
  for (const [from, to] of Object.entries(raw)) {
    const target = parseUnitAddress(to);
    if (target && parseUnitAddress(from)) redirects[from] = target;
  }
  return redirects;
}

export function parseQuestionConfig(raw: unknown): { questionSets: number } {
  if (!isObject(raw)) invalid("question config");
  const sets = raw.question_sets;
  return { questionSets: typeof sets === "number" && sets > 0 ? Math.floor(sets) : 0 };
}
