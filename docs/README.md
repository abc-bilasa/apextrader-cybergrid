# Documentation index

Use this folder for everything needed to **build**, **test**, and **deploy** across multiple sessions (2–3 weeks). Do not duplicate setup steps in chat—update these files when something changes.

## Start here

| Doc | When to read |
|-----|----------------|
| [RULEBOOK.md](./RULEBOOK.md) | **Master rules** — conflicts, efficiency, architecture, UI, sessions |
| [SPEC_DRIVEN.md](./SPEC_DRIVEN.md) | **15-min features** — how to build one spec at a time |
| [specs/BACKLOG.md](./specs/BACKLOG.md) | Ordered feature list F-001–F-027 |
| [app-features/](../app-features/) | **Built / tested / deployed** record per feature |
| [EFFICIENT_WORKFLOW.md](./EFFICIENT_WORKFLOW.md) | **Recommended:** fast path, deploy timing, token-saving Cursor prompts |
| [ROADMAP.md](./ROADMAP.md) | Planning work by week/session |
| [SETUP.md](./SETUP.md) | First-time machine + repo setup |
| [ENVIRONMENT.md](./ENVIRONMENT.md) | Env vars, secrets, Supabase auth URLs |
| [SESSION_HANDOFF.md](./SESSION_HANDOFF.md) | **Every session end:** current state + next task |
| [IMPLEMENTATION_LOG.md](./IMPLEMENTATION_LOG.md) | **Audit trail:** every code/doc/schema change (append row) |
| [PROGRESS_AND_CONFLICTS.md](./PROGRESS_AND_CONFLICTS.md) | How we track progress & resolve PRD/git disagreements |
| [PRE_BUILD_SIGNOFF.md](./PRE_BUILD_SIGNOFF.md) | **Required once** before DB apply / integration |
| [DEFINITION_OF_DONE.md](./DEFINITION_OF_DONE.md) | When a session or feature is truly finished |

## Build & run

| Doc | When to read |
|-----|----------------|
| [ARCHITECTURE.md](./ARCHITECTURE.md) | How frontend, Supabase, and RPC fit together |
| [DATABASE.md](./DATABASE.md) | Migrations, RLS, `log_trade`, verification queries |
| [DEVELOPMENT.md](./DEVELOPMENT.md) | Day-to-day coding, conventions, file map |
| [UI_STYLE_GUIDE.md](./UI_STYLE_GUIDE.md) | **Global UI/theme** — required for all screens & components |
| [DECISIONS.md](./DECISIONS.md) | Product/tech choices (change only via this doc) |

## Quality & release

| Doc | When to read |
|-----|----------------|
| [TESTING.md](./TESTING.md) | Manual test matrix, formula checks, release checklist |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | GitHub, Pages, Actions, base path |
| [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) | Common failures |

## AI / new contributor

| Doc | When to read |
|-----|----------------|
| [AI_CONTEXT.md](./AI_CONTEXT.md) | Short context for Cursor or other agents |

## Cursor skills (project)

| Skill | Use |
|-------|-----|
| `apextrader-session-open` | Start of session |
| `apextrader-session-close` | End of session |
| `apextrader-feature-build` | Build one backlog feature (F-0XX) |

## External source of truth

- **PRD:** [`../PRD.txt`](../PRD.txt)

## Doc maintenance rules

1. **One place per topic**—link instead of copying long steps.
2. **DECISIONS.md** records anything ambiguous from the PRD; implementation follows recorded decisions.
3. **SESSION_HANDOFF.md** is the live “where we left off” (date + checklist).
4. When deploy URLs or repo name change, update **ENVIRONMENT.md** and **DEPLOYMENT.md** the same day.
5. Every implementation change gets a row in **IMPLEMENTATION_LOG.md** (increment **Next ID**).
