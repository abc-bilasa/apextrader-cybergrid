# F-024 — Loading + errors

```yaml
id: F-024
title: Loading and error states
spec: ../docs/specs/features/F-024-errors-loading.md
imp: IMP-044
completed: 2026-10-17
built: yes
tested: yes
deployed: n/a
```

## Summary

Auth/trade/dashboard surface failures via `.cyber-alert-error`; empty-trade hint; sync indicator on refresh.

## Built

- [x] `src/components/Auth.jsx`
- [x] `src/components/Dashboard.jsx`
- [x] `src/components/TradeLogger.jsx`

## Tested

| Check | Result |
|-------|--------|
| `npm run build` | pass |
