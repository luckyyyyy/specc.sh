<div align="center">

# SPECC.SH

### 手写代码的时代结束了

**AI 来写**
**你来发布**

**网页前台 · 后台系统 · 官网 · 微信小程序**
*一行提示词，搞定任意平台功能。移动端 App 即将推出。*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Demo](https://img.shields.io/badge/Demo-specc.sh-green)](https://specc.sh)

[English](./README.md) · [在线演示](https://specc.sh) · [GitHub](https://github.com/luckyyyyy/specc.sh)

</div>

---

## 为什么普通人这么难驾驭 Vibe Coding？

所有人都试过。你打开 Claude Code 或 Cursor，描述你想要的功能，眼看着 AI 几秒钟写出几百行代码。看起来很厉害。然后你一运行——崩了。

这不是运气问题，是结构性问题。

**你的 AI 代码产出差，核心原因只有一个：没有项目级规范的约束。**

- **没有项目级规范** —— AI 不知道你的目录约定、命名规则、架构决策。它只能猜，而且每次猜得都不一样。
- **没有强制约束** —— 没有 Lint 规则、类型 Schema、输出契约的硬性约束，AI 会自由发挥，写出一团风格各异的乱麻。
- **没有共同语言** —— 你的 AI 工具根本不知道「生产级」对你的项目意味着什么，除非你明确告诉它。

结果就是：今天能跑，明天报错，后天没人敢动。

> 问题不在 AI，在于它没有一份可以遵循的规范。

SPECC.SH 在架构层面解决了这个问题。不需要另写文档，也不需要维护规范文件。目录结构、类型系统、Lint 规则、模块边界**本身就是提示词**——代码库自己告诉 AI 该怎么做。

---

## 工作原理（不需要写代码）

```
1. Clone 这个模板
2. 打开你的 AI 工具（Claude Code、Cursor、Copilot、Codex……）
3. 用自然语言描述你想做什么
4. AI 按内置规范生成代码
5. 执行：make lint && make tsc
6. 上线
```

架构就是提示词。每个目录、类型契约、Lint 规则都在告诉 AI 该怎么做——风格一致、类型安全、Lint 通过，一次到位。无需人工审查。

---

## 快速上手

```bash
curl -fsSL https://specc.sh | bash
```

或手动操作：

```bash
git clone https://github.com/luckyyyyy/specc.sh.git
cd specc.sh
make init   # 安装依赖 + 启动 Docker 服务 + 同步数据库
make dev    # 启动所有服务
```

| 服务 | 地址 |
|------|------|
| Web（React） | http://localhost:5173 |
| API（Hono） | http://localhost:4000 |
| MinIO 控制台 | http://localhost:9001 |

---

## 开箱即有什么

生产级 TypeScript Monorepo，全部预置，零配置：

```
specc.sh/
├── packages/
│   ├── server/        # Hono + tRPC + Prisma + PostgreSQL 18
│   ├── web/           # React 19 + Vite 7 + TailwindCSS 4（SSR + CSR）
│   ├── miniapp/       # 微信小程序 · Taro + React
│   ├── types/         # 共享 Zod v4 Schema
│   ├── components/    # UI 设计系统
│   └── i18n/          # 中英双语开箱即用
├── docker-compose.yml
├── Makefile
└── .github/
    └── copilot-instructions.md   ← 架构规则，而非文档
```

### 你只需描述功能，其余全部预置好了：

| 内置能力 | 详情 |
|---|---|
| **认证 + Session** | 注册、登录、Cookie 会话 |
| **多租户工作区** | 隔离、邀请、角色权限 |
| **文件存储** | 本地 MinIO，环境变量切换 S3 / OSS |
| **国际化 i18n** | 中 / 英双语，新增语言无需改组件 |
| **深色 / 浅色 / 跟随系统主题** | CSS 变量驱动 |
| **端到端类型安全** | tRPC + Zod，编译器即时捕获 AI 错误 |
| **微信小程序** | Taro + React，与 Web 端共享类型 + tRPC |
| **SSR + CSR 混合渲染** | 官网走 SSR，控制台走 CSR，同一份代码库 |

---

## 给不会编程的你：实际怎么用

你不写代码，你和 AI 对话。流程如下：

**第一步：告诉 AI 你想要什么**
> *"添加一个功能，让用户可以创建项目，包含名称和描述"*

**第二步：AI 按规范写代码** — Schema、API、UI，全部联通

**第三步：验证代码是否正确**
```bash
make lint && make tsc   # 绿色 = 代码没问题
make dev                # 打开浏览器，自己体验一下
```

**第四步：搞定，上线。**

规范保证了 AI 生成的代码每次都一致，无论你用哪个 AI 工具。

---

## 兼容所有 AI 工具

`.github/copilot-instructions.md` 中的规范适用于：

- **Claude Code**（推荐）
- **GitHub Copilot**
- **Cursor**
- **Codex / ChatGPT**
- **Gemini CLI**
- **Qwen / GLM / 任意大模型**

智能在架构里，不在工具里。

---

## 环境要求

| 工具 | 版本 | 安装方式 |
|------|------|---------|
| [Docker](https://docs.docker.com/get-docker/) | 24+ | 运行数据库和存储服务 |
| [Node.js](https://nodejs.org/) | 20+ | `brew install node` 或 apt |
| [pnpm](https://pnpm.io/installation) | 10+ | `npm install -g pnpm` |

<details>
<summary>Windows（WSL2）— 强烈推荐</summary>

> **不支持纯 Windows（不带 WSL）。**
> 在原生 Windows 上运行需要手动适配每一条 shell 命令、Makefile 和 Docker 卷路径，极为繁琐且容易出错。
>
> **强烈推荐使用 WSL2。** 它在 Windows 内提供真实的 Linux 环境，与 Docker Desktop 无缝集成，并且与 AI 编程工具（Claude Code、Cursor、Copilot 等）完全兼容，整个开发流程顺畅可靠。

### 安装 WSL2（一次性配置）

```powershell
# 1. 以管理员身份打开 PowerShell，执行：
wsl --install
# 默认安装 WSL2 + Ubuntu，提示重启时重启即可。
```

如果已有 WSL1，升级到 WSL2：
```powershell
wsl --set-default-version 2
wsl --list --verbose          # 确认 VERSION = 2
```

### 安装 Docker Desktop

1. 下载 [Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install/)
2. 安装时（或在 Settings → General 中）勾选 **"Use the WSL 2 based engine"**
3. 在 Settings → Resources → WSL Integration 中，为你的 Ubuntu 发行版开启集成

### 在 WSL2 内继续操作

```bash
# 从开始菜单打开 Ubuntu（或在 PowerShell 中输入 wsl）
# 之后按照 Linux 步骤操作即可，完全一致
curl -fsSL https://specc.sh | bash
```

</details>

<details>
<summary>macOS</summary>

```bash
brew install node
npm install -g pnpm
# 安装 Docker Desktop：https://docs.docker.com/desktop/install/mac-install/
```

</details>

<details>
<summary>Linux（Ubuntu / Debian）</summary>

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
npm install -g pnpm
# 安装 Docker：https://docs.docker.com/engine/install/ubuntu/
```

</details>

---

## 常用命令

| 命令 | 说明 |
|------|------|
| `make init` | 首次初始化 |
| `make dev` | 启动开发环境 |
| `make build` | 编译生产版本 |
| `make lint` | 代码质量检查 |
| `make tsc` | 类型检查 |
| `make prod` | 构建并启动生产栈 |

---

## 环境变量

```bash
cp packages/server/.env.example packages/server/.env
cp packages/web/.env.example packages/web/.env
```

| 变量 | 位置 | 说明 |
|------|------|------|
| `DATABASE_URL` | `server/.env` | PostgreSQL 连接字符串 |
| `STORAGE_ENDPOINT` | `server/.env` | S3 / MinIO 端点 |
| `VITE_TRPC_URL` | `web/.env` | API 端点 |
| `VITE_STORAGE_PUBLIC_URL` | `web/.env` | 文件公开访问 URL 前缀 |

---

## 技术栈

| 层级 | 技术 |
|------|------|
| 后端 | [Hono](https://hono.dev/) + [tRPC v11](https://trpc.io/) |
| 数据库 | PostgreSQL 18 + [Prisma ORM](https://www.prisma.io/) |
| 前端（Web） | React 19 + [Vite 7](https://vite.dev/) — SSR + CSR 混合 |
| 小程序 | [Taro](https://taro.js.org/) + React — 微信原生 |
| 样式 | TailwindCSS 4 |
| 校验 | Zod v4 |
| 存储 | MinIO（S3 兼容） |
| 缓存 | Redis 7 |
| Lint | Biome |

---

## License

MIT
