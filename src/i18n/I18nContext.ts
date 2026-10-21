import { createContext } from "react";
import type { Language } from "./languages";
import type { Dictionary } from "./types";

export interface I18nContextValue {
  language: Language;
  t: Dictionary;
  setLanguage: (language: Language) => void;
}

export const I18nContext = createContext<I18nContextValue | null>(null);
