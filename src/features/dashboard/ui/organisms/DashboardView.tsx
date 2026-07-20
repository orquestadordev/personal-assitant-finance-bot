'use client';

import { useState, useEffect } from 'react';
import { Banknote, ChartPie, Grid2X2, type LucideIcon } from 'lucide-react';
import { MonthNavigator } from '../atoms/MonthNavigator';
import { SummaryCards } from '../molecules/SummaryCards';
import { DashboardLoadingView } from './DashboardLoadingView';
import { CategoryChart } from '@/features/categories/ui/organisms/CategoryChart';
import { TypePieChart } from '@/features/categories/ui/organisms/TypePieChart';
import { ExpensesTemplate } from '@/features/expenses/ui/templates/ExpensesTemplate';
import { TabNavigation } from '@/shared/ui/molecules/TabNavigation';
import type { DashboardSummary, MonthRange } from '../../types';
import type { Expense } from '@/shared/types/database';

type Tab = 'resumen' | 'gastos' | 'tipo';

const TABS = [
  { key: 'resumen', label: 'Resumen', icon: Grid2X2 },
  { key: 'gastos', label: 'Gastos', icon: Banknote },
  { key: 'tipo', label: 'Por tipo', icon: ChartPie },
] satisfies { key: Tab; label: string; icon: LucideIcon }[];

interface DashboardViewProps {
  initialRange: MonthRange;
}

export function DashboardView({ initialRange }: DashboardViewProps) {
  const [range, setRange] = useState<MonthRange>(initialRange);
  const [tab, setTab] = useState<Tab>('resumen');
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`/api/dashboard?year=${range.year}&month=${range.month}`);
        const data = await res.json();
        setSummary(data.summary);
        setExpenses(data.expenses);
      } catch (err) {
        console.error('Error loading dashboard:', err);
      }
      setLoading(false);
    }
    load();
  }, [range]);

  if (loading) {
    return (
      <DashboardLoadingView
        activeTab={tab}
        range={range}
        tabs={TABS}
        onRangeChange={setRange}
        onTabChange={(nextTab) => setTab(nextTab as Tab)}
      />
    );
  }

  if (!summary) {
    return <div className="px-7 py-10 text-center text-finance-muted">Error al cargar datos</div>;
  }

  return (
    <div className="px-7 pb-32">
      {tab === 'resumen' && (
        <>
          <MonthNavigator range={range} onChange={setRange} />
          <SummaryCards summary={summary} />
          <CategoryChart data={summary.byCategory} />
          <TypePieChart data={summary.byType} compact />
        </>
      )}

      {tab === 'gastos' && <ExpensesTemplate expenses={expenses} />}

      {tab === 'tipo' && (
        <>
          <MonthNavigator range={range} onChange={setRange} />
          <TypePieChart data={summary.byType} expenses={expenses} />
        </>
      )}

      <TabNavigation tabs={TABS} activeKey={tab} onChange={(t) => setTab(t as Tab)} />
    </div>
  );
}
