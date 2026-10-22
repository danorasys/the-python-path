import { use } from "react";
import { Link, NavLink, Navigate, useParams } from "react-router";
import { routes } from "../../app/routes";
import { ContentBoundary } from "../../components/ContentBoundary";
import { FallbackNotice } from "../../components/FallbackNotice";
import { PageTitle } from "../../components/PageTitle";
import { RichText } from "../../components/RichText";
import { ButtonLink } from "../../components/ui/Button";
import { Icon } from "../../components/ui/Icon";
import { isModuleId, isUnitId } from "../../content/parse";
import { getModule, getRedirects, getUnit } from "../../content/resources";
import type {
  Localized,
  ModuleId,
  PathDocument,
  PathStep,
  Redirects,
  UnitDocument,
  UnitId,
} from "../../content/types";
import { format } from "../../i18n/format";
import { useI18n } from "../../i18n/useI18n";
import { toPlainText } from "../../lib/inlineHtml";
import { NotFoundPage } from "../not-found/NotFoundPage";
import { stripOrdinal } from "../roadmap/stripOrdinal";
import { ContentBlocks } from "./ContentBlocks";
import { cx } from "../../lib/cx";
import styles from "./LearningUnitPage.module.css";

interface NumberedStep {
  step: PathStep;
  number: number;
}

type AvailableStep = NumberedStep & { step: PathStep & { unit: UnitId } };

interface UnitViewProps {
  moduleId: ModuleId;
  unitId: UnitId;
  unitResource: Promise<Localized<UnitDocument>>;
  moduleResource: Promise<Localized<PathDocument>>;
}

function UnitView({ moduleId, unitId, unitResource, moduleResource }: UnitViewProps) {
  const { t } = useI18n();
  const unit = use(unitResource);
  const moduleDoc = use(moduleResource);

  const steps = moduleDoc.data.steps.map((step, position): NumberedStep => ({ step, number: position + 1 }));
  const units = steps.filter((entry): entry is AvailableStep => entry.step.unit !== undefined);
  const index = units.findIndex((entry) => entry.step.unit === unitId);
  const current = units[index];
  const previous = index > 0 ? units[index - 1] : undefined;
  const next = index >= 0 ? units[index + 1] : undefined;

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar} aria-label={toPlainText(moduleDoc.data.title)}>
        <h2 className={styles.sidebarTitle}>
          <Link to={routes.module(moduleId)}>
            <RichText html={moduleDoc.data.title} />
          </Link>
        </h2>
        <ol className={styles.unitList}>
          {steps.map(({ step, number }) => {
            const label = (
              <>
                <span className={styles.unitNumber} aria-hidden="true">
                  {number}
                </span>
                <span>
                  <RichText html={stripOrdinal(step.name, number)} />
                </span>
              </>
            );
            return (
              <li key={step.unit ?? `step-${number}`}>
                {step.unit ? (
                  <NavLink to={routes.unit(moduleId, step.unit)} className={cx(styles.unitLink)}>
                    {label}
                  </NavLink>
                ) : (
                  <span className={cx(styles.unitLink, styles.unitPending)}>{label}</span>
                )}
              </li>
            );
          })}
        </ol>
      </aside>

      <article className={styles.article}>
        <PageTitle title={toPlainText(unit.data.title)} />
        <header className={styles.header}>
          <div className={styles.meta}>
            <ButtonLink to={routes.module(moduleId)} size="small">
              <Icon name="arrowLeft" />
              {t.unit.backToModule}
            </ButtonLink>
            {current && (
              <span className={styles.chip}>
                {format(t.unit.position, { current: current.number, total: steps.length })}
              </span>
            )}
          </div>
          <h1 className={styles.title}>
            <RichText html={unit.data.title} />
          </h1>
          {unit.data.description && (
            <p className={styles.description}>
              <RichText html={unit.data.description} />
            </p>
          )}
          <FallbackNotice requested={unit.requestedLanguage} shown={unit.language} />
        </header>

        <ContentBlocks blocks={unit.data.content} />

        {(previous ?? next) && (
          <nav className={styles.pager} aria-label={toPlainText(moduleDoc.data.title)}>
            {previous && (
              <Link to={routes.unit(moduleId, previous.step.unit)} className={styles.pagerLink} rel="prev">
                <span className={styles.pagerDirection}>
                  <Icon name="arrowLeft" />
                  {t.unit.previous}
                </span>
                <span className={styles.pagerName}>
                  <RichText html={stripOrdinal(previous.step.name, previous.number)} />
                </span>
              </Link>
            )}
            {next && (
              <Link
                to={routes.unit(moduleId, next.step.unit)}
                className={`${styles.pagerLink} ${styles.next}`}
                rel="next"
              >
                <span className={styles.pagerDirection}>
                  {t.unit.next}
                  <Icon name="arrowRight" />
                </span>
                <span className={styles.pagerName}>
                  <RichText html={stripOrdinal(next.step.name, next.number)} />
                </span>
              </Link>
            )}
          </nav>
        )}
      </article>
    </div>
  );
}

interface UnitRouteProps extends UnitViewProps {
  redirectsResource: Promise<Redirects>;
}

function UnitRoute({ redirectsResource, ...props }: UnitRouteProps) {
  const target = use(redirectsResource)[`${props.moduleId}/${props.unitId}`];
  if (target) return <Navigate to={routes.unit(target.module, target.unit)} replace />;
  return <UnitView {...props} />;
}

export function LearningUnitPage() {
  const { language } = useI18n();
  const { moduleId, unitId } = useParams();
  if (!isModuleId(moduleId) || !isUnitId(unitId)) return <NotFoundPage />;

  return (
    <ContentBoundary>
      <UnitRoute
        moduleId={moduleId}
        unitId={unitId}
        redirectsResource={getRedirects()}
        unitResource={getUnit(moduleId, unitId, language)}
        moduleResource={getModule(moduleId, language)}
      />
    </ContentBoundary>
  );
}
