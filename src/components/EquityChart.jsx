export default function EquityChart({ trades, initialCapital }) {
  return (
    <div className="cyber-card p-5 rounded-xl">
      <p className="text-xs text-slate-400">
        Equity chart — {trades?.length ?? 0} trades, base {initialCapital}.
      </p>
    </div>
  );
}
