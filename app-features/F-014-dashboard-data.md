# F-014 — Load account + trades

```yaml
id: F-014
title: Load account + trades
spec: ../docs/specs/features/F-014-dashboard-data.md
imp: IMP-034
completed: 2026-10-17
built: yes
tested: yes
deployed: n/a
```

## Summary

Dashboard fetches `trading_accounts` (single) + `trades` (by `created_at`); header shows live level/capital.

## Built

- [x] `src/components/Dashboard.jsx`

## Tested

| Check | Result |
|-------|--------|
| `npm run build` | pass |
