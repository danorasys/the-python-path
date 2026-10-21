import { afterEach, describe, expect, it, vi } from "vitest";
import { ContentLoadError, ContentNotFoundError } from "./errors";
import { cached, clearContentCache, fetchLocalized } from "./loader";

function jsonResponse(body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

const notFound = () => new Response("missing", { status: 404 });

function serve(files: Record<string, unknown>) {
  return vi.spyOn(globalThis, "fetch").mockImplementation((input) => {
    const url = input instanceof Request ? input.url : input.toString();
    const match = Object.keys(files).find((path) => url.endsWith(path));
    return Promise.resolve(match ? jsonResponse(files[match]) : notFound());
  });
}

const identity = (raw: unknown) => raw;

afterEach(() => clearContentCache());

describe("fetchLocalized", () => {
  it("returns the requested language when it exists", async () => {
    serve({ "doc-de.json": { hello: "Hallo" } });
    const result = await fetchLocalized("de", (lang) => `doc-${lang}.json`, identity);
    expect(result).toEqual({ data: { hello: "Hallo" }, language: "de", requestedLanguage: "de" });
  });

  it("falls back to English, then Spanish", async () => {
    serve({ "doc-es.json": { hello: "Hola" } });
    const result = await fetchLocalized("de", (lang) => `doc-${lang}.json`, identity);
    expect(result.language).toBe("es");
    expect(result.requestedLanguage).toBe("de");
  });

  it("treats an HTML answer (dev-server fallback) as missing", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response("<!doctype html>", { status: 200, headers: { "content-type": "text/html" } }),
    );
    await expect(fetchLocalized("en", (lang) => `x-${lang}.json`, identity)).rejects.toBeInstanceOf(
      ContentNotFoundError,
    );
  });

  it("reports a broken document as a load error, not a missing one", async () => {
    serve({ "doc-en.json": { nope: true } });
    const parse = () => {
      throw new TypeError("bad");
    };
    await expect(fetchLocalized("en", (lang) => `doc-${lang}.json`, parse)).rejects.toBeInstanceOf(
      ContentLoadError,
    );
  });

  it("reports network failures as load errors", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new TypeError("offline"));
    await expect(fetchLocalized("en", (lang) => `doc-${lang}.json`, identity)).rejects.toBeInstanceOf(
      ContentLoadError,
    );
  });
});

describe("cached", () => {
  it("shares one promise per key and evicts failures so they can be retried", async () => {
    const load = vi.fn().mockRejectedValueOnce(new Error("boom")).mockResolvedValue("ok");
    const first = cached("key", load);
    expect(cached("key", load)).toBe(first);
    await expect(first).rejects.toThrow("boom");
    await expect(cached("key", load)).resolves.toBe("ok");
    expect(load).toHaveBeenCalledTimes(2);
  });
});
