import { formatCompactMoney } from '@/shared/lib/format';
import type { CategorySummary } from '@/features/dashboard/types';

interface CategoryChartProps {
  data: CategorySummary[];
}

export function CategoryChart({ data }: CategoryChartProps) {
  if (data.length === 0) {
    return (
      <div className="rounded-card bg-finance-raised px-6 py-8 text-center text-finance-muted">
        Sin datos
      </div>
    );
  }

  const visibleData = data.slice(0, 3);
  const maxAmount = Math.max(...visibleData.map((item) => item.ARS + item.USD), 1);

  return (
    <section className="mb-8 rounded-card bg-finance-raised px-6 py-6">
      <h2 className="mb-6 text-[21px] font-medium text-finance-text">Gasto por Categoría</h2>

      <div className="space-y-5">
        {visibleData.map((item) => {
          const amount = item.ARS > 0 ? item.ARS : item.USD;
          const currency = item.ARS > 0 ? 'ARS' : 'USD';
          const width = Math.max(30, Math.round(((item.ARS + item.USD) / maxAmount) * 100));
          const formatted = formatCompactMoney(amount, currency).replace(/^\$|^u\$s/, '').trim();

          return (
            <div key={item.name}>
              <div className="mb-2 flex items-center justify-between gap-4">
                <span className="truncate text-[18px] font-semibold text-finance-text">{item.name}</span>
                <span className="shrink-0 text-[15px] font-extrabold text-finance-secondary">
                  {currency} {formatted}
                </span>
              </div>
              <div className="h-2.5 rounded-pill bg-finance-soft">
                <div
                  className={`h-full rounded-pill ${currency === 'ARS' ? 'bg-money-ars' : 'bg-money-usd'}`}
                  style={{ width: `${width}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-7 flex gap-5 border-t border-finance-stroke/40 pt-5 text-[15px] font-bold text-finance-secondary">
        <span className="flex items-center gap-2">
          <span className="size-3.5 rounded-full bg-money-ars" />
          ARS
        </span>
        <span className="flex items-center gap-2">
          <span className="size-3.5 rounded-full bg-money-usd" />
          USD
        </span>
      </div>
    </section>
  );
}
