.PHONY: init dev build docker prod tsc lint help

# 读取环境变量（如果存在）
-include .env

# 默认目标
.DEFAULT_GOAL := help

# 镜像名称
SERVER_IMAGE := specc-server
WEB_IMAGE := specc-web
MIGRATE_IMAGE := specc-server-migrate
COMPOSE_FILE := docker-compose.yml

# 颜色输出
GREEN  := \033[0;32m
YELLOW := \033[0;33m
BLUE   := \033[0;34m
NC     := \033[0m # No Color

help: ## 显示帮助信息
	@printf "$(BLUE)═══════════════════════════════════════$(NC)\n"
	@printf "$(GREEN)  可用的 Make 命令$(NC)\n"
	@printf "$(BLUE)═══════════════════════════════════════$(NC)\n"
	@printf "  $(YELLOW)make init$(NC)   - 首次初始化项目（安装依赖+启动服务+同步Schema）\n"
	@printf "  $(YELLOW)make dev$(NC)    - 启动开发环境（数据库+开发服务器）\n"
	@printf "  $(YELLOW)make build$(NC)  - 编译生产版本\n"
	@printf "  $(YELLOW)make docker$(NC) - 构建所有 Docker 镜像\n"
	@printf "  $(YELLOW)make prod$(NC)   - 构建镜像并启动完整生产栈\n"
	@printf "$(BLUE)═══════════════════════════════════════$(NC)\n"

init: ## 首次初始化项目（安装依赖+启动服务+同步Schema）
	@printf "$(BLUE)═══════════════════════════════════════$(NC)\n"
	@printf "$(GREEN)  🚀 specc.sh 项目初始化$(NC)\n"
	@printf "$(BLUE)═══════════════════════════════════════$(NC)\n"
	@printf "\n"
	@printf "$(YELLOW)📝 [1/6] 检查环境变量文件...$(NC)\n"
	@if [ ! -f .env ]; then \
		cp .env.example .env; \
		printf "$(GREEN)✓ 已从 .env.example 创建根目录 .env 文件$(NC)\n"; \
	else \
		printf "$(GREEN)✓ 根目录 .env 文件已存在$(NC)\n"; \
	fi
	@if [ ! -f packages/server/.env ]; then \
		cp packages/server/.env.example packages/server/.env; \
		printf "$(GREEN)✓ 已从 .env.example 创建 server .env 文件$(NC)\n"; \
	else \
		printf "$(GREEN)✓ server .env 文件已存在$(NC)\n"; \
	fi
	@if [ ! -f packages/web/.env ]; then \
		cp packages/web/.env.example packages/web/.env; \
		printf "$(GREEN)✓ 已从 .env.example 创建 web .env 文件$(NC)\n"; \
	else \
		printf "$(GREEN)✓ web .env 文件已存在$(NC)\n"; \
	fi
	@printf "\n"
	@printf "$(YELLOW)📁 [2/6] 创建数据目录...$(NC)\n"
	@mkdir -p .data/postgres .data/minio .data/redis
	@printf "$(GREEN)✓ 数据目录已就绪$(NC)\n"
	@printf "\n"
	@printf "$(YELLOW)📦 [3/6] 安装依赖...$(NC)\n"
	@pnpm install
	@printf "$(GREEN)✓ 依赖安装完成$(NC)\n"
	@printf "\n"
	@printf "$(YELLOW)🐳 [4/6] 启动数据库容器...$(NC)\n"
	@docker-compose up -d db minio redis
	@printf "$(GREEN)✓ 数据库、MinIO 和 Redis 已启动$(NC)\n"
	@printf "\n"
	@printf "$(YELLOW)⏳ [5/6] 等待数据库就绪...$(NC)\n"
	@sleep 5
	@docker-compose exec -T db pg_isready -U postgres > /dev/null 2>&1 || sleep 3
	@printf "$(GREEN)✓ 数据库就绪$(NC)\n"
	@printf "\n"
	@printf "$(YELLOW)🪣 [5b] 初始化 MinIO 存储桶...$(NC)\n"
	@docker-compose run --rm minio-init
	@printf "$(GREEN)✓ MinIO 存储桶已就绪$(NC)\n"
	@printf "\n"
	@printf "$(YELLOW)🗃️  [6/6] 同步数据库 Schema...$(NC)\n"
	@pnpm --filter @specc/server db:push
	@printf "$(GREEN)✓ 数据库 Schema 同步完成$(NC)\n"
	@printf "\n"
	@printf "$(YELLOW)⚙️  [6b] 生成 Prisma Client...$(NC)\n"
	@pnpm --filter @specc/server db:generate
	@printf "$(GREEN)✓ Prisma Client 生成完成$(NC)\n"
	@printf "\n"
	@printf "$(BLUE)═══════════════════════════════════════$(NC)\n"
	@printf "$(GREEN)  ✨ 初始化完成！$(NC)\n"
	@printf "$(BLUE)═══════════════════════════════════════$(NC)\n"
	@printf "\n"
	@printf "$(YELLOW)👉 运行 'make dev' 启动开发服务器$(NC)\n"
	@printf "\n"

dev: ## 启动开发环境（数据库+开发服务器）
	@printf "$(GREEN)🚀 启动开发环境...$(NC)\n"
	@docker-compose up -d db minio redis
	@docker-compose run --rm minio-init 2>/dev/null || true
	@printf "$(GREEN)✓ 数据库、MinIO 和 Redis 已启动$(NC)\n"
	@printf "$(YELLOW)启动开发服务器...$(NC)\n"
	@pnpm dev

build: ## 编译生产版本
	@printf "$(GREEN)🔨 开始编译...$(NC)\n"
	@pnpm build
	@printf "$(GREEN)✓ 编译完成$(NC)\n"

docker: ## 构建所有 Docker 镜像（server / migrate / web）
	@printf "$(GREEN)🐳 构建 Docker 镜像...$(NC)\n"
	@docker build -f packages/server/Dockerfile --target runner -t $(SERVER_IMAGE):latest .
	@docker build -f packages/server/Dockerfile --target migrate -t $(MIGRATE_IMAGE):latest .
	@docker build -f packages/web/Dockerfile -t $(WEB_IMAGE):latest .
	@printf "$(GREEN)✓ 镜像构建完成$(NC)\n"

prod: docker ## 构建镜像并启动完整生产栈（db + minio + migrate + server + web）
	@printf "$(GREEN)🚀 启动生产环境...$(NC)\n"
	@docker-compose up -d db minio
	@docker-compose run --rm minio-init
	@docker-compose up -d server web
	@printf "$(GREEN)✓ 生产环境已启动$(NC)\n"
	@printf "  Server : http://localhost:4000\n"
	@printf "  Web    : http://localhost:8080\n"

tsc: ## TypeScript 类型检查（所有包）
	@pnpm -r --parallel run typecheck

lint: ## Biome lint 检查（所有包）
	@pnpm exec biome check .