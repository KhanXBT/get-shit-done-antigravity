# Project: Project Memory for Antigravity 🧠

## Vision
To provide GSD for Antigravity with a permanent "Long-Term Memory" that preserves architectural decisions, pivots, and learned context across conversation resets and model switches.

## Success Criteria
- [ ] Users can run `/gsd-commit-memory` (or `gsd memo`) at any time.
- [ ] Logic is distilled from current `.planning` state into `PROJECT-MEMORY.md`.
- [ ] Memory is preserved in the repository for future AI reference.
- [ ] CLI help and workflows are fully updated and synchronized.

## Technical Constraints
- No external databases; must be local filesystem-based.
- Must remain model-agnostic (work with Claude, Gemini, GPT).
- Must follow the existing "Antigravity Premium" CLI aesthetic.
