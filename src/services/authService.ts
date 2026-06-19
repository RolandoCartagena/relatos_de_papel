import api from './api';

// ✅ Definir tipos específicos para órdenes
export type OrderItem = {
  bookId: string;
  title: string;
  quantity: number;
  price: number;
};

export type Order = {
  id: string;
  date: string;
  total: number;
  items: OrderItem[];
  status: 'entregado' | 'en camino' | 'procesando';
};

export type LoginCredentials = {
  username: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};

export type UserProfile = {
  id: string;
  fullName: string;
  name?: string;        // ✅ Opcional para compatibilidad con mock
  email: string;
  address: string;
  city: string;
  countryName: string;
  country?: string;     // ✅ Opcional para compatibilidad con mock
  memberSince: string;
  roles: string[];
  avatar?: string;
  orders?: Order[];     // ✅ Usar tipo Order en lugar de any[]
};

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await api.post('/users-service/auth/login', credentials);
    return response.data;
  },

  getProfile: async (): Promise<UserProfile> => {
    const response = await api.post(
      '/users-service/users/profile',
      {},
      { headers: { 'X-HTTP-Method-Override': 'GET' } }
    );
    return response.data;
  },

  validateToken: async (token: string): Promise<string> => {
    const response = await api.get(`/users-service/auth/validate?token=${token}`);
    return response.data;
  },

  renewToken: async (token: string): Promise<void> => {
    await api.post(`/users-service/auth/renew?token=${token}`);
  },
};