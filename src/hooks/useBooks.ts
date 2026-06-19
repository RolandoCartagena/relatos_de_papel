import { useState, useEffect } from 'react';
import { catalogueService, Book } from '../services/catalogueService';

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await catalogueService.getBooks();
      setBooks(data);
    } catch (err) {
      console.error('Error loading books:', err);
      setError('Error al cargar los libros. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await catalogueService.getBooks();
        if (!ignore) {
          setBooks(data);
        }
      } catch (err) {
        if (!ignore) {
          console.error('Error loading books:', err);
          setError('Error al cargar los libros. Por favor, intenta de nuevo.');
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
  }, []);

  return { books, loading, error, reload: loadBooks };
}