import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import type { ContentBlock, ModuleId, PathDocument, PathStep, UnitDocument, UnitId } from "../../src/content/types";
import { LANGUAGES, isLanguage, type Language } from "../../src/i18n/languages";
import { ContentError, ContentErrors } from "./errors";
import {
  readModuleMeta,
  readRoadmapMeta,
  readUnitMeta,
  readYamlFile,
  splitFrontmatter,
  type ModuleMeta,
  type RoadmapMeta,
  type UnitMeta,
} from "./frontmatter";
import { BASE_LANGUAGE, stepColor } from "./labels";
import { compileMarkdown } from "./markdown";

interface CompiledUnit {
  meta: UnitMeta;
  content: ContentBlock[] | null;
}

interface UnitEntry {
  id: UnitId;
  file: string;
  hasBaseFile: boolean;
  versions: Map<Language, CompiledUnit>;
}

interface ModuleEntry {
  id: ModuleId;
  file: string;
  versions: Map<Language, ModuleMeta>;
  units: UnitEntry[];
}

const MODULE_DIR = /^module\d+$/;
const LOCALIZED_FILE = /^(.+)\.([a-z]{2})\.(md|yml)$/;
const UNIT_NAME = /^learning-unit\d+$/;

function isIgnored(name: string): boolean {
  return name.startsWith(".") || name.startsWith("_") || name === "README.md";
}

function relative(root: string, file: string): string {
  return path.relative(path.dirname(root), file).split(path.sep).join("/");
}

function localized(name: string): { base: string; language: Language; extension: string } | null {
  const match = LOCALIZED_FILE.exec(name);
  if (!match) return null;
  const [, base = "", language, extension = ""] = match;
  return isLanguage(language) ? { base, language, extension } : null;
}

async function exists(target: string): Promise<boolean> {
  try {
    return (await stat(target)).isDirectory();
  } catch {
    return false;
  }
}

class Collector {
  readonly errors: ContentError[] = [];

  run<T>(task: () => T): T | undefined {
    try {
      return task();
    } catch (error) {
      if (error instanceof ContentError) {
        this.errors.push(error);
        return undefined;
      }
      throw error;
    }
  }

  report(message: string, file: string): void {
    this.errors.push(new ContentError(message, { file }));
  }
}

function compileUnit(source: string, file: string, language: Language): CompiledUnit {
  const { fields, body, lineOffset } = splitFrontmatter(source, file);
  const meta = readUnitMeta(fields, file, language, language === BASE_LANGUAGE);
  const content = body.trim() === "" ? null : compileMarkdown(body, { file, language, lineOffset });
  return { meta, content };
}

async function loadModule(dir: string, id: ModuleId, root: string, collector: Collector): Promise<ModuleEntry> {
  const entry: ModuleEntry = { id, file: relative(root, dir), versions: new Map(), units: [] };
  const units = new Map<UnitId, UnitEntry>();
  const names = (await readdir(dir)).sort();
  let hasBaseFile = false;

  for (const name of names) {
    if (isIgnored(name)) continue;
    const absolute = path.join(dir, name);
    const file = relative(root, absolute);
    const parts = localized(name);
    if (parts?.base === "module" && parts.extension === "yml") {
      if (parts.language === BASE_LANGUAGE) hasBaseFile = true;
      const source = await readFile(absolute, "utf8");
      const meta = collector.run(() =>
        readModuleMeta(readYamlFile(source, file), file, parts.language, parts.language === BASE_LANGUAGE),
      );
      if (meta) entry.versions.set(parts.language, meta);
      continue;
    }
    if (parts && UNIT_NAME.test(parts.base) && parts.extension === "md") {
      const unitId = parts.base as UnitId;
      const source = await readFile(absolute, "utf8");
      const compiled = collector.run(() => compileUnit(source, file, parts.language));
      const unit = units.get(unitId) ?? { id: unitId, file, hasBaseFile: false, versions: new Map() };
      if (parts.language === BASE_LANGUAGE) {
        unit.file = file;
        unit.hasBaseFile = true;
      }
      if (compiled) unit.versions.set(parts.language, compiled);
      units.set(unitId, unit);
      continue;
    }
    collector.report(
      "Unexpected file. Module folders only hold module.<lang>.yml and learning-unitN.<lang>.md files.",
      file,
    );
  }

  if (!hasBaseFile) {
    collector.report(`The module needs a module.${BASE_LANGUAGE}.yml file.`, entry.file);
  }
  for (const unit of units.values()) {
    if (!unit.hasBaseFile) {
      collector.report(`This translation has no ${unit.id}.${BASE_LANGUAGE}.md to translate from.`, unit.file);
    } else if (unit.versions.has(BASE_LANGUAGE)) {
      entry.units.push(unit);
    }
  }
  return entry;
}

function sortByOrder<T>(items: T[], order: (item: T) => number, file: (item: T) => string, collector: Collector): T[] {
  const sorted = [...items].sort((a, b) => order(a) - order(b));
  sorted.forEach((item, position) => {
    const previous = sorted[position - 1];
    if (previous !== undefined && order(previous) === order(item)) {
      collector.report(`"order: ${order(item)}" is also used by ${file(previous)}.`, file(item));
    }
  });
  return sorted;
}

