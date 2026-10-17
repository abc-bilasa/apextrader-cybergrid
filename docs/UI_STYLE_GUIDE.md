# UI style guide — ApexTrader Cyber-Grid

**Global source of truth** for look, theme, and layout. Every screen and feature **must** follow this document and the shared classes in `src/index.css`.  
Product layout specs: [PRD.txt](../PRD.txt) §4.

---

## Design principles

1. **Dark cyberpunk** — high contrast, cyan neon accents, glass cards on deep slate.
2. **Data-first** — money and levels use **mono** font; labels use **Inter**.
3. **Semantic color** — cyan = brand/active; emerald = profit/target; rose = loss/risk.
4. **No one-off styling** — use tokens + `.cyber-*` classes; avoid arbitrary hex in components.
5. **Accessible contrast** — body text `slate-100` on `#030712`; don’t use cyan alone for critical errors.

---

## Color tokens

| Token | Hex / value | Tailwind | Use |
|-------|-------------|----------|-----|
| Background primary | `#030712` | `bg-cyber-dark` | Page shell |
| Background elevated | `#0f172a` | `bg-slate-900` | Inputs, nested panels |
| Card surface | `rgba(15,23,42,0.75)` | `.cyber-card` | All panels |
| Border accent | `rgba(6,182,212,0.2)` | `border-cyan-500/20` | Card edges |
| Primary (cyan) | `#06b6d4` | `text-cyber-cyan`, `bg-cyan-500` | Brand, CTAs, active level |
| Neon highlight | `#22d3ee` | `text-cyber-neon` | Hover, chart lines |
| Success | `#10b981` | `text-emerald-400`, `text-cyber-green` | Profit, targets |
| Danger | `#f43f5e` | `text-rose-400`, `text-cyber-rose` | Loss, drawdown |
| Muted text | `#94a3b8` | `text-slate-400` | Labels, hints |
| Body text | `#f8fafc` | `text-slate-100` | Primary copy |

---

## Typography

| Role | Font | Classes |
|------|------|---------|
| UI / headings | Inter | `font-sans` (default on `body`) |
| Money, levels, P&L | JetBrains Mono | `font-mono` + `.cyber-metric` |
| Section titles | Inter, uppercase | `.cyber-section-title` |
| Micro labels | Inter | `.cyber-label` |

Load fonts via `index.html` (Inter + JetBrains Mono). **Do not** add other font families without updating this guide.

---

## Spacing & radius

| Element | Rule |
|---------|------|
| Page padding | `p-4 md:p-6` on main shell |
| Card padding | `p-5` or `p-8` (auth) |
| Card radius | `rounded-xl` (dashboard), `rounded-2xl` (auth modal) |
| Grid gap | `gap-6` between major columns |
| Section spacing | `space-y-6` in column stacks |

---

## Layout (dashboard)

Reference: PRD §4.2. **Do not invent new top-level regions.**

```text
┌─────────────────────────────────────────────────────────────┐
│  HEADER: logo, level X/42, capital ₹, email, sign out       │
├──────────────┬─────────────────────────┬──────────────────┤
│  LEFT 4 col  │  CENTER 5 col           │  RIGHT 3 col       │
│  Risk metrics│  Charts (+ bars)        │  42-level grid     │
│  D1–D4       │                         │                    │
│  Trade form  │                         │                    │
└──────────────┴─────────────────────────┴──────────────────┘
```

| Breakpoint | Grid |
|------------|------|
| `< lg` | Single column stack: header → left → center → right |
| `≥ lg` | `grid-cols-12` with `lg:col-span-4 / 5 / 3` |

---

## Component patterns (required classes)

Use these from `src/index.css`. **Do not duplicate** raw Tailwind stacks for the same pattern.

