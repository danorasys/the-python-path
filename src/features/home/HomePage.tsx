import type { CSSProperties } from "react";
import { routes } from "../../app/routes";
import { PageTitle } from "../../components/PageTitle";
import { ButtonLink } from "../../components/ui/Button";
import { Icon } from "../../components/ui/Icon";
import { useI18n } from "../../i18n/useI18n";
import styles from "./HomePage.module.css";
import { Stickers } from "./Stickers";
import { TerminalDemo } from "./TerminalDemo";

export function HomePage() {
  const { t } = useI18n();
  const titleWords = t.meta.siteName.split(" ");

  return (
    <>
      <PageTitle />
      <section className={styles.hero} aria-labelledby="home-title">
        <div>
          <h1 id="home-title" className={styles.heading}>
            <span className={styles.welcome}>{t.home.welcome}</span>
            <span className={styles.title}>
              {titleWords.map((word, index) => (
                <span
                  key={word}
                  className={styles.titleWord}
                  style={{ "--i": index } as CSSProperties}
                >
                  {word}
                  {index < titleWords.length - 1 && " "}
                </span>
              ))}
            </span>
          </h1>
          <p className={styles.intro}>{t.home.intro}</p>
          <div className={styles.actions}>
            <div className={styles.cta}>
              <ButtonLink to={routes.roadmap()} variant="primary" size="large">
                {t.home.cta}
                <Icon name="rocket" className={styles.ctaIcon} />
              </ButtonLink>
            </div>
            <div className={styles.tryCta}>
              <ButtonLink to={routes.practice()}>
                <Icon name="play" className={styles.playIcon} />
                {t.home.tryCta}
              </ButtonLink>
            </div>
          </div>
        </div>
        <div className={styles.visual}>
          <Stickers />
          <TerminalDemo />
        </div>
      </section>
    </>
  );
}
