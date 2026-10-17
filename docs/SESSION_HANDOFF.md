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

- [x] **Last updated** date + who *(2026-10-17, sitting close — F-002 partial)*
- [x] **Current state** table accurate
- [x] **Next session** set (**F-002** finish → **F-003**)
- [x] **Completed checklist** updated
- [x] **Blockers** updated
- [x] **Session log** appended
- [x] [DEVELOPMENT.md](./DEVELOPMENT.md) file map current
- [x] [IMPLEMENTATION_LOG.md](./IMPLEMENTATION_LOG.md) through **IMP-021**
- [x] [DECISIONS.md](./DECISIONS.md) — no new locks (D4-A LOCKED from F-001)

---

## Last updated

- **Date:** 2026-10-17  
- **By:** Amit + Cursor  
- **Session focus:** F-002 onboarding (APPLY steps, feature map, status); **no Supabase SQL applied this sitting**  

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
| GitHub Actions deploy verified | **NOT DONE** |

---

## Current state (honest snapshot)

| Area | Status |
|------|--------|
| Repo on GitHub | Not created (local git OK — F-004) |
| Supabase project | Created; `001` applied (3 tables) |
| `.env.local` | Created (gitignored); dev on :5173 |
| SQL migration file | Ready — `supabase/migrations/001_initial_schema.sql` |
| Auth / Dashboard / charts / grid | Stubs — implement per `UI_STYLE_GUIDE.md` |
| `formulas.js` / theme / charts tokens | Implemented |
| CI workflow file | Present — `.github/workflows/deploy.yml` |
| Production URL | — |
| Documentation | Complete for multi-week build (see RULEBOOK index) |

---

## Next session — spec-driven

**Backlog:** [specs/BACKLOG.md](./specs/BACKLOG.md) — **Next feature: `F-005`**

**Read:** [features/F-005-github-push.md](./specs/features/F-005-github-push.md)

**Goal:** **F-005** — create GitHub repo `apextrader-cybergrid`, add remote, push `main`.

---

## Blockers

| Blocker | Owner | Notes |
|---------|--------|-------|
| _none_ | — | F-003: need API URL + anon key in `.env.local` only |

---

## Credentials / config (no secrets on this page)

| Item | Status |
|------|--------|
| `.env.local` | Created locally |
| GitHub Actions secrets | Not set |
| Supabase Auth URLs | Not configured |

---

## Completed checklist (from roadmap)

### Week 1

- [x] Docs + scaffold  
- [x] Anti-rework gates + migration SQL file  
- [x] UI style guide + global theme  
- [x] RULEBOOK + efficient workflow  
- [ ] **Session A** — accounts & repo *(next)*  
- [ ] Session B — database apply + verify *(merge with Session 1 fast path)*  
- [ ] Session C — auth + shell  

### Week 2–3

- [ ] Sessions D–I (see [ROADMAP.md](./ROADMAP.md))

---

## Notes for next developer / AI

- **Start prompt:** `Goal: Finish F-002 (Supabase apply) or F-003 after F-002 applied. Read docs/SESSION_HANDOFF.md + supabase/APPLY.md.`  
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
