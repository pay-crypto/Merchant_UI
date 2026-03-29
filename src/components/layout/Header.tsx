import React, { useState } from 'react';
import { Bell, Settings, LogOut, ChevronDown } from 'lucide-react';
import { useAppStore } from '../../store';
import { Button } from '../ui/Button';
import { Avatar } from './Avatar';

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  const { toggleSidebar, profile, notifications, unreadCount } = useAppStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left - Logo and Welcome */}
        <div className="flex items-center gap-8">
          {/* Nike Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-black flex items-center justify-center">
              <span className="text-white font-bold text-lg">N</span>
            </div>
          </div>
          
          {/* Welcome Text */}
          <div className="hidden sm:flex items-center gap-2">
            <p className="text-lg font-semibold text-gray-900">Welcome, Nike!</p>
          </div>
        </div>

        {/* Center - Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <a
            href="/"
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            <span>📊</span>
            Dashboard
          </a>
          <a
            href="/reports"
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            <span>📈</span>
            Reports
          </a>
          <a
            href="/settings"
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            <span>⚙️</span>
            Settings
          </a>
        </nav>

        {/* Right - Notifications and Profile */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg border border-gray-200 shadow-lg z-50">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-gray-600">
                      No notifications
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900">
                              {notif.title}
                            </p>
                            <p className="text-xs text-gray-600 mt-1">
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
          <div className="relative flex items-center gap-2 cursor-pointer" onClick={() => setShowProfileMenu(!showProfileMenu)}>
            <Avatar name={profile.name || 'Admin'} />
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-900">Admin</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-600" />

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg border border-gray-200 shadow-lg z-50 mt-12">
                <div className="p-3 border-b border-gray-200">
                  <p className="text-sm font-semibold text-gray-900">
                    {profile.name || 'Admin'}
                  </p>
                  <p className="text-xs text-gray-600">{profile.email}</p>
                </div>
                <a
                  href="/settings"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </a>
                <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
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
