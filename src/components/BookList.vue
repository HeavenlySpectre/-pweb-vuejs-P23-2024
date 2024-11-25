<template>
    <div>
      <h1>Daftar Buku</h1>
      <button @click="$router.push('/add-book')">Tambah Buku</button>
      <ul v-if="books.length > 0">
        <li v-for="book in books" :key="book.id">
          <router-link :to="`/books/${book.id}`">{{ book.title }}</router-link> - {{ book.author }}
        </li>
      </ul>
      <p v-else>Tidak ada buku yang tersedia.</p>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import api from '@/services/api.service';
  
  export default defineComponent({
    setup() {
      const books = ref([]);
      const fetchBooks = async () => {
        try {
          const response = await api.getBooks();
          books.value = response.data;
        } catch (error) {
          console.error('Error fetching books:', error);
        }
      };
  
      onMounted(fetchBooks);
  
      return { books };
    },
  });
  </script>
  