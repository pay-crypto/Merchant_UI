import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Button, Input } from '../components/ui';
import {
  mockTransactions,
  mockMonthlySummary,
  mockDailyRevenue,
  mockSummaryMetrics,
} from '../data/mockData';
import {
  SettlementsChart,
  RevenueChart,
} from '../components/charts';
import { exportToCSV } from '../utils';

export const Reports: React.FC = () => {
  // Set default date range (90 days back to today)
  const today = new Date().toISOString().split('T')[0];
  const ninetyDaysAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  
  const [dateRange, setDateRange] = useState({ 
    start: ninetyDaysAgo,
    end: today 
  });
  const [selectedFormat, setSelectedFormat] = useState<'pdf' | 'csv' | 'xlsx'>('csv');

  const handleExport = () => {
    const reportData = mockTransactions.map((t) => ({
      'Order ID': t.orderId,
      'Customer': t.customer,
      'Amount USDT': t.amountUSDT,
      'USD Value': t.convertedUSD.toFixed(2),
      'Commission': t.commissionFee.toFixed(2),
      'Payout': t.payoutAmount.toFixed(2),
      'Status': t.status,
      'Network': t.network,
      'Date': new Date(t.timestamp).toLocaleDateString(),
    }));

    exportToCSV(reportData, `transactions-report-${new Date().toISOString().split('T')[0]}.csv`);
  };

  return (
    <div className="w-full bg-gray-100 py-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600 mt-2">
            Generate and download detailed transaction and settlement reports.
          </p>
        </div>

        {/* Export Card */}
        <Card className="mb-8 bg-white">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="text-lg">Generate Report</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Start Date
                </label>
                <Input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) =>
                    setDateRange({ ...dateRange, start: e.target.value })
                  }
                  className="border border-gray-300"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  End Date
                </label>
                <Input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) =>
                    setDateRange({ ...dateRange, end: e.target.value })
                  }
                  className="border border-gray-300"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Format
                </label>
                <select
                  value={selectedFormat}
                  onChange={(e) =>
                    setSelectedFormat(e.target.value as 'pdf' | 'csv' | 'xlsx')
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded text-sm text-gray-700 bg-white"
                >
                  <option value="csv">CSV</option>
                  <option value="xlsx">XLSX</option>
                  <option value="pdf">PDF</option>
                </select>
              </div>
              <div>
                <Button onClick={handleExport} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <Card className="mb-8 bg-white">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="text-lg">Key Metrics</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2 font-medium">Total Transactions</p>
                <p className="text-3xl font-bold text-gray-900">
                  {mockSummaryMetrics.totalTransactions}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2 font-medium">
                  Total Volume (USDT)
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {mockSummaryMetrics.totalUSDTReceived.toLocaleString()}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2 font-medium">Total Payout</p>
                <p className="text-3xl font-bold text-gray-900">
                  ${mockSummaryMetrics.totalUSDPayout.toLocaleString()}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2 font-medium">Avg Commission</p>
                <p className="text-3xl font-bold text-gray-900">
                  {mockSummaryMetrics.commissionRate}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <RevenueChart data={mockDailyRevenue} />
          <SettlementsChart data={mockMonthlySummary} />
        </div>
      </div>
    </div>
  );
};
