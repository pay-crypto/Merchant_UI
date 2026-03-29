import {
  Transaction,
  SummaryMetrics,
  DailyRevenue,
  NetworkDistribution,
  MonthlySummary,
  NotificationItem,
  MerchantProfile,
} from '../types';

// Generate random transactions
const generateTransactions = (): Transaction[] => {
  const statuses: ('pending' | 'confirmed' | 'rejected' | 'completed')[] = [
    'confirmed',
    'confirmed',
    'confirmed',
    'pending',
    'rejected',
  ];
  const networks: ('ERC20' | 'TRC20' | 'BEP20')[] = [
    'ERC20',
    'TRC20',
    'BEP20',
  ];
  const customers = [
    'Apple Inc.',
    'Microsoft Corp',
    'Google LLC',
    'Amazon.com',
    'Tesla Inc.',
    'Meta Platforms',
    'Netflix Inc.',
    'Adobe Corp',
    'Nvidia Inc.',
    'Intel Corp',
  ];

  const transactions: Transaction[] = [];

  for (let i = 0; i < 50; i++) {
    const amountUSDT = Math.floor(Math.random() * 5000) + 100;
    const convertedUSD = amountUSDT * 0.99;
    const commissionRate = 0.038;
    const commissionFee = convertedUSD * commissionRate;
    const payoutAmount = convertedUSD - commissionFee;

    const timestamp = new Date();
    timestamp.setHours(timestamp.getHours() - Math.floor(Math.random() * 72));

    transactions.push({
      id: `tx_${i + 1}`,
      orderId: `ORD-${String(1000 + i).padStart(5, '0')}`,
      customer: customers[Math.floor(Math.random() * customers.length)],
      walletAddress: `0x${Math.random().toString(16).substring(2, 42)}`,
      network: networks[Math.floor(Math.random() * networks.length)],
      transactionHash: `0x${Math.random().toString(16).substring(2, 66)}`,
      amountUSDT,
      convertedUSD: Math.round(convertedUSD * 100) / 100,
      commissionFee: Math.round(commissionFee * 100) / 100,
      payoutAmount: Math.round(payoutAmount * 100) / 100,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      timestamp,
      confirmations: Math.floor(Math.random() * 30),
      riskScore: Math.random() * 100,
    });
  }

  return transactions.sort(
    (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
  );
};

export const mockTransactions: Transaction[] = generateTransactions();

export const mockSummaryMetrics: SummaryMetrics = {
  totalUSDTReceived: 12500,
  totalUSDReceived: 12375,
  totalUSDPayout: 11900,
  commission: 475,
  commissionRate: 3.8,
  totalTransactions: 248,
  pendingTransactions: 12,
  rejectedTransactions: 8,
};

export const mockDailyRevenue: DailyRevenue[] = [
  {
    date: '2024-01-15',
    usdtRevenue: 2500,
    usdRevenue: 2475,
    transactionCount: 45,
  },
  {
    date: '2024-01-16',
    usdtRevenue: 3200,
    usdRevenue: 3168,
    transactionCount: 58,
  },
  {
    date: '2024-01-17',
    usdtRevenue: 2800,
    usdRevenue: 2772,
    transactionCount: 52,
  },
  {
    date: '2024-01-18',
    usdtRevenue: 3500,
    usdRevenue: 3465,
    transactionCount: 61,
  },
  {
    date: '2024-01-19',
    usdtRevenue: 4100,
    usdRevenue: 4059,
    transactionCount: 71,
  },
  {
    date: '2024-01-20',
    usdtRevenue: 3800,
    usdRevenue: 3762,
    transactionCount: 68,
  },
  {
    date: '2024-01-21',
    usdtRevenue: 2600,
    usdRevenue: 2574,
    transactionCount: 48,
  },
];

export const mockNetworkDistribution: NetworkDistribution[] = [
  { network: 'ERC20', count: 125, percentage: 50.4, volume: 6200 },
  { network: 'TRC20', count: 92, percentage: 37.1, volume: 4550 },
  { network: 'BEP20', count: 31, percentage: 12.5, volume: 1625 },
];

export const mockMonthlySummary: MonthlySummary[] = [
  { month: 'Jan', settlements: 45000, transactionCount: 210, totalVolume: 48000 },
  {
    month: 'Feb',
    settlements: 52000,
    transactionCount: 245,
    totalVolume: 55000,
  },
  {
    month: 'Mar',
    settlements: 48500,
    transactionCount: 228,
    totalVolume: 51500,
  },
  {
    month: 'Apr',
    settlements: 61000,
    transactionCount: 287,
    totalVolume: 65000,
  },
  {
    month: 'May',
    settlements: 58000,
    transactionCount: 272,
    totalVolume: 61800,
  },
  {
    month: 'Jun',
    settlements: 67500,
    transactionCount: 316,
    totalVolume: 72000,
  },
];

export const mockNotifications: NotificationItem[] = [
  {
    id: '1',
    title: 'Payment Confirmed',
    message: 'Transaction ORD-01001 has been confirmed',
    timestamp: new Date(Date.now() - 15 * 60000),
    isRead: false,
    type: 'success',
  },
  {
    id: '2',
    title: 'Pending Review',
    message: 'High-value transaction requires manual review',
    timestamp: new Date(Date.now() - 45 * 60000),
    isRead: false,
    type: 'warning',
  },
  {
    id: '3',
    title: 'Payout Processed',
    message: 'Monthly payout of $45,000 has been processed',
    timestamp: new Date(Date.now() - 2 * 3600000),
    isRead: true,
    type: 'info',
  },
  {
    id: '4',
    title: 'Transaction Failed',
    message: 'Transaction ORD-00998 was rejected',
    timestamp: new Date(Date.now() - 5 * 3600000),
    isRead: true,
    type: 'error',
  },
];

export const mockMerchantProfile: MerchantProfile = {
  id: 'merchant_001',
  name: 'Nike Inc.',
  email: 'admin@nike.com',
  walletAddress: '0x742d35Cc6634C0532925a3b844Bc1e4b7b6bF0c0',
  bankAccount: '****5678',
  apiKey: 'sk_live_51234567890',
  webhookUrl: 'https://api.nike.com/webhooks/payments',
  notificationEmail: 'payments@nike.com',
  darkModeEnabled: false,
};

export const mockApiKeys = [
  {
    id: 'key_1',
    name: 'Production API Key',
    key: 'sk_live_51234567890abcdefg',
    secret: '****ghijklmnopqrstuv',
    createdAt: new Date('2024-01-01'),
    lastUsed: new Date(Date.now() - 30 * 60000),
    isActive: true,
  },
  {
    id: 'key_2',
    name: 'Sandbox API Key',
    key: 'sk_test_51234567890abcdefg',
    secret: '****ghijklmnopqrstuv',
    createdAt: new Date('2024-01-15'),
    lastUsed: new Date(Date.now() - 2 * 3600000),
    isActive: true,
  },
];
