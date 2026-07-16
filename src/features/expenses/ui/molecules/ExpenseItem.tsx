import { AmountBadge } from '../atoms/AmountBadge';
import { formatDate } from '@/shared/lib/format';
import type { Expense } from '@/shared/types/database';

interface ExpenseItemProps {
  expense: Expense;
}

export function ExpenseItem({ expense }: ExpenseItemProps) {
  return (
    <div className="bg-dark-card rounded-xl px-4 py-3 flex justify-between items-center">
      <div className="flex flex-col gap-0.5">
        <span className="text-sm text-white capitalize">{expense.description}</span>
        <span className="text-xs text-gray-600">
          {formatDate(expense.created_at)} · {expense.categories?.name || '—'}
        </span>
      </div>
      <AmountBadge amount={expense.amount} currency={expense.currency} />
    </div>
  );
}
