# F-019 — Risk metrics panel

```yaml
id: F-019
title: Risk metrics left panel
spec: ../docs/specs/features/F-019-risk-metrics.md
imp: IMP-039
completed: 2026-10-17
built: yes
tested: yes
deployed: n/a
```

## Summary

Left column shows base capital, +50% target, −30% daily DD, −60% max DD from `getLevelMetrics(current_level)`.

## Built

- [x] `src/components/Dashboard.jsx`

## Tested

| Check | Result |
|-------|--------|
| `npm run build` | pass |
