import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import { LogIn, AlertCircle, Loader2 } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/catalog';

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError(null);
  setLoading(true);

  try {
    console.log('📡 Intentando login...');
    const success = await login(username, password);
    console.log('✅ Login resultado:', success);
    
    if (success) {
      console.log('🚀 Redirigiendo a:', from);
      navigate(from, { replace: true });
    } else {
      setError('Credenciales incorrectas. Por favor, intenta de nuevo.');
    }
  } catch (err) {
    console.error('❌ Error en handleSubmit:', err);
    setError('Error al iniciar sesión. Por favor, intenta de nuevo.');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-neutral-900">Relatos de Papel</h1>
          <p className="text-neutral-600 mt-2">Inicia sesión para gestionar tus pedidos</p>
        </div>

        <div className="bg-white border-2 border-neutral-300 p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border-2 border-red-200 p-4 flex items-center gap-3 text-red-800">
                <AlertCircle size={20} />
                <p className="text-sm">{error}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Usuario
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="rolando.cartagena"
                className="w-full px-4 py-3 border-2 border-neutral-200 focus:border-neutral-800 outline-none transition-colors"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 border-2 border-neutral-200 focus:border-neutral-800 outline-none transition-colors"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-neutral-800 text-white py-4 border-2 border-neutral-900 hover:bg-neutral-700 transition-colors flex items-center justify-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  INICIANDO SESIÓN...
                </>
              ) : (
                <>
                  <LogIn size={20} />
                  ENTRAR A MI CUENTA
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-neutral-100">
            <p className="text-xs text-neutral-500 font-medium mb-2 text-center uppercase tracking-wider">
              Usuarios de prueba:
            </p>
            <div className="text-xs text-neutral-400 space-y-1">
              <p>👤 <strong>Rolando:</strong> rolando.cartagena / password123</p>
              <p>👤 <strong>Rocío:</strong> rocio.poma / password456</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}