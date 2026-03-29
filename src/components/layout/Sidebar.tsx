import React from 'react';
import {
  LayoutDashboard,
  BarChart3,
  Settings as SettingsIcon,
  X,
  ChevronDown,
} from 'lucide-react';
import { useAppStore } from '../../store';
import { Button } from '../ui/Button';
import { useLocation } from 'react-router-dom';

export const Sidebar: React.FC = () => {
  const { sidebarOpen, toggleSidebar } = useAppStore();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { label: 'Reports', icon: BarChart3, path: '/reports' },
    { label: 'Settings', icon: SettingsIcon, path: '/settings' },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static left-0 top-16 z-40 h-screen md:h-auto w-64 bg-white border-r border-slate-200 transition-transform duration-300 ease-in-out md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 flex items-center justify-between md:hidden">
          <h2 className="font-semibold text-slate-900">Menu</h2>
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <nav className="px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <a
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                  active
                    ? 'bg-indigo-50 text-indigo-600 border-l-4 border-indigo-600'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
                onClick={() => {
                  if (window.innerWidth < 768) {
                    toggleSidebar();
                  }
                }}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.label}</span>
                {active && <ChevronDown className="w-4 h-4 ml-auto" />}
              </a>
            );
          })}
        </nav>

        {/* Footer Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 hidden md:block">
          <div className="bg-indigo-50 rounded-lg p-3">
            <p className="text-xs font-semibold text-indigo-900">Tip</p>
            <p className="text-xs text-indigo-700 mt-1">
              Monitor your transactions in real-time for better insights.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
