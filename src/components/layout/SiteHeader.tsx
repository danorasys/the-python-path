import { useEffect, useId, useState } from "react";
import { Link, NavLink } from "react-router";
import { routes } from "../../app/routes";
import { useI18n } from "../../i18n/useI18n";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { LogoMark } from "./Logo";
import { cx } from "../../lib/cx";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  const { t } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const navId = useId();

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const links = [
    { to: routes.home(), label: t.nav.home, end: true },
    { to: routes.roadmap(), label: t.nav.roadmap, end: false },
    { to: routes.practice(), label: t.nav.practice, end: false },
    { to: routes.play(), label: t.nav.play, end: false },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to={routes.home()} className={cx(styles.brand)} onClick={closeMenu}>
          <LogoMark className={styles.mark} />
          <span className={styles.brandText}>{t.meta.siteName}</span>
        </Link>

        <nav
          id={navId}
          className={cx(styles.nav, menuOpen && styles.navOpen)}
          aria-label={t.nav.mainLabel}
        >
          <ul className={styles.list}>
            {links.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} end={link.end} className={cx(styles.link)} onClick={closeMenu}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <LanguageSwitcher />

        <Button
          className={styles.menuButton}
          iconOnly
          aria-expanded={menuOpen}
          aria-controls={navId}
          aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <Icon name={menuOpen ? "close" : "menu"} />
        </Button>
      </div>
    </header>
  );
}
