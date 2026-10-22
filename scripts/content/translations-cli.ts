import path from "node:path";
import { analyzeContent } from "./project";
import { stampTranslations, summarize } from "./translations";

const args = process.argv.slice(2);
const root = path.resolve(process.cwd(), "content");
const stampIndex = args.indexOf("--stamp");
const files = stampIndex === -1 ? [] : args.slice(stampIndex + 1).filter((arg) => !arg.startsWith("--"));
const untracked = args.includes("--stamp-untracked");
const strict = args.includes("--strict");
const listMissing = args.includes("--missing");

try {
  if (stampIndex !== -1 && files.length === 0) throw new Error('Name the translation files to stamp, like --stamp content/module1/learning-unit1.en.md');
  if (files.length > 0 || untracked) {
    const result = await stampTranslations(root, { files, untracked });
    for (const file of result.stamped) console.log(`stamped ${file}`);
    for (const { file, reason } of result.skipped) console.error(`skipped ${file}: it ${reason}`);
    if (result.skipped.length > 0) process.exitCode = 1;
  }

  const { translations } = await analyzeContent(root);
  let pending = 0;
  for (const [language, groups] of Object.entries(summarize(translations))) {
    console.log(
      `${language}: ${groups.current.length} up to date, ${groups.outdated.length} outdated, ${groups.untracked.length} without fingerprint, ${groups.missing.length} not translated`,
    );
    for (const file of groups.outdated) console.log(`  outdated  ${file}`);
    for (const file of groups.untracked) console.log(`  untracked ${file}`);
    if (listMissing) for (const file of groups.missing) console.log(`  missing   ${file}`);
    pending += groups.outdated.length + groups.untracked.length;
  }
  if (strict && pending > 0) process.exitCode = 1;
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
