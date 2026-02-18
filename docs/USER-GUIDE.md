# User Guide

Complete guide for using GSD workflows inside Antigravity.

## Quick Start

```
/gsd-new-project
```

This kicks off the full initialization flow: deep questioning → domain research → requirements → roadmap.

---

## Workflow Overview

### Phase 1: Initialize

**Command:** `/gsd-new-project`

The most leveraged moment in any project. GSD asks deep questions to understand what you want to build:

- Core value proposition — the ONE thing that must work
- Target users, technical preferences, constraints
- Scope boundaries — what's explicitly NOT in v1
- Success criteria

**Output:** `.planning/PROJECT.md`, `REQUIREMENTS.md`, `ROADMAP.md`, `STATE.md`

### Phase 2: Discuss

**Command:** `/gsd-discuss [N]`

Before planning, capture HOW you want things built. GSD identifies gray areas (things that could go multiple ways) and asks concrete questions:

- "Cards or list layout?"
- "Infinite scroll or pagination?"
- "Dark mode or light only or both?"

**Output:** `.planning/phases/NN-slug/NN-CONTEXT.md`

### Phase 3: Plan

**Command:** `/gsd-plan [N]`

Research the implementation domain and create atomic, executable task plans:

1. **Research** — best practices, libraries, patterns, pitfalls
2. **Plan** — XML-structured tasks with files, actions, verification, done criteria
3. **Verify** — check plans against requirements and context

**Output:** `NN-RESEARCH.md`, `NN-01-PLAN.md`, `NN-02-PLAN.md`, etc.

### Phase 4: Execute

**Command:** `/gsd-execute [N]`

Execute each plan's tasks with atomic git commits:

- Each task = one commit
- Commit messages = `feat(NN-PP): task name`
- Failed tasks can be retried, skipped, or stopped
- Automatic verification against must-haves at the end

**Output:** `NN-01-SUMMARY.md`, `NN-VERIFICATION.md`

### Phase 5: Verify

**Command:** `/gsd-verify [N]`

User acceptance testing — you confirm each feature works:

```
TEST 1/5: User Registration Form

Expected: Form shows name, email, password fields.
  Submit validates all fields before sending.

→ Type "pass" or describe what's wrong
```

**Output:** `NN-UAT.md`

### Repeat

Continue with the next phase: `/gsd-discuss N+1` → `/gsd-plan N+1` → `/gsd-execute N+1` → `/gsd-verify N+1`

---

## Quick Mode

**Command:** `/gsd-quick [description]`

For small tasks that don't need full ceremony:

```
/gsd-quick Add dark mode toggle
```

- Creates a quick plan (1-3 tasks)
- Executes with atomic commits
- Tracks in `.planning/quick/`

---

## Progress

**Command:** `/gsd-progress`

See where you are: current phase, completed phases, next steps.

---

## File Structure

```
.planning/
├── PROJECT.md            — Vision, users, technical context
├── REQUIREMENTS.md       — V1 must-haves, V2 nice-to-haves, out of scope
├── ROADMAP.md            — Phase overview with progress tracking
├── STATE.md              — Current position, key decisions, blockers
├── config.json           — Depth, git tracking, and workflow settings
├── research/             — Domain research (stack, features, architecture, pitfalls)
│   ├── STACK.md
│   ├── FEATURES.md
│   ├── ARCHITECTURE.md
│   ├── PITFALLS.md
│   └── SUMMARY.md
├── phases/
│   ├── 01-phase-name/
│   │   ├── 01-CONTEXT.md        — Implementation decisions
│   │   ├── 01-RESEARCH.md       — Phase research
│   │   ├── 01-01-PLAN.md        — Task plan 1
│   │   ├── 01-01-SUMMARY.md     — Execution summary
│   │   ├── 01-VERIFICATION.md   — Auto-verification results
│   │   └── 01-UAT.md            — User acceptance test results
│   └── 02-phase-name/
│       └── ...
└── quick/
    ├── 001-task-slug/
    │   ├── 001-PLAN.md
    │   └── 001-SUMMARY.md
    └── ...
```

---

## Tips

1. **Don't skip discuss.** The 5 minutes you spend in `/gsd-discuss` saves hours of wrong implementation.
2. **Be specific.** When GSD asks questions, concrete answers ("cards layout, 3 per row, hover to expand") beat vague ones ("make it look good").
3. **Trust the workflow.** The structured approach prevents context rot and keeps quality high across long sessions.
4. **Use quick mode** for bug fixes, config changes, and small features.
5. **Check progress** with `/gsd-progress` when you lose track of where you are.
