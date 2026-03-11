import path from "node:path";
import type { UserConfigExport } from "@tarojs/cli";
import { UnifiedWebpackPluginV5 as WeappTwPlugin } from "weapp-tailwindcss/webpack";

const config: UserConfigExport = {
  projectName: "specc-miniapp",
  date: "2026-03-11",
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  },
  sourceRoot: "src",
  // WSL2 开发时：dev 脚本将 dist 软链接到 MINIAPP_WIN_OUTPUT（Windows 路径），DevTools 可感知变化
  // build 时：脚本先删除软链接，Taro 再以真实目录写入
  // 示例（.env）：MINIAPP_WIN_OUTPUT=/mnt/c/miniapp-dist
  outputRoot: "dist",
  plugins: [],
  defineConstants: {
    "process.env.TARO_APP_API_URL": JSON.stringify(
      process.env.TARO_APP_API_URL || "http://localhost:4000",
    ),
    "process.env.TARO_APP_STORAGE_BASE_URL": JSON.stringify(
      process.env.TARO_APP_STORAGE_BASE_URL || "",
    ),
  },
  copy: {
    patterns: [],
    options: {},
  },
  framework: "react",
  compiler: {
    type: "webpack5",
  },
  cache: {
    enable: false,
  },
  alias: {
    "@": path.resolve(__dirname, "..", "src"),
  },
  mini: {
    webpackChain(chain) {
      // WSL2 下 inotify 无法可靠触发，改用轮询监听文件变更
      chain.watchOptions({
        aggregateTimeout: 300,
        poll: 1000,
        ignored: /node_modules/,
      });
      chain.plugin("weapp-tailwindcss").use(WeappTwPlugin, [
        {
          rem2rpx: true,
          injectAdditionalCssVarScope: true,
          // Pre-calculate CSS variables (e.g. --spacing) used by Tailwind v4
          cssCalc: ["--spacing"],
          cssEntries: [path.resolve(__dirname, "..", "src", "app.css")],
        },
      ]);
    },
    postcss: {
      pxtransform: {
        enable: true,
        config: {},
      },
      url: {
        enable: true,
        config: { limit: 1024 },
      },
      cssModules: {
        enable: false,
      },
    },
  },
  h5: {
    publicPath: "/",
    staticDirectory: "static",
    esnextModules: [],
    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: false,
      },
    },
  },
};

export default config;
