import { existsSync } from "node:fs";
import path from "node:path";
import type { Plugin, ResolvedConfig, ViteDevServer } from "vite";
import { buildContent, type ContentFiles } from "./project";

const REBUILD_DELAY_MS = 60;

function conflicts(files: ContentFiles, publicDir: string): string[] {
  if (!publicDir) return [];
  return [...files.keys()].filter((target) => existsSync(path.join(publicDir, target)));
}

function describe(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

export function contentPlugin(contentDir: string): Plugin {
  let config: ResolvedConfig | undefined;
  let files: ContentFiles = new Map();
  let lastError: string | null = null;

  const compile = async () => {
    const next = await buildContent(contentDir);
    const clashing = conflicts(next, config?.publicDir ?? "");
    if (clashing.length > 0) {
      throw new Error(
        `Generated content would replace files in public/:\n${clashing.map((target) => `  ${target}`).join("\n")}`,
      );
    }
    files = next;
  };

  const showError = (server: ViteDevServer) => {
    if (lastError) server.ws.send({ type: "error", err: { message: lastError, stack: "" } });
  };

  return {
    name: "the-python-path:content",

    configResolved(resolved) {
      config = resolved;
    },

    async buildStart() {
      if (config?.command === "build") {
        await compile();
        return;
      }
      try {
        await compile();
        lastError = null;
      } catch (error) {
        lastError = describe(error);
        config?.logger.error(lastError);
      }
    },

    configureServer(server) {
      const base = server.config.base;
      let timer: ReturnType<typeof setTimeout> | undefined;

      const rebuild = () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          compile().then(
            () => {
              lastError = null;
              server.config.logger.info("content updated", { timestamp: true });
              server.ws.send({ type: "full-reload" });
            },
            (error: unknown) => {
              lastError = describe(error);
              server.config.logger.error(lastError, { timestamp: true });
              showError(server);
            },
          );
        }, REBUILD_DELAY_MS);
      };

      server.watcher.add(contentDir);
      server.watcher.on("all", (_event, file) => {
        const inside = path.relative(contentDir, path.resolve(file));
        if (!inside.startsWith("..") && !path.isAbsolute(inside)) rebuild();
      });
      server.ws.on("connection", () => showError(server));

      server.middlewares.use((request, response, next) => {
        const url = request.url?.split("?")[0] ?? "";
        const body = url.startsWith(base) ? files.get(url.slice(base.length)) : undefined;
        if (body === undefined) {
          next();
          return;
        }
        response.setHeader("Content-Type", "application/json; charset=utf-8");
        response.setHeader("Cache-Control", "no-store");
        response.end(body);
      });
    },

    generateBundle() {
      for (const [fileName, source] of files) {
        this.emitFile({ type: "asset", fileName, source });
      }
    },
  };
}
