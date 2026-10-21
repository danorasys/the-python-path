export const LANGUAGES = ["es", "en", "de"] as const;

export type Language = (typeof LANGUAGES)[number];

export const DEFAULT_LANGUAGE: Language = "en";

export const LANGUAGE_NAMES = {
  es: "Español",
  en: "English",
  de: "Deutsch",
} as const satisfies Record<Language, string>;

export function isLanguage(value: unknown): value is Language {
  return typeof value === "string" && (LANGUAGES as readonly string[]).includes(value);
}

export function contentFallbackChain(language: Language): Language[] {
  return [...new Set<Language>([language, "en", "es"])];
}

export function detectBrowserLanguage(preferred: readonly string[]): Language | null {
  for (const tag of preferred) {
    const base = tag.toLowerCase().split("-")[0];
    if (isLanguage(base)) return base;
  }
  return null;
}
