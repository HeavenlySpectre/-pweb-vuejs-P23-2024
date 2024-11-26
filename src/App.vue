<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="mx-5 flex flex-col items-center lg:flex-row lg:items-start lg:pr-8 lg:max-h-screen">

    <div class="flex flex-col items-center lg:flex-row lg:items-start lg:flex-wrap">

      <nav class="flex-auto flex-nowrap w-full text-center mt-8 lg:text-center lg:mt-4 lg:ml-[-1rem] lg:text-base bg">
        <RouterLink to="/" class="text-center m-5 px-4 hover:bg-transparent">Home</RouterLink>
        <RouterLink to="/books" class="text-center m-5 px-4 hover:bg-transparent">Daftar Buku</RouterLink>
        <RouterLink to="/add-book" class="text-center m-5 px-4 hover:bg-transparent">Tambah Buku</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
</style>

