#!/usr/bin/env bash
# specc.sh installer
# Usage: curl -fsSL https://specc.sh | bash

set -e

REPO_URL="https://github.com/luckyyyyy/specc.sh.git"
INSTALL_DIR="${SPECC_DIR:-specc.sh}"

# ── colors ────────────────────────────────────────────────────────────────────
if [ -t 1 ]; then
  GREEN="\033[0;32m"
  YELLOW="\033[0;33m"
  BLUE="\033[0;34m"
  RED="\033[0;31m"
  CYAN="\033[0;36m"
  BOLD="\033[1m"
  NC="\033[0m"
else
  GREEN="" YELLOW="" BLUE="" RED="" CYAN="" BOLD="" NC=""
fi

info()    { printf "${BLUE}  → %s${NC}\n" "$*"; }
success() { printf "${GREEN}  ✓ %s${NC}\n" "$*"; }
warn()    { printf "${YELLOW}  ⚠ %s${NC}\n" "$*"; }
error()   { printf "${RED}  ✗ %s${NC}\n" "$*" >&2; exit 1; }
step()    { printf "\n${BOLD}${BLUE}── %s${NC}\n\n" "$*"; }

# ── detect OS ────────────────────────────────────────────────────────────────
detect_os() {
  case "$OSTYPE" in
    linux*)
      [ -f /etc/debian_version ] && echo "debian" && return
      [ -f /etc/redhat-release ] && echo "rhel"   && return
      echo "linux" ;;
    darwin*) echo "macos" ;;
    *)       echo "unknown" ;;
  esac
}
OS=$(detect_os)

# ── WSL2 detection ───────────────────────────────────────────────────────────
IS_WSL2=false
if [ -f /proc/version ] && grep -qi "microsoft\|wsl" /proc/version 2>/dev/null; then
  IS_WSL2=true
fi

# ── banner ────────────────────────────────────────────────────────────────────
printf "\n"
printf "${BLUE}╔══════════════════════════════════════╗${NC}\n"
printf "${BLUE}║${NC}  ${GREEN}specc.sh${NC} — AI Full-Stack Template  ${BLUE}║${NC}\n"
printf "${BLUE}╚══════════════════════════════════════╝${NC}\n\n"

# ── language selection ────────────────────────────────────────────────────────
LANG_MODE="en"
# Auto-detect from system locale
if echo "${LANG:-} ${LC_ALL:-} ${LC_MESSAGES:-}" | grep -qi "zh"; then
  LANG_MODE="zh"
fi

# Read from /dev/tty so this works even when piped via curl | bash
if { : </dev/tty; } 2>/dev/null; then
  printf "  Select language / 选择语言:\n"
  printf "    ${GREEN}[1]${NC} English\n"
  printf "    ${BLUE}[2]${NC} 中文\n"
  if [ "$LANG_MODE" = "zh" ]; then
    printf "  请选择 / Your choice [1/2] (默认 / default: 2): "
  else
    printf "  请选择 / Your choice [1/2] (默认 / default: 1): "
  fi
  read -r _lang_input </dev/tty || true
  case "$_lang_input" in
    1) LANG_MODE="en" ;;
    2) LANG_MODE="zh" ;;
    "") ;;   # keep auto-detected default
    *)  LANG_MODE="en" ;;
  esac
fi

printf "\n"
if [ "$LANG_MODE" = "zh" ]; then
  success "已选择中文模式"
  info "代码将从 GitHub 克隆（如果速度慢，请先解决网络问题）"
  info "pnpm 将使用淘宝镜像 (registry.npmmirror.com)"
else
  success "English mode selected"
fi

