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
      className={`px-3.5 py-1.5 rounded-full text-sm whitespace-nowrap transition
        ${active
          ? 'bg-dark-accent border-dark-accent text-white'
          : 'bg-transparent border border-gray-700 text-gray-400 hover:border-gray-500'
        }`}
    >
      {label}
    </button>
  );
}
