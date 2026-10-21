import { Highlight } from "prism-react-renderer";
import { useEffect, useState } from "react";
import { Button } from "../../components/ui/Button";
import { Icon } from "../../components/ui/Icon";
import { Window } from "../../components/ui/Window";
import { useI18n } from "../../i18n/useI18n";
import { codeTheme } from "./codeTheme";
import styles from "./CodeBlock.module.css";

const COPIED_FEEDBACK_MS = 2000;

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = "python" }: CodeBlockProps) {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), COPIED_FEEDBACK_MS);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <Window
      title={t.unit.codeLabel}
      tone="blue"
      actions={
        <Button size="small" className={styles.copy} onClick={() => void copy()}>
          <Icon name={copied ? "check" : "copy"} />
          <span aria-live="polite">{copied ? t.unit.copied : t.unit.copyCode}</span>
        </Button>
      }
    >
      <Highlight code={code.replace(/\n+$/, "")} language={language} theme={codeTheme}>
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre className={styles.pre} style={style} tabIndex={0}>
            <code>
              {tokens.map((line, lineIndex) => (
                <div key={lineIndex} {...getLineProps({ line })}>
                  {line.map((token, tokenIndex) => (
                    <span key={tokenIndex} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </code>
          </pre>
        )}
      </Highlight>
    </Window>
  );
}
