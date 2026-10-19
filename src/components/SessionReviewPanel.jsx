import { useCallback, useEffect, useState } from 'react';
import { ClipboardCheck } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { todayLocalDateKey } from '../lib/tradeDay';

const PLAN_OPTIONS = [
  { value: 'YES', label: 'Yes — followed plan' },
  { value: 'PARTIAL', label: 'Partially' },
  { value: 'NO', label: 'No' },
];

export default function SessionReviewPanel({ userId, embedded = false }) {
  const reviewDay = todayLocalDateKey();
  const [planFollowed, setPlanFollowed] = useState('PARTIAL');
  const [bestNote, setBestNote] = useState('');
  const [worstNote, setWorstNote] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  const loadToday = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError('');
    setUnavailable(false);
    try {
      const { data, error: fetchError } = await supabase
        .from('session_reviews')
        .select('*')
        .eq('review_day', reviewDay)
        .maybeSingle();

      if (fetchError) {
        const missing =
          fetchError.code === 'PGRST205' ||
          fetchError.message?.includes('session_reviews') ||
          fetchError.message?.includes('Could not find the table');
        if (missing) {
          setUnavailable(true);
          return;
        }
        setError(fetchError.message);
        return;
      }

      if (data) {
        setPlanFollowed(data.plan_followed);
        setBestNote(data.best_note ?? '');
        setWorstNote(data.worst_note ?? '');
        setSaved(true);
      }
    } catch {
      setError('Could not load today’s review.');
    } finally {
      setLoading(false);
    }
  }, [reviewDay, userId]);

  useEffect(() => {
    loadToday();
  }, [loadToday]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSaved(false);

    if (!userId) return;

    const payload = {
      user_id: userId,
      review_day: reviewDay,
      plan_followed: planFollowed,
      best_note: bestNote.trim() || null,
      worst_note: worstNote.trim() || null,
      updated_at: new Date().toISOString(),
    };

    try {
      const { error: upsertError } = await supabase.from('session_reviews').upsert(payload, {
        onConflict: 'user_id,review_day',
      });

      if (upsertError) {
        const missing =
          upsertError.code === 'PGRST205' ||
          upsertError.message?.includes('session_reviews');
        if (missing) {
          setUnavailable(true);
        } else {
          setError(upsertError.message);
        }
        return;
      }
      setSaved(true);
    } catch {
      setError('Could not save review.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <section
      className={embedded ? '' : 'cyber-card p-5 rounded-xl border border-cyan-500/10'}
    >
      {!embedded ? (
        <>
      <h2 className="cyber-section-title mb-1 flex items-center gap-2">
        <ClipboardCheck className="w-4 h-4 text-cyan-400 shrink-0" aria-hidden />
        Session review
      </h2>
      <p className="text-[10px] text-slate-500 mb-4">
        ~2 min — process over P&amp;L · {reviewDay}
      </p>
        </>
      ) : (
        <p className="text-[10px] text-slate-500 mb-4">Today · {reviewDay}</p>
      )}

      {unavailable ? (
        <p className="text-xs text-amber-200/90 border border-amber-500/30 rounded-lg px-3 py-2 bg-amber-950/20">
          Run <code className="font-mono text-[10px]">003_session_reviews.sql</code> in Supabase to
          save reviews.
        </p>
      ) : loading ? (
        <p className="text-xs text-cyan-400/80 font-mono" role="status">Loading…</p>
      ) : (
        <form onSubmit={handleSave} className="space-y-4 text-sm">
          {error ? (
            <div className="cyber-alert-error text-xs" role="alert">{error}</div>
          ) : null}
          {saved ? (
            <p className="text-xs text-emerald-400" role="status">Saved for today.</p>
          ) : null}

          <fieldset>
            <legend className="cyber-label mb-2">Did you follow your plan?</legend>
            <div className="space-y-2">
              {PLAN_OPTIONS.map((opt) => (
                <label
                  key={opt.value}
                  className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="plan-followed"
                    value={opt.value}
                    checked={planFollowed === opt.value}
                    onChange={() => setPlanFollowed(opt.value)}
                    disabled={saving}
                    className="accent-cyan-500"
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </fieldset>

          <div>
            <label className="cyber-label" htmlFor="review-best">Best decision</label>
            <input
              id="review-best"
              type="text"
              maxLength={200}
              disabled={saving}
              className="cyber-input w-full mt-1 text-sm"
              placeholder="One line…"
              value={bestNote}
              onChange={(e) => setBestNote(e.target.value)}
            />
          </div>

          <div>
            <label className="cyber-label" htmlFor="review-worst">Worst decision / fix tomorrow</label>
            <input
              id="review-worst"
              type="text"
              maxLength={200}
              disabled={saving}
              className="cyber-input w-full mt-1 text-sm"
              placeholder="One line…"
              value={worstNote}
              onChange={(e) => setWorstNote(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="cyber-btn-primary w-full disabled:opacity-50"
          >
            {saving ? 'Saving…' : 'Save review'}
          </button>
        </form>
      )}
    </section>
  );
}
