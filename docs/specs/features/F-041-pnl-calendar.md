# F-041 — P&L calendar

```yaml
id: F-041
status: done
depends: [F-022, F-014]
estimate: 45m
```

## Outcome

Month calendar (local days, D11) with daily P&L totals; tap a day to list trades and day total.

## Acceptance criteria

- [x] `pnlCalendar.js` — aggregate by day + month grid cells
- [x] `PnlCalendarPanel` — month navigation, selection, trade list
- [x] Wired on dashboard below daily P&L chart
- [x] `verify-formulas` aggregation sample

## Out of scope

- Server calendar; multi-timezone; future scheduled trades
