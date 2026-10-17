# Setup (first time)

## Prerequisites

| Tool | Version | Check |
|------|---------|--------|
| Node.js | **20+ LTS** (24.x installed on this machine) | `node -v` |
| npm | Comes with Node | `npm -v` |
| Git | Any recent | `git --version` |
| Browser | Chrome / Edge / Firefox | — |
| Accounts | [GitHub](https://github.com), [Supabase](https://supabase.com) | — |

If `npm` is not recognized on Windows, install Node from [nodejs.org](https://nodejs.org/) and restart the terminal.

## Clone or open project

Project path on this machine:

`...\ApexTrader Cyber-Grid\apextrader-cybergrid`

Git should track **only** the `apextrader-cybergrid` folder (or the whole parent folder—pick one strategy and stick to it; recommended: **git root = `apextrader-cybergrid`**).

```powershell
cd "c:\Users\AMIT\OneDrive\Desktop\Projects Ideas 2026\ApexTrader Cyber-Grid\apextrader-cybergrid"
git init
git remote add origin https://github.com/<GITHUB_USER>/<REPO_NAME>.git
```

Replace placeholders; record final values in [ENVIRONMENT.md](./ENVIRONMENT.md).

## Install dependencies

```powershell
npm install
```

Commit `package-lock.json` after first install so CI uses `npm ci`.

## Environment file

```powershell
copy .env.example .env.local
```

Edit `.env.local`:

```env
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

Never commit `.env.local`. See [ENVIRONMENT.md](./ENVIRONMENT.md).

## Run locally

```powershell
npm run dev
```

Default: `http://localhost:5173`.

## Production build (local check)

```powershell
npm run build
npm run preview
```

For GitHub Pages simulation, build with base path:

```powershell
$env:VITE_BASE_PATH="/<REPO_NAME>/"
npm run build
npm run preview
```

## Supabase (high level)

Detailed steps: [DATABASE.md](./DATABASE.md) and [ENVIRONMENT.md](./ENVIRONMENT.md).

1. New project in Supabase dashboard.
2. Run migration SQL.
3. Configure Auth → URL configuration.
4. Test sign-up creates a row in `trading_accounts`.

## IDE

- Open folder: `apextrader-cybergrid`
- Recommended extensions: ESLint (if added later), Tailwind CSS IntelliSense

## Next steps

1. [ROADMAP.md](./ROADMAP.md) — pick current session
2. [DATABASE.md](./DATABASE.md) — apply schema
3. [SESSION_HANDOFF.md](./SESSION_HANDOFF.md) — log progress
