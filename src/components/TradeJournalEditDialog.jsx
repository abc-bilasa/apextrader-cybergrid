import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

function toDatetimeLocalValue(iso) {
  const d = new Date(iso);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function parsePnl(raw) {
  const trimmed = raw.trim();
  if (trimmed === '') return { ok: false, reason: 'Enter P&L.' };
  const value = Number(trimmed);
  if (!Number.isFinite(value)) return { ok: false, reason: 'P&L must be a number.' };
  return { ok: true, value };
}

export default function TradeJournalEditDialog({ trade, open, onClose, onSaved }) {
  const [pnl, setPnl] = useState('');
  const [notes, setNotes] = useState('');
  const [whenLocal, setWhenLocal] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!trade || !open) return;
    setPnl(String(trade.pnl));
    setNotes(trade.notes ?? '');
    setWhenLocal(toDatetimeLocalValue(trade.created_at));
    setError('');
  }, [trade, open]);

  if (!open || !trade) return null;

  const handleSave = async (e) => {
    e.preventDefault();
    const parsed = parsePnl(pnl);
    if (!parsed.ok) {
      setError(parsed.reason);
      return;
    }
    const whenDate = new Date(whenLocal);
    if (!Number.isFinite(whenDate.getTime())) {
      setError('Invalid date/time.');
      return;
    }

    setSubmitting(true);
    setError('');
    try {
      const { data, error: rpcError } = await supabase.rpc('update_trade', {
        p_trade_id: trade.id,
        p_pnl: parsed.value,
        p_notes: notes.trim() ? notes.trim() : null,
        p_created_at: whenDate.toISOString(),
      });
      if (rpcError) {
        const missing =
          rpcError.code === 'PGRST202' || rpcError.message?.includes('update_trade');
        setError(
          missing
            ? 'Apply migration 005_trade_journal_crud.sql in Supabase to edit trades.'
            : rpcError.message,
        );
        return;
      }
      if (onSaved) await onSaved(data);
      onClose();
    } catch {
      setError('Could not save trade.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-trade-title"
    >
      <form
        className="cyber-card w-full max-w-md rounded-xl border border-cyan-500/30 p-5 shadow-xl"
        onSubmit={handleSave}
      >
        <h2 id="edit-trade-title" className="cyber-section-title mb-4">Edit trade</h2>

        {error ? (
          <div className="cyber-alert-error mb-3 text-xs" role="alert">{error}</div>
        ) : null}

        <div className="space-y-3 text-sm">
          <div>
            <label className="cyber-label" htmlFor="edit-trade-pnl">P&amp;L (₹)</label>
            <input
              id="edit-trade-pnl"
              className="cyber-input w-full mt-1"
              inputMode="decimal"
              value={pnl}
              disabled={submitting}
              onChange={(e) => setPnl(e.target.value)}
            />
          </div>
          <div>
            <label className="cyber-label" htmlFor="edit-trade-when">When (local)</label>
            <input
              id="edit-trade-when"
              type="datetime-local"
              className="cyber-input w-full mt-1"
              value={whenLocal}
              disabled={submitting}
              onChange={(e) => setWhenLocal(e.target.value)}
            />
          </div>
          <div>
            <label className="cyber-label" htmlFor="edit-trade-notes">Notes</label>
            <textarea
              id="edit-trade-notes"
              rows={3}
              className="cyber-input w-full mt-1 resize-y"
              value={notes}
              disabled={submitting}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        <p className="text-[10px] text-slate-500 mt-3">
          Saving recalculates level and capital from your full journal (D16).
        </p>

        <div className="flex gap-2 mt-4">
          <button type="button" className="cyber-btn-ghost flex-1" disabled={submitting} onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="cyber-btn-primary flex-1 disabled:opacity-50" disabled={submitting}>
            {submitting ? 'Saving…' : 'Save changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
