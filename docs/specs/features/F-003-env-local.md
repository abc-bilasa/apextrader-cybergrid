# F-003 — Local environment

```yaml
id: F-003
title: .env.local + registry
estimate: 15m
status: done
depends: [F-002]
completed: 2026-10-17
```

## Outcome

Local dev loads Supabase client with valid env; registry filled.

## Acceptance criteria

- [x] `.env.local` exists (gitignored) from `.env.example`
- [x] `npm run dev` starts without env errors
- [ ] ENVIRONMENT project registry table filled (no secrets) — deferred

## Files allowed to touch

- `.env.local` (not committed)
- `docs/ENVIRONMENT.md`

## Verify

1. `npm run dev` — app loads in browser.

## Out of scope

- Auth UI, migration SQL
