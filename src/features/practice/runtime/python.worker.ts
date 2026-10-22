import { PRELUDE } from "./prelude";
import {
  INPUT_PROVIDED,
  INPUT_WAITING,
  inputViews,
  type OutputStream,
  type SharedChannels,
  type WorkerRequest,
  type WorkerResponse,
} from "./protocol";

const PYODIDE_VERSION = "0.29.4";
const PYODIDE_INDEX_URL = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

const BURST_WINDOW_MS = 50;
const MAX_POSTS_PER_WINDOW = 20;
const MAX_BUFFERED_CHARS = 16_384;

interface StreamOptions {
  write: (buffer: Uint8Array) => number;
}

interface Pyodide {
  runPythonAsync(code: string): Promise<unknown>;
  loadPackagesFromImports(code: string): Promise<unknown>;
  setStdout(options: StreamOptions): void;
  setStderr(options: StreamOptions): void;
  setInterruptBuffer(buffer: Uint8Array): void;
  globals: {
    get(name: string): unknown;
    set(name: string, value: unknown): void;
  };
}

interface PyodideModule {
  loadPyodide: (options: { indexURL: string }) => Promise<Pyodide>;
}

type ReadLineSync = (prompt: string) => string | undefined;
type RunProgram = (source: string, readLineSync?: ReadLineSync) => Promise<unknown>;

interface WorkerScope {
  postMessage(message: WorkerResponse): void;
  addEventListener(type: "message", listener: (event: MessageEvent<WorkerRequest>) => void): void;
}

const scope = self as unknown as WorkerScope;
const post = (message: WorkerResponse) => scope.postMessage(message);

function createOutput() {
  let stream: OutputStream = "stdout";
  let pending = "";
  let windowStart = 0;
  let postsInWindow = 0;

  const flush = () => {
    if (!pending) return;
    post({ type: "output", stream, text: pending });
    pending = "";
    postsInWindow++;
  };

  const write = (next: OutputStream, text: string) => {
    if (next !== stream) {
      flush();
      stream = next;
    }
    pending += text;
    const now = performance.now();
    if (now - windowStart >= BURST_WINDOW_MS) {
      windowStart = now;
      postsInWindow = 0;
    }
    if (postsInWindow < MAX_POSTS_PER_WINDOW || pending.length >= MAX_BUFFERED_CHARS) flush();
  };

  return { write, flush };
}

const output = createOutput();

function streamTo(stream: OutputStream): StreamOptions {
  const decoder = new TextDecoder();
  return {
    write: (buffer) => {
      output.write(stream, decoder.decode(buffer, { stream: true }));
      return buffer.length;
    },
  };
}

function createSyncReader(channels: SharedChannels): ReadLineSync {
  const { control, data } = inputViews(channels.input);
  const decoder = new TextDecoder();
  return (prompt) => {
    output.flush();
    Atomics.store(control, 0, INPUT_WAITING);
    post({ type: "input-request", prompt });
    Atomics.wait(control, 0, INPUT_WAITING);
    if (Atomics.load(control, 0) !== INPUT_PROVIDED) return undefined;
    return decoder.decode(data.slice(0, Atomics.load(control, 1)));
  };
}

let answerInput: ((value: string) => void) | null = null;

const readLineAsync = (prompt: string) =>
  new Promise<string>((resolve) => {
    output.flush();
    answerInput = resolve;
    post({ type: "input-request", prompt });
  });

async function boot(channels: SharedChannels | null) {
  const moduleUrl = `${PYODIDE_INDEX_URL}pyodide.mjs`;
  const { loadPyodide } = (await import(/* @vite-ignore */ moduleUrl)) as PyodideModule;
  const pyodide = await loadPyodide({ indexURL: PYODIDE_INDEX_URL });

  pyodide.setStdout(streamTo("stdout"));
  pyodide.setStderr(streamTo("stderr"));
  if (channels) pyodide.setInterruptBuffer(new Uint8Array(channels.interrupt));
  pyodide.globals.set("__tpp_read_line", readLineAsync);
  await pyodide.runPythonAsync(PRELUDE);

  const runProgram = pyodide.globals.get("__tpp_run") as RunProgram;
  const readLineSync = channels ? createSyncReader(channels) : undefined;

  return async (code: string) => {
    try {
      await pyodide.loadPackagesFromImports(code).catch(() => undefined);
      await runProgram(code, readLineSync);
    } catch (error) {
      output.write("stderr", `${String(error)}\n`);
    } finally {
      output.flush();
      post({ type: "done" });
    }
  };
}

let runCode: ((code: string) => Promise<void>) | null = null;

scope.addEventListener("message", (event) => {
  const message = event.data;
  switch (message.type) {
    case "init":
      boot(message.channels).then(
        (run) => {
          runCode = run;
          post({ type: "ready" });
        },
        (error: unknown) => post({ type: "load-error", message: String(error) }),
      );
      break;
    case "run":
      void runCode?.(message.code);
      break;
    case "input": {
      const answer = answerInput;
      answerInput = null;
      answer?.(message.value);
      break;
    }
  }
});
