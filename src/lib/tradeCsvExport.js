const HEADERS = [
  'created_at',
  'level',
  'trade_type',
  'pnl',
  'starting_capital',
  'ending_capital',
  'notes',
];

function escapeCsvField(value) {
  const s = value == null ? '' : String(value);
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function rowToLine(values) {
  return values.map(escapeCsvField).join(',');
}

/**
 * @param {Array<Record<string, unknown>>} trades
 * @returns {string}
 */
export function buildTradesCsv(trades) {
  const lines = [rowToLine(HEADERS)];
  for (const t of trades ?? []) {
    lines.push(
      rowToLine([
        t.created_at ?? '',
        t.level ?? '',
        t.trade_type ?? '',
        t.pnl ?? '',
        t.starting_capital ?? '',
        t.ending_capital ?? '',
        t.notes ?? '',
      ]),
    );
  }
  return `${lines.join('\r\n')}\r\n`;
}

export function defaultTradesExportFilename(filterId = 'all') {
  const day = new Date().toISOString().slice(0, 10);
  const suffix = filterId === 'all' ? 'all' : filterId;
  return `apextrader-trades-${day}-${suffix}.csv`;
}

export function downloadTextFile(filename, text, mimeType = 'text/csv;charset=utf-8') {
  const blob = new Blob([text], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.rel = 'noopener';
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export function exportTradesCsv(trades, filterId = 'all') {
  const csv = buildTradesCsv(trades);
  downloadTextFile(defaultTradesExportFilename(filterId), csv);
}
