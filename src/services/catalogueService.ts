import api from './api';

// ✅ Todos los tipos exportados con 'export type'
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

export const catalogueService = {
  getBooks: async (filters?: BookFilters): Promise<Book[]> => {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, String(value));
      });
    }
    const response = await api.get(`/catalogue-service/books?${params.toString()}`);
    return response.data;
  },

  getBookById: async (id: string): Promise<Book> => {
    const response = await api.get(`/catalogue-service/books/${id}`);
    return response.data;
  },

  getAIRecommendations: async (genre: string = 'Terror'): Promise<AIRecommendation[]> => {
    const response = await api.get(`/catalogue-service/catalogue/ai/recommendations?genre=${genre}`);
    return response.data;
  },

  createBook: async (book: Omit<Book, 'id'>): Promise<Book> => {
    const response = await api.post('/catalogue-service/books', book);
    return response.data;
  },

  updateBook: async (id: string, book: Partial<Book>): Promise<Book> => {
    const response = await api.put(`/catalogue-service/books/${id}`, book);
    return response.data;
  },

  patchBook: async (id: string, book: Partial<Book>): Promise<Book> => {
    const response = await api.patch(`/catalogue-service/books/${id}`, book);
    return response.data;
  },

  deleteBook: async (id: string): Promise<void> => {
    await api.delete(`/catalogue-service/books/${id}`);
  },
};