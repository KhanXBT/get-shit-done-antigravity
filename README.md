<div align="center">

# GSD for Antigravity 🚀

**A spec-driven development workflow system for [Antigravity](https://deepmind.google/) — ported from [Get Shit Done](https://github.com/gsd-build/get-shit-done).**

**Solves context rot — the quality degradation that happens as AI fills its context window.**

[![GitHub stars](https://img.shields.io/github/stars/KhanXBT/get-shit-done-antigravity?style=for-the-badge&logo=github&color=181717)](https://github.com/KhanXBT/get-shit-done-antigravity)
[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-green?style=for-the-badge)](CHANGELOG.md)
[![Original GSD](https://img.shields.io/badge/based_on-GSD_v1.20.4-CB3837?style=for-the-badge)](https://github.com/gsd-build/get-shit-done)

<br>

```bash
bash scripts/install.sh
```

**Works on Mac, Windows, and Linux.**

<br>

*The complexity is in the system, not in your workflow.*

*Behind the scenes: context engineering, structured XML plans, state management.*

*What you see: a few commands that just work.*

<br>

[How It Works](#how-it-works) · [Commands](#commands) · [Why It Works](#why-it-works) · [User Guide](docs/USER-GUIDE.md)

</div>

---

## Why This Exists

[GSD](https://github.com/gsd-build/get-shit-done) by TÂCHES is the best spec-driven development system for AI coding — but it only runs on Claude Code, OpenCode, and Gemini CLI.

**GSD for Antigravity** ports the entire methodology to work natively inside [Antigravity](https://deepmind.google/) (Google DeepMind's AI coding assistant). Same structured approach. Same file organization. Same atomic commits. No extra tools required.

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

> **Already have code?** Start with `/gsd-new-project` inside your existing repo. GSD will ask questions about what you're adding, not what already exists.

### 1. Initialize Project
```
/gsd-new-project
```
Answer questions about your vision, users, stack preferences, constraints. GSD researches the domain ecosystem — standard stacks, expected features, common pitfalls — then creates requirements and a phased roadmap.

**Creates:** `PROJECT.md`, `REQUIREMENTS.md`, `ROADMAP.md`, `STATE.md`

### 2. Discuss Phase
```
/gsd-discuss 1
```
Before planning, capture HOW you want things built. GSD identifies gray areas — things that could go multiple ways — and presents concrete choices:

*"Cards, list, or timeline layout?" · "Infinite scroll or pagination?" · "You decide" is always an option.*

**Creates:** `CONTEXT.md` with locked decisions

### 3. Plan Phase
```
/gsd-plan 1
```
Researches implementation approaches, creates atomic task plans with XML structure, verifies plans against requirements:

```xml
<task type="auto">
  <name>Create login endpoint</name>
  <files>src/api/auth/login.ts</files>
  <action>Validate credentials, return httpOnly cookie</action>
  <verify>POST /api/auth/login returns 200 + Set-Cookie</verify>
  <done>Valid credentials return cookie, invalid return 401</done>
</task>
```

**Creates:** `RESEARCH.md`, `01-PLAN.md`, `02-PLAN.md`, etc.

### 4. Execute Phase
```
/gsd-execute 1
```
Executes each task from the plans with atomic git commits. Each task = one commit. Failed tasks can be retried, skipped, or stopped.

```
abc123f feat(01-01): add user registration form
def456g feat(01-02): implement email validation
hij789k feat(01-03): create registration endpoint
```

**Creates:** `SUMMARY.md`, `VERIFICATION.md`

### 5. Verify Work
```
/gsd-verify 1
```
User acceptance testing — one test at a time, you confirm each feature works:

```
╔════════════════════════════════════════╗
║  TEST 1/5: User Registration          ║
╚════════════════════════════════════════╝

Expected: Form shows name, email, password fields.
  Submit validates all fields before sending.

→ Type "pass" or describe what's wrong
```

**Creates:** `UAT.md` with gap analysis

### 6. Repeat → Next Phase → Next Milestone
```
/gsd-discuss 2
/gsd-plan 2
/gsd-execute 2
/gsd-verify 2
...
```

Loop **discuss → plan → execute → verify** until all phases complete.

### Quick Mode
```
/gsd-quick Add dark mode toggle
```

For ad-hoc tasks that don't need full planning. Same atomic commits, same state tracking, less ceremony.

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
