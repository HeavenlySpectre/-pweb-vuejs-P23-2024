<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import apiService from '@/services/api.service';

interface Book {
  _id: string;
  title: string;
  author: string;
  publisher: string;
  qty: number;
  category: string;
  coverImage?: string;
}

const books = ref<Book[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const router = useRouter();

const fetchBooks = async () => {
  try {
    loading.value = true;
    const response = await apiService.getBooks();
    books.value = response.data;
  } catch (err) {
    error.value = 'Gagal memuat daftar buku';
    console.error('Error fetching books:', err);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchBooks);
</script>

<template>
  <div class="container mx-auto p-4">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">Daftar Buku</h1>
      <button 
        @click="$router.push('/add-book')"
        class="flex items-center bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        >Tambah Buku
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-8">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
      <p class="mt-4 text-gray-600">Memuat daftar buku...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-8">
      <p class="text-red-500">{{ error }}</p>
      <button @click="fetchBooks" class="mt-4 btn-secondary">
        Coba Lagi
      </button>
    </div>

    <!-- Books List -->
    <div v-else-if="books.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="book in books" :key="book._id" class="bg-white rounded-lg shadow-md overflow-hidden">
        <!-- Book Cover Image -->
        <div class="aspect-w-3 aspect-h-4">
          <img 
            :src="book.coverImage || '/default-book-cover.png'"
            :alt="book.title"
            class="w-full h-full object-cover"
          >
        </div>
        
        <!-- Book Info -->
        <div class="p-4">
          <h3 class="text-xl font-semibold mb-2">{{ book.title }}</h3>
          <p class="text-gray-600">{{ book.author }}</p>
          <p class="text-gray-500">{{ book.publisher }}</p>
          <div class="mt-4 flex justify-between items-center">
            <span class="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
              {{ book.category }}
            </span>
            <span :class="book.qty > 0 ? 'text-green-600' : 'text-red-600'">
              {{ book.qty > 0 ? 'Tersedia' : 'Tidak Tersedia' }}
            </span>
          </div>
          <router-link 
            :to="`/books/${book._id}`"
            class="mt-4 block text-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Detail
          </router-link>
        </div>
      </div>
    </div>
    <!-- Empty State -->
    <div v-else class="text-center py-8">
      <p class="text-gray-500">Tidak ada buku yang tersedia.</p>
      <button 
        @click="$router.push('/add-book')"
        class="mt-4 btn-primary"
      >
        Tambah Buku Baru
        
      </button>
    </div>
    
  </div>
</template>
