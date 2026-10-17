# F-009 — Sign-up

```yaml
id: F-009
title: Sign-up + error banner
spec: ../docs/specs/features/F-009-auth-signup.md
imp: IMP-027
completed: 2026-10-17
built: yes
tested: partial
deployed: n/a
```

## Summary

`supabase.auth.signUp` on sign-up mode; `.cyber-alert-error` + loading state. Sign-in submit shows placeholder message (F-010).

## Built

- [x] `src/components/Auth.jsx`

## Tested

| Check | Result | Notes |
|-------|--------|-------|
| `npm run build` | pass | |
| Manual sign-up + `trading_accounts` | manual | Amit: sign up in dev, check Supabase Table Editor |

## Notes

Email confirmation off per D6 — session should land on Dashboard after sign-up.
