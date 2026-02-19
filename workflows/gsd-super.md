---
description: Fully autonomous AI execution — from prompt to production with zero human input
---

# GSD Super — Full Autonomous Execution Mode

The AI takes over. Give it a prompt or PRD, answer a few setup questions, then walk away. It builds from MVP to production-ready by running all GSD phases autonomously — planning, executing, testing, debugging, and deploying.

> **⚡ THIS IS FULL AUTONOMY MODE**
> After the initial interview, the AI runs ALL phases on its own:
> discuss → plan → execute → verify → ship
> With built-in hallucination loop detection and browser testing.

## Arguments

The user provides a prompt, description, or PRD:
```
/gsd-super Build a task management app with Next.js and Prisma
/gsd-super [paste detailed PRD here]
```

If no description provided, ask: "What do you want me to build? Give me a one-liner or paste a detailed PRD."

---

## Stage 1 — Context Detection (Automatic)

Detect the project state BEFORE doing anything else:

```
DETECT PROJECT STATE:

IF directory contains existing source files (not just .git or config):
  ┌─────────────────────────────────────────────────────┐
  │  EXISTING PROJECT DETECTED                          │
  │                                                     │
  │  1. git checkout -b gsd-super/[feature-name]        │
  │  2. NEVER delete existing files                     │
  │  3. NEVER modify existing files without explicit    │
  │     instruction in the PRD                          │
  │  4. Treat as enhancement/addition                   │
  │                                                     │
  │  Tell user: "Existing project detected. Working on  │
  │  branch gsd-super/[name]. Your main branch is safe."│
  └─────────────────────────────────────────────────────┘

IF directory is empty or new:
  ┌─────────────────────────────────────────────────────┐
  │  NEW PROJECT DETECTED                               │
  │                                                     │
  │  1. Work on main branch                             │
  │  2. Initialize git if not already                   │
  │  3. Full new project creation                       │
  │                                                     │
  │  Tell user: "New project. Building from scratch     │
  │  on main branch."                                   │
  └─────────────────────────────────────────────────────┘
```

---

## Stage 2 — The Interview (Before ANY autonomous work)

> **🛡️ ANTI-HALLUCINATION: The Interview is the quality guarantee.**
> All user input is captured HERE. Everything after this is autonomous.
> Record answers VERBATIM. Do NOT paraphrase or "improve" user responses.

Ask these questions in a natural conversation (not a form). Adapt based on answers:

### Required Questions

**Q1: Understanding the Build**
```
"I've read your [prompt/PRD]. Here's what I understand you want:
[Summarize in 3-5 bullet points]

Is this accurate? Anything to add or correct?"
```

**Q2: Autonomy Mode**
```
"How much control do you want during the build?

  A) FULL AUTONOMY — I run until it's done. You check the final result.
  B) MILESTONE PAUSES — I complete each phase, show you results, 
     then continue unless you intervene.
  C) CUSTOM — Tell me exactly where you want me to pause.
     Example: 'Pause after the database schema' or 
     'Ask me before building the payment flow'

Which mode?"
```

**Q3: Approval Gates**
```
"For the project roadmap and requirements:

  1) I decide everything — you trust my judgment
  2) Show me the roadmap first — you approve before I start building

Which approach?"
```

**Q4: Testing Mode**
```
"How should I verify my work as I build?

  A) VISUAL — I open the app in the browser, click through,
     take screenshots, verify it looks right
  B) AUTOMATED — I write and run test suites 
     (unit, integration, e2e)
  C) BOTH — Visual browser testing + automated test suites

Which mode?"
```

**Q5: Tech Stack** (if not specified in PRD)
```
"Any tech stack preferences? Or should I choose what's best for this project?

Examples: 'Next.js + Tailwind + Prisma + PostgreSQL'
          'You decide'
          'React frontend, whatever backend you think works'"
```

**Q6: Deployment Target**
```
"Where should I deploy the finished product?

  - Vercel
  - Netlify  
  - Railway
  - Other: [specify]
  - Don't deploy — just build it locally

Where?"
```

**Q7: Quality Bar**
```
"What quality level are you expecting?

  1) MVP — Functional, works, but minimal polish
  2) PRODUCTION — Polished UI, error handling, documentation, 
     tests, CI/CD, ready to show users

Which level?"
```

