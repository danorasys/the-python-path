import type { ModuleId, UnitId } from "../content/types";

export const routes = {
  home: () => "/",
  roadmap: () => "/roadmap",
  module: (moduleId: ModuleId) => `/roadmap/${moduleId}`,
  unit: (moduleId: ModuleId, unitId: UnitId) => `/learn/${moduleId}/${unitId}`,
  practice: (code?: string) =>
    code ? `/practice?${new URLSearchParams({ code }).toString()}` : "/practice",
  play: () => "/play",
} as const;
