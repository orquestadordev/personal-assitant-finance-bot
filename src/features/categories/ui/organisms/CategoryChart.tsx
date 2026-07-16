'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import type { CategorySummary } from '@/features/dashboard/types';

interface CategoryChartProps {
  data: CategorySummary[];
}

export function CategoryChart({ data }: CategoryChartProps) {
  if (data.length === 0) {
    return <div className="text-center text-gray-600 py-10">Sin datos</div>;
  }

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
          <XAxis type="number" tick={{ fill: '#9ca3af', fontSize: 12 }} />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fill: '#9ca3af', fontSize: 12 }}
            width={100}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#16213e',
              border: 'none',
              borderRadius: 8,
              color: '#fff',
            }}
          />
          <Legend />
          <Bar dataKey="ARS" fill="#4ecca3" radius={[0, 4, 4, 0]} />
          <Bar dataKey="USD" fill="#48b1ff" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
