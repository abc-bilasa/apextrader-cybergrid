# F-001 — PRE_BUILD sign-off + lock D4

```yaml
id: F-001
title: PRE_BUILD sign-off + lock D4
estimate: 15m
status: done
depends: []
completed: 2026-10-17
```

## Outcome

D4 demotion rule is **LOCKED** in DECISIONS; PRE_BUILD_SIGNOFF sections A–D checked; gate marked DONE.

## Acceptance criteria

- [x] D4-A chosen; `docs/DECISIONS.md` status LOCKED
- [x] `docs/PRE_BUILD_SIGNOFF.md` A,B,D + C decisions; gate DONE (Supabase create → F-002)
- [x] D6/D7 noted in `docs/ENVIRONMENT.md`

## Files allowed to touch

- `docs/PRE_BUILD_SIGNOFF.md`
- `docs/DECISIONS.md`
- `docs/ENVIRONMENT.md`

## Docs to update when done

- [x] `docs/specs/BACKLOG.md` (F-001 → done, Next → F-002)
- [x] `docs/IMPLEMENTATION_LOG.md`
- [x] `app-features/F-001-pre-build-signoff.md` + `app-features/INDEX.md`

## Verify

1. No SQL applied yet (F-002 owns migration).
2. DECISIONS change log mentions D4 lock.

## Out of scope

- Supabase, git, code changes
