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
    <section className="pt-9">
      <h2 className="mb-8 text-[34px] font-extrabold leading-none text-finance-text">
        Gastos Recientes
      </h2>

      <div className="mb-10 flex gap-3 overflow-x-auto pb-1">
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
    </section>
  );
}
