import "dotenv/config";

import { serve } from "@hono/node-server";
import { trpcServer } from "@hono/trpc-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { Logger } from "./logger";
import { uploadRouter } from "./modules/upload";
import { createContext } from "./trpc/context";
import { appRouter } from "./trpc/router";

async function bootstrap() {
  const startLogger = new Logger("HonoFactory");
  Logger.resetTimer();
  startLogger.log("Starting Hono application...");

  const app = new Hono();

  const corsOrigins = (
    process.env.CORS_ORIGIN ?? "http://localhost:5173,http://localhost:4173"
  )
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean);

  const corsMiddleware = cors({
    origin: corsOrigins,
    credentials: true,
    allowHeaders: ["Content-Type", "x-workspace-id", "x-lang"],
    exposeHeaders: ["Set-Cookie"],
  });

  app.use("/trpc/*", corsMiddleware);
  app.use("/upload/*", corsMiddleware);

  // Global error handler — always returns structured JSON so the frontend
  // can reliably display the error message regardless of where the throw originated.
  app.onError((err, c) => {
    const logger = new Logger("HonoError");
    logger.error(`Unhandled error: ${err.message}\n${err.stack ?? ""}`);
    return c.json({ error: "Internal server error" }, 500);
  });

  app.use(
    "/trpc/*",
    trpcServer({
      router: appRouter,
      createContext: (opts) => createContext(opts.req, opts.resHeaders),
    }),
  );

  for (const moduleName of Object.keys(appRouter._def.record)) {
    startLogger.log(`Module registered: ${moduleName}`);
  }
  startLogger.log("Module registered: upload (HTTP)");

  app.route("/upload", uploadRouter);

  const port = Number(process.env.PORT) || 4000;
  serve({ fetch: app.fetch, port, hostname: "0.0.0.0" }, () => {
    const appLogger = new Logger("HonoApplication");
    appLogger.log(
      `Application is running on: http://0.0.0.0:${port}`,
      Logger.elapsed(),
    );
  });
}

bootstrap();
