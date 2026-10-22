import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { useI18n } from "../../i18n/useI18n";
import styles from "./PracticePage.module.css";
import type { OutputChunk, PendingInput } from "./usePythonRunner";

const STICK_THRESHOLD_PX = 32;

interface OutputConsoleProps {
  output: OutputChunk[];
  truncated: boolean;
  pendingInput: PendingInput | null;
  onSubmitInput: (value: string) => void;
}

function InputLine({ prompt, onSubmit }: { prompt: string; onSubmit: (value: string) => void }) {
  const { t } = useI18n();
  const [value, setValue] = useState("");
  const inputId = useId();

  const submit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(value);
  };

  return (
    <form className={styles.inputLine} onSubmit={submit}>
      <label htmlFor={inputId} className="visually-hidden">
        {t.practice.inputLabel}
      </label>
      {prompt && <span>{prompt}</span>}
      <input
        id={inputId}
        className={styles.inputField}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={t.practice.inputPlaceholder}
        autoComplete="off"
        spellCheck={false}
        autoFocus
      />
    </form>
  );
}

export function OutputConsole({
  output,
  truncated,
  pendingInput,
  onSubmitInput,
}: OutputConsoleProps) {
  const { t } = useI18n();
  const screenRef = useRef<HTMLDivElement>(null);
  const followRef = useRef(true);

  const handleScroll = () => {
    const screen = screenRef.current;
    if (!screen) return;
    followRef.current =
      screen.scrollHeight - screen.scrollTop - screen.clientHeight < STICK_THRESHOLD_PX;
  };

  useEffect(() => {
    const screen = screenRef.current;
    if (output.length === 0) followRef.current = true;
    if (screen && followRef.current) screen.scrollTop = screen.scrollHeight;
  }, [output, pendingInput]);

  const isEmpty = output.length === 0 && !pendingInput;

  return (
    <div
      ref={screenRef}
      className={styles.screen}
      role="log"
      aria-live="polite"
      onScroll={handleScroll}
    >
      {isEmpty ? (
        <p className={styles.placeholder}>{t.practice.emptyOutput}</p>
      ) : (
        <div className={styles.pre}>
          {truncated && <p className={styles.truncated}>{t.practice.truncatedOutput}</p>}
          {output.map((chunk) => (
            <span key={chunk.id} className={styles[chunk.kind]}>
              {chunk.text}
            </span>
          ))}
          {pendingInput && (
            <InputLine key={pendingInput.id} prompt={pendingInput.prompt} onSubmit={onSubmitInput} />
          )}
        </div>
      )}
    </div>
  );
}
