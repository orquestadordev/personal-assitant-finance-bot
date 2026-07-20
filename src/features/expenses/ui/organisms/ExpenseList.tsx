'use client';

import { ExpenseItem } from '../molecules/ExpenseItem';
import type { Expense } from '@/shared/types/database';

interface ExpenseListProps {
  expenses: Expense[];
}

export function ExpenseList({ expenses }: ExpenseListProps) {
  if (expenses.length === 0) {
    return <div className="py-10 text-center text-finance-muted">No hay gastos</div>;
  }

  const grouped = expenses.reduce<Record<string, Expense[]>>((acc, expense) => {
    const label = formatGroupDate(expense.created_at);
    acc[label] = [...(acc[label] ?? []), expense];
    return acc;
  }, {});

  return (
    <div className="space-y-7">
      {Object.entries(grouped).map(([date, items]) => (
        <section key={date}>
          <h3 className="mb-4 text-[16px] font-extrabold text-finance-secondary">{date}</h3>
          <div className="space-y-3">
            {items.map((expense) => (
              <ExpenseItem key={expense.id} expense={expense} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function formatGroupDate(dateStr: string) {
  const date = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  const dayMonth = date.toLocaleDateString('es-AR', { day: 'numeric', month: 'short' });

  if (date.toDateString() === today.toDateString()) return `Hoy, ${dayMonth}`;
  if (date.toDateString() === yesterday.toDateString()) return `Ayer, ${dayMonth}`;

  return dayMonth;
}
