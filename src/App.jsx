import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import { findPlan } from './lib/subscriptionPlans';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import LandingPage from './components/LandingPage';

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [guestScreen, setGuestScreen] = useState('landing');
  const [authIntent, setAuthIntent] = useState({
    mode: 'sign-up',
    planId: 'starter',
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const openAuth = ({ mode = 'sign-in', planId = 'starter' } = {}) => {
    setAuthIntent({ mode, planId });
    setGuestScreen('auth');
  };

  if (loading) {
    return <div className="cyber-loading">LOADING APEX MATRIX...</div>;
  }

  if (session) {
    return <Dashboard session={session} />;
  }

  if (guestScreen === 'auth') {
    return (
      <Auth
        initialMode={authIntent.mode}
        selectedPlan={findPlan(authIntent.planId)}
        onBack={() => setGuestScreen('landing')}
      />
    );
  }

  return (
    <LandingPage
      onSignIn={() => openAuth({ mode: 'sign-in', planId: 'starter' })}
      onChoosePlan={(planId) => openAuth({ mode: 'sign-up', planId })}
    />
  );
}
