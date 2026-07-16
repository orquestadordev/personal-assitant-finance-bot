import { createServerSupabaseClient } from '@/shared/lib/supabase-server';
import type { Expense } from '@/shared/types/database';
import type { DashboardSummary, MonthRange } from '../types';

export async function getDashboardSummary({ year, month }: MonthRange): Promise<DashboardSummary> {
  const supabase = createServerSupabaseClient();

  const startDate = new Date(year, month - 1, 1).toISOString();
  const endDate = new Date(year, month, 0, 23, 59, 59).toISOString();

  const { data, error } = await supabase
    .from('expenses')
    .select('amount, currency, category_id, expense_type_id, categories(name, id), expense_types(name)')
    .gte('created_at', startDate)
    .lte('created_at', endDate)
    .order('created_at', { ascending: false });

  if (error) throw error;

  const expenses = (data || []) as unknown as Expense[];

  // By category
  const catMap: Record<string, { ARS: number; USD: number }> = {};
  let totalARS = 0;
  let totalUSD = 0;

  for (const exp of expenses) {
    const catName = exp.categories?.name || 'Sin categoría';
    if (!catMap[catName]) catMap[catName] = { ARS: 0, USD: 0 };
    catMap[catName][exp.currency] += Number(exp.amount);

    if (exp.currency === 'ARS') totalARS += Number(exp.amount);
    else totalUSD += Number(exp.amount);
  }

  const byCategory = Object.entries(catMap)
    .map(([name, amounts]) => ({ name, ...amounts }))
    .sort((a, b) => (b.ARS + b.USD * 1000) - (a.ARS + a.USD * 1000));

  // By type
  const typeMap: Record<string, number> = { Fijo: 0, Variable: 0 };
  for (const exp of expenses) {
    if (exp.currency !== 'ARS') continue;
    const type = exp.expense_types?.name === 'fijo' ? 'Fijo' : 'Variable';
    typeMap[type] += Number(exp.amount);
  }
  const byType = Object.entries(typeMap).map(([name, value]) => ({ name, value }));

  return {
    totalARS,
    totalUSD,
    expenseCount: expenses.length,
    categoryCount: byCategory.length,
    byCategory,
    byType,
  };
}
