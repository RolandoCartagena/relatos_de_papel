import { useAuth } from '../../hooks/useAuth';
import { MapPin, Calendar, Package, ChevronRight, Mail, Loader2 } from 'lucide-react';
import { useOrders } from '../../hooks/useOrders';

export default function Profile() {
  const { user } = useAuth();
  const { orders, loading, error, reload } = useOrders(user?.id);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-neutral-100 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white border-2 border-neutral-300 p-8 mb-8 flex flex-col md:flex-row items-center gap-8">
          <div className="w-32 h-32 rounded-full border-4 border-neutral-100 bg-neutral-50 shadow-sm flex items-center justify-center text-6xl">
            {user.fullName?.charAt(0) || 'U'}
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-serif font-bold text-neutral-900 mb-2">
              {user.fullName}
            </h1>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-neutral-600 text-sm">
              <span className="flex items-center gap-1"><Mail size={16} /> {user.email}</span>
              <span className="flex items-center gap-1"><MapPin size={16} /> {user.city}, {user.countryName}</span>
              <span className="flex items-center gap-1"><Calendar size={16} /> Miembro desde {user.memberSince}</span>
            </div>
          </div>
          <div className="bg-neutral-50 border-2 border-neutral-200 p-4 text-center">
            <p className="text-2xl font-bold text-neutral-800">{orders.length}</p>
            <p className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Pedidos Totales</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white border-2 border-neutral-300 p-6">
              <h2 className="font-serif font-bold text-lg mb-4 flex items-center gap-2">
                <MapPin size={20} /> Dirección de Envío
              </h2>
              <p className="text-sm text-neutral-600 leading-relaxed">
                {user.address}<br />
                {user.city}, {user.countryName}
              </p>
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
            <div className="bg-white border-2 border-neutral-300 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-serif font-bold text-lg flex items-center gap-2">
                  <Package size={20} /> Historial de Pedidos
                </h2>
                {error && (
                  <button
                    onClick={reload}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Reintentar
                  </button>
                )}
              </div>

              {loading ? (
                <div className="flex justify-center py-8"><Loader2 size={32} className="animate-spin" /></div>
              ) : error ? (
                <p className="text-red-600">{error}</p>
              ) : orders.length === 0 ? (
                <p className="text-neutral-600">No tienes pedidos aún.</p>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border-2 border-neutral-100 p-4 hover:border-neutral-300 transition-colors cursor-pointer">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-sm font-bold text-neutral-900">#{order.id}</p>
                          <p className="text-xs text-neutral-500">{new Date(order.orderDate).toLocaleDateString()}</p>
                        </div>
                        <span className="text-[10px] font-bold uppercase px-2 py-1 border-2 border-green-200 text-green-700 bg-green-50">
                          Entregado
                        </span>
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="text-xs text-neutral-600">
                          Libro ID: {order.bookId}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-neutral-900">${order.totalPaid.toFixed(2)}</span>
                          <ChevronRight size={16} className="text-neutral-400" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}