import { Skeleton } from '@/shared/ui/atoms/Skeleton';

export function CategoryChartSkeleton() {
  return (
    <section className="mb-8 rounded-card bg-finance-raised px-6 py-6">
      <Skeleton className="mb-7 h-6 w-44" />

      <div className="space-y-5">
        {[86, 58, 36].map((width, index) => (
          <div key={index}>
            <div className="mb-2 flex items-center justify-between gap-4">
              <Skeleton className="h-5 w-36" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="h-2.5 rounded-pill bg-finance-soft/55">
              <Skeleton className="h-full" style={{ width: `${width}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-7 flex gap-5 border-t border-finance-stroke/40 pt-5">
        <Skeleton className="h-4 w-14" />
        <Skeleton className="h-4 w-14" />
      </div>
    </section>
  );
}
