/**
 * Probe Supabase schema/RPC via anon key (no user JWT).
 * Run: node scripts/check-migrations.mjs
 */
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const envPath = resolve(root, '.env.local');

function loadEnv() {
  const text = readFileSync(envPath, 'utf8');
  const env = {};
  for (const line of text.split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const i = t.indexOf('=');
    if (i < 0) continue;
    env[t.slice(0, i).trim()] = t.slice(i + 1).trim().replace(/^["']|["']$/g, '');
  }
  return env;
}

const env = loadEnv();
const url = env.VITE_SUPABASE_URL;
const key = env.VITE_SUPABASE_ANON_KEY;
if (!url || !key) {
  console.error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env.local');
  process.exit(1);
}

const headers = {
  apikey: key,
  Authorization: `Bearer ${key}`,
};

async function probeTable(table) {
  const res = await fetch(`${url}/rest/v1/${table}?select=*&limit=0`, { headers });
  const body = await res.text();
  if (res.ok) return { ok: true, detail: 'table reachable (RLS may hide rows)' };
  try {
    const j = JSON.parse(body);
    if (j.code === 'PGRST205' || j.message?.includes('Could not find the table')) {
      return { ok: false, detail: 'table missing' };
    }
    return { ok: false, detail: j.message || body.slice(0, 120) };
  } catch {
    return { ok: false, detail: body.slice(0, 120) };
  }
}

async function probeRpc(name, body) {
  const res = await fetch(`${url}/rest/v1/rpc/${name}`, {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  if (res.status === 404 || text.includes('PGRST202') || text.includes('Could not find the function')) {
    return { ok: false, detail: 'function missing' };
  }
  if (res.status === 401 || text.includes('Not authenticated')) {
    return { ok: true, detail: 'function exists (auth required to run)' };
  }
  return { ok: res.ok, detail: text.slice(0, 100) };
}

async function probeRuleProfileColumn() {
  const res = await fetch(`${url}/rest/v1/trading_accounts?select=rule_profile&limit=0`, {
    headers,
  });
  const body = await res.text();
  if (res.ok) return { ok: true, detail: 'column rule_profile exposed' };
  if (body.includes('rule_profile') && body.includes('column')) {
    return { ok: false, detail: 'column rule_profile missing' };
  }
  if (body.includes('PGRST205')) return { ok: false, detail: 'trading_accounts unreachable' };
  return { ok: false, detail: body.slice(0, 120) };
}

const results = {
  '002 simulate_trade': await probeRpc('simulate_trade', { p_pnl: 0 }),
  '003 session_reviews table': await probeTable('session_reviews'),
  '004 rule_profile column': await probeRuleProfileColumn(),
  '004 log_trade (exists)': await probeRpc('log_trade', { p_pnl: 0, p_notes: null }),
  '005 update_trade': await probeRpc('update_trade', {
    p_trade_id: '00000000-0000-0000-0000-000000000000',
    p_pnl: 0,
    p_notes: null,
  }),
  '005 delete_trade': await probeRpc('delete_trade', {
    p_trade_id: '00000000-0000-0000-0000-000000000000',
  }),
};

let failed = false;
for (const [label, r] of Object.entries(results)) {
  const mark = r.ok ? 'OK' : 'MISSING';
  if (!r.ok) failed = true;
  console.log(`${mark.padEnd(8)} ${label} — ${r.detail}`);
}

process.exit(failed ? 1 : 0);
