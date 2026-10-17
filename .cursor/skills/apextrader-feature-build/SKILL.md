---
name: apextrader-feature-build
description: Implements exactly one 15-minute feature from docs/specs for ApexTrader Cyber-Grid. Use when the user says build feature F-0XX, implement F-0XX, or run the next backlog feature.
disable-model-invocation: true
---

# Build one feature (spec-driven)

Repo root: `apextrader-cybergrid/`. Process: [docs/SPEC_DRIVEN.md](../../docs/SPEC_DRIVEN.md).

## Steps

1. Read `docs/specs/BACKLOG.md` — if user gave no ID, use **Next feature**.
2. Open `docs/specs/features/<spec file>.md`; set yaml `status: in_progress` in spec (optional).
3. Confirm all `depends` features are `done` in BACKLOG; else stop and report blocker.
4. Implement **only** acceptance criteria and **Files allowed** — respect **Out of scope**.
5. UI: [docs/UI_STYLE_GUIDE.md](../../docs/UI_STYLE_GUIDE.md). RPC: D2, no client capital hacks.
6. **Verify** per spec + `npm run build` if JS/CSS changed; `npm run verify:formulas` if math touched.
7. Mark spec `status: done`, `completed: YYYY-MM-DD`; update BACKLOG row + **Next feature** line.
8. **Create/update** `app-features/F-0XX-<slug>.md` from `app-features/_TEMPLATE.md` (built / tested / deployed).
9. Update `app-features/INDEX.md` status columns.
10. `docs/DEVELOPMENT.md` file map; `docs/IMPLEMENTATION_LOG.md` (FEATURE, cite F-0xx).
11. Do not start the next feature unless user asks.

## Reply format

```markdown
## Feature F-0XX complete
- **Verified:** …
- **Files:** …
- **Next backlog:** F-0YY
```
