# F-037 — Broker CSV import

```yaml
id: F-037
status: done
depends: [F-016]
estimate: 45m
```

## Outcome

Upload `.csv`, auto-detect P&L column, sum rows, submit **one** `log_trade` with import note.

## Acceptance criteria

- [x] `parseTradeCsv` handles quoted CSV + ₹/commas
- [x] Detects `pnl`, `Realized P&L`, similar headers
- [x] Preview total + first rows; single RPC commit
- [x] Verify script includes CSV parse samples

## Files allowed

- `csvTradeImport.js`, `CsvImportPanel.jsx`, `Dashboard.jsx`, `verify-formulas.mjs`

## Out of scope

- Kite Connect live sync; per-row `trades` insert; multi-day split
