import { useCallback, useRef } from "react";
import { useSearchParams } from "react-router";
import { PageTitle } from "../../components/PageTitle";
import { Button } from "../../components/ui/Button";
import { Callout } from "../../components/ui/Callout";
import { Icon } from "../../components/ui/Icon";
import { Window } from "../../components/ui/Window";
import { useI18n } from "../../i18n/useI18n";
import { CodeEditor } from "./CodeEditor";
import { OutputConsole } from "./OutputConsole";
import styles from "./PracticePage.module.css";
import { usePythonRunner } from "./usePythonRunner";

const DEFAULT_CODE = '# The Python Path\nprint("Hello World!")\n';

export default function PracticePage() {
  const { t } = useI18n();
  const [searchParams] = useSearchParams();
  const initialCode = searchParams.get("code") ?? DEFAULT_CODE;
  const codeRef = useRef(initialCode);
  const runner = usePythonRunner();
  const { run } = runner;

  const runCode = useCallback(() => void run(codeRef.current), [run]);
  const handleChange = useCallback((code: string) => {
    codeRef.current = code;
  }, []);

  const statusText = {
    loading: t.practice.loadingRuntime,
    ready: t.practice.runtimeReady,
    error: t.practice.runtimeError,
  }[runner.status];

  return (
    <>
      <PageTitle title={t.practice.title} />
      <header className={styles.header}>
        <h1 className={styles.title}>{t.practice.title}</h1>
        <p className={styles.intro}>{t.practice.intro}</p>
      </header>

      {runner.status === "error" && (
        <div className={styles.runtimeError}>
          <Callout tone="danger" role="alert">
            {t.practice.runtimeError}
          </Callout>
        </div>
      )}

      <div className={styles.toolbar}>
        <span className={`${styles.status} ${styles[runner.status]}`} role="status">
          <span className={styles.statusDot} aria-hidden="true" />
          {runner.status === "error" ? t.content.errorTitle : statusText}
        </span>
        <span className={styles.shortcut}>{t.practice.shortcut}</span>
        <Button onClick={runner.clear} disabled={runner.running || runner.output.length === 0}>
          <Icon name="trash" />
          {t.practice.clear}
        </Button>
        <Button
          variant="primary"
          onClick={runCode}
          disabled={runner.status !== "ready" || runner.running}
        >
          <Icon name="play" />
          {runner.running ? t.practice.running : t.practice.run}
        </Button>
      </div>

      <div className={styles.workspace}>
        <Window title="main.py" tone="blue" bodyClassName={styles.editorBody}>
          <CodeEditor
            initialCode={initialCode}
            label={t.practice.editorLabel}
            loadingLabel={t.practice.loadingEditor}
            onChange={handleChange}
            onRun={runCode}
          />
        </Window>
        <Window title={t.practice.outputTitle} tone="yellow">
          <OutputConsole
            output={runner.output}
            pendingInput={runner.pendingInput}
            onSubmitInput={runner.submitInput}
          />
        </Window>
      </div>
    </>
  );
}
