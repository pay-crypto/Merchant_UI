import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { NetworkDistribution } from '../../types';

interface NetworkDistributionChartProps {
  data: NetworkDistribution[];
}

const COLORS = ['#4f46e5', '#f59e0b', '#ef4444'];

export const NetworkDistributionChart: React.FC<
  NetworkDistributionChartProps
> = ({ data }) => {
  const chartData = data.map((d) => ({
    name: d.network,
    value: d.count,
    percentage: d.percentage,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Network Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percentage }) => `${name}: ${percentage}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '0.5rem',
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
