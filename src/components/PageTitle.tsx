import { useI18n } from "../i18n/useI18n";

export function PageTitle({ title }: { title?: string | undefined }) {
  const { t } = useI18n();
  const full = title ? `${title} · ${t.meta.siteName}` : t.meta.siteName;
  return <title>{full}</title>;
}
