import React, { useState } from 'react';
import { Menu, X, Bell, Settings, LogOut } from 'lucide-react';
import { useAppStore } from '../../store';
import { Button } from '../ui/Button';
import { Avatar } from './Avatar';

interface HeaderProps {
  onMenuClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { toggleSidebar, profile, notifications, unreadCount } = useAppStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleMenuClick = () => {
    toggleSidebar();
    onMenuClick?.();
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleMenuClick}
            className="md:hidden"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-indigo-700 flex items-center justify-center text-white font-bold text-sm">
              CP
            </div>
            <div className="hidden sm:block">
              <h1 className="text-sm font-semibold text-slate-900">CryptoPay</h1>
              <p className="text-xs text-slate-500">Welcome, {profile.name}!</p>
            </div>
          </div>
        </div>

        {/* Center - Navigation (hidden on mobile) */}
        <nav className="hidden lg:flex items-center gap-1">
          <a
            href="/"
            className="px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
          >
            Dashboard
          </a>
          <a
            href="/reports"
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
          >
            Reports
          </a>
          <a
            href="/settings"
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
          >
            Settings
          </a>
        </nav>

        {/* Right */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative"
            >
              <Bell className="w-5 h-5 text-slate-600" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </Button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg border border-slate-200 shadow-lg z-50">
                <div className="p-4 border-b border-slate-200">
                  <h3 className="font-semibold text-slate-900">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-slate-600">
                      No notifications
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-3 border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors ${
                          !notif.isRead ? 'bg-indigo-50' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                              notif.type === 'success'
                                ? 'bg-green-500'
                                : notif.type === 'warning'
                                ? 'bg-amber-500'
                                : notif.type === 'error'
                                ? 'bg-red-500'
                                : 'bg-blue-500'
                            }`}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-900">
                              {notif.title}
                            </p>
                            <p className="text-xs text-slate-600 mt-1">
                              {notif.message}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Profile Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              <Avatar name={profile.name} />
            </Button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg border border-slate-200 shadow-lg z-50">
                <div className="p-3 border-b border-slate-200">
                  <p className="text-sm font-semibold text-slate-900">
                    {profile.name}
                  </p>
                  <p className="text-xs text-slate-600">{profile.email}</p>
                </div>
                <a
                  href="/settings"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </a>
                <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors border-t border-slate-200">
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
