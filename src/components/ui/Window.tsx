import type { ReactNode } from "react";
import styles from "./Window.module.css";

interface WindowProps {
  title: ReactNode;
  tone?: "blue" | "yellow" | "white";
  actions?: ReactNode;
  children: ReactNode;
  className?: string | undefined;
  bodyClassName?: string | undefined;
}

export function Window({
  title,
  tone = "blue",
  actions,
  children,
  className,
  bodyClassName,
}: WindowProps) {
  return (
    <div className={[styles.window, className].filter(Boolean).join(" ")}>
      <div className={`${styles.bar} ${styles[tone]}`}>
        <span className={styles.dots} aria-hidden="true">
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </span>
        <span className={styles.title}>{title}</span>
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
      <div className={[styles.body, bodyClassName].filter(Boolean).join(" ")}>{children}</div>
    </div>
  );
}
