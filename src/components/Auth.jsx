import { useState } from 'react';
import { Zap } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Auth() {
  const [mode, setMode] = useState('sign-in');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isSignUp = mode === 'sign-up';

  const switchMode = (next) => {
    setMode(next);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isSignUp) {
      setError('Sign-in is not wired yet — use Sign up or wait for the next release.');
      return;
    }

    setLoading(true);
    const { error: signUpError } = await supabase.auth.signUp({
      email: email.trim(),
      password,
    });
    setLoading(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-cyber-dark">
      <div className="cyber-card p-8 rounded-2xl w-full max-w-md border border-cyan-500/30">
        <div className="flex flex-col items-center text-center mb-8">
          <Zap className="w-10 h-10 text-cyan-400 animate-pulse mb-3" aria-hidden />
          <h1 className="text-2xl font-black tracking-wider text-cyan-400">APEX TRADER</h1>
          <p className="text-xs uppercase tracking-widest text-slate-400 mt-1">Cyber-Grid journal</p>
        </div>

        {error ? (
          <div className="cyber-alert-error mb-5" role="alert">
            {error}
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="cyber-label" htmlFor="auth-email">Email</label>
            <input
              id="auth-email"
              type="email"
              autoComplete="email"
              required
              disabled={loading}
              className="cyber-input w-full mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="cyber-label" htmlFor="auth-password">Password</label>
            <input
              id="auth-password"
              type="password"
              autoComplete={isSignUp ? 'new-password' : 'current-password'}
              required
              minLength={6}
              disabled={loading}
              className="cyber-input w-full mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="cyber-btn-primary cyber-glow w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Working…' : isSignUp ? 'Create account' : 'Sign in'}
          </button>
        </form>

        <p className="text-center text-sm text-slate-400 mt-6">
          {isSignUp ? 'Already have an account?' : 'New to the grid?'}{' '}
          <button
            type="button"
            className="text-cyan-400 hover:text-cyber-neon underline-offset-2 hover:underline"
            onClick={() => switchMode(isSignUp ? 'sign-in' : 'sign-up')}
          >
            {isSignUp ? 'Sign in' : 'Sign up'}
          </button>
        </p>
      </div>
    </div>
  );
}