### After Interview: Confirm and Lock

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 GSD SUPER ► CONFIGURATION LOCKED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Project:     [name from PRD/prompt]
Mode:        [A/B/C] — [full/milestone/custom]
Approval:    [AI decides / Human approves roadmap]
Testing:     [Visual / Automated / Both]
Stack:       [chosen stack]
Deploy to:   [target]
Quality:     [MVP / Production]
Custom stops: [if mode C, list pause points]

Starting autonomous execution. I'll notify you when done.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Save this configuration to `.planning/SUPER-CONFIG.md` for reference during execution.

---

## Stage 3 — Plan Generation (Autonomous)

> **🛡️ ANTI-HALLUCINATION: Research before planning.**
> Do NOT generate plans from training data alone.
> Use read_url_content and search_web to verify all technical decisions.

### 3.1 Auto-Generate Project Files

Run the equivalent of `/gsd-new-project` autonomously:
1. Create `.planning/PROJECT.md` from the PRD/prompt + interview answers
2. Research the domain using `search_web` and `read_url_content`
3. Create `.planning/REQUIREMENTS.md` — split into phases
4. Create `.planning/ROADMAP.md` — ordered phases with dependencies
5. Create `.planning/STATE.md` — initialized to Phase 1

**If approval mode = "Human approves roadmap":**
- Pause here and show the roadmap to user
- Wait for approval before continuing
- If user requests changes, update and re-present

**If approval mode = "AI decides":**
- Continue immediately

### 3.2 Auto-Plan All Phases

For each phase in the roadmap:
1. Auto-generate `CONTEXT.md` — make reasonable decisions, document them
2. Run research for the phase — verify libraries, APIs, patterns
3. Create task plans with FULL detail (model-resilience level):
   - Step-by-step action instructions
   - Code pattern references from existing files
   - Explicit error handling instructions
   - Verification commands that can be run automatically

---

## Stage 4 — Execution Loop (Autonomous)

> **⚡ THIS IS WHERE THE AI TAKES FULL CONTROL**
> The loop runs until all phases are complete or it gets stuck.

```
FOR each phase in ROADMAP:

  ┌─────────────────────────────────────────────────────┐
  │  PHASE [N]: [Phase Name]                            │
  ├─────────────────────────────────────────────────────┤
  │                                                     │
  │  1. Re-read ALL planning files (anti-hallucination) │
  │  2. Style anchor from existing code                 │
  │  3. Execute each task:                              │
  │     a. Write code following plan instructions       │
  │     b. Run verification suite:                      │
  │        ✓ tsc --noEmit (if TypeScript)               │
  │        ✓ eslint/biome (if configured)               │
  │        ✓ test runner (affected tests)               │
  │        ✓ build command                              │
  │     c. If fails → AUTO-DEBUG (see below)            │
  │     d. If passes → atomic git commit                │
  │  4. Run browser testing (per user's choice)         │
  │  5. Self-verify against phase requirements          │
  │  6. Update STATE.md                                 │
  │                                                     │
  │  CHECKPOINT (based on autonomy mode):               │
  │  Mode A: Continue to next phase                     │
  │  Mode B: Pause, show results, wait for user         │
  │  Mode C: Pause if at user-defined stop point        │
  │                                                     │
  └─────────────────────────────────────────────────────┘
```

### Browser Testing Protocol

**If Visual Testing mode:**
```
VISUAL TESTING:
1. Start dev server (npm run dev / equivalent)
2. Open browser to localhost
3. Navigate through each feature built in this phase
4. Take screenshots of key states
5. Verify: Does the UI match requirements?
6. Check: responsive layout, loading states, error states
7. If something looks wrong → auto-fix → re-test
```

**If Automated Testing mode:**
```
AUTOMATED TESTING:
1. Write unit tests for new functions/components
2. Write integration tests for API endpoints
3. Run full test suite
4. If tests fail → auto-debug → re-run
5. Aim for reasonable coverage on new code
```

**If Both:**
Run automated first, then visual. Both must pass.

### Auto-Debug Protocol

When a task fails (build error, test failure, visual issue):

