export default function TradeLogger({ onTradeLogged }) {
  return (
    <div className="cyber-card p-5 rounded-xl">
      <p className="text-xs text-slate-400">Trade logger — wire to supabase.rpc('log_trade').</p>
    </div>
  );
}
