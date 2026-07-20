import { Skeleton } from '@/shared/ui/atoms/Skeleton';

interface TypePieChartSkeletonProps {
  compact?: boolean;
}

export function TypePieChartSkeleton({ compact = false }: TypePieChartSkeletonProps) {
  return (
    <div className="space-y-8">
      {!compact && (
        <div className="mx-auto grid w-[210px] grid-cols-2 rounded-pill bg-finance-surface p-1.5">
          <Skeleton className="h-9" />
          <Skeleton className="h-9 bg-transparent" />
        </div>
      )}

      <section className="rounded-card bg-finance-raised px-6 py-7">
        <Skeleton className="mb-6 h-6 w-48" />

        <div className="relative mx-auto flex h-[230px] items-center justify-center">
          <div className="flex size-[190px] items-center justify-center rounded-full border-[34px] border-finance-soft/80">
            <div className="space-y-3 text-center">
              <Skeleton className="mx-auto h-4 w-14" />
              <Skeleton className="mx-auto h-7 w-28" />
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between px-2">
          <div className="space-y-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-6 w-14" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="ml-auto h-6 w-14" />
          </div>
        </div>
      </section>

      {!compact && (
        <section className="overflow-hidden rounded-card bg-finance-raised">
          <div className="flex items-center justify-between border-b border-finance-stroke/25 px-6 py-5">
            <Skeleton className="h-7 w-36" />
            <Skeleton className="h-5 w-20" />
          </div>

          <div className="px-6 py-5">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex items-center justify-between py-4">
                <div className="flex items-center gap-5">
                  <Skeleton className="size-10" />
                  <Skeleton className="h-6 w-32" />
                </div>
                <Skeleton className="h-6 w-24" />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
