# Project Overview

TypeScript monorepo (pnpm workspaces): Hono backend, React frontend, shared types.

## Packages

| Package | Purpose |
|---------|---------|
| `packages/server` | Hono + tRPC + Prisma ORM + PostgreSQL 18 |
| `packages/web` | React 19 + Vite 7 + TailwindCSS 4 + TanStack Query v5 |
| `packages/types` | Shared Zod v4 schemas + TypeScript types |
| `packages/components` | Reusable UI components (no business logic) |
| `packages/i18n` | i18n locale resources |

## Commands

| Command | What it does |
|---------|-------------|
| `make lint` | Biome lint check |
| `make tsc` | TypeScript type check across all packages |

### Database

```sh
pnpm --filter @specc/server db:push      # sync schema to DB (dev, no migration files)
pnpm --filter @specc/server db:migrate   # create migration files + apply (production)
pnpm --filter @specc/server db:generate  # regenerate Prisma client after schema change
```

#### Query local DB (one-liner)

```sh
docker exec -it ai-stack-postgres psql -U postgres -d specc -c "SELECT * FROM users LIMIT 10;"
```

## Critical Rules

- **After every change: run `make lint && make tsc`** — only fix errors _you_ introduced, ignore pre-existing ones
- No antd, no @ant-design/icons — TailwindCSS 4 only
- **Zod v4** only (not v3 — API differs)
- Biome for lint/format (not Prettier/ESLint)
- Single file ≤ 500 lines
- Every tRPC procedure must have `.input()` + `.output()` Zod schemas
- Never expose Prisma entities directly — transform via `toXxxOutput()` helpers

## Storage / File URL 规则

**后端只存文件 key，前端负责拼接完整 URL。**

- 数据库（`UserSettings.avatarKey` 等）**仅存储文件 key**，例如 `userId/1234.jpg`
- `StorageProvider.uploadFile()` 返回 `void`（不再返回 URL）；接口不提供 `getPublicUrl` 或 `extractKey`
- 后端 API（上传接口、tRPC）响应中返回 `key`，而非完整 URL
- **前端**通过 `VITE_STORAGE_PUBLIC_URL`（env）+ key 自行拼接完整 URL
- 工具函数：`resolveAvatarUrl(key)` 位于 `packages/web/src/lib/avatar.ts`

```typescript
// 前端拼接示例
import { resolveAvatarUrl } from "@/lib/avatar";
<Avatar url={resolveAvatarUrl(user.settings?.avatarKey)} />
```

```env
# packages/web/.env
VITE_STORAGE_PUBLIC_URL=http://localhost:9000/avatars
```
