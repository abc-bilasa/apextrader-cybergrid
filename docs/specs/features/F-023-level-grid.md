# F-023 — Level grid

```yaml
id: F-023
status: pending
depends: [F-014]
estimate: 15m
```

## Outcome

42 rows; active level uses `.cyber-level-active`; shows base + target per row.

## Acceptance criteria

- [ ] Scrollable list max-height per UI_STYLE_GUIDE
- [ ] `getLevelMetrics` per row

## Files allowed

- `src/components/LevelGrid.jsx`, `Dashboard.jsx` wire

## Out of scope

- Preview mode (optional later)
