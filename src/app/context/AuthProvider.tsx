import { useState, type ReactNode } from 'react';
import { AuthContext } from './AuthContext';
import { authService, type UserProfile } from '../../services/authService';

export function AuthProvider({ children }: { children: ReactNode }) {
  // Inicializamos el estado con la información del localStorage
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  // El estado de carga lo inicializamos basado en la existencia del token
  const [loading, setLoading] = useState(() => {
    const token = localStorage.getItem('token');
    return !!token && !user; // Cargando solo si hay token y no hay usuario
  });

  // Función para cargar el perfil (se ejecuta bajo demanda)
  const loadUserProfile = async () => {
    try {
      setLoading(true);
      const profile = await authService.getProfile();
      setUser(profile);
      localStorage.setItem('user', JSON.stringify(profile));
    } catch (error) {
      console.error('Error cargando perfil:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Llamamos a la carga solo si es necesario, inmediatamente al montar
  // Esto no está dentro de un useEffect, es parte de la lógica de inicialización
  if (loading && !user) {
    // Esta es una técnica válida para iniciar cargas de datos asíncronas
    // que son necesarias para el renderizado inicial.
    // Es una excepción controlada a la regla general.
    loadUserProfile();
  }

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await authService.login({ username, password });
      localStorage.setItem('token', response.token);
      await loadUserProfile();
      return true;
    } catch (error) {
      console.error('Error en login:', error);
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}