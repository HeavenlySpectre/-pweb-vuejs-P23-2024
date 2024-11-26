<template>
  <div class="p-4">
    <div v-if="book" class="bg-white shadow-md rounded p-6">
      <h1 class="text-2xl font-bold mb-4">{{ book.title }}</h1>
      <p class="text-gray-700 mb-2">Penulis: {{ book.author }}</p>
      <p class="text-gray-700 mb-2">Kategori: {{ book.category }}</p>
      <p class="text-gray-700 mb-2">Status: {{ book.available ? 'Tersedia' : 'Dipinjam' }}</p>
    </div>
    <div v-else class="text-center text-gray-500">
      <p>Loading...</p>
    </div>
    <button @click="deleteBook" class="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700">
      Hapus Buku
    </button>
  </div>
</template>
  
  <script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import axios from 'axios';
  
  interface Book {
    id: number;
    title: string;
    author: string;
    category: string;
    available: boolean;
  }
  
  export default defineComponent({
    setup() {
      const route = useRoute();
      const router = useRouter();
      const book = ref<Book | null>(null);
  
      const fetchBook = async () => {
        try {
          const response = await axios.get(`http://localhost:4000/books/${route.params.id}`);
          book.value = response.data as Book;
        } catch (error) {
          console.error('Error fetching book:', error);
        }
      };
  
      const deleteBook = async () => {
        try {
          await axios.delete(`http://localhost:4000/books/${route.params.id}`);
          router.push('/books');
        } catch (error) {
          console.error('Error deleting book:', error);
        }
      };
  
      onMounted(fetchBook);
  
      return { book, deleteBook };
    },
  });
  </script>
