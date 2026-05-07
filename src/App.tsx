import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { CartProvider } from './app/context/CartContext'
import Catalog from './app/components/Catalog';
import ProductDetail from './app/components/ProductDetail';
import Cart from './app/components/Cart';
import Checkout from './app/components/Checkout';
import Payment from './app/components/Payment';
import Confirmation from './app/components/Confirmation';
import ErrorPage from './app/components/ErrorPage';

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="size-full bg-neutral-100">
          <Routes>
            <Route path="/" element={<Navigate to="/catalog" replace />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/error/:type" element={<ErrorPage />} />
          </Routes>
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}
