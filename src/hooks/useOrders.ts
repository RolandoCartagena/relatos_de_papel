import { useState, useEffect } from 'react';
import { orderService, Order } from '../services/orderService';

export function useOrders(userId: string | undefined) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadOrders = async () => {
    if (!userId) return;
    try {
      setLoading(true);
      setError(null);
      const data = await orderService.getOrdersByUser(userId);
      setOrders(data);
    } catch (err) {
      console.error('Error loading orders:', err);
      setError('Error al cargar los pedidos. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      if (!userId) return;
      try {
        setLoading(true);
        const data = await orderService.getOrdersByUser(userId);
        if (!ignore) {
          setOrders(data);
        }
      } catch (err) {
        if (!ignore) {
          console.error('Error loading orders:', err);
          setError('Error al cargar los pedidos. Por favor, intenta de nuevo.');
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      ignore = true;
    };
  }, [userId]);

  return { orders, loading, error, reload: loadOrders };
}