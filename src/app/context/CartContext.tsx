import { createContext, useContext, useState, ReactNode } from "react";
import type { Book } from "../../services/catalogueService";

export interface CartItem extends Book {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (book: Book, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ Función para actualizar localStorage y estado
  const updateStorage = (newCart: CartItem[]) => {
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCart(newCart);
  };

  const addToCart = (book: Book, quantity: number = 1) => {
    console.log("🛒 addToCart:", { bookId: book.id, quantity });

    if (quantity <= 0) return;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === book.id);

      if (existing) {
        const newQuantity = Math.min(existing.quantity + quantity, book.stock);
        console.log(
          "📊 Actualizando cantidad:",
          existing.quantity,
          "→",
          newQuantity,
        );

        const updated = prev.map((item) =>
          item.id === book.id ? { ...item, quantity: newQuantity } : item,
        );
        updateStorage(updated);
        return updated;
      }

      const newItem = { ...book, quantity: Math.min(quantity, book.stock) };
      console.log("🆕 Nuevo item en carrito:", newItem);

      const newCart = [...prev, newItem];
      updateStorage(newCart);
      return newCart;
    });
  };

  const removeFromCart = (id: string) => {
    const newCart = cart.filter((item) => item.id !== id);
    updateStorage(newCart);
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    const newCart = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.min(quantity, item.stock) }
        : item,
    );
    updateStorage(newCart);
  };

  const clearCart = () => {
    updateStorage([]);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de CartProvider");
  }
  return context;
}
