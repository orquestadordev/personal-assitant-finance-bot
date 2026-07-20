export function formatMoney(amount: number, currency: 'ARS' | 'USD' = 'ARS'): string {
  const prefix = currency === 'USD' ? 'u$s' : '$';
  const value = currency === 'USD'
    ? Number(amount).toLocaleString('en-US', {
        minimumFractionDigits: Number.isInteger(Number(amount)) ? 0 : 2,
        maximumFractionDigits: 2,
      })
    : Number(amount).toLocaleString('es-AR', { maximumFractionDigits: 0 });

  return `${prefix} ${value}`;
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('es-AR');
}

export function formatCompactMoney(amount: number, currency: 'ARS' | 'USD' = 'ARS'): string {
  const prefix = currency === 'USD' ? 'u$s' : '$';

  if (currency === 'USD') {
    return `${prefix}${Number(amount).toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
  }

  const value = Math.abs(amount) >= 1000
    ? `${Number(amount / 1000).toLocaleString('en-US', { maximumFractionDigits: 1 })}K`
    : Number(amount).toLocaleString('es-AR', { maximumFractionDigits: 0 });

  return `${prefix}${value}`;
}

export const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
] as const;
