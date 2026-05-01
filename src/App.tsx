import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import MainLayout from './components/MainLayout';
import Dashboard from './pages/Dashboard';
import POSTerminal from './pages/POSTerminal';
import Inventory from './pages/Inventory';
import CRM from './pages/CRM';
import History from './pages/History';
import Payment from './pages/Checkout';
import Login from './pages/Login';
import Reports from './pages/Reports';
import Promotions from './pages/Promotions';
import Recipes from './pages/Recipes';
import Settings from './pages/Settings';
import Shifts from './pages/Shifts';
import AuditLog from './pages/AuditLog';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <MainLayout>{children}</MainLayout>;
};

const HomeRedirect = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role === 'STAFF') return <Navigate to="/pos" replace />;
  return <Dashboard />;
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={<ProtectedRoute><HomeRedirect /></ProtectedRoute>} />
          <Route path="/pos" element={<ProtectedRoute><POSTerminal /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
          <Route path="/inventory" element={<ProtectedRoute><Inventory /></ProtectedRoute>} />
          <Route path="/crm" element={<ProtectedRoute><CRM /></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
          <Route path="/promotions" element={<ProtectedRoute><Promotions /></ProtectedRoute>} />
          <Route path="/recipe" element={<ProtectedRoute><Recipes /></ProtectedRoute>} />
          <Route path="/shifts" element={<ProtectedRoute><Shifts /></ProtectedRoute>} />
          <Route path="/audit" element={<ProtectedRoute><AuditLog /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          
          <Route path="*" element={<ProtectedRoute>
            <div className="flex flex-col items-center justify-center h-full space-y-4 py-20 opacity-50">
              <h2 className="text-2xl font-bold">Feature coming soon</h2>
              <p>Trang này hiện đang được hoàn thiện cho bản Demo chính thức.</p>
              <button 
                onClick={() => window.history.back()}
                className="px-6 py-2 bg-brand-teal text-white rounded-full font-bold"
              >
                Quay lại
              </button>
            </div>
          </ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