# ── show all missing dependencies at once ────────────────────────────────────
show_missing_instructions() {
  local missing="$1"   # space-separated list of missing commands
  local apt_pkgs=""
  local brew_pkgs=""
  local has_docker=false
  local has_node=false
  local has_pnpm=false

  for cmd in $missing; do
    case "$cmd" in
      git|make)
        apt_pkgs="$apt_pkgs $cmd"
        brew_pkgs="$brew_pkgs $cmd"
        ;;
      docker) has_docker=true ;;
      node)   has_node=true ;;
      pnpm)   has_pnpm=true ;;
    esac
  done

  local step_num=1

  if [ "$LANG_MODE" = "zh" ]; then
    printf "\n${RED}  ✗ 以下依赖未找到：${BOLD}%s${NC}\n" "$missing"
    printf "${RED}    请按以下步骤安装后重新运行此脚本。${NC}\n\n"

    # ── combined apt/yum/brew (git, make) ──
    if [ -n "$apt_pkgs" ]; then
      printf "  ${BOLD}${YELLOW}步骤 %d：安装 %s${NC}\n" "$step_num" "$(echo $apt_pkgs | xargs)"
      case "$OS" in
        debian|linux)
          printf "      ${CYAN}sudo apt-get update && sudo apt-get install -y%s${NC}\n" "$apt_pkgs" ;;
        rhel)
          printf "      ${CYAN}sudo yum install -y%s${NC}\n" "$apt_pkgs" ;;
        macos)
          printf "      Xcode 命令行工具（包含 git 和 make）：${CYAN}xcode-select --install${NC}\n"
          printf "      或 Homebrew：${CYAN}brew install%s${NC}\n" "$brew_pkgs" ;;
        *)
          printf "      Ubuntu/Debian：${CYAN}sudo apt-get update && sudo apt-get install -y%s${NC}\n" "$apt_pkgs"
          printf "      CentOS/RHEL：  ${CYAN}sudo yum install -y%s${NC}\n" "$apt_pkgs"
          printf "      macOS：        ${CYAN}xcode-select --install${NC}\n" ;;
      esac
      step_num=$((step_num + 1))
      printf "\n"
    fi

    # ── docker ──
    if $has_docker; then
      printf "  ${BOLD}${YELLOW}步骤 %d：安装 Docker${NC}\n" "$step_num"
      if $IS_WSL2; then
        printf "\n  ${CYAN}检测到 WSL2 环境，推荐使用 Docker Desktop for Windows：${NC}\n\n"
        printf "      1. 在 Windows 宿主机下载并安装 Docker Desktop：\n"
        printf "         ${CYAN}https://www.docker.com/products/docker-desktop/${NC}\n\n"
        printf "      2. 安装后打开 Settings → Resources → WSL Integration\n"
        printf "         → 勾选当前 WSL2 发行版（如 Ubuntu），保存并重启 Docker Desktop\n\n"
        printf "      3. 重新打开 WSL2 终端，运行 ${CYAN}docker info${NC} 验证是否生效\n\n"
        printf "  ${YELLOW}▸ 也可直接在 WSL2 内安装 Docker Engine（systemd 支持有限，不推荐）：${NC}\n"
        printf "        ${CYAN}curl -fsSL https://get.docker.com | sh${NC}\n"
        printf "        ${CYAN}sudo service docker start${NC}\n"
        printf "        ${CYAN}sudo usermod -aG docker \$USER && newgrp docker${NC}\n"
      else
        case "$OS" in
          debian|rhel|linux)
            printf "      方法一（阿里云镜像脚本，推荐国内）：\n"
            printf "        ${CYAN}curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun${NC}\n\n"
            printf "      方法二（官方脚本）：\n"
            printf "        ${CYAN}curl -fsSL https://get.docker.com | sh${NC}\n\n"
            printf "      安装完成后，启用并启动服务：\n"
            printf "        ${CYAN}sudo systemctl enable --now docker${NC}\n\n"
            printf "      将当前用户加入 docker 组（之后无需 sudo）：\n"
            printf "        ${CYAN}sudo usermod -aG docker \$USER && newgrp docker${NC}\n" ;;
          macos)
            printf "      下载 Docker Desktop：\n"
            printf "        ${CYAN}https://docs.docker.com/desktop/install/mac-install/${NC}\n"
            printf "      或使用 Homebrew：\n"
            printf "        ${CYAN}brew install --cask docker${NC}\n" ;;
        esac
      fi
      printf "\n  ${YELLOW}▸ 配置 Docker 国内加速镜像（可选，加速 Hub 拉取）：${NC}\n"
      printf "      编辑 /etc/docker/daemon.json（Linux）或 Docker Desktop → Settings → Docker Engine：\n"
      printf "        ${CYAN}{\n          \"registry-mirrors\": [\n            \"https://docker.mirrors.ustc.edu.cn\",\n            \"https://hub-mirror.c.163.com\"\n          ]\n        }${NC}\n"
      printf "      注意：国内镜像可用性可能变化，请自行确认当前是否有效。\n"
      step_num=$((step_num + 1))
      printf "\n"
    fi

    # ── node ──
    if $has_node; then
      printf "  ${BOLD}${YELLOW}步骤 %d：安装 Node.js 22 LTS${NC}\n" "$step_num"
      printf "      方法一：nvm（推荐，支持多版本管理）：\n"
      printf "        ${CYAN}export NVM_NODEJS_ORG_MIRROR=https://npmmirror.com/mirrors/node${NC}\n"
      printf "        ${CYAN}curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash${NC}\n"
      printf "        ${CYAN}source ~/.bashrc   # 或 source ~/.zshrc${NC}\n"
      printf "        ${CYAN}NVM_NODEJS_ORG_MIRROR=https://npmmirror.com/mirrors/node nvm install 22${NC}\n"
      printf "        ${CYAN}nvm use 22${NC}\n\n"
      printf "      方法二：从淘宝镜像直接下载安装包：\n"
      printf "        ${CYAN}https://npmmirror.com/mirrors/node/v22.0.0/${NC}\n"
      step_num=$((step_num + 1))
      printf "\n"
    fi

    # ── pnpm ──
    if $has_pnpm; then
      printf "  ${BOLD}${YELLOW}步骤 %d：安装 pnpm${NC}\n" "$step_num"
      printf "      方法一（推荐，使用淘宝镜像）：\n"
      printf "        ${CYAN}npm install -g pnpm --registry=https://registry.npmmirror.com${NC}\n\n"
      printf "      方法二（corepack，Node.js 内置）：\n"
      printf "        ${CYAN}corepack enable pnpm${NC}\n"
      printf "\n"
    fi

  else
    printf "\n${RED}  ✗ The following dependencies are missing:${BOLD} %s${NC}\n" "$missing"
    printf "${RED}    Please install them and re-run this script.${NC}\n\n"

    # ── combined apt/yum/brew (git, make) ──
    if [ -n "$apt_pkgs" ]; then
      printf "  ${BOLD}${YELLOW}Step %d: Install %s${NC}\n" "$step_num" "$(echo $apt_pkgs | xargs)"
      case "$OS" in
        debian|linux)
          printf "      ${CYAN}sudo apt-get update && sudo apt-get install -y%s${NC}\n" "$apt_pkgs" ;;
        rhel)
          printf "      ${CYAN}sudo yum install -y%s${NC}\n" "$apt_pkgs" ;;
        macos)
          printf "      Xcode CLI tools (includes git & make): ${CYAN}xcode-select --install${NC}\n"
          printf "      Or via Homebrew: ${CYAN}brew install%s${NC}\n" "$brew_pkgs" ;;
        *)
          printf "      Ubuntu/Debian: ${CYAN}sudo apt-get update && sudo apt-get install -y%s${NC}\n" "$apt_pkgs"
          printf "      CentOS/RHEL:   ${CYAN}sudo yum install -y%s${NC}\n" "$apt_pkgs"
          printf "      macOS:         ${CYAN}xcode-select --install${NC}\n" ;;
      esac
      step_num=$((step_num + 1))
      printf "\n"
    fi

    # ── docker ──
    if $has_docker; then
      printf "  ${BOLD}${YELLOW}Step %d: Install Docker${NC}\n" "$step_num"
      if $IS_WSL2; then
        printf "\n  ${CYAN}WSL2 environment detected. Recommended: Docker Desktop for Windows:${NC}\n\n"
        printf "      1. Install Docker Desktop on your Windows host:\n"
        printf "         ${CYAN}https://www.docker.com/products/docker-desktop/${NC}\n\n"
        printf "      2. In Docker Desktop: Settings → Resources → WSL Integration\n"
        printf "         → Enable your WSL2 distro (e.g. Ubuntu), save & restart Docker Desktop\n\n"
        printf "      3. Reopen your WSL2 terminal and run ${CYAN}docker info${NC} to verify\n\n"
        printf "  ${YELLOW}▸ Alternatively, install Docker Engine directly in WSL2 (not recommended):${NC}\n"
        printf "        ${CYAN}curl -fsSL https://get.docker.com | sh${NC}\n"
        printf "        ${CYAN}sudo service docker start${NC}\n"
        printf "        ${CYAN}sudo usermod -aG docker \$USER && newgrp docker${NC}\n"
      else
        case "$OS" in
          debian|rhel|linux)
            printf "      One-liner (official):\n"
            printf "        ${CYAN}curl -fsSL https://get.docker.com | sh${NC}\n\n"
            printf "      Enable and start the service:\n"
            printf "        ${CYAN}sudo systemctl enable --now docker${NC}\n\n"
            printf "      Add your user to the docker group (no sudo needed after):\n"
            printf "        ${CYAN}sudo usermod -aG docker \$USER && newgrp docker${NC}\n" ;;
          macos)
            printf "      Download Docker Desktop:\n"
            printf "        ${CYAN}https://www.docker.com/products/docker-desktop/${NC}\n"
            printf "      Or via Homebrew:\n"
            printf "        ${CYAN}brew install --cask docker${NC}\n" ;;
          *)
            printf "      See: ${CYAN}https://docs.docker.com/get-docker/${NC}\n" ;;
        esac
      fi
      step_num=$((step_num + 1))
      printf "\n"
    fi

    # ── node ──
    if $has_node; then
      printf "  ${BOLD}${YELLOW}Step %d: Install Node.js 22 LTS${NC}\n" "$step_num"
      printf "      Option 1 — nvm (recommended):\n"
      printf "        ${CYAN}curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash${NC}\n"
      printf "        ${CYAN}source ~/.bashrc   # or source ~/.zshrc${NC}\n"
      printf "        ${CYAN}nvm install 22 && nvm use 22${NC}\n\n"
      printf "      Option 2 — official installer:\n"
      printf "        ${CYAN}https://nodejs.org/en/download/${NC}\n"
      step_num=$((step_num + 1))
      printf "\n"
    fi

    # ── pnpm ──
    if $has_pnpm; then
      printf "  ${BOLD}${YELLOW}Step %d: Install pnpm${NC}\n" "$step_num"
      printf "      Option 1 (recommended): ${CYAN}npm install -g pnpm${NC}\n"
      printf "      Option 2 (corepack):    ${CYAN}corepack enable pnpm${NC}\n"
      printf "\n"
    fi
  fi

  exit 1
}

