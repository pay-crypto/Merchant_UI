import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-50 py-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-600">
            &copy; {currentYear} CryptoPay Merchant Dashboard. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-slate-600 hover:text-slate-900">
              Terms
            </a>
            <a href="#" className="text-sm text-slate-600 hover:text-slate-900">
              Privacy
            </a>
            <a href="#" className="text-sm text-slate-600 hover:text-slate-900">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
