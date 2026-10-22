import { constants } from "node:fs";

Object.defineProperty(process, "binding", {
  value: (name) => {
    if (name === "constants") return { fs: constants };
    throw new Error(`process.binding("${name}") is not available in the sandbox`);
  },
});

const { loadPyodide } = await import(process.env.TPP_PYODIDE_MODULE);

let transcript = "";
let runProgram = null;

function stream() {
  const decoder = new TextDecoder();
  return {
    write(buffer) {
      transcript += decoder.decode(buffer, { stream: true });
      return buffer.length;
    },
  };
}

async function initialize({ prelude, guard }) {
  const pyodide = await loadPyodide({
    indexURL: process.env.TPP_PYODIDE_DIR,
    env: { PYTHONHASHSEED: "0" },
  });
  pyodide.setStdout(stream());
  pyodide.setStderr(stream());
  pyodide.globals.set("__tpp_read_line", () => "");
  await pyodide.runPythonAsync(prelude);
  runProgram = pyodide.globals.get("__tpp_run");
  await pyodide.runPythonAsync(guard);
}

async function execute({ id, code, inputs }) {
  transcript = "";
  const queue = [...inputs];
  const prompts = [];
  let missingInput = false;
  const readLine = (prompt) => {
    prompts.push(prompt);
    if (queue.length === 0) {
      missingInput = true;
      return undefined;
    }
    const value = queue.shift();
    transcript += `${prompt}${value}\n`;
    return value;
  };
  const ok = await runProgram(code, readLine);
  return { type: "result", id, ok: ok === true, transcript, prompts, missingInput, unusedInputs: queue.length };
}

process.on("message", (message) => {
  if (message?.type === "init") {
    initialize(message).then(
      () => process.send({ type: "ready" }),
      (error) => process.send({ type: "fatal", message: String(error?.stack ?? error) }),
    );
  } else if (message?.type === "run") {
    execute(message).then(
      (result) => process.send(result),
      (error) => process.send({ type: "result", id: message.id, crash: String(error?.stack ?? error) }),
    );
  }
});
