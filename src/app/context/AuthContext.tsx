import { createContext } from 'react';
import type { UserProfile } from '../data/userMocks';

interface AuthContextType {
  user: UserProfile | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

// Exportamos solo el contexto aquí
export const AuthContext = createContext<AuthContextType | undefined>(undefined);