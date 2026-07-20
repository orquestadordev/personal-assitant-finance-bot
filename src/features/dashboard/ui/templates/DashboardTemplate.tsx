import { AppHeader } from '@/shared/ui/molecules/AppHeader';
import { DashboardView } from '../organisms/DashboardView';
import type { MonthRange } from '../../types';

interface DashboardTemplateProps {
  initialRange: MonthRange;
}

export function DashboardTemplate({ initialRange }: DashboardTemplateProps) {
  return (
    <div className="min-h-dvh bg-finance-bg">
      <AppHeader />
      <DashboardView initialRange={initialRange} />
    </div>
  );
}
