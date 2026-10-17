# Deployment (GitHub Pages + Actions)

## Overview

| Step | What |
|------|------|
| 1 | Push code to GitHub `main` |
| 2 | Action `.github/workflows/deploy.yml` runs |
| 3 | `npm ci` + `npm run build` with secrets |
| 4 | `peaceiris/actions-gh-pages` publishes `dist/` to `gh-pages` branch |
| 5 | GitHub Pages serves the site |

## One-time GitHub setup

### 1. Create repository

- Name example: `apextrader-cybergrid`
- Record in [ENVIRONMENT.md](./ENVIRONMENT.md) **Project registry**

### 2. Push code

```powershell
cd apextrader-cybergrid
git add .
git commit -m "Initial scaffold and documentation"
git branch -M main
git push -u origin main
```

(Commit only when you intend to; docs are ready for first push.)

### 3. Secrets and variables

**Secrets** (Actions):

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

**Variables** (Actions) — for project Pages URL:

- `VITE_BASE_PATH` = `/apextrader-cybergrid/` (replace with your repo name; leading and trailing `/` required)

### 4. Enable Pages

Repository → **Settings** → **Pages**

- **Source:** Deploy from a branch → select **`gh-pages`** / root  
  **Or** (newer UI): **GitHub Actions** as source if offered.

After first successful workflow run, note the public URL:

`https://<github_user>.github.io/<repo_name>/`

### 5. Supabase auth URLs

Add production URL to Supabase — [ENVIRONMENT.md](./ENVIRONMENT.md).

## Workflow file

Location: `.github/workflows/deploy.yml`

- Triggers: `push` to `main`
- Node 20, `npm ci`, build with env, deploy `dist/`

If build fails, open **Actions** tab → failed run → logs.

## Vite `base` path

`vite.config.js`:

```javascript
base: process.env.VITE_BASE_PATH || '/',
```

Mismatch symptom: blank page or 404 on JS/CSS. Fix `VITE_BASE_PATH` and rebuild.

## Local production preview

```powershell
$env:VITE_SUPABASE_URL="https://..."
$env:VITE_SUPABASE_ANON_KEY="..."
$env:VITE_BASE_PATH="/apextrader-cybergrid/"
npm run build
npm run preview
```

## Rollback

- Revert commit on `main` and push, **or**
- Re-run workflow from last good commit
- `gh-pages` branch holds only static assets; no database rollback needed

## Custom domain (optional)

GitHub Pages → Custom domain → DNS CNAME. Update Supabase redirect URLs accordingly.

## Monitoring

- GitHub Actions email on failure
- Supabase Dashboard → Logs for auth/API errors
- No server logs (static site)

## Post-deploy

Run production smoke tests in [TESTING.md](./TESTING.md) section **Production smoke**.
