import type { Language } from "../i18n/languages";
import { cached, fetchLocalized, fetchUnlocalized } from "./loader";
import {
  parsePathDocument,
  parseQuestionConfig,
  parseQuestionSet,
  parseRedirects,
  parseUnitDocument,
} from "./parse";
import type {
  Localized,
  ModuleId,
  PathDocument,
  Question,
  Redirects,
  UnitDocument,
  UnitId,
} from "./types";

export function getRoadmap(language: Language): Promise<Localized<PathDocument>> {
  return cached(`roadmap:${language}`, () =>
    fetchLocalized(language, (lang) => `roadmap/roadmap-${lang}.json`, parsePathDocument),
  );
}

export function getModule(moduleId: ModuleId, language: Language): Promise<Localized<PathDocument>> {
  return cached(`module:${moduleId}:${language}`, () =>
    fetchLocalized(
      language,
      (lang) => `modules/${moduleId}/${moduleId}-${lang}.json`,
      parsePathDocument,
    ),
  );
}

export function getUnit(
  moduleId: ModuleId,
  unitId: UnitId,
  language: Language,
): Promise<Localized<UnitDocument>> {
  return cached(`unit:${moduleId}:${unitId}:${language}`, () =>
    fetchLocalized(
      language,
      (lang) => `modules/${moduleId}/learning-units/${unitId}/${unitId}-${lang}.json`,
      parseUnitDocument,
    ),
  );
}

export function getRedirects(): Promise<Redirects> {
  return cached("redirects", () =>
    fetchUnlocalized("redirects.json", parseRedirects).catch((): Redirects => ({})),
  );
}

const QUESTIONS_PER_SET = 10;

function questionSetFolder(index: number): string {
  const start = index * QUESTIONS_PER_SET + 1;
  return `questions-${start}-${start + QUESTIONS_PER_SET - 1}`;
}

export function getQuestions(language: Language): Promise<Question[]> {
  return cached(`questions:${language}`, async () => {
    const { questionSets } = await fetchUnlocalized(
      "python-questions/config.json",
      parseQuestionConfig,
    );
    const folders = Array.from({ length: questionSets }, (_, index) => questionSetFolder(index));
    const results = await Promise.allSettled(
      folders.map((folder) =>
        fetchLocalized(
          language,
          (lang) => `python-questions/${folder}/${folder}-${lang}.json`,
          parseQuestionSet,
        ),
      ),
    );
    return results.flatMap((result) => (result.status === "fulfilled" ? result.value.data : []));
  });
}
