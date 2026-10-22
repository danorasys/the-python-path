import { useCallback, useEffect, useRef, useState } from "react";
import { loadPythonRuntime, type OutputStream, type PythonRuntime } from "./runtime/pythonRuntime";

export type RuntimeStatus = "loading" | "ready" | "error";

const MAX_OUTPUT_CHARS = 200_000;

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
  lineCount: number;
  truncated: boolean;
  pendingInput: PendingInput | null;
  run: (code: string) => Promise<void>;
  stop: () => void;
  submitInput: (value: string) => void;
  clear: () => void;
}

function keepLatest(chunks: OutputChunk[]): OutputChunk[] {
  let total = chunks.reduce((sum, chunk) => sum + chunk.text.length, 0);
  if (total <= MAX_OUTPUT_CHARS) return chunks;
  const kept = [...chunks];
  while (total > MAX_OUTPUT_CHARS) {
    const first = kept[0];
    if (!first) break;
    const excess = total - MAX_OUTPUT_CHARS;
    if (first.text.length <= excess) {
      kept.shift();
      total -= first.text.length;
    } else {
      kept[0] = { ...first, text: first.text.slice(excess) };
      total = MAX_OUTPUT_CHARS;
    }
  }
  return kept;
}

function countLines(text: string): number {
  let count = 0;
  for (let index = text.indexOf("\n"); index !== -1; index = text.indexOf("\n", index + 1)) {
    count++;
  }
  return count;
}

export function usePythonRunner(): PythonRunner {
  const [status, setStatus] = useState<RuntimeStatus>("loading");
  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState<OutputChunk[]>([]);
  const [lineCount, setLineCount] = useState(0);
  const [truncated, setTruncated] = useState(false);
  const [pendingInput, setPendingInput] = useState<PendingInput | null>(null);

  const runtimeRef = useRef<PythonRuntime | null>(null);
  const runningRef = useRef(false);
  const answerRef = useRef<((value: string) => void) | null>(null);
  const nextId = useRef(0);
  const chunksRef = useRef<OutputChunk[]>([]);
  const lineCountRef = useRef(0);
  const truncatedRef = useRef(false);
  const frameRef = useRef(0);

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
      answerRef.current = null;
      cancelAnimationFrame(frameRef.current);
      if (runningRef.current) runtimeRef.current?.stop();
    };
  }, []);

  const publish = useCallback(() => {
    frameRef.current = 0;
    setOutput(chunksRef.current);
    setLineCount(lineCountRef.current);
    setTruncated(truncatedRef.current);
  }, []);

  const schedulePublish = useCallback(() => {
    if (!frameRef.current) frameRef.current = requestAnimationFrame(publish);
  }, [publish]);

  const resetOutput = useCallback(() => {
    chunksRef.current = [];
    lineCountRef.current = 0;
    truncatedRef.current = false;
    schedulePublish();
  }, [schedulePublish]);

  const append = useCallback(
    (kind: OutputChunk["kind"], text: string) => {
      if (!text) return;
      const chunks = chunksRef.current;
      const last = chunks.at(-1);
      const merged =
        last && last.kind === kind && kind !== "input"
          ? [...chunks.slice(0, -1), { ...last, text: last.text + text }]
          : [...chunks, { id: nextId.current++, kind, text }];
      const kept = keepLatest(merged);
      chunksRef.current = kept;
      lineCountRef.current += countLines(text);
      if (kept !== merged) truncatedRef.current = true;
      schedulePublish();
    },
    [schedulePublish],
  );

  const run = useCallback(
    async (code: string) => {
      const runtime = runtimeRef.current;
      if (!runtime || runningRef.current) return;
      runningRef.current = true;
      setRunning(true);
      resetOutput();
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
    [append, resetOutput],
  );

  const stop = useCallback(() => {
    if (!runningRef.current) return;
    answerRef.current = null;
    setPendingInput(null);
    runtimeRef.current?.stop();
  }, []);

  const submitInput = useCallback((value: string) => answerRef.current?.(value), []);

  const clear = useCallback(() => {
    if (!runningRef.current) resetOutput();
  }, [resetOutput]);

  return {
    status,
    running,
    output,
    lineCount,
    truncated,
    pendingInput,
    run,
    stop,
    submitInput,
    clear,
  };
}
