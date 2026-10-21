import { Link } from "react-router";
import { RichText } from "../../components/RichText";
import { Icon } from "../../components/ui/Icon";
import type { PathStep } from "../../content/types";
import { readableTextColor } from "../../lib/color";
import styles from "./PathTrack.module.css";
import { stripOrdinal } from "./stripOrdinal";

interface PathTrackProps {
  steps: PathStep[];
  hrefFor: (step: PathStep) => string | null;
}

export function PathTrack({ steps, hrefFor }: PathTrackProps) {
  return (
    <ol className={styles.track}>
      {steps.map((step, index) => {
        const position = index + 1;
        const href = hrefFor(step);
        const body = (
          <>
            <span className={styles.band} style={{ background: step.color }} />
            <span className={styles.cardBody}>
              <span className={styles.name}>
                <strong>
                  <RichText html={stripOrdinal(step.name, position)} />
                </strong>
                {href && <Icon name="arrowRight" className={styles.arrow} />}
              </span>
              <span className={styles.description}>
                <RichText html={step.description} />
              </span>
            </span>
          </>
        );

        return (
          <li key={step.module ?? step.unit ?? `${position}-${step.name}`} className={styles.stop}>
            <span
              className={styles.marker}
              style={{ background: step.color, color: readableTextColor(step.color) }}
              aria-hidden="true"
            >
              {position}
            </span>
            {href ? (
              <Link to={href} className={styles.card}>
                {body}
              </Link>
            ) : (
              <div className={styles.card}>{body}</div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