# ── auto-install missing deps on Linux ────────────────────────────────────────
auto_install_linux() {
  local run_as=""
  [ "$(id -u)" -ne 0 ] && command -v sudo >/dev/null 2>&1 && run_as="sudo"
  [ "$(id -u)" -ne 0 ] && ! command -v sudo >/dev/null 2>&1 && {
    if [ "$LANG_MODE" = "zh" ]; then
      error "需要 root 权限或 sudo 才能自动安装依赖"
    else
      error "Root or sudo access is required for auto-installation"
    fi
  }

  # ── git / make ──
  local sys_pkgs=""
  ! command -v git  >/dev/null 2>&1 && sys_pkgs="$sys_pkgs git"
  ! command -v make >/dev/null 2>&1 && sys_pkgs="$sys_pkgs make"
  if [ -n "$sys_pkgs" ]; then
    if [ "$LANG_MODE" = "zh" ]; then info "安装$sys_pkgs..."; else info "Installing$sys_pkgs..."; fi
    if command -v apt-get >/dev/null 2>&1; then
      $run_as apt-get update -qq && $run_as apt-get install -y $sys_pkgs
    elif command -v yum >/dev/null 2>&1; then
      $run_as yum install -y $sys_pkgs
    fi
    if [ "$LANG_MODE" = "zh" ]; then success "make / git 安装完成"; else success "make / git installed"; fi
  fi

  # ── docker ──
  if ! command -v docker >/dev/null 2>&1; then
    if [ "$LANG_MODE" = "zh" ]; then
      info "安装 Docker（阿里云镜像加速）..."
      curl -fsSL https://get.docker.com | $run_as bash -s -- --mirror Aliyun
    else
      info "Installing Docker..."
      curl -fsSL https://get.docker.com | $run_as sh
    fi
    $run_as systemctl enable --now docker 2>/dev/null || $run_as service docker start 2>/dev/null || true
    if [ "$LANG_MODE" = "zh" ]; then success "Docker 安装完成"; else success "Docker installed"; fi
  fi

  # ── docker-compose shim (v2 plugin → legacy binary compatibility) ──
  if ! command -v docker-compose >/dev/null 2>&1; then
    if docker compose version >/dev/null 2>&1; then
      if [ "$LANG_MODE" = "zh" ]; then info "创建 docker-compose 兼容脚本..."; else info "Creating docker-compose compatibility shim..."; fi
      cat > /usr/local/bin/docker-compose << 'SHIM'
#!/bin/sh
exec docker compose "$@"
SHIM
      chmod +x /usr/local/bin/docker-compose
      if [ "$LANG_MODE" = "zh" ]; then success "docker-compose 兼容脚本已创建"; else success "docker-compose shim created"; fi
    elif command -v apt-get >/dev/null 2>&1; then
      $run_as apt-get install -y docker-compose-plugin
      cat > /usr/local/bin/docker-compose << 'SHIM'
#!/bin/sh
exec docker compose "$@"
SHIM
      chmod +x /usr/local/bin/docker-compose
    fi
  fi

  # ── node ──
  if ! command -v node >/dev/null 2>&1; then
    if [ "$LANG_MODE" = "zh" ]; then info "安装 Node.js 22 LTS..."; else info "Installing Node.js 22 LTS..."; fi
    if command -v apt-get >/dev/null 2>&1; then
      curl -fsSL https://deb.nodesource.com/setup_22.x | $run_as bash -
      $run_as apt-get install -y nodejs
    elif command -v yum >/dev/null 2>&1; then
      curl -fsSL https://rpm.nodesource.com/setup_22.x | $run_as bash -
      $run_as yum install -y nodejs
    fi
    if [ "$LANG_MODE" = "zh" ]; then success "Node.js 安装完成"; else success "Node.js installed"; fi
  fi

  # ── pnpm ──
  if ! command -v pnpm >/dev/null 2>&1; then
    if [ "$LANG_MODE" = "zh" ]; then
      info "安装 pnpm（淘宝镜像）..."
      npm install -g pnpm --registry=https://registry.npmmirror.com
    else
      info "Installing pnpm..."
      npm install -g pnpm
    fi
    if [ "$LANG_MODE" = "zh" ]; then success "pnpm 安装完成"; else success "pnpm installed"; fi
  fi
}

