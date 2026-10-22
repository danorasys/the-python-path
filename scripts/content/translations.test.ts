import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { ContentErrors } from "./errors";
import { analyzeContent } from "./project";
import { setSourceField, stampTranslations, summarize, translationWarnings } from "./translations";

let bases: string[] = [];

async function contentTree(files: Record<string, string>): Promise<string> {
  const base = await mkdtemp(path.join(tmpdir(), "tpp-translations-"));
  bases.push(base);
  const root = path.join(base, "content");
  await write(root, files);
  return root;
}

async function write(root: string, files: Record<string, string>) {
  for (const [name, source] of Object.entries(files)) {
    const target = path.join(root, name);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, source);
  }
}

const unit = (header: string, body = "") => `---\n${header}\n---\n\n${body}\n`;

const TREE = {
  "roadmap.es.yml": "title: Ruta",
  "roadmap.en.yml": "title: Roadmap",
  "module1/module.es.yml": "title: Fundamentos\norder: 1",
  "module1/module.en.yml": "title: Fundamentals",
  "module1/learning-unit1.es.md": unit("title: Listas\nsummary: Datos en orden\norder: 1", "Una lista guarda **varios** valores."),
  "module1/learning-unit1.en.md": unit("title: Lists\nsummary: Ordered data", "A list stores **several** values."),
  "module1/learning-unit2.es.md": unit("title: Tuplas\nsummary: Datos fijos\norder: 2", "Una tupla no cambia."),
  "module1/learning-unit2.en.md": unit("title: Tuples\nsummary: Fixed data"),
  "module1/learning-unit3.es.md": unit("title: Conjuntos\norder: 3", "Sin repetidos."),
};

async function states(root: string) {
  const { translations } = await analyzeContent(root);
  return Object.fromEntries(translations.map((status) => [status.file.replace("content/", ""), status.state]));
}

afterEach(async () => {
  await Promise.all(bases.map((base) => rm(base, { recursive: true, force: true })));
  bases = [];
});

describe("translation status", () => {
  it("starts untracked and reports missing translations", async () => {
    const root = await contentTree(TREE);
    expect(await states(root)).toEqual({
      "roadmap.en.yml": "untracked",
      "module1/module.en.yml": "untracked",
      "module1/learning-unit1.en.md": "untracked",
      "module1/learning-unit2.en.md": "untracked",
      "module1/learning-unit3.en.md": "missing",
      "roadmap.de.yml": "missing",
      "module1/module.de.yml": "missing",
      "module1/learning-unit1.de.md": "missing",
      "module1/learning-unit2.de.md": "missing",
      "module1/learning-unit3.de.md": "missing",
    });
  });

  it("is up to date after stamping and goes out of date when the Spanish text changes", async () => {
    const root = await contentTree(TREE);
    await stampTranslations(root, { untracked: true });
    expect(Object.values(await states(root)).filter((state) => state !== "missing")).toEqual(Array(4).fill("current"));

    await write(root, {
      "module1/learning-unit1.es.md": unit("title: Listas\nsummary: Datos en orden\norder: 1", "Una lista guarda **muchos** valores."),
    });
    expect(await states(root)).toMatchObject({
      "module1/learning-unit1.en.md": "outdated",
      "module1/learning-unit2.en.md": "current",
    });
  });

  it("ignores changes that do not alter the text, like formatting or order", async () => {
    const root = await contentTree(TREE);
    await stampTranslations(root, { untracked: true });
    await write(root, {
      "module1/learning-unit1.es.md": unit("order: 1\nsummary:   Datos en orden\ntitle: Listas", "Una lista guarda\n__varios__ valores."),
    });
    expect((await states(root))["module1/learning-unit1.en.md"]).toBe("current");
  });

  it("compares header-only translations with the Spanish header only", async () => {
    const root = await contentTree(TREE);
    await stampTranslations(root, { untracked: true });
    await write(root, { "module1/learning-unit2.es.md": unit("title: Tuplas\nsummary: Datos fijos\norder: 2", "Otro texto.") });
    expect((await states(root))["module1/learning-unit2.en.md"]).toBe("current");
    await write(root, { "module1/learning-unit2.es.md": unit("title: Tuplas\nsummary: Datos que no cambian\norder: 2") });
    expect((await states(root))["module1/learning-unit2.en.md"]).toBe("outdated");
  });

  it("only accepts a valid fingerprint, and only in translations", async () => {
    const root = await contentTree({
      ...TREE,
      "module1/learning-unit1.es.md": unit("title: Listas\norder: 1\nsource: abcdefabcdef", "x"),
      "module1/learning-unit2.en.md": unit("title: Tuples\nsource: nope"),
    });
    const error = await analyzeContent(root).catch((caught: unknown) => caught);
    expect(error).toBeInstanceOf(ContentErrors);
    expect((error as ContentErrors).errors.map((item) => item.message)).toEqual([
      expect.stringContaining('"source" only goes in translations'),
      expect.stringContaining("12-character fingerprint"),
    ]);
  });
});

