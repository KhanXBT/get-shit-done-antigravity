---
description: Research and create executable task plans for a phase
---

# GSD Plan — Research + Plan + Verify

Create executable task plans for a roadmap phase. Default flow: Research (if enabled) → Plan → Verify → Done.

## Arguments

The user should provide a phase number, e.g., `/gsd-plan 1`

If no phase number provided, read ROADMAP.md and detect the next unplanned phase.

## Steps

### 1. Validate

Read `.planning/ROADMAP.md` and `.planning/STATE.md`.

**If no `.planning/` directory:** "No GSD project found. Run /gsd-new-project first."
**If phase not found:** "Phase [N] not found. Available phases: [list]"

Check for existing artifacts:
- Is there a CONTEXT.md for this phase? (from /gsd-discuss)
- Is there existing RESEARCH.md?
- Are there existing PLAN.md files?

If CONTEXT.md doesn't exist, ask:
"No context captured for Phase [N]. Plans will use research and requirements only. Continue, or run /gsd-discuss [N] first to capture your preferences?"

### 2. Load Context

Read these files to build full context:
- `.planning/STATE.md` — current project state
- `.planning/ROADMAP.md` — roadmap and phase details
- `.planning/REQUIREMENTS.md` — full requirements
- Phase CONTEXT.md (if exists) — user's implementation decisions
- Phase RESEARCH.md (if exists from previous run)

### 3. Research Phase (if enabled)

Check `.planning/config.json` for `workflow.research` setting. If research is enabled and no RESEARCH.md exists for this phase:

Display:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 GSD ► RESEARCHING PHASE [N]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Research how to implement this phase. Consider:
- **Phase goal** from ROADMAP.md
- **User preferences** from CONTEXT.md (locked decisions → research these deeply)
- **Requirements** that map to this phase
- Best practices and common patterns for this type of implementation
- Libraries, tools, or approaches that would work well
- Potential pitfalls specific to this phase

Write research findings to `.planning/phases/[NN]-[slug]/[NN]-RESEARCH.md`:

```markdown
# Phase [N]: [Name] — Research

## Implementation Approach
[Recommended approach based on context]

## Libraries & Tools
| Library | Purpose | Why |
|---------|---------|-----|
| [lib] | [purpose] | [rationale] |

## Patterns to Follow
- [Pattern 1 and when to use it]
- [Pattern 2 and when to use it]

## Pitfalls to Avoid
- [Pitfall 1] — [prevention strategy]
- [Pitfall 2] — [prevention strategy]

## Key References
- [Reference 1]
- [Reference 2]

---
*Researched: [date]*
```

### 4. Create Plans

Display:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 GSD ► PLANNING PHASE [N]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Using all gathered context (STATE, ROADMAP, REQUIREMENTS, CONTEXT, RESEARCH), create task plans.

**How many plans to create:**
- Quick depth: 1-3 plans per phase
- Standard depth: 3-5 plans per phase
- Comprehensive depth: 5-10 plans per phase

Each plan should be small enough to execute independently. Create files at `.planning/phases/[NN]-[slug]/[NN]-[PP]-PLAN.md`:

```markdown
---
phase: [N]
plan: [P]
name: [Plan Name]
wave: [1-N] (which wave this belongs to — for ordering)
depends_on: [] (other plan numbers that must complete first)
files_modified: [list of files this plan creates/modifies]
requirements: [R1, R2] (which requirement IDs this addresses)
---

# Plan [N]-[P]: [Plan Name]

## Objective
[What this plan achieves and why — 2-3 sentences]

## Tasks

<task type="auto">
  <name>[Task Name]</name>
  <files>[files to create/modify]</files>
  <action>
    [Specific implementation instructions]
    [Include technical details, library usage, patterns to follow]
  </action>
  <verify>[How to verify this task works]</verify>
  <done>[Definition of done — what's true when this task is complete]</done>
</task>

<task type="auto">
  <name>[Task Name]</name>
  <files>[files to create/modify]</files>
  <action>
    [Specific implementation instructions]
  </action>
  <verify>[How to verify]</verify>
  <done>[Definition of done]</done>
</task>

## Must-Haves
[What MUST be true when this plan is complete — used by verification]
- [Condition 1]
- [Condition 2]

---
*Created: [date]*
```

### 5. Verify Plans

Check `.planning/config.json` for `workflow.verification` setting. If verification is enabled:

Display:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 GSD ► VERIFYING PLANS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Review all created plans against:
- **Requirements coverage** — do all phase requirements appear in at least one plan?
- **Task completeness** — does each task have files, action, verify, done?
- **Context compliance** — do plans honor user decisions from CONTEXT.md?
- **Dependency logic** — are depends_on fields correct?
- **Scope** — are plans appropriately sized?

If issues found, revise the plans (up to 3 iterations). Report any changes made.

### 6. Git Commit

```bash
git add .planning/phases/[NN]-[slug]/
git commit -m "docs([NN]): create phase plans"
```

### 7. Update STATE.md

Update `.planning/STATE.md`:
- Last activity: "[date] — Phase [N] planned"
- Current status: "Ready to execute"

### 8. Completion

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 GSD ► PHASE [N] PLANNED ✓
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Phase [N]: [Name] — [P] plan(s)

| Plan | Name | Tasks | Files |
|------|------|-------|-------|
| [N]-01 | [Name] | [count] | [count] |
| [N]-02 | [Name] | [count] | [count] |

Research: [Completed | Skipped]
Verification: [Passed | Skipped]

## ▶ Next Up

/gsd-execute [N]    → Execute all plans
```
