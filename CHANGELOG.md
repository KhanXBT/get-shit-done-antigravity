# Changelog

All notable changes to GSD for Antigravity.

## [1.0.0] - 2025-02-19

### Added
- **⚡ Super Mode (`/gsd-super`)** — Fully autonomous execution mode from prompt to production with zero human input (1,300+ line workflow).
- **🛡️ Anti-Hallucination Engine** — Structural safeguards embedded in all workflows to prevent context rot and model errors.
- **🔄 Model Resilience Protocol** — Specialized patterns to maintain quality when switching models mid-project (Claude ↔ Gemini ↔ GPT).
- **Loop Detection Algorithm** — Detects and breaks out of circular fix patterns and hallucination loops.
- **5-Tier Verification Suite** — syntax, types, lint, tests, and build checks after every task.
- **Visual Browser Testing** — Autonomous UI verification using screenshots and responsive design checks.
- 8 core workflow files: new-project, discuss, plan, execute, verify, quick, progress, help.
- 11 agent prompts and 22 file templates for planning.
- Installation script (`scripts/install.sh`) and PowerShell installer.
- Comprehensive documentation and reference guides.

### Adapted from Original GSD
- Replaced Claude Code subagent spawning with Antigravity sequential task execution
- Replaced `gsd-tools.cjs` CLI with direct file management
- Replaced `AskUserQuestion` API with Antigravity's `notify_user` tool
- Changed command syntax from `/gsd:command` to `/gsd-command` for Antigravity compatibility
