import { useNavigate, Link } from 'react-router';
import { ShoppingCart, User, LogOut, BookOpen } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout, isLoggedIn } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white border-b-2 border-neutral-300 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/catalog" className="flex items-center gap-3 group">
          <div className="bg-neutral-800 p-2 rounded rotate-3 group-hover:rotate-0 transition-transform">
            <BookOpen className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-serif font-bold text-neutral-900 tracking-tight">
              Relatos de Papel
            </h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-medium">
              Librería Boutique
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate('/cart')}
            className="relative p-2 text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            <ShoppingCart size={24} />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-neutral-800 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                {cartItemCount}
              </span>
            )}
          </button>

          <div className="h-8 w-px bg-neutral-200" />

          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <Link
                to="/profile"
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-neutral-900">{user?.fullName || user?.name}</p>
                  <p className="text-[10px] text-neutral-500">{user?.city}, {user?.countryName || user?.country}</p>
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-neutral-200 bg-neutral-50 flex items-center justify-center text-lg font-bold">
                  {user?.fullName?.charAt(0) || user?.name?.charAt(0) || 'U'}
                </div>
              </Link>

              <button
                onClick={() => { logout(); navigate('/'); }}
                className="p-2 text-neutral-400 hover:text-red-600 transition-colors"
                title="Cerrar Sesión"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="flex items-center gap-2 px-4 py-2 bg-neutral-800 text-white text-sm font-medium hover:bg-neutral-700 transition-colors"
            >
              <User size={18} />
              INICIAR SESIÓN
            </button>
          )}
        </div>
      </div>
    </header>
  );
}