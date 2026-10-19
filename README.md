# ApexTrader Cyber-Grid

42-level trading account scaling, risk management, and journal app (React + Supabase), with a cyberpunk UI. Deployed as a static SPA on **GitHub Pages**.

| Resource | Location |
|----------|----------|
| Product requirements (source of truth) | [`PRD.txt`](PRD.txt) |
| All build/deploy/test docs | [`docs/README.md`](docs/README.md) |
| Full repo file map | [`docs/REPOSITORY_MAP.md`](docs/REPOSITORY_MAP.md) |
| Rule book | [`docs/RULEBOOK.md`](docs/RULEBOOK.md) |
| Spec-driven features | [`docs/SPEC_DRIVEN.md`](docs/SPEC_DRIVEN.md) · [`docs/specs/BACKLOG.md`](docs/specs/BACKLOG.md) |
| Feature ship status | [`app-features/INDEX.md`](app-features/INDEX.md) |
| Efficient build & deploy | [`docs/EFFICIENT_WORKFLOW.md`](docs/EFFICIENT_WORKFLOW.md) |
| Multi-week session plan | [`docs/ROADMAP.md`](docs/ROADMAP.md) |
| Continue after a break | [`docs/SESSION_HANDOFF.md`](docs/SESSION_HANDOFF.md) |
| Progress & conflicts | [`docs/PROGRESS_AND_CONFLICTS.md`](docs/PROGRESS_AND_CONFLICTS.md) |
| Before first DB apply | [`docs/PRE_BUILD_SIGNOFF.md`](docs/PRE_BUILD_SIGNOFF.md) |
| When is it “done”? | [`docs/DEFINITION_OF_DONE.md`](docs/DEFINITION_OF_DONE.md) |
| Change audit trail | [`docs/IMPLEMENTATION_LOG.md`](docs/IMPLEMENTATION_LOG.md) |
| UI / theme (global) | [`docs/UI_STYLE_GUIDE.md`](docs/UI_STYLE_GUIDE.md) |

**Open in Cursor/VS Code:** use this folder (`apextrader-cybergrid`) as the workspace root so `.cursor/rules` and paths apply.

**Session bookends:** skills `apextrader-session-open` and `apextrader-session-close` (say “open session” / “close session” in chat).

## Quick start (local)

```powershell
cd apextrader-cybergrid
npm install
copy .env.example .env.local
# Edit .env.local with Supabase URL + anon key (see docs/ENVIRONMENT.md)
npm run dev
```

Open `http://localhost:5173`.

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local dev server |
| `npm run build` | Production bundle → `dist/` |
| `npm run preview` | Serve `dist/` locally |

## Repository layout

```
apextrader-cybergrid/
├── .github/workflows/deploy.yml
├── docs/                    # All process & technical documentation
├── public/
├── src/components/          # UI screens & widgets
├── src/lib/                 # Supabase client, level math
├── supabase/migrations/     # SQL run in Supabase (or via CLI later)
└── package.json
```

## Status (see [docs/SESSION_HANDOFF.md](docs/SESSION_HANDOFF.md))

- [x] Session 0: scaffold, docs, RULEBOOK, UI theme, `001` SQL file, local build OK
- [x] F-001: PRE_BUILD gate + D4-A locked
- [x] F-002: Supabase `001` applied
- [x] F-003: `.env.local` + local dev
- [x] F-004: git repo at app root, first commit on `main`
- [x] F-005: [GitHub](https://github.com/abc-bilasa/apextrader-cybergrid) `main` pushed
- [x] F-006/F-007: [GitHub Pages](https://abc-bilasa.github.io/apextrader-cybergrid/) live
- [x] **F-001–F-027:** MVP feature backlog complete (2026-10-17)
- [x] Latest `main` deployed (2026-10-18, `20e875a`)

**Owner:** Amit · **Stack:** Vite 5, React 18, Tailwind 3, Supabase, Recharts
