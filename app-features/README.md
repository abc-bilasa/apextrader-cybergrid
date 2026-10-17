# App features — build record

**Living record** of what was **built**, **tested**, and **deployed** for each feature.

| Folder | Purpose |
|--------|---------|
| [`docs/specs/features/`](../docs/specs/features/) | **Before build** — plan, acceptance criteria, scope |
| **`app-features/`** (here) | **After build** — what shipped, how it was verified, deploy status |

## When to create / update

**Every time a feature is completed** (`docs/specs/BACKLOG.md` → `done`):

1. Create or update `app-features/F-0XX-<short-name>.md` from [`_TEMPLATE.md`](./_TEMPLATE.md)
2. Update [`INDEX.md`](./INDEX.md) row (built / tested / deployed)
3. Link spec: `docs/specs/features/...`

## Status meanings

| Field | Values |
|-------|--------|
| **Built** | `yes` / `partial` / `no` — code or docs delivered per spec |
| **Tested** | `yes` / `partial` / `no` / `n/a` — verify steps run (note which) |
| **Deployed** | `yes` / `no` / `n/a` — on GitHub Pages / Supabase prod; `n/a` for docs-only |

## Quick view

See **[INDEX.md](./INDEX.md)** for at-a-glance status of all F-001–F-027.
