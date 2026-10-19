import { localDateKey, todayLocalDateKey } from './tradeDay.js';

/**
 * @param {Array<{ created_at: string, pnl: number }>} trades
 * @returns {Map<string, { pnl: number, count: number, trades: object[] }>}
 */
export function aggregateTradesByLocalDay(trades) {
  const map = new Map();
  for (const trade of trades ?? []) {
    if (!trade?.created_at) continue;
    const key = localDateKey(trade.created_at);
    const row = map.get(key) ?? { pnl: 0, count: 0, trades: [] };
    row.pnl += Number(trade.pnl);
    row.count += 1;
    row.trades.push(trade);
    map.set(key, row);
  }
  for (const row of map.values()) {
    row.trades.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  }
  return map;
}

/** @returns {{ year: number, month: number }} month is 1–12 */
export function parseYearMonth(year, month) {
  const y = Number(year);
  const m = Number(month);
  if (!Number.isFinite(y) || !Number.isFinite(m)) {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() + 1 };
  }
  return { year: y, month: Math.max(1, Math.min(12, m)) };
}

export function shiftMonth(year, month, delta) {
  const d = new Date(year, month - 1 + delta, 1);
  return { year: d.getFullYear(), month: d.getMonth() + 1 };
}

/**
 * @typedef {{ dateKey: string|null, day: number|null, inMonth: boolean, isToday: boolean }} CalendarCell
 */

/** Sunday-first week rows for a month view. */
export function buildMonthGrid(year, month, todayKey = todayLocalDateKey()) {
  const { year: y, month: m } = parseYearMonth(year, month);
  const first = new Date(y, m - 1, 1);
  const startPad = first.getDay();
  const daysInMonth = new Date(y, m, 0).getDate();

  const cells = [];
  for (let i = 0; i < startPad; i += 1) {
    cells.push({ dateKey: null, day: null, inMonth: false, isToday: false });
  }
  for (let day = 1; day <= daysInMonth; day += 1) {
    const dateKey = `${y}-${String(m).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    cells.push({
      dateKey,
      day,
      inMonth: true,
      isToday: dateKey === todayKey,
    });
  }
  while (cells.length % 7 !== 0) {
    cells.push({ dateKey: null, day: null, inMonth: false, isToday: false });
  }
  return cells;
}

export function formatMonthTitle(year, month) {
  return new Date(year, month - 1, 1).toLocaleDateString('en-IN', {
    month: 'long',
    year: 'numeric',
  });
}

export function formatDayHeading(dateKey) {
  const [y, mo, d] = dateKey.split('-').map(Number);
  return new Date(y, mo - 1, d).toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/** Compact P&L for calendar cell (e.g. +1.2k). */
export function formatCompactPnl(pnl) {
  const n = Number(pnl);
  if (!Number.isFinite(n) || n === 0) return '0';
  const sign = n > 0 ? '+' : '−';
  const abs = Math.abs(n);
  if (abs >= 100000) return `${sign}₹${(abs / 100000).toFixed(1)}L`;
  if (abs >= 1000) return `${sign}₹${(abs / 1000).toFixed(1)}k`;
  return `${sign}₹${Math.round(abs)}`;
}
