import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import { contentPlugin } from "./scripts/content/vitePlugin";

const BASE_PATH = "/the-python-path/";

const CROSS_ORIGIN_ISOLATION = {
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Embedder-Policy": "credentialless",
};

export default defineConfig({
  base: BASE_PATH,
  plugins: [react(), !process.env.VITEST && contentPlugin(fileURLToPath(new URL("./content", import.meta.url)))],
  server: {
    headers: CROSS_ORIGIN_ISOLATION,
  },
  preview: {
    headers: {},
  },
  worker: {
    format: "es",
  },
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
