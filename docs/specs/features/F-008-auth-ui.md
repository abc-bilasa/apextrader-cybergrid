# F-008 — Auth UI shell

```yaml
id: F-008
status: pending
depends: [F-003]
estimate: 15m
```

## Outcome

Auth screen matches UI_STYLE_GUIDE (layout, classes); form fields present; no API yet.

## Acceptance criteria

- [ ] `Auth.jsx` uses `.cyber-card`, `.cyber-input`, `.cyber-btn-primary`, `.cyber-label`
- [ ] Toggle sign-up / sign-in mode UI
- [ ] `npm run build` passes

## Files allowed

- `src/components/Auth.jsx`

## Out of scope

- Supabase calls (F-009+)
