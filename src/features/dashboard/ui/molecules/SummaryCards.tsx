import { Card } from '../atoms/Card';
import { formatMoney } from '@/shared/lib/format';
import type { DashboardSummary } from '../../types';

interface SummaryCardsProps {
  summary: DashboardSummary;
}

export function SummaryCards({ summary }: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-3 mb-5">
      <Card label="Total ARS" value={formatMoney(summary.totalARS)} />
      <Card label="Total USD" value={formatMoney(summary.totalUSD, 'USD')} />
      <Card label="Gastos" value={String(summary.expenseCount)} small />
      <Card label="Categorías" value={String(summary.categoryCount)} small />
    </div>
  );
}
