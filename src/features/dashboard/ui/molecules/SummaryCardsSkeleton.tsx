import { Skeleton } from '@/shared/ui/atoms/Skeleton';

export function SummaryCardsSkeleton() {
  return (
    <div className="mb-8 grid grid-cols-2 gap-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="rounded-card bg-finance-raised px-5 py-6">
          <Skeleton className="h-3.5 w-24" />
          <Skeleton className="mt-5 h-9 w-28" />
        </div>
      ))}
    </div>
  );
}
