import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import ProductListingPage from './pages/ProductListingPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import UserDetailsPage from './pages/UserDetailsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import LoginRequiredDialog from './components/Auth/LoginRequiredDialog';

// Routes that render their own full-page layout, without the shared navbar.
const NAVBAR_HIDDEN_ROUTES = ['/login', '/signup'];

const App = () => {
  const location = useLocation();
  const hideNavbar = NAVBAR_HIDDEN_ROUTES.includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-100">
      {!hideNavbar && <Navbar />}
      <LoginRequiredDialog />
      <Routes>
        <Route path="/" element={<ProductListingPage />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
        <Route path="/user" element={<UserDetailsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </div>
  )
}

export default App;
