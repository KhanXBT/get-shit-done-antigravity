# GSD for Antigravity 🚀

**A spec-driven development workflow system for [Antigravity](https://deepmind.google/) — inspired by [Get Shit Done](https://github.com/gsd-build/get-shit-done).**

No enterprise theater. No sprint ceremonies. Just a structured, repeatable system for building great software with AI.

## What Is This?

GSD for Antigravity brings the powerful **Get Shit Done** development methodology to Antigravity (Google DeepMind's AI coding assistant). It provides structured workflows for:

- **Deep project questioning** — understand what you're building before writing a line of code
- **Domain research** — investigate stack, features, architecture, and pitfalls
- **Spec-driven planning** — create atomic, executable task plans with verification criteria
- **Disciplined execution** — atomic git commits, one task at a time
- **User acceptance testing** — verify what you built matches what you wanted

## Installation

Copy the `workflows/` directory into your Antigravity workflows folder:

```bash
cp -r workflows/*.md ~/.gemini/antigravity/.agent/workflows/
```

That's it. The commands are now available in any Antigravity session.

## Commands

### Core Workflow

| Command | What it does |
|---------|-------------|
| `/gsd-new-project` | Full initialization: questions → research → requirements → roadmap |
| `/gsd-discuss [N]` | Capture implementation decisions before planning |
| `/gsd-plan [N]` | Research + plan + verify for a phase |
| `/gsd-execute [N]` | Execute all plans for a phase with atomic git commits |
| `/gsd-verify [N]` | Verify built features through user acceptance testing |

### Utilities

| Command | What it does |
|---------|-------------|
| `/gsd-quick [desc]` | Execute small ad-hoc task with GSD guarantees |
| `/gsd-progress` | Where am I? What's next? |
| `/gsd-help` | Show all commands |

## Typical Workflow

```
/gsd-new-project     → Set up project vision, requirements, roadmap
     ↓
/gsd-discuss 1       → Capture your preferences for Phase 1
     ↓
/gsd-plan 1          → Research and create task plans
     ↓
/gsd-execute 1       → Execute plans with atomic commits
     ↓
/gsd-verify 1        → Test and verify the work
     ↓
  Repeat for next phase
```

## File Structure

All planning files are stored in `.planning/` at the project root:

```
.planning/
├── PROJECT.md          — Project vision and context
├── REQUIREMENTS.md     — Scoped v1/v2 requirements
├── ROADMAP.md          — Phases and progress tracking
├── STATE.md            — Current position, decisions, session info
├── config.json         — Workflow settings
├── research/           — Domain research
│   ├── STACK.md
│   ├── FEATURES.md
│   ├── ARCHITECTURE.md
│   ├── PITFALLS.md
│   └── SUMMARY.md
└── phases/
    ├── 01-phase-name/
    │   ├── 01-CONTEXT.md
    │   ├── 01-RESEARCH.md
    │   ├── 01-01-PLAN.md
    │   ├── 01-01-SUMMARY.md
    │   └── 01-VERIFICATION.md
    └── 02-phase-name/
        └── ...
```

## How It Works

### Context Engineering
Instead of dumping everything into one long conversation, GSD structures project knowledge across purpose-built files. Each file has a clear role, and workflows load only what's needed — keeping context focused and quality high.

### XML Task Plans
Plans use structured XML that gives Antigravity precise instructions:

```xml
<task type="auto">
  <name>Create login endpoint</name>
  <files>src/api/auth/login.ts</files>
  <action>
    Validate credentials against users table.
    Return httpOnly cookie on success.
  </action>
  <verify>POST /api/auth/login returns 200 + Set-Cookie</verify>
  <done>Valid credentials return cookie, invalid return 401</done>
</task>
```

### Atomic Git Commits
Each task gets its own commit — traceable, revertable, meaningful:

```
abc123f feat(01-01): add user registration form
def456g feat(01-02): implement email validation
hij789k feat(01-03): create registration endpoint
```

## Credits

- **Original GSD** by [TÂCHES](https://github.com/gsd-build/get-shit-done) — the methodology, philosophy, and workflow design
- **Antigravity adaptation** — ported to work natively with Antigravity's tool set

## License

MIT
