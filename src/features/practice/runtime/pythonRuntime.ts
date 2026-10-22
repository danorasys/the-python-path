import {
  INPUT_CANCELLED,
  INPUT_CAPACITY_BYTES,
  INPUT_HEADER_BYTES,
  INPUT_PROVIDED,
  SIGINT,
  inputViews,
  type OutputStream,
  type SharedChannels,
  type WorkerRequest,
  type WorkerResponse,
} from "./protocol";

export type { OutputStream };

export interface ProgramIO {
  write(text: string, stream: OutputStream): void;
  readLine(prompt: string): Promise<string>;
}

export interface PythonRuntime {
  run(code: string, io: ProgramIO): Promise<void>;
  stop(): void;
}

const STOP_GRACE_MS = 1500;

interface ActiveRun {
  io: ProgramIO;
  finish: () => void;
  waitingForInput: boolean;
}

function createChannels(): SharedChannels | null {
  if (!globalThis.crossOriginIsolated) return null;
  return {
    interrupt: new SharedArrayBuffer(1),
    input: new SharedArrayBuffer(INPUT_HEADER_BYTES + INPUT_CAPACITY_BYTES),
  };
}

class WorkerRuntime implements PythonRuntime {
  #worker: Worker | null = null;
  #channels: SharedChannels | null = null;
  #ready: Promise<void> = Promise.resolve();
  #active: ActiveRun | null = null;
  #stopTimer: number | undefined;
  #encoder = new TextEncoder();

  constructor() {
    this.#boot();
  }

  get ready(): Promise<void> {
    return this.#ready;
  }

  async run(code: string, io: ProgramIO): Promise<void> {
    await this.#ready;
    const worker = this.#worker;
    if (!worker || this.#active) return;
    if (this.#channels) Atomics.store(new Uint8Array(this.#channels.interrupt), 0, 0);
    return new Promise<void>((resolve) => {
      this.#active = { io, finish: resolve, waitingForInput: false };
      worker.postMessage({ type: "run", code } satisfies WorkerRequest);
    });
  }

  stop(): void {
    const active = this.#active;
    if (!active || this.#stopTimer !== undefined) return;
    const channels = this.#channels;
    if (!channels) {
      this.#restart();
      return;
    }
    if (active.waitingForInput) {
      active.waitingForInput = false;
      const { control } = inputViews(channels.input);
      Atomics.store(control, 0, INPUT_CANCELLED);
      Atomics.notify(control, 0);
    } else {
      Atomics.store(new Uint8Array(channels.interrupt), 0, SIGINT);
    }
    this.#stopTimer = window.setTimeout(() => this.#restart(), STOP_GRACE_MS);
  }

  #boot() {
    const channels = createChannels();
    const worker = new Worker(new URL("./python.worker.ts", import.meta.url), {
      type: "module",
      name: "python",
    });
    this.#worker = worker;
    this.#channels = channels;
    this.#ready = new Promise<void>((resolve, reject) => {
      worker.addEventListener("message", (event: MessageEvent<WorkerResponse>) => {
        const message = event.data;
        if (message.type === "ready") resolve();
        else if (message.type === "load-error") reject(new Error(message.message));
        else this.#handle(message);
      });
      worker.addEventListener("error", (event) => {
        reject(new Error(event.message || "The Python worker could not start"));
      });
    });
    this.#ready.catch(() => undefined);
    worker.postMessage({ type: "init", channels } satisfies WorkerRequest);
  }

  #handle(message: Exclude<WorkerResponse, { type: "ready" | "load-error" }>) {
    const active = this.#active;
    if (!active) return;
    switch (message.type) {
      case "output":
        active.io.write(message.text, message.stream);
        break;
      case "input-request":
        active.waitingForInput = true;
        void active.io.readLine(message.prompt).then((value) => this.#answer(active, value));
        break;
      case "done":
        this.#finish();
        break;
    }
  }

  #answer(active: ActiveRun, value: string) {
    if (this.#active !== active || !active.waitingForInput) return;
    active.waitingForInput = false;
    const channels = this.#channels;
    if (!channels) {
      this.#worker?.postMessage({ type: "input", value } satisfies WorkerRequest);
      return;
    }
    const { control, data } = inputViews(channels.input);
    const bytes = this.#encoder.encode(value).subarray(0, data.length);
    data.set(bytes);
    Atomics.store(control, 1, bytes.length);
    Atomics.store(control, 0, INPUT_PROVIDED);
    Atomics.notify(control, 0);
  }

  #finish() {
    window.clearTimeout(this.#stopTimer);
    this.#stopTimer = undefined;
    const active = this.#active;
    this.#active = null;
    active?.finish();
  }

  #restart() {
    this.#worker?.terminate();
    this.#active?.io.write("\nKeyboardInterrupt\n", "stderr");
    this.#finish();
    this.#boot();
  }
}

let runtime: WorkerRuntime | null = null;

export function loadPythonRuntime(): Promise<PythonRuntime> {
  runtime ??= new WorkerRuntime();
  const current = runtime;
  return current.ready.then(
    () => current,
    (error: unknown) => {
      if (runtime === current) runtime = null;
      throw error;
    },
  );
}
