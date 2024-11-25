<template>
    <div>
      <h1>Tambah Buku</h1>
      <form @submit.prevent="submitForm">
        <input v-model="title" placeholder="Judul Buku" required />
        <input v-model="author" placeholder="Pengarang" required />
        <input v-model="category" placeholder="Kategori" required />
        <label>
          <input type="checkbox" v-model="available" /> Tersedia
        </label>
        <button type="submit">Tambah</button>
      </form>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import api from '@/services/api.service';
  
  export default defineComponent({
    setup() {
      const title = ref('');
      const author = ref('');
      const category = ref('');
      const available = ref(true);
  
      const submitForm = async () => {
        try {
          await api.addBook({ title: title.value, author: author.value, category: category.value, available: available.value });
          alert('Buku berhasil ditambahkan!');
        } catch (error) {
          console.error('Error adding book:', error);
        }
      };
  
      return { title, author, category, available, submitForm };
    },
  });
  </script>
  