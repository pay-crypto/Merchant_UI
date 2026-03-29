import React from 'react';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';

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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          Payout Status
        </CardTitle>
        <CardDescription>Payment distribution overview</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-600">
              Total Payouts
            </span>
            <span className="text-2xl font-bold text-slate-900">
              ${totalPayout.toLocaleString()}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-xs font-medium text-slate-600">
                  Completed
                </span>
              </div>
              <p className="text-lg font-bold text-green-700">
                {successCount}
              </p>
            </div>

            <div className="p-3 bg-amber-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-medium text-slate-600">
                  Pending
                </span>
              </div>
              <p className="text-lg font-bold text-amber-700">
                {pendingCount}
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200">
            <p className="text-sm text-green-700 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              All payments sent successfully!
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
