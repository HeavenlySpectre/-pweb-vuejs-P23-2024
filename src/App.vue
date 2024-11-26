<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="flex flex-col md:flex-row relative">
    <aside class="bg-white shadow w-full md:w-60 h-auto md:h-screen p-4 pt-10 md:fixed">
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
    </aside>

    <main class="flex-1 container mx-auto px-6 py-8 md:ml-60">
      <RouterView />
    </main>
  </div>
</template>

<style>
@import './assets/main.css';
</style>
