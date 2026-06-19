import { useState, useEffect } from 'react';
import { catalogueService, Book } from '../services/catalogueService';

export function useBook(id: string | undefined) {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadBook = async (bookId: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await catalogueService.getBookById(bookId);
      setBook(data);
    } catch (err) {
      console.error('Error loading book:', err);
      setError('Error al cargar el libro. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await catalogueService.getBookById(id);
        if (!ignore) {
          setBook(data);
        }
      } catch (err) {
        if (!ignore) {
          console.error('Error loading book:', err);
          setError('Error al cargar el libro. Por favor, intenta de nuevo.');
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
  }, [id]);

  return { book, loading, error, reload: loadBook };
}