describe("stampTranslations", () => {
  it("writes the fingerprint without touching the rest of the file", async () => {
    const root = await contentTree(TREE);
    const result = await stampTranslations(root, { files: [path.join(root, "module1/learning-unit1.en.md")] });
    expect(result).toEqual({ stamped: ["content/module1/learning-unit1.en.md"], skipped: [] });
    const text = await readFile(path.join(root, "module1/learning-unit1.en.md"), "utf8");
    expect(text).toMatch(/^---\ntitle: Lists\nsummary: Ordered data\nsource: [0-9a-f]{12}\n---\n\nA list stores \*\*several\*\* values\.\n$/);
  });

  it("refuses files outside the content folder and Spanish sources", async () => {
    const root = await contentTree(TREE);
    const result = await stampTranslations(root, {
      files: [path.join(root, "..", "package.json"), path.join(root, "module1/learning-unit1.es.md"), path.join(root, "module1/learning-unit3.en.md")],
    });
    expect(result.stamped).toEqual([]);
    expect(result.skipped.map((item) => item.reason)).toEqual([
      "is outside the content folder",
      "is not a translation (the Spanish files are the source)",
      "does not exist yet",
    ]);
  });

  it("never stamps outdated translations in bulk", async () => {
    const root = await contentTree(TREE);
    await stampTranslations(root, { untracked: true });
    await write(root, { "module1/learning-unit1.es.md": unit("title: Listas nuevas\nsummary: Datos en orden\norder: 1", "x") });
    expect((await stampTranslations(root, { untracked: true })).stamped).toEqual([]);
    expect((await states(root))["module1/learning-unit1.en.md"]).toBe("outdated");
  });
});

describe("setSourceField", () => {
  it("adds or replaces the field in Markdown and YAML files", () => {
    expect(setSourceField("---\ntitle: Lists\n---\n\nBody\n", "x.en.md", "aaaaaaaaaaaa")).toBe(
      "---\ntitle: Lists\nsource: aaaaaaaaaaaa\n---\n\nBody\n",
    );
    expect(setSourceField("title: Fundamentals\nsource: aaaaaaaaaaaa\n", "module.en.yml", "bbbbbbbbbbbb")).toBe(
      "title: Fundamentals\nsource: bbbbbbbbbbbb\n",
    );
  });
});

describe("summaries and warnings", () => {
  it("groups by language and warns about pending translations", async () => {
    const root = await contentTree(TREE);
    const { translations } = await analyzeContent(root);
    expect(summarize(translations).en?.untracked).toHaveLength(4);
    expect(translationWarnings(translations)).toEqual([
      "4 translations have no source fingerprint yet.",
      "Run npm run content:translations for details.",
    ]);
    await stampTranslations(root, { untracked: true });
    expect(translationWarnings((await analyzeContent(root)).translations)).toEqual([]);
  });
});
