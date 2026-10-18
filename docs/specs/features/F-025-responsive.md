# F-025 — Responsive pass

```yaml
id: F-025
status: done
depends: [F-023]
estimate: 15m
```

## Outcome

U1–U2 from TESTING.md satisfied.

## Acceptance criteria

- [x] Mobile stack; desktop 3-column
- [x] Level grid scroll usable on small screens

## Notes

- **U1:** 3-column layout at Tailwind `xl` (≥1280px) per TESTING.md.
- **U2:** `.cyber-dashboard-level-panel` caps matrix scroll height on viewports &lt;1280px.

## Files allowed

- `Dashboard.jsx`, component CSS classes only

## Out of scope

- New features