| Pattern | Class | When |
|---------|-------|------|
| Glass panel | `.cyber-card` | Any card/panel |
| Primary CTA glow | `.cyber-glow` | Main submit buttons |
| Section heading | `.cyber-section-title` | Panel titles |
| Form label | `.cyber-label` | All form labels |
| Text input / number | `.cyber-input` | P&L, email, password, notes |
| Primary button | `.cyber-btn-primary` | Login, commit trade |
| Ghost / danger icon btn | `.cyber-btn-ghost` | Sign out |
| INR / level numbers | `.cyber-metric` | Capital, targets, grid |
| Profit text | `.cyber-text-profit` | Positive P&L, targets |
| Loss / risk text | `.cyber-text-risk` | Drawdown, negative P&L |
| Active level row | `.cyber-level-active` | Current level in grid |
| Loading shell | `.cyber-loading` | Full-page boot states |
| Error banner | `.cyber-alert-error` | Auth/RPC errors |
| Chart container | `.cyber-chart-wrap` | Recharts parent `h-64` min |

### Buttons

- **One primary** cyan CTA per panel (filled).
- Disabled: `opacity-50 cursor-not-allowed` on same class.
- No gradient buttons unless added here first.

### Forms

- Labels: uppercase micro copy (`.cyber-label`).
- Inputs: dark `slate-900` fill, cyan focus ring via `.cyber-input`.
- Textarea: same as input, `resize-none`, min height `h-20` for journal.

### Level grid (42 rows)

- Default row: `.cyber-level-row`
- Active: `.cyber-level-active` (cyan border + glow)
- Preview (optional): `border-slate-700 hover:border-slate-600` only—no second glow style

---

## Charts (Recharts)

Global colors (use in all charts):

| Element | Color |
|---------|--------|
| Line / area stroke | `#06b6d4` |
| Area fill | gradient cyan → transparent (see `EquityChart` PRD) |
| Grid lines | `#1e293b` |
| Axis ticks | `#64748b` |
| Tooltip bg | `#0f172a`, border `#06b6d4` |
| Profit bars | `#10b981` |
| Loss bars | `#f43f5e` |

Chart titles use `.cyber-section-title`.

---

## Auth screen

- Full viewport: `min-h-screen bg-cyber-dark flex items-center justify-center p-4`
- Single `.cyber-card` max width `max-w-md`, border `border-cyan-500/30`
- Logo: `Zap` icon `text-cyan-400 animate-pulse`
- Title: `APEX TRADER` — `text-2xl font-black tracking-wider text-cyan-400`
- Subtitle: `text-xs uppercase tracking-widest text-slate-400`

---

## Motion & feedback

| Event | UI behavior |
|-------|-------------|
| `TARGET_MET` | `canvas-confetti` (PRD) |
| Profit trade | High beep (Dashboard) |
| Drawdown hit | Low tone |
| Loading | `.cyber-loading` pulse text—no spinners unless added here |

---

## Icons

- Library: **lucide-react** only.
- Size: `w-4 h-4` inline with labels; `w-5 h-5` header actions; `w-7 h-7` header logo area.
- Color: inherit or `text-cyan-400` for brand icons.

---

## Feature compliance checklist

Before merging any UI feature, confirm:

- [ ] Uses `bg-cyber-dark` page background (or auth equivalent)
- [ ] Panels use `.cyber-card` (not custom backgrounds)
- [ ] Money/levels use `font-mono` / `.cyber-metric`
- [ ] Profit/risk use semantic emerald/rose classes
- [ ] Forms use `.cyber-label` + `.cyber-input`
- [ ] Primary actions use `.cyber-btn-primary` + `.cyber-glow` where appropriate
- [ ] Charts match color table above
- [ ] Responsive layout matches § Layout
- [ ] No new colors/fonts without updating this file + `tailwind.config.js` + `index.css`

---

## File map

| File | Responsibility |
|------|----------------|
| `tailwind.config.js` | `cyber.*` color tokens |
| `src/index.css` | Global body + `.cyber-*` components |
| `src/lib/chartTheme.js` | Recharts color constants |
| `index.html` | Fonts, `theme-color` |
| `docs/UI_STYLE_GUIDE.md` | This document |

---

## Related

- [DEVELOPMENT.md](./DEVELOPMENT.md) — coding conventions  
- [DEFINITION_OF_DONE.md](./DEFINITION_OF_DONE.md) — UI features must pass checklist above  
- [IMPLEMENTATION_LOG.md](./IMPLEMENTATION_LOG.md) — log visual system changes as `DOCS` or `FEATURE`