# ── prerequisite checks ───────────────────────────────────────────────────────
MISSING_CMDS=""
check_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    if [ "$LANG_MODE" = "zh" ]; then
      printf "${RED}  ✗ 未找到：%s${NC}\n" "$1"
    else
      printf "${RED}  ✗ Not found: %s${NC}\n" "$1"
    fi
    MISSING_CMDS="$MISSING_CMDS $1"
  else
    success "$1 found ($(command -v "$1"))"
  fi
}

if [ "$LANG_MODE" = "zh" ]; then
  step "检查依赖..."
else
  step "Checking prerequisites..."
fi
check_command git
check_command make
check_command docker
check_command node
check_command pnpm
printf "\n"

if [ -n "$MISSING_CMDS" ]; then
  case "$OS" in
    debian|rhel|linux)
      if [ "$LANG_MODE" = "zh" ]; then
        printf "${YELLOW}  ⚠ 缺少依赖：${BOLD}$(echo $MISSING_CMDS | xargs)${NC}\n"
        printf "  将自动安装，按 ${RED}Ctrl+C${NC} 取消..."
      else
        printf "${YELLOW}  ⚠ Missing:${BOLD} $(echo $MISSING_CMDS | xargs)${NC}\n"
        printf "  Will auto-install. Press ${RED}Ctrl+C${NC} to cancel..."
      fi
      sleep 2
      printf "\n\n"
      auto_install_linux
      # ── re-check after install ──────────────────────────────────────────────
      MISSING_CMDS=""
      if [ "$LANG_MODE" = "zh" ]; then
        step "重新检查依赖..."
      else
        step "Re-checking prerequisites..."
      fi
      check_command git
      check_command make
      check_command docker
      check_command node
      check_command pnpm
      printf "\n"
      if [ -n "$MISSING_CMDS" ]; then
        show_missing_instructions "$(echo $MISSING_CMDS | xargs)"
      fi
      ;;
    *)
      show_missing_instructions "$(echo $MISSING_CMDS | xargs)"
      ;;
  esac
