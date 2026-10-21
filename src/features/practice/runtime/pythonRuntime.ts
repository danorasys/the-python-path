import { PRELUDE } from "./prelude";

export const PYODIDE_VERSION = "0.29.4";
const PYODIDE_INDEX_URL = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

interface StreamOptions {
  write: (buffer: Uint8Array) => number;
}

interface Pyodide {
  runPythonAsync(code: string): Promise<unknown>;
  loadPackagesFromImports(code: string): Promise<unknown>;
  setStdout(options: StreamOptions): void;
  setStderr(options: StreamOptions): void;
  globals: {
    get(name: string): unknown;
    set(name: string, value: unknown): void;
  };
}

interface PyodideModule {
  loadPyodide: (options: { indexURL: string }) => Promise<Pyodide>;
}

export type OutputStream = "stdout" | "stderr";

export interface ProgramIO {
  write(text: string, stream: OutputStream): void;
  readLine(prompt: string): Promise<string>;
}

export interface PythonRuntime {
  run(code: string, io: ProgramIO): Promise<void>;
}

function streamTo(stream: OutputStream, current: () => ProgramIO | null): StreamOptions {
  const decoder = new TextDecoder();
  return {
    write: (buffer) => {
      current()?.write(decoder.decode(buffer, { stream: true }), stream);
      return buffer.length;
    },
  };
}

async function createRuntime(): Promise<PythonRuntime> {
  const moduleUrl = `${PYODIDE_INDEX_URL}pyodide.mjs`;
  const { loadPyodide } = (await import(/* @vite-ignore */ moduleUrl)) as PyodideModule;
  const pyodide = await loadPyodide({ indexURL: PYODIDE_INDEX_URL });

  let activeIO: ProgramIO | null = null;
  const current = () => activeIO;

  pyodide.setStdout(streamTo("stdout", current));
  pyodide.setStderr(streamTo("stderr", current));
  pyodide.globals.set("__tpp_read_line", (prompt: string) =>
    activeIO ? activeIO.readLine(prompt) : Promise.resolve(""),
  );
  await pyodide.runPythonAsync(PRELUDE);
  const runProgram = pyodide.globals.get("__tpp_run") as (source: string) => Promise<unknown>;

  let queue: Promise<void> = Promise.resolve();

  return {
    run(code, io) {
      const task = queue.then(async () => {
        activeIO = io;
        try {
          await pyodide.loadPackagesFromImports(code).catch(() => undefined);
          await runProgram(code);
        } finally {
          activeIO = null;
        }
      });
      queue = task.catch(() => undefined);
      return task;
    },
  };
}

let runtimePromise: Promise<PythonRuntime> | null = null;

export function loadPythonRuntime(): Promise<PythonRuntime> {
  runtimePromise ??= createRuntime().catch((error: unknown) => {
    runtimePromise = null;
    throw error;
  });
  return runtimePromise;
}
