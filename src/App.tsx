import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header, Sidebar, Footer } from './components/layout';
import { Dashboard } from './pages/Dashboard';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';
import { useAppStore } from './store';

function App() {
  const { sidebarOpen } = useAppStore();

  return (
    <BrowserRouter>
      <div className="flex h-screen flex-col bg-slate-50">
        {/* Header */}
        <Header />

        {/* Main Content Area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <main
            className={`flex-1 overflow-y-auto transition-all duration-300 ${
              sidebarOpen ? 'md:ml-0' : 'ml-0'
            }`}
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>

            {/* Footer */}
            <Footer />
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