fi

# ── Node.js version check ─────────────────────────────────────────────────────
NODE_VERSION=$(node -e "process.stdout.write(process.versions.node.split('.')[0])")
if [ "$NODE_VERSION" -lt 20 ]; then
  if [ "$LANG_MODE" = "zh" ]; then
    warn "需要 Node.js 20 或更高版本（当前：v$(node --version)）"
    info "使用 nvm 升级：NVM_NODEJS_ORG_MIRROR=https://npmmirror.com/mirrors/node nvm install 22"
    error "Node.js 版本不满足要求，请升级后重试"
  else
    error "Node.js 20+ is required (found v$(node --version)). Please upgrade: https://nodejs.org/"
  fi
fi
if [ "$LANG_MODE" = "zh" ]; then
  success "Node.js $(node --version) 版本检查通过"
else
  success "Node.js $(node --version) OK"
fi

# ── Docker daemon check ───────────────────────────────────────────────────────
_docker_tries=0
while ! docker info >/dev/null 2>&1; do
  _docker_tries=$((_docker_tries + 1))
  if [ "$_docker_tries" -ge 12 ]; then
    if [ "$LANG_MODE" = "zh" ]; then
      error "Docker 守护进程未运行。请启动 Docker Desktop 或执行：sudo systemctl start docker"
    else
      error "Docker daemon is not running. Please start Docker Desktop (or run: sudo systemctl start docker)"
    fi
  fi
  if [ "$LANG_MODE" = "zh" ]; then
    info "等待 Docker 守护进程就绪... ($_docker_tries/12)"
  else
    info "Waiting for Docker daemon... ($_docker_tries/12)"
  fi
  sleep 2
