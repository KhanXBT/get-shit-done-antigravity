# Changelog

All notable changes to GSD for Antigravity.

## [1.0.0] - 2025-02-19

### Added
- Initial release — ported GSD v1.20.4 methodology to Antigravity
- 8 workflow files: new-project, discuss, plan, execute, verify, quick, progress, help
- 11 agent prompts from original GSD (planner, executor, verifier, debugger, researchers, etc.)
- 22 file templates for planning documents
- 13 reference docs for patterns and conventions
- Installation script (`scripts/install.sh`) with global and local modes
- User guide (`docs/USER-GUIDE.md`)
- MIT License

### Adapted from Original GSD
- Replaced Claude Code subagent spawning with Antigravity sequential task execution
- Replaced `gsd-tools.cjs` CLI with direct file management
- Replaced `AskUserQuestion` API with Antigravity's `notify_user` tool
- Changed command syntax from `/gsd:command` to `/gsd-command` for Antigravity compatibility
