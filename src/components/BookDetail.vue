<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import apiService from '@/services/api.service';

interface Book {
  _id: string;
  title: string;
  author: string;
  publisher: string;
  publishedDate: Date;
  description: string;
  category: string;
  qty: number;
  initialQty: number;
  coverImage?: string;
}

const route = useRoute();
const router = useRouter();
const book = ref<Book | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);
const showDeleteConfirm = ref(false);

const fetchBook = async () => {
  try {
    loading.value = true;
    const response = await apiService.getBook(route.params.id as string);
    book.value = response.data;
  } catch (err) {
    error.value = 'Gagal memuat detail buku';
    console.error('Error fetching book:', err);
  } finally {
    loading.value = false;
  }
};

const deleteBook = async () => {
  try {
    await apiService.deleteBook(route.params.id as string);
    router.push('/books');
  } catch (err) {
    error.value = 'Gagal menghapus buku';
    console.error('Error deleting book:', err);
  }
};

onMounted(fetchBook);
</script>

<template>
  <div class="container mx-auto p-4">
    <!-- Loading State -->
    <div v-if="loading" class="text-center py-8">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
      <p class="mt-4 text-gray-600">Memuat detail buku...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-8">
      <p class="text-red-500">{{ error }}</p>
      <button @click="fetchBook" class="mt-4 btn-secondary">
        Coba Lagi
      </button>
    </div>

    <!-- Book Details -->
    <div v-else-if="book" class="max-w-3xl mx-auto">
      <div class="card">
        <div class="flex justify-between items-start">
          <h1 class="text-3xl font-bold mb-4">{{ book.title }}</h1>
          <button @click="showDeleteConfirm = true" class="btn-danger">
            Hapus Buku
          </button>
        </div>

        <div class="grid md:grid-cols-2 gap-6">
          <!-- Book Cover -->
          <div v-if="book.coverImage" class="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
            <img :src="book.coverImage" :alt="book.title" class="w-full h-full object-cover">
          </div>

          <!-- Book Info -->
          <div class="space-y-4">
            <div>
              <h3 class="text-gray-500">Penulis</h3>
              <p class="font-medium">{{ book.author }}</p>
            </div>
            <div>
              <h3 class="text-gray-500">Penerbit</h3>
              <p class="font-medium">{{ book.publisher }}</p>
            </div>
            <div>
              <h3 class="text-gray-500">Tanggal Terbit</h3>
              <p class="font-medium">{{ new Date(book.publishedDate).toLocaleDateString('id-ID') }}</p>
            </div>
            <div>
              <h3 class="text-gray-500">Kategori</h3>
              <p class="font-medium">{{ book.category }}</p>
            </div>
            <div>
              <h3 class="text-gray-500">Stok</h3>
              <p class="font-medium">{{ book.qty }}/{{ book.initialQty }}</p>
            </div>
          </div>
        </div>

        <div class="mt-6">
          <h3 class="text-gray-500 mb-2">Deskripsi</h3>
          <p class="text-gray-700">{{ book.description }}</p>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteConfirm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 class="text-xl font-bold mb-4">Konfirmasi Penghapusan</h2>
        <p class="text-gray-600">Apakah Anda yakin ingin menghapus buku ini?</p>
        <div class="mt-6 flex justify-end gap-4">
          <button @click="showDeleteConfirm = false" class="btn-secondary">
            Batal
          </button>
          <button @click="deleteBook" class="btn-danger">
            Hapus
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
