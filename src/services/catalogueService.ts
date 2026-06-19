import api from './api';

export type Author = {
  author_id: number;
  name: string;
};

export type Book = {
  id: string;
  title: string;
  author: Author;
  price: number;
  type: string;
  stock: number;
  isbn: string;
  pages: number;
  description: string;
  coverImage: string;
  publicationDate: string;
  category: string;
  rating: number;
  visible: boolean;
};

export type BookFilters = {
  title?: string;
  author?: string;
  category?: string;
  isbn?: string;
  rating?: number;
  publicationDate?: string;
};

export type AIRecommendation = {
  title: string;
  author: string;
  genre: string;
  justification: string;
};

// ✅ Función para generar la URL de la portada
const getCoverUrl = (isbn: string): string => {
  return `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;
};

// ✅ Función para transformar un libro del backend al formato del frontend
const transformBook = (book: Book): Book => {
  return {
    ...book,
    coverImage: book.isbn ? getCoverUrl(book.isbn) : '/placeholder-book.jpg'
  };
};

export const catalogueService = {
  getBooks: async (filters?: BookFilters): Promise<Book[]> => {
    let url = '/catalogue-service/books';

    if (filters) {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, String(value));
        }
      });
      const queryString = params.toString();
      if (queryString) {
        url = `/catalogue-service/books?${queryString}`;
      }
    }

    console.log('📚 Fetching books from:', url);
    const response = await api.get(url);
    return response.data.map(transformBook);
  },

  getBookById: async (id: string): Promise<Book> => {
    const response = await api.get(`/catalogue-service/books/${id}`);
    return transformBook(response.data);
  },

  getAIRecommendations: async (genre: string = 'Terror'): Promise<AIRecommendation[]> => {
    const response = await api.get(`/catalogue-service/catalogue/ai/recommendations?genre=${genre}`);
    return response.data;
  },

  createBook: async (book: Omit<Book, 'id'>): Promise<Book> => {
    const response = await api.post('/catalogue-service/books', book);
    return transformBook(response.data);
  },

  updateBook: async (id: string, book: Partial<Book>): Promise<Book> => {
    const response = await api.put(`/catalogue-service/books/${id}`, book);
    return transformBook(response.data);
  },

  patchBook: async (id: string, book: Partial<Book>): Promise<Book> => {
    const response = await api.patch(`/catalogue-service/books/${id}`, book);
    return transformBook(response.data);
  },

  deleteBook: async (id: string): Promise<void> => {
    await api.delete(`/catalogue-service/books/${id}`);
  },
};