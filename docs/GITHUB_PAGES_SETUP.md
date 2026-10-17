# Deploy to GitHub Pages (one-time + each push)

**Live URL (after success):** https://abc-bilasa.github.io/apextrader-cybergrid/

## 1. Actions secrets (required)

Repo → **Settings** → **Secrets and variables** → **Actions** → **Secrets**

| Name | Value |
|------|--------|
| `VITE_SUPABASE_URL` | Same as `.env.local` |
| `VITE_SUPABASE_ANON_KEY` | Same as `.env.local` |

## 2. Actions variable (optional)

**Variables** tab → add `VITE_BASE_PATH` = `/apextrader-cybergrid/`  
(Workflow defaults to this if the variable is missing.)

## 3. Enable Pages

**Settings** → **Pages**

- **Source:** Deploy from a branch  
- **Branch:** `gh-pages` / **/(root)**  

After the **first successful** workflow run, the `gh-pages` branch appears.

*(If your UI offers **GitHub Actions** as source, you can use that instead.)*

## 4. Run deploy

Push to `main`, or **Actions** → **Deploy ApexTrader to GitHub Pages** → **Run workflow**.

## 5. Supabase (for login on production)

Add redirect URL — see [`supabase/AUTH_URLS.md`](../supabase/AUTH_URLS.md).

## Troubleshoot

| Issue | Fix |
|-------|-----|
| Build fails “env” | Add both secrets in step 1 |
| 404 on assets | `VITE_BASE_PATH` must be `/apextrader-cybergrid/` |
| Blank site | Wait 2–5 min; hard-refresh |
