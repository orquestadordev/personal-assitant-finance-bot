'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { TypeSummary } from '@/features/dashboard/types';

interface TypePieChartProps {
  data: TypeSummary[];
}

const COLORS = ['#4ecca3', '#48b1ff', '#e94560', '#f5a623'];

export function TypePieChart({ data }: TypePieChartProps) {
  if (data.length === 0) {
    return <div className="text-center text-gray-600 py-10">Sin datos</div>;
  }

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={90}
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#16213e',
              border: 'none',
              borderRadius: 8,
              color: '#fff',
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
