import { PageTitle } from "../../components/PageTitle";
import { NotFoundPanel } from "../../components/StatusPanels";
import { useI18n } from "../../i18n/useI18n";

export function NotFoundPage() {
  const { t } = useI18n();
  return (
    <>
      <PageTitle title={t.content.notFoundTitle} />
      <NotFoundPanel />
    </>
  );
}
