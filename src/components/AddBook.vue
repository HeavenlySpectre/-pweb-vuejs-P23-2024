<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
    <h1 class="text-2xl font-bold mb-6">Tambah Buku</h1>
    <form @submit.prevent="submitForm" class="space-y-4">
      <input v-model="title" placeholder="Judul Buku" required class="w-full p-2 border border-gray-300 rounded" />
      <input v-model="author" placeholder="Pengarang" required class="w-full p-2 border border-gray-300 rounded" />
      <input v-model="category" placeholder="Kategori" required class="w-full p-2 border border-gray-300 rounded" />
      <button type="submit" class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Tambah</button>
    </form>
  </div>
</template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import axios from 'axios';
  
  
  export default defineComponent({
    setup() {
      const title = ref('');
      const author = ref('');
      const category = ref('');
      const available = ref(true);
  
      const submitForm = async () => {
        try {
          const response = await axios.post('http://localhost:4000/books', {
            title: title.value,
            author: author.value,
            category: category.value,
            available: available.value
          });
          if (response.status === 201) {
            alert('Buku berhasil ditambahkan!');
          } else {
            alert('Gagal menambahkan buku.');
          }
        } catch (error) {
          console.error('Error adding book:', error);
        }
      };
  
      return { title, author, category, available, submitForm };
    },
  });
  </script>
