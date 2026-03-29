import React from 'react';
import { X } from 'lucide-react';
import { FilterOptions, NetworkType, TransactionStatus } from '../../types';
import { Card, CardContent, CardHeader, CardTitle, Input, Select, Button } from '../ui/index';

interface FilterBarProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  onClose?: () => void;
  isOpen?: boolean;
}

const statuses: TransactionStatus[] = ['pending', 'confirmed', 'rejected', 'completed'];
const networks: NetworkType[] = ['ERC20', 'TRC20', 'BEP20'];

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFiltersChange,
  onClose,
  isOpen = true,
}) => {
  const handleReset = () => {
    onFiltersChange({});
  };

  if (!isOpen) return null;

  return (
    <Card className="mb-6">
      <CardHeader className="pb-4 flex flex-row items-center justify-between space-y-0">
        <CardTitle>Filters</CardTitle>
        {onClose && (
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Status Filter */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">
              Status
            </label>
            <Select
              value={filters.status || ''}
              onChange={(e) =>
                onFiltersChange({
                  ...filters,
                  status:
                    e.target.value !== ''
                      ? (e.target.value as TransactionStatus)
                      : undefined,
                })
              }
            >
              <option value="">All Statuses</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </Select>
          </div>

          {/* Network Filter */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">
              Network
            </label>
            <Select
              value={filters.network || ''}
              onChange={(e) =>
                onFiltersChange({
                  ...filters,
                  network:
                    e.target.value !== ''
                      ? (e.target.value as NetworkType)
                      : undefined,
                })
              }
            >
              <option value="">All Networks</option>
              {networks.map((network) => (
                <option key={network} value={network}>
                  {network}
                </option>
              ))}
            </Select>
          </div>

          {/* Min Amount */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">
              Min Amount (USDT)
            </label>
            <Input
              type="number"
              placeholder="0"
              value={filters.minAmount || ''}
              onChange={(e) =>
                onFiltersChange({
                  ...filters,
                  minAmount: e.target.value ? parseFloat(e.target.value) : undefined,
                })
              }
            />
          </div>

          {/* Max Amount */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">
              Max Amount (USDT)
            </label>
            <Input
              type="number"
              placeholder="10000"
              value={filters.maxAmount || ''}
              onChange={(e) =>
                onFiltersChange({
                  ...filters,
                  maxAmount: e.target.value ? parseFloat(e.target.value) : undefined,
                })
              }
            />
          </div>

          {/* Start Date */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">
              Start Date
            </label>
            <Input
              type="date"
              value={
                filters.startDate
                  ? filters.startDate.toISOString().split('T')[0]
                  : ''
              }
              onChange={(e) =>
                onFiltersChange({
                  ...filters,
                  startDate: e.target.value
                    ? new Date(e.target.value)
                    : undefined,
                })
              }
            />
          </div>

          {/* End Date */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">
              End Date
            </label>
            <Input
              type="date"
              value={
                filters.endDate
                  ? filters.endDate.toISOString().split('T')[0]
                  : ''
              }
              onChange={(e) =>
                onFiltersChange({
                  ...filters,
                  endDate: e.target.value ? new Date(e.target.value) : undefined,
                })
              }
            />
          </div>
        </div>

        <div className="mt-4 flex gap-2 justify-end">
          <Button variant="outline" size="sm" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
