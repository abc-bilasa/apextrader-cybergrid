/** Parse a single CSV line respecting double-quoted fields. */
export function parseCsvLine(line) {
  const fields = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === ',' && !inQuotes) {
      fields.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  fields.push(current.trim());
  return fields;
}

function normalizeHeader(header) {
  return header.toLowerCase().replace(/[^a-z0-9]/g, '');
}

/** Pick a P&L column (Zerodha "Realized P&L", generic pnl, etc.). */
export function findPnlColumnIndex(headers) {
  const normalized = headers.map(normalizeHeader);
  const exact = ['pnl', 'netpnl', 'realizedpnl', 'profitandloss', 'pl'];
  for (const key of exact) {
    const idx = normalized.indexOf(key);
    if (idx >= 0) return idx;
  }
  for (let i = 0; i < normalized.length; i += 1) {
    const h = normalized[i];
    if (h.includes('pnl')) return i;
    if (h.includes('realized') && (h.includes('profit') || h.includes('pl'))) return i;
    if (h === 'pl' || h.endsWith('pl') && h.includes('net')) return i;
  }
  return -1;
}

export function parsePnlCell(raw) {
  if (raw == null || raw === '') return null;
  const cleaned = String(raw).replace(/[₹,\s]/g, '').replace(/[()]/g, '');
  const neg = cleaned.startsWith('-') || raw.includes('(');
  const num = Number(cleaned.replace(/[^\d.-]/g, ''));
  if (!Number.isFinite(num)) return null;
  return neg && num > 0 ? -num : num;
}

/**
 * @param {string} text Raw CSV file text
 * @returns {{ ok: true, rowCount: number, totalPnl: number, pnlColumn: string, preview: object[] } | { ok: false, error: string }}
 */
export function parseTradeCsv(text) {
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  if (lines.length < 2) {
    return { ok: false, error: 'CSV needs a header row and at least one data row.' };
  }

  const headers = parseCsvLine(lines[0]);
  const pnlIdx = findPnlColumnIndex(headers);
  if (pnlIdx < 0) {
    return {
      ok: false,
      error:
        'No P&L column found. Use a header like pnl, net_pnl, or Realized P&L (Zerodha tax P&L export).',
    };
  }

  let totalPnl = 0;
  let rowCount = 0;
  const preview = [];

  for (let i = 1; i < lines.length; i += 1) {
    const cols = parseCsvLine(lines[i]);
    if (cols.every((c) => c === '')) continue;
    const pnl = parsePnlCell(cols[pnlIdx]);
    if (pnl == null) continue;
    totalPnl += pnl;
    rowCount += 1;
    if (preview.length < 5) {
      preview.push({ row: i + 1, pnl, raw: cols[pnlIdx] });
    }
  }

  if (rowCount === 0) {
    return { ok: false, error: 'No numeric P&L values found in the selected column.' };
  }

  return {
    ok: true,
    rowCount,
    totalPnl,
    pnlColumn: headers[pnlIdx],
    preview,
  };
}
