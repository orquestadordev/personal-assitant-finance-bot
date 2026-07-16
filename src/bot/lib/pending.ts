import { createServerSupabaseClient } from '@/shared/lib/supabase-server';
import crypto from 'crypto';

interface PendingData {
  amount: number;
  description: string;
  currency: 'ARS' | 'USD';
}

export async function savePending({ amount, description, currency }: PendingData): Promise<string> {
  const id = crypto.randomBytes(4).toString('hex');
  const supabase = createServerSupabaseClient();

  const { error } = await supabase
    .from('pending_expenses')
    .insert({
      id,
      amount,
      description,
      currency,
      created_at: new Date().toISOString(),
    });

  if (error) throw error;
  return id;
}

export async function getPending(id: string) {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from('pending_expenses')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return null;
  return data;
}

export async function deletePending(id: string) {
  const supabase = createServerSupabaseClient();

  await supabase
    .from('pending_expenses')
    .delete()
    .eq('id', id);
}
