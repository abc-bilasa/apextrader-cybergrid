import { localDateKey, todayLocalDateKey } from './tradeDay';

const REVENGE_WINDOW_MS = 15 * 60 * 1000;

function sortedTrades(trades) {
  return [...(trades ?? [])].sort(
    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
  );
}

function isLoss(trade) {
  if (trade.trade_type === 'LOSS') return true;
  if (trade.trade_type === 'PROFIT') return false;
  return Number(trade.pnl) < 0;
}

/** Consecutive losses from most recent trade backward. */
export function currentLossStreak(trades) {
  const ordered = sortedTrades(trades);
  let streak = 0;
  for (let i = ordered.length - 1; i >= 0; i -= 1) {
    if (!isLoss(ordered[i])) break;
    streak += 1;
  }
  return streak;
}

export function countTradesOnDay(trades, dayKey = todayLocalDateKey()) {
  return (trades ?? []).filter((t) => t?.created_at && localDateKey(t.created_at) === dayKey).length;
}

/** Mean minutes between consecutive trades (today only if ≥2 today trades, else last session). */
export function averageMinutesBetweenTrades(trades, dayKey = todayLocalDateKey()) {
  const ordered = sortedTrades(trades);
  const todayTrades = ordered.filter((t) => localDateKey(t.created_at) === dayKey);
  const sample = todayTrades.length >= 2 ? todayTrades : ordered;

  if (sample.length < 2) return null;

  let totalMs = 0;
  for (let i = 1; i < sample.length; i += 1) {
    totalMs +=
      new Date(sample[i].created_at).getTime() - new Date(sample[i - 1].created_at).getTime();
  }
  return totalMs / (sample.length - 1) / 60000;
}

/** Trades logged within 15m after a losing trade. */
export function countRevengeWindowTrades(trades, windowMs = REVENGE_WINDOW_MS) {
  const ordered = sortedTrades(trades);
  let count = 0;
  for (let i = 1; i < ordered.length; i += 1) {
    if (!isLoss(ordered[i - 1])) continue;
    const gap =
      new Date(ordered[i].created_at).getTime() - new Date(ordered[i - 1].created_at).getTime();
    if (gap > 0 && gap <= windowMs) count += 1;
  }
  return count;
}

export function countLevelTransitions(levelHistory, reason) {
  return (levelHistory ?? []).filter((row) => row.trigger_reason === reason).length;
}

export function getDisciplineMetrics(trades, levelHistory) {
  const todayKey = todayLocalDateKey();
  const lossStreak = currentLossStreak(trades);
  const tradesToday = countTradesOnDay(trades, todayKey);
  const avgGapMin = averageMinutesBetweenTrades(trades, todayKey);
  const revengeCount = countRevengeWindowTrades(trades);
  const promotions = countLevelTransitions(levelHistory, 'TARGET_MET');
  const demotions = countLevelTransitions(levelHistory, 'DRAWDOWN_HIT');
  const totalTrades = trades?.length ?? 0;

  return {
    lossStreak,
    tradesToday,
    avgGapMin,
    revengeCount,
    promotions,
    demotions,
    totalTrades,
    revengeWindowMinutes: REVENGE_WINDOW_MS / 60000,
  };
}
