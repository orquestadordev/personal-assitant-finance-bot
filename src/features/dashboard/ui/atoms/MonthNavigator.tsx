'use client';

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
    <div className="flex items-center justify-center gap-4 mb-5">
      <button
        onClick={prev}
        className="bg-dark-card w-9 h-9 rounded-full text-white text-lg flex items-center justify-center hover:bg-dark-accent transition"
      >
        ‹
      </button>
      <span className="text-base font-semibold min-w-[150px] text-center">
        {MONTHS[range.month - 1]} {range.year}
      </span>
      <button
        onClick={next}
        className="bg-dark-card w-9 h-9 rounded-full text-white text-lg flex items-center justify-center hover:bg-dark-accent transition"
      >
        ›
      </button>
    </div>
  );
}
