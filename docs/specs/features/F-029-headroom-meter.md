# F-029 — Drawdown & promotion headroom meter

```yaml
id: F-029
status: done
depends: [F-019, F-014]
estimate: 30m
```

## Outcome

Live panel shows ₹ remaining to demotion (−30% baseline rule), gap to promotion (+50%), advisory max DD (−60%), DD usage % with 50/75/90% alert tiers, and max loss before demotion on next trade.

## Acceptance criteria

- [x] `getHeadroomMetrics(level, currentCapital)` mirrors `log_trade` promotion/demotion thresholds
- [x] UI progress bars + tier labels (safe / caution / warning / critical / breached)
- [x] Level 42 hides promotion row
- [x] `npm run verify:formulas` includes headroom samples

## Files allowed

- `src/lib/formulas.js`, `src/components/HeadroomPanel.jsx`, `Dashboard.jsx`, `scripts/verify-formulas.mjs`

## Out of scope

- `simulate_trade` (F-032); intraday D1–D4 pacing (F-031)
