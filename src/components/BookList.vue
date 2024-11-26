<template>
  <div class="text-center container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Daftar Buku</h1>
    <ul v-if="books.length > 0" class="list-disc pl-5">
      <li v-for="book in books" :key="book.id" class="mb-2">
        <router-link :to="`/books/${book.id}`" class="text-blue-500 hover:underline">{{ book.title }}</router-link> - {{ book.author }}
      </li>
    </ul>
    <p v-else class="m-5 text-gray-500">Tidak ada buku yang tersedia.</p>
    <button class="bg-blue-500 text-white px-4 py-2 rounded mb-4" @click="$router.push('/add-book')">Tambah Buku</button>
  </div>
</template>
  
  <script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import axios from 'axios';

  interface Book {
    id: number;
    title: string;
    author: string;
  }
  
  export default defineComponent({
    setup() {
      const books = ref<Book[]>([]);
      const fetchBooks = async () => {
        try {
          const response = await axios.get('http://localhost:4000/books');
          books.value = response.data as Book[];
        } catch (error) {
          console.error('Error fetching books:', error);
        }
      };
  
      onMounted(fetchBooks);
  
      return { books };
    },
  });
  </script>
