# F-022 — Daily P&L bars

```yaml
id: F-022
status: done
depends: [F-021]
estimate: 15m
```

## Outcome

Bar chart: sum `pnl` by calendar day; green/red from chartTheme.

## Acceptance criteria

- [x] D11: group by `created_at` date (local or UTC — document choice in spec notes)

## Notes

- **Timezone:** sums grouped by **local calendar day** (`Date` from `trades.created_at` in the browser).

## Files allowed

- `src/components/EquityChart.jsx` or new `DailyPnlChart.jsx` + Dashboard wire

## Out of scope

- Level grid (F-023)
