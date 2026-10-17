# F-009 — Sign-up

```yaml
id: F-009
status: pending
depends: [F-008, F-002]
estimate: 15m
```

## Outcome

User can sign up with email/password; errors shown via `.cyber-alert-error`.

## Acceptance criteria

- [ ] `supabase.auth.signUp` wired
- [ ] Error messages visible; loading state on submit

## Files allowed

- `src/components/Auth.jsx`

## Verify

1. Sign-up creates `auth.users` row; trigger creates `trading_accounts` (Table Editor).

## Out of scope

- Sign-in (F-010)
