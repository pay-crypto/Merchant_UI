import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

interface PayoutStatusCardProps {
  totalPayout: number;
  pendingCount: number;
  successCount: number;
}

export const PayoutStatusCard: React.FC<PayoutStatusCardProps> = ({
  totalPayout,
  pendingCount,
  successCount,
}) => {
  return (
    <Card className="bg-white">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Payout Status</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-8">
        <div className="flex items-center gap-2">
          <span className="text-xl font-semibold text-slate-900">
            All Payments Sent
          </span>
          <CheckCircle className="w-6 h-6 text-green-500" />
        </div>
      </CardContent>
    </Card>
  );
};
