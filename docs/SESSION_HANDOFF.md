# Session handoff (living document)

**Mandatory.** No session is “finished” until the **END ritual** below is complete.

---

## START ritual (beginning of every sitting)

**Cursor:** invoke skill `apextrader-session-open` (or say “open session”).

Do this before writing code:

- [ ] Read **Last updated**, **Current state**, **Next session**, **Blockers**
- [ ] Read [RULEBOOK.md](./RULEBOOK.md) §2 + [DECISIONS.md](./DECISIONS.md) (D4 if doing infra/DB)
- [ ] If touching DB or RPC: confirm [PRE_BUILD_SIGNOFF.md](./PRE_BUILD_SIGNOFF.md) gate is **DONE**
- [ ] `git pull` if using remote
- [ ] One-line goal (session log): `START: …`

---

## END ritual (required — ~5 min)

**Cursor:** invoke skill `apextrader-session-close` (or say “close session”).

- [x] **Last updated** date + who *(2026-10-18, Session 3 close — Amit + Cursor)*
- [x] **Current state** table accurate
- [x] **Next session** set (Supabase `002`–`004` + F-040 planning)
- [x] **Completed checklist** updated
- [x] **Blockers** updated
- [x] **Session log** appended (`END Session 3`)
- [x] [DEVELOPMENT.md](./DEVELOPMENT.md) file map current
- [x] [IMPLEMENTATION_LOG.md](./IMPLEMENTATION_LOG.md) through **IMP-083**
- [x] [DECISIONS.md](./DECISIONS.md) — D14/D15 DEFAULT added (F-038/F-039); D4-A LOCKED unchanged

---

## Last updated

- **Date:** 2026-10-19  
- **By:** Amit + Cursor  
- **Session focus:** F-043 profile page deployed  
- **Production:** https://abc-bilasa.github.io/apextrader-cybergrid/ (app @ `36c3ad9`; docs `04890ea` REPOSITORY_MAP)  

---

## Session 0 — what was completed (do not redo)

| Deliverable | Status |
|-------------|--------|
| Vite + React + Tailwind app scaffold | Done |
| `supabase/migrations/001_initial_schema.sql` | Written, **not applied** |
| `formulas.js`, `supabase.js`, `chartTheme.js`, global `.cyber-*` CSS | Done |
| Component stubs (Auth, Dashboard, TradeLogger, charts, grid) | Stub only |
| `npm install`, `package-lock.json`, `npm run build` + `verify:formulas` | Passes locally |
| Node 24 LTS installed on machine | Done |
| `PRD.txt` in repo; duplicate `.docx` removed | Done |
| Process docs (14+), RULEBOOK, EFFICIENT_WORKFLOW, UI_STYLE_GUIDE | Done |
| IMPLEMENTATION_LOG IMP-001 → IMP-015 | Done |
| Cursor rules (repo + parent workspace) | Done |
| GitHub repo / Supabase / `.env.local` | **Not started** |
| PRE_BUILD_SIGNOFF | **Not done** |

---

## Gate status (do not skip)

| Gate | Status |
|------|--------|
| [PRE_BUILD_SIGNOFF](./PRE_BUILD_SIGNOFF.md) | **DONE** (F-001, D4-A) |
| Migration `001` applied in Supabase | **DONE** (F-002, 2026-10-17) |
| `package-lock.json` committed to git | **DONE** (F-004, `main` @ app root) |
| GitHub Actions deploy verified | **DONE** (2026-10-17, Pages live) |

---

## Current state (honest snapshot)

| Area | Status |
|------|--------|
| Repo on GitHub | https://github.com/abc-bilasa/apextrader-cybergrid (F-005) |
| Supabase project | Created; `001` applied (3 tables) |
| `.env.local` | Created (gitignored); dev on :5173 |
| SQL migration file | Ready — `supabase/migrations/001_initial_schema.sql` |
| Auth | F-008–F-010 done (sign-up/in, sign-out) |
| Dashboard | F-001–F-043 on production; migrations `002`–`005` **apply in Supabase** |
| `formulas.js` / theme / charts tokens | Implemented; profile-aware metrics (D15) |
| CI workflow file | Present — `.github/workflows/deploy.yml` |
| Production URL | https://abc-bilasa.github.io/apextrader-cybergrid/ |
| Local git | `main` synced with `origin/main` @ `2e4229a` (app features @ `1c33fbb`) |
| Documentation | Backlog 43/43; partial TESTING matrix; handoff blockers = Supabase apply |

---

## Next session — spec-driven

**Backlog:** [specs/BACKLOG.md](./specs/BACKLOG.md) — **F-001–F-043 shipped**

**START prompt:** `Read SESSION_HANDOFF.md — deploy F-043 if ready, apply Supabase 002–005, npm run check:migrations, prod smoke.`

**Next (Amit):**

1. SQL Editor: run `002`–`005` per [supabase/APPLY.md](../supabase/APPLY.md); `npm run check:migrations`  
2. Local: **Dashboard | Profile** — rules, CSV import, session review, level history on Profile; trading cockpit on Dashboard  
3. Say **deploy** to push F-043 to Pages

