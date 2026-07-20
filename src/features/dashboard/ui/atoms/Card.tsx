interface CardProps {
  label: string;
  value: string;
  full?: boolean;
  small?: boolean;
}

export function Card({ label, value, full, small }: CardProps) {
  return (
    <div className={`rounded-card bg-finance-raised px-5 py-6 ${full ? 'col-span-2' : ''}`}>
      <div className="text-[13px] font-extrabold uppercase tracking-[0.08em] text-finance-secondary">
        {label}
      </div>
      <div className={`mt-3 font-extrabold leading-none text-finance-text ${small ? 'text-[38px]' : 'text-[34px]'}`}>
        {value}
      </div>
    </div>
  );
}
