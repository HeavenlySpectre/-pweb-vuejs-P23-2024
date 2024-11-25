<template>
    <div>
      <h1>{{ book.title }}</h1>
      <p>Penulis: {{ book.author }}</p>
      <p>Kategori: {{ book.category }}</p>
      <p>Status: {{ book.available ? 'Tersedia' : 'Dipinjam' }}</p>
      <button @click="deleteBook">Hapus Buku</button>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import api from '@/services/api.service';
  
  export default defineComponent({
    setup() {
      const route = useRoute();
      const router = useRouter();
      const book = ref(null);
  
      const fetchBook = async () => {
        try {
          const response = await api.getBook(Number(route.params.id));
          book.value = response.data;
        } catch (error) {
          console.error('Error fetching book:', error);
        }
      };
  
      const deleteBook = async () => {
        try {
          await api.deleteBook(Number(route.params.id));
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
  