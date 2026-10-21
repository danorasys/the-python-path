import { useI18n } from "../../i18n/useI18n";
import styles from "./SiteFooter.module.css";

const AUTHOR_URL = "https://github.com/danorasys";

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span className={styles.brand}>{t.meta.siteName}</span>
        <p>
          {t.footer.createdBy}{" "}
          <a href={AUTHOR_URL} target="_blank" rel="noopener noreferrer">
            danorasys
          </a>
        </p>
      </div>
    </footer>
  );
}
