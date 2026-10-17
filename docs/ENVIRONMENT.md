# Environment variables & project registry

## Variables (frontend)

Vite exposes only variables prefixed with `VITE_`.

| Variable | Required | Where set | Purpose |
|----------|----------|-----------|---------|
| `VITE_SUPABASE_URL` | Yes | `.env.local`, GitHub Actions **secrets** | Supabase API URL |
| `VITE_SUPABASE_ANON_KEY` | Yes | `.env.local`, GitHub Actions **secrets** | Public anon key (safe in SPA with RLS) |
| `VITE_BASE_PATH` | Production | GitHub **variables** or workflow `env` | Vite `base` for GitHub Pages subpath |

**Never** put `SUPABASE_SERVICE_ROLE_KEY` in the frontend or in client-side env.

### Local example (`.env.local`)

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

### GitHub Pages base path

If the site is `https://<user>.github.io/<repo>/`:

```env
VITE_BASE_PATH=/apextrader-cybergrid/
```

Trailing slash matters. Root site (`<user>.github.io` only): use `/` or omit.

## GitHub configuration

### Actions secrets (Settings → Secrets and variables → Actions)

| Secret | Value |
|--------|--------|
| `VITE_SUPABASE_URL` | Same as local |
| `VITE_SUPABASE_ANON_KEY` | Same as local |

`GITHUB_TOKEN` is provided automatically for `peaceiris/actions-gh-pages`.

### Actions variables (optional)

| Variable | Example |
|----------|---------|
| `VITE_BASE_PATH` | `/apextrader-cybergrid/` |

Workflow already passes `VITE_BASE_PATH` from `vars.VITE_BASE_PATH` in `.github/workflows/deploy.yml`.

## Supabase Auth URL configuration

Dashboard → **Authentication** → **URL configuration**

| Field | Local dev | Production (GitHub Pages) |
|-------|-----------|-------------------------|
| Site URL | `http://localhost:5173` | `https://<user>.github.io/<repo>/` |
| Redirect URLs | `http://localhost:5173/**` | `https://<user>.github.io/<repo>/**` |

Add both if you use the same Supabase project for dev and prod.

### Email confirmation

| Mode | Setting | Notes |
|------|---------|--------|
| Fast dev | Confirm email **off** | Immediate login after sign-up |
| Production | Confirm email **on** | Configure SMTP or Supabase mail limits |

Record choice in [DECISIONS.md](./DECISIONS.md).

**F-001 (2026-10-17):** Email confirmation **Off** for local/MVP dev (D6). Public sign-up **Open** (D7).

## Project registry (fill in once)

Update this table when created—**no API keys here**.

| Item | Value |
|------|--------|
| GitHub user/org | _TBD_ (set at F-005 push) |
| Repository name | `apextrader-cybergrid` |
| Production URL | `https://<github-user>.github.io/apextrader-cybergrid/` |
| `VITE_BASE_PATH` | `/apextrader-cybergrid/` |
| Supabase project name | _TBD_ (F-002) |
| Supabase project ref | _TBD_ (F-002) |
| Supabase region | _TBD_ (F-002) |
| Default branch | `main` |
| Email confirmation (dev) | **Off** |
| Public sign-up | **Open** |

## Security checklist

- [ ] `.env.local` in `.gitignore` (already)
- [ ] Anon key only in client; business rules in `log_trade` RPC
- [ ] RLS enabled on all public tables
- [ ] No service role key in repo or Actions client build
