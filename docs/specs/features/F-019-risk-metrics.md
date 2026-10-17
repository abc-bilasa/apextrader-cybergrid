# F-019 — Risk metrics panel

```yaml
id: F-019
status: done
depends: [F-014]
estimate: 15m
```

## Outcome

Left panel shows base capital, +50% target, −30% / −60% limits via `getLevelMetrics`.

## Acceptance criteria

- [x] `.cyber-metric`, `.cyber-text-profit`, `.cyber-text-risk`
- [x] Values match `formulas.js` for `current_level`

## Files allowed

- `src/components/Dashboard.jsx`

## Out of scope

- Milestones card (F-020)
