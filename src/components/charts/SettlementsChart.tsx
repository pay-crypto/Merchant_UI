import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { MonthlySummary } from '../../types';

interface SettlementsChartProps {
  data: MonthlySummary[];
}

export const SettlementsChart: React.FC<SettlementsChartProps> = ({ data }) => {
  const chartData = data.map((d) => ({
    name: d.month,
    settlements: d.settlements,
    volume: d.totalVolume,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Settlements</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '0.5rem',
              }}
            />
            <Legend />
            <Bar
              dataKey="settlements"
              fill="#4f46e5"
              name="Settlements ($)"
              radius={[8, 8, 0, 0]}
            />
            <Bar
              dataKey="volume"
              fill="#10b981"
              name="Volume (USDT)"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
