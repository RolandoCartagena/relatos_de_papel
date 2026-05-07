import { createContext, useContext, useState, type ReactNode } from 'react';

export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  type: 'physical' | 'digital';
  stock: number;
  isbn: string;
  pages: number;
  description: string;
  coverImage: string; // Campo para la URL de la imagen
}

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
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (book: Book) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === book.id);
      if (existing) {
        return prev.map(item =>
          item.id === book.id
            ? { ...item, quantity: Math.min(item.quantity + 1, item.stock) }
            : item
        );
      }
      return [...prev, { ...book, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: Math.max(0, Math.min(quantity, item.stock)) } : item
      ).filter(item => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
