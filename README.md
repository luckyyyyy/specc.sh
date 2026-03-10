<div align="center">

# SPECC.SH

### The End of Handwritten Code

**Your AI Writes**
**You Ship**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Demo](https://img.shields.io/badge/Demo-specc.sh-green)](https://specc.sh)

[中文文档](./README.zh.md) · [Live Demo](https://specc.sh) · [GitHub](https://github.com/luckyyyyy/specc.sh)

</div>

---

## Why Is Vibe Coding So Hard to Get Right?

Everyone's tried it. You open Claude Code or Cursor, describe what you want, and watch the AI write hundreds of lines in seconds. It looks impressive. Then you run it — and it breaks.

This isn't bad luck. It's structural.

**The real reasons your AI-generated code falls short:**

- **No project-level spec** — The AI doesn't know your folder conventions, naming patterns, or architecture decisions. It guesses, and guesses differently every time.
- **No enforced constraints** — Without lint rules, type schemas, and output contracts baked into the project, the AI freestyle-codes its way into an inconsistent mess.
- **No shared language** — Your AI tool has no idea what "production-grade" means *for your project* unless you tell it explicitly.

The result: code that compiles on Monday, breaks on Tuesday, and is impossible to extend by Friday.

> The problem isn't the AI. It's the absence of a spec the AI can follow.

SPECC.SH solves this at the architecture level. There's no separate doc to write or maintain. The folder structure, type schemas, lint rules, and module contracts **are** the prompt — the codebase itself tells AI exactly what to do, every time.

---

## Why SPECC.SH?

You've probably tried **Vibe Coding** — typing prompts into Claude Code, Cursor, or Copilot and hoping for the best. Sometimes it works. Often it doesn't. The AI writes code that doesn't compile, ignores your conventions, or breaks something else.

**The problem isn't the AI. It's the lack of a spec.**

SPECC.SH is a full-stack template where the architecture itself is the prompt. The folder structure, type system, module boundaries, and lint rules tell AI exactly what to do — no separate documentation required. When your AI opens this codebase, it stops guessing and starts following the structure — producing code that compiles, passes lint, and ships to production on the first try.

> **Vibe Coding** = AI freestyles → inconsistent mess
> **Spec Coding** = AI follows your spec → production-grade output

---

## How It Works (No Coding Required)

```
1. Clone this template
2. Open your AI tool (Claude Code, Cursor, Copilot, Codex...)
3. Describe what you want to build in plain language
4. AI generates the code — guided by the built-in spec
5. Run: make lint && make tsc
6. Ship
```

The architecture is the prompt. Every folder, type contract, and lint rule tells AI what to do — consistent, type-safe, lint-passing code on the first try. No manual review needed.

---

## Quick Start

```bash
curl -fsSL https://specc.sh | bash
```

Or manually:

```bash
git clone https://github.com/luckyyyyy/specc.sh.git
cd specc.sh
make init   # install deps + start Docker services + sync DB
make dev    # start everything
```

| Service | URL |
|---------|-----|
| Web (React) | http://localhost:5173 |
| API (Hono) | http://localhost:4000 |
| MinIO Console | http://localhost:9001 |

---

## What's Inside

A production-ready TypeScript monorepo — batteries included:

```
specc.sh/
├── packages/
│   ├── server/        # Hono + tRPC + Prisma + PostgreSQL 18
│   ├── web/           # React 19 + Vite 7 + TailwindCSS 4
│   ├── types/         # Shared Zod v4 schemas
│   ├── components/    # UI design system
│   └── i18n/          # EN + ZH out of the box
├── docker-compose.yml
├── Makefile
└── .github/
    └── copilot-instructions.md   ← Architecture rules, not docs
```

### Everything pre-wired, so you just describe features:

| What you get | Detail |
|---|---|
| **Auth + Sessions** | Login, register, cookie sessions |
| **Multi-Tenant Workspaces** | Isolation, invites, role-based access |
| **File Storage** | MinIO locally → swap to S3 / OSS via env |
| **i18n** | EN / ZH, add more locales with zero component changes |
| **Dark / Light / System Theme** | CSS variable-driven |
| **End-to-End Type Safety** | tRPC + Zod — compiler catches AI mistakes instantly |

---

## For Non-Programmers: What You Actually Do

You don't write code. You talk to AI. Here's the loop:

**1. Tell the AI what you want**
> *"Add a feature where users can create projects with a name and description"*

**2. AI writes the code** following the spec — schema, API, UI, all wired up

**3. You verify it works**
```bash
make lint && make tsc   # if green, the code is correct
make dev                # open browser, test it yourself
```

**4. Done. Ship it.**

The spec ensures AI-generated code is consistent every single time, even across different AI tools.

---

## Works With Any AI Tool

The spec in `.github/copilot-instructions.md` works with:

- **Claude Code** (recommended)
- **GitHub Copilot**
- **Cursor**
- **Codex / ChatGPT**
- **Gemini CLI**
- **Qwen / GLM / any LLM**

The intelligence is in the architecture, not the tool.

---

## Prerequisites

| Tool | Version | Install |
|------|---------|---------|
| [Docker](https://docs.docker.com/get-docker/) | 24+ | Required for DB + storage |
| [Node.js](https://nodejs.org/) | 20+ | `brew install node` or apt |
| [pnpm](https://pnpm.io/installation) | 10+ | `npm install -g pnpm` |

<details>
<summary>Windows (WSL2)</summary>

Windows users **must** run inside WSL2.

1. Open PowerShell as Administrator: `wsl --install`
2. Install [Docker Desktop](https://docs.docker.com/desktop/install/windows-install/) → enable "Use the WSL 2 based engine"
3. Open your WSL2 terminal and follow the Linux steps

</details>

<details>
<summary>macOS</summary>

```bash
brew install node
npm install -g pnpm
# Install Docker Desktop from https://docs.docker.com/desktop/install/mac-install/
```

</details>

<details>
<summary>Linux (Ubuntu / Debian)</summary>

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
npm install -g pnpm
# Install Docker: https://docs.docker.com/engine/install/ubuntu/
```

</details>

---

## Commands

| Command | What it does |
|---------|-------------|
| `make init` | First-time setup |
| `make dev` | Start dev environment |
| `make build` | Build for production |
| `make lint` | Check code quality |
| `make tsc` | Check types |
| `make prod` | Build + start production stack |

---

## Environment Variables

```bash
cp packages/server/.env.example packages/server/.env
cp packages/web/.env.example packages/web/.env
```

| Variable | Where | Description |
|----------|-------|-------------|
| `DATABASE_URL` | `server/.env` | PostgreSQL connection |
| `STORAGE_ENDPOINT` | `server/.env` | S3 / MinIO endpoint |
| `VITE_TRPC_URL` | `web/.env` | API endpoint |
| `VITE_STORAGE_PUBLIC_URL` | `web/.env` | Public file URL prefix |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | [Hono](https://hono.dev/) + [tRPC v11](https://trpc.io/) |
| Database | PostgreSQL 18 + [Prisma ORM](https://www.prisma.io/) |
| Frontend | React 19 + [Vite 7](https://vite.dev/) |
| Styling | TailwindCSS 4 |
| Validation | Zod v4 |
| Storage | MinIO (S3-compatible) |
| Cache | Redis 7 |
| Lint | Biome |

---

## License

MIT
