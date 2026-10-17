---
name: apextrader-session-close
description: Closes an ApexTrader Cyber-Grid work session by updating handoff, audit log, and file status. Use when the user says close session, end session, session close, handoff, wrap up, or stopping for the day.
disable-model-invocation: true
---

# Close session — ApexTrader Cyber-Grid

Run this **after work stops** (even if little code changed). Repo root: `apextrader-cybergrid/`.

## Steps (execute in order)

1. **Summarize** what changed this sitting (files, config, docs only — no secrets in chat).
2. **Update** `docs/SESSION_HANDOFF.md`:
   - **Last updated** (date, by, session focus)
   - **Gate status** table (honest)
   - **Current state** table (honest)
   - **Next session** — next **feature ID** from `docs/specs/BACKLOG.md` (and spec title)
   - **Blockers** table
   - **Completed checklist** ticks on roadmap section
   - **Session log** append: `| YYYY-MM-DD | END: <shipped / partial / blocked> |`
3. **Update** `docs/DEVELOPMENT.md` file map if any component/migration status changed.
4. **If** behavior or product rules changed: `docs/DECISIONS.md` change log (+ lock status if needed).
5. If a feature was worked: spec `status` done/blocked; BACKLOG updated; **`app-features/F-0XX*.md` + INDEX.md** if feature completed.
6. **Append** row(s) to `docs/IMPLEMENTATION_LOG.md` (newest first):
   - Use next **IMP-###** from file’s “Next ID” section
   - Bump **Next ID** by count of rows added
   - Type: `FEATURE` | `DOCS` | `SQL` | `CONFIG` | `FIX` | etc.
7. **If** UI shipped: confirm `docs/DEFINITION_OF_DONE.md` dashboard/UI items where applicable.
8. **Update** `README.md` Status section only if milestone-level change.
9. **Do not** commit to git unless the user asked.

## END ritual checklist (mark done in handoff narrative)

- Last updated + current state + next session + blockers
- Session log END line
- IMPLEMENTATION_LOG row(s)
- DEVELOPMENT file map (if needed)
- DECISIONS (if needed)

## Output format (reply to user)

```markdown
## Session closed
- **Shipped:** …
- **Not done / carried forward:** …
- **Next session:** …
- **IMP IDs:** IMP-…
- **Updated files:** …
```

## Anti-patterns

- Do not end with chat-only summary — files must be updated.
- Do not leave “Next session” vague or list multiple sessions.
- Do not put API keys or `.env.local` values in any doc.
