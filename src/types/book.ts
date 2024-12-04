export interface Book {
    _id: string;
    title: string;
    author: string;
    publisher: string;
    publishedDate: string;
    description: string;
    coverImage?: string;
    category: string;
    qty: number;
    initialQty: number;
  }
  