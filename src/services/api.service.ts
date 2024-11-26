import axios from 'axios';

// Base URL of your REST API
const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api', // Replace with your API's base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Export functions for making requests
export default {
  // Get all books
  getBooks() {
    return apiClient.get('/books'); // Adjust the endpoint based on your API
  },

  // Get a single book by ID
  getBook(id: number) {
    return apiClient.get(`/books/${id}`);
  },

  // Add a new book
  addBook(book: { title: string; author: string; category: string; available: boolean }) {
    return apiClient.post('/books', book);
  },

  // Delete a book by ID
  deleteBook(id: number) {
    return apiClient.delete(`/books/${id}`);
  },
};
