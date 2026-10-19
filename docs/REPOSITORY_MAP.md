# Repository map — files and folders

**App root:** `apextrader-cybergrid/` (this is the git repository you push to GitHub).

This document explains **what each tracked path is for**. Paths that are **not** listed here are usually generated locally and gitignored: `node_modules/`, `dist/`, `.env.local`.

**Last aligned with backlog:** F-001–F-044 (2026-10-19).

---

## Top-level tree (overview)

```text
apextrader-cybergrid/
├── .cursor/          Cursor rules & session skills
├── .github/          GitHub Actions (Pages deploy)
├── app-features/     Per-feature ship status (built / tested / deployed)
├── docs/             Process, specs, architecture, this map
├── public/           Static assets copied into the Vite build
├── scripts/          Node maintenance scripts (no runtime in browser)
├── src/              React SPA (UI + client logic)
├── supabase/         SQL migrations & apply instructions
├── PRD.txt           Product requirements (source text)
├── README.md         Repo entry point for humans
├── index.html        Vite HTML shell
├── package.json      Dependencies & npm scripts
├── package-lock.json Lockfile for reproducible installs
├── vite.config.js    Vite build (incl. GitHub Pages base path)
├── tailwind.config.js Tailwind theme extensions
├── postcss.config.js PostCSS pipeline for Tailwind
└── .env.example      Template for local Supabase keys (copy → .env.local)
```

---

## Root files

| Path | Purpose |
|------|---------|
| `README.md` | Quick links to docs, setup commands, and workflow pointers. |
| `PRD.txt` | Original product requirements (levels, journal, UI layout). Precedence below locked `DECISIONS.md` entries. |
| `package.json` | App metadata, `dev` / `build` / `verify:formulas` / `check:migrations` scripts, dependency versions. |
| `package-lock.json` | Exact dependency tree for CI and `npm install`. |
| `index.html` | HTML entry: fonts, meta description (F-044), mounts `#root`, loads `src/main.jsx`. |
| `vite.config.js` | Vite + React plugin; `base` from `VITE_BASE_PATH` for GitHub Pages subpath deploy. |
| `tailwind.config.js` | Tailwind content paths and `cyber-*` color extensions. |
| `postcss.config.js` | Wires Tailwind and Autoprefixer for production CSS. |
| `.env.example` | Documents `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`; copy to `.env.local` (never commit secrets). |
| `.gitignore` | Excludes `node_modules`, `dist`, `.env.local`, editor junk. |

---

## `.cursor/` — Cursor IDE guidance

| Path | Purpose |
|------|---------|
| `.cursor/rules/apextrader-cybergrid.mdc` | Always-on rules: read handoff/RULEBOOK, one slice per task, `log_trade` only for level/capital, no edits to applied `001` migration. |
| `.cursor/skills/apextrader-session-open/SKILL.md` | START ritual: handoff, gates, session goal. |
| `.cursor/skills/apextrader-session-close/SKILL.md` | END ritual: handoff, IMP log, file map updates. |
| `.cursor/skills/apextrader-feature-build/SKILL.md` | How to implement a single backlog feature spec. |

---

## `.github/` — CI/CD

| Path | Purpose |
|------|---------|
| `.github/workflows/deploy.yml` | On push to `main`: install, build with Pages base path, upload `dist/`, deploy to GitHub Pages (D10). |

---

## `public/` — static assets

| Path | Purpose |
|------|---------|
| `public/favicon.svg` | Browser tab icon for the SPA. |

---

## `scripts/` — Node tooling (not bundled in the app)

| Path | Purpose |
|------|---------|
| `scripts/verify-formulas.mjs` | Regression checks for `formulas.js`, import/export, cooldown, calendar samples (`npm run verify:formulas`). |
| `scripts/check-migrations.mjs` | Probes Supabase for applied migrations 002–005 via anon client (`npm run check:migrations`). |

---

## `src/` — React application

### Entry & shell

| Path | Purpose |
|------|---------|
| `src/main.jsx` | React 18 root render; imports `App` and global CSS. |
| `src/App.jsx` | Auth gate: loading → session ? `Dashboard` : landing or `Auth`; passes selected subscription plan into sign-up (F-044). |
| `src/index.css` | Global `.cyber-*` components, landing grid background, dashboard layout helpers. |

### `src/components/` — UI modules (one main component per file)

