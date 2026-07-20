'use client';

interface FilterChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

export function FilterChip({ label, active, onClick }: FilterChipProps) {
  return (
    <button
      onClick={onClick}
      className={`rounded-pill px-7 py-3 text-[15px] font-extrabold tracking-[0.04em] transition
        ${active
          ? 'bg-finance-primary text-finance-bg'
          : 'bg-finance-soft text-finance-secondary ring-1 ring-finance-stroke/60 hover:text-finance-text'
        }`}
    >
      {label}
    </button>
  );
}
