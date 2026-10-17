# F-002 — Supabase + apply 001

```yaml
id: F-002
title: Supabase project + apply 001 SQL
spec: ../docs/specs/features/F-002-supabase-migration.md
imp: IMP-022
completed: 2026-10-17
built: yes
tested: yes
deployed: yes
```

## Summary

Supabase project created; `001_initial_schema.sql` applied via SQL Editor; three public tables confirmed by Amit.

## Built (deliverables)

- [x] `supabase/APPLY.md` — dashboard steps + verify SQL
- [x] Supabase project created
- [x] `001_initial_schema.sql` executed on project

**Files changed (agent):**

- `supabase/APPLY.md`
- `app-features/F-002-supabase-migration.md` (this file)
- `docs/SESSION_HANDOFF.md`, `docs/specs/BACKLOG.md`, `docs/PRE_BUILD_SIGNOFF.md`

**Not in scope:** `.env.local` (F-003)

## Tested (verification)

| Check | Result | Notes |
|-------|--------|-------|
| 3 public tables | pass | User confirmed Table Editor |
| `log_trade` grant | assumed pass | Part of 001 script |
| `npm run build` | n/a | no app change |

## Deployed

| Environment | Status | URL / ref | Date |
|-------------|--------|-----------|------|
| Supabase schema | **live** | registry TBD in ENVIRONMENT.md | 2026-10-17 |
| GitHub Pages | n/a | F-007 | — |

## Dependencies

- Requires: F-001 done
- Unblocks: F-003, F-014, F-016

## Notes

Fill Supabase name/ref/region in `docs/ENVIRONMENT.md` when convenient (no keys).
