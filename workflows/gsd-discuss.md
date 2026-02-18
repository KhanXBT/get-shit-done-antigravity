---
description: Capture implementation decisions before planning a phase
---

# GSD Discuss — Capture Implementation Preferences

Extract implementation decisions that inform planning. You are a thinking partner — the user is the visionary, you are the builder. Capture decisions that will guide research and planning.

## Arguments

The user should provide a phase number, e.g., `/gsd-discuss 1`

If no phase number provided, ask: "Which phase do you want to discuss? Run /gsd-progress to see available phases."

## Steps

### 1. Validate

Read `.planning/ROADMAP.md` to find the specified phase.

**If no `.planning/` directory:** "No GSD project found. Run /gsd-new-project first."

**If phase not found in roadmap:** "Phase [N] not found in roadmap. Available phases: [list]"

**If a CONTEXT.md already exists** for this phase, ask:
"Phase [N] already has context captured. Do you want to update it, view it, or skip?"

### 2. Analyze Phase

Read the phase goal and description from ROADMAP.md. Determine:

1. **Domain boundary** — What capability is this phase delivering?
2. **Gray areas** — What implementation decisions could go multiple ways?

Gray areas depend on what's being built:
- **Visual features** → Layout, density, interactions, empty states
- **APIs/CLIs** → Response format, flags, error handling
- **Content systems** → Structure, tone, depth, flow
- **Organization tasks** → Grouping criteria, naming, exceptions

### 3. Present Gray Areas

State the phase boundary first, then present areas for discussion:

```
Phase [N]: [Name]
Domain: [What this phase delivers]

We'll clarify HOW to implement this.
(New capabilities belong in other phases.)

Which areas do you want to discuss?
1. [Specific area] — [What decisions this covers]
2. [Specific area] — [What decisions this covers]
3. [Specific area] — [What decisions this covers]
4. [Specific area] — [What decisions this covers]

Pick numbers or say "all":
```

### 4. Deep-Dive Each Area

For each selected area:

1. **Announce:** "Let's talk about [Area]."
2. **Ask 3-4 questions** with concrete choices (not abstract), e.g.:
   - "Cards, list, or timeline layout?"
   - "Infinite scroll or pagination?"
   - Include "You decide" as an option when reasonable
3. **After 4 questions, check:** "More about [area], or move to next?"
4. **Follow threads** — each answer may reveal new questions

**Scope creep handling:** If user mentions features outside this phase:
"That sounds like a new capability — that's its own phase. I'll note it for later. Back to [current area]..."

Track deferred ideas internally.

### 5. Write CONTEXT.md

Create the phase directory if needed:
```bash
mkdir -p .planning/phases/[NN]-[phase-slug]
```

Write `.planning/phases/[NN]-[phase-slug]/[NN]-CONTEXT.md`:

```markdown
# Phase [N]: [Name] - Context

**Gathered:** [date]
**Status:** Ready for planning

## Phase Boundary
[Clear statement of what this phase delivers]

## Implementation Decisions

### [Category 1]
- [Decision or preference]
- [Another decision]

### [Category 2]
- [Decision or preference]

### Claude's Discretion
[Areas where user said "you decide" — I have flexibility here]

## Specific Ideas
[References, examples, "I want it like X" moments]

## Deferred Ideas
[Ideas that came up but belong in other phases]

---
*Phase: [NN]-[name]*
*Context gathered: [date]*
```

### 6. Update STATE.md

Update `.planning/STATE.md` with:
- Last activity: "[date] — Phase [N] context gathered"
- Add any key decisions recorded

### 7. Git Commit

```bash
git add .planning/phases/[NN]-[phase-slug]/[NN]-CONTEXT.md .planning/STATE.md
git commit -m "docs([NN]): capture phase context"
```

### 8. Completion

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 GSD ► CONTEXT CAPTURED ✓
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Phase [N]: [Name] — [Count] decisions captured

## ▶ Next Up

/gsd-plan [N]    → Research and create task plans
```
