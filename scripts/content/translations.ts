import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { parseDocument } from "yaml";
import type { Language } from "../../src/i18n/languages";
import { ContentError } from "./errors";
import { FRONTMATTER, normalizeNewlines } from "./frontmatter";
import { analyzeContent, type TranslationState, type TranslationStatus } from "./project";

export interface StampOptions {
  files?: readonly string[] | undefined;
  untracked?: boolean | undefined;
}

export interface StampResult {
  stamped: string[];
  skipped: { file: string; reason: string }[];
}

function writeSource(yamlText: string, value: string, file: string): string {
  const document = parseDocument(yamlText);
  const [error] = document.errors;
  if (error) throw new ContentError(error.message.split("\n")[0] ?? error.message, { file });
  document.set("source", value);
  return document.toString({ lineWidth: 0 });
}

export function setSourceField(source: string, file: string, value: string): string {
  const text = normalizeNewlines(source);
  if (file.endsWith(".yml")) return writeSource(text, value, file);
  const match = FRONTMATTER.exec(text);
  if (!match) throw new ContentError("The file must start with a header between two --- lines.", { file, line: 1 });
  return `---\n${writeSource(match[1] ?? "", value, file)}---\n${text.slice(match[0].length)}`;
}

export async function stampTranslations(root: string, { files = [], untracked = false }: StampOptions): Promise<StampResult> {
  const { translations } = await analyzeContent(root);
  const parent = path.dirname(root);
  const byFile = new Map(translations.map((status) => [status.file, status]));
  const targets = new Map<string, TranslationStatus>();
  const skipped: StampResult["skipped"] = [];

  for (const requested of files) {
    const absolute = path.resolve(requested);
    const inside = path.relative(root, absolute);
    if (inside === "" || inside.startsWith("..") || path.isAbsolute(inside)) {
      skipped.push({ file: requested, reason: "is outside the content folder" });
      continue;
    }
    const key = path.relative(parent, absolute).split(path.sep).join("/");
    const status = byFile.get(key);
    if (!status) skipped.push({ file: key, reason: "is not a translation (the Spanish files are the source)" });
    else if (status.state === "missing") skipped.push({ file: key, reason: "does not exist yet" });
    else targets.set(key, status);
  }
  if (untracked) {
    for (const status of translations) if (status.state === "untracked") targets.set(status.file, status);
  }

  const stamped: string[] = [];
  for (const status of targets.values()) {
    const absolute = path.join(parent, status.file);
    const text = await readFile(absolute, "utf8");
    const updated = setSourceField(text, status.file, status.fingerprint);
    if (updated !== text) await writeFile(absolute, updated);
    stamped.push(status.file);
  }
  return { stamped, skipped };
}

export type TranslationSummary = Record<Language, Record<TranslationState, string[]>>;

export function summarize(translations: readonly TranslationStatus[]): Partial<TranslationSummary> {
  const summary: Partial<TranslationSummary> = {};
  for (const status of translations) {
    const groups = (summary[status.language] ??= { current: [], outdated: [], untracked: [], missing: [] });
    groups[status.state].push(status.file);
  }
  return summary;
}

export function translationWarnings(translations: readonly TranslationStatus[]): string[] {
  const outdated = translations.filter((status) => status.state === "outdated");
  const untracked = translations.filter((status) => status.state === "untracked");
  const warnings: string[] = [];
  if (outdated.length > 0) {
    warnings.push(
      `${outdated.length} ${outdated.length === 1 ? "translation is" : "translations are"} older than the Spanish text:\n${outdated.map((status) => `  ${status.file}`).join("\n")}`,
    );
  }
  if (untracked.length > 0) {
    warnings.push(`${untracked.length} ${untracked.length === 1 ? "translation has" : "translations have"} no source fingerprint yet.`);
  }
  if (warnings.length > 0) warnings.push("Run npm run content:translations for details.");
  return warnings;
}
