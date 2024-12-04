<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import apiService from '@/services/api.service';
import { getImageUrl } from '@/utils/image'; // Import util function

interface Book {
  _id: string;
  title: string;
  author: string;
  publisher: string;
  publishedDate: string;
  description: string;
  coverImage?: string;
  category: string;
  qty: number;
  initialQty: number;
}

const route = useRoute();
const router = useRouter();
const book = ref<Book | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);
const showDeleteModal = ref(false);

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  img.src = '/default-book-cover.png';
};

const fetchBook = async () => {
  try {
    loading.value = true;
    const response = await apiService.getBook(route.params.id as string);
    book.value = response.data; // Hapus .data kedua
  } catch (err) {
    console.error('Error fetching book:', err);
    error.value = 'Gagal memuat detail buku';
  } finally {
    loading.value = false;
  }
};

const handleDelete = async () => {
  try {
    await apiService.deleteBook(route.params.id as string);
    router.push('/books');
  } catch (err) {
    console.error('Error deleting book:', err);
    error.value = 'Gagal menghapus buku';
  }
};

onMounted(fetchBook);
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center min-h-[400px]">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-12">
      <p class="text-red-500 mb-4">{{ error }}</p>
      <button 
        @click="fetchBook" 
        class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition duration-300"
      >
        Coba Lagi
      </button>
    </div>

    <!-- Book Detail -->
    <div v-else-if="book" class="max-w-4xl mx-auto overflow-auto">
      <div class="bg-white rounded-lg shadow-lg overflow-visible">
        <div class="md:flex flex-col md:flex-row">
          <!-- Book Cover -->
          <div class="hidden md:block md:w-1/3 w-full bg-slate-900">
            <div class="relative pb-[140%] md:pb-0 h-full flex items-center justify-center">
              <img 
                :src="getImageUrl(book.coverImage)"
                :alt="book.title"
                class="max-w-full max-h-full object-cover object-center"
                @error="handleImageError"
              >
            </div>
          </div>

          <!-- Book Info -->
          <div class="w-full md:w-2/3 p-6 flex flex-col justify-between">
            <div>
              <div class="flex justify-between items-start">
                <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ book.title }}</h1>
                <button 
                  @click="showDeleteModal = true"
                  class="text-red-500 hover:text-red-600"
                >
                  <span class="sr-only">Delete</span>
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>

              <div class="space-y-4">
                <div>
                  <h2 class="text-sm text-gray-500">Penulis</h2>
                  <p class="text-lg">{{ book.author }}</p>
                </div>

                <div>
                  <h2 class="text-sm text-gray-500">Penerbit</h2>
                  <p class="text-lg">{{ book.publisher }}</p>
                </div>

                <div>
                  <h2 class="text-sm text-gray-500">Tanggal Terbit</h2>
                  <p class="text-lg">{{ new Date(book.publishedDate).toLocaleDateString('id-ID') }}</p>
                </div>

                <div>
                  <h2 class="text-sm text-gray-500">Kategori</h2>
                  <span class="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {{ book.category }}
                  </span>
                </div>

                <div>
                  <h2 class="text-sm text-gray-500">Ketersediaan</h2>
                  <p class="text-lg">
                    <span 
                      :class="{
                        'text-green-600': book.qty > 0,
                        'text-red-600': book.qty === 0
                      }"
                    >
                      {{ book.qty }} / {{ book.initialQty }}
                    </span>
                    buku tersedia
                  </p>
                </div>

                <div>
                  <h2 class="text-sm text-gray-500">Deskripsi</h2>
                  <p class="text-gray-700 mt-2">{{ book.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg p-6 max-w-sm w-full">
        <h2 class="text-xl font-bold mb-4">Konfirmasi Penghapusan</h2>
        <p class="text-gray-600 mb-6">
          Apakah Anda yakin ingin menghapus buku "{{ book?.title }}"? 
          Tindakan ini tidak dapat dibatalkan.
        </p>
        <div class="flex justify-end space-x-4">
          <button 
            @click="showDeleteModal = false"
            class="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Batal
          </button>
          <button 
            @click="handleDelete"
            class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
