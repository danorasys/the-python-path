import { useHref } from "react-router";
import { routes } from "../../app/routes";
import { ButtonAnchor } from "../../components/ui/Button";
import { Icon } from "../../components/ui/Icon";
import { useI18n } from "../../i18n/useI18n";
import { decodeEntities } from "../../lib/entities";

interface TryItButtonProps {
  label: string;
  code: string;
  className?: string | undefined;
}

export function TryItButton({ label, code, className }: TryItButtonProps) {
  const { t } = useI18n();
  const href = useHref(routes.practice(decodeEntities(code)));
  const text = label.replace(/\s*>+\s*$/, "");

  return (
    <ButtonAnchor
      href={href}
      target="_blank"
      rel="noopener"
      variant="primary"
      className={className}
      title={t.unit.tryItHint}
    >
      <Icon name="play" />
      {text}
    </ButtonAnchor>
  );
}