```
AUTO-DEBUG FLOW:
1. Read the ACTUAL error message (not from memory)
2. Identify root cause
3. Apply fix
4. Re-run verification suite
5. If passes → commit
6. If fails → track this attempt

ATTEMPT TRACKING:
┌─────────────────────────────────────────────────────┐
│  attempts = []                                      │
│                                                     │
│  FOR each fix attempt:                              │
│    Record: { error, approach, result }              │
│    Add to attempts[]                                │
│                                                     │
│  LOOP DETECTION:                                    │
│    same_error_count = count of identical errors      │
│                                                     │
│    IF same_error_count >= 3:                        │
│      ⚠️ SAME ERROR 3 TIMES                         │
│      → STOP current approach                        │
│      → Try COMPLETELY different approach:            │
│        - Different library                          │
│        - Different architecture pattern             │
│        - Simpler implementation                     │
│        - Remove problematic feature temporarily     │
│                                                     │
│    IF total approaches tried >= 5 AND all fail:     │
│      🛑 STUCK — NOTIFY USER                        │
│      → Stop autonomous execution                    │
│      → Show user:                                   │
│        "I'm stuck on [specific problem].            │
│         Here's what I tried:                        │
│         1. [approach 1] → [result]                  │
│         2. [approach 2] → [result]                  │
│         3. [approach 3] → [result]                  │
│         4. [approach 4] → [result]                  │
│         5. [approach 5] → [result]                  │
│         I need your input to proceed."              │
│      → Wait for user guidance                       │
│      → Resume autonomous execution after guidance   │
│                                                     │
│  HALLUCINATION LOOP DETECTOR:                       │
│    IF the AI detects it is:                         │
│      - Writing the same code it already wrote       │
│      - Reverting a fix it already applied           │
│      - Going in circles (A→B→A→B)                  │
│    THEN:                                            │
│      → STOP immediately                             │
│      → Re-read ALL relevant files from disk         │
│      → Start the task fresh with clean context      │
│      → If still stuck after fresh start → NOTIFY    │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## Stage 5 — Ship (Autonomous)

After ALL phases complete successfully:

### 5.1 Documentation
```
1. Generate/update README.md:
   - Project description
   - Setup instructions (npm install, env vars, etc.)
   - Usage guide
   - Tech stack
   - Architecture overview (if production quality)
2. Add inline code comments where logic is complex
3. Create .env.example with required environment variables
```

### 5.2 Testing
```
1. Ensure all existing tests pass
2. If production quality:
   - Add missing test coverage for critical paths
   - Run full test suite one final time
3. Report: X tests, Y passing, Z% coverage
```

### 5.3 CI/CD (if production quality)
```
1. Create .github/workflows/ci.yml:
   - Lint
   - Type check
   - Tests
   - Build
2. Verify CI config is valid
```

### 5.4 Deploy
```
IF deployment target specified:
  1. Set up deployment config (vercel.json, netlify.toml, etc.)
  2. Run deployment command
  3. Wait for deployment to complete
  4. Open deployed URL in browser
  5. Run visual verification on deployed site
  6. Report deployed URL to user

IF "Don't deploy":
  Skip deployment, report local setup instructions
```

### 5.5 Final Report

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 GSD SUPER ► COMPLETE ✅
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## What I Built
[Feature summary — 5-10 bullets]

## Stats
- Phases completed: [X/X]
- Total commits: [N]
- Tests: [X passing / Y total]
- Build: ✅ Clean
- Branch: [main or gsd-super/feature-name]

## Deployment
- URL: [deployed URL or "Local only"]
- Status: ✅ Live

## Files Created/Modified
[List of key files with descriptions]

## How to Run Locally
[Setup instructions]

## Known Limitations
[Any features skipped, edge cases not handled]

## If on a branch:
  "To merge into main:"
  git checkout main
  git merge gsd-super/[feature-name]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Safety Guardrails

### Non-Negotiable Rules
```
SUPER MODE SAFETY:
1. NEVER delete existing files on existing projects
2. ALWAYS create a new branch for existing projects
3. NEVER push to main on existing projects without explicit instruction
4. NEVER make external API calls with real credentials unless user confirmed
5. ALWAYS re-read files before modifying (anti-hallucination)
6. ALWAYS run verification suite after every task
7. STOP if stuck — never loop infinitely
8. ALL commits are atomic and reversible
```

### Multi-Model Resilience
```
SUPER MODE runs long — model switches WILL happen.
1. Plans must be model-proof (step-by-step, with code pattern refs)
2. Style anchor before every code task
3. Re-read planning files at the start of every phase
4. Never rely on memory of previous phases
5. Track progress in STATE.md — any model can pick up where another left off
```

### Context Freshness
```
Super mode runs across many phases. Context will get stale.
1. At the start of each phase: re-read STATE.md, ROADMAP.md, phase plans
2. Before each task: re-read the specific PLAN.md
3. Before modifying a file: re-read the file
4. Never assume — always verify
```
