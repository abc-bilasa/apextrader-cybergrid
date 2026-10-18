# F-036 — Trade journal table

```yaml
id: F-036
status: done
depends: [F-014]
estimate: 30m
```

## Outcome

Paginated, newest-first table of `trades` with P&L, level, notes; filter all / profit / loss.

## Acceptance criteria

- [x] 10 rows per page, prev/next controls
- [x] Filter chips; empty state
- [x] `.cyber-*` table styling; responsive scroll

## Files allowed

- `src/components/TradeJournalTable.jsx`, `Dashboard.jsx`

## Out of scope

- CSV export; server-side pagination
