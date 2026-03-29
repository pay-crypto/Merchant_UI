import React, { useState } from 'react';
import { Download, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Button, Input } from '../ui/index';
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
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedFormat, setSelectedFormat] = useState<'pdf' | 'csv' | 'xlsx'>(
    'csv'
  );

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
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Reports</h1>
          <p className="text-slate-600 mt-2">
            Generate and download detailed transaction and settlement reports.
          </p>
        </div>

        {/* Export Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Generate Report</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  Start Date
                </label>
                <Input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) =>
                    setDateRange({ ...dateRange, start: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  End Date
                </label>
                <Input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) =>
                    setDateRange({ ...dateRange, end: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  Format
                </label>
                <select
                  value={selectedFormat}
                  onChange={(e) =>
                    setSelectedFormat(e.target.value as 'pdf' | 'csv' | 'xlsx')
                  }
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm"
                >
                  <option value="csv">CSV</option>
                  <option value="xlsx">XLSX</option>
                  <option value="pdf">PDF</option>
                </select>
              </div>
              <div className="flex items-end">
                <Button onClick={handleExport} className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Key Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-slate-600 mb-1">Total Transactions</p>
                <p className="text-2xl font-bold text-slate-900">
                  {mockSummaryMetrics.totalTransactions}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">
                  Total Volume (USDT)
                </p>
                <p className="text-2xl font-bold text-slate-900">
                  {mockSummaryMetrics.totalUSDTReceived.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Total Payout</p>
                <p className="text-2xl font-bold text-slate-900">
                  ${mockSummaryMetrics.totalUSDPayout.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Avg Commission</p>
                <p className="text-2xl font-bold text-slate-900">
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

        {/* Monthly Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-slate-200">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">
                      Month
                    </th>
                    <th className="text-right py-3 px-4 font-semibold text-slate-700">
                      Transactions
                    </th>
                    <th className="text-right py-3 px-4 font-semibold text-slate-700">
                      Volume (USDT)
                    </th>
                    <th className="text-right py-3 px-4 font-semibold text-slate-700">
                      Settlements ($)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mockMonthlySummary.map((month, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-slate-100 hover:bg-slate-50"
                    >
                      <td className="py-3 px-4">{month.month}</td>
                      <td className="text-right py-3 px-4">
                        {month.transactionCount}
                      </td>
                      <td className="text-right py-3 px-4">
                        {month.totalVolume.toLocaleString()}
                      </td>
                      <td className="text-right py-3 px-4">
                        ${month.settlements.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
