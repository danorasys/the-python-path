import { LANGUAGE_NAMES, LANGUAGES } from "../../i18n/languages";
import { useI18n } from "../../i18n/useI18n";
import styles from "./LanguageSwitcher.module.css";

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useI18n();
  return (
    <div className={styles.group} role="group" aria-label={t.nav.language}>
      {LANGUAGES.map((code) => (
        <button
          key={code}
          type="button"
          lang={code}
          className={styles.option}
          aria-pressed={code === language}
          aria-label={LANGUAGE_NAMES[code]}
          title={LANGUAGE_NAMES[code]}
          onClick={() => setLanguage(code)}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
