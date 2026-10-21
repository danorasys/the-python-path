import { lazy } from "react";
import { createHashRouter } from "react-router";
import { HomePage } from "../features/home/HomePage";
import { NotFoundPage } from "../features/not-found/NotFoundPage";
import { ModulePage, RoadmapPage } from "../features/roadmap/RoadmapPage";
import { RootLayout } from "./RootLayout";
import { RouteErrorPage } from "./RouteErrorPage";

const LearningUnitPage = lazy(() =>
  import("../features/learning/LearningUnitPage").then((m) => ({ default: m.LearningUnitPage })),
);
const PracticePage = lazy(() => import("../features/practice/PracticePage"));
const SnakePage = lazy(() => import("../features/snake/SnakePage"));

export const router = createHashRouter([
  {
    element: <RootLayout />,
    errorElement: <RouteErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "roadmap", element: <RoadmapPage /> },
      { path: "roadmap/:moduleId", element: <ModulePage /> },
      { path: "learn/:moduleId/:unitId", element: <LearningUnitPage /> },
      { path: "practice", element: <PracticePage /> },
      { path: "play", element: <SnakePage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
