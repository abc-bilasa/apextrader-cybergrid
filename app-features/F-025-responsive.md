# F-025 — Responsive pass

```yaml
id: F-025
title: Mobile responsive pass
spec: ../docs/specs/features/F-025-responsive.md
imp: IMP-045
completed: 2026-10-17
built: yes
tested: yes
deployed: n/a
```

## Summary

Dashboard uses `xl` (≥1280px) 3-column grid; mobile stack with overflow guards and shorter level-matrix scroll.

## Built

- [x] `src/components/Dashboard.jsx`
- [x] `src/index.css`

## Tested

| Check | Result |
|-------|--------|
| `npm run build` | pass |
