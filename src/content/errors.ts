export class ContentNotFoundError extends Error {
  override readonly name = "ContentNotFoundError";
  readonly resource: string;

  constructor(resource: string) {
    super(`Content not found: ${resource}`);
    this.resource = resource;
  }
}

export class ContentLoadError extends Error {
  override readonly name = "ContentLoadError";
  readonly resource: string;

  constructor(resource: string, options?: ErrorOptions) {
    super(`Content could not be loaded: ${resource}`, options);
    this.resource = resource;
  }
}

export function isNotFound(error: unknown): error is ContentNotFoundError {
  return error instanceof ContentNotFoundError;
}
