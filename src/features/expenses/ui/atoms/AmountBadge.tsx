import { formatMoney } from '@/shared/lib/format';

interface AmountBadgeProps {
  amount: number;
  currency: 'ARS' | 'USD';
}

export function AmountBadge({ amount, currency }: AmountBadgeProps) {
  const colorClass = currency === 'ARS' ? 'text-money-ars' : 'text-money-usd';
  return (
    <span className={`whitespace-nowrap text-[22px] font-extrabold ${colorClass}`}>
      - {formatMoney(amount, currency)}
    </span>
  );
}
