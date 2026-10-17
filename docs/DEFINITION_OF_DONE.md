# Definition of done

Use these gates so “done” means **no silent rework** later.

---

## Per session (minimum)

A session is **not complete** unless:

- [ ] Code/build matches [DECISIONS.md](./DECISIONS.md) (no OPEN items touched without lock)
- [ ] [DEVELOPMENT.md](./DEVELOPMENT.md) file status table updated for changed files
- [ ] [SESSION_HANDOFF.md](./SESSION_HANDOFF.md) updated (END ritual — see that file)
- [ ] If behavior changed: [TESTING.md](./TESTING.md) case added or run manually once
- [ ] [IMPLEMENTATION_LOG.md](./IMPLEMENTATION_LOG.md) row(s) for this session’s changes
- [ ] No secrets in git (`git status` clean of `.env.local`)

---

## Feature: Database (`001` migration)

- [ ] [PRE_BUILD_SIGNOFF.md](./PRE_BUILD_SIGNOFF.md) complete
- [ ] `001_initial_schema.sql` run successfully in Supabase
- [ ] New user signup creates `trading_accounts` row
- [ ] `GRANT EXECUTE` on `log_trade` for `authenticated`
- [ ] Manual tests T1/T4 from [TESTING.md](./TESTING.md) pass via app or RPC
- [ ] SESSION_HANDOFF notes migration apply date

**Not done if:** editing `001` on production DB instead of new migration file.

---

## Feature: Authentication

- [ ] Sign up, sign in, sign out on localhost
- [ ] Supabase redirect URLs configured per [ENVIRONMENT.md](./ENVIRONMENT.md)
- [ ] Error messages visible (no blank failures)

---

## Feature: Trade logging

- [ ] Only path to change level/capital: `rpc('log_trade')`
- [ ] UI refreshes account + trades after submit
- [ ] Promotion/demotion match [TESTING.md](./TESTING.md) for level 1
- [ ] Confetti/audio only on documented triggers (PRD)

---

## Feature: Dashboard UI

- [ ] [UI_STYLE_GUIDE.md](./UI_STYLE_GUIDE.md) compliance checklist completed
- [ ] Left metrics match `getLevelMetrics(current_level)`
- [ ] Equity chart uses `trades.ending_capital`
- [ ] Level grid shows 42 rows; active level highlighted
- [ ] Responsive layout (mobile stack)

---

## Feature: Production deploy

- [ ] [PRE_BUILD_SIGNOFF.md](./PRE_BUILD_SIGNOFF.md) section E complete
- [ ] GitHub Actions secrets + `VITE_BASE_PATH` set
- [ ] Production smoke P1–P4 in [TESTING.md](./TESTING.md)
- [ ] ENVIRONMENT registry has final production URL

---

## MVP complete (project)

All of:

- [ ] MVP items in [ROADMAP.md](./ROADMAP.md) Week 1–2 + Session G
- [ ] Release checklist in [TESTING.md](./TESTING.md)
- [ ] PRE_BUILD gate marked DONE
- [ ] No **DEFAULT** decisions left that affect shipped behavior (D4, D6, D7 at minimum)
