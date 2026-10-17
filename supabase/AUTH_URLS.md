# Supabase Auth URLs (F-011)

**Dashboard:** Authentication → **URL configuration**

Paste these for project `abc-bilasa` / ApexTrader (same Supabase project as local dev).

## Site URL

Use **local** while developing:

```text
http://localhost:5173
```

Before public Pages deploy, you may switch Site URL to production (or keep localhost for dev-only).

## Redirect URLs (add all lines)

```text
http://localhost:5173/**
https://abc-bilasa.github.io/apextrader-cybergrid/**
```

## Verify

- Sign-in on `http://localhost:5173` still works after save.
- After F-007 Pages deploy, test production URL with the same account.

**No secrets in this file.**
