# F-010 — Sign-in / session

```yaml
id: F-010
title: Sign-in, sign-out, session gate
spec: ../docs/specs/features/F-010-auth-session.md
imp: IMP-028
completed: 2026-10-17
built: yes
tested: partial
deployed: n/a
```

## Summary

`signInWithPassword` in Auth; sign-out on Dashboard; App session gate unchanged.

## Built

- [x] `src/components/Auth.jsx`, `src/components/Dashboard.jsx`

## Tested

| Check | Result |
|-------|--------|
| `npm run build` | pass |
| Manual sign-in / sign-out | Amit to verify |
