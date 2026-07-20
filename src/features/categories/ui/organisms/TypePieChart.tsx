'use client';

import { useMemo, useState } from 'react';
import { Home, Server, Wifi, Zap } from 'lucide-react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { formatMoney } from '@/shared/lib/format';
import type { TypeSummary } from '@/features/dashboard/types';
import type { Expense } from '@/shared/types/database';

interface TypePieChartProps {
  data: TypeSummary[];
  compact?: boolean;
  expenses?: Expense[];
}

const COLORS = ['#4ecca3', '#a8d5ff'];
const TYPE_LABELS: Record<string, string> = {
  fijo: 'Fijo',
  variable: 'Variable',
};
const CATEGORY_ICONS = [Home, Zap, Wifi, Server];

export function TypePieChart({ data, compact = false, expenses = [] }: TypePieChartProps) {
  const [currency, setCurrency] = useState<'ARS' | 'USD'>('ARS');
  const chartData = useMemo(() => {
    if (compact || expenses.length === 0) return data;

    const totals: Record<'Fijo' | 'Variable', number> = { Fijo: 0, Variable: 0 };

    for (const expense of expenses) {
      if (expense.currency !== currency) continue;

      const type = TYPE_LABELS[expense.expense_types?.name ?? 'variable'] as 'Fijo' | 'Variable';
      totals[type] += Number(expense.amount);
    }

    return Object.entries(totals).map(([name, value]) => ({ name, value }));
  }, [compact, currency, data, expenses]);
  const total = chartData.reduce((sum, item) => sum + item.value, 0);
  const fixed = chartData.find((item) => item.name === 'Fijo')?.value ?? 0;
  const variable = chartData.find((item) => item.name === 'Variable')?.value ?? 0;
  const fixedPercent = total > 0 ? Math.round((fixed / total) * 100) : 0;
  const variablePercent = Math.max(0, 100 - fixedPercent);

  const categoryBreakdown = useMemo(() => {
    const grouped = new Map<string, { amount: number; type: string }>();

    for (const expense of expenses) {
      if (expense.currency !== currency) continue;

      const name = expense.categories?.name ?? 'Sin categoría';
      const current = grouped.get(name);

      grouped.set(name, {
        amount: (current?.amount ?? 0) + Number(expense.amount),
        type: TYPE_LABELS[expense.expense_types?.name ?? 'variable'],
      });
    }

    const fixedItems = Array.from(grouped, ([name, value]) => ({ name, ...value }))
      .filter((item) => item.type === 'Fijo')
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 4);

    if (fixedItems.length > 0) return fixedItems;

    return Array.from(grouped, ([name, value]) => ({ name, ...value }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 4);
  }, [currency, expenses]);

  if (chartData.length === 0 || total === 0) {
    return (
      <div className="rounded-card bg-finance-raised px-6 py-8 text-center text-finance-muted">
        Sin datos
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {!compact && (
        <div className="mx-auto grid w-[210px] grid-cols-2 rounded-pill bg-finance-surface p-1.5 text-[14px] font-extrabold">
          {(['ARS', 'USD'] as const).map((item) => (
            <button
              key={item}
              onClick={() => setCurrency(item)}
              className={`rounded-pill px-7 py-2 transition ${
                currency === item ? 'bg-finance-primary text-finance-bg' : 'text-finance-secondary'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      )}

      <section className="rounded-card bg-finance-raised px-6 py-7">
        <h2 className="mb-6 text-[22px] font-bold text-finance-secondary">
          {compact ? 'Distribución' : 'Distribución Mensual'}
        </h2>

        <div className="relative mx-auto h-[230px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={compact ? 52 : 72}
                outerRadius={compact ? 94 : 106}
                paddingAngle={0}
                stroke="none"
                startAngle={90}
                endAngle={-270}
              >
                {chartData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center pt-1">
            <span className="text-[17px] font-extrabold text-finance-secondary">Total</span>
            <span className="mt-2 text-[25px] font-extrabold text-finance-text">
              {formatMoney(total, compact ? 'ARS' : currency)}
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between px-2 text-[19px] font-extrabold text-finance-secondary">
          <div>
            <div className="flex items-center gap-2">
              <span className="size-3.5 rounded-full bg-money-ars" />
              Fijo
            </div>
            <div className="pl-6 text-finance-text">{fixedPercent}%</div>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end gap-2">
              Variable
              <span className="size-3.5 rounded-full bg-[#a8d5ff]" />
            </div>
            <div className="pr-6 text-finance-text">{variablePercent}%</div>
          </div>
        </div>
      </section>

      {!compact && (
        <section className="overflow-hidden rounded-card bg-finance-raised">
          <div className="flex items-center justify-between border-b border-finance-stroke/25 px-6 py-5">
            <h3 className="flex items-center gap-2 text-[22px] font-extrabold text-finance-text">
              <span className="size-2.5 rounded-full bg-finance-primary" />
              Gastos Fijos
            </h3>
            <span className="text-[17px] font-extrabold text-finance-secondary">
              {formatMoney(categoryBreakdown.reduce((sum, item) => sum + item.amount, 0), currency)}
            </span>
          </div>

          <div className="px-6 py-5">
            {categoryBreakdown.map((item, index) => {
              const Icon = CATEGORY_ICONS[index % CATEGORY_ICONS.length];

              return (
                <div key={item.name} className="flex items-center justify-between py-4">
                  <div className="flex min-w-0 items-center gap-5">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-finance-bg text-finance-primary">
                      <Icon className="size-6" strokeWidth={2.5} />
                    </span>
                    <span className="truncate text-[22px] font-extrabold text-finance-text">{item.name}</span>
                  </div>
                  <span className="shrink-0 text-[21px] font-bold text-finance-text">
                    {formatMoney(item.amount, currency)}
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
