/** D11: calendar day from ISO timestamp in the user's local timezone. */
export function localDateKey(iso) {
  const d = new Date(iso);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function todayLocalDateKey(referenceDate = new Date()) {
  const y = referenceDate.getFullYear();
  const m = String(referenceDate.getMonth() + 1).padStart(2, '0');
  const day = String(referenceDate.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** Sum `pnl` for trades on the given local day (default: today). */
export function sumPnlForLocalDay(trades, dayKey = todayLocalDateKey()) {
  let total = 0;
  for (const trade of trades ?? []) {
    if (!trade?.created_at) continue;
    if (localDateKey(trade.created_at) !== dayKey) continue;
    total += Number(trade.pnl);
  }
  return total;
}

/** Sum all trade P&L in the journal (lifetime in app). */
export function sumAllTradePnl(trades) {
  let total = 0;
  for (const trade of trades ?? []) {
    total += Number(trade.pnl);
  }
  return total;
}
