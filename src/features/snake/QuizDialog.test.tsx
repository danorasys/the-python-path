import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeAll, describe, expect, it, vi } from "vitest";
import type { Question } from "../../content/types";
import { I18nProvider } from "../../i18n/I18nProvider";
import { QuizDialog } from "./QuizDialog";

beforeAll(() => {
  Object.assign(HTMLDialogElement.prototype, {
    showModal(this: HTMLDialogElement) {
      this.open = true;
    },
    close(this: HTMLDialogElement) {
      this.open = false;
    },
  });
});

const question: Question = {
  id: 7,
  type: "multiple-choice",
  content: [{ type: "subtitle2", text: "¿Qué imprime <code>print(2 * 3)</code>?" }],
  options: [
    { label: "A", text: "5", correct: false },
    { label: "B", text: "6", correct: true },
  ],
};

function renderDialog(onResolve = vi.fn()) {
  render(
    <I18nProvider initial="es">
      <QuizDialog question={question} onResolve={onResolve} />
    </I18nProvider>,
  );
  return onResolve;
}

describe("<QuizDialog>", () => {
  it("rewards a correct answer after the player continues", async () => {
    const onResolve = renderDialog();
    expect(screen.getByRole("dialog", { hidden: true })).toHaveAttribute("open");

    await userEvent.click(screen.getByRole("button", { name: /6/ }));
    expect(screen.getByText("¡Respuesta Correcta!")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /6/ })).toBeDisabled();
    expect(onResolve).not.toHaveBeenCalled();

    await userEvent.click(screen.getByRole("button", { name: /Continuar/ }));
    expect(onResolve).toHaveBeenCalledWith(true);
  });

  it("shows the right answer after a mistake", async () => {
    const onResolve = renderDialog();
    await userEvent.click(screen.getByRole("button", { name: /5/ }));
    expect(screen.getByText("Respuesta Incorrecta")).toBeInTheDocument();
    expect(screen.getByText(/La respuesta correcta era/)).toHaveTextContent("6");
    await userEvent.click(screen.getByRole("button", { name: /Continuar/ }));
    expect(onResolve).toHaveBeenCalledWith(false);
  });

  it("lets the player skip without points", async () => {
    const onResolve = renderDialog();
    await userEvent.click(screen.getByRole("button", { name: "Saltar pregunta" }));
    expect(onResolve).toHaveBeenCalledWith(false);
  });
});
