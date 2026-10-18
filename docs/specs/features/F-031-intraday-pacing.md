# F-031 — D1–D4 intraday pacing

```yaml
id: F-031
status: done
depends: [F-020, F-022]
estimate: 30m
```

## Outcome

Panel shows **today’s** summed P&L (D11 local day) vs cumulative D1→D4 thresholds for the active level.

## Acceptance criteria

- [x] `getIntradayPacingMetrics` + shared `tradeDay.js` (D11)
- [x] `DailyPacingPanel` on dashboard; milestones show met / in-progress bars
- [x] D4 complete message when today P&L ≥ 50% level slice

## Files allowed

- `formulas.js`, `tradeDay.js`, `DailyPacingPanel.jsx`, `DailyPnlChart.jsx`, `Dashboard.jsx`, `verify-formulas.mjs`

## Out of scope

- Multi-day pacing calendar; F-032 simulate_trade
