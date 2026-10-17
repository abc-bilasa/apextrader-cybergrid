# F-008 — Auth UI shell

```yaml
id: F-008
status: done
completed: 2026-10-17
depends: [F-003]
estimate: 15m
```

## Outcome

Auth screen matches UI_STYLE_GUIDE (layout, classes); form fields present; no API yet.

## Acceptance criteria

- [x] `Auth.jsx` uses `.cyber-card`, `.cyber-input`, `.cyber-btn-primary`, `.cyber-label`
- [x] Toggle sign-up / sign-in mode UI
- [x] `npm run build` passes

## Files allowed

- `src/components/Auth.jsx`

## Out of scope

- Supabase calls (F-009+)
