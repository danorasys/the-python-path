import { isNotFound } from "../content/errors";
import { useI18n } from "../i18n/useI18n";
import { routes } from "../app/routes";
import styles from "./StatusPanel.module.css";
import { Button, ButtonLink } from "./ui/Button";
import { Icon } from "./ui/Icon";

export function LoadingPanel() {
  const { t } = useI18n();
  return (
    <div className={styles.skeleton} role="status" aria-live="polite">
      <span className="visually-hidden">{t.content.loading}</span>
      <div className={styles.bar} />
      <div className={styles.bar} />
      <div className={styles.bar} />
      <div className={styles.bar} />
    </div>
  );
}

export function NotFoundPanel() {
  const { t } = useI18n();
  return (
    <section className={styles.panel} aria-labelledby="not-found-title">
      <h1 id="not-found-title" className={styles.title}>
        {t.content.notFoundTitle}
      </h1>
      <p className={styles.body}>{t.content.notFoundBody}</p>
      <div className={styles.actions}>
        <ButtonLink to={routes.roadmap()} variant="primary">
          {t.content.goToRoadmap}
        </ButtonLink>
        <ButtonLink to={routes.home()}>{t.content.goHome}</ButtonLink>
      </div>
    </section>
  );
}

interface ErrorPanelProps {
  error: unknown;
  onRetry: () => void;
}

export function ErrorPanel({ error, onRetry }: ErrorPanelProps) {
  const { t } = useI18n();
  if (isNotFound(error)) return <NotFoundPanel />;
  return (
    <section className={`${styles.panel} ${styles.error}`} role="alert">
      <h1 className={styles.title}>{t.content.errorTitle}</h1>
      <p className={styles.body}>{t.content.errorBody}</p>
      <div className={styles.actions}>
        <Button variant="primary" onClick={onRetry}>
          <Icon name="refresh" />
          {t.content.retry}
        </Button>
        <ButtonLink to={routes.home()}>{t.content.goHome}</ButtonLink>
      </div>
    </section>
  );
}
