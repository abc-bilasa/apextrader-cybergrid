import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

function parsePnl(raw) {
  const trimmed = raw.trim();
  if (trimmed === '') return { ok: false, reason: 'Enter P&L (profit or loss).' };
  const value = Number(trimmed);
  if (!Number.isFinite(value)) return { ok: false, reason: 'P&L must be a valid number.' };
  return { ok: true, value };
}

export default function TradeLogger({ onTradeLogged }) {
  const [pnl, setPnl] = useState('');
  const [notes, setNotes] = useState('');
  const [fieldError, setFieldError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldError('');

    const parsed = parsePnl(pnl);
    if (!parsed.ok) {
      setFieldError(parsed.reason);
      return;
    }

    setSubmitting(true);
    try {
      const { data, error } = await supabase.rpc('log_trade', {
        p_pnl: parsed.value,
        p_notes: notes.trim() || null,
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
    }
  };

  return (
    <section className="cyber-card p-5 rounded-xl border border-cyan-500/10">
      <h2 className="cyber-section-title mb-4 flex items-center gap-2">
        <PlusCircle className="w-4 h-4 text-cyan-400 shrink-0" aria-hidden />
        Log trade
      </h2>

      {fieldError ? (
        <div className="cyber-alert-error mb-4" role="alert">
          {fieldError}
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label className="cyber-label" htmlFor="trade-pnl">
            P&amp;L (₹)
          </label>
          <input
            id="trade-pnl"
            type="text"
            inputMode="decimal"
            autoComplete="off"
            placeholder="e.g. 500 or -200"
            disabled={submitting}
            className="cyber-input w-full mt-1 disabled:opacity-50"
            value={pnl}
            onChange={(e) => {
              setPnl(e.target.value);
              if (fieldError) setFieldError('');
            }}
          />
        </div>

        <div>
          <label className="cyber-label" htmlFor="trade-notes">
            Notes <span className="text-slate-500 font-normal">(optional)</span>
          </label>
          <textarea
            id="trade-notes"
            rows={3}
            disabled={submitting}
            className="cyber-input w-full mt-1 resize-y min-h-[4.5rem] disabled:opacity-50"
            placeholder="Setup, symbol, lesson…"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="cyber-btn-primary cyber-glow w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? 'Committing…' : 'Commit trade'}
        </button>
      </form>
    </section>
  );
}
