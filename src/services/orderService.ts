import api from './api';

export type Order = {
  id: number;
  userId: string;
  userEmail?: string;  // ✅ Agregar email
  bookId: number;
  totalPaid: number;
  orderDate: string;
};

export type CreateOrderRequest = {
  userId: string;
  userEmail?: string;  // ✅ Agregar email
  bookId: number;
  totalPaid: number;
};

export const orderService = {
  getOrdersByUser: async (userId: string): Promise<Order[]> => {
    const response = await api.get(`/orders-service/orders/user?userId=${userId}`);
    return response.data;
  },

  getOrderById: async (id: string): Promise<Order> => {
    const response = await api.get(`/orders-service/orders/${id}`);
    return response.data;
  },

  createOrder: async (order: CreateOrderRequest): Promise<Order> => {
    const response = await api.post('/orders-service/orders', order);
    return response.data;
  },
};