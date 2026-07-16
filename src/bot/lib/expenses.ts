import { createServerSupabaseClient } from '@/shared/lib/supabase-server';

interface CreateExpenseParams {
  description: string;
  amount: number;
  currency: 'ARS' | 'USD';
  categoryId: number;
  expenseTypeId: number;
  telegramMessageId?: number;
}

export async function createExpense(params: CreateExpenseParams) {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from('expenses')
    .insert({
      description: params.description,
      amount: params.amount,
      currency: params.currency,
      category_id: params.categoryId,
      expense_type_id: params.expenseTypeId,
      telegram_message_id: params.telegramMessageId,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getMonthSummary(year: number, month: number) {
  const supabase = createServerSupabaseClient();

  const startDate = new Date(year, month - 1, 1).toISOString();
  const endDate = new Date(year, month, 0, 23, 59, 59).toISOString();

  const { data, error } = await supabase
    .from('expenses')
    .select('amount, currency, category_id, expense_type_id, categories(name), expense_types(name)')
    .gte('created_at', startDate)
    .lte('created_at', endDate)
    .order('created_at', { ascending: false });

  if (error) throw error;

  const byCategory: Record<string, { ARS: number; USD: number }> = {};
  let totalARS = 0;
  let totalUSD = 0;

  for (const exp of data || []) {
    const catName = (exp.categories as any)?.name || 'Sin categoría';
    if (!byCategory[catName]) byCategory[catName] = { ARS: 0, USD: 0 };
    byCategory[catName][exp.currency as 'ARS' | 'USD'] += parseFloat(String(exp.amount));

    if (exp.currency === 'ARS') totalARS += parseFloat(String(exp.amount));
    else totalUSD += parseFloat(String(exp.amount));
  }

  const byType: Record<string, { ARS: number; USD: number }> = {
    fijo: { ARS: 0, USD: 0 },
    variable: { ARS: 0, USD: 0 },
  };
  for (const exp of data || []) {
    const typeName = (exp.expense_types as any)?.name || 'variable';
    byType[typeName][exp.currency as 'ARS' | 'USD'] += parseFloat(String(exp.amount));
  }

  return {
    totalARS,
    totalUSD,
    count: (data || []).length,
    byCategory,
    byType,
  };
}

export async function getLastExpenses(limit = 5) {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from('expenses')
    .select('id, description, amount, currency, created_at, categories(name)')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data || [];
}
