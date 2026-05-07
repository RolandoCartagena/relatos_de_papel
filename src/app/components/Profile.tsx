import { useAuth } from '../../hooks/useAuth';
import { MapPin, Calendar, Package, ChevronRight, Mail } from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-neutral-100 py-12">
      <div className="max-w-5xl mx-auto px-4">
        
        {/* Header del Perfil */}
        <div className="bg-white border-2 border-neutral-300 p-8 mb-8 flex flex-col md:flex-row items-center gap-8">
          <img 
            src={user.avatar} 
            alt={user.name} 
            className="w-32 h-32 rounded-full border-4 border-neutral-100 bg-neutral-50 shadow-sm"
          />
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-serif font-bold text-neutral-900 mb-2">{user.name}</h1>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-neutral-600 text-sm">
              <span className="flex items-center gap-1">
                <Mail size={16} /> {user.email}
              </span>
              <span className="flex items-center gap-1">
                <MapPin size={16} /> {user.city}, {user.country}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={16} /> Miembro desde {user.memberSince}
              </span>
            </div>
          </div>
          <div className="bg-neutral-50 border-2 border-neutral-200 p-4 text-center">
            <p className="text-2xl font-bold text-neutral-800">{user.orders.length}</p>
            <p className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Pedidos Totales</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Columna Izquierda: Detalles de Envío */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white border-2 border-neutral-300 p-6">
              <h2 className="font-serif font-bold text-lg mb-4 flex items-center gap-2">
                <MapPin size={20} /> Dirección de Envío
              </h2>
              <p className="text-sm text-neutral-600 leading-relaxed">
                {user.address}<br />
                {user.city}, {user.country}
              </p>
              <button className="mt-4 text-xs font-bold text-neutral-400 hover:text-neutral-900 uppercase tracking-tighter transition-colors">
                Editar dirección
              </button>
            </div>
          </div>

          {/* Columna Derecha: Historial de Pedidos (REQUISITO MÁSTER) */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white border-2 border-neutral-300 p-6">
              <h2 className="font-serif font-bold text-lg mb-6 flex items-center gap-2">
                <Package size={20} /> Historial de últimos 5 pedidos
              </h2>
              
              <div className="space-y-4">
                {user.orders.map((order) => (
                  <div 
                    key={order.id} 
                    className="border-2 border-neutral-100 p-4 hover:border-neutral-300 transition-colors group cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-sm font-bold text-neutral-900">{order.id}</p>
                        <p className="text-xs text-neutral-500">{order.date}</p>
                      </div>
                      <span className={`text-[10px] font-bold uppercase px-2 py-1 border-2 ${
                        order.status === 'entregado' ? 'border-green-200 text-green-700 bg-green-50' : 'border-blue-200 text-blue-700 bg-blue-50'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-end">
                      <div className="text-xs text-neutral-600">
                        {order.items.map(item => (
                          <span key={item.bookId}>
                            {item.quantity}x {item.title}{order.items.length > 1 ? ', ' : ''}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-neutral-900">${order.total.toFixed(2)}</span>
                        <ChevronRight size={16} className="text-neutral-400 group-hover:text-neutral-900 transition-colors" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}