import { formatINR } from '../lib/formulas';

function triggerCopy(trigger) {
  if (trigger === 'TARGET_MET') {
    return { label: 'Promotion', className: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/40' };
  }
  if (trigger === 'DRAWDOWN_HIT') {
    return { label: 'Demotion (−2 levels)', className: 'text-rose-400 border-rose-500/40 bg-rose-950/40' };
  }
  return { label: 'No level change', className: 'text-slate-400 border-slate-600/40 bg-slate-900/50' };
}

export default function TradeSimPreview({ result, loading, error, unavailable }) {
  if (unavailable) {
    return (
      <div
        className="rounded-lg border border-amber-500/30 bg-amber-950/20 px-3 py-2 text-xs text-amber-200/90"
        role="status"
      >
        Preview unavailable — run <code className="font-mono text-[10px]">002_simulate_trade.sql</code> in
        Supabase SQL Editor.
      </div>
    );
  }

  if (loading) {
    return (
      <p className="text-xs text-cyan-400/80 font-mono" role="status">Simulating outcome…</p>
    );
  }

  if (error) {
    return (
      <div className="text-xs text-rose-300 border border-rose-500/25 rounded-lg px-3 py-2" role="alert">
        {error}
      </div>
    );
  }

  if (!result) return null;

  const trigger = triggerCopy(result.trigger);
  const levelShift = result.new_level !== result.old_level;

  return (
    <div
      className="rounded-lg border border-cyan-500/20 bg-slate-900/60 px-3 py-3 text-xs space-y-2"
      role="status"
      aria-live="polite"
    >
      <p className="uppercase tracking-wider text-slate-500">If you commit this trade</p>
      <dl className="space-y-1.5 font-mono tabular-nums">
        <div className="flex justify-between gap-4">
          <dt className="text-slate-400 font-sans">New capital</dt>
          <dd className="text-slate-100">{formatINR(Number(result.new_capital))}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-slate-400 font-sans">Level</dt>
          <dd className={levelShift ? 'text-cyan-300' : 'text-slate-200'}>
            L{result.old_level} → L{result.new_level}
          </dd>
        </div>
      </dl>
      <p className={`inline-block rounded border px-2 py-0.5 text-[10px] uppercase tracking-wider ${trigger.className}`}>
        {trigger.label}
      </p>
    </div>
  );
}
