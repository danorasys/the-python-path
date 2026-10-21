import { useCallback, useEffect, useMemo, useState, useTransition, type ReactNode } from "react";
import { readStorage, STORAGE_KEYS, writeStorage } from "../lib/storage";
import { I18nContext, type I18nContextValue } from "./I18nContext";
import { DEFAULT_LANGUAGE, detectBrowserLanguage, isLanguage, type Language } from "./languages";
import { de } from "./locales/de";
import { en } from "./locales/en";
import { es } from "./locales/es";
import type { Dictionary } from "./types";

const DICTIONARIES = { es, en, de } as const satisfies Record<Language, Dictionary>;

function initialLanguage(): Language {
  const saved = readStorage(STORAGE_KEYS.language);
  if (isLanguage(saved)) return saved;
  return detectBrowserLanguage(navigator.languages) ?? DEFAULT_LANGUAGE;
}

interface I18nProviderProps {
  children: ReactNode;
  initial?: Language;
}

export function I18nProvider({ children, initial }: I18nProviderProps) {
  const [language, setLanguageState] = useState<Language>(() => initial ?? initialLanguage());
  const [, startTransition] = useTransition();

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((next: Language) => {
    writeStorage(STORAGE_KEYS.language, next);
    startTransition(() => setLanguageState(next));
  }, [startTransition]);

  const value = useMemo<I18nContextValue>(
    () => ({ language, t: DICTIONARIES[language], setLanguage }),
    [language, setLanguage],
  );

  return <I18nContext value={value}>{children}</I18nContext>;
}
