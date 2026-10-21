import { describe, expect, it } from "vitest";
import { decodeEntities } from "./entities";

describe("decodeEntities", () => {
  it("decodes the entities found in code samples", () => {
    expect(decodeEntities('File "&lt;exec>", line 2, in &lt;module&gt;')).toBe(
      'File "<exec>", line 2, in <module>',
    );
  });

  it("decodes numeric references", () => {
    expect(decodeEntities("&#65;&#x42;")).toBe("AB");
  });

  it("keeps literal tags and unknown entities", () => {
    expect(decodeEntities("print('<nombre>') &foo;")).toBe("print('<nombre>') &foo;");
  });
});
