<div align="center">

# GSD for Antigravity 🚀

**A spec-driven development workflow system for [Antigravity](https://deepmind.google/) — built on [Get Shit Done](https://github.com/gsd-build/get-shit-done), with original multi-model anti-hallucination and model resilience features not found in the original.**

**Solves context rot, hallucination, and code quality drops during model switches.**

[![GitHub stars](https://img.shields.io/github/stars/KhanXBT/get-shit-done-antigravity?style=for-the-badge&logo=github&color=181717)](https://github.com/KhanXBT/get-shit-done-antigravity)
[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-green?style=for-the-badge)](CHANGELOG.md)
[![Original GSD](https://img.shields.io/badge/based_on-GSD_v1.20.4-CB3837?style=for-the-badge)](https://github.com/gsd-build/get-shit-done)

<br>

```bash
npx get-shit-done-antigravity
```

**Works on Mac, Windows, and Linux.**

<br>

*The complexity is in the system, not in your workflow.*

*Behind the scenes: context engineering, structured XML plans, state management.*

*What you see: a few commands that just work.*

<br>

*"I stopped losing work to context rot. Every phase picks up exactly where the last one left off."*

*"Claude hit quota, Gemini took over, and the code quality didn't drop. That's when I knew this was different."*

*"It's not just a planning tool — it actually catches when the AI is making stuff up."*

<br>

> 🧪 **I'm actively testing this in production and made it open source so others can test, improve, and contribute.**
> — Built by [@KhanXBT](https://github.com/KhanXBT)

<br>

[How It Works](#how-it-works) · [Commands](#commands) · [Why It Works](#why-it-works) · [What's New](#-whats-new--ported-vs-invented) · [User Guide](docs/USER-GUIDE.md)

</div>

---

## Why This Exists

[GSD](https://github.com/gsd-build/get-shit-done) by TÂCHES is the best spec-driven development system for AI coding — but it only runs on Claude Code, OpenCode, and Gemini CLI.

**GSD for Antigravity** takes the methodology and makes it better. Same structured approach. Same atomic commits. **Plus original features the original GSD doesn't have** — because Antigravity's multi-model architecture creates problems that single-model tools never face.

---

## 🆕 What's New — Ported vs Invented

This isn't just a port. **~40% is adapted from the original GSD, ~60% is our own innovation** built for Antigravity's multi-model reality:

| Feature | Origin | Details |
|---------|--------|---------|
| Spec-driven workflow (plan → execute → verify) | ✅ Ported from GSD | Adapted for Antigravity's tool system |
| Atomic git commits per task | ✅ Ported from GSD | Same approach |
| XML task plans with verify/done criteria | ✅ Ported from GSD | Same structure |
| Context freshness (`/clear` → new conversation) | ⚡ Adapted from GSD | Original uses `/clear`, we recommend new conversations |
| Source verification hierarchy | ⚡ Adapted from GSD | Original uses Context7 MCP, we use `read_url_content` + `search_web` |
| Checkpoints (wait for user) | ⚡ Adapted from GSD | Original uses `AskUserQuestion`, we use `notify_user` |
| **🛡️ Anti-Hallucination Engine** | **🆕 Our Invention** | Structural safeguards in EVERY workflow file, not just agent prompts |
| **🤖 Multi-Model Compatibility** | **🆕 Our Invention** | Per-model hallucination pattern guards (Claude, Gemini, GPT, OSS) |
| **🔄 Model Resilience** | **🆕 Our Invention** | Code quality stays consistent when Claude quota → Gemini switch |
| **📋 Code Patterns in Plans** | **🆕 Our Invention** | Plans reference existing files as style templates for any model |
| **🎯 Style Anchoring Protocol** | **🆕 Our Invention** | Read existing code before writing — match patterns exactly |
| **✅ Full Verification Suite** | **🆕 Our Invention** | Lint + types + tests + build after EVERY task, not just plan verify |
| **📝 Decision Attribution** | **🆕 Our Invention** | Tracks USER-decided vs AI-suggested decisions |
| **🏷️ Confidence Levels** | **🆕 Our Invention** | Research tagged HIGH/MED/LOW by verification source |
| **⚡ Super Mode (`/gsd-super`)** | **🆕 Our Invention** | Full autonomy: prompt → production with zero human input |

> **The original GSD doesn't need these features** because it only runs on Claude.
> Antigravity rotates between models — creating problems that single-model tools never face.
> **We solve them.**

---

## ⚡ Super Mode — Full Autonomy

**The first "walk away" build engine for AI coding agents.** 

Give it a prompt or PRD, answer a few questions, and go grab a coffee. `/gsd-super` runs the entire lifecycle (v1.0.0 is a **1,314-line spec**) autonomously.

### Core Capabilities:
*   **PRD Intelligence**: Auto-expands one-liners into technical specs or parses 10-page PRDs into phased roadmaps.
*   **Context Discovery**: Automatically detects project state. For existing projects, it **auto-branches** (`gsd-super/feature`) to keep your `main` branch 100% safe.
*   **5-Tier Verification**: Every single task runs through a rigorous check: `Syntax → Types → Lint → Tests → Build`.
*   **Visual Autonomous Testing**: The AI opens the app in the browser, clicks through your features, takes screenshots, and verifies the UI matches the spec.
*   **Self-Debugging**: If a build fails, it classifies the error and retries with a new approach.
*   **🔄 Anti-Hallucination & Loop Detection**:
    *   **Same error 3x?** It stops the approach and pivots to a new library or architecture.
    *   **Going in circles (A+B+A+B)?** It detects the loop, re-reads every file from disk, and starts the task fresh with clean context.
    *   **5 approaches fail?** It stops and gives you a full diagnostic report instead of hallucinating a success.

---

## Getting Started

### Installation

**Clone and install:**

**Mac / Linux:**
```bash
git clone https://github.com/KhanXBT/get-shit-done-antigravity.git
cd get-shit-done-antigravity
bash scripts/install.sh           # Global install (all projects)
bash scripts/install.sh --local   # Local install (current project only)
```

**Windows (PowerShell):**
```powershell
git clone https://github.com/KhanXBT/get-shit-done-antigravity.git
cd get-shit-done-antigravity
.\scripts\install.ps1              # Global install (all projects)
.\scripts\install.ps1 -Local       # Local install (current project only)
```

**Or copy manually:**
```bash
cp -r workflows/*.md ~/.gemini/antigravity/.agent/workflows/
```

### Verify

Inside Antigravity, type:
```
/gsd-help
```

---

## How It Works

> **🚀 Want full autonomy?** Use `/gsd-super` to build an entire project from a single prompt. It runs all stages below on its own.
>
> **🛡️ Want verified answers?** Use `/gsd-no-halluc [question]` or `/no-halluc [question]` for general Q&A with strict verification and citations.
>
> **Already have code?** Start with `/gsd-new-project` inside your existing repo. GSD will ask questions about what you're adding, not what already exists.

### 1. Initialize Project
```
/gsd-new-project
```
One command, one flow. The system:

- **Questions** — Asks until it understands your idea completely (goals, constraints, tech preferences, edge cases). Challenges vague terms, surfaces assumptions, finds edge cases.
- **Research** — Investigates the domain ecosystem — standard stacks, expected features, common pitfalls (optional but recommended). Every claim is tagged with confidence levels: **HIGH** (verified via docs), **MEDIUM** (searched), **LOW** (flagged to you).
- **Requirements** — Extracts what's v1, v2, and out of scope. Presented for your approval before continuing.
- **Roadmap** — Creates phases mapped to requirements. Each phase is a self-contained deliverable.

You approve the roadmap. Now you're ready to build.

**Creates:** `PROJECT.md`, `REQUIREMENTS.md`, `ROADMAP.md`, `STATE.md`, `.planning/research/`

### 2. Discuss Phase
```
/gsd-discuss 1
```
This is where you shape the implementation.

Your roadmap has a sentence or two per phase. That's not enough context to build something the way you imagine it. This step captures your preferences before anything gets researched or planned.

The system analyzes the phase and identifies **gray areas** based on what's being built:

- **Visual features** → Layout, density, interactions, empty states
- **APIs/CLIs** → Response format, flags, error handling, verbosity
- **Content systems** → Structure, tone, depth, flow
- **Organization tasks** → Grouping criteria, naming, exceptions

For each area you select, it asks until you're satisfied. The output — `CONTEXT.md` — feeds directly into the next two steps:

- **Researcher reads it** — Knows what patterns to investigate ("user wants card layout" → research card component libraries)
- **Planner reads it** — Knows what decisions are locked ("infinite scroll decided" → plan includes scroll handling)

Every decision is recorded with attribution: **DECIDED** (you chose explicitly) vs **SUGGESTED** (AI proposed, you agreed). This prevents the model from silently overriding your choices.

The deeper you go here, the more the system builds what you actually want. Skip it and you get reasonable defaults. Use it and you get your vision.

**Creates:** `CONTEXT.md` with locked decisions

### 3. Plan Phase
```
/gsd-plan 1
```
The system:

- **Researches** — Investigates how to implement this phase, guided by your `CONTEXT.md` decisions. Uses source verification: official docs first, web search second, training data only as last resort (and flagged).
- **Plans** — Creates 2-5 atomic task plans with XML structure. Each plan includes a **Code Patterns** section referencing existing files as style templates — so any model produces consistent code.
- **Verifies** — Checks plans against requirements and context decisions, loops until they pass.

Each plan is detailed enough that **any AI model can execute it correctly** — step-by-step instructions, not vague descriptions:

```xml
<task type="auto">
  <name>Create login endpoint</name>
  <files>src/api/auth/login.ts</files>
  <action>
    1. Import bcrypt, jwt, prisma client
    2. Validate body: { email: string, password: string } → 400 if missing
    3. prisma.user.findUnique({ where: { email } }) → 401 if not found
    4. bcrypt.compare(password, user.passwordHash) → 401 if mismatch
    5. jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: '7d' })
    6. Set httpOnly cookie, return { user: { id, email, name } }
    Match style from: src/api/users/get-user.ts
  </action>
  <verify>POST /api/auth/login returns 200 + Set-Cookie header</verify>
  <done>Valid credentials return cookie, invalid return 401</done>
</task>
```

Why this level of detail matters: when Antigravity switches from Claude to Gemini mid-project (quota exceeded), the plan itself guarantees quality — not the model.

**Creates:** `RESEARCH.md`, `01-PLAN.md`, `02-PLAN.md`, etc.

### 4. Execute Phase
```
/gsd-execute 1
```
The system:

- **Loads plans** — Re-reads every plan file from disk (never from memory — anti-hallucination safeguard)
- **Style anchors** — Before writing any code, reads existing files in the same area to match their exact patterns
- **Runs tasks in waves** — Wave 1 first, Wave 2 after Wave 1 completes
- **Commits per task** — Every task gets its own atomic git commit
- **Runs full verification suite** — After EVERY task: lint + type-check + tests + build. Not just the plan's verify step.
- **Verifies against goals** — Checks the codebase delivers what the phase promised

```
abc123f feat(01-01): add user registration form
def456g feat(01-02): implement email validation
hij789k feat(01-03): create registration endpoint
```

How wave execution works:

```
┌───────────────────────────────────────────────────────────┐
│  PHASE EXECUTION                                          │
├───────────────────────────────────────────────────────────┤
│                                                           │
│  WAVE 1                    WAVE 2              WAVE 3     │
│  ┌─────────┐ ┌─────────┐  ┌─────────┐ ┌─────────┐  ┌────────┐│
│  │ Plan 01 │ │ Plan 02 │→ │ Plan 03 │ │ Plan 04 │→ │Plan 05 ││
│  │ User    │ │ Product │  │ Orders  │ │ Cart    │  │Checkout││
│  │ Model   │ │ Model   │  │ API     │ │ API     │  │ UI     ││
│  └─────────┘ └─────────┘  └─────────┘ └─────────┘  └────────┘│
│       │           │             ↑           ↑           ↑     │
│       └───────────┴─────────────┴───────────┘           │     │
│              Dependencies: Plan 03 needs Plan 01        │     │
│                          Plan 04 needs Plan 02          │     │
│                          Plan 05 needs Plans 03 + 04    │     │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

**Creates:** `SUMMARY.md`, `VERIFICATION.md`

### 5. Verify Work
```
/gsd-verify 1
```
This is where you confirm it actually works.

The system:

- **Extracts testable deliverables** — What you should be able to do now, based on actual `SUMMARY.md` contents (not hallucinated features)
- **Walks you through one at a time** — Shows expected behavior, waits for your response

```
╔══════════════════════════════════════════════════════════════╗
║  TEST 1/5: User Registration                                ║
╚══════════════════════════════════════════════════════════════╝

Expected: Form shows name, email, password fields.
  Submit validates all fields before sending.

→ Type "pass" if correct, "skip" to skip, or describe what's wrong
```

- **Records your exact words** — If something's wrong, your description is saved verbatim (not paraphrased by the AI)
- **Infers severity** — "crashes" = blocker, "wrong color" = cosmetic. Never asks "how severe?"
- **Creates fix plans** — Issues become ready-to-execute plans for the next cycle

If everything passes, you move on. If something's broken, run `/gsd-plan` again — it creates fix plans from the UAT results.

**Creates:** `UAT.md` with gap analysis

### 6. Repeat → Next Phase

```
/gsd-discuss 2
/gsd-plan 2
/gsd-execute 2
/gsd-verify 2
...
```

Loop **discuss → plan → execute → verify** until all phases complete.

Each phase gets your input (discuss), verified research (plan), quality-checked execution (execute), and human verification (verify). Context stays fresh. Quality stays high. **Even when the model switches mid-project.**

💡 **Tip:** Start a new conversation between each workflow step for optimal context freshness.

### Quick Mode
```
/gsd-quick Add dark mode toggle
```

For ad-hoc tasks that don't need full planning. Same atomic commits, same state tracking, same verification suite — less ceremony.

### ⚡ Super Mode
```
/gsd-super Build a task management app with Next.js and Prisma
```

**Full autonomy.** Give it a prompt or PRD, answer a few setup questions, then walk away. The AI:

1. **Detects context** — Existing project? Creates a new branch (never touches main). New project? Starts fresh.
2. **Interviews you once** — Autonomy level (full/milestone pauses/custom), testing mode (visual/automated/both), tech stack, deployment target, quality bar.
3. **Builds everything** — Auto-runs discuss → plan → execute → verify for every phase.
4. **Tests continuously** — Opens the browser, clicks through UI, takes screenshots. Runs test suites. Both if you want.
5. **Self-debugs** — When something breaks, auto-debugs and retries. With **hallucination loop detection**:

```
HALLUCINATION LOOP DETECTION:
│  Same error 3 times → switch to completely different approach
│  5 approaches all fail → STOP and notify user:
│  "I'm stuck on [X]. Here's what I tried. Need your input."
│  Circular fix detected (A→B→A→B) → re-read files, start fresh
```

6. **Ships** — Documentation, tests, CI/CD, deploys to Vercel/Netlify/Railway.
7. **Reports** — "Done. Here's what I built, here's the deployed URL, here's how to run it."

> **This feature is a 🆕 GSD Antigravity invention.** Not found in the original GSD or any other AI coding tool.

---

## Commands

### Core Workflow

| Command | What it does |
|---------|-------------|
| `/gsd-new-project` | Full initialization: questions → research → requirements → roadmap |
| `/gsd-discuss [N]` | Capture implementation decisions before planning |
| `/gsd-plan [N]` | Research + plan + verify for a phase |
| `/gsd-execute [N]` | Execute all plans with atomic git commits |
| `/gsd-verify [N]` | User acceptance testing |

### ⚡ Autonomous

| Command | What it does |
|---------|-------------|
| `/gsd-super [prompt]` | **FULL AUTONOMY**: AI builds from prompt to production on its own |

### Utilities

| Command | What it does |
|---------|-------------|
| `/gsd-quick [desc]` | Ad-hoc task with GSD guarantees |
| `/gsd-progress` | Where am I? What's next? |
| `/gsd-help` | Show all commands |

---

## Why It Works

### Context Engineering
Instead of dumping everything into one long conversation where quality degrades, GSD structures project knowledge across purpose-built files. Each workflow loads only what's needed — keeping context focused and AI output quality high.

### XML Prompt Formatting
Plans are structured XML that gives the AI precise, unambiguous instructions. Each task specifies exact files, actions, verification criteria, and done conditions.

### Atomic Git Commits
Every task gets its own commit — traceable, revertable, meaningful. No more "WIP" or "fix stuff" commits.

### State Management
`STATE.md` tracks current position, key decisions, blockers, and quick tasks. The AI always knows where you are, what's been decided, and what's next.

### Modular Phases
Add, insert, or remove phases without rebuilding everything. Each phase is self-contained with its own context, research, plans, and verification.

---

## Project Structure

```
GSD-Antigravity/
├── workflows/          — 8 Antigravity workflow definitions
│   ├── gsd-new-project.md
│   ├── gsd-discuss.md
│   ├── gsd-plan.md
│   ├── gsd-execute.md
│   ├── gsd-verify.md
│   ├── gsd-quick.md
│   ├── gsd-progress.md
│   └── gsd-help.md
├── agents/             — 11 specialized agent prompts
│   ├── gsd-planner.md
│   ├── gsd-executor.md
│   ├── gsd-verifier.md
│   ├── gsd-debugger.md
│   ├── gsd-phase-researcher.md
│   ├── gsd-project-researcher.md
│   ├── gsd-research-synthesizer.md
│   ├── gsd-plan-checker.md
│   ├── gsd-integration-checker.md
│   ├── gsd-roadmapper.md
│   └── gsd-codebase-mapper.md
├── templates/          — 22 file templates for planning docs
│   ├── project.md
│   ├── requirements.md
│   ├── roadmap.md
│   ├── state.md
│   ├── context.md
│   ├── research.md
│   ├── phase-prompt.md
│   ├── summary.md
│   ├── config.json
│   └── ...
├── references/         — 13 reference docs for patterns & conventions
│   ├── questioning.md
│   ├── git-integration.md
│   ├── verification-patterns.md
│   ├── planning-config.md
│   ├── ui-brand.md
│   └── ...
├── docs/               — User documentation
│   └── USER-GUIDE.md
├── scripts/            — Installation scripts
│   └── install.sh
├── README.md
├── CHANGELOG.md
├── LICENSE
└── package.json
```

---

## Planning Directory (Created per project)

```
.planning/
├── PROJECT.md          — Project vision and context
├── REQUIREMENTS.md     — Scoped v1/v2 requirements
├── ROADMAP.md          — Phases and progress tracking
├── STATE.md            — Current position, decisions, session info
├── config.json         — Workflow settings
├── research/           — Domain research
└── phases/
    ├── 01-phase-name/
    │   ├── 01-CONTEXT.md
    │   ├── 01-RESEARCH.md
    │   ├── 01-01-PLAN.md
    │   ├── 01-01-SUMMARY.md
    │   ├── 01-VERIFICATION.md
    │   └── 01-UAT.md
    └── 02-phase-name/
        └── ...
```

---

## 🛡️ Anti-Hallucination Engine

**The #1 reason AI coding assistants fail is hallucination** — fabricated APIs, assumed test results, invented library syntax. GSD for Antigravity has structural anti-hallucination safeguards baked into every workflow:

| Protection                    | What it prevents                                       |
|-------------------------------|--------------------------------------------------------|
| **File-First Context**        | Always re-reads files — never relies on memory of them |
| **Source Verification**       | Technical claims verified via docs before use in plans |
| **Confidence Levels**         | Research tagged HIGH/MEDIUM/LOW by verification source |
| **Verification Gates**       | Every task verified — output read, not assumed         |
| **No Auto-Pass**             | Tests never marked passed without user confirmation    |
| **Decision Attribution**     | Tracks USER-decided vs AI-suggested decisions          |
| **Context Freshness**        | New conversation recommended between workflow steps    |
| **Checkpoint Integrity**     | WAIT for user — never hallucinate completion           |

These aren't suggestions — they're **embedded instructions** inside every workflow file that the AI must follow.

---

## 🤖 Multi-Model Compatible

Unlike the original GSD (Claude-only), GSD for Antigravity works across **all AI models** because Antigravity rotates between them:

| Model | Common Hallucination Pattern | GSD Protection |
|-------|-----|------|
| **Claude** (Anthropic) | Polite hallucination — agrees with wrong assumptions | Decision capture integrity, no-lead questioning |
| **Gemini** (Google DeepMind) | Plausible synthesis — mixes real and fabricated info | Source verification hierarchy, confidence tagging |
| **GPT** (OpenAI) | Confident fabrication — invents APIs that don't exist | Library verification gates, URL checking |
| **Open-source** | Higher baseline hallucination rate | Structural guardrails, mandatory file re-reads |

**Model-agnostic by design**: uses structural safeguards (file reads, command verification, user gates) instead of relying on model-specific behavior.

> See [`references/anti-hallucination.md`](references/anti-hallucination.md) for the comprehensive guide.

---

## 🔄 Model Resilience — Consistent Quality Across Switches

> *"When Claude's model quota is exceeded in Antigravity and we switch to Gemini, the quality of code decreases — so what can we do so the code quality and workflow isn't affected with model changing?"*

**Every Antigravity user faces this.** GSD solves it with **plan-driven quality** — the plan itself is the quality guarantee, not the model:

| Strategy | What It Does |
|----------|-------------|
| **Step-by-step plans** | Instructions so detailed any model can follow them correctly |
| **Style anchoring** | Read existing code before writing — match patterns exactly |
| **Code pattern refs** | Every plan references existing files as style templates |
| **Full verification suite** | Lint + type-check + tests + build after EVERY task |
| **Atomic task sizing** | One function per task — less room for quality drift |
| **Code review gates** | Human review for complex logic, regardless of model |

**The result**: Whether Claude, Gemini, GPT, or an open-source model writes the code, **every commit passes the same quality bar**.

> See [`references/model-resilience.md`](references/model-resilience.md) for full strategies.

---

## Adaptations from Original GSD

| Feature | Original (Claude Code) | Antigravity Port |
|---------|----------------------|------------------|
| Subagent spawning | `Task()` API with parallel agents | Sequential execution within task boundaries |
| CLI tooling | `gsd-tools.cjs` for state management | Direct file reads/writes via Antigravity tools |
| User interaction | `AskUserQuestion` structured API | `notify_user` + natural conversation |
| Execution model | Parallel waves across agents | Sequential task execution, same structure |
| Model profiles | Quality/balanced/budget selection | Antigravity's default model |
| Slash commands | `/gsd:command` syntax | `/gsd-command` workflow syntax |

---

## Credits

- **[GSD](https://github.com/gsd-build/get-shit-done)** by [TÂCHES](https://github.com/glittercowboy) — the methodology, philosophy, agent prompts, templates, and workflow design
- **Antigravity port** — adapted to work natively within Google DeepMind's Antigravity AI coding assistant

---

## License

MIT License. See [LICENSE](LICENSE) for details.

---

<div align="center">

**Antigravity is powerful. GSD makes it reliable.**

</div>
