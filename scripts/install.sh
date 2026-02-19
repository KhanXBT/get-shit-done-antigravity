#!/bin/bash

# GSD for Antigravity — Installer
# Copies workflow files into ~/.gemini/antigravity/.agent/workflows/

set -e

CYAN='\033[38;5;51m'
GREEN='\033[38;5;82m'
YELLOW='\033[38;5;220m'
ORANGE='\033[38;5;208m'
BLUE='\033[38;5;33m'
BOLD='\033[1m'
DIM='\033[2m'
NC='\033[0m'

echo ""
echo -e "    ${ORANGE}██████╗ ${ORANGE}███████╗${YELLOW}██████╗ "
echo -e "    ${YELLOW}██╔════╝ ${YELLOW}██╔════╝${GREEN}██╔══██╗"
echo -e "    ${GREEN}██║  ███╗${GREEN}███████╗${BLUE}██║  ██║"
echo -e "    ${BLUE}██║   ██║${BLUE}╚════██║${BLUE}██║  ██║"
echo -e "    ${BLUE}╚██████╔╝${CYAN}███████║${CYAN}██████╔╝"
echo -e "    ${CYAN} ╚═════╝ ${CYAN}╚══════╝${CYAN}╚═════╝ ${NC}"
echo ""
echo -e "    ${BOLD}GSD for Antigravity${NC}"
echo -e "    ${GREEN}A spec-driven development workflow system for Antigravity — featuring a fully${NC}"
echo -e "    ${GREEN}autonomous ⚡ Super Mode, 🛡️ Anti-Hallucination Q&A, and model resilience protocols.${NC}"
echo -e "    ${DIM}Built by Arshad Khan${NC}"
echo ""

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(dirname "$SCRIPT_DIR")"
WORKFLOWS_SRC="$REPO_DIR/workflows"
AGENTS_SRC="$REPO_DIR/agents"
TEMPLATES_SRC="$REPO_DIR/templates"
REFERENCES_SRC="$REPO_DIR/references"

# Default target
TARGET_DIR="$HOME/.gemini/antigravity/.agent"

# Parse arguments
LOCAL=false
while [[ "$#" -gt 0 ]]; do
    case $1 in
        --local|-l) LOCAL=true ;;
        --global|-g) LOCAL=false ;;
        --help|-h)
            echo "Usage: install.sh [--global|-g] [--local|-l]"
            echo ""
            echo "  --global, -g    Install to ~/.gemini/antigravity/.agent/ (default)"
            echo "  --local, -l     Install to ./.agent/ in current directory"
            exit 0
            ;;
    esac
    shift
done

if [ "$LOCAL" = true ]; then
    TARGET_DIR="./.agent"
    echo -e "  ${YELLOW}Installing locally${NC} to ${CYAN}$TARGET_DIR${NC}"
else
    echo -e "  ${YELLOW}Installing globally${NC} to ${CYAN}$TARGET_DIR${NC}"
fi

echo ""

# Create target directories
mkdir -p "$TARGET_DIR/workflows"

# Copy workflows
echo -n "  Installing workflows..."
cp "$WORKFLOWS_SRC"/*.md "$TARGET_DIR/workflows/" 2>/dev/null || true
echo -e " ${GREEN}✓${NC}"

# Copy agents (if they exist and target supports them)
if [ -d "$AGENTS_SRC" ] && [ "$(ls -A "$AGENTS_SRC")" ]; then
    mkdir -p "$TARGET_DIR/agents"
    echo -n "  Installing agents..."
    cp "$AGENTS_SRC"/*.md "$TARGET_DIR/agents/" 2>/dev/null || true
    echo -e " ${GREEN}✓${NC}"
fi

# Copy templates
if [ -d "$TEMPLATES_SRC" ] && [ "$(ls -A "$TEMPLATES_SRC")" ]; then
    mkdir -p "$TARGET_DIR/templates"
    echo -n "  Installing templates..."
    cp "$TEMPLATES_SRC"/*.md "$TARGET_DIR/templates/" 2>/dev/null || true
    cp "$TEMPLATES_SRC"/*.json "$TARGET_DIR/templates/" 2>/dev/null || true
    echo -e " ${GREEN}✓${NC}"
fi

# Copy references
if [ -d "$REFERENCES_SRC" ] && [ "$(ls -A "$REFERENCES_SRC")" ]; then
    mkdir -p "$TARGET_DIR/references"
    echo -n "  Installing references..."
    cp "$REFERENCES_SRC"/*.md "$TARGET_DIR/references/" 2>/dev/null || true
    echo -e " ${GREEN}✓${NC}"
fi

echo ""
echo -e "  ${GREEN}Done!${NC} Run ${CYAN}/gsd-help${NC} to get started."
echo ""
