<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import apiService from '@/services/api.service';

const router = useRouter();
const loading = ref(false);
const error = ref<string | null>(null);

const bookData = ref({
  title: '',
  author: '',
  publisher: '',
  publishedDate: '',
  description: '',
  category: '',
  initialQty: 1,
  coverImage: ''
});

const submitForm = async () => {
  try {
    loading.value = true;
    error.value = null;
    
    await apiService.addBook({
      ...bookData.value,
      qty: bookData.value.initialQty
    });
    
    router.push('/books');
  } catch (err) {
    error.value = 'Gagal menambahkan buku';
    console.error('Error adding book:', err);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="container mx-auto p-4">
    <div class="max-w-2xl mx-auto">
      <h1 class="text-3xl font-bold mb-6">Tambah Buku Baru</h1>

      <form @submit.prevent="submitForm" class="card space-y-6">
        <!-- Error Alert -->
        <div v-if="error" class="bg-red-50 text-red-500 p-4 rounded-lg">
          {{ error }}
        </div>

        <!-- Form Fields -->
        <div class="space-y-4">
          <div>
            <label class="label">Judul Buku</label>
            <input 
              v-model="bookData.title"
              type="text"
              required
              class="input"
              placeholder="Masukkan judul buku"
            >
          </div>

          <div>
            <label class="label">Penulis</label>
            <input 
              v-model="bookData.author"
              type="text"
              required
              class="input"
              placeholder="Masukkan nama penulis"
            >
          </div>

          <div>
            <label class="label">Penerbit</label>
            <input 
              v-model="bookData.publisher"
              type="text"
              required
              class="input"
              placeholder="Masukkan nama penerbit"
            >
          </div>

          <div>
            <label class="label">Tanggal Terbit</label>
            <input 
              v-model="bookData.publishedDate"
              type="date"
              required
              class="input"
            >
          </div>

          <div>
            <label class="label">Kategori</label>
            <input 
              v-model="bookData.category"
              type="text"
              required
              class="input"
              placeholder="Masukkan kategori buku"
            >
          </div>

          <div>
            <label class="label">Jumlah Buku</label>
            <input 
              v-model.number="bookData.initialQty"
              type="number"
              required
              min="1"
              class="input"
            >
          </div>

          <div>
            <label class="label">URL Cover Buku (Opsional)</label>
            <input 
              v-model="bookData.coverImage"
              type="url"
              class="input"
              placeholder="Masukkan URL gambar cover buku"
            >
          </div>

          <div>
            <label class="label">Deskripsi</label>
            <textarea 
              v-model="bookData.description"
              required
              class="input h-32"
              placeholder="Masukkan deskripsi buku"
            ></textarea>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-end gap-4">
          <button 
            type="button" 
            @click="router.push('/books')"
            class="btn-secondary"
          >
            Batal
          </button>
          <button 
            type="submit"
            class="btn-primary"
            :disabled="loading"
          >
            {{ loading ? 'Menyimpan...' : 'Simpan Buku' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
