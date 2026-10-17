# F-009 — Sign-up

```yaml
id: F-009
status: done
completed: 2026-10-17
depends: [F-008, F-002]
estimate: 15m
```

## Outcome

User can sign up with email/password; errors shown via `.cyber-alert-error`.

## Acceptance criteria

- [x] `supabase.auth.signUp` wired
- [x] Error messages visible; loading state on submit

## Files allowed

- `src/components/Auth.jsx`

## Verify

1. Sign-up creates `auth.users` row; trigger creates `trading_accounts` (Table Editor).

## Out of scope

- Sign-in (F-010)
