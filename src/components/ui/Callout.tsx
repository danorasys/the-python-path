import type { ReactNode } from "react";
import styles from "./Callout.module.css";
import { Icon, type IconName } from "./Icon";

export type CalloutTone = "note" | "tip" | "info" | "danger";

interface CalloutProps {
  tone: CalloutTone;
  label?: string | undefined;
  icon?: IconName | undefined;
  children: ReactNode;
  role?: "status" | "alert" | "note" | undefined;
}

export function Callout({ tone, label, icon, children, role = "note" }: CalloutProps) {
  return (
    <aside className={`${styles.callout} ${styles[tone]} ${icon ? styles.withIcon : ""}`} role={role}>
      {icon && (
        <span className={styles.badge} aria-hidden="true">
          <Icon name={icon} />
        </span>
      )}
      <div>
        {label && <span className={styles.label}>{label}</span>}
        <div className={styles.body}>{children}</div>
      </div>
    </aside>
  );
}
