import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import { LogIn, AlertCircle } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Intentamos obtener la página de la que venía el usuario (para redirigir tras login)
  const from = location.state?.from?.pathname || "/catalog";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);

    const success = login(email, password);

    if (success) {
      // Si el login es correcto, redirigimos a donde el usuario quería ir
      navigate(from, { replace: true });
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo / Título */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-neutral-900">Relatos de Papel</h1>
          <p className="text-neutral-600 mt-2">Inicia sesión para gestionar tus pedidos</p>
        </div>

        <div className="bg-white border-2 border-neutral-300 p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border-2 border-red-200 p-4 flex items-center gap-3 text-red-800">
                <AlertCircle size={20} />
                <p className="text-sm">Credenciales incorrectas. Inténtalo de nuevo.</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Correo Electrónico
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@relatos.com"
                className="w-full px-4 py-3 border-2 border-neutral-200 focus:border-neutral-800 outline-none transition-colors"
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
              />
            </div>

            <button
              type="submit"
              className="w-full bg-neutral-800 text-white py-4 border-2 border-neutral-900 hover:bg-neutral-700 transition-colors flex items-center justify-center gap-2 font-medium"
            >
              <LogIn size={20} />
              ENTRAR A MI CUENTA
            </button>
          </form>

          {/* Ayuda para pruebas (borrar antes de la entrega final si se desea) */}
          <div className="mt-8 pt-6 border-t border-neutral-100">
            <p className="text-xs text-neutral-500 font-medium mb-2 text-center uppercase tracking-wider">
              Cuentas de prueba:
            </p>
            <div className="text-xs text-neutral-400 space-y-1">
              <p>👤 <strong>Rolando:</strong> rolando@relatos.com / password123</p>
              <p>👤 <strong>Rocío:</strong> rocio@relatos.com / password456</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}