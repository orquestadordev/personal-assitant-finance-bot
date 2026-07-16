interface CardProps {
  label: string;
  value: string;
  full?: boolean;
  small?: boolean;
}

export function Card({ label, value, full, small }: CardProps) {
  return (
    <div className={`bg-dark-card rounded-xl p-4 ${full ? 'col-span-2' : ''}`}>
      <div className="text-xs text-gray-500 uppercase tracking-wide">{label}</div>
      <div className={`font-bold text-white mt-1 ${small ? 'text-base' : 'text-2xl'}`}>
        {value}
      </div>
    </div>
  );
}
