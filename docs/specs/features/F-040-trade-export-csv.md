# F-040 — Export trade journal to CSV

```yaml
id: F-040
status: done
depends: [F-036]
estimate: 30m
```

## Outcome

Download journal as `.csv` (all trades or current profit/loss filter) for backup, tax prep, or re-import elsewhere.

## Acceptance criteria

- [x] `tradeCsvExport.js` — RFC-style quoting + header row
- [x] Export button on `TradeJournalTable` (respects active filter)
- [x] `verify-formulas` round-trip sample with import parser

## Files allowed

- `tradeCsvExport.js`, `TradeJournalTable.jsx`, `verify-formulas.mjs`

## Out of scope

- Server-side export; per-account multi-row (F-039 phase 2)
