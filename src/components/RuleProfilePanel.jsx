import { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { RULE_PROFILES, resolveRuleProfile } from '../lib/ruleProfiles';

export default function RuleProfilePanel({ accountId, ruleProfileId, onProfileChanged }) {
  const active = resolveRuleProfile(ruleProfileId);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSelect = async (nextId) => {
    if (nextId === active.id || saving) return;
    setSaving(true);
    setError('');

    try {
      const { error: updateError } = await supabase
        .from('trading_accounts')
        .update({ rule_profile: nextId })
        .eq('id', accountId);

      if (updateError) {
        const missingColumn =
          updateError.message?.includes('rule_profile') ||
          updateError.code === 'PGRST204';
        setError(
          missingColumn
            ? 'Apply migration 004_rule_profiles.sql in Supabase to enable profiles.'
            : updateError.message,
        );
        return;
      }

      if (onProfileChanged) await onProfileChanged(nextId);
    } catch {
      setError('Could not save profile. Check your connection.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="cyber-card p-4 rounded-xl border border-cyan-500/10">
      <h2 className="cyber-section-title text-sm mb-1 flex items-center gap-2">
        <SlidersHorizontal className="w-4 h-4 text-cyan-400 shrink-0" aria-hidden />
        Rule profile
      </h2>
      <p className="text-[10px] text-slate-500 mb-3">
        Promotion and daily drawdown rules for <code className="text-cyan-600/80">log_trade</code>{' '}
        (F-039). Does not reset level or capital.
      </p>

      {error ? (
        <div className="cyber-alert-error mb-3 text-xs" role="alert">{error}</div>
      ) : null}

      <fieldset className="space-y-2" disabled={saving || !accountId}>
        <legend className="sr-only">Select rule profile</legend>
        {RULE_PROFILES.map((profile) => {
          const selected = profile.id === active.id;
          return (
            <label
              key={profile.id}
              className={`flex items-start gap-2 rounded-lg border px-3 py-2 cursor-pointer transition-colors ${
                selected
                  ? 'border-cyan-500/50 bg-cyan-950/30'
                  : 'border-slate-700/80 hover:border-cyan-500/25'
              }`}
            >
              <input
                type="radio"
                name="rule-profile"
                className="mt-1"
                checked={selected}
                onChange={() => handleSelect(profile.id)}
              />
              <span className="text-xs min-w-0">
                <span className="font-medium text-slate-200">{profile.label}</span>
                <span className="block text-[10px] text-slate-500 mt-0.5">{profile.description}</span>
                <span className="block font-mono text-[10px] text-cyan-500/80 mt-1 tabular-nums">
                  DD {Math.round(profile.dailyDrawdownPct * 100)}% · target{' '}
                  {Math.round(profile.promotionTargetPct * 100)}%
                </span>
              </span>
            </label>
          );
        })}
      </fieldset>
      {saving ? (
        <p className="text-[10px] text-slate-500 mt-2" role="status">Saving…</p>
      ) : null}
    </section>
  );
}
