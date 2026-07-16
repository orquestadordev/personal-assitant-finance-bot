export interface MonthRange {
  year: number;
  month: number;
}

export interface DashboardSummary {
  totalARS: number;
  totalUSD: number;
  expenseCount: number;
  categoryCount: number;
  byCategory: CategorySummary[];
  byType: TypeSummary[];
}

export interface CategorySummary {
  name: string;
  ARS: number;
  USD: number;
}

export interface TypeSummary {
  name: string;
  value: number;
}
