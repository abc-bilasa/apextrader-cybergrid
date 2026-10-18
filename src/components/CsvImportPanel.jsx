import { useRef, useState } from 'react';
import { FileUp } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { formatINR } from '../lib/formulas';
import { parseTradeCsv } from '../lib/csvTradeImport';

export default function CsvImportPanel({ onTradeLogged }) {
  const inputRef = useRef(null);
  const [parsed, setParsed] = useState(null);
  const [parseError, setParseError] = useState('');
  const [fileName, setFileName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [fieldError, setFieldError] = useState('');

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    setParseError('');
    setParsed(null);
    setFieldError('');
    if (!file) return;

    setFileName(file.name);
    try {
      const text = await file.text();
      const result = parseTradeCsv(text);
      if (!result.ok) {
        setParseError(result.error);
        return;
      }
      setParsed(result);
    } catch {
      setParseError('Could not read the file.');
    }
  };

  const handleImport = async () => {
    if (!parsed?.ok) return;
    setSubmitting(true);
    setFieldError('');

    const notes = `CSV import (${fileName}): ${parsed.rowCount} rows, column "${parsed.pnlColumn}".`;

    try {
      const { data, error } = await supabase.rpc('log_trade', {
        p_pnl: parsed.totalPnl,
        p_notes: notes,
      });
      if (error) {
        setFieldError(error.message);
        return;
      }
      setParsed(null);
      setFileName('');
      if (inputRef.current) inputRef.current.value = '';
      if (onTradeLogged) await onTradeLogged(data);
    } catch {
      setFieldError('Import failed. Check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="cyber-card p-5 rounded-xl border border-cyan-500/10">
      <h2 className="cyber-section-title mb-1 flex items-center gap-2">
        <FileUp className="w-4 h-4 text-cyan-400 shrink-0" aria-hidden />
        Import CSV
      </h2>
      <p className="text-[10px] text-slate-500 mb-4">
        Sum P&amp;L column → one <code className="text-cyan-600/80">log_trade</code> (Zerodha tax P&amp;L
        or any CSV with pnl / Realized P&amp;L).
      </p>

      {fieldError ? (
        <div className="cyber-alert-error mb-3 text-xs" role="alert">{fieldError}</div>
      ) : null}
      {parseError ? (
        <div className="text-xs text-rose-300 mb-3 border border-rose-500/25 rounded-lg px-3 py-2" role="alert">
          {parseError}
        </div>
      ) : null}

      <input
        ref={inputRef}
        type="file"
        accept=".csv,text/csv"
        disabled={submitting}
        className="block w-full text-xs text-slate-400 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border file:border-cyan-500/30 file:bg-slate-900 file:text-cyan-300 file:text-xs disabled:opacity-50"
        onChange={handleFile}
      />

      {parsed?.ok ? (
        <div className="mt-4 space-y-3 text-xs">
          <p className="text-slate-300">
            <span className="text-slate-500">Rows:</span> {parsed.rowCount} ·{' '}
            <span className="text-slate-500">Column:</span> {parsed.pnlColumn}
          </p>
          <p className="font-mono cyber-metric text-lg tabular-nums text-cyan-300">
            Total {formatINR(parsed.totalPnl)}
          </p>
          <ul className="text-slate-500 font-mono space-y-0.5">
            {parsed.preview.map((row) => (
              <li key={row.row}>
                Row {row.row}: {formatINR(row.pnl)}
              </li>
            ))}
            {parsed.rowCount > parsed.preview.length ? (
              <li>…and {parsed.rowCount - parsed.preview.length} more</li>
            ) : null}
          </ul>
          <button
            type="button"
            disabled={submitting}
            className="cyber-btn-primary w-full disabled:opacity-50"
            onClick={handleImport}
          >
            {submitting ? 'Logging…' : 'Log combined P&L as one trade'}
          </button>
        </div>
      ) : null}
    </section>
  );
}
