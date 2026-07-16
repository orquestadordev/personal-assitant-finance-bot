'use client';

import { useState, useEffect } from 'react';
import { MonthNavigator } from '../atoms/MonthNavigator';
import { SummaryCards } from '../molecules/SummaryCards';
import { CategoryChart } from '@/features/categories/ui/organisms/CategoryChart';
import { TypePieChart } from '@/features/categories/ui/organisms/TypePieChart';
import { ExpensesTemplate } from '@/features/expenses/ui/templates/ExpensesTemplate';
import { TabNavigation } from '@/shared/ui/molecules/TabNavigation';
import type { DashboardSummary, MonthRange } from '../../types';
import type { Expense } from '@/shared/types/database';

type Tab = 'resumen' | 'gastos' | 'tipo';

const TABS: { key: Tab; label: string }[] = [
  { key: 'resumen', label: 'Resumen' },
  { key: 'gastos', label: 'Gastos' },
  { key: 'tipo', label: 'Por tipo' },
];

export function DashboardView() {
  const now = new Date();
  const [range, setRange] = useState<MonthRange>({
    year: now.getFullYear(),
    month: now.getMonth() + 1,
  });
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
    return <div className="text-center text-gray-500 py-10">Cargando...</div>;
  }

  if (!summary) {
    return <div className="text-center text-gray-500 py-10">Error al cargar datos</div>;
  }

  return (
    <>
      <MonthNavigator range={range} onChange={setRange} />
      <SummaryCards summary={summary} />
      <TabNavigation tabs={TABS} activeKey={tab} onChange={(t) => setTab(t as Tab)} />

      {tab === 'resumen' && <CategoryChart data={summary.byCategory} />}
      {tab === 'gastos' && (
        <ExpensesTemplate expenses={expenses} />
      )}
      {tab === 'tipo' && <TypePieChart data={summary.byType} />}
    </>
  );
}
