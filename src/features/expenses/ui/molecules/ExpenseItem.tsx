import {
  Car,
  Clapperboard,
  Server,
  ShoppingCart,
  type LucideIcon,
} from 'lucide-react';
import { AmountBadge } from '../atoms/AmountBadge';
import type { Expense } from '@/shared/types/database';

interface ExpenseItemProps {
  expense: Expense;
}

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  supermercado: ShoppingCart,
  comida: ShoppingCart,
  uber: Car,
  transporte: Car,
  netflix: Clapperboard,
  entretenimiento: Clapperboard,
  digitalocean: Server,
  servicios: Server,
};

function getCategoryIcon(expense: Expense) {
  const key = `${expense.description} ${expense.categories?.name ?? ''}`.toLowerCase();
  const match = Object.entries(CATEGORY_ICONS).find(([name]) => key.includes(name));

  return match?.[1] ?? ShoppingCart;
}

export function ExpenseItem({ expense }: ExpenseItemProps) {
  const Icon = getCategoryIcon(expense);

  return (
    <article className="flex min-h-[104px] items-center justify-between gap-4 rounded-card bg-finance-surface px-5 py-4">
      <div className="flex min-w-0 items-center gap-5">
        <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-finance-soft text-finance-secondary">
          <Icon className="size-8" strokeWidth={2.2} />
        </span>
        <div className="min-w-0">
          <h3 className="truncate text-[23px] font-extrabold leading-tight text-finance-text">
            {expense.description}
          </h3>
          <p className="truncate text-[18px] font-medium leading-tight text-finance-secondary">
            {expense.categories?.name || 'Sin categoría'}
          </p>
        </div>
      </div>
      <AmountBadge amount={expense.amount} currency={expense.currency} />
    </article>
  );
}
