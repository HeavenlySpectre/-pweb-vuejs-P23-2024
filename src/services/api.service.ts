import type { AxiosInstance, AxiosError } from 'axios';
import axios from 'axios';
import type { Book, ApiResponse } from '../models/types';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:4000',
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });

    this.api.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.code === 'ECONNREFUSED') {
          console.error('Server is not running. Please start the backend server.');
        }
        return Promise.reject(error);
      }
    );
  }

  async getBooks() {
    try {
      const response = await this.api.get<ApiResponse<Book[]>>('/book');
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError);
      throw error;
    }
  }

  async getBook(id: string) {
    try {
      const response = await this.api.get<ApiResponse<Book>>(`/book/${id}`);
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError);
      throw error;
    }
  }

  async addBook(formData: FormData) {
    try {
      const response = await this.api.post<ApiResponse<Book>>('/book', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError);
      throw error;
    }
  }

  async updateBook(id: string, formData: FormData) {
    try {
      const response = await this.api.put<ApiResponse<Book>>(`/book/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError);
      throw error;
    }
  }

  async deleteBook(id: string) {
    try {
      const response = await this.api.delete<ApiResponse<null>>(`/book/${id}`);
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError);
      throw error;
    }
  }

  async updateBookCover(id: string, formData: FormData) {
    try {
      const response = await this.api.patch<ApiResponse<Book>>(`/book/${id}/cover`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError);
      throw error;
    }
  }

  async borrowBook(id: string) {
    try {
      const response = await this.api.post<ApiResponse<{ currentQty: number }>>(`/mechanism/borrow/${id}`);
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError);
      throw error;
    }
  }

  async returnBook(id: string) {
    try {
      const response = await this.api.post<ApiResponse<{ currentQty: number }>>(`/mechanism/return/${id}`);
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError);
      throw error;
    }
  }

  private handleError(error: AxiosError) {
    if (error.code === 'ECONNREFUSED') {
      console.error('Cannot connect to the server. Please make sure the backend is running.');
    } else if (error.response) {
      console.error('Server responded with error:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
  }
}

export default new ApiService();
