import { useEffect, useMemo, useState } from "react";
import { Window } from "../../components/ui/Window";
import { useI18n } from "../../i18n/useI18n";
import { usePrefersReducedMotion } from "../../lib/usePrefersReducedMotion";
import { buildSnippets, typingFrames, type Line } from "./terminalScript";
import styles from "./TerminalDemo.module.css";

const CHAR_DELAY_MS = 32;
const LINE_PAUSE_MS = 280;
const HOLD_MS = 2400;

function sleep(ms: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    const timer = window.setTimeout(resolve, ms);
    signal.addEventListener(
      "abort",
      () => {
        window.clearTimeout(timer);
        reject(new DOMException("Animation stopped", "AbortError"));
      },
      { once: true },
    );
  });
}

interface Frame {
  lines: Line[];
  caretLine: number;
}

export function TerminalDemo() {
  const { t } = useI18n();
  const reducedMotion = usePrefersReducedMotion();
  const snippets = useMemo(
    () => buildSnippets(t.home.codeMessage, t.home.codeOutputLabel),
    [t.home.codeMessage, t.home.codeOutputLabel],
  );
  const [frame, setFrame] = useState<Frame>({ lines: [], caretLine: 0 });
  const lineCount = Math.max(...snippets.map((snippet) => snippet.length));

  useEffect(() => {
    if (reducedMotion) return;
    const controller = new AbortController();
    const { signal } = controller;

    const run = async () => {
      for (let index = 0; ; index = (index + 1) % snippets.length) {
        const snippet = snippets[index];
        if (!snippet) return;
        let lastLine = 0;
        for (const next of typingFrames(snippet)) {
          if (next.caretLine !== lastLine) await sleep(LINE_PAUSE_MS, signal);
          lastLine = next.caretLine;
          setFrame(next);
          await sleep(CHAR_DELAY_MS, signal);
        }
        await sleep(HOLD_MS, signal);
      }
    };
    run().catch(() => {
    });
    return () => controller.abort();
  }, [snippets, reducedMotion]);

  const shown: Frame = reducedMotion ? { lines: snippets.at(-1) ?? [], caretLine: -1 } : frame;

  return (
    <div className={styles.terminal} aria-hidden="true">
      <Window title="python3 — learning_path.py" tone="yellow">
        <div className={styles.screen}>
          {Array.from({ length: lineCount }, (_, lineIndex) => (
            <div key={lineIndex} className={styles.line}>
              {shown.lines[lineIndex]?.map((token, tokenIndex) => (
                <span key={tokenIndex} className={styles[token.kind]}>
                  {token.text}
                </span>
              ))}
              {shown.caretLine === lineIndex && <span className={styles.caret} />}
            </div>
          ))}
        </div>
      </Window>
    </div>
  );
}
