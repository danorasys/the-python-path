import { describe, expect, it } from "vitest";
import type { Language } from "../../src/i18n/languages";
import { ContentError } from "./errors";
import { compileMarkdown, renderInlineMarkdown } from "./markdown";

const compile = (body: string, language: Language = "es", lineOffset = 0) =>
  compileMarkdown(body, { file: "content/module1/learning-unit1.es.md", language, lineOffset });

const md = (...lines: string[]) => lines.join("\n");

function errorOf(task: () => unknown): ContentError {
  try {
    task();
  } catch (error) {
    if (error instanceof ContentError) return error;
    throw error;
  }
  throw new Error("Expected a ContentError");
}

describe("headings and text", () => {
  it("maps heading levels to subtitles", () => {
    expect(compile(md("## A", "### B", "#### C", "##### D"))).toEqual([
      { type: "subtitle1", text: "A" },
      { type: "subtitle2", text: "B" },
      { type: "subtitle3", text: "C" },
      { type: "subtitle4", text: "D" },
    ]);
  });

  it("rejects the top heading level because the title lives in the header", () => {
    expect(errorOf(() => compile("# Title")).message).toContain("Use ## to #####");
  });

  it("renders inline formatting with the tags the site understands", () => {
    expect(compile("Usa `print()` con **cuidado** y *calma*.\\\nSigue aquí :check :cross")).toEqual([
      {
        type: "paragraph",
        text:
          'Usa <code class="language-python">print()</code> con <strong>cuidado</strong> y <em>calma</em>.' +
          "<br>Sigue aquí <icon-check></icon-check> <icon-cross></icon-cross>",
      },
    ]);
  });

  it("escapes HTML so it shows as text", () => {
    expect(compile("Si `a < b` y x <nombre> & y")).toEqual([
      { type: "paragraph", text: 'Si <code class="language-python">a &lt; b</code> y x &lt;nombre&gt; &amp; y' },
    ]);
  });

  it("joins soft line breaks with a space", () => {
    expect(compile("una\nlínea")).toEqual([{ type: "paragraph", text: "una línea" }]);
  });

  it("keeps colons inside words and numbers as text", () => {
    expect(compile("Nota:importante a las 10:30 en a:b")).toEqual([
      { type: "paragraph", text: "Nota:importante a las 10:30 en a:b" },
    ]);
  });

  it("explains how to write a colon before brackets", () => {
    expect(errorOf(() => compile("lista:x[0]")).message).toContain('Escape the colon as "\\:"');
    expect(compile("lista\\:x[0]")).toEqual([{ type: "paragraph", text: "lista:x[0]" }]);
  });

  it("rejects links because the site cannot show them", () => {
    expect(errorOf(() => compile("[docs](https://docs.python.org)")).message).toContain('"link"');
  });
});

describe("lists, tables and dividers", () => {
  it("builds bullet lists", () => {
    expect(compile(md("- uno", "- `dos`"))).toEqual([
      { type: "list", items: ["uno", '<code class="language-python">dos</code>'] },
    ]);
  });

  it("rejects numbered and nested lists", () => {
    expect(errorOf(() => compile("1. uno")).message).toContain("Numbered lists");
    expect(errorOf(() => compile(md("- uno", "  - dos"))).message).toContain("only contain text");
  });

  it("builds tables with and without a title", () => {
    const table = md("| Operador | Ejemplo |", "| --- | --- |", "| `+` | 3 + 5 |");
    expect(compile(table)).toEqual([
      { type: "table", headers: ["Operador", "Ejemplo"], rows: [['<code class="language-python">+</code>', "3 + 5"]] },
    ]);
    expect(compile(md(":::table[Operadores]", table, ":::"))).toEqual([
      {
        type: "table",
        title: "Operadores",
        headers: ["Operador", "Ejemplo"],
        rows: [['<code class="language-python">+</code>', "3 + 5"]],
      },
    ]);
  });

  it("turns a horizontal rule into a divider and a lone image into an image block", () => {
    expect(compile(md("---", "", "![Un gráfico](images/plot.png)"))).toEqual([
      { type: "divider" },
      { type: "image", src: "images/plot.png", caption: "Un gráfico" },
    ]);
  });
});

