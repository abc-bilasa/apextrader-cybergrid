# Spec-driven development (15-minute features)

Build the app as a **ordered backlog of small features**. Each feature has a spec file, fits **~15 minutes**, ships **one vertical slice**, and must be **verified + documented** before the next feature starts.

## One iteration (every sitting)

```text
open session → pick ONE feature from BACKLOG → read spec → implement ONLY spec scope
→ verify (spec checklist) → close session → mark feature done in BACKLOG
```

| Step | Action |
|------|--------|
| 1 | Skill `apextrader-session-open` |
| 2 | Read `docs/specs/BACKLOG.md` → **Next feature** |
| 3 | Read `docs/specs/features/<id>.md` |
| 4 | Implement; touch only **Files allowed** in spec |
| 5 | Run spec **Verify** + `npm run build` (if JS changed) |
| 6 | Mark spec `status: done`; update BACKLOG; IMPLEMENTATION_LOG |
| 7 | Skill `apextrader-session-close` |

## Feature spec rules

- **Single outcome** — one sentence “done” state.
- **≤15 min** — if larger, split (add F-0xx-a / F-0xx-b in BACKLOG).
- **No scope creep** — “Out of scope” section is binding.
- **Depends** — do not start until dependencies are `done`.
- **Quality** — acceptance criteria are mandatory; no “mostly done”.

## Documentation per feature

| Phase | Location |
|-------|----------|
| **Plan** | `docs/specs/features/F-0XX-*.md` |
| **Ship record** | `app-features/F-0XX-*.md` + [app-features/INDEX.md](../app-features/INDEX.md) |

On `done`:

1. Spec frontmatter `status: done` + `completed: YYYY-MM-DD`
2. **`app-features/`** — create/update feature record from `app-features/_TEMPLATE.md`; update **INDEX** (built / tested / deployed)
3. `docs/specs/BACKLOG.md` row → `done`
4. `docs/DEVELOPMENT.md` file map if code touched
5. `docs/IMPLEMENTATION_LOG.md` row (`FEATURE`, cite `F-0xx`)
6. `docs/SESSION_HANDOFF.md` — next feature ID

## Cursor prompt (copy-paste)

```text
Build feature F-0XX only. Read docs/specs/features/F-0XX-*.md and UI_STYLE_GUIDE if UI.
Do not start other features. Verify per spec, then close session.
```

## Related

- Backlog: [specs/BACKLOG.md](./specs/BACKLOG.md)
- Template: [specs/TEMPLATE.md](./specs/TEMPLATE.md)
- [RULEBOOK.md](./RULEBOOK.md) · [TESTING.md](./TESTING.md)
