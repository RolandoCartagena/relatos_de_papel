import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { CartProvider } from './app/context/CartContext';
import { AuthProvider } from './app/context/AuthProvider';
import ProtectedRoute from './app/components/ProtectedRoute';

import Landing from './app/components/Landing';
import Catalog from './app/components/Catalog';
import ProductDetail from './app/components/ProductDetail';
import Cart from './app/components/Cart';
import Checkout from './app/components/Checkout';
import Payment from './app/components/Payment';
import Confirmation from './app/components/Confirmation';
import ErrorPage from './app/components/ErrorPage';
import Login from './app/components/Login';
import Navbar from './app/components/Navbar';
import Footer from './app/components/Footer';
import Profile from './app/components/Profile';

export default function App() {
  return (
    <BrowserRouter>
      {/* El AuthProvider debe envolver al CartProvider para que el carrito sepa quién compra */}
      <AuthProvider>
        <CartProvider>
          <div className="size-full min-h-screen bg-neutral-100 flex flex-col">
            <Navbar />
            <main className="flex-1">
            <Routes>
              {/* Públicas */}
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/error/:type" element={<ErrorPage />} />

              {/* PROTEGIDAS: Solo accesibles si estás logueado */}
              <Route element={<ProtectedRoute />}>
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/confirmation" element={<Confirmation />} />
                <Route path="/profile" element={<Profile />} />
              </Route>

              {/* Captura errores de rutas no existentes */}
              <Route path="*" element={<Navigate to="/error/404" replace />} />
            </Routes>
            </main>
            <Footer/>
          </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}