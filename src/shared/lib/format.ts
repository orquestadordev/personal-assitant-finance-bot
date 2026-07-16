export function formatMoney(amount: number, currency: 'ARS' | 'USD' = 'ARS'): string {
  const prefix = currency === 'USD' ? 'U$S' : '$';
  return `${prefix}${Number(amount).toLocaleString('es-AR', { maximumFractionDigits: 0 })}`;
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('es-AR');
}

export const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
] as const;
