<script setup lang="ts">
import { useRouter } from 'vue-router';

// Inisialisasi router
const router = useRouter();

// Fungsi navigasi
const navigateToBooks = () => {
  router.push('/books'); // Pastikan '/books' adalah route yang benar
};

const navigateToAddBook = () => {
  router.push('/add-book'); // Pastikan '/add-book' adalah route yang benar
};
</script>

<template>
    <div class="home flex items-center justify-center mt-48 pb-5 overflow-hidden">
    <div class="max-w-3xl text-center mx-auto my-auto">
      <h1 class="text-4xl font-bold text-gray-800 mb-6">
        Sistem Manajemen Buku
      </h1>
      <p class="text-lg text-gray-600 mb-8">
        Halo! Selamat datang di sistem manajemen buku.
      </p>
      <div class="flex justify-center gap-4">
        <button 
          @click="navigateToBooks"
          class="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Lihat Daftar Buku
        </button>
        <button 
          @click="navigateToAddBook"
          class="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Tambah Buku Baru
        </button>
      </div>
    </div>
  </div>
</template>

<style>
body {
  background-color: #f9fafb;
  overflow: hidden;
}
</style>
