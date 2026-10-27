import { copyFile, mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { ContentBlock, UnitDocument } from "../../src/content/types";
import { checkContent } from "./outputs";
import { buildContent } from "./project";
import { startPythonExecutor } from "./python/executor";

const TEMPLATE = path.resolve("content", "_template.md");
const UNIT = "data/modules/module1/learning-units/learning-unit1/learning-unit1-es.json";

let base = "";
let root = "";

function blockTypes(blocks: readonly ContentBlock[]): Set<string> {
  const types = new Set<string>();
  for (const block of blocks) {
    types.add(block.type);
    if (block.type === "collapsible") for (const type of blockTypes(block.content)) types.add(type);
  }
  return types;
}

beforeAll(async () => {
  base = await mkdtemp(path.join(tmpdir(), "tpp-template-"));
  root = path.join(base, "content");
  await mkdir(path.join(root, "module1"), { recursive: true });
  await writeFile(path.join(root, "roadmap.es.yml"), "title: Ruta");
  await writeFile(path.join(root, "module1", "module.es.yml"), "title: Módulo\norder: 1");
  await copyFile(TEMPLATE, path.join(root, "module1", "learning-unit1.es.md"));
});

afterAll(async () => {
  await rm(base, { recursive: true, force: true });
});

describe("unit template", () => {
  it("compiles and shows every kind of block", async () => {
    const json = (await buildContent(root)).get(UNIT);
    expect(json).toBeDefined();
    const unit = JSON.parse(json ?? "{}") as UnitDocument;
    expect([...blockTypes(unit.content)].sort()).toEqual(
      [
        "code",
        "collapsible",
        "divider",
        "list",
        "note",
        "paragraph",
        "subtitle1",
        "subtitle2",
        "subtitle3",
        "table",
        "test-button",
        "tip",
      ].sort(),
    );
  });

  it("runs its examples as documented", async () => {
    const executor = startPythonExecutor();
    try {
      const report = await checkContent(root, executor);
      expect(report.problems).toEqual([]);
      expect(report).toMatchObject({ examples: 6, verified: 2, unchecked: 1 });
    } finally {
      executor.close();
    }
  }, 60_000);
});
