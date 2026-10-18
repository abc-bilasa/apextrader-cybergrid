# F-035 — Guided session review

```yaml
id: F-035
status: done
depends: [F-010]
estimate: 30m
```

## Outcome

Short end-of-day form: plan followed (yes/partial/no), best & worst decision; one row per user per local `review_day` in `session_reviews`.

## Acceptance criteria

- [x] `003_session_reviews.sql` + RLS
- [x] Load/save today via Supabase upsert
- [x] Banner if table not applied

## Files allowed

- `003_session_reviews.sql`, `SessionReviewPanel.jsx`, `Dashboard.jsx`, `APPLY.md`, `DATABASE.md`

## Out of scope

- Review history calendar; emotion tags (F-034/F-038)