done
if [ "$LANG_MODE" = "zh" ]; then
  success "Docker 守护进程运行中"
else
  success "Docker daemon is running"
fi

# ── docker-compose shim (v2 plugin → legacy binary compatibility) ─────────────
if ! command -v docker-compose >/dev/null 2>&1 && docker compose version >/dev/null 2>&1; then
  if [ "$LANG_MODE" = "zh" ]; then
    info "创建 docker-compose 兼容脚本..."
  else
    info "Creating docker-compose compatibility shim..."
  fi
  cat > /usr/local/bin/docker-compose << 'SHIM'
#!/bin/sh
exec docker compose "$@"
SHIM
  chmod +x /usr/local/bin/docker-compose
  if [ "$LANG_MODE" = "zh" ]; then
    success "docker-compose 兼容脚本已创建"
  else
    success "docker-compose shim created"
  fi
fi

printf "\n"

# ── port conflict check helpers ───────────────────────────────────────────────
port_in_use() {
  local port="$1"
  if command -v ss >/dev/null 2>&1; then
    ss -tlnp 2>/dev/null | awk '{print $4}' | grep -qE ":${port}$" && return 0
  fi
  if command -v lsof >/dev/null 2>&1; then
    lsof -i "TCP:${port}" -sTCP:LISTEN >/dev/null 2>&1 && return 0
  fi
  if command -v nc >/dev/null 2>&1; then
    nc -z 127.0.0.1 "$port" 2>/dev/null && return 0
  fi
  return 1
}

check_ports() {
  local has_conflict=false
  for pair in "5432:PostgreSQL" "6379:Redis" "9000:MinIO(S3)" "9001:MinIO-Console" "4000:API" "5173:Web-Dev"; do
    local port="${pair%%:*}"
    local label="${pair##*:}"
    if port_in_use "$port"; then
      warn "Port $port ($label) is already in use"
      has_conflict=true
    fi
  done
  if $has_conflict; then
    printf "\n"
    if [ "$LANG_MODE" = "zh" ]; then
      printf "${YELLOW}  ⚠ 以上端口将被 specc.sh 服务占用，冲突可能导致服务启动失败。${NC}\n"
      printf "  按 ${GREEN}Enter${NC} 继续，或按 ${RED}Ctrl+C${NC} 退出先释放端口... "
    else
      printf "${YELLOW}  ⚠ These ports are required by specc.sh. Conflicts may cause startup failures.${NC}\n"
      printf "  Press ${GREEN}Enter${NC} to continue, or ${RED}Ctrl+C${NC} to exit and free the ports first... "
    fi
    { : </dev/tty; } 2>/dev/null && read -r _ </dev/tty 2>/dev/null || true
    printf "\n"
  else
    if [ "$LANG_MODE" = "zh" ]; then
      success "端口检查通过（所有端口可用）"
    else
      success "All required ports are available"
    fi
  fi
}

