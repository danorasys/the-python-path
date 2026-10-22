import type { Language } from "../i18n/languages";

export type ModuleId = `module${number}`;
export type UnitId = `learning-unit${number}`;

export interface PathStep {
  name: string;
  description: string;
  color: string;
  module?: ModuleId;
  unit?: UnitId;
}

export interface PathDocument {
  title: string;
  description: string;
  steps: PathStep[];
}

export type TextBlockType =
  | "subtitle1"
  | "subtitle2"
  | "subtitle3"
  | "subtitle4"
  | "paragraph"
  | "note"
  | "tip";

export type ContentBlock =
  | { type: TextBlockType; text: string }
  | { type: "list"; items: string[] }
  | { type: "code"; text: string; language: string }
  | { type: "test-button"; text: string; code: string }
  | { type: "image"; src: string; caption?: string }
  | { type: "divider" }
  | { type: "collapsible"; title: string; content: ContentBlock[] }
  | { type: "table"; title?: string; headers: string[]; rows: string[][] };

export interface UnitAddress {
  module: ModuleId;
  unit: UnitId;
}

export type Redirects = Partial<Record<string, UnitAddress>>;

export interface UnitDocument {
  title: string;
  description: string;
  content: ContentBlock[];
}

export interface QuestionOption {
  label: string;
  text: string;
  correct: boolean;
}

export interface Question {
  id: number;
  type: "multiple-choice" | "true-false";
  content: ContentBlock[];
  options: QuestionOption[];
}

export interface Localized<T> {
  data: T;
  language: Language;
  requestedLanguage: Language;
}
