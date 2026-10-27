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
  it("keeps the label as the title of the note", () => {
    expect(compile(md(":::note[Nota:]", "Los `int` no tienen decimales.", ":::"))).toEqual([
      {
        type: "note",
        title: "Nota:",
        content: [{ type: "paragraph", text: 'Los <code class="language-python">int</code> no tienen decimales.' }],
      },
    ]);
  });

  it("uses the default label of each language and allows several paragraphs", () => {
    expect(compile(md(":::tip", "Uno.", "", "Dos.", ":::"))).toEqual([
      {
        type: "tip",
        title: "Tip:",
        content: [
          { type: "paragraph", text: "Uno." },
          { type: "paragraph", text: "Dos." },
        ],
      },
    ]);
    expect(compile(md(":::note", "Eins.", ":::"), "de")).toEqual([
      { type: "note", title: "Hinweis:", content: [{ type: "paragraph", text: "Eins." }] },
    ]);
  });

  it("leaves the label out when the brackets are empty", () => {
    expect(compile(md(":::note[]", "Solo texto.", ":::"))).toEqual([
      { type: "note", content: [{ type: "paragraph", text: "Solo texto." }] },
    ]);
  });

  it("accepts any content inside notes and tips", () => {
    expect(
      compile(md(":::tip", "- uno", "", "```python run", "print(1)", "```", "", "```output", "1", "```", "", "---", ":::")),
    ).toEqual([
      {
        type: "tip",
        title: "Tip:",
        content: [
          { type: "list", items: ["uno"] },
          { type: "code", text: "print(1)", language: "python" },
          { type: "paragraph", text: "Salida:" },
          { type: "code", text: "1", language: "python" },
          { type: "test-button", text: "Probar >>", code: "print(1)" },
          { type: "divider" },
        ],
      },
    ]);
  });

  it("nests blocks inside notes and keeps the solution label inside details", () => {
    expect(compile(md("::::details", ":::note[]", "```python run", "print(1)", "```", ":::", "::::"))).toEqual([
      {
        type: "collapsible",
        title: "Observar posible solución",
        content: [
          {
            type: "note",
            content: [
              { type: "code", text: "print(1)", language: "python" },
              { type: "test-button", text: "Probar Solución >>", code: "print(1)" },
            ],
          },
        ],
      },
    ]);
  });

  it("rejects empty notes and still checks what is inside", () => {
    expect(errorOf(() => compile(md(":::note", ":::"))).message).toContain('":::note" is empty');
    expect(errorOf(() => compile(md(":::tip", "1. uno", ":::"))).message).toContain("Numbered lists");
  });

  it("builds collapsible sections whose buttons try the solution", () => {
    expect(compile(md(":::details[Ver solución]", "```python run", "print(1)", "```", ":::"))).toEqual([
      {
        type: "collapsible",
        title: "Ver solución",
        content: [
          { type: "code", text: "print(1)", language: "python" },
          { type: "test-button", text: "Probar Solución >>", code: "print(1)" },
        ],
      },
    ]);
  });

  it("gives details a default title and rejects unknown blocks", () => {
    expect(compile(md(":::details", "Texto.", ":::"), "en")).toEqual([
      { type: "collapsible", title: "View possible solution", content: [{ type: "paragraph", text: "Texto." }] },
    ]);
    expect(errorOf(() => compile(md(":::warning", "x", ":::"))).message).toContain("Available blocks");
  });

  it("rejects labels left in the default text of another language", () => {
    expect(errorOf(() => compile(md(":::note[Nota:]", "x", ":::"), "en")).message).toContain("default text of the es files");
    expect(errorOf(() => compile(md(":::details[View possible solution]", "x", ":::"), "de")).message).toContain("en files");
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
    expect(compile(md("```python", "if x:", "    print('a  b')", "```"))).toEqual([
      { type: "code", text: "if x:\n    print('a  b')", language: "python" },
    ]);
  });

  it("rejects tabs in Python code and points to the line", () => {
    const error = errorOf(() => compile(md("Texto", "", "```python", "if x:", "\tprint(1)", "```")));
    expect(error.message).toContain("spaces instead of tabs");
    expect(error.location.line).toBe(5);
    expect(compile(md("```output", "a\tb", "```"))).toEqual([
      { type: "paragraph", text: "Salida:" },
      { type: "code", text: "a\tb", language: "python" },
    ]);
  });

  it("creates practice buttons with the label of each language", () => {
    expect(compile(md("```python practice", "# Escribe tu código", "```"))).toEqual([
      { type: "test-button", text: "Practicar >>", code: "# Escribe tu código" },
    ]);
    expect(compile(md("```python practice", "# Code", "```"), "de")).toEqual([
      { type: "test-button", text: "Üben >>", code: "# Code" },
    ]);
    expect(errorOf(() => compile(md("```python practice run", "x", "```"))).message).toContain('"practice" already');
  });

  it("rejects button and output labels in another language", () => {
    expect(errorOf(() => compile(md('```python run="Probar >>"', "x", "```"), "de")).message).toContain("es files");
    expect(errorOf(() => compile(md('```output label="Output:"', "x", "```"), "es")).message).toContain("en files");
    expect(compile(md('```python run="Probar Todos >>"', "x", "```"))).toHaveLength(2);
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
