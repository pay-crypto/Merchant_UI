import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

export const ConversionCard: React.FC = () => {
  return (
    <Card className="bg-white">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Conversion Rate</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-8">
        <p className="text-3xl font-bold text-slate-900 text-center">
          1 USDT <span className="text-2xl text-slate-600">≈</span> 0.99 USD
        </p>
      </CardContent>
    </Card>
  );
};
