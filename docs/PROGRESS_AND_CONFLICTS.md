# Progress tracking & conflict resolution

Single reference for **how we know where we are** and **how we settle disagreements** across 2–3 weeks of part-time work (you, Cursor, or future contributors).

---

## Hard gates (no rework)

| Gate | File | Rule |
|------|------|------|
| **Pre-build** | [PRE_BUILD_SIGNOFF.md](./PRE_BUILD_SIGNOFF.md) | No Supabase `001` apply until sign-off DONE |
| **Per feature** | [DEFINITION_OF_DONE.md](./DEFINITION_OF_DONE.md) | Feature not “done” until checklist passes |
| **Per session** | [SESSION_HANDOFF.md](./SESSION_HANDOFF.md) | START + END rituals mandatory |
| **Formula drift** | `scripts/verify-formulas.mjs` | Run after any change to `formulas.js` or RPC math |
| **Audit trail** | [IMPLEMENTATION_LOG.md](./IMPLEMENTATION_LOG.md) | One `IMP-###` row per change; session not done if missing |
| **AI behavior** | [RULEBOOK.md](./RULEBOOK.md) + `.cursor/rules/apextrader-cybergrid.mdc` | Open repo root in Cursor so rules apply |

**Rework triggers we block:** editing applied `001_*.sql`; client-side level/capital updates; shipping without locking D4/D6/D7; chat-only decisions without DECISIONS entry.

---

## Progress tracking (three layers)

```text
ROADMAP.md          →  Plan (weeks / sessions A–I)
       ↓
SESSION_HANDOFF.md  →  Live truth: status, next task, blockers, session log
       ↓
DEVELOPMENT.md      →  Per-file implementation status (stubs → done)
```

| Layer | File | Update when |
|-------|------|-------------|
| **Plan** | [ROADMAP.md](./ROADMAP.md) | Rarely—only if scope/timeline shifts |
| **Session state** | [SESSION_HANDOFF.md](./SESSION_HANDOFF.md) | **End of every sitting** (required) |
| **File-level** | [DEVELOPMENT.md](./DEVELOPMENT.md) | When a component/migration moves stub → done |
| **Release** | [TESTING.md](./TESTING.md) checklist | Before calling a deploy “done” |
| **Registry** | [ENVIRONMENT.md](./ENVIRONMENT.md) | When repo URL, Supabase project, or secrets *names* change |

### End-of-session ritual (≈5 min)

1. Update **Last updated** + **Current state** table in [SESSION_HANDOFF.md](./SESSION_HANDOFF.md).
2. Tick **Completed checklist** items that finished this session.
3. Set **Next session — recommended task** (one clear entry point).
4. Append one line to **Session log**.
5. If you changed behavior vs PRD, add/update [DECISIONS.md](./DECISIONS.md) + change log.
6. Append row(s) to [IMPLEMENTATION_LOG.md](./IMPLEMENTATION_LOG.md).

### What Cursor / AI should do

- **Start:** Read [SESSION_HANDOFF.md](./SESSION_HANDOFF.md) + [DECISIONS.md](./DECISIONS.md) + [AI_CONTEXT.md](./AI_CONTEXT.md).
- **End:** Propose edits to SESSION_HANDOFF (and DECISIONS if needed)—not only chat summary.

---

## Conflict resolution (requirements & design)

When PRD, code, docs, or chat disagree, use this **precedence order**:

| Priority | Source | Role |
|----------|--------|------|
| 1 | [DECISIONS.md](./DECISIONS.md) **LOCKED** | Binding for implementation |
| 2 | [DECISIONS.md](./DECISIONS.md) **DEFAULT** | Use until Amit changes status or locks |
| 3 | [PRD.txt](../PRD.txt) | Original spec; update PRD if product intentionally changes |
| 4 | [DATABASE.md](./DATABASE.md) / [ARCHITECTURE.md](./ARCHITECTURE.md) | Must match DECISIONS + migration SQL |
| 5 | Chat / memory | **Not authoritative**—capture in DECISIONS or SESSION_HANDOFF |

### Types of conflicts

| Type | Example | Resolution |
|------|---------|------------|
| **PRD vs RPC** | −60% in text, −30% in SQL | Follow **D4** in DECISIONS until Amit locks D4 |
| **UI vs server** | Client shows wrong target | Fix UI to match `formulas.js` + RPC (same math) |
| **Docs vs code** | DEVELOPMENT says “stub” but file is full | Update DEVELOPMENT + SESSION_HANDOFF |
| **OPEN decision** | New feature not in PRD | Add **D12** as OPEN → confirm → LOCKED before build |

### Changing a LOCKED decision

1. Edit the decision block in [DECISIONS.md](./DECISIONS.md) (new status + rationale).
2. Add a row to **Change log** with date.
3. Update PRD or migration if behavior changes.
4. Add/adjust tests in [TESTING.md](./TESTING.md).
5. Note in SESSION_HANDOFF session log.

---

## Git conflicts (merge / parallel work)

| Situation | Approach |
|-----------|----------|
| Solo on `main` | Small commits; pull before each session if using remote |
| Feature branch | Merge/rebase to `main`; resolve conflicts in code, then refresh SESSION_HANDOFF |
| `package-lock.json` | Regenerate: `npm install` after merge, commit lockfile |
| Migration SQL | **Never** edit `001_*` on shared DB after apply—add `002_*.sql` |
| Docs only conflict | Prefer combining both: keep SESSION_HANDOFF as merged “current state” |

After resolving a git conflict, add one line to SESSION_HANDOFF **Session log**: what was merged and any DECISIONS impact.

---

## Blockers

Track in [SESSION_HANDOFF.md](./SESSION_HANDOFF.md) **Blockers** table:

| Blocker | Owner | Notes |
|---------|--------|-------|

Examples: waiting on Supabase URL, email confirm setting, D4 confirmation.

Do not start implementation that depends on an **OPEN** decision without locking it or explicit “use DEFAULT.”

---

## Quick health check (any session)

- [ ] SESSION_HANDOFF **Next task** is one concrete step from ROADMAP  
- [ ] No known PRD/code mismatch without a DECISIONS entry  
- [ ] ENVIRONMENT registry filled if GitHub/Supabase exist  
- [ ] DEVELOPMENT file map matches reality  

---

## Related

- [docs/README.md](./README.md) — doc index  
- [ROADMAP.md](./ROADMAP.md) — planned sessions  
