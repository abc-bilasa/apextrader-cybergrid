# F-006 — GitHub Actions config

```yaml
id: F-006
title: Actions secrets + VITE_BASE_PATH
estimate: 15m
status: done
depends: [F-005]
completed: 2026-10-17
```

## Outcome

GitHub Actions can build with Supabase env and correct base path.

## Acceptance criteria

- [x] Secrets: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
- [x] Variable: `VITE_BASE_PATH` = `/apextrader-cybergrid/` (trailing slash)
- [x] Workflow run triggered on push

## Files allowed to touch

- `docs/DEPLOYMENT.md` (if notes needed)
- `docs/ENVIRONMENT.md`

## Out of scope

- Fixing build failures (F-007)
