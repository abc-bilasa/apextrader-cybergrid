import { useEffect, useMemo, useState } from 'react';
import { getLossStreakCooldown } from '../lib/lossStreakCooldown';

export function useLossStreakCooldown(trades) {
  const [now, setNow] = useState(() => Date.now());

  const status = useMemo(() => getLossStreakCooldown(trades, now), [trades, now]);

  useEffect(() => {
    if (!status.active) return undefined;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [status.active]);

  return status;
}
