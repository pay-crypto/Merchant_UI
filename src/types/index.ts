export type TransactionStatus = 'pending' | 'confirmed' | 'rejected' | 'completed';
export type NetworkType = 'ERC20' | 'TRC20' | 'BEP20';
export type CurrencyType = 'USDT' | 'USD';

export interface Transaction {
  id: string;
  orderId: string;
  customer: string;
  walletAddress: string;
  network: NetworkType;
  transactionHash: string;
  amountUSDT: number;
  convertedUSD: number;
  commissionFee: number;
  payoutAmount: number;
  status: TransactionStatus;
  timestamp: Date;
  confirmations: number;
  riskScore: number;
}

export interface SummaryMetrics {
  totalUSDTReceived: number;
  totalUSDReceived: number;
  totalUSDPayout: number;
  commission: number;
  commissionRate: number;
  totalTransactions: number;
  pendingTransactions: number;
  rejectedTransactions: number;
}

export interface DailyRevenue {
  date: string;
  usdtRevenue: number;
  usdRevenue: number;
  transactionCount: number;
}

export interface NetworkDistribution {
  network: NetworkType;
  count: number;
  percentage: number;
  volume: number;
}

export interface MonthlySummary {
  month: string;
  settlements: number;
  transactionCount: number;
  totalVolume: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
}

export interface MerchantProfile {
  id: string;
  name: string;
  email: string;
  walletAddress: string;
  bankAccount?: string;
  apiKey: string;
  webhookUrl?: string;
  notificationEmail?: string;
  darkModeEnabled: boolean;
}

export interface ApiKeyItem {
  id: string;
  name: string;
  key: string;
  secret: string;
  createdAt: Date;
  lastUsed?: Date;
  isActive: boolean;
}

export interface FilterOptions {
  startDate?: Date;
  endDate?: Date;
  status?: TransactionStatus;
  network?: NetworkType;
  currency?: CurrencyType;
  minAmount?: number;
  maxAmount?: number;
  searchQuery?: string;
}
