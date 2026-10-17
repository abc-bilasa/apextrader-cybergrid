# F-001 — PRE_BUILD sign-off + lock D4-A

```yaml
id: F-001
title: PRE_BUILD sign-off + lock D4
spec: ../docs/specs/features/F-001-pre-build-signoff.md
imp: IMP-019
completed: 2026-10-17
built: yes
tested: yes
deployed: n/a
```

## Summary

Product and process sign-off before database work: **D4-A** locked (30% RPC demotion, 60% UI-only), PRE_BUILD sections A/B/D complete, infrastructure naming decided, formula cross-check passed. No application code or Supabase apply in this feature.

## Built (deliverables)

- [x] D4 **LOCKED** in `docs/DECISIONS.md` (D4-A)
- [x] `docs/PRE_BUILD_SIGNOFF.md` gate **DONE** (Supabase create deferred to F-002; `.env.local` to F-003)
- [x] D6 email confirm **Off** (dev); D7 sign-up **Open** in `docs/ENVIRONMENT.md`
- [x] Registry: repo `apextrader-cybergrid`, `VITE_BASE_PATH` `/apextrader-cybergrid/`, production URL pattern documented

**Files changed:**

- `docs/DECISIONS.md`
- `docs/PRE_BUILD_SIGNOFF.md`
- `docs/ENVIRONMENT.md`
- `docs/specs/BACKLOG.md`, `docs/specs/features/F-001-pre-build-signoff.md`
- `docs/SESSION_HANDOFF.md`, `docs/IMPLEMENTATION_LOG.md`

**Not in scope (confirmed):** Supabase SQL apply, git, `.env.local`, app source.

## Tested (verification)

| Check | Result | Notes |
|-------|--------|-------|
| Spec verify: no SQL applied | pass | F-002 owns migration |
| DECISIONS change log D4 | pass | IMP-019 |
| `npm run verify:formulas` | pass | 2026-10-17 |
| `npm run build` | skip | no JS changes |

**Tester / date:** Amit + Cursor / 2026-10-17

## Deployed

| Environment | Status | URL / ref | Date |
|-------------|--------|-----------|------|
| Local dev | n/a | docs-only feature | — |
| Supabase | no | F-002 | — |
| GitHub `main` | no | F-004–F-005 | — |
| GitHub Pages | no | F-007 | — |

## Dependencies

- Requires: none
- Unblocks: **F-002** (Supabase migration)

## Notes

If 60% RPC demotion is ever required, add new DECISIONS lock + `002_*.sql` — do not edit applied `001` (D13).
