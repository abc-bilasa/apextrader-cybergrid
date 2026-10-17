# F-010 — Sign-in / sign-out / session

```yaml
id: F-010
status: done
completed: 2026-10-17
depends: [F-009]
estimate: 15m
```

## Outcome

Sign-in works; `App.jsx` shows Dashboard when session exists; sign-out clears session.

## Acceptance criteria

- [x] `signInWithPassword` wired
- [x] `App.jsx` session gate unchanged behavior but functional
- [x] Sign-out from dashboard or auth flow

## Files allowed

- `src/components/Auth.jsx`, `src/App.jsx`, `src/components/Dashboard.jsx` (sign-out button only)

## Verify

[TESTING.md](../../TESTING.md) A3–A4

## Out of scope

- Dashboard data (F-014)
