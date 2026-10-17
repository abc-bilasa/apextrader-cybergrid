# Pre-build sign-off (required once)

**Do not run Session B (database apply) or Session C+ (UI/RPC integration) until every item below is checked.** This prevents the most common rework: wrong rules, wrong URLs, wrong repo layout.

Copy completed checkboxes into [SESSION_HANDOFF.md](./SESSION_HANDOFF.md) session log when done.

---

## A. Product rules (pick one path for D4)

Demotion behavior must be **LOCKED** before SQL is applied to a real Supabase project.

- [x] **D4-A (recommended for PRD SQL):** Demote −2 levels only at **−30%** from level baseline; **−60%** is UI-only warning → set D4 status to **LOCKED** with this text in [DECISIONS.md](./DECISIONS.md)
- [ ] **D4-B:** Also demote at **−60%** → requires `002_enforce_max_dd.sql` (do not patch `001` after apply)

**Signed (initial):** Amit (D4-A) **Date:** 2026-10-17

---

## B. Other decisions to lock or accept DEFAULT

| ID | Action | Done |
|----|--------|------|
| D5 | Capital stays at trade result after level change (no reset) | [x] Accept LOCKED |
| D6 | Email confirm: **Off** for dev (see ENVIRONMENT.md) | [x] |
| D7 | Sign-up: **Open** | [x] |
| D8 | PWA deferred (SPA only for MVP) | [x] Accept DEFAULT |
| D9 | Git root = `apextrader-cybergrid/` | [x] Accept DEFAULT |
| D11 | Daily P&L bar chart by calendar day | [x] Accept DEFAULT |
| D12 | Same trade: promotion before demotion | [x] Accept LOCKED |

---

## C. Infrastructure registry

Fill [ENVIRONMENT.md](./ENVIRONMENT.md) **Project registry** (no secrets):

- [x] GitHub user/org + repo name decided → repo name `apextrader-cybergrid` (user/org TBD at push)
- [x] Planned production URL written down → `https://<github-user>.github.io/apextrader-cybergrid/`
- [x] Supabase project created (name + region) — **F-002** (2026-10-17; registry details in ENVIRONMENT.md)
- [x] `VITE_BASE_PATH` value decided → `/apextrader-cybergrid/`

---

## D. Files frozen for MVP

- [x] `supabase/migrations/001_initial_schema.sql` reviewed (do not edit after apply—use `002_`)
- [x] `src/lib/formulas.js` matches SQL constants (`npm run verify:formulas` OK 2026-10-17)
- [x] `.env.local` exists locally; secrets **not** committed — **F-003** (2026-10-17)

---

## E. Auth URLs (before first production deploy)

- [ ] Supabase Site URL + Redirect URLs include `http://localhost:5173/**`
- [ ] Same for `https://<user>.github.io/<repo>/**` (even if deploy is later)

*(Section E — feature F-011 / after F-005.)*

---

## Gate status

| Gate | Status |
|------|--------|
| Pre-build sign-off complete (A, B, D + C decisions) | **DONE** (2026-10-17, F-001) |
| `001` applied in Supabase | NOT DONE → **F-002** |
| `package-lock.json` committed after first `npm install` | NOT DONE → **F-004** |

When all sections A–D are checked, set **Gate status → DONE** here and in SESSION_HANDOFF.
