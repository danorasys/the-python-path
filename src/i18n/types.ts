import type { Language } from "./languages";

export interface Dictionary {
  meta: {
    siteName: string;
    skipToContent: string;
  };
  languageNames: Record<Language, string>;
  nav: {
    home: string;
    roadmap: string;
    practice: string;
    play: string;
    openMenu: string;
    closeMenu: string;
    mainLabel: string;
    language: string;
  };
  footer: {
    createdBy: string;
  };
  home: {
    welcome: string;
    intro: string;
    cta: string;
    tryCta: string;
    codeMessage: string;
    codeOutputLabel: string;
  };
  roadmap: {
    backToRoadmap: string;
    stationLabel: string;
    unitsCount: string;
  };
  unit: {
    note: string;
    tip: string;
    backToModule: string;
    previous: string;
    next: string;
    position: string;
    copyCode: string;
    copied: string;
    tryItHint: string;
    codeLabel: string;
  };
  content: {
    loading: string;
    fallbackNotice: string;
    errorTitle: string;
    errorBody: string;
    retry: string;
    notFoundTitle: string;
    notFoundBody: string;
    goToRoadmap: string;
    goHome: string;
  };
  practice: {
    title: string;
    intro: string;
    editorLabel: string;
    run: string;
    stop: string;
    clear: string;
    shortcut: string;
    loadingRuntime: string;
    runtimeReady: string;
    runtimeError: string;
    outputTitle: string;
    emptyOutput: string;
    inputLabel: string;
    inputPlaceholder: string;
    loadingEditor: string;
    lineCountOne: string;
    lineCountOther: string;
    truncatedOutput: string;
  };
  snake: {
    title: string;
    intro: string;
    score: string;
    best: string;
    start: string;
    pause: string;
    resume: string;
    readyTitle: string;
    readyBody: string;
    pausedTitle: string;
    gameOverTitle: string;
    gameOverMessage: string;
    playAgain: string;
    goHome: string;
    legendFood: string;
    legendBonus: string;
    controls: string;
    up: string;
    down: string;
    left: string;
    right: string;
    questionTitle: string;
    answerCorrectTitle: string;
    answerIncorrectTitle: string;
    correctAnswerWas: string;
    congratulationsMessage: string;
    bonusPoints: string;
    continue: string;
    skip: string;
  };
}
