import type { Language } from "../../src/i18n/languages";

export const BASE_LANGUAGE: Language = "es";

export const DEFAULT_LABELS = {
  es: { run: "Probar >>", output: "Salida:" },
  en: { run: "Try >>", output: "Output:" },
  de: { run: "Ausprobieren >>", output: "Ausgabe:" },
} as const satisfies Record<Language, { run: string; output: string }>;

export const STEP_COLORS = ["#FFD43B", "#3776AB", "#1B983A", "#6464FF"] as const;

export function stepColor(color: string | undefined, position: number): string {
  return color ?? STEP_COLORS[position % STEP_COLORS.length] ?? STEP_COLORS[0];
}
