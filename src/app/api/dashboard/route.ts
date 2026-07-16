import { NextRequest, NextResponse } from 'next/server';
import { getDashboardSummary } from '@/features/dashboard/server/get-summary';
import { getExpensesByMonth } from '@/features/expenses/server/get-expenses';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const year = Number(searchParams.get('year'));
  const month = Number(searchParams.get('month'));

  if (!year || !month || month < 1 || month > 12) {
    return NextResponse.json({ error: 'year y month requeridos' }, { status: 400 });
  }

  try {
    const [summary, expenses] = await Promise.all([
      getDashboardSummary({ year, month }),
      getExpensesByMonth({ year, month }),
    ]);

    return NextResponse.json({ summary, expenses });
  } catch (error) {
    console.error('Dashboard API error:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
