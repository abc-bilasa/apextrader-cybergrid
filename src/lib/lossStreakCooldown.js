import { currentLossStreak } from './disciplineStats.js';

/** D14: trigger after this many consecutive losses. */
export const COOLDOWN_LOSS_THRESHOLD = 3;

/** D14: pause window from timestamp of latest loss in the streak. */
export const COOLDOWN_DURATION_MS = 15 * 60 * 1000;

function latestTradeTimestamp(trades) {
  const list = trades ?? [];
  if (list.length === 0) return null;
  let latest = null;
  for (const t of list) {
    if (!t?.created_at) continue;
    const ms = new Date(t.created_at).getTime();
    if (!Number.isFinite(ms)) continue;
    if (latest == null || ms > latest) latest = ms;
  }
  return latest;
}

/**
 * Advisory cool-down after a loss streak (UI only).
 * @returns {{ active: boolean, streak: number, remainingMs: number, endsAt: number|null, threshold: number, durationMinutes: number }}
 */
export function getLossStreakCooldown(trades, nowMs = Date.now()) {
  const streak = currentLossStreak(trades);
  const threshold = COOLDOWN_LOSS_THRESHOLD;
  const durationMinutes = COOLDOWN_DURATION_MS / 60000;

  if (streak < threshold) {
    return {
      active: false,
      streak,
      remainingMs: 0,
      endsAt: null,
      threshold,
      durationMinutes,
    };
  }

  const lastAt = latestTradeTimestamp(trades);
  if (lastAt == null) {
    return {
      active: false,
      streak,
      remainingMs: 0,
      endsAt: null,
      threshold,
      durationMinutes,
    };
  }

  const endsAt = lastAt + COOLDOWN_DURATION_MS;
  const remainingMs = Math.max(0, endsAt - nowMs);

  return {
    active: remainingMs > 0,
    streak,
    remainingMs,
    endsAt,
    threshold,
    durationMinutes,
  };
}

export function formatCooldownRemaining(remainingMs) {
  if (!Number.isFinite(remainingMs) || remainingMs <= 0) return '0:00';
  const totalSec = Math.ceil(remainingMs / 1000);
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}
