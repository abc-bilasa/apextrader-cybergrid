# F-033 — Consistency rule tracker

```yaml
id: F-033
status: done
depends: [F-022]
estimate: 30m
```

## Outcome

Panel shows whether **today’s** P&L exceeds **40%** of **total journal profit** (prop payout style); safe headroom in ₹.

## Acceptance criteria

- [x] `getConsistencyMetrics` with default 40% cap
- [x] Uses D11 today sum + lifetime trade sum
- [x] Inactive when total profit ≤ 0
- [x] verify-formulas sample for headroom math

## Files allowed

- `formulas.js`, `tradeDay.js`, `ConsistencyPanel.jsx`, `Dashboard.jsx`, `verify-formulas.mjs`

## Out of scope

- User-configurable % (future DECISIONS); challenge profiles (F-039)
