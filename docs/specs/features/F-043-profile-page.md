# F-043 — User profile page

```yaml
id: F-043
status: done
depends: [F-012]
estimate: 45m
```

## Outcome

**Dashboard | Profile** nav. Profile groups account, rules, journal import, reviews, level history, and migration status in themed sections.

## Acceptance criteria

- [x] `ProfilePage` + `ProfileSection` + `AppNav`
- [x] Configuration panels moved off main dashboard grid
- [x] `MigrationStatusPanel` (client probe)
- [x] Dashboard retains trading, charts, journal, cool-down near logger

## Out of scope

- Avatar upload; password change (Supabase Auth UI); react-router
