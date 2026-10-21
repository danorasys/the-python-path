import { format } from "../i18n/format";
import type { Language } from "../i18n/languages";
import { useI18n } from "../i18n/useI18n";
import { Callout } from "./ui/Callout";

interface FallbackNoticeProps {
  requested: Language;
  shown: Language;
}

export function FallbackNotice({ requested, shown }: FallbackNoticeProps) {
  const { t } = useI18n();
  if (requested === shown) return null;
  return (
    <Callout tone="info" role="status">
      {format(t.content.fallbackNotice, {
        requested: t.languageNames[requested],
        shown: t.languageNames[shown],
      })}
    </Callout>
  );
}
