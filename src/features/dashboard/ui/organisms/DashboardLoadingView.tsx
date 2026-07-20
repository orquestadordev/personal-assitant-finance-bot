import { MonthNavigator } from '../atoms/MonthNavigator';
import { SummaryCardsSkeleton } from '../molecules/SummaryCardsSkeleton';
import { CategoryChartSkeleton } from '@/features/categories/ui/organisms/CategoryChartSkeleton';
import { TypePieChartSkeleton } from '@/features/categories/ui/organisms/TypePieChartSkeleton';
import { ExpenseListSkeleton } from '@/features/expenses/ui/organisms/ExpenseListSkeleton';
import { TabNavigation } from '@/shared/ui/molecules/TabNavigation';
import type { MonthRange } from '../../types';
import type { TabItem } from '@/shared/ui/molecules/TabNavigation';

interface DashboardLoadingViewProps {
  activeTab: string;
  range: MonthRange;
  tabs: TabItem[];
  onRangeChange: (range: MonthRange) => void;
  onTabChange: (key: string) => void;
}

export function DashboardLoadingView({
  activeTab,
  range,
  tabs,
  onRangeChange,
  onTabChange,
}: DashboardLoadingViewProps) {
  return (
    <div className="px-7 pb-32">
      {activeTab === 'resumen' && (
        <>
          <MonthNavigator range={range} onChange={onRangeChange} />
          <SummaryCardsSkeleton />
          <CategoryChartSkeleton />
          <TypePieChartSkeleton compact />
        </>
      )}

      {activeTab === 'gastos' && <ExpenseListSkeleton />}

      {activeTab === 'tipo' && (
        <>
          <MonthNavigator range={range} onChange={onRangeChange} />
          <TypePieChartSkeleton />
        </>
      )}

      <TabNavigation tabs={tabs} activeKey={activeTab} onChange={onTabChange} />
    </div>
  );
}
