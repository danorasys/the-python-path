export type OutputStream = "stdout" | "stderr";

export interface SharedChannels {
  interrupt: SharedArrayBuffer;
  input: SharedArrayBuffer;
}

export type WorkerRequest =
  | { type: "init"; channels: SharedChannels | null }
  | { type: "run"; code: string }
  | { type: "input"; value: string };

export type WorkerResponse =
  | { type: "ready" }
  | { type: "load-error"; message: string }
  | { type: "output"; stream: OutputStream; text: string }
  | { type: "input-request"; prompt: string }
  | { type: "done" };

export const SIGINT = 2;

export const INPUT_HEADER_BYTES = 8;
export const INPUT_CAPACITY_BYTES = 64 * 1024;

export const INPUT_WAITING = 0;
export const INPUT_PROVIDED = 1;
export const INPUT_CANCELLED = 2;

export function inputViews(buffer: SharedArrayBuffer) {
  return {
    control: new Int32Array(buffer, 0, 2),
    data: new Uint8Array(buffer, INPUT_HEADER_BYTES),
  };
}
