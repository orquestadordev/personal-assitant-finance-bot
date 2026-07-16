'use client';

import { useState } from 'react';
import { FilterChip } from '../atoms/FilterChip';
import { ExpenseList } from '../organisms/ExpenseList';
import type { Expense } from '@/shared/types/database';

interface ExpensesTemplateProps {
  expenses: Expense[];
}

const CURRENCY_FILTERS = ['Todos', 'ARS', 'USD'] as const;

export function ExpensesTemplate({ expenses }: ExpensesTemplateProps) {
  const [currencyFilter, setCurrencyFilter] = useState<string>('Todos');

  const filtered = currencyFilter === 'Todos'
    ? expenses
    : expenses.filter((e) => e.currency === currencyFilter);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 overflow-x-auto pb-1">
        {CURRENCY_FILTERS.map((f) => (
          <FilterChip
            key={f}
            label={f}
            active={currencyFilter === f}
            onClick={() => setCurrencyFilter(f)}
          />
        ))}
      </div>
      <ExpenseList expenses={filtered} />
    </div>
  );
}
