import { Suspense, useRef, type MouseEvent } from "react";
import { Outlet, ScrollRestoration } from "react-router";
import { SiteFooter } from "../components/layout/SiteFooter";
import { SiteHeader } from "../components/layout/SiteHeader";
import { LoadingPanel } from "../components/StatusPanels";
import { useI18n } from "../i18n/useI18n";
import styles from "./RootLayout.module.css";

export function RootLayout() {
  const { t } = useI18n();
  const mainRef = useRef<HTMLElement>(null);

  const skipToContent = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    mainRef.current?.focus();
  };

  return (
    <>
      <a className={styles.skipLink} href="#main-content" onClick={skipToContent}>
        {t.meta.skipToContent}
      </a>
      <SiteHeader />
      <main id="main-content" ref={mainRef} className={styles.main} tabIndex={-1}>
        <Suspense fallback={<LoadingPanel />}>
          <Outlet />
        </Suspense>
      </main>
      <SiteFooter />
      <ScrollRestoration />
    </>
  );
}
