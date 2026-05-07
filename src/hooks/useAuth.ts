import { useContext } from 'react'; // Importar la herramienta de React
import { AuthContext } from '../app/context/AuthContext'; // Importar el contexto que creaste

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};