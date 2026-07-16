'use client';

import { ExpenseItem } from '../molecules/ExpenseItem';
import type { Expense } from '@/shared/types/database';

interface ExpenseListProps {
  expenses: Expense[];
}

export function ExpenseList({ expenses }: ExpenseListProps) {
  if (expenses.length === 0) {
    return <div className="text-center text-gray-600 py-10">No hay gastos</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      {expenses.map((expense) => (
        <ExpenseItem key={expense.id} expense={expense} />
      ))}
    </div>
  );
}
