import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { CartProvider } from './app/context/CartContext';
import { AuthProvider } from './app/context/AuthProvider'; // ✅ Importar desde AuthProvider
import ProtectedRoute from './app/components/ProtectedRoute';

import Navbar from './app/components/Navbar';
import Footer from './app/components/Footer';

import Landing from './app/views/Landing';
import Login from './app/views/Login';
import Profile from './app/views/Profile';
import Catalog from './app/views/Catalog';
import ProductDetail from './app/views/ProductDetail';
import Cart from './app/views/Cart';
import Checkout from './app/views/Checkout';
import Payment from './app/views/Payment';
import Confirmation from './app/views/Confirmation';
import ErrorPage from './app/views/ErrorPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <div className="size-full min-h-screen bg-neutral-100 flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/error/:type" element={<ErrorPage />} />

                <Route element={<ProtectedRoute />}>
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/payment" element={<Payment />} />
                  <Route path="/confirmation" element={<Confirmation />} />
                  <Route path="/profile" element={<Profile />} />
                </Route>

                <Route path="*" element={<Navigate to="/error/404" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}