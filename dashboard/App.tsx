import React from 'react';
import { HashRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Dashboard from './pages/Dashboard';
import Payment from './pages/Payment';
import Customers from './pages/Customers';
import Message from './pages/Message';
import Product from './pages/Product';
import Invoice from './pages/Invoice';
import Analytics from './pages/Analytics';
import Automation from './pages/Automation';
import Settings from './pages/Settings';
import Security from './pages/Security';
import Help from './pages/Help';
import AgentMaker from './pages/AgentMaker';

// Layout component for authenticated pages
const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-[#f9fafb] dark:bg-gray-900 font-sans text-gray-900 dark:text-gray-100 overflow-hidden transition-colors duration-200">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col h-full">
        <Header />
        <main className="flex-1 overflow-hidden overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <HashRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }>
              <Route path="/" element={<Dashboard />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/messages" element={<Message />} />
              <Route path="/products" element={<Product />} />
              <Route path="/invoices" element={<Invoice />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/agent-maker" element={<AgentMaker />} />
              <Route path="/help" element={<Help />} />
              
              {/* Admin Only Routes */}
              <Route path="/automation" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Automation />
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Settings />
                </ProtectedRoute>
              } />
              <Route path="/security" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Security />
                </ProtectedRoute>
              } />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </HashRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;