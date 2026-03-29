import React, { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  Zap,
  AlertCircle,
} from 'lucide-react';
import { useAppStore } from '../store';
import {
  SummaryCards,
  TransactionTable,
  FilterBar,
  ConversionCard,
  PayoutStatusCard,
} from '../components/dashboard';
import { RevenueChart, NetworkDistributionChart, SettlementsChart } from '../components/charts';
import {
  mockDailyRevenue,
  mockNetworkDistribution,
  mockMonthlySummary,
  mockSummaryMetrics,
} from '../data/mockData';
import { formatCurrency } from '../utils';

export const Dashboard: React.FC = () => {
  const { filteredTransactions, filterTransactions, filters, updateFilters } = useAppStore();
  const [showFilters, setShowFilters] = useState(false);

  const summaryMetrics = [
    {
      label: 'Total USDT Received',
      value: `${mockSummaryMetrics.totalUSDTReceived.toLocaleString()} USDT`,
      change: '+5.2% from last week',
      icon: TrendingUp,
      color: 'blue' as const,
    },
    {
      label: 'Total USD Payout',
      value: formatCurrency(mockSummaryMetrics.totalUSDPayout),
      change: '+2.8% from last week',
      icon: DollarSign,
      color: 'green' as const,
    },
    {
      label: 'Commission Earned',
      value: formatCurrency(mockSummaryMetrics.commission),
      change: '3.8% fee',
      icon: Zap,
      color: 'orange' as const,
    },
    {
      label: 'Pending Transactions',
      value: mockSummaryMetrics.pendingTransactions,
      change: `${mockSummaryMetrics.rejectedTransactions} rejected`,
      icon: AlertCircle,
      color: 'red' as const,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600 mt-2">
            Welcome back! Monitor your USDT to USD transactions in real-time.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="mb-8">
          <SummaryCards metrics={summaryMetrics} />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <RevenueChart data={mockDailyRevenue} />
          <NetworkDistributionChart data={mockNetworkDistribution} />
        </div>

        {/* Monthly Settlements & Payout Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <SettlementsChart data={mockMonthlySummary} />
          <div className="grid grid-cols-1 gap-6">
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

        {/* Filters */}
        {showFilters && (
          <FilterBar
            filters={filters}
            onFiltersChange={updateFilters}
            isOpen={showFilters}
            onClose={() => setShowFilters(false)}
          />
        )}

        {/* Transactions Table */}
        <TransactionTable
          transactions={filteredTransactions}
          onFilterClick={() => setShowFilters(!showFilters)}
        />
      </div>
    </div>
  );
};
