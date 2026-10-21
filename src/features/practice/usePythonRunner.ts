import { useCallback, useEffect, useRef, useState } from "react";
import { loadPythonRuntime, type OutputStream, type PythonRuntime } from "./runtime/pythonRuntime";

export type RuntimeStatus = "loading" | "ready" | "error";

export interface OutputChunk {
  id: number;
  kind: OutputStream | "input";
  text: string;
}

export interface PendingInput {
  id: number;
  prompt: string;
}

export interface PythonRunner {
  status: RuntimeStatus;
  running: boolean;
  output: OutputChunk[];
  pendingInput: PendingInput | null;
  run: (code: string) => Promise<void>;
  submitInput: (value: string) => void;
  clear: () => void;
}

export function usePythonRunner(): PythonRunner {
  const [status, setStatus] = useState<RuntimeStatus>("loading");
  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState<OutputChunk[]>([]);
  const [pendingInput, setPendingInput] = useState<PendingInput | null>(null);

  const runtimeRef = useRef<PythonRuntime | null>(null);
  const runningRef = useRef(false);
  const answerRef = useRef<((value: string) => void) | null>(null);
  const nextId = useRef(0);

  useEffect(() => {
    let active = true;
    loadPythonRuntime().then(
      (runtime) => {
        if (!active) return;
        runtimeRef.current = runtime;
        setStatus("ready");
      },
      (error: unknown) => {
        console.error("[python] runtime failed to load", error);
        if (active) setStatus("error");
      },
    );
    return () => {
      active = false;
      answerRef.current?.("");
    };
  }, []);

  const append = useCallback((kind: OutputChunk["kind"], text: string) => {
    if (!text) return;
    setOutput((chunks) => {
      const last = chunks.at(-1);
      if (last && last.kind === kind && kind !== "input") {
        return [...chunks.slice(0, -1), { ...last, text: last.text + text }];
      }
      return [...chunks, { id: nextId.current++, kind, text }];
    });
  }, []);

  const run = useCallback(
    async (code: string) => {
      const runtime = runtimeRef.current;
      if (!runtime || runningRef.current) return;
      runningRef.current = true;
      setRunning(true);
      setOutput([]);
      try {
        await runtime.run(code, {
          write: (text, stream) => append(stream, text),
          readLine: (prompt) =>
            new Promise<string>((resolve) => {
              setPendingInput({ id: nextId.current++, prompt });
              answerRef.current = (value) => {
                answerRef.current = null;
                setPendingInput(null);
                append("input", `${prompt}${value}\n`);
                resolve(value);
              };
            }),
        });
      } catch (error) {
        append("stderr", `${String(error)}\n`);
      } finally {
        runningRef.current = false;
        setRunning(false);
      }
    },
    [append],
  );

  const submitInput = useCallback((value: string) => answerRef.current?.(value), []);

  const clear = useCallback(() => {
    if (!runningRef.current) setOutput([]);
  }, []);

  return { status, running, output, pendingInput, run, submitInput, clear };
}
