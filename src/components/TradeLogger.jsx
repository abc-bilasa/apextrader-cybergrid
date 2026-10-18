import { useCallback, useState } from 'react';
import { PlusCircle, Zap } from 'lucide-react';
import { supabase } from '../lib/supabase';

const QUICK_AMOUNTS = [-1000, -500, 500, 1000];

function parsePnl(raw) {
  const trimmed = raw.trim();
  if (trimmed === '') return { ok: false, reason: 'Enter P&L (profit or loss).' };
  const value = Number(trimmed);
  if (!Number.isFinite(value)) return { ok: false, reason: 'P&L must be a valid number.' };
  return { ok: true, value };
}

function formatPresetLabel(amount) {
  const abs = Math.abs(amount);
  const prefix = amount > 0 ? '+' : '−';
  if (abs >= 1000) return `${prefix}₹${abs / 1000}k`;
  return `${prefix}₹${abs}`;
}

export default function TradeLogger({ onTradeLogged }) {
  const [pnl, setPnl] = useState('');
  const [notes, setNotes] = useState('');
  const [fieldError, setFieldError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [quickAmount, setQuickAmount] = useState(null);

  const commitTrade = useCallback(
    async (value, noteText) => {
      setFieldError('');
      setSubmitting(true);
      try {
        const { data, error } = await supabase.rpc('log_trade', {
          p_pnl: value,
          p_notes: noteText?.trim() ? noteText.trim() : null,
        });

        if (error) {
          setFieldError(error.message);
          return;
        }

        setPnl('');
        setNotes('');
        if (onTradeLogged) await onTradeLogged(data);
      } catch {
        setFieldError('Trade could not be saved. Check your connection and try again.');
      } finally {
        setSubmitting(false);
        setQuickAmount(null);
      }
    },
    [onTradeLogged],
  );

  const handleQuickLog = async (amount) => {
    if (submitting) return;
    setQuickAmount(amount);
    await commitTrade(amount, null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const parsed = parsePnl(pnl);
    if (!parsed.ok) {
      setFieldError(parsed.reason);
      return;
    }
    await commitTrade(parsed.value, notes);
  };

  const applyPresetToField = (amount) => {
    setPnl(String(amount));
    setFieldError('');
  };

  return (
    <section className="cyber-card p-5 rounded-xl border border-cyan-500/10">
      <h2 className="cyber-section-title mb-1 flex items-center gap-2">
        <PlusCircle className="w-4 h-4 text-cyan-400 shrink-0" aria-hidden />
        Log trade
      </h2>
      <p className="text-xs text-slate-400 mb-4">Tap a preset to log instantly, or enter a custom amount below.</p>

      {fieldError ? (
        <div className="cyber-alert-error mb-4" role="alert">
          {fieldError}
        </div>
      ) : null}

      <div className="mb-5">
        <p className="cyber-label flex items-center gap-1.5 mb-2">
          <Zap className="w-3.5 h-3.5 text-cyan-400" aria-hidden />
          Quick log
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {QUICK_AMOUNTS.map((amount) => {
            const isLoss = amount < 0;
            const isLoading = submitting && quickAmount === amount;
            return (
              <button
                key={amount}
                type="button"
                disabled={submitting}
                aria-label={`Log trade ${formatPresetLabel(amount)}`}
                className={`min-h-[44px] rounded-lg border font-mono text-sm font-semibold tabular-nums transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  isLoss
                    ? 'border-rose-500/40 bg-rose-950/40 text-rose-300 hover:bg-rose-900/50'
                    : 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/50'
                }`}
                onClick={() => handleQuickLog(amount)}
              >
                {isLoading ? '…' : formatPresetLabel(amount)}
              </button>
            );
          })}
        </div>
        <p className="text-[10px] text-slate-500 mt-2">Presets submit with no note — use custom for journal text.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 border-t border-cyan-500/10 pt-4" noValidate>
        <p className="text-xs uppercase tracking-wider text-slate-400">Custom amount</p>

        <div>
          <label className="cyber-label" htmlFor="trade-pnl">
            P&amp;L (₹)
          </label>
          <div className="flex flex-wrap gap-2 mt-1">
            <input
              id="trade-pnl"
              type="text"
              inputMode="decimal"
              autoComplete="off"
              placeholder="e.g. 500 or -200"
              disabled={submitting}
              className="cyber-input flex-1 min-w-[8rem] disabled:opacity-50"
              value={pnl}
              onChange={(e) => {
                setPnl(e.target.value);
                if (fieldError) setFieldError('');
              }}
            />
            <div className="flex gap-1.5">
              {QUICK_AMOUNTS.map((amount) => (
                <button
                  key={`fill-${amount}`}
                  type="button"
                  disabled={submitting}
                  className="px-2 py-1 rounded border border-slate-600 text-[10px] font-mono text-slate-400 hover:border-cyan-500/40 hover:text-cyan-300 disabled:opacity-50"
                  onClick={() => applyPresetToField(amount)}
                >
                  {formatPresetLabel(amount)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <details className="group">
          <summary className="cyber-label cursor-pointer list-none flex items-center gap-2 text-slate-400 hover:text-cyan-300 [&::-webkit-details-marker]:hidden">
            <span className="text-slate-500 group-open:rotate-90 transition-transform inline-block">
              ▸
            </span>
            Add note <span className="font-normal text-slate-500">(optional)</span>
          </summary>
          <textarea
            id="trade-notes"
            rows={3}
            disabled={submitting}
            className="cyber-input w-full mt-2 resize-y min-h-[4.5rem] disabled:opacity-50"
            placeholder="Setup, symbol, lesson…"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </details>

        <button
          type="submit"
          disabled={submitting}
          className="cyber-btn-primary cyber-glow w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting && quickAmount === null ? 'Committing…' : 'Commit custom trade'}
        </button>
      </form>
    </section>
  );
}
