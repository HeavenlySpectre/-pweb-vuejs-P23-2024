<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'
import { onMounted, onUnmounted } from 'vue'

const showGuide = ref(false)
</script>

<template>
  <div class="flex flex-col md:flex-row relative">
    <aside class="bg-white shadow w-fit md:w-52 h-auto md:h-screen p-4 pt-10 md:fixed flex flex-col justify-between">
      <nav class="flex flex-col space-y-2 items-center md:items-start">
        <RouterLink 
          to="/" 
          class="px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          :class="{ 'font-bold text-blue-600': $route.path === '/' }"
        >
          Beranda
        </RouterLink>
        <RouterLink 
          to="/books" 
          class="px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          :class="{ 'font-bold text-blue-600': $route.path.startsWith('/books') }"
        >
          Daftar Buku
        </RouterLink>
        <RouterLink 
          to="/add-book" 
          class="px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          :class="{ 'font-bold text-blue-600': $route.path === '/add-book' }"
        >
          Tambah Buku
        </RouterLink>
      </nav>
      <button @click="showGuide = true" class="w-fit px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors mt-4 text-left"
        :class="{ 'font-bold text-blue-600': showGuide }">
        Panduan
      </button>
    </aside>

    <main class="flex-1 container mx-auto px-6 py-8 md:ml-60">
      <RouterView />
    </main>

    <div v-if="showGuide" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Panduan Pengguna</h2>
        <p class="text-lg text-gray-600 mb-4">
        Berikut adalah panduan singkat untuk menggunakan sistem manajemen buku:
        </p>
        <ul class="list-disc list-inside text-lg text-gray-600 mb-4">
          <li>Klik tombol "Lihat Daftar Buku" untuk melihat semua buku yang tersedia.</li>
          <li>Klik tombol "Tambah Buku Baru" untuk menambahkan buku baru ke dalam sistem.</li>
          <li>Gunakan navigasi di bagian kiri untuk berpindah antar halaman.</li>
          <li>Pastikan untuk mengisi semua informasi yang diperlukan saat menambahkan buku baru.</li>
        </ul>
        <button @click="showGuide = false" class="px-3 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<style>
@import './assets/main.css';
</style>
