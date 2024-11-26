<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateToBooks = () => router.push('/books');
const navigateToAddBook = () => router.push('/add-book');
</script>

<template>
  <div class="home min-h-screen flex flex-col items-center justify-center p-5">
    <div class="max-w-3xl text-center">
      <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
        Selamat Datang di Katalog Perpustakaan
      </h1>
      <p class="text-lg md:text-xl text-gray-600 mb-8">
        Kelola koleksi buku Anda dengan mudah. Jelajahi, tambahkan, atau perbarui informasi buku di perpustakaan.
      </p>
      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <button 
          @click="navigateToBooks"
          class="px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
        >
          Lihat Daftar Buku
        </button>
        <button 
          @click="navigateToAddBook"
          class="px-6 py-3 text-lg font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300"
        >
          Tambah Buku Baru
        </button>
      </div>
    </div>
  </div>
</template>
