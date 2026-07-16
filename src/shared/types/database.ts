export interface Category {
  id: number;
  name: string;
  description: string | null;
  expense_type_id: number;
  keywords: string[];
}

export interface ExpenseType {
  id: number;
  name: 'fijo' | 'variable';
  description: string | null;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  currency: 'ARS' | 'USD';
  category_id: number;
  expense_type_id: number;
  created_at: string;
  telegram_message_id: number | null;
  notes: string | null;
  categories?: Pick<Category, 'name' | 'id'>;
  expense_types?: Pick<ExpenseType, 'name'>;
}

export interface PendingExpense {
  id: string;
  amount: number;
  description: string;
  currency: 'ARS' | 'USD';
  created_at: string;
}
