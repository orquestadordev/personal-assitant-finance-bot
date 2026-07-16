import { formatMoney } from '@/shared/lib/format';

interface AmountBadgeProps {
  amount: number;
  currency: 'ARS' | 'USD';
}

export function AmountBadge({ amount, currency }: AmountBadgeProps) {
  const colorClass = currency === 'ARS' ? 'text-money-ars' : 'text-money-usd';
  return (
    <span className={`font-bold text-base ${colorClass}`}>
      {formatMoney(amount, currency)}
    </span>
  );
}
