import { useNavigate } from 'react-router';
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, total } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-100">
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

        <div className="max-w-5xl mx-auto px-4 py-16">
          <div className="bg-white border-2 border-neutral-300 p-12 text-center">
            <ShoppingBag size={64} className="mx-auto mb-4 text-neutral-300" />
            <h2 className="text-2xl mb-4">Tu carrito está vacío</h2>
            <p className="text-neutral-600 mb-6">Añade algunos libros para comenzar tu compra</p>
            <button
              onClick={() => navigate('/catalog')}
              className="px-8 py-3 bg-neutral-800 text-white border-2 border-neutral-900 hover:bg-neutral-700"
            >
              EXPLORAR CATÁLOGO
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-100">
      {/* Header */}
      <header className="bg-white border-b-2 border-neutral-300">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/catalog')}
              className="flex items-center gap-2 text-neutral-700 hover:text-neutral-900"
            >
              <ArrowLeft size={20} />
              <span>Continuar comprando</span>
            </button>
            <h1 className="text-2xl font-medium">CARRITO DE COMPRA</h1>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-4">
            <div className="bg-white border-2 border-neutral-300 p-4">
              <h2 className="text-sm mb-4 text-neutral-700">PRODUCTOS ({cart.length})</h2>
            </div>

            {cart.map(item => (
              <div key={item.id} className="bg-white border-2 border-neutral-300 p-6">
                <div className="flex gap-6">
                  {/* Book Cover */}
                  <div className="w-20 h-28 bg-neutral-200 shrink-0 border border-neutral-300 overflow-hidden shadow-sm">
                    <img 
                      src={item.coverImage} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Book Info */}
                  <div className="grow">
                    <div className="flex justify-between mb-2">
                      <div>
                        <h3 className="font-medium mb-1 leading-tight">{item.title}</h3>
                        <p className="text-sm text-neutral-600 mb-2">{item.author}</p>
                        <span className="px-2 py-1 text-[10px] font-bold border border-neutral-300 bg-neutral-50 uppercase tracking-wider">
                          {item.type === 'physical' ? 'FÍSICO' : 'DIGITAL'}
                        </span>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-800 h-8"
                        title="Eliminar"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>

                    {/* Quantity and Price */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t-2 border-neutral-100">
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-neutral-600">Cantidad:</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 border-2 border-neutral-300 hover:bg-neutral-100 flex items-center justify-center"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 border-2 border-neutral-300 hover:bg-neutral-100 flex items-center justify-center"
                          disabled={item.quantity >= item.stock}
                        >
                          <Plus size={14} />
                        </button>
                        <span className="text-sm text-neutral-600">
                          (Stock: {item.stock})
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-neutral-600">
                          ${item.price.toFixed(2)} × {item.quantity}
                        </div>
                        <div className="text-xl font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-white border-2 border-neutral-300 p-6 sticky top-4">
              <h2 className="text-sm mb-6 text-neutral-700">RESUMEN DEL PEDIDO</h2>

              <div className="space-y-3 mb-6 pb-6 border-b-2 border-neutral-200">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Subtotal:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Envío:</span>
                  <span>Por calcular</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Impuestos:</span>
                  <span>Por calcular</span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-medium mb-6">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full px-6 py-4 bg-neutral-800 text-white border-2 border-neutral-900 hover:bg-neutral-700 mb-3"
              >
                PROCEDER AL PAGO
              </button>

              <button
                onClick={() => navigate('/catalog')}
                className="w-full px-6 py-4 border-2 border-neutral-300 hover:bg-neutral-100"
              >
                SEGUIR COMPRANDO
              </button>

              <div className="mt-6 pt-6 border-t-2 border-neutral-200 text-sm text-neutral-600">
                <p className="mb-2">Información del proceso:</p>
                <ul className="space-y-1 text-xs">
                  <li>• Pago seguro</li>
                  <li>• Envío gratuito &gt; $50</li>
                  <li>• Devoluciones 30 días</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
