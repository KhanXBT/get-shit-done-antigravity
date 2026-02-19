---
description: Capture implementation decisions before planning a phase
---

# GSD Discuss — Capture Implementation Preferences

Extract implementation decisions that inform planning. You are a thinking partner — the user is the visionary, you are the builder. Capture decisions that will guide research and planning.

> **🛡️ ANTI-HALLUCINATION PROTOCOL — ACTIVE IN THIS WORKFLOW**
> This workflow captures the user's ACTUAL decisions and preferences. Record what they SAY — do not inject your own assumptions, infer unspoken preferences, or "improve" their choices. The user's words are the source of truth.

## Arguments

The user should provide a phase number, e.g., `/gsd-discuss 1`

If no phase number provided, ask: "Which phase do you want to discuss? Run /gsd-progress to see available phases."

## Multi-Model Safeguard: Decision Capture Integrity

**MANDATORY — regardless of which AI model is running:**

```
DECISION CAPTURE RULES:
1. Record the user's ACTUAL words and choices — do not paraphrase
2. Do NOT suggest preferred options — present choices neutrally
3. Do NOT agree with user assumptions without checking them
4. If user states a technical fact, verify it before recording as decided
5. "You decide" = record as discretionary — do NOT silently lock a decision

⚠️ GPT tendency: agreeing with everything the user says
⚠️ Claude tendency: being so polite it doesn't push back on bad ideas
⚠️ Gemini tendency: synthesizing user preferences into something different
⚠️ ALL models: protect against these by recording VERBATIM decisions
```

## Steps

### 1. Validate

**Actually read** (not recall) `.planning/ROADMAP.md` to find the specified phase.

**If no `.planning/` directory:** "No GSD project found. Run /gsd-new-project first."

**If phase not found in roadmap:** "Phase [N] not found in roadmap. Available phases: [list]"

**If a CONTEXT.md already exists** for this phase, **read it first**, then ask:
"Phase [N] already has context captured. Do you want to update it, view it, or skip?"

### 2. Analyze Phase

**Read** the phase goal and description from ROADMAP.md. Determine:

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

> **🛡️ DECISION RECORDING — For each answer:**
> - Record the user's choice IN THEIR WORDS
> - If they mention a specific library/tool, verify it exists before recording
> - If they reference an approach, note it verbatim — don't convert to your preferred phrasing
> - Distinguish between: DECIDED (user chose explicitly) vs SUGGESTED (you proposed, user agreed)

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
- **DECIDED:** [User's explicit choice — their words]
- **DECIDED:** [Another explicit choice]

### [Category 2]
- **DECIDED:** [User's explicit choice]
- **SUGGESTED:** [Your suggestion that user agreed to — note this distinction]

### AI Discretion
[Areas where user said "you decide" — flexibility exists here]

## Specific Ideas
[References, examples, "I want it like X" moments — quote the user]

## Deferred Ideas
[Ideas that came up but belong in other phases]

---
*Phase: [NN]-[name]*
*Context gathered: [date]*
```

### 6. Update STATE.md

**Read and then update** `.planning/STATE.md` with:
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

Recommended: Start a NEW CONVERSATION for planning.
This gives the planner a fresh context to work from your captured decisions.

/gsd-plan [N]    → Research and create task plans
```
