export interface Book {
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
  
  export interface ApiResponse<T> {
    status: 'success' | 'failed' | 'error';
    message: string;
    data: T;
  }
  