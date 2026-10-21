import { Suspense, type ReactNode } from "react";
import { useLocation } from "react-router";
import { useI18n } from "../i18n/useI18n";
import { ErrorBoundary } from "./ErrorBoundary";
import { ErrorPanel, LoadingPanel } from "./StatusPanels";

export function ContentBoundary({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const { language } = useI18n();
  return (
    <ErrorBoundary
      resetKey={`${pathname}|${language}`}
      fallback={(error, reset) => <ErrorPanel error={error} onRetry={reset} />}
    >
      <Suspense fallback={<LoadingPanel />}>{children}</Suspense>
    </ErrorBoundary>
  );
}
