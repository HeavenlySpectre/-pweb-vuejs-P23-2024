import type { AxiosInstance } from 'axios';
import axios from 'axios';

interface Book {
  _id: string;
  title: string;
  author: string;
  publishedDate: Date;
  publisher: string;
  description: string;
  coverImage: string;
  category: string;
  initialQty: number;
  qty: number;
}

interface ApiResponse<T> {
  status: 'success' | 'failed' | 'error';
  message: string;
  data: T;
}

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:4000',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Get all books
  async getBooks() {
    const response = await this.api.get<ApiResponse<Book[]>>('/book');
    return response.data;
  }

  // Get a single book
  async getBook(id: string) {
    const response = await this.api.get<ApiResponse<Book>>(`/book/${id}`);
    return response.data;
  }

  // Add a new book
  async addBook(book: Omit<Book, '_id'>) {
    const response = await this.api.post<ApiResponse<Book>>('/book', book);
    return response.data;
  }

  // Delete a book
  async deleteBook(id: string) {
    const response = await this.api.delete<ApiResponse<null>>(`/book/${id}`);
    return response.data;
  }
}

export default new ApiService();
