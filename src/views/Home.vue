<template>
  <div class="home text-center mt-12 p-5">
    <h1 class="text-3xl font-bold">Selamat Datang di Katalog Perpustakaan</h1>
    <p class="mt-4 text-lg">Kelola koleksi buku Anda dengan mudah. Jelajahi, tambahkan, atau perbarui informasi buku di perpustakaan.</p>
    <div class="actions mt-8">
      <button @click="$router.push('/books')" class="mx-2 px-4 py-2 text-lg font-semibold text-white bg-blue-500 rounded hover:bg-blue-700 transition duration-300">Lihat Daftar Buku</button>
      <button @click="$router.push('/add-book')" class="mx-2 px-4 py-2 text-lg font-semibold text-white bg-blue-500 rounded hover:bg-blue-700 transition duration-300">Tambah Buku Baru</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Home',
});
</script>

<style scoped>
</style>
