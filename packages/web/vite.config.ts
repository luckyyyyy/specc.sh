import { resolve } from "node:path";
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths()],
  resolve: {
    alias: {
      "@/": `${resolve(__dirname, "src")}/`,
    },
  },
  server: {
    host: "0.0.0.0", // Listen on all network interfaces to allow intranet access
    port: 5173,
    proxy: {
      "/trpc": {
        target: "http://localhost:4000",
        changeOrigin: true,
      },
      "/upload": {
        target: "http://localhost:4000",
        changeOrigin: true,
      },
    },
  },
});
