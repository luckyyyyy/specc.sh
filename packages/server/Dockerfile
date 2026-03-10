# 构建阶段
FROM node:24-alpine AS builder

# 启用 corepack 以使用 pnpm
RUN corepack enable && corepack prepare pnpm@10.15.1 --activate

WORKDIR /app

# 复制 workspace 配置文件
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY tsconfig.base.json ./

# 复制 types 包配置和源代码（server 依赖 types）
COPY packages/types/package.json ./packages/types/
COPY packages/types/tsconfig.json ./packages/types/
COPY packages/types/src ./packages/types/src

# 复制 i18n 包配置和源代码（server 依赖 i18n）
COPY packages/i18n/package.json ./packages/i18n/
COPY packages/i18n/tsconfig.json ./packages/i18n/
COPY packages/i18n/src ./packages/i18n/src

# 复制 server 包配置
COPY packages/server/package.json ./packages/server/
COPY packages/server/tsconfig.json ./packages/server/
COPY packages/server/tsconfig.build.json ./packages/server/
COPY packages/server/rollup.config.mjs ./packages/server/

# 安装所有依赖（包括 devDependencies，构建时需要）
RUN pnpm install --frozen-lockfile

# 复制源代码和 prisma 配置
COPY packages/server/src ./packages/server/src
COPY packages/server/prisma.config.ts ./packages/server/
COPY packages/server/prisma ./packages/server/prisma/

# 先构建 i18n（server rollup 会将其内联进 dist）
WORKDIR /app/packages/i18n
RUN pnpm build

# 构建应用（rollup + preserveModules，保留模块结构的原生 ESM）
WORKDIR /app/packages/server
RUN pnpm build

# 生产阶段
FROM node:24-alpine AS runner

# 启用 corepack
RUN corepack enable && corepack prepare pnpm@10.15.1 --activate

WORKDIR /app

# 复制必要的配置文件（@specc/types 和 @specc/i18n 已由 rollup 内联到 server dist）
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY packages/types/package.json ./packages/types/
COPY packages/i18n/package.json ./packages/i18n/
COPY packages/server/package.json ./packages/server/

# 从构建阶段复制构建产物
COPY --from=builder /app/packages/server/dist ./packages/server/dist

# 只安装生产依赖
RUN pnpm install --prod --frozen-lockfile --ignore-scripts

# 设置工作目录
WORKDIR /app/packages/server

# 暴露端口
EXPOSE 4000

CMD ["node", "dist/main.js"]

# ─── 迁移阶段（一次性容器，用于生产数据库迁移）───────────────────────────────
FROM builder AS migrate
WORKDIR /app/packages/server
# DATABASE_URL 通过环境变量注入，prisma db push 直接同步 schema
CMD ["pnpm", "exec", "prisma", "db", "push"]
