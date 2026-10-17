# F-003 — Local environment

```yaml
id: F-003
title: .env.local + registry
spec: ../docs/specs/features/F-003-env-local.md
imp: IMP-023
completed: 2026-10-17
built: yes
tested: yes
deployed: n/a
```

## Summary

`.env.local` created from `.env.example` with Supabase URL + anon key; `npm.cmd run dev` serves app at localhost:5173 (PowerShell `npm.ps1` blocked — use `npm.cmd` or fix execution policy).

## Built (deliverables)

- [x] `.env.local` exists (gitignored)
- [ ] ENVIRONMENT Supabase registry fields — deferred (user skipped step 5)

**Files changed:** `.env.local` (local only, not committed)

**Not in scope:** Auth UI, migration SQL

## Tested (verification)

| Check | Result | Notes |
|-------|--------|-------|
| `npm run dev` | pass | `npm.cmd` from `apextrader-cybergrid/` |
| App loads in browser | pass | User confirmed |
| `npm run build` | pass | Agent verify with env present |

## Deployed

| Environment | Status | Notes |
|-------------|--------|-------|
| Local dev | yes | http://localhost:5173 |
| GitHub Pages | n/a | F-007 |

## Dependencies

- Requires: F-002
- Unblocks: F-008

## Notes

Fill `docs/ENVIRONMENT.md` Supabase name/ref/region anytime (no keys).
