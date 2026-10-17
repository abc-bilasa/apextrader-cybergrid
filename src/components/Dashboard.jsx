import { LogOut, Zap } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { formatINR } from '../lib/formulas';

/** Placeholders until F-014 loads `trading_accounts`. */
const PLACEHOLDER_LEVEL = 1;
const PLACEHOLDER_CAPITAL = 10000;

export default function Dashboard({ session }) {
  const email = session?.user?.email ?? 'trader';

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen bg-cyber-dark text-slate-100 p-4 md:p-6">
      <header
        className="cyber-card rounded-xl border border-cyan-500/20 p-4 flex flex-wrap items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3 min-w-0">
          <Zap className="w-7 h-7 text-cyan-400 shrink-0" aria-hidden />
          <span className="text-lg font-black tracking-wider text-cyan-400 truncate">
            APEX TRADER
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm">
          <span className="font-mono cyber-metric text-slate-100">
            LV <span className="text-cyan-400">{PLACEHOLDER_LEVEL}</span>/42
          </span>
          <span className="font-mono cyber-metric text-emerald-400">
            {formatINR(PLACEHOLDER_CAPITAL)}
          </span>
          <span className="text-slate-400 max-w-[12rem] truncate hidden sm:inline" title={email}>
            {email}
          </span>
          <button
            type="button"
            onClick={handleSignOut}
            className="cyber-btn-ghost inline-flex items-center gap-2"
          >
            <LogOut className="w-5 h-5" aria-hidden />
            <span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
      </header>

      <p className="text-slate-500 text-sm mt-6 px-1">Dashboard layout — F-013+.</p>
    </div>
  );
}
