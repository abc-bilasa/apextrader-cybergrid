# F-002 — Supabase + apply 001

```yaml
id: F-002
title: Supabase project + apply 001 SQL
estimate: 15m
status: done
depends: [F-001]
completed: 2026-10-17
```

## Outcome

`001_initial_schema.sql` applied once on Supabase; tables + `log_trade` exist.

## Acceptance criteria

- [x] Supabase project created (region noted in ENVIRONMENT registry)
- [x] Full `supabase/migrations/001_initial_schema.sql` executed successfully
- [x] `GRANT EXECUTE` on `log_trade` for `authenticated` confirmed

## Files allowed to touch

- `docs/ENVIRONMENT.md` (registry only, no keys)
- `docs/SESSION_HANDOFF.md` (gate: migration applied)

## Docs to update when done

- [ ] BACKLOG, IMPLEMENTATION_LOG (type `SQL`)

## Verify

1. Table Editor shows `trading_accounts`, `trades`, `level_history`.
2. Do not edit `001` after apply (D13).

## Out of scope

- `.env.local` (F-003), app code
