import { createServerSupabaseClient } from '@/shared/lib/supabase-server';
import type { Expense } from '@/shared/types/database';
import type { MonthRange } from '@/features/dashboard/types';

export async function getExpensesByMonth({ year, month }: MonthRange): Promise<Expense[]> {
  const supabase = createServerSupabaseClient();

  const startDate = new Date(year, month - 1, 1).toISOString();
  const endDate = new Date(year, month, 0, 23, 59, 59).toISOString();

  const { data, error } = await supabase
    .from('expenses')
    .select('*, categories(name, id), expense_types(name)')
    .gte('created_at', startDate)
    .lte('created_at', endDate)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data || []) as unknown as Expense[];
}
