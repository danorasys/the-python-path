import { contentFallbackChain, type Language } from "../i18n/languages";
import { ContentLoadError, ContentNotFoundError } from "./errors";
import type { Localized } from "./types";

export function dataUrl(path: string): string {
  return `${import.meta.env.BASE_URL}data/${path}`;
}

type FetchResult = { kind: "found"; json: unknown } | { kind: "missing" };

async function fetchJson(path: string): Promise<FetchResult> {
  let response: Response;
  try {
    response = await fetch(dataUrl(path));
  } catch (cause) {
    throw new ContentLoadError(path, { cause });
  }

  if (response.status === 404) return { kind: "missing" };
  if (!response.ok) throw new ContentLoadError(path);

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("json")) return { kind: "missing" };

  try {
    return { kind: "found", json: await response.json() };
  } catch (cause) {
    throw new ContentLoadError(path, { cause });
  }
}

export async function fetchLocalized<T>(
  language: Language,
  pathFor: (language: Language) => string,
  parse: (raw: unknown) => T,
): Promise<Localized<T>> {
  for (const candidate of contentFallbackChain(language)) {
    const path = pathFor(candidate);
    const result = await fetchJson(path);
    if (result.kind === "missing") continue;
    try {
      return { data: parse(result.json), language: candidate, requestedLanguage: language };
    } catch (cause) {
      throw new ContentLoadError(path, { cause });
    }
  }
  throw new ContentNotFoundError(pathFor(language));
}

export async function fetchUnlocalized<T>(path: string, parse: (raw: unknown) => T): Promise<T> {
  const result = await fetchJson(path);
  if (result.kind === "missing") throw new ContentNotFoundError(path);
  try {
    return parse(result.json);
  } catch (cause) {
    throw new ContentLoadError(path, { cause });
  }
}

const cache = new Map<string, Promise<unknown>>();

export function cached<T>(key: string, load: () => Promise<T>): Promise<T> {
  const existing = cache.get(key);
  if (existing) return existing as Promise<T>;
  const promise = load();
  cache.set(key, promise);
  promise.catch(() => cache.delete(key));
  return promise;
}

export function clearContentCache(): void {
  cache.clear();
}
