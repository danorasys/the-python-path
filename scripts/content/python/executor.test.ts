import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { afterAll, describe, expect, it } from "vitest";
import { startPythonExecutor } from "./executor";

describe("Pyodide version", () => {
  it("matches the version the site loads, so checked outputs are what learners see", async () => {
    const { version } = createRequire(import.meta.url)("pyodide/package.json") as { version: string };
    const worker = await readFile("src/features/practice/runtime/python.worker.ts", "utf8");
    expect(worker).toContain(`const PYODIDE_VERSION = "${version}";`);
  });
});

const executor = startPythonExecutor({ timeoutMs: 4_000 });
const run = (code: string, inputs: string[] = []) => executor.run({ code, inputs });

afterAll(() => executor.close());

describe("startPythonExecutor", () => {
  it("runs code with the same prelude as the site", async () => {
    const result = await run('print("Hola", 2 + 3)');
    expect(result).toMatchObject({ status: "ok", transcript: "Hola 5\n", missingInput: false, unusedInputs: 0 });
  }, 60_000);

  it("prints learner tracebacks and reports the failure", async () => {
    const result = await run("x = [1]\nprint(x[3])");
    expect(result.status).toBe("error");
    expect(result.transcript).toBe(
      'Traceback (most recent call last):\n  File "<exec>", line 2, in <module>\n    print(x[3])\n          ~^^^\nIndexError: list index out of range\n',
    );
  });

  it("answers input() and echoes it like the console", async () => {
    const result = await run('nombre = input("Nombre: ")\nedad = input("Edad: ")\nprint(nombre, edad)', ["Ana", "25"]);
    expect(result).toMatchObject({ status: "ok", transcript: "Nombre: Ana\nEdad: 25\nAna 25\n", prompts: ["Nombre: ", "Edad: "] });
  });

  it("reports missing and unused answers", async () => {
    expect(await run('input("A: ")\ninput("B: ")', ["1"])).toMatchObject({ missingInput: true, prompts: ["A: ", "B: "] });
    expect(await run('input("A: ")', ["1", "2"])).toMatchObject({ status: "ok", unusedInputs: 1 });
  });

  it("gives the same set order on every run", async () => {
    const code = 'print({"manzana", "pera", "uva", "kiwi"})';
    const first = await run(code);
    expect((await run(code)).transcript).toBe(first.transcript);
  });

  it("blocks access to JavaScript from Python", async () => {
    for (const code of ["import js", "from pyodide.code import run_js", "import pyodide_js"]) {
      const result = await run(code);
      expect(result.status).toBe("error");
      expect(result.transcript).toMatch(/ModuleNotFoundError|ImportError/);
    }
  });

  it("stops examples that never finish and keeps working afterwards", async () => {
    expect(await run("while True:\n    pass")).toMatchObject({ status: "timeout" });
    expect(await run("print('sigo vivo')")).toMatchObject({ status: "ok", transcript: "sigo vivo\n" });
  }, 60_000);
});
