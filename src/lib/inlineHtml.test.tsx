import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RichText } from "../components/RichText";
import { parseInlineHtml, toPlainText } from "./inlineHtml";

describe("parseInlineHtml", () => {
  it("returns plain text untouched", () => {
    expect(parseInlineHtml("Hola, Mundo")).toEqual(["Hola, Mundo"]);
  });

  it("keeps the allowed inline tags and drops their attributes", () => {
    expect(parseInlineHtml('Usa <code class="language-python">print()</code><br><strong>ya</strong>')).toEqual([
      "Usa ",
      { tag: "code", children: ["print()"] },
      { tag: "br" },
      { tag: "strong", children: ["ya"] },
    ]);
  });

  it("maps <b>/<i> to their semantic equivalents", () => {
    expect(parseInlineHtml("<b>a</b><i>b</i>")).toEqual([
      { tag: "strong", children: ["a"] },
      { tag: "em", children: ["b"] },
    ]);
  });

  it("unwraps unknown tags and removes scripts", () => {
    expect(parseInlineHtml('<span>x</span><script>alert(1)</script><a href="javascript:alert(1)">y</a>')).toEqual([
      "x",
      "y",
    ]);
  });

  it("turns the allowed icon tags into icon nodes and drops unknown ones", () => {
    expect(parseInlineHtml("<icon-cross></icon-cross> Malo: <icon-rocket></icon-rocket>x")).toEqual([
      { tag: "icon", name: "cross" },
      " Malo: ",
      "x",
    ]);
    expect(toPlainText("<icon-check></icon-check> Bien")).toBe("Bien");
  });

  it("decodes entities as text", () => {
    expect(toPlainText("1 &lt; 2 &amp;&nbsp;ok")).toBe("1 < 2 & ok".replace(/\s+/g, " "));
  });
});

describe("<RichText>", () => {
  it("draws inline icons as decorative SVG", () => {
    const { container } = render(<RichText html="<icon-check></icon-check> Gut:" />);
    const svg = container.querySelector("svg.inline-icon--check");
    expect(svg).not.toBeNull();
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(container).toHaveTextContent("Gut:");
  });

  it("never renders injected markup as live HTML", () => {
    const { container } = render(
      <RichText html={'<img src=x onerror="window.pwned=1">Hi <code>x</code>'} />,
    );
    expect(container.querySelector("img")).toBeNull();
    expect(container.querySelector("code")).toHaveTextContent("x");
    expect(container).toHaveTextContent("Hi x");
    expect((window as { pwned?: number }).pwned).toBeUndefined();
  });
});
