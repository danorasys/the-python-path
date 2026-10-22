import type { Language } from "../../src/i18n/languages";

export const BASE_LANGUAGE: Language = "es";

export interface Labels {
  run: string;
  solution: string;
  practice: string;
  output: string;
  note: string;
  tip: string;
  details: string;
}

export const DEFAULT_LABELS = {
  es: {
    run: "Probar >>",
    solution: "Probar Solución >>",
    practice: "Practicar >>",
    output: "Salida:",
    note: "Nota:",
    tip: "Tip:",
    details: "Observar posible solución",
  },
  en: {
    run: "Try >>",
    solution: "Try Solution >>",
    practice: "Practice >>",
    output: "Output:",
    note: "Note:",
    tip: "Tip:",
    details: "View possible solution",
  },
  de: {
    run: "Ausprobieren >>",
    solution: "Lösung Ausprobieren >>",
    practice: "Üben >>",
    output: "Ausgabe:",
    note: "Hinweis:",
    tip: "Tipp:",
    details: "Mögliche Lösung anzeigen",
  },
} as const satisfies Record<Language, Labels>;

export function foreignDefault(text: string, language: Language): Language | null {
  const own = new Set<string>(Object.values(DEFAULT_LABELS[language]));
  if (own.has(text)) return null;
  for (const [other, labels] of Object.entries(DEFAULT_LABELS)) {
    if (other !== language && (Object.values(labels) as string[]).includes(text)) return other as Language;
  }
  return null;
}

export const STEP_COLORS = ["#FFD43B", "#3776AB", "#1B983A", "#6464FF"] as const;

export function stepColor(color: string | undefined, position: number): string {
  return color ?? STEP_COLORS[position % STEP_COLORS.length] ?? STEP_COLORS[0];
}
