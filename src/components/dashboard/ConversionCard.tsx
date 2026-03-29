import React from 'react';
import { TrendingUp, Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card';
import { formatCurrency } from '../../utils';

export const ConversionCard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-indigo-600" />
          Current Conversion Rate
        </CardTitle>
        <CardDescription>Live USDT to USD exchange rate</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <p className="text-4xl font-bold text-slate-900 mb-2">
            1 USDT ≈ <span className="text-indigo-600">$0.99 USD</span>
          </p>
          <p className="text-sm text-slate-600 mb-4">Last updated: Just now</p>
          <div className="inline-flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full">
            <Check className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">
              Stable
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
