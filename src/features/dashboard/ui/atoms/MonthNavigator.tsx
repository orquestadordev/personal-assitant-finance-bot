'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MONTHS } from '@/shared/lib/format';
import type { MonthRange } from '../../types';

interface MonthNavigatorProps {
  range: MonthRange;
  onChange: (range: MonthRange) => void;
}

export function MonthNavigator({ range, onChange }: MonthNavigatorProps) {
  function prev() {
    if (range.month === 1) onChange({ year: range.year - 1, month: 12 });
    else onChange({ ...range, month: range.month - 1 });
  }

  function next() {
    if (range.month === 12) onChange({ year: range.year + 1, month: 1 });
    else onChange({ ...range, month: range.month + 1 });
  }

  return (
    <div className="mb-8 flex items-center justify-between px-1 pt-8">
      <button
        onClick={prev}
        className="flex size-10 items-center justify-center rounded-full text-finance-secondary transition hover:bg-finance-soft hover:text-finance-text"
        aria-label="Mes anterior"
      >
        <ChevronLeft className="size-7" strokeWidth={2.4} />
      </button>
      <span className="min-w-[190px] text-center text-[23px] font-extrabold leading-none text-finance-text">
        {MONTHS[range.month - 1]} {range.year}
      </span>
      <button
        onClick={next}
        className="flex size-10 items-center justify-center rounded-full text-finance-secondary transition hover:bg-finance-soft hover:text-finance-text"
        aria-label="Mes siguiente"
      >
        <ChevronRight className="size-7" strokeWidth={2.4} />
      </button>
    </div>
  );
}
