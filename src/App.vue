<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="bg-white shadow">
    <div class="container mx-auto px-4">
      <nav class="flex justify-center py-4 space-x-4">
        <RouterLink 
          to="/" 
          class="px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          :class="{ 'font-bold text-blue-600': $route.path === '/' }"
        >
          Home
        </RouterLink>
        <RouterLink 
          to="/books" 
          class="px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          :class="{ 'font-bold text-blue-600': $route.path.startsWith('/books') }"
        >
          Daftar Buku
        </RouterLink>
        <RouterLink 
          to="/add-book" 
          class="px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          :class="{ 'font-bold text-blue-600': $route.path === '/add-book' }"
        >
          Tambah Buku
        </RouterLink>
      </nav>
    </div>
  </header>

  <main class="container mx-auto px-4 py-8">
    <RouterView />
  </main>
</template>

<style>
@import './assets/main.css';
</style>