---

## Blockers

| Blocker | Owner | Notes |
|---------|--------|-------|
| Apply `002_simulate_trade.sql` | Amit | F-032 trade preview |
| Apply `003_session_reviews.sql` | Amit | F-035 save reviews |
| Apply `004_rule_profiles.sql` | Amit | F-039 profile switch + RPC rules |
| Apply `005_trade_journal_crud.sql` | Amit | F-042 journal edit/delete |

---

## Manual test sign-off (F-026)

Level-1 account baseline: capital ₹10,000. Method: mirror `log_trade` rules in Node + `npm run verify:formulas` (2026-10-17).

| Case | Input | Expected | Result | Notes |
|------|--------|----------|--------|-------|
| **T1** | PnL +1000 @ L1 | Cap ₹11,000; L1; `NONE` | **PASS** | Sim output `cap:11000, lv:1, tr:NONE` |
| **T4** | PnL −3000 @ L1 (from 10k) | Cap ₹7,000; L1; `DRAWDOWN_HIT` | **PASS** | Sim output `cap:7000, lv:1, tr:DRAWDOWN_HIT` |

**UI spot-check (optional):** On production or local, log T1-sized trade and confirm header/charts update (covered in F-017 deploy verification).

---

## Production smoke (F-027)

| Check | Result | Notes |
|-------|--------|-------|
| P1 Assets | **PASS** | 2026-10-17 automated — Pages 200 |
| P2 Sign-in | **PASS** | Amit verified on production |
| P3 `log_trade` | **PASS** | Amit verified on production |
| P4 Session refresh | **PASS** | Amit verified on production |

---

## Credentials / config (no secrets on this page)

| Item | Status |
|------|--------|
| `.env.local` | Created locally |
| GitHub Actions secrets | Set (VITE_SUPABASE_*) |
| Supabase Auth URLs | Configured (local + Pages) |

---

## Completed checklist (from roadmap)

### Week 1

- [x] Docs + scaffold  
- [x] Anti-rework gates + migration SQL file  
- [x] UI style guide + global theme  
- [x] RULEBOOK + efficient workflow  
- [x] **Session A** — accounts & repo (F-004–F-005, Pages F-006/007)  
- [x] Session B — database apply + verify (F-002)  
- [x] Session C — auth shell + sign-up/in (F-008–F-010); dashboard header F-012  

### Week 2–3

- [x] Session 2 — F-013→F-027 (dashboard, trading, charts, grid, polish, test/smoke sign-off)
- [ ] Optional: Vitest / Playwright ([TESTING.md](./TESTING.md) future automation)

---

## Notes for next developer / AI

- **Start prompt:** see **Next session** above.  
- PRD: [`../PRD.txt`](../PRD.txt)  
- UI work: always [UI_STYLE_GUIDE.md](./UI_STYLE_GUIDE.md)  
- Do not re-scaffold or duplicate docs unless a gap is found  

---

## Session log (append-only)

