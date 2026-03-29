import React, { useState, useMemo } from 'react';
import { Info } from 'lucide-react';
import { Transaction } from '../../types';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../ui/index';

interface TransactionTableProps {
  transactions: Transaction[];
  loading?: boolean;
}

export const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterCurrency, setFilterCurrency] = useState('USDT');
  const [filterNetwork, setFilterNetwork] = useState('All');

  const getDateLabel = () => {
    const date = new Date(selectedDate);
    const today = new Date();
    if (date.toDateString() === today.toDateString()) {
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    }
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  // Filter transactions based on selected filters
  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      // Filter by status if not "All"
      if (filterStatus !== 'All' && t.status !== filterStatus.toLowerCase()) {
        return false;
      }
      // Filter by network if not "All"
      if (filterNetwork !== 'All' && t.network !== filterNetwork) {
        return false;
      }
      return true;
    }).slice(0, 5);
  }, [transactions, filterStatus, filterNetwork]);

  const totals = {
    amount: filtered.reduce((sum, t) => sum + t.amountUSDT, 0),
    converted: filtered.reduce((sum, t) => sum + t.convertedUSD, 0),
    commission: filtered.reduce((sum, t) => sum + t.commissionFee, 0),
    payout: filtered.reduce((sum, t) => sum + t.payoutAmount, 0),
  };

  return (
    <Card className="bg-white rounded-lg">
      <CardHeader className="pb-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg font-semibold">Daily Transactions</CardTitle>
            <Info className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        {/* Filter Row */}
        <div className="mb-6 flex flex-wrap gap-4 items-center pb-4 border-b border-gray-200">
          {/* Date Selector */}
          <div className="flex items-center gap-3">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-2 py-1 text-sm text-gray-700 border border-gray-300 rounded cursor-pointer"
            />
            <span className="text-sm text-gray-600 flex items-center gap-2">
              📅 {getDateLabel()}
            </span>
          </div>

          {/* Filter Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Filter:</span>
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded bg-white text-gray-700 hover:border-gray-400 cursor-pointer min-w-32"
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Currency Filter */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Currency:</span>
            <select 
              value={filterCurrency}
              onChange={(e) => setFilterCurrency(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded bg-white text-gray-700 hover:border-gray-400 cursor-pointer min-w-32"
            >
              <option value="USDT">USDT</option>
              <option value="USDC">USDC</option>
              <option value="DAI">DAI</option>
              <option value="BUSD">BUSD</option>
            </select>
          </div>

          {/* Network Filter */}
          <select 
            value={filterNetwork}
            onChange={(e) => setFilterNetwork(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-300 rounded bg-white text-gray-700 hover:border-gray-400 cursor-pointer min-w-32"
          >
            <option value="All">All</option>
            <option value="ERC20">ERC20</option>
            <option value="BEP20">BEP20</option>
            <option value="TRC20">TRC20</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Time</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Order ID</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Customer</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Amount (USDT)</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Converted to USD</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Commission Fee</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Payout to Nike</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-gray-500">
                    No transactions found for the selected filters
                  </td>
                </tr>
              ) : (
                filtered.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-700">
                      {new Date(transaction.timestamp).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 bg-green-50 px-2 py-1 rounded text-xs font-medium text-green-700">
                        <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                        {transaction.orderId}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-700 font-medium">{transaction.customer}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {transaction.amountUSDT} USDT
                    </td>
                    <td className="px-4 py-3 text-gray-700">${transaction.convertedUSD.toFixed(2)}</td>
                    <td className="px-4 py-3 text-gray-700">${transaction.commissionFee.toFixed(2)}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">
                      ${transaction.payoutAmount.toFixed(2)}
                    </td>
                  </tr>
                ))
              )}
              {/* Totals Row */}
              {filtered.length > 0 && (
                <tr className="bg-gray-50 font-semibold border-t-2 border-gray-200">
                  <td colSpan={3} className="px-4 py-3 text-gray-900">
                    Totals
                  </td>
                  <td className="px-4 py-3 text-gray-900">{totals.amount} USDT</td>
                  <td className="px-4 py-3 text-gray-900">${totals.converted.toFixed(2)}</td>
                  <td className="px-4 py-3 text-gray-900">${totals.commission.toFixed(2)}</td>
                  <td className="px-4 py-3 text-gray-900">${totals.payout.toFixed(2)}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
