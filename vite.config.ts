import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

const BASE_PATH = "/the-python-path/";

export default defineConfig({
  base: BASE_PATH,
  plugins: [react()],
  build: {
    target: "es2022",
    sourcemap: true,
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    css: { modules: { classNameStrategy: "non-scoped" } },
    restoreMocks: true,
  },
});
