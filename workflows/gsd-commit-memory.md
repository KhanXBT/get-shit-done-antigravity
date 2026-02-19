---
description: Distill current project state into long-term memory
---

# GSD Commit Memory — Context Preservation 🧠

This workflow extracts architectural decisions, pivots, and "lessons learned" from the current project state and saves them to the permanent memory log.

## 🛡️ Anti-Hallucination Protocol
1. **Re-read State**: AI MUST read `.planning/STATE.md` and `.planning/ROADMAP.md` before summarizing.
2. **User Validation**: AI MUST ask the user for "Recent architectural shifts or lessons learned" that aren't yet in the docs.
3. **Distillation**: AI MUST avoid copying verbatim. Distill into "Principles" and "Decisions."

## 1. Initial Research
- [ ] Read `.planning/STATE.md`
- [ ] Read `.planning/ROADMAP.md`
- [ ] List all `.planning/phases/*/SUMMARY.md` files (if any)

## 2. Decision Capture
- [ ] Ask the user: "What are the most important architectural decisions or lessons learned in this phase?"
- [ ] Ask the user: "Are there any 'Hidden Gotchas' we should remember for the future?"

## 3. Distillation & Commit
- [ ] Synthesize the gathered info with the current project status.
- [ ] Use `gsd-tools.js commit-memory` to save the distillation.
- [ ] **Command**: `node bin/gsd-tools.js commit-memory "[Summary of decisions and architectural principles]"`

## 4. Verification
- [ ] Read `.planning/memory/PROJECT-MEMORY.md` to ensure the entry was appended correctly.
- [ ] Confirm with the user that the memory is preserved.
