# ── Build stage ────────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

# 启用 corepack 以使用 pnpm
RUN corepack enable && corepack prepare pnpm@10.15.1 --activate

WORKDIR /app

# 复制 workspace 配置文件
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY tsconfig.base.json ./

# 复制依赖包（i18n, components, types）
COPY packages/i18n/package.json ./packages/i18n/
COPY packages/i18n/tsconfig.json ./packages/i18n/
COPY packages/i18n/src ./packages/i18n/src

COPY packages/components/package.json ./packages/components/
COPY packages/components/tsconfig.json ./packages/components/
COPY packages/components/src ./packages/components/src

COPY packages/types/package.json ./packages/types/
COPY packages/types/tsconfig.json ./packages/types/
COPY packages/types/src ./packages/types/src

# 复制 web 包
COPY packages/web/package.json ./packages/web/
COPY packages/web/tsconfig.json ./packages/web/

# server package.json 仅用于让 pnpm 识别 @specc/server workspace 包（web 依赖其 AppRouter 类型）
COPY packages/server/package.json ./packages/server/

# 安装所有依赖
RUN pnpm install --frozen-lockfile

# 复制源代码和配置文件
COPY packages/web/src ./packages/web/src
COPY packages/web/public ./packages/web/public
COPY packages/web/index.html ./packages/web/
COPY packages/web/vite.config.ts ./packages/web/
COPY packages/web/react-router.config.ts ./packages/web/
COPY packages/web/postcss.config.js ./packages/web/
COPY packages/web/server.mjs ./packages/web/

# 构建应用（产出 build/client/ 和 build/server/）
# VITE_STORAGE_PUBLIC_URL 在构建时注入，供 resolveAvatarUrl() 使用
ARG VITE_STORAGE_PUBLIC_URL
ENV VITE_STORAGE_PUBLIC_URL=${VITE_STORAGE_PUBLIC_URL}
WORKDIR /app/packages/web
RUN pnpm build

# 构建产物就绪后，用 pnpm deploy 生成可独立部署的目录：
#   - 解析所有 workspace:* 符号链接为真实路径
#   - @specc/* 包的 dist/ 已通过 prepare hook 构建，随 files:["dist"] 一同复制
#   - 输出 /deploy/node_modules/ 是扁平、无 symlink 的结构，Bun 可直接读取
WORKDIR /app
RUN pnpm --filter @specc/web deploy --legacy --prod /deploy

# ── Runner stage (Bun) ───────────────────────────────────────────────────────
FROM oven/bun:1-alpine AS runner

WORKDIR /app

# 来自 pnpm deploy 的独立部署目录（含 node_modules + package.json）
COPY --from=builder /deploy ./

# SSR 构建产物（build/ 在 .gitignore 中，pnpm deploy 不会复制，单独拉取）
COPY --from=builder /app/packages/web/build ./build

# Bun 原生 SSR 入口
COPY --from=builder /app/packages/web/server.mjs ./server.mjs

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["bun", "server.mjs"]
