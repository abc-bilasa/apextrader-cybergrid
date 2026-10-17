---
name: apextrader-session-open
description: Opens a ApexTrader Cyber-Grid work session by reading handoff state, gates, and scope. Use when the user says open session, start session, begin session, session open, or starts a new sitting on this project.
disable-model-invocation: true
---

# Open session — ApexTrader Cyber-Grid

Run this **before writing or changing code**. Repo root: `apextrader-cybergrid/` (or paths below relative to it).

## Steps (execute in order)

1. **Read** `docs/SESSION_HANDOFF.md` — focus on: Last updated, Gate status, Current state, **Next session**, Blockers.
2. **Read** `docs/specs/BACKLOG.md` — **Next feature** ID and spec link.
3. **Read** `docs/SPEC_DRIVEN.md` (one feature per sitting).
4. **Read** `docs/RULEBOOK.md` §2 (efficiency + one slice per task).
5. **Read** latest 3 rows of `docs/IMPLEMENTATION_LOG.md` (newest first).
6. **Conditional reads** (only if today’s planned work needs them):
   - DB/RPC: `docs/DECISIONS.md`, `docs/PRE_BUILD_SIGNOFF.md` (must be DONE before SQL apply)
   - UI: `docs/UI_STYLE_GUIDE.md`
   - Deploy: `docs/ENVIRONMENT.md`, `docs/DEPLOYMENT.md`
   - Do **not** read full `PRD.txt` unless handoff says so
7. If git remote exists: `git pull` (report status only; do not commit unless asked).
8. **Confirm scope** with the user in 3–5 bullets:
   - **Next feature ID** from BACKLOG (e.g. F-001)
   - What handoff says is **next**
   - Active **blockers**
   - **One-slice** goal for this sitting (from `docs/EFFICIENT_WORKFLOW.md` if unclear)
9. **Append** to Session log in `docs/SESSION_HANDOFF.md`:
   - `| YYYY-MM-DD | START: <one-line goal> |`
10. **Do not** start implementation until the user confirms or the message already states the session goal (e.g. “build F-001”).

## Output format (reply to user)

```markdown
## Session opened
- **Handoff date:** …
- **Next planned work:** …
- **Blockers:** …
- **Today’s slice:** …
- **Gates:** PRE_BUILD / 001 applied / CI — …
Ready to proceed when you confirm (or I’ll continue if your message already defined the goal).
```

## Anti-patterns

- Do not re-scaffold the project or duplicate docs.
- Do not apply Supabase SQL if PRE_BUILD_SIGNOFF is not DONE.
- Do not implement multiple EFFICIENT_WORKFLOW sessions in one sitting unless user explicitly asks.