function pick<T>(versions: Map<Language, T>, language: Language): T | undefined {
  return versions.get(language) ?? versions.get(BASE_LANGUAGE);
}

function moduleDocument(entry: ModuleEntry, position: number, meta: ModuleMeta, language: Language): PathDocument {
  return {
    title: `${position + 1}. ${meta.title}`,
    description: meta.description,
    steps: entry.units.flatMap((unit, index): PathStep[] => {
      const base = unit.versions.get(BASE_LANGUAGE);
      const version = pick(unit.versions, language);
      if (!base || !version) return [];
      const step: PathStep = {
        name: `${index + 1}. ${version.meta.title}`,
        description: version.meta.summary,
        color: stepColor(base.meta.color, index),
      };
      if (base.content) step.unit = unit.id;
      return [step];
    }),
  };
}

function roadmapDocument(meta: RoadmapMeta, modules: ModuleEntry[], language: Language): PathDocument {
  return {
    title: meta.title,
    description: meta.description,
    steps: modules.flatMap((entry, index): PathStep[] => {
      const base = entry.versions.get(BASE_LANGUAGE);
      const version = pick(entry.versions, language);
      if (!base || !version) return [];
      return [
        {
          name: `${index + 1}. ${version.title}`,
          description: version.description,
          color: stepColor(base.color, index),
          module: entry.id,
        },
      ];
    }),
  };
}

function redirects(modules: ModuleEntry[], collector: Collector): Record<string, string> {
  const units = new Set(modules.flatMap((entry) => entry.units.map((unit) => `${entry.id}/${unit.id}`)));
  const result: Record<string, string> = {};
  for (const entry of modules) {
    for (const unit of entry.units) {
      for (const alias of unit.versions.get(BASE_LANGUAGE)?.meta.aliases ?? []) {
        if (units.has(alias)) collector.report(`The alias ${alias} points to a unit that still exists.`, unit.file);
        else if (alias in result) collector.report(`The alias ${alias} is already used by ${result[alias]}.`, unit.file);
        else result[alias] = `${entry.id}/${unit.id}`;
      }
    }
  }
  return result;
}

export type ContentFiles = Map<string, string>;

export async function buildContent(root: string): Promise<ContentFiles> {
  const files: ContentFiles = new Map();
  if (!(await exists(root))) return files;

  const collector = new Collector();
  const roadmaps = new Map<Language, RoadmapMeta>();
  const loaded: ModuleEntry[] = [];

  for (const name of (await readdir(root)).sort()) {
    if (isIgnored(name)) continue;
    const absolute = path.join(root, name);
    const file = relative(root, absolute);
    const parts = localized(name);
    if (parts?.base === "roadmap" && parts.extension === "yml") {
      const source = await readFile(absolute, "utf8");
      const meta = collector.run(() => readRoadmapMeta(readYamlFile(source, file), file, parts.language));
      if (meta) roadmaps.set(parts.language, meta);
    } else if (MODULE_DIR.test(name) && (await exists(absolute))) {
      loaded.push(await loadModule(absolute, name as ModuleId, root, collector));
    } else {
      collector.report("Unexpected file. The content folder only holds roadmap.<lang>.yml and moduleN folders.", file);
    }
  }

  if (roadmaps.size > 0 && !roadmaps.has(BASE_LANGUAGE)) {
    collector.report(`The roadmap needs a roadmap.${BASE_LANGUAGE}.yml file.`, relative(root, root));
  }

  const modules = sortByOrder(
    loaded.filter((entry) => entry.versions.has(BASE_LANGUAGE)),
    (entry) => entry.versions.get(BASE_LANGUAGE)?.order ?? 0,
    (entry) => `${entry.file}/module.${BASE_LANGUAGE}.yml`,
    collector,
  );
  for (const entry of modules) {
    entry.units = sortByOrder(
      entry.units,
      (unit) => unit.versions.get(BASE_LANGUAGE)?.meta.order ?? 0,
      (unit) => unit.file,
      collector,
    );
  }
  const aliasMap = redirects(modules, collector);

  if (collector.errors.length > 0) throw new ContentErrors(collector.errors);

  const write = (target: string, document: unknown) => files.set(`data/${target}`, JSON.stringify(document));

  for (const language of LANGUAGES) {
    const roadmap = roadmaps.get(language);
    if (roadmap) write(`roadmap/roadmap-${language}.json`, roadmapDocument(roadmap, modules, language));

    modules.forEach((entry, position) => {
      const meta = entry.versions.get(language);
      if (meta) write(`modules/${entry.id}/${entry.id}-${language}.json`, moduleDocument(entry, position, meta, language));

      for (const unit of entry.units) {
        const version = unit.versions.get(language);
        if (!version?.content) continue;
        const document: UnitDocument = {
          title: version.meta.title,
          description: version.meta.description,
          content: version.content,
        };
        write(`modules/${entry.id}/learning-units/${unit.id}/${unit.id}-${language}.json`, document);
      }
    });
  }
  write("redirects.json", aliasMap);
  return files;
}
