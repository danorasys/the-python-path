import { useEffect, useId, useRef, useState } from "react";
import { RichText } from "../../components/RichText";
import { Button } from "../../components/ui/Button";
import { Icon } from "../../components/ui/Icon";
import type { Question, QuestionOption } from "../../content/types";
import { format } from "../../i18n/format";
import { useI18n } from "../../i18n/useI18n";
import { ContentBlocks } from "../learning/ContentBlocks";
import { BONUS_POINTS } from "./engine";
import styles from "./QuizDialog.module.css";

interface QuizDialogProps {
  question: Question;
  onResolve: (correct: boolean) => void;
}

function optionClass(
  question: Question,
  option: QuestionOption,
  answer: QuestionOption | null,
): string {
  const classes = [styles.option];
  if (question.type === "true-false") {
    classes.push(option.label === "True" ? styles.trueOption : styles.falseOption);
  }
  if (answer) {
    if (option.correct) classes.push(styles.correct);
    else if (option === answer) classes.push(styles.wrong);
    else classes.push(styles.dimmed);
  }
  return classes.join(" ");
}

export function QuizDialog({ question, onResolve }: QuizDialogProps) {
  const { t } = useI18n();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const continueRef = useRef<HTMLButtonElement>(null);
  const [answer, setAnswer] = useState<QuestionOption | null>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    return () => dialog?.close();
  }, []);

  useEffect(() => {
    if (answer) continueRef.current?.focus();
  }, [answer]);

  const correctOption = question.options.find((option) => option.correct);
  const isCorrect = answer?.correct === true;

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onResolve(isCorrect);
      }}
    >
      <div className={styles.head}>
        <h2 id={titleId} className={styles.heading}>
          {t.snake.questionTitle}
        </h2>
        {!answer && (
          <Button size="small" onClick={() => onResolve(false)}>
            {t.snake.skip}
          </Button>
        )}
      </div>

      <div className={styles.body}>
        <ContentBlocks blocks={question.content} interactive={false} />

        <ul className={styles.options}>
          {question.options.map((option) => (
            <li key={option.label}>
              <button
                type="button"
                className={optionClass(question, option, answer)}
                disabled={answer !== null}
                onClick={() => setAnswer(option)}
              >
                {question.type === "multiple-choice" && (
                  <span className={styles.letter} aria-hidden="true">
                    {option.label}
                  </span>
                )}
                <span>
                  <RichText html={option.text} />
                </span>
              </button>
            </li>
          ))}
        </ul>

        {answer && (
          <div
            className={`${styles.feedback} ${isCorrect ? styles.feedbackCorrect : styles.feedbackWrong}`}
            role="status"
          >
            <h3 className={styles.feedbackTitle}>
              {isCorrect ? t.snake.answerCorrectTitle : t.snake.answerIncorrectTitle}
            </h3>
            {isCorrect ? (
              <p>
                {t.snake.congratulationsMessage}{" "}
                <strong>{format(t.snake.bonusPoints, { points: BONUS_POINTS })}</strong>
              </p>
            ) : (
              correctOption && (
                <p>
                  {t.snake.correctAnswerWas}: <RichText html={correctOption.text} />
                </p>
              )
            )}
            <div className={styles.actions}>
              <Button ref={continueRef} variant="primary" onClick={() => onResolve(isCorrect)}>
                {t.snake.continue}
                <Icon name="arrowRight" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </dialog>
  );
}
