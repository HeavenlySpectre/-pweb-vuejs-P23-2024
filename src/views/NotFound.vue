<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
const goHome = () => router.push('/');
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-5">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-red-500 mb-4">404</h1>
      <h2 class="text-3xl font-semibold text-gray-800 mb-4">
        Halaman Tidak Ditemukan
      </h2>
      <p class="text-lg text-gray-600 mb-8 max-w-md mx-auto">
        Maaf, halaman yang Anda cari tidak tersedia atau mungkin telah dipindahkan.
      </p>
      <button 
        @click="goHome"
        class="px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
      >
        Kembali ke Beranda
      </button>
    </div>
  </div>
</template>
