import { Skeleton } from '@/shared/ui/atoms/Skeleton';

export function ExpenseListSkeleton() {
  return (
    <section className="pt-9">
      <Skeleton className="mb-8 h-9 w-64" />

      <div className="mb-10 flex gap-3">
        <Skeleton className="h-12 w-24" />
        <Skeleton className="h-12 w-20" />
        <Skeleton className="h-12 w-20" />
      </div>

      <div className="space-y-7">
        {Array.from({ length: 2 }).map((_, groupIndex) => (
          <section key={groupIndex}>
            <Skeleton className="mb-4 h-4 w-24" />
            <div className="space-y-3">
              {Array.from({ length: 2 }).map((__, itemIndex) => (
                <article
                  key={itemIndex}
                  className="flex min-h-[104px] items-center justify-between gap-4 rounded-card bg-finance-surface px-5 py-4"
                >
                  <div className="flex min-w-0 items-center gap-5">
                    <Skeleton className="size-16 shrink-0" />
                    <div className="space-y-3">
                      <Skeleton className="h-6 w-36" />
                      <Skeleton className="h-5 w-28" />
                    </div>
                  </div>
                  <Skeleton className="h-7 w-28" />
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
