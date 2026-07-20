import { Card } from '../atoms/Card';
import { formatCompactMoney } from '@/shared/lib/format';
import type { DashboardSummary } from '../../types';

interface SummaryCardsProps {
  summary: DashboardSummary;
}

export function SummaryCards({ summary }: SummaryCardsProps) {
  return (
    <div className="mb-8 grid grid-cols-2 gap-4">
      <Card label="Total ARS" value={formatCompactMoney(summary.totalARS)} />
      <Card label="Total USD" value={formatCompactMoney(summary.totalUSD, 'USD')} />
      <Card label="Cant. gastos" value={String(summary.expenseCount)} small />
      <Card label="Categorías" value={String(summary.categoryCount)} small />
    </div>
  );
}
