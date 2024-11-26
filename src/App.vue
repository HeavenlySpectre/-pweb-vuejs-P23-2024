<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="flex flex-col items-center lg:flex-row lg:items-start lg:pr-8 lg:max-h-screen">

    <div class="flex flex-col items-center lg:flex-row lg:items-start lg:flex-wrap">

      <nav class="w-full text-center mt-8 lg:text-left lg:mt-4 lg:ml-[-1rem] lg:text-base">
        <RouterLink to="/" class="inline-block px-4 border-l border-gray-300 first:border-0 hover:bg-transparent">Home</RouterLink>
        <RouterLink to="/about" class="inline-block px-4 border-l border-gray-300 first:border-0 hover:bg-transparent">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
/* No additional styles needed as Tailwind CSS is used */
</style>

