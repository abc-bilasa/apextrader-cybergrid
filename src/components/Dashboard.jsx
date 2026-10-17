import { LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Dashboard({ session }) {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen bg-cyber-dark text-slate-100 p-6">
      <header className="flex items-center justify-between gap-4 mb-6">
        <p className="text-cyan-400 font-mono text-sm">
          Dashboard — {session?.user?.email ?? 'trader'}
        </p>
        <button
          type="button"
          onClick={handleSignOut}
          className="cyber-btn-ghost inline-flex items-center gap-2 text-sm"
        >
          <LogOut className="w-4 h-4" aria-hidden />
          Sign out
        </button>
      </header>
      <p className="text-slate-400 text-sm">Trading UI ships in F-012+.</p>
    </div>
  );
}
