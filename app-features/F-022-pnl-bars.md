# F-022 — Daily P&L bars

```yaml
id: F-022
title: Daily P&L bar chart
spec: ../docs/specs/features/F-022-pnl-bars.md
imp: IMP-042
completed: 2026-10-17
built: yes
tested: yes
deployed: n/a
```

## Summary

Bar chart sums `pnl` by local calendar day; green/red bars from `chartTheme`.

## Built

- [x] `src/components/DailyPnlChart.jsx`
- [x] `src/components/Dashboard.jsx`

## Tested

| Check | Result |
|-------|--------|
| `npm run build` | pass |
