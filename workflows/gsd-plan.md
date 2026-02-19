---
description: Research and create executable task plans for a phase
---

# GSD Plan — Research + Plan + Verify

Create executable task plans for a roadmap phase. Default flow: Research (if enabled) → Plan → Verify → Done.

> **🛡️ ANTI-HALLUCINATION PROTOCOL — ACTIVE IN THIS WORKFLOW**
> Plans drive ALL downstream execution. Hallucinated APIs, wrong library names, or fabricated patterns here will compound into broken code. VERIFY every technical claim before writing it into a plan.

## Arguments

The user should provide a phase number, e.g., `/gsd-plan 1`

If no phase number provided, read ROADMAP.md and detect the next unplanned phase.

## Multi-Model Safeguard: Source Verification

**MANDATORY for ALL research and planning — regardless of which AI model is running:**

```
VERIFICATION HIERARCHY:
1. read_url_content → Official documentation (highest trust)
2. search_web       → Current information (verify with #1)
3. Existing codebase → What's actually in the project
4. Training data    → LOWEST trust — NEVER use alone for API details

CONFIDENCE LEVELS (assign to every technical claim):
- HIGH:   Verified via official docs or read_url_content
- MEDIUM: Found via search_web + cross-referenced
- LOW:    From training data only — FLAG THIS to user

⚠️ NEVER write API syntax, library versions, or config patterns
   into a PLAN.md from training data alone.
⚠️ If you cannot verify a library exists → tell the user.
⚠️ If unsure about an approach → present options, don't guess.
```

## Steps

### 1. Validate

**Actually read** (not recall) `.planning/ROADMAP.md` and `.planning/STATE.md`.

**If no `.planning/` directory:** "No GSD project found. Run /gsd-new-project first."
**If phase not found:** "Phase [N] not found. Available phases: [list]"

Check for existing artifacts:
- Is there a CONTEXT.md for this phase? (from /gsd-discuss)
- Is there existing RESEARCH.md?
- Are there existing PLAN.md files?

If CONTEXT.md doesn't exist, ask:
"No context captured for Phase [N]. Plans will use research and requirements only. Continue, or run /gsd-discuss [N] first to capture your preferences?"

### 2. Load Context

**Read each file individually** — do NOT work from memory of previous reads:
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

> **🛡️ RESEARCH VERIFICATION — For each library/tool/API mentioned:**
> 1. Use `search_web` to confirm it exists and is actively maintained
> 2. Use `read_url_content` on its official docs/npm page/GitHub
> 3. Verify the API syntax matches current version (NOT training data)
> 4. If you cannot verify → mark as "UNVERIFIED" and flag to user

Write research findings to `.planning/phases/[NN]-[slug]/[NN]-RESEARCH.md`:

```markdown
# Phase [N]: [Name] — Research

## Implementation Approach
[Recommended approach based on context]

## Libraries & Tools
| Library | Purpose | Why | Confidence | Source |
|---------|---------|-----|-----------|--------|
| [lib] | [purpose] | [rationale] | HIGH/MED/LOW | [URL or "verified via search"] |

## Patterns to Follow
- [Pattern 1 and when to use it]
- [Pattern 2 and when to use it]

## Pitfalls to Avoid
- [Pitfall 1] — [prevention strategy]
- [Pitfall 2] — [prevention strategy]

## Key References
- [Reference 1 — actual URLs where possible]
- [Reference 2 — actual URLs where possible]

## Unverified Claims
[Any claims that could NOT be verified — user should review these]

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

Each plan should be small enough to execute independently.

> **🔄 MODEL RESILIENCE — Plans must be model-proof:**
> Antigravity may switch from Claude to Gemini mid-project when quota exceeds.
> Plans must be **detailed enough that ANY model produces correct code:**
> 1. **Spell out logic step-by-step** — don't write "implement login" → write exact steps
> 2. **Include code patterns references** — specify existing files to match style from
> 3. **Name explicit error handling** — don't leave it to model judgment
> 4. **Spell out types/interfaces** — don't let models infer them
> 5. **Keep tasks atomic** — one function/component per task reduces quality risk
> See `references/model-resilience.md` for full strategies.

Create files at `.planning/phases/[NN]-[slug]/[NN]-[PP]-PLAN.md`:

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

## Code Patterns (Model Resilience)
Reference these existing files for code style:
- [existing file 1] — [what pattern to match]
- [existing file 2] — [what pattern to match]

Conventions:
- File naming: [kebab-case / camelCase / etc.]
- Error handling: [pattern — e.g., use AppError class]
- Types: [where to define, how to export]

## Tasks

<task type="auto">
  <name>[Task Name]</name>
  <files>[files to create/modify]</files>
  <action>
    [DETAILED step-by-step instructions — specific enough for any model:]
    1. [Import X from Y]
    2. [Create function Z with parameters (a: string, b: number)]
    3. [Validate inputs: check for null/empty, return 400 if invalid]
    4. [Core logic: step by step]
    5. [Error handling: wrap in try/catch, use specific error types]
    6. [Return type: { field: type }]
    
    Match style from: [reference file path]
  </action>
  <verify>[How to verify — MUST be a runnable command: e.g., npm test, tsc --noEmit, curl endpoint]</verify>
  <done>[Definition of done — what's true when this task is complete]</done>
</task>

## Must-Haves
[What MUST be true when this plan is complete — used by verification]
- [Condition 1]
- [Condition 2]

---
*Created: [date]*
```

> **🛡️ PLAN QUALITY GATE — Before writing each plan, verify:**
> - File paths reference files that exist (or will be created by earlier tasks)
> - Library imports use VERIFIED API syntax (not training data guesses)
> - Verify steps are EXECUTABLE commands (not "check it works")
> - Each task is independent enough to commit atomically

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
- **Context compliance** — do plans honor user decisions from CONTEXT.md? **Re-read CONTEXT.md to check** — don't recall from memory.
- **Dependency logic** — are depends_on fields correct?
- **Scope** — are plans appropriately sized?
- **Verification specificity** — are verify steps actual commands, not vague descriptions?
- **Source confidence** — are any plans built on UNVERIFIED technical claims?

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

| Plan | Name | Tasks | Files | Confidence |
|------|------|-------|-------|------------|
| [N]-01 | [Name] | [count] | [count] | HIGH/MED |
| [N]-02 | [Name] | [count] | [count] | HIGH/MED |

Research: [Completed | Skipped]
Verification: [Passed | Skipped]
Unverified claims: [count or "None"]

## ▶ Next Up

Recommended: Start a NEW CONVERSATION for execution.
This prevents research context from contaminating execution.

/gsd-execute [N]    → Execute all plans
```
