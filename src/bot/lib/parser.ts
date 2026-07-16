export interface ParsedExpense {
  amount: number;
  description: string;
  currency: 'ARS' | 'USD';
}

const USD_PATTERNS = [
  /\busd\b/i,
  /\bu\$s\b/i,
  /\bdolar(?:es)?\b/i,
  /\buss?\b/i,
];

const AMOUNT_PATTERN = /\$?\s*(\d{1,3}(?:[.,]\d{3})+(?:[.,]\d{1,2})?|\d+(?:[.,]\d{1,2})?)/;

export function parseExpenseMessage(text: string): ParsedExpense | null {
  if (!text || typeof text !== 'string') return null;

  const cleaned = text.trim();
  if (cleaned.startsWith('/')) return null;

  let currency: 'ARS' | 'USD' = 'ARS';
  let textWithoutCurrency = cleaned;

  for (const pattern of USD_PATTERNS) {
    if (pattern.test(cleaned)) {
      currency = 'USD';
      textWithoutCurrency = cleaned.replace(pattern, '').trim();
      break;
    }
  }

  const amountMatch = textWithoutCurrency.match(AMOUNT_PATTERN);
  if (!amountMatch) return null;

  let amountStr = amountMatch[1];
  if (/^\d{1,3}\.\d{3}/.test(amountStr)) {
    amountStr = amountStr.replace(/\./g, '');
  }
  amountStr = amountStr.replace(',', '.');

  const amount = parseFloat(amountStr);
  if (isNaN(amount) || amount <= 0) return null;

  const description = textWithoutCurrency
    .replace(AMOUNT_PATTERN, '')
    .replace(/\$/g, '')
    .trim()
    .toLowerCase();

  if (!description) return null;

  return { amount, description, currency };
}
