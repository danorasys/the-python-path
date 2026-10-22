import path from "node:path";
import { checkContent } from "./outputs";
import { startPythonExecutor } from "./python/executor";

const write = process.argv.includes("--write");
const root = path.resolve(process.cwd(), "content");
const executor = startPythonExecutor();

try {
  const report = await checkContent(root, executor, { write });
  for (const problem of report.problems) console.error(`${problem.file}:${problem.line}: ${problem.message}`);
  const summary = [
    `${report.examples} examples run`,
    `${report.verified} outputs verified`,
    write ? `${report.updated} outputs updated` : null,
    report.unchecked > 0 ? `${report.unchecked} static outputs skipped` : null,
    `${report.problems.length} problems`,
  ];
  console.log(summary.filter(Boolean).join(", "));
  process.exitCode = report.problems.length > 0 ? 1 : 0;
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  executor.close();
}
