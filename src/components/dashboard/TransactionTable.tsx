import React, { useState } from 'react';
import { Download, Filter, Search, ExternalLink } from 'lucide-react';
import { Transaction } from '../../types';
import { usePagination, useCopy } from '../../hooks';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Badge,
  Button,
  Input,
} from '../ui/index';
import { formatCurrency, formatDateTime, shortenAddress, getStatusColor, exportToCSV } from '../../utils';

interface TransactionTableProps {
  transactions: Transaction[];
  loading?: boolean;
  onFilterClick?: () => void;
}

export const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  loading = false,
  onFilterClick,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');
  const { copy, copied } = useCopy();

  const filtered = transactions.filter(
    (t) =>
      t.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    }
    return b.amountUSDT - a.amountUSDT;
  });

  const { currentItems, currentPage, totalPages, goToPage } = usePagination(
    sorted,
    10
  );

  const handleExport = () => {
    const csvData = transactions.map((t) => ({
      OrderID: t.orderId,
      Customer: t.customer,
      AmountUSDT: t.amountUSDT,
      ConvertedUSD: t.convertedUSD,
      CommissionFee: t.commissionFee,
      PayoutAmount: t.payoutAmount,
      Status: t.status,
      Network: t.network,
      Hash: t.transactionHash,
      Timestamp: formatDateTime(t.timestamp),
    }));
    exportToCSV(csvData, 'transactions.csv');
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <CardTitle>Recent Transactions</CardTitle>
          <div className="flex gap-2 w-full md:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={onFilterClick}
              className="flex-1 md:flex-none"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              className="flex-1 md:flex-none"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="mb-4 flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search by Order ID or Customer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'amount')}
            className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium bg-white hover:bg-slate-50"
          >
            <option value="date">Sort: Date</option>
            <option value="amount">Sort: Amount</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead className="hidden md:table-cell">Customer</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="hidden lg:table-cell text-right">
                  USD Value
                </TableHead>
                <TableHead className="hidden lg:table-cell text-right">
                  Commission
                </TableHead>
                <TableHead className="hidden md:table-cell">Network</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead>Hash</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    <p className="text-slate-600">No transactions found</p>
                  </TableCell>
                </TableRow>
              ) : (
                currentItems.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium text-indigo-600">
                      {transaction.orderId}
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm">
                      {transaction.customer}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {transaction.amountUSDT} USDT
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-right text-sm">
                      {formatCurrency(transaction.convertedUSD)}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-right text-sm">
                      {formatCurrency(transaction.commissionFee)}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="secondary" className="text-xs">
                        {transaction.network}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge variant={getStatusColor(transaction.status)}>
                        {transaction.status.charAt(0).toUpperCase() +
                          transaction.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={() => copy(transaction.transactionHash)}
                        className="text-xs text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group"
                        title={transaction.transactionHash}
                      >
                        {shortenAddress(transaction.transactionHash)}
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                      </button>
                      {copied && (
                        <span className="text-xs text-green-600">Copied!</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200">
            <p className="text-sm text-slate-600">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
