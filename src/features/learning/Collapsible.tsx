import { useId, useState, type ReactNode } from "react";
import { RichText } from "../../components/RichText";
import { Icon } from "../../components/ui/Icon";
import styles from "./ContentBlocks.module.css";

interface CollapsibleProps {
  title: string;
  children: ReactNode;
}

export function Collapsible({ title, children }: CollapsibleProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className={styles.collapsible}>
      <button
        type="button"
        className={styles.toggle}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <span>
          <RichText html={title} />
        </span>
        <Icon name="arrowDown" className={styles.chevron} />
      </button>
      <div id={panelId} className={styles.panel} hidden={!open}>
        {children}
      </div>
    </div>
  );
}