describe("notes, tips and details", () => {
  it("puts the label in bold before the text", () => {
    expect(compile(md(":::note[Nota:]", "Los `int` no tienen decimales.", ":::"))).toEqual([
      { type: "note", text: '<strong>Nota:</strong><br>Los <code class="language-python">int</code> no tienen decimales.' },
    ]);
  });

  it("allows notes without a label and with several paragraphs", () => {
    expect(compile(md(":::tip", "Uno.", "", "Dos.", ":::"))).toEqual([{ type: "tip", text: "Uno.<br><br>Dos." }]);
  });

  it("rejects anything but text inside a note", () => {
    expect(errorOf(() => compile(md(":::note[Nota:]", "- uno", ":::"))).message).toContain("Only text");
  });

  it("builds collapsible sections with nested content", () => {
    expect(compile(md(":::details[Ver solución]", "```python run", "print(1)", "```", ":::"))).toEqual([
      {
        type: "collapsible",
        title: "Ver solución",
        content: [
          { type: "code", text: "print(1)", language: "python" },
          { type: "test-button", text: "Probar >>", code: "print(1)" },
        ],
      },
    ]);
  });

  it("requires a title for details and rejects unknown blocks", () => {
    expect(errorOf(() => compile(md(":::details", "x", ":::"))).message).toContain("needs a title");
    expect(errorOf(() => compile(md(":::warning", "x", ":::"))).message).toContain("Available blocks");
  });
});

describe("code blocks", () => {
  it("shows plain python blocks without a button", () => {
    expect(compile(md("```python", "x = 1", "```"))).toEqual([{ type: "code", text: "x = 1", language: "python" }]);
  });

  it("adds the button after the output that follows a runnable block", () => {
    expect(compile(md("```python run", "print(5)", "```", "", "```output", "5", "```"))).toEqual([
      { type: "code", text: "print(5)", language: "python" },
      { type: "paragraph", text: "Salida:" },
      { type: "code", text: "5", language: "python" },
      { type: "test-button", text: "Probar >>", code: "print(5)" },
    ]);
  });

  it("uses the labels of each language and accepts custom labels", () => {
    expect(compile(md("```python run", "print(5)", "```", "```output", "5", "```"), "en")).toEqual([
      { type: "code", text: "print(5)", language: "python" },
      { type: "paragraph", text: "Output:" },
      { type: "code", text: "5", language: "python" },
      { type: "test-button", text: "Try >>", code: "print(5)" },
    ]);
    expect(compile(md('```output label="Resultado:"', "5", "```", '```output label=""', "6", "```"))).toEqual([
      { type: "paragraph", text: "Resultado:" },
      { type: "code", text: "5", language: "python" },
      { type: "code", text: "6", language: "python" },
    ]);
  });

  it("creates only the button for hidden exercises", () => {
    expect(compile(md('```python run="Practicar >>" hidden', "# 1. Crea una lista", "```"))).toEqual([
      { type: "test-button", text: "Practicar >>", code: "# 1. Crea una lista" },
    ]);
  });

  it("does not attach the next output to a hidden button", () => {
    expect(compile(md("```python run hidden", "print(1)", "```", "```output", "1", "```"))).toEqual([
      { type: "test-button", text: "Probar >>", code: "print(1)" },
      { type: "paragraph", text: "Salida:" },
      { type: "code", text: "1", language: "python" },
    ]);
  });

  it("keeps the code exactly as written", () => {
    expect(compile(md("```python", "if x:", "\tprint('a  b')", "```"))).toEqual([
      { type: "code", text: "if x:\n\tprint('a  b')", language: "python" },
    ]);
  });

  it("accepts the options used to run examples", () => {
    expect(compile(md('```python run error input="7|3"', "int('x')", "```", "```output static", "x", "```"))).toHaveLength(4);
  });

  it("rejects unknown languages and options", () => {
    expect(errorOf(() => compile(md("```js", "x", "```"))).message).toContain('language "js"');
    expect(errorOf(() => compile(md("```python fast", "x", "```"))).message).toContain('Unknown option "fast"');
    expect(errorOf(() => compile(md("```python hidden", "x", "```"))).message).toContain('together with "run"');
    expect(errorOf(() => compile(md('```python input="1"', "x", "```"))).message).toContain('together with "run"');
    expect(errorOf(() => compile(md("```python run input", "x", "```"))).message).toContain("needs a value");
    expect(errorOf(() => compile(md("```python run run", "x", "```"))).message).toContain("repeated");
  });
});

describe("error locations", () => {
  it("points to the line in the file, counting the header", () => {
    const error = errorOf(() => compile(md("Hola", "", "# Mal"), "es", 4));
    expect(error.location).toEqual({ file: "content/module1/learning-unit1.es.md", line: 7, column: 1 });
    expect(error.message).toMatch(/^content\/module1\/learning-unit1\.es\.md:7:1: /);
  });
});

describe("renderInlineMarkdown", () => {
  const ctx = { file: "x.md", language: "es" as const, lineOffset: 0 };

  it("renders single-line text for titles", () => {
    expect(renderInlineMarkdown("Manejo de `try` y `except`", ctx)).toBe(
      'Manejo de <code class="language-python">try</code> y <code class="language-python">except</code>',
    );
    expect(renderInlineMarkdown("", ctx)).toBe("");
  });

  it("rejects text that is not a single line", () => {
    expect(errorOf(() => renderInlineMarkdown("Uno\n\nDos", ctx)).message).toContain("single line");
  });
});
