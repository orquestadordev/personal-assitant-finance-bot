export interface CategorySummary {
  category_id: number;
  category_name: string;
  total: number;
  count: number;
  currency: 'ARS' | 'USD';
}

export interface TypeSummary {
  type_name: string;
  total: number;
  count: number;
  currency: 'ARS' | 'USD';
}
