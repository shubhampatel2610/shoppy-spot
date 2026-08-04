import React from 'react';
import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import ProductListingPage from './pages/ProductListingPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import UserDetailsPage from './pages/UserDetailsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import LoginRequiredDialog from './components/Auth/LoginRequiredDialog';
import VendorLayout from './components/Vendor/VendorLayout';
import VendorDashboardPage from './pages/Vendor/VendorDashboardPage';
import VendorProductListPage from './pages/Vendor/VendorProductListPage';
import VendorProductFormPage from './pages/Vendor/VendorProductFormPage';
import VendorOrderListPage from './pages/Vendor/VendorOrderListPage';
import VendorOrderDetailPage from './pages/Vendor/VendorOrderDetailPage';
import VendorReviewsPage from './pages/Vendor/VendorReviewsPage';
import VendorSettingsPage from './pages/Vendor/VendorSettingsPage';

// Routes that render their own full-page layout, without the shared navbar.
const NAVBAR_HIDDEN_ROUTES = ['/login', '/signup', '/unauthorized'];

const App = () => {
  const location = useLocation();
  const isVendorRoute = location.pathname.startsWith('/vendor');
  const hideNavbar = NAVBAR_HIDDEN_ROUTES.includes(location.pathname) || isVendorRoute;

  return (
    <div className="min-h-screen bg-gray-100">
      {!hideNavbar && <Navbar />}
      <LoginRequiredDialog />
      <Routes>
        <Route element={<ProtectedRoute allowedRoles={['customer']}><Outlet /></ProtectedRoute>}>
          <Route path="/" element={<ProductListingPage />} />
          <Route path="/product/:productId" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/user" element={<UserDetailsPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route
          path="/vendor/*"
          element={
            <ProtectedRoute allowedRoles={['vendor']}>
              <VendorLayout>
                <Routes>
                  <Route path="dashboard" element={<VendorDashboardPage />} />
                  <Route path="products" element={<VendorProductListPage />} />
                  <Route path="products/new" element={<VendorProductFormPage />} />
                  <Route path="products/:productId/edit" element={<VendorProductFormPage />} />
                  <Route path="orders" element={<VendorOrderListPage />} />
                  <Route path="orders/:orderId" element={<VendorOrderDetailPage />} />
                  <Route path="reviews" element={<VendorReviewsPage />} />
                  <Route path="settings" element={<VendorSettingsPage />} />
                </Routes>
              </VendorLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  )
}

export default App;