| Path | Purpose |
|------|---------|
| `LandingPage.jsx` | Marketing page: hero, features, FAQ, links to pricing (F-044). |
| `PricingSection.jsx` | Three INR tiers, monthly/annual toggle, CTAs to sign-up (F-044). |
| `Auth.jsx` | Email/password sign-up and sign-in via Supabase Auth; back to landing; plan banner (F-008–F-010, F-044). |
| `Dashboard.jsx` | Signed-in shell: header, `AppNav`, data load, trade refresh, confetti/audio; embeds `RiskMetricsPanel` and `MilestonesPanel` inline (F-012–F-027+). |
| `AppNav.jsx` | Dashboard \| Profile tab switch (F-043). |
| `ProfilePage.jsx` | Profile sections: account, rules, import, review, history, DB status (F-043). |
| `ProfileSection.jsx` | Reusable titled section card for profile layout (F-043). |
| `MigrationStatusPanel.jsx` | UI for migration probe results (F-043). |
| `TradeLogger.jsx` | Log trade form, quick presets, simulate preview hook-up (F-015–F-016, F-030, F-032). |
| `TradeSimPreview.jsx` | Shows `simulate_trade` RPC outcome before commit (F-032). |
| `CooldownPanel.jsx` | Loss-streak cool-down timer and override; blocks logging when active (F-038). |
| `RuleProfilePanel.jsx` | Switch `trading_accounts.rule_profile` (prop vs grid) (F-039). |
| `CsvImportPanel.jsx` | CSV file → aggregated `log_trade` (F-037). |
| `SessionReviewPanel.jsx` | End-of-day review form; `session_reviews` table (F-035). |
| `LevelHistory.jsx` | List of level promotions/demotions (F-028). |
| `HeadroomPanel.jsx` | Drawdown / promotion headroom vs rules (F-029). |
| `DailyPacingPanel.jsx` | Intraday pacing vs D1–D4 targets (F-031). |
| `ConsistencyPanel.jsx` | 40% single-day vs total profit rule (F-033). |
| `DisciplinePanel.jsx` | Behavior / discipline analytics (F-034). |
| `TradeJournalTable.jsx` | Trade list, CSV export, edit/delete entry points (F-036, F-040, F-042). |
| `TradeJournalEditDialog.jsx` | Modal for `update_trade` / `delete_trade` (F-042). |
| `EquityChart.jsx` | Recharts equity curve (F-021). |
| `DailyPnlChart.jsx` | Daily P&L bar chart (F-022). |
| `PnlCalendarPanel.jsx` | Calendar heatmap + day drill-down (F-041). |
| `LevelGrid.jsx` | 42-level matrix visualization (F-023). |

### `src/hooks/`

| Path | Purpose |
|------|---------|
| `useLossStreakCooldown.js` | Derives cool-down state from recent trades for `CooldownPanel` (F-038). |

### `src/lib/` — pure logic & clients

| Path | Purpose |
|------|---------|
| `supabase.js` | Supabase JS client from `import.meta.env` (anon key only). |
| `formulas.js` | Level metrics, INR formatting, headroom, pacing, consistency; profile-aware thresholds (D15). |
| `chartTheme.js` | Recharts colors/axes aligned with UI style guide. |
| `ruleProfiles.js` | Prop vs Cyber-Grid profile definitions and resolver (F-039). |
| `tradeDay.js` | Local date keys for “today” in reviews and calendar. |
| `lossStreakCooldown.js` | Cool-down duration/streak rules (F-038). |
| `disciplineStats.js` | Aggregates for discipline panel (F-034). |
| `csvTradeImport.js` | Parse broker CSV → single P&L for import (F-037). |
| `tradeCsvExport.js` | Build downloadable journal CSV (F-040). |
| `pnlCalendar.js` | Aggregate trades by day for calendar UI (F-041). |
| `migrationProbe.js` | Client-side checks for optional DB functions/tables (F-043). |
| `subscriptionPlans.js` | Marketing tier names, INR prices, feature bullets (F-044; no billing backend yet). |

---

## `supabase/` — database

| Path | Purpose |
|------|---------|
| `supabase/APPLY.md` | Step-by-step: run migrations in Supabase SQL Editor, verify `log_trade`. |
| `supabase/AUTH_URLS.md` | Redirect URLs for local dev and GitHub Pages. |
| `supabase/migrations/001_initial_schema.sql` | **Frozen after apply (D13):** accounts, trades, level history, `log_trade` RPC, RLS. |
| `supabase/migrations/002_simulate_trade.sql` | `simulate_trade` RPC for pre-commit preview (F-032). |
| `supabase/migrations/003_session_reviews.sql` | `session_reviews` table + RLS (F-035). |
| `supabase/migrations/004_rule_profiles.sql` | `rule_profile` on accounts; updates `log_trade` / `simulate_trade` (F-039). |
| `supabase/migrations/005_trade_journal_crud.sql` | `update_trade` / `delete_trade` with journal replay (F-042, D16). |

