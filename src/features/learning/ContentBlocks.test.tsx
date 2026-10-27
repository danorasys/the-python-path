import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import type { ContentBlock } from "../../content/types";
import { I18nProvider } from "../../i18n/I18nProvider";
import { ContentBlocks } from "./ContentBlocks";

function renderBlocks(blocks: ContentBlock[]) {
  return render(
    <MemoryRouter>
      <I18nProvider>
        <ContentBlocks blocks={blocks} />
      </I18nProvider>
    </MemoryRouter>,
  );
}

describe("ContentBlocks callouts", () => {
  it("shows the title and any kind of content inside a note", () => {
    renderBlocks([
      {
        type: "note",
        title: "<em>Nota:</em>",
        content: [
          { type: "paragraph", text: "Texto <strong>importante</strong>." },
          { type: "list", items: ["uno", "dos"] },
          { type: "code", text: "print(1)", language: "python" },
          { type: "test-button", text: "Probar >>", code: "print(1)" },
        ],
      },
    ]);
    const note = screen.getByRole("note");
    expect(within(note).getByText("Nota:").tagName).toBe("EM");
    expect(within(note).getByText("importante").tagName).toBe("STRONG");
    expect(within(note).getAllByRole("listitem")).toHaveLength(2);
    expect(note).toHaveTextContent("print(1)");
    expect(within(note).getByRole("link", { name: /Probar/ })).toBeInTheDocument();
  });

  it("leaves the title out when there is none and shows markup as text", () => {
    renderBlocks([{ type: "tip", content: [{ type: "paragraph", text: "<img src=x onerror=alert(1)> hola" }] }]);
    const tip = screen.getByRole("note");
    expect(tip.querySelector("strong, img")).toBeNull();
    expect(tip).toHaveTextContent("hola");
  });
});
