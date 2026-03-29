import React, { useState } from 'react';
import { DollarSign, TrendingUp, Zap } from 'lucide-react';
import { useAppStore } from '../store';
import {
  SummaryCards,
  TransactionTable,
  ConversionCard,
  PayoutStatusCard,
} from '../components/dashboard';
import {
  mockSummaryMetrics,
} from '../data/mockData';
import { formatCurrency } from '../utils';

export const Dashboard: React.FC = () => {
  const { filteredTransactions } = useAppStore();

  const summaryMetrics = [
    {
      label: 'Total USDT Received',
      value: `${mockSummaryMetrics.totalUSDTReceived.toLocaleString()} USDT`,
      subValue: `≈ $${mockSummaryMetrics.totalUSDReceived.toLocaleString()} USD`,
      icon: TrendingUp,
      color: 'blue' as const,
    },
    {
      label: 'Total USD Payout',
      value: formatCurrency(mockSummaryMetrics.totalUSDPayout),
      icon: DollarSign,
      color: 'green' as const,
    },
    {
      label: 'Our Commission',
      value: formatCurrency(mockSummaryMetrics.commission),
      subValue: '3.8% Fee',
      icon: Zap,
      color: 'orange' as const,
    },
  ];

  return (
    <div className="w-full bg-gray-100 py-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Crypto Payment Overview</h1>
        </div>

        {/* Summary Cards */}
        <div className="mb-8">
          <SummaryCards metrics={summaryMetrics} />
        </div>

        {/* Transactions Table */}
        <TransactionTable
          transactions={filteredTransactions}
        />

        {/* Bottom Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <ConversionCard />
          <PayoutStatusCard
            totalPayout={mockSummaryMetrics.totalUSDPayout}
            pendingCount={mockSummaryMetrics.pendingTransactions}
            successCount={
              mockSummaryMetrics.totalTransactions -
              mockSummaryMetrics.pendingTransactions -
              mockSummaryMetrics.rejectedTransactions
            }
          />
        </div>
      </div>
    </div>
  );
};
