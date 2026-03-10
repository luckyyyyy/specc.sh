/**
 * Production SSR server for React Router v7 — powered by Bun
 *
 * Uses Bun-native APIs throughout — no Node.js compat shims needed:
 *   Bun.serve()  — WinterCG-compliant HTTP server (Request/Response)
 *   Bun.file()   — zero-copy static file serving, auto MIME detection
 *   fetch()      — built-in, used to proxy /trpc and /upload to Hono API
 *
 * Environment:
 *   PORT     — listening port (default: 3000)
 *   API_URL  — backend Hono API origin (default: http://server:4000)
 */
import { createRequestHandler } from "react-router";

const PORT = Number(process.env.PORT) || 3000;
const API_URL = process.env.API_URL || "http://server:4000";
// import.meta.dir is Bun-native — no fileURLToPath / __dirname needed
const ASSET_DIR = `${import.meta.dir}/build/client`;

// Eagerly load the SSR build at startup (avoids cold-start latency)
const build = await import("./build/server/index.js");
const handler = createRequestHandler(build, process.env.NODE_ENV);

/** Proxy /trpc and /upload requests to the Hono API backend. */
function proxyToApi(request) {
  const url = new URL(request.url);
  const base = new URL(API_URL);
  url.protocol = base.protocol;
  url.host = base.host;
  // Clone request to new URL, forwarding method / headers / body as-is
  return fetch(new Request(url.toString(), request));
}

Bun.serve({
  port: PORT,
  hostname: "0.0.0.0",

  async fetch(request) {
    const { pathname } = new URL(request.url);

    // 1. Proxy API and upload requests to the Hono backend
    if (pathname.startsWith("/trpc") || pathname.startsWith("/upload")) {
      return proxyToApi(request);
    }

    // 1b. Serve install.sh for curl requests to root — enables: curl -fsSL https://specc.sh | bash
    if (
      pathname === "/" &&
      /curl\//i.test(request.headers.get("user-agent") || "")
    ) {
      const script = Bun.file(`${ASSET_DIR}/install.sh`);
      if (await script.exists()) {
        return new Response(script, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "no-cache",
          },
        });
      }
    }

    // 2. Static assets — Bun.file() does zero-copy streaming + auto MIME
    //    Guard against path traversal before hitting the filesystem
    if (!pathname.includes("..")) {
      const file = Bun.file(`${ASSET_DIR}${pathname}`);
      if (await file.exists()) {
        const isImmutable = pathname.startsWith("/assets/");
        return new Response(file, {
          headers: {
            "Cache-Control": isImmutable
              ? "public, max-age=31536000, immutable"
              : "public, max-age=3600",
          },
        });
      }
    }

    // 3. SSR — React Router handles everything else
    return handler(request);
  },

  error(err) {
    console.error("[SSR] Unhandled error:", err);
    return new Response("Internal Server Error", { status: 500 });
  },
});

console.log(
  `✓ React Router SSR (Bun ${Bun.version}) on http://0.0.0.0:${PORT}`,
);
