# F-021 — Equity chart

```yaml
id: F-021
title: Equity chart
spec: ../docs/specs/features/F-021-equity-chart.md
imp: IMP-041
completed: 2026-10-17
built: yes
tested: yes
deployed: n/a
```

## Summary

Recharts area chart: trade index vs `ending_capital`; trade 0 uses `initialCapital` from Dashboard.

## Built

- [x] `src/components/EquityChart.jsx`

## Tested

| Check | Result |
|-------|--------|
| `npm run build` | pass |
