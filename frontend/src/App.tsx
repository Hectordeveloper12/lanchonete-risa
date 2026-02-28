import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OrdersPage from './pages/OrdersPage';
import ProductsPage from './pages/ProductsPage';
import CategoriesPage from './pages/CategoriesPage';
import TablesPage from './pages/TablesPage';
import KitchenPage from './pages/KitchenPage';
import SessionsPage from './pages/SessionsPage';
import PaymentsPage from './pages/PaymentsPage';
import DashboardPage from './pages/DashboardPage';
import TenantsPage from './pages/TenantsPage';
import { UserRole } from './types';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route index element={<Navigate to="/orders" replace />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="categories" element={<CategoriesPage />} />
            <Route path="tables" element={<TablesPage />} />
            <Route path="kitchen" element={<KitchenPage />} />
            <Route path="sessions" element={<SessionsPage />} />
            <Route path="payments" element={<PaymentsPage />} />
            <Route path="dashboard" element={
              <ProtectedRoute allowedRoles={[UserRole.SuperAdmin]}>
                <DashboardPage />
              </ProtectedRoute>
            } />
            <Route path="tenants" element={
              <ProtectedRoute allowedRoles={[UserRole.SuperAdmin]}>
                <TenantsPage />
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
        <Toaster position="top-right" />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
