<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="flex flex-col items-center lg:flex-row lg:items-start lg:pr-8 lg:max-h-screen">
    <img alt="Vue logo" class="block mx-auto mb-8 lg:mb-0 lg:mr-8" src="@/assets/logo.svg" width="125" height="125" />

    <div class="flex flex-col items-center lg:flex-row lg:items-start lg:flex-wrap">
      <HelloWorld msg="You did it!" />

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
