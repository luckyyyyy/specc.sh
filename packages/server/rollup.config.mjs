import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

/** @type {import('rollup').RollupOptions} */
export default {
  input: "src/main.ts",
  output: {
    format: "es",
    dir: "dist",
    entryFileNames: "[name].js",
    chunkFileNames: "[name].js",
    preserveModules: true,
    preserveModulesRoot: "src",
    sourcemap: true,
  },
  // npm 包和 node: 内置标记为外部；@specc/* 工作区包和 @/ 内部别名由 rollup 直接打包
  external: (id) =>
    id.startsWith("node:") ||
    (!id.startsWith(".") &&
      !id.startsWith("/") &&
      !id.startsWith("@/") &&
      !id.startsWith("@specc/")),
  treeshake: false,
  plugins: [
    // 解析 @specc/* 工作区包，从其 dist 打包进来
    resolve({ resolveOnly: [/@specc\//] }),
    json(),
    typescript({
      compilerOptions: {
        module: "ESNext",
      },
    }),
  ],
};
