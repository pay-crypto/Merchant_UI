import React from 'react';
import { DollarSign, TrendingUp, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Skeleton } from '../ui/Skeleton';

interface SummaryMetric {
  label: string;
  value: string | number;
  subValue?: string;
  icon: typeof DollarSign;
  color: 'blue' | 'green' | 'orange' | 'red';
}

interface SummaryCardsProps {
  metrics: SummaryMetric[];
  loading?: boolean;
}

const colorClasses = {
  blue: 'bg-blue-50 text-blue-600',
  green: 'bg-green-50 text-green-600',
  orange: 'bg-orange-50 text-orange-600',
  red: 'bg-red-50 text-red-600',
};

export const SummaryCards: React.FC<SummaryCardsProps> = ({
  metrics,
  loading = false,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <Card key={index} className="overflow-hidden bg-white">
            <CardContent className="pt-6">
              {loading ? (
                <>
                  <Skeleton className="h-4 w-24 mb-4" />
                  <Skeleton className="h-8 w-32 mb-4" />
                  <Skeleton className="h-3 w-16" />
                </>
              ) : (
                <>
                  <p className="text-sm font-medium text-slate-600 mb-4">
                    {metric.label}
                  </p>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    {metric.value}
                  </h3>
                  {metric.subValue && (
                    <p className="text-xs text-slate-500 mb-4">
                      {metric.subValue}
                    </p>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
