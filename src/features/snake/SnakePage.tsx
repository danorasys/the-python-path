import { useCallback, useEffect, useRef, useState } from "react";
import { routes } from "../../app/routes";
import { PageTitle } from "../../components/PageTitle";
import { Button, ButtonLink } from "../../components/ui/Button";
import { Icon, type IconName } from "../../components/ui/Icon";
import { getQuestions } from "../../content/resources";
import type { Question } from "../../content/types";
import { format } from "../../i18n/format";
import { useI18n } from "../../i18n/useI18n";
import { BONUS_POINTS, type Direction } from "./engine";
import { QuizDialog } from "./QuizDialog";
import { SnakeBoard } from "./SnakeBoard";
import styles from "./SnakePage.module.css";
import { useSnakeGame } from "./useSnakeGame";

const KEY_TO_DIRECTION: Record<string, Direction> = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
  w: "up",
  s: "down",
  a: "left",
  d: "right",
};

const PAD: { direction: Direction; icon: IconName; className: string | undefined }[] = [
  { direction: "up", icon: "arrowUp", className: styles.padUp },
  { direction: "left", icon: "arrowLeft", className: styles.padLeft },
  { direction: "right", icon: "arrowRight", className: styles.padRight },
  { direction: "down", icon: "arrowDown", className: styles.padDown },
];

function useQuestionBank() {
  const { language } = useI18n();
  const [questions, setQuestions] = useState<Question[]>([]);
  const asked = useRef(new Set<number>());

  useEffect(() => {
    let active = true;
    getQuestions(language).then(
      (loaded) => active && setQuestions(loaded),
      (error: unknown) => console.warn("[snake] questions unavailable", error),
    );
    return () => {
      active = false;
    };
  }, [language]);

  const pick = useCallback((): Question | null => {
    if (questions.length === 0) return null;
    let pool = questions.filter((question) => !asked.current.has(question.id));
    if (pool.length === 0) {
      asked.current.clear();
      pool = questions;
    }
    const question = pool[Math.floor(Math.random() * pool.length)] ?? null;
    if (question) asked.current.add(question.id);
    return question;
  }, [questions]);

  return pick;
}

export default function SnakePage() {
  const { t } = useI18n();
  const { state, best, start, turn, togglePause, answerQuiz } = useSnakeGame();
  const pickQuestion = useQuestionBank();
  const [quiz, setQuiz] = useState<{ question: Question; round: number } | null>(null);
  const round = useRef(0);

  useEffect(() => {
    if (state.status !== "quiz" || quiz) return;
    const question = pickQuestion();
    if (question) setQuiz({ question, round: round.current++ });
    else answerQuiz(false);
  }, [state.status, quiz, pickQuestion, answerQuiz]);

  const resolveQuiz = useCallback(
    (correct: boolean) => {
      setQuiz(null);
      answerQuiz(correct);
    },
    [answerQuiz],
  );

  useEffect(() => {
    if (quiz) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select")) return;

      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      const direction = KEY_TO_DIRECTION[key];
      if (direction) {
        event.preventDefault();
        turn(direction);
      } else if (key === " " && !target?.closest("button, a")) {
        event.preventDefault();
        togglePause();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [quiz, turn, togglePause]);

  const overlay = (() => {
    switch (state.status) {
      case "ready":
        return (
          <>
            <h2 className={styles.overlayTitle}>{t.snake.readyTitle}</h2>
            <p className={styles.keyboardHint}>{t.snake.readyBody}</p>
            <div className={styles.overlayActions}>
              <Button variant="primary" size="large" onClick={start}>
                <Icon name="play" />
                {t.snake.start}
              </Button>
            </div>
          </>
        );
      case "paused":
        return (
          <>
            <h2 className={styles.overlayTitle}>{t.snake.pausedTitle}</h2>
            <div className={styles.overlayActions}>
              <Button variant="primary" onClick={togglePause}>
                <Icon name="play" />
                {t.snake.resume}
              </Button>
            </div>
          </>
        );
      case "over":
        return (
          <>
            <h2 className={styles.overlayTitle}>{t.snake.gameOverTitle}</h2>
            <p>
              {t.snake.gameOverMessage}: <strong>{state.score}</strong>
            </p>
            <div className={styles.overlayActions}>
              <Button variant="primary" onClick={start}>
                <Icon name="refresh" />
                {t.snake.playAgain}
              </Button>
              <ButtonLink to={routes.home()}>{t.snake.goHome}</ButtonLink>
            </div>
          </>
        );
      default:
        return null;
    }
  })();

  return (
    <>
      <PageTitle title={t.snake.title} />
      <header className={styles.header}>
        <h1 className={styles.title}>{t.snake.title}</h1>
        <p className={styles.intro}>{t.snake.intro}</p>
      </header>

      <div className={styles.layout}>
        <div>
          <div className={styles.boardArea}>
            <SnakeBoard state={state} label={`${t.snake.title}. ${t.snake.score}: ${state.score}`}>
              {overlay && (
                <div className={styles.overlay}>
                  <div className={styles.overlayCard}>{overlay}</div>
                </div>
              )}
            </SnakeBoard>
          </div>

          <div className={styles.pad} role="group" aria-label={t.snake.controls}>
            {PAD.map((button) => (
              <Button
                key={button.direction}
                className={button.className}
                iconOnly
                aria-label={t.snake[button.direction]}
                onClick={() => turn(button.direction)}
              >
                <Icon name={button.icon} />
              </Button>
            ))}
          </div>
        </div>

        <aside className={styles.panel}>
          <div className={styles.scores} aria-live="polite">
            <p className={styles.score}>
              <span className={styles.scoreLabel}>{t.snake.score}</span>
              <span className={styles.scoreValue}>{state.score}</span>
            </p>
            <p className={styles.score}>
              <span className={styles.scoreLabel}>{t.snake.best}</span>
              <span className={styles.scoreValue}>{best}</span>
            </p>
          </div>

          <ul className={styles.legend}>
            <li className={styles.legendItem}>
              <span className={`${styles.swatch} ${styles.food}`} aria-hidden="true" />
              {t.snake.legendFood}
            </li>
            <li className={styles.legendItem}>
              <span className={`${styles.swatch} ${styles.bonus}`} aria-hidden="true">
                ?
              </span>
              {format(t.snake.legendBonus, { points: BONUS_POINTS })}
            </li>
          </ul>

          {(state.status === "running" || state.status === "paused") && (
            <Button onClick={togglePause}>
              <Icon name={state.status === "running" ? "pause" : "play"} />
              {state.status === "running" ? t.snake.pause : t.snake.resume}
            </Button>
          )}
        </aside>
      </div>

      {quiz && <QuizDialog key={quiz.round} question={quiz.question} onResolve={resolveQuiz} />}
    </>
  );
}
