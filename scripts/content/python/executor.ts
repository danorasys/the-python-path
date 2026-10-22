import { fork, type ChildProcess } from "node:child_process";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { PRELUDE } from "../../../src/features/practice/runtime/prelude";

export interface RunRequest {
  code: string;
  inputs: readonly string[];
}

export type RunStatus = "ok" | "error" | "timeout" | "crash";

export interface RunResult {
  status: RunStatus;
  transcript: string;
  prompts: string[];
  missingInput: boolean;
  unusedInputs: number;
  message?: string | undefined;
}

export interface PythonExecutor {
  run(request: RunRequest): Promise<RunResult>;
  close(): void;
}

export interface ExecutorOptions {
  timeoutMs?: number | undefined;
}

const SANDBOX_FILE = path.join(path.dirname(fileURLToPath(import.meta.url)), "sandbox.mjs");
const PYODIDE_DIR = path.dirname(createRequire(import.meta.url).resolve("pyodide/package.json"));
const DEFAULT_TIMEOUT_MS = 10_000;
const STARTUP_TIMEOUT_MS = 60_000;
const STDERR_LIMIT = 4_000;

const BLOCKED_MODULES = ["js", "pyodide_js", "pyodide", "pyodide.code", "pyodide.ffi", "pyodide.http", "_pyodide"];

const GUARD = `
import sys
for _name in ${JSON.stringify(BLOCKED_MODULES)}:
    sys.modules[_name] = None
del _name
`;

type ResultMessage =
  | { type: "result"; id: number; ok: boolean; transcript: string; prompts: string[]; missingInput: boolean; unusedInputs: number }
  | { type: "result"; id: number; crash: string };

type SandboxMessage = { type: "ready" } | { type: "fatal"; message: string } | ResultMessage;

interface PendingRun {
  id: number;
  child: ChildProcess;
  settle: (result: RunResult) => void;
}

function isSandboxMessage(value: unknown): value is SandboxMessage {
  if (typeof value !== "object" || value === null || !("type" in value)) return false;
  return value.type === "ready" || value.type === "fatal" || value.type === "result";
}

function failure(status: "timeout" | "crash", message: string): RunResult {
  return { status, transcript: "", prompts: [], missingInput: false, unusedInputs: 0, message };
}

function sandboxArguments(): string[] {
  const flag = process.allowedNodeEnvironmentFlags.has("--permission") ? "--permission" : "--experimental-permission";
  return [flag, `--allow-fs-read=${PYODIDE_DIR}${path.sep}*`, `--allow-fs-read=${SANDBOX_FILE}`];
}

function sandboxEnvironment(): NodeJS.ProcessEnv {
  const env: NodeJS.ProcessEnv = {
    TPP_PYODIDE_DIR: `${PYODIDE_DIR}${path.sep}`,
    TPP_PYODIDE_MODULE: pathToFileURL(path.join(PYODIDE_DIR, "pyodide.mjs")).href,
  };
  if (process.env.SystemRoot) env.SystemRoot = process.env.SystemRoot;
  return env;
}

class SandboxExecutor implements PythonExecutor {
  readonly #timeoutMs: number;
  #child: ChildProcess | null = null;
  #ready: Promise<ChildProcess> | null = null;
  #pending: PendingRun | null = null;
  #queue: Promise<unknown> = Promise.resolve();
  #nextId = 0;
  #stderr = "";

  constructor(timeoutMs: number) {
    this.#timeoutMs = timeoutMs;
  }

  run(request: RunRequest): Promise<RunResult> {
    const task = this.#queue.then(() => this.#execute(request));
    this.#queue = task.catch(() => undefined);
    return task;
  }

  close(): void {
    this.#stop();
  }

  async #execute(request: RunRequest): Promise<RunResult> {
    const child = await this.#start();
    return new Promise<RunResult>((resolve) => {
      const id = this.#nextId++;
      const timer = setTimeout(() => {
        this.#pending = null;
        this.#stop();
        resolve(failure("timeout", `The example did not finish within ${this.#timeoutMs / 1000} seconds.`));
      }, this.#timeoutMs);
      this.#pending = {
        id,
        child,
        settle: (result) => {
          clearTimeout(timer);
          this.#pending = null;
          resolve(result);
        },
      };
      child.send({ type: "run", id, code: request.code, inputs: [...request.inputs] }, (error) => {
        if (error && this.#pending?.id === id) this.#pending.settle(failure("crash", error.message));
      });
    });
  }

  #start(): Promise<ChildProcess> {
    if (this.#ready) return this.#ready;
    const child = fork(SANDBOX_FILE, [], {
      execArgv: sandboxArguments(),
      env: sandboxEnvironment(),
      stdio: ["ignore", "ignore", "pipe", "ipc"],
      serialization: "json",
    });
    this.#child = child;
    this.#stderr = "";
    child.stderr?.setEncoding("utf8");
    child.stderr?.on("data", (chunk: string) => {
      this.#stderr = (this.#stderr + chunk).slice(-STDERR_LIMIT);
    });

    const ready = new Promise<ChildProcess>((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error("The Python sandbox did not start in time.")), STARTUP_TIMEOUT_MS);
      child.on("message", (message: unknown) => {
        if (!isSandboxMessage(message)) return;
        if (message.type === "ready") {
          clearTimeout(timer);
          resolve(child);
        } else if (message.type === "fatal") {
          clearTimeout(timer);
          reject(new Error(`The Python sandbox could not start: ${message.message}`));
        } else {
          this.#onResult(child, message);
        }
      });
      child.on("error", (error) => {
        clearTimeout(timer);
        reject(error);
        if (this.#pending?.child === child) this.#pending.settle(failure("crash", error.message));
        this.#stop();
      });
      child.on("exit", (code, signal) => {
        clearTimeout(timer);
        const reason = `The Python sandbox stopped (${signal ?? `exit code ${code}`}). ${this.#stderr.trim()}`.trim();
        if (this.#child === child) {
          this.#child = null;
          this.#ready = null;
        }
        reject(new Error(reason));
        if (this.#pending?.child === child) this.#pending.settle(failure("crash", reason));
      });
    });

    this.#ready = ready;
    ready.catch(() => this.#stop());
    child.send({ type: "init", prelude: PRELUDE, guard: GUARD });
    return ready;
  }

  #onResult(child: ChildProcess, message: ResultMessage) {
    const pending = this.#pending;
    if (pending?.child !== child || pending.id !== message.id) return;
    if ("crash" in message) {
      pending.settle(failure("crash", message.crash));
      return;
    }
    pending.settle({
      status: message.ok ? "ok" : "error",
      transcript: message.transcript,
      prompts: message.prompts,
      missingInput: message.missingInput,
      unusedInputs: message.unusedInputs,
    });
  }

  #stop() {
    const child = this.#child;
    this.#child = null;
    this.#ready = null;
    if (child && child.exitCode === null && child.signalCode === null) child.kill("SIGKILL");
  }
}

export function startPythonExecutor(options: ExecutorOptions = {}): PythonExecutor {
  return new SandboxExecutor(options.timeoutMs ?? DEFAULT_TIMEOUT_MS);
}
