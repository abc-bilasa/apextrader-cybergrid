import { supabase } from './supabase';

async function probeTable(table) {
  const { error } = await supabase.from(table).select('*').limit(0);
  if (!error) return { ok: true, detail: 'ready' };
  if (error.code === 'PGRST205' || error.message?.includes('Could not find the table')) {
    return { ok: false, detail: 'not applied' };
  }
  return { ok: false, detail: error.message };
}

async function probeRpc(name, body) {
  const { error } = await supabase.rpc(name, body);
  if (!error) return { ok: true, detail: 'ready' };
  if (
    error.code === 'PGRST202' ||
    error.message?.includes('Could not find the function')
  ) {
    return { ok: false, detail: 'not applied' };
  }
  if (error.message?.includes('Not authenticated')) {
    return { ok: true, detail: 'ready' };
  }
  return { ok: true, detail: 'ready' };
}

async function probeRuleProfileColumn() {
  const { error } = await supabase.from('trading_accounts').select('rule_profile').limit(0);
  if (!error) return { ok: true, detail: 'ready' };
  if (error.message?.includes('rule_profile')) {
    return { ok: false, detail: 'not applied' };
  }
  return { ok: false, detail: error.message };
}

/** Client-side migration checklist (signed-in user). */
export async function probeSupabaseMigrations() {
  const checks = [
    { id: '001', label: 'Core schema & log_trade', probe: () => probeRpc('log_trade', { p_pnl: 0, p_notes: null }) },
    { id: '002', label: 'Trade preview (simulate_trade)', probe: () => probeRpc('simulate_trade', { p_pnl: 0 }) },
    { id: '003', label: 'Session reviews table', probe: () => probeTable('session_reviews') },
    { id: '004', label: 'Rule profiles', probe: probeRuleProfileColumn },
    {
      id: '005',
      label: 'Journal edit/delete',
      probe: () =>
        probeRpc('update_trade', {
          p_trade_id: '00000000-0000-0000-0000-000000000000',
          p_pnl: 0,
          p_notes: null,
        }),
    },
  ];

  const results = [];
  for (const item of checks) {
    const r = await item.probe();
    results.push({ ...item, ok: r.ok, detail: r.detail });
  }
  return results;
}
