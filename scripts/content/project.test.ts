import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { ContentErrors } from "./errors";
import { buildContent } from "./project";

let roots: string[] = [];

async function contentTree(files: Record<string, string>): Promise<string> {
  const base = await mkdtemp(path.join(tmpdir(), "tpp-content-"));
  roots.push(base);
  const root = path.join(base, "content");
  for (const [name, source] of Object.entries(files)) {
    const target = path.join(root, name);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, source);
  }
  return root;
}

const unit = (header: string, body = "Texto de la unidad.") => `---\n${header}\n---\n\n${body}\n`;

async function built(files: Record<string, string>) {
  const output = await buildContent(await contentTree(files));
  return (target: string): unknown => {
    const json = output.get(`data/${target}`);
    return json === undefined ? undefined : JSON.parse(json);
  };
}

async function failures(files: Record<string, string>): Promise<string[]> {
  try {
    await buildContent(await contentTree(files));
  } catch (error) {
    if (error instanceof ContentErrors) return error.errors.map((item) => item.message);
    throw error;
  }
  throw new Error("Expected content errors");
}

afterEach(async () => {
  await Promise.all(roots.map((root) => rm(root, { recursive: true, force: true })));
  roots = [];
});

describe("buildContent", () => {
  it("returns nothing when there is no content folder", async () => {
    const output = await buildContent(path.join(tmpdir(), "tpp-missing-content-folder"));
    expect(output.size).toBe(0);
  });

  it("numbers modules and units by their order and fills in colours", async () => {
    const read = await built({
      "roadmap.es.yml": "title: Ruta\ndescription: Aprende Python",
      "module2/module.es.yml": "title: Control de flujo\norder: 2",
      "module1/module.es.yml": "title: Fundamentos\ndescription: Lo básico\norder: 1\ncolor: '#123456'",
      "module1/learning-unit9.es.md": unit("title: Variables\nsummary: Guardar datos\norder: 2"),
      "module1/learning-unit1.es.md": unit("title: Qué es Python\norder: 1\ncolor: '#ABCDEF'"),
    });

    expect(read("roadmap/roadmap-es.json")).toEqual({
      title: "Ruta",
      description: "Aprende Python",
      steps: [
        { name: "1. Fundamentos", description: "Lo básico", color: "#123456", module: "module1" },
        { name: "2. Control de flujo", description: "", color: "#3776AB", module: "module2" },
      ],
    });
    expect(read("modules/module1/module1-es.json")).toEqual({
      title: "1. Fundamentos",
      description: "Lo básico",
      steps: [
        { name: "1. Qué es Python", description: "", color: "#ABCDEF", unit: "learning-unit1" },
        { name: "2. Variables", description: "Guardar datos", color: "#3776AB", unit: "learning-unit9" },
      ],
    });
    expect(read("modules/module1/learning-units/learning-unit9/learning-unit9-es.json")).toEqual({
      title: "Variables",
      description: "",
      content: [{ type: "paragraph", text: "Texto de la unidad." }],
    });
    expect(read("redirects.json")).toEqual({});
  });

  it("lists units without content as not yet available", async () => {
    const read = await built({
      "module7/module.es.yml": "title: Errores\norder: 1",
      "module7/learning-unit3.es.md": unit("title: Uso de finally\norder: 1", ""),
    });
    expect(read("modules/module7/module7-es.json")).toEqual({
      title: "1. Errores",
      description: "",
      steps: [{ name: "1. Uso de finally", description: "", color: "#FFD43B" }],
    });
    expect(read("modules/module7/learning-units/learning-unit3/learning-unit3-es.json")).toBeUndefined();
  });

  it("uses translations where they exist and Spanish where they do not", async () => {
    const read = await built({
      "roadmap.es.yml": "title: Ruta",
      "roadmap.en.yml": "title: Roadmap",
      "module1/module.es.yml": "title: Fundamentos\norder: 1",
      "module1/module.en.yml": "title: Fundamentals",
      "module1/learning-unit1.es.md": unit("title: Listas\norder: 1"),
      "module1/learning-unit1.en.md": unit("title: Lists\nsummary: Ordered data", ""),
      "module1/learning-unit2.es.md": unit("title: Tuplas\norder: 2"),
      "module2/module.es.yml": "title: Control\norder: 2",
    });

    expect(read("roadmap/roadmap-en.json")).toMatchObject({
      title: "Roadmap",
      steps: [{ name: "1. Fundamentals" }, { name: "2. Control" }],
    });
    expect(read("modules/module1/module1-en.json")).toMatchObject({
      title: "1. Fundamentals",
      steps: [
        { name: "1. Lists", description: "Ordered data", unit: "learning-unit1" },
        { name: "2. Tuplas", unit: "learning-unit2" },
      ],
    });
    expect(read("modules/module2/module2-en.json")).toBeUndefined();
    expect(read("modules/module1/learning-units/learning-unit1/learning-unit1-en.json")).toBeUndefined();
    expect(read("roadmap/roadmap-de.json")).toBeUndefined();
  });

  it("writes redirects for units that moved", async () => {
    const read = await built({
      "module3/module.es.yml": "title: Estructuras\norder: 1",
      "module3/learning-unit9.es.md": unit("title: Comprehensions\norder: 1\naliases: [module6/learning-unit2]"),
    });
    expect(read("redirects.json")).toEqual({ "module6/learning-unit2": "module3/learning-unit9" });
  });

  it("reports every problem with the file it comes from", async () => {
    const messages = await failures({
      "notes.txt": "",
      "module1/module.es.yml": "title: Fundamentos\norder: 1",
      "module1/learning-unit1.es.md": unit("title: A\norder: 1"),
      "module1/learning-unit2.es.md": unit("title: B\norder: 1"),
      "module1/learning-unit3.en.md": unit("title: C"),
      "module1/learning-unit4.es.md": unit("title: D\norder: 4\nlevel: easy"),
      "module1/learning-unit5.es.md": unit("title: E\norder: 5", "# Mal"),
      "module1/learning-unit1.en.md": unit("title: A\norder: 1"),
      "module2/learning-unit1.es.md": unit("title: F\norder: 1"),
    });

    expect(messages).toEqual(
      expect.arrayContaining([
        expect.stringMatching(/^content\/notes\.txt: Unexpected file/),
        expect.stringMatching(/^content\/module1\/learning-unit2\.es\.md: "order: 1" is also used by/),
        expect.stringMatching(/^content\/module1\/learning-unit3\.en\.md: This translation has no/),
        expect.stringMatching(/^content\/module1\/learning-unit4\.es\.md: Unknown header field "level"/),
        expect.stringMatching(/^content\/module1\/learning-unit5\.es\.md:6:1: Use ## to #####/),
        expect.stringMatching(/^content\/module1\/learning-unit1\.en\.md: "order" only goes in the Spanish file/),
        expect.stringMatching(/^content\/module2: The module needs a module\.es\.yml file/),
      ]),
    );
    expect(messages).toHaveLength(7);
  });

  it("rejects aliases that collide with real units", async () => {
    const messages = await failures({
      "module1/module.es.yml": "title: Fundamentos\norder: 1",
      "module1/learning-unit1.es.md": unit("title: A\norder: 1\naliases: [module1/learning-unit2]"),
      "module1/learning-unit2.es.md": unit("title: B\norder: 2"),
    });
    expect(messages).toEqual([expect.stringContaining("points to a unit that still exists")]);
  });

  it("reports header problems with a line number", async () => {
    const messages = await failures({
      "module1/module.es.yml": "title: Fundamentos\norder: 1",
      "module1/learning-unit1.es.md": "---\ntitle: A\norder: [1\n---\n",
    });
    expect(messages).toEqual([expect.stringMatching(/^content\/module1\/learning-unit1\.es\.md:\d+:\d+: /)]);
  });

  it("requires a header and an order in Spanish files", async () => {
    const messages = await failures({
      "module1/module.es.yml": "title: Fundamentos",
      "module1/learning-unit1.es.md": "Sin cabecera",
    });
    expect(messages).toEqual(
      expect.arrayContaining([
        expect.stringContaining('needs an "order" field'),
        expect.stringContaining("must start with a header"),
      ]),
    );
  });
});
