import { formatINR } from '../lib/formulas';

const REASON_LABEL = {
  TARGET_MET: { label: 'Target met', className: 'text-emerald-400' },
  DRAWDOWN_HIT: { label: 'Drawdown', className: 'text-rose-400' },
  MANUAL_RESET: { label: 'Manual reset', className: 'text-amber-400' },
};

function formatWhen(iso) {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return iso;
  }
}

export default function LevelHistory({ entries = [] }) {
  return (
    <section className="cyber-card p-5 rounded-xl border border-cyan-500/10">
      <h2 className="cyber-section-title mb-3">Level transitions</h2>
      {entries.length === 0 ? (
        <p className="text-xs text-slate-400" role="status">
          No level changes yet. Promotion or drawdown events appear here after trades that move
          your level.
        </p>
      ) : (
        <ul className="space-y-2 max-h-[220px] overflow-y-auto pr-1" aria-label="Level history">
          {entries.map((row) => {
            const reason = REASON_LABEL[row.trigger_reason] ?? {
              label: row.trigger_reason,
              className: 'text-slate-300',
            };
            const levelDelta = row.new_level - row.old_level;
            const deltaPrefix = levelDelta > 0 ? '+' : '';

            return (
              <li
                key={row.id}
                className="rounded-lg border border-cyan-500/15 bg-slate-900/50 px-3 py-2 text-xs"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="font-mono cyber-metric text-slate-100">
                    L{row.old_level} → L{row.new_level}
                    <span
                      className={
                        levelDelta >= 0 ? ' text-emerald-400 ml-1' : ' text-rose-400 ml-1'
                      }
                    >
                      ({deltaPrefix}{levelDelta})
                    </span>
                  </span>
                  <span className={`uppercase tracking-wider ${reason.className}`}>
                    {reason.label}
                  </span>
                </div>
                <div className="flex flex-wrap justify-between gap-2 mt-1 text-slate-400">
                  <span className="font-mono tabular-nums">
                    {formatINR(Number(row.capital_at_transition))}
                  </span>
                  <time dateTime={row.created_at}>{formatWhen(row.created_at)}</time>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
