import { create } from 'zustand';
import { Transaction, NotificationItem, MerchantProfile, FilterOptions } from '../types';
import { mockTransactions, mockNotifications, mockMerchantProfile } from '../data/mockData';

interface AppState {
  // Transactions
  transactions: Transaction[];
  filteredTransactions: Transaction[];
  
  // Notifications
  notifications: NotificationItem[];
  unreadCount: number;
  
  // Profile
  profile: MerchantProfile;
  
  // UI State
  sidebarOpen: boolean;
  darkMode: boolean;
  loading: boolean;
  selectedTransaction: Transaction | null;
  
  // Filters
  filters: FilterOptions;
  
  // Actions
  setTransactions: (transactions: Transaction[]) => void;
  filterTransactions: (filters: FilterOptions) => void;
  resetFilters: () => void;
  
  toggleSidebar: () => void;
  toggleDarkMode: () => void;
  setLoading: (loading: boolean) => void;
  
  setNotifications: (notifications: NotificationItem[]) => void;
  markNotificationAsRead: (id: string) => void;
  addNotification: (notification: NotificationItem) => void;
  
  setProfile: (profile: MerchantProfile) => void;
  selectTransaction: (transaction: Transaction | null) => void;
  
  updateFilters: (filters: Partial<FilterOptions>) => void;
}

export const useAppStore = create<AppState>((set) => ({
  transactions: mockTransactions,
  filteredTransactions: mockTransactions,
  notifications: mockNotifications,
  unreadCount: mockNotifications.filter((n) => !n.isRead).length,
  profile: mockMerchantProfile,
  sidebarOpen: true,
  darkMode: false,
  loading: false,
  selectedTransaction: null,
  filters: {},

  setTransactions: (transactions) =>
    set({ transactions, filteredTransactions: transactions }),

  filterTransactions: (filters) =>
    set((state) => {
      let filtered = [...state.transactions];

      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        filtered = filtered.filter(
          (t) =>
            t.orderId.toLowerCase().includes(query) ||
            t.customer.toLowerCase().includes(query)
        );
      }

      if (filters.status) {
        filtered = filtered.filter((t) => t.status === filters.status);
      }

      if (filters.network) {
        filtered = filtered.filter((t) => t.network === filters.network);
      }

      if (filters.startDate) {
        filtered = filtered.filter((t) => t.timestamp >= filters.startDate!);
      }

      if (filters.endDate) {
        filtered = filtered.filter((t) => t.timestamp <= filters.endDate!);
      }

      if (filters.minAmount !== undefined) {
        filtered = filtered.filter((t) => t.amountUSDT >= filters.minAmount!);
      }

      if (filters.maxAmount !== undefined) {
        filtered = filtered.filter((t) => t.amountUSDT <= filters.maxAmount!);
      }

      return { filteredTransactions: filtered, filters };
    }),

  resetFilters: () =>
    set((state) => ({
      filters: {},
      filteredTransactions: state.transactions,
    })),

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  toggleDarkMode: () =>
    set((state) => {
      const newDarkMode = !state.darkMode;
      return {
        darkMode: newDarkMode,
        profile: { ...state.profile, darkModeEnabled: newDarkMode },
      };
    }),

  setLoading: (loading) => set({ loading }),

  setNotifications: (notifications) =>
    set({
      notifications,
      unreadCount: notifications.filter((n) => !n.isRead).length,
    }),

  markNotificationAsRead: (id) =>
    set((state) => {
      const updated = state.notifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n
      );
      return {
        notifications: updated,
        unreadCount: updated.filter((n) => !n.isRead).length,
      };
    }),

  addNotification: (notification) =>
    set((state) => {
      const updated = [notification, ...state.notifications];
      return {
        notifications: updated,
        unreadCount: updated.filter((n) => !n.isRead).length,
      };
    }),

  setProfile: (profile) => set({ profile }),

  selectTransaction: (transaction) => set({ selectedTransaction: transaction }),

  updateFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),
}));
