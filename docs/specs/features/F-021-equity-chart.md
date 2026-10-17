# F-021 — Equity chart

```yaml
id: F-021
status: pending
depends: [F-014]
estimate: 15m
```

## Outcome

Recharts area chart of `ending_capital` vs trade index; uses `chartTheme.js`.

## Acceptance criteria

- [ ] `.cyber-chart-wrap`, tooltip style from theme
- [ ] Trade 0 point = initial 10000 or first account capital

## Files allowed

- `src/components/EquityChart.jsx`, `src/components/Dashboard.jsx` (wire props)

## Out of scope

- Bar chart (F-022)
