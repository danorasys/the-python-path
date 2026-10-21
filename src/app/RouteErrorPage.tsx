import { isRouteErrorResponse, useRouteError } from "react-router";
import { NotFoundPanel } from "../components/StatusPanels";
import { Button } from "../components/ui/Button";
import { useI18n } from "../i18n/useI18n";

export function RouteErrorPage() {
  const error = useRouteError();
  const { t } = useI18n();

  if (isRouteErrorResponse(error) && error.status === 404) return <NotFoundPanel />;

  console.error("[route]", error);
  return (
    <section role="alert" style={{ padding: "var(--space-7) var(--gutter)" }}>
      <h1>{t.content.errorTitle}</h1>
      <p style={{ margin: "var(--space-3) 0 var(--space-5)" }}>{t.content.errorBody}</p>
      <Button variant="primary" onClick={() => window.location.reload()}>
        {t.content.retry}
      </Button>
    </section>
  );
}
