import { use } from "react";
import { useParams } from "react-router";
import { routes } from "../../app/routes";
import { ContentBoundary } from "../../components/ContentBoundary";
import { FallbackNotice } from "../../components/FallbackNotice";
import { PageTitle } from "../../components/PageTitle";
import { RichText } from "../../components/RichText";
import { ButtonLink } from "../../components/ui/Button";
import { Icon } from "../../components/ui/Icon";
import { isModuleId } from "../../content/parse";
import { getModule, getRoadmap } from "../../content/resources";
import type { Localized, ModuleId, PathDocument } from "../../content/types";
import { format } from "../../i18n/format";
import { useI18n } from "../../i18n/useI18n";
import { toPlainText } from "../../lib/inlineHtml";
import { NotFoundPage } from "../not-found/NotFoundPage";
import { PathTrack } from "./PathTrack";
import styles from "./RoadmapPage.module.css";

interface PathViewProps {
  resource: Promise<Localized<PathDocument>>;
  moduleId?: ModuleId;
}

function PathView({ resource, moduleId }: PathViewProps) {
  const { t } = useI18n();
  const { data, language, requestedLanguage } = use(resource);

  const hrefFor = moduleId
    ? (step: PathDocument["steps"][number]) => (step.unit ? routes.unit(moduleId, step.unit) : null)
    : (step: PathDocument["steps"][number]) => (step.module ? routes.module(step.module) : null);

  return (
    <>
      <PageTitle title={toPlainText(data.title)} />
      <header className={styles.header}>
        {moduleId && (
          <div className={styles.meta}>
            <ButtonLink to={routes.roadmap()} size="small">
              <Icon name="arrowLeft" />
              {t.roadmap.backToRoadmap}
            </ButtonLink>
            <span className={styles.chip}>
              {format(t.roadmap.unitsCount, { count: data.steps.length })}
            </span>
          </div>
        )}
        <h1 className={styles.title}>
          <RichText html={data.title} />
        </h1>
        {data.description && (
          <p className={styles.description}>
            <RichText html={data.description} />
          </p>
        )}
        <FallbackNotice requested={requestedLanguage} shown={language} />
      </header>
      <PathTrack steps={data.steps} hrefFor={hrefFor} />
    </>
  );
}

export function RoadmapPage() {
  const { language } = useI18n();
  return (
    <ContentBoundary>
      <PathView resource={getRoadmap(language)} />
    </ContentBoundary>
  );
}

export function ModulePage() {
  const { language } = useI18n();
  const { moduleId } = useParams();
  if (!isModuleId(moduleId)) return <NotFoundPage />;
  return (
    <ContentBoundary>
      <PathView resource={getModule(moduleId, language)} moduleId={moduleId} />
    </ContentBoundary>
  );
}
