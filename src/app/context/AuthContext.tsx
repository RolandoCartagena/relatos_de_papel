import { createContext } from 'react';
import type { UserProfile } from '../../services/authService';

interface AuthContextType {
  user: UserProfile | null;
  isLoggedIn: boolean;
  loading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// ✅ Solo exportamos el contexto, sin hooks
export const AuthContext = createContext<AuthContextType | undefined>(undefined);