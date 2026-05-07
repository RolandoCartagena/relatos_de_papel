import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, ShoppingCart, Plus, Minus } from 'lucide-react';
import { mockBooks } from '../data/mockBooks';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [showMessage, setShowMessage] = useState(false);

  const book = mockBooks.find(b => b.id === id);

  if (!book) {
    return (
      <div className="min-h-screen bg-neutral-100 flex items-center justify-center">
        <div className="bg-white border-2 border-neutral-300 p-8 text-center">
          <p className="mb-4">Producto no encontrado</p>
          <button
            onClick={() => navigate('/catalog')}
            className="px-6 py-2 bg-neutral-800 text-white border-2 border-neutral-900"
          >
            Volver al catálogo
          </button>
        </div>
      </div>
    );
  }

  const cartItem = cart.find(item => item.id === book.id);
  const currentCartQuantity = cartItem?.quantity || 0;
  const maxQuantity = Math.max(0, book.stock - currentCartQuantity);

  const handleAddToCart = () => {
    if (book.stock === 0) {
      navigate('/error/out-of-stock');
      return;
    }
    for (let i = 0; i < quantity; i++) {
      addToCart(book);
    }
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  return (
    <div className="min-h-screen bg-neutral-100">
      {/* Header */}
      <header className="bg-white border-b-2 border-neutral-300">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <button
            onClick={() => navigate('/catalog')}
            className="flex items-center gap-2 text-neutral-700 hover:text-neutral-900"
          >
            <ArrowLeft size={20} />
            <span>Volver al catálogo</span>
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white border-2 border-neutral-300 p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div>
              <div className="w-full aspect-2/3 bg-neutral-200 flex items-center justify-center mb-4 shadow-xl border-2 border-neutral-300 overflow-hidden">
                <img 
                  src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`} 
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-sm text-neutral-600 text-center">
                Imagen del libro
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-medium mb-2">{book.title}</h1>
                <p className="text-xl text-neutral-600 mb-4">{book.author}</p>

                <div className="flex gap-2 mb-4">
                  <span className="px-3 py-1 text-sm border-2 border-neutral-300 bg-neutral-50">
                    {book.type === 'physical' ? 'LIBRO FÍSICO' : 'LIBRO DIGITAL'}
                  </span>
                  {book.stock > 0 ? (
                    <span className="px-3 py-1 text-sm border-2 border-green-600 bg-green-50 text-green-700">
                      {book.stock} EN STOCK
                    </span>
                  ) : (
                    <span className="px-3 py-1 text-sm border-2 border-red-600 bg-red-50 text-red-700">
                      SIN STOCK
                    </span>
                  )}
                </div>

                <div className="text-4xl font-medium mb-6">${book.price.toFixed(2)}</div>
              </div>

              <div className="border-t-2 border-neutral-200 pt-6">
                <h2 className="text-sm mb-3 text-neutral-700">DETALLES DEL PRODUCTO</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">ISBN:</span>
                    <span>{book.isbn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Páginas:</span>
                    <span>{book.pages}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Formato:</span>
                    <span>{book.type === 'physical' ? 'Tapa blanda' : 'PDF/ePub'}</span>
                  </div>
                </div>
              </div>

              <div className="border-t-2 border-neutral-200 pt-6">
                <h2 className="text-sm mb-3 text-neutral-700">DESCRIPCIÓN</h2>
                <p className="text-neutral-700">{book.description}</p>
              </div>

              {/* Quantity Selector */}
              {book.stock > 0 && (
                <div className="border-t-2 border-neutral-200 pt-6">
                  <label className="block text-sm mb-3 text-neutral-700">CANTIDAD</label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 border-2 border-neutral-300 hover:bg-neutral-100 flex items-center justify-center"
                      disabled={quantity <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="text-xl w-12 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(maxQuantity, quantity + 1))}
                      className="w-10 h-10 border-2 border-neutral-300 hover:bg-neutral-100 flex items-center justify-center"
                      disabled={quantity >= maxQuantity}
                    >
                      <Plus size={16} />
                    </button>
                    <span className="text-sm text-neutral-600">
                      (Máximo: {maxQuantity})
                    </span>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={handleAddToCart}
                  disabled={book.stock === 0 || maxQuantity === 0}
                  className="w-full px-6 py-4 bg-neutral-800 text-white border-2 border-neutral-900 hover:bg-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  <span>{book.stock === 0 ? 'SIN STOCK' : 'AÑADIR AL CARRITO'}</span>
                </button>
                <button
                  onClick={() => navigate('/cart')}
                  className="w-full px-6 py-4 border-2 border-neutral-300 hover:bg-neutral-100"
                >
                  IR AL CARRITO ({currentCartQuantity})
                </button>
              </div>

              {/* Success Message */}
              {showMessage && (
                <div className="bg-green-50 border-2 border-green-600 p-4 text-green-800">
                  ✓ Producto añadido al carrito
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
