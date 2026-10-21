import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { LanguageSwitcher } from "../components/layout/LanguageSwitcher";
import { format } from "./format";
import { I18nProvider } from "./I18nProvider";
import { contentFallbackChain, detectBrowserLanguage } from "./languages";
import { de } from "./locales/de";
import { en } from "./locales/en";
import { es } from "./locales/es";
import { useI18n } from "./useI18n";

function keyPaths(value: unknown, prefix = ""): string[] {
  if (typeof value !== "object" || value === null) return [prefix];
  return Object.entries(value).flatMap(([key, child]) => keyPaths(child, prefix ? `${prefix}.${key}` : key));
}

describe("dictionaries", () => {
  it("define exactly the same keys in every language", () => {
    expect(keyPaths(en)).toEqual(keyPaths(es));
    expect(keyPaths(de)).toEqual(keyPaths(es));
  });
});

describe("language helpers", () => {
  it("detects the first supported browser language", () => {
    expect(detectBrowserLanguage(["fr-FR", "de-AT", "en"])).toBe("de");
    expect(detectBrowserLanguage(["fr"])).toBeNull();
  });

  it("always ends the content fallback chain in Spanish", () => {
    expect(contentFallbackChain("de")).toEqual(["de", "en", "es"]);
    expect(contentFallbackChain("es")).toEqual(["es", "en"]);
  });

  it("formats placeholders and leaves unknown ones visible", () => {
    expect(format("Unit {current} of {total} {x}", { current: 2, total: 6 })).toBe("Unit 2 of 6 {x}");
  });
});

function Greeting() {
  const { t } = useI18n();
  return <p>{t.home.welcome}</p>;
}

describe("<LanguageSwitcher>", () => {
  it("switches the interface language and remembers it", async () => {
    render(
      <I18nProvider initial="en">
        <LanguageSwitcher />
        <Greeting />
      </I18nProvider>,
    );
    expect(screen.getByText("Welcome to")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Deutsch" }));

    expect(await screen.findByText("Willkommen bei")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Deutsch" })).toHaveAttribute("aria-pressed", "true");
    expect(window.localStorage.getItem("selectedLanguage")).toBe("de");
    expect(document.documentElement.lang).toBe("de");
  });
});
