#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const { spawn } = require("node:child_process");

const mode = process.argv[2]; // 'dev' | 'build'
const root = path.resolve(__dirname, "..");
const distPath = path.join(root, "dist");

// 加载 env 文件（仅补充，不覆盖已有的环境变量）
// build 模式优先读取 .env.production，不存在则回退到 .env
const envFileName =
  mode === "build" && fs.existsSync(path.join(root, ".env.production"))
    ? ".env.production"
    : ".env";
const envFile = path.join(root, envFileName);
console.log(`[miniapp] loading env: ${envFileName}`);
if (fs.existsSync(envFile)) {
  for (const line of fs.readFileSync(envFile, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (key && !(key in process.env)) {
      process.env[key] = value;
    }
  }
}

const winOutput = process.env.MINIAPP_WIN_OUTPUT;

// 清除 Taro prebundle 缓存，避免 taroModuleMap 与 runtime 模块列表不一致
// 导致运行时 "taroModuleMap[module] is not a function" 错误
const taroCachePath = path.join(root, "node_modules", ".taro");
try {
  fs.rmSync(taroCachePath, { recursive: true, force: true });
} catch {}

if (winOutput) {
  // 确保 Windows 侧目录存在
  fs.mkdirSync(winOutput, { recursive: true });

  if (mode === "dev") {
    // 移除现有 dist（无论是真实目录还是旧软链接），创建软链接
    try {
      fs.rmSync(distPath, { recursive: true, force: true });
    } catch {}
    // 清空 Windows 侧旧文件，防止上次构建的 prebundle 残留
    for (const f of fs.readdirSync(winOutput)) {
      try {
        fs.rmSync(path.join(winOutput, f), { recursive: true, force: true });
      } catch {}
    }
    fs.symlinkSync(winOutput, distPath);
    console.log(`[miniapp] dist -> ${winOutput}`);
  } else if (mode === "build") {
    // 移除软链接，让 Taro 输出真实目录
    try {
      if (fs.lstatSync(distPath).isSymbolicLink()) {
        fs.rmSync(distPath);
      }
    } catch {}
  }
}

const args = [
  "build",
  "--type",
  "weapp",
  ...(mode === "dev" ? ["--watch"] : []),
];
const env = {
  ...process.env,
  NODE_ENV:
    mode === "build" ? "production" : (process.env.NODE_ENV ?? "development"),
};

const taroBin = fs.existsSync(path.join(root, "node_modules", ".bin", "taro"))
  ? path.join(root, "node_modules", ".bin", "taro")
  : "taro";
const child = spawn(taroBin, args, {
  stdio: "inherit",
  env,
  shell: false,
  cwd: root,
});
child.on("exit", (code) => process.exit(code ?? 0));
