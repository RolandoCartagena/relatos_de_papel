import { createContext, useContext, useState, ReactNode } from 'react';
import type { Book } from '../../services/catalogueService';

export interface CartItem extends Book {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (book: Book) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;  // ✅ Asegurar que itemCount está definido
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  const updateStorage = (newCart: CartItem[]) => {
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCart(newCart);
  };

  const addToCart = (book: Book) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === book.id);
      if (existing) {
        const updated = prev.map(item =>
          item.id === book.id
            ? { ...item, quantity: Math.min(item.quantity + 1, item.stock) }
            : item
        );
        updateStorage(updated);
        return updated;
      }
      const newCart = [...prev, { ...book, quantity: 1 }];
      updateStorage(newCart);
      return newCart;
    });
  };

  const removeFromCart = (id: string) => {
    const newCart = cart.filter(item => item.id !== id);
    updateStorage(newCart);
  };

  const updateQuantity = (id: string, quantity: number) => {
    const newCart = cart
      .map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, Math.min(quantity, item.stock)) }
          : item
      )
      .filter(item => item.quantity > 0);
    updateStorage(newCart);
  };

  const clearCart = () => {
    updateStorage([]);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);  // ✅ Calcular itemCount

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
        itemCount,  // ✅ Incluir itemCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de CartProvider');
  }
  return context;
}