| Date | Summary |
|------|---------|
| 2026-10-17 | Created scaffold + initial `docs/*`. |
| 2026-10-17 | PRE_BUILD, DEFINITION_OF_DONE, `001` SQL, verify script, Cursor rules. |
| 2026-10-17 | Node/npm install; build OK; PRD moved; docx removed. |
| 2026-10-17 | IMPLEMENTATION_LOG + IMP-001–012. |
| 2026-10-17 | UI_STYLE_GUIDE + global CSS (IMP-013). |
| 2026-10-17 | EFFICIENT_WORKFLOW (IMP-014); RULEBOOK + rules (IMP-015). |
| 2026-10-17 | **END Session 0:** Handoff complete — next = Efficient Workflow Session 1 (infra). |
| 2026-10-17 | Added Cursor skills apextrader-session-open / apextrader-session-close (IMP-017). |
| 2026-10-17 | START: Efficient Workflow Session 1 — infra (PRE_BUILD, Supabase, GitHub, CI); pending Amit confirm. |
| 2026-10-17 | Spec-driven backlog F-001–F-027 + SPEC_DRIVEN.md (IMP-018). Next feature F-001. |
| 2026-10-17 | END: F-001 done — D4-A LOCKED, PRE_BUILD gate DONE (IMP-019). Next F-002. |
| 2026-10-17 | START: F-002 — APPLY.md ready; awaiting Supabase SQL apply by Amit. |
| 2026-10-17 | **END:** F-002 partial — docs Q&A; migration still pending Amit dashboard apply (IMP-021). Next: **`F-002 applied`** then F-003. |
| 2026-10-17 | START: Finish F-002 — Supabase project + apply `001` (or close feature if **`F-002 applied`**). |
| 2026-10-17 | F-002 done — 3 tables confirmed; IMP-022. Next F-003 `.env.local`. |
| 2026-10-17 | F-003 done — `.env.local` + dev server OK; IMP-023. Next F-004 git init. |
| 2026-10-17 | F-004 done — git init + first commit at app root; IMP-024. Next F-005 GitHub push. |
| 2026-10-17 | F-005 done — push to abc-bilasa/apextrader-cybergrid; IMP-025. Next F-006 Actions secrets. |
| 2026-10-17 | **END Session 1:** F-002–F-012 + F-006/007 Pages live (12/27). Next F-013 layout (IMP-032). |
| 2026-10-17 | START: Session 2 — F-013 dashboard 12-column layout. |
| 2026-10-17 | F-013/F-014 done (IMP-033/034). F-015 TradeLogger form UI (IMP-035). Next F-016 RPC. |
| 2026-10-17 | F-016 `log_trade` wired in TradeLogger (IMP-036). Next F-017 dashboard refresh. |
| 2026-10-17 | F-017 post-trade refresh via `onTradeLogged` (IMP-037). Next F-018 feedback. |
| 2026-10-17 | F-018 confetti + trigger-based audio (IMP-038). Next F-019 risk panel. |
| 2026-10-17 | F-019 risk metrics panel (IMP-039). Next F-020 milestones. |
| 2026-10-17 | F-020 D1–D4 milestones card (IMP-040). Next F-021 equity chart. |
| 2026-10-17 | F-021 equity area chart (IMP-041). Next F-022 daily P&L bars. |
| 2026-10-17 | F-022 daily P&L bars (IMP-042). Next F-023 level grid. |
| 2026-10-17 | F-023 42-level grid (IMP-043). Next F-024 loading/errors. |
| 2026-10-17 | F-024 loading/error polish (IMP-044). Next F-025 responsive. |
| 2026-10-17 | F-025 responsive dashboard (IMP-045). Next F-026 manual tests. |
| 2026-10-17 | F-026 T1/T4 sign-off (IMP-046). Next F-027 prod smoke. |
| 2026-10-17 | F-027 production smoke P1–P4 (IMP-047). **Backlog 27/27 complete.** |
| 2026-10-17 | **END Session 2:** MVP shipped in repo (F-013–F-027); prod deploy `5552cd3`; local commit+push pending for F-025–F-027 (IMP-048). |
| 2026-10-18 | START: Session 3 — sync deploy (uncommitted F-025–F-027) or post-MVP maintenance. |
| 2026-10-18 | Deploy `20e875a` — F-025 responsive + F-026/F-027 sign-off docs; Pages #14 success. |
| 2026-10-18 | F-028 level history panel + INDEX counts (IMP-050). Next: commit + deploy. |
| 2026-10-18 | Deploy `c8e551b` — F-028 to Pages (Actions success). |
| 2026-10-18 | F-029 headroom panel (IMP-053); verify + build pass. |
| 2026-10-18 | Deploy `43281ea` — F-029 to Pages (Actions success). |
| 2026-10-18 | F-030 quick-log presets (IMP-055); build pass. |
| 2026-10-18 | Deploy `b05115f` — F-030 to Pages. |
| 2026-10-18 | F-031 intraday pacing (IMP-057). |
| 2026-10-18 | F-032 simulate_trade + preview UI (IMP-058). |
| 2026-10-18 | F-033 consistency rule panel (IMP-059). |
| 2026-10-18 | Deploy `af0dfaa` — F-031–F-033 to Pages. |
| 2026-10-18 | F-034 discipline panel (IMP-061). |
| 2026-10-18 | F-035 session review (IMP-062). |
| 2026-10-18 | F-036 trade journal table (IMP-063). |
| 2026-10-18 | Deploy `b3efe26` — F-034–F-036 to Pages. |
| 2026-10-18 | F-037 CSV import (IMP-065). |
| 2026-10-18 | Deploy `9a14b3e` — F-037 to Pages. |
| 2026-10-18 | F-038 loss-streak cool-down (IMP-067/068, D14). |
| 2026-10-18 | F-039 rule profiles + `004_rule_profiles.sql` (IMP-069–071, D15). |
| 2026-10-18 | Deploy `1c33fbb` — F-038/F-039 to Pages; docs `af85674` (IMP-072). |
| 2026-10-18 | **END Session 3:** Backlog 39/39. Next session = Supabase `002`–`004` + smoke + F-040 planning. |
| 2026-10-19 | START: Apply Supabase `002`–`004`, prod smoke F-032/F-035/F-039; then F-040 or commit pending handoff docs. |
| 2026-10-19 | F-040 trade journal CSV export (IMP-075). |
| 2026-10-19 | Deploy `996495a` — F-040 to Pages (IMP-076). |
| 2026-10-19 | F-043 profile page + migration status panel (IMP-083); build pass; deploy pending. |
| 2026-10-19 | Deploy `7673b98` — F-043 to Pages (IMP-084). |
| 2026-10-19 | F-044 landing page + subscription tiers UI (IMP-085); deploy pending. |
| 2026-10-19 | Deploy `36c3ad9` — F-044 to Pages (IMP-086). |
| 2026-10-19 | `docs/REPOSITORY_MAP.md` — full repo file/folder guide (IMP-087). |
