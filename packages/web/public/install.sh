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
  NC="\033[0m"
else
  GREEN="" YELLOW="" BLUE="" RED="" NC=""
fi

info()    { printf "${BLUE}  → %s${NC}\n" "$*"; }
success() { printf "${GREEN}  ✓ %s${NC}\n" "$*"; }
warn()    { printf "${YELLOW}  ⚠ %s${NC}\n" "$*"; }
error()   { printf "${RED}  ✗ %s${NC}\n" "$*" >&2; exit 1; }

# ── banner ────────────────────────────────────────────────────────────────────
printf "\n"
printf "${BLUE}╔══════════════════════════════════════╗${NC}\n"
printf "${BLUE}║${NC}  ${GREEN}specc.sh${NC} — AI Full-Stack Template  ${BLUE}║${NC}\n"
printf "${BLUE}╚══════════════════════════════════════╝${NC}\n\n"

# ── prerequisite checks ───────────────────────────────────────────────────────
check_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    error "$1 is required but not installed. See https://specc.sh for setup instructions."
  fi
  success "$1 found ($(command -v "$1"))"
}

info "Checking prerequisites..."
check_command git
check_command docker
check_command node
check_command pnpm
printf "\n"

# ── Node.js version check ─────────────────────────────────────────────────────
NODE_VERSION=$(node -e "process.stdout.write(process.versions.node.split('.')[0])")
if [ "$NODE_VERSION" -lt 20 ]; then
  error "Node.js 20+ is required (found v$(node --version)). Please upgrade: https://nodejs.org/"
fi
success "Node.js v$(node --version) OK"

# ── Docker daemon check ───────────────────────────────────────────────────────
if ! docker info >/dev/null 2>&1; then
  error "Docker daemon is not running. Please start Docker Desktop (or the Docker service) and retry."
fi
success "Docker daemon is running"
printf "\n"

# ── clone ─────────────────────────────────────────────────────────────────────
if [ -d "$INSTALL_DIR" ]; then
  warn "Directory '$INSTALL_DIR' already exists. Skipping clone."
else
  info "Cloning specc.sh into ./$INSTALL_DIR ..."
  git clone --depth=1 "$REPO_URL" "$INSTALL_DIR"
  success "Cloned into ./$INSTALL_DIR"
fi

cd "$INSTALL_DIR"
printf "\n"

# ── init ──────────────────────────────────────────────────────────────────────
info "Running project initialization (make init)..."
printf "\n"
make init

# ── done ──────────────────────────────────────────────────────────────────────
printf "\n"
printf "${BLUE}╔══════════════════════════════════════╗${NC}\n"
printf "${BLUE}║${NC}  ${GREEN}✨ specc.sh is ready!${NC}                ${BLUE}║${NC}\n"
printf "${BLUE}╚══════════════════════════════════════╝${NC}\n\n"
printf "  ${YELLOW}cd $INSTALL_DIR${NC}\n"
printf "  ${YELLOW}make dev${NC}   — start the development server\n\n"
printf "  Web   → ${GREEN}http://localhost:5173${NC}\n"
printf "  API   → ${GREEN}http://localhost:4000${NC}\n"
printf "  MinIO → ${GREEN}http://localhost:9001${NC}\n\n"
