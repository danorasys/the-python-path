export interface SourceLocation {
  file: string;
  line?: number | undefined;
  column?: number | undefined;
}

function formatLocation({ file, line, column }: SourceLocation): string {
  return line === undefined ? file : `${file}:${line}:${column ?? 1}`;
}

export class ContentError extends Error {
  override readonly name = "ContentError";
  readonly location: SourceLocation;

  constructor(message: string, location: SourceLocation) {
    super(`${formatLocation(location)}: ${message}`);
    this.location = location;
  }
}

export class ContentErrors extends Error {
  override readonly name = "ContentErrors";
  readonly errors: readonly ContentError[];

  constructor(errors: readonly ContentError[]) {
    const count = errors.length === 1 ? "1 error" : `${errors.length} errors`;
    super(`Content has ${count}:\n${errors.map((error) => `  ${error.message}`).join("\n")}`);
    this.errors = errors;
  }
}