Apply order: **001 → 002 → 003 → 004 → 005** (004 before 005).

---

## `docs/` — documentation

### Index & process

| Path | Purpose |
|------|---------|
| `docs/README.md` | Documentation table of contents. |
| `docs/RULEBOOK.md` | Master rules: slices, precedence, architecture, sessions. |
| `docs/SPEC_DRIVEN.md` | How to ship one F-### spec per task. |
| `docs/EFFICIENT_WORKFLOW.md` | Fast deploy path, Cursor prompts, token discipline. |
| `docs/SESSION_HANDOFF.md` | Living state: blockers, next session, production commit. |
| `docs/IMPLEMENTATION_LOG.md` | Append-only audit (IMP-### rows). |
| `docs/DECISIONS.md` | Locked/default product & tech decisions (D1, D4, D13–D16, …). |
| `docs/PRE_BUILD_SIGNOFF.md` | Gate before first DB integration. |
| `docs/DEFINITION_OF_DONE.md` | Done criteria for features/sessions. |
| `docs/PROGRESS_AND_CONFLICTS.md` | PRD vs repo conflict resolution. |
| `docs/ROADMAP.md` | Week/session planning (historical + forward). |
| `docs/REPOSITORY_MAP.md` | **This file** — full repo purpose map. |

### Build, design, ops

| Path | Purpose |
|------|---------|
| `docs/DEVELOPMENT.md` | Daily workflow and implementation file map (subset of this doc). |
| `docs/ARCHITECTURE.md` | SPA ↔ Supabase ↔ RPC boundaries. |
| `docs/DATABASE.md` | Schema narrative, RLS, RPC behavior. |
| `docs/UI_STYLE_GUIDE.md` | Colors, typography, `.cyber-*`, dashboard layout. |
| `docs/SETUP.md` | First-time machine setup. |
| `docs/ENVIRONMENT.md` | Env vars and secrets. |
| `docs/DEPLOYMENT.md` | GitHub Pages, Actions, `VITE_BASE_PATH`. |
| `docs/GITHUB_PAGES_SETUP.md` | Pages-specific setup notes. |
| `docs/TESTING.md` | Manual test matrix and formula verification. |
| `docs/TROUBLESHOOTING.md` | Common errors and fixes. |
| `docs/AI_CONTEXT.md` | Short context bundle for AI sessions. |

### `docs/specs/` — feature specifications

| Path | Purpose |
|------|---------|
| `docs/specs/BACKLOG.md` | Ordered backlog F-001–F-044 with status and links. |
| `docs/specs/FEATURE_CANDIDATES.md` | Post-backlog ideas ranked for future slices. |
| `docs/specs/TEMPLATE.md` | Template for new feature spec files. |
| `docs/specs/features/F-001-pre-build-signoff.md` | Spec: PRE_BUILD gate and D4-A lock. |
| `docs/specs/features/F-002-supabase-migration.md` | Spec: apply `001` migration. |
| `docs/specs/features/F-003-env-local.md` | Spec: `.env.local` for dev. |
| `docs/specs/features/F-004-git-init.md` | Spec: git repository at app root. |
| `docs/specs/features/F-005-github-push.md` | Spec: remote on GitHub. |
| `docs/specs/features/F-006-github-actions.md` | Spec: Actions + Pages base path. |
| `docs/specs/features/F-007-ci-smoke.md` | Spec: CI / Pages smoke checks. |
| `docs/specs/features/F-008-auth-ui.md` | Spec: auth screen shell. |
| `docs/specs/features/F-009-auth-signup.md` | Spec: sign-up flow. |
| `docs/specs/features/F-010-auth-session.md` | Spec: session persistence. |
| `docs/specs/features/F-011-auth-urls.md` | Spec: Supabase redirect URLs. |
| `docs/specs/features/F-012-dashboard-header.md` | Spec: dashboard header metrics. |
| `docs/specs/features/F-013-dashboard-layout.md` | Spec: 12-column grid layout. |
| `docs/specs/features/F-014-dashboard-data.md` | Spec: load account + trades. |
| `docs/specs/features/F-015-trade-form.md` | Spec: trade logger UI. |
| `docs/specs/features/F-016-trade-rpc.md` | Spec: wire `log_trade`. |
| `docs/specs/features/F-017-trade-refresh.md` | Spec: refresh after trade. |
| `docs/specs/features/F-018-trade-feedback.md` | Spec: confetti + audio. |
| `docs/specs/features/F-019-risk-metrics.md` | Spec: risk metrics panel. |
| `docs/specs/features/F-020-milestones.md` | Spec: D1–D4 milestones card. |
| `docs/specs/features/F-021-equity-chart.md` | Spec: equity area chart. |
| `docs/specs/features/F-022-pnl-bars.md` | Spec: daily P&L bars. |
| `docs/specs/features/F-023-level-grid.md` | Spec: 42-level grid. |
| `docs/specs/features/F-024-errors-loading.md` | Spec: loading and error UX. |
| `docs/specs/features/F-025-responsive.md` | Spec: responsive dashboard. |
| `docs/specs/features/F-026-test-t1-t4.md` | Spec: manual T1/T4 sign-off. |
| `docs/specs/features/F-027-prod-smoke.md` | Spec: production smoke checklist. |
| `docs/specs/features/F-028-level-history-panel.md` | Spec: level transition list. |
| `docs/specs/features/F-029-headroom-meter.md` | Spec: headroom panel. |
| `docs/specs/features/F-030-quick-log.md` | Spec: quick-log presets. |
| `docs/specs/features/F-031-intraday-pacing.md` | Spec: daily pacing panel. |
| `docs/specs/features/F-032-simulate-trade.md` | Spec: simulate RPC + preview UI. |
| `docs/specs/features/F-033-consistency-rule.md` | Spec: 40% consistency panel. |
| `docs/specs/features/F-034-discipline-analytics.md` | Spec: discipline stats panel. |
| `docs/specs/features/F-035-session-review.md` | Spec: session review form + DB. |
| `docs/specs/features/F-036-trade-journal-table.md` | Spec: journal table. |
| `docs/specs/features/F-037-csv-import.md` | Spec: CSV import panel. |
| `docs/specs/features/F-038-loss-streak-cooldown.md` | Spec: cool-down advisory UI. |
| `docs/specs/features/F-039-rule-profiles.md` | Spec: rule profiles + migration 004. |
| `docs/specs/features/F-040-trade-export-csv.md` | Spec: journal CSV export. |
| `docs/specs/features/F-041-pnl-calendar.md` | Spec: P&L calendar. |
| `docs/specs/features/F-042-trade-journal-crud.md` | Spec: edit/delete trades + migration 005. |
| `docs/specs/features/F-043-profile-page.md` | Spec: profile page and nav. |
| `docs/specs/features/F-044-landing-pricing.md` | Spec: landing page and pricing tiers. |

Each `F-###` file holds acceptance criteria, dependencies, and out-of-scope notes for that slice.

---

## `app-features/` — ship status mirror

| Path | Purpose |
|------|---------|
| `app-features/README.md` | How to maintain feature status cards. |
| `app-features/_TEMPLATE.md` | Template for new `F-###` status files. |
| `app-features/INDEX.md` | Table: built / tested / deployed per F-001–F-044. |
| `app-features/F-001-pre-build-signoff.md` … `F-044-landing-pricing.md` | One short card per feature: spec link, IMP id, built/tested/deployed flags. |

Naming matches `docs/specs/features/` so you can jump between **spec** (what to build) and **app-features** (what shipped).

---

## Generated / local-only (not in git)

| Path | Purpose |
|------|---------|
| `node_modules/` | Installed npm packages (`npm install`). |
| `dist/` | Production build output (`npm run build`); deployed by Actions. |
| `.env.local` | Your Supabase URL and anon key; never commit. |
| `.git/` | Git object database. |

---

## Parent workspace (optional)

If you open the parent folder `ApexTrader Cyber-Grid/` in Cursor, there may be an additional workspace-level `.cursor/rules` file. The **canonical app repo** for deploy and docs is still `apextrader-cybergrid/`.

---

## Keeping this map current

When you add a new feature slice **F-045+**:

1. Add `docs/specs/features/F-045-….md` and row in `docs/specs/BACKLOG.md`.
2. Add `app-features/F-045-….md` and update `app-features/INDEX.md`.
3. Add new `src/` or `supabase/migrations/006_*.sql` paths to this document (or `DEVELOPMENT.md` file map).
4. Append `IMPLEMENTATION_LOG.md`.