# ── configure pnpm registry for Chinese users ─────────────────────────────────
if [ "$LANG_MODE" = "zh" ]; then
  step "配置 pnpm 淘宝镜像..."
  pnpm config set registry https://registry.npmmirror.com
  success "pnpm 镜像已设置为 https://registry.npmmirror.com"
fi

# ── clone ─────────────────────────────────────────────────────────────────────
if [ "$LANG_MODE" = "zh" ]; then
  step "克隆项目（来自 GitHub）..."
else
  step "Cloning repository..."
fi

if [ -d "$INSTALL_DIR" ]; then
  if [ "$LANG_MODE" = "zh" ]; then
    warn "目录 '$INSTALL_DIR' 已存在，跳过克隆。"
  else
    warn "Directory '$INSTALL_DIR' already exists. Skipping clone."
  fi
else
  if [ "$LANG_MODE" = "zh" ]; then
    info "正在克隆 specc.sh 到 ./$INSTALL_DIR ..."
  else
    info "Cloning specc.sh into ./$INSTALL_DIR ..."
  fi
  git clone --depth=1 "$REPO_URL" "$INSTALL_DIR"
  if [ "$LANG_MODE" = "zh" ]; then
    success "已克隆到 ./$INSTALL_DIR"
  else
    success "Cloned into ./$INSTALL_DIR"
  fi
fi

cd "$INSTALL_DIR"
printf "\n"

# ── port check ───────────────────────────────────────────────────────────────
if [ "$LANG_MODE" = "zh" ]; then
  step "检查端口占用..."
else
  step "Checking port availability..."
fi
check_ports
printf "\n"

# ── init ──────────────────────────────────────────────────────────────────────
if [ "$LANG_MODE" = "zh" ]; then
  step "初始化项目（make init）..."
else
  step "Running project initialization (make init)..."
fi
printf "\n"
make init

# ── ensure Prisma client is generated ────────────────────────────────────────
# pnpm v10 blocks postinstall scripts by default; prisma db push (v6) no longer
# auto-generates, so we run it explicitly after init.
if [ -f "packages/server/package.json" ] && [ ! -d "packages/server/src/generated/prisma" ]; then
  if [ "$LANG_MODE" = "zh" ]; then
    info "生成 Prisma 客户端..."
  else
    info "Generating Prisma client..."
  fi
  pnpm --filter @specc/server db:generate
  if [ "$LANG_MODE" = "zh" ]; then
    success "Prisma 客户端生成完成"
  else
    success "Prisma client generated"
  fi
fi

# ── done / start dev ─────────────────────────────────────────────────────────
printf "\n"
if [ "$LANG_MODE" = "zh" ]; then
  printf "${BLUE}╔══════════════════════════════════════╗${NC}\n"
  printf "${BLUE}║${NC}  ${GREEN}✨ 初始化完成，启动开发服务器...${NC}      ${BLUE}║${NC}\n"
  printf "${BLUE}╚══════════════════════════════════════╝${NC}\n\n"
  printf "  前端  → ${GREEN}http://localhost:5173${NC}\n"
  printf "  API   → ${GREEN}http://localhost:4000${NC}\n"
  printf "  MinIO → ${GREEN}http://localhost:9001${NC}\n\n"
  printf "  ${YELLOW}提示：按 Ctrl+C 可停止开发服务器${NC}\n\n"
else
  printf "${BLUE}╔══════════════════════════════════════╗${NC}\n"
  printf "${BLUE}║${NC}  ${GREEN}✨ Init complete — starting dev server${NC} ${BLUE}║${NC}\n"
  printf "${BLUE}╚══════════════════════════════════════╝${NC}\n\n"
  printf "  Web   → ${GREEN}http://localhost:5173${NC}\n"
  printf "  API   → ${GREEN}http://localhost:4000${NC}\n"
  printf "  MinIO → ${GREEN}http://localhost:9001${NC}\n\n"
  printf "  ${YELLOW}Tip: press Ctrl+C to stop the dev server${NC}\n\n"
fi
make dev
