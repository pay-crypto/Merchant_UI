import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header, Sidebar, Footer } from './components/layout';
import { Dashboard } from './pages/Dashboard';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen flex-col bg-gray-100">
        {/* Header */}
        <Header />

        {/* Main Content Area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto bg-gray-100">
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
