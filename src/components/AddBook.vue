<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import apiService from '@/services/api.service';

const router = useRouter();
const loading = ref(false);
const error = ref<string | null>(null);
const imageFile = ref<File | null>(null);
const imagePreview = ref<string | null>(null);

const bookData = ref({
  title: '',
  author: '',
  publisher: '',
  publishedDate: '',
  description: '',
  category: '',
  initialQty: 1
});

const handleImageChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    
    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      error.value = 'Ukuran file terlalu besar. Maksimal 5MB.';
      return;
    }

    // Validate file type
    if (!file.type.match('image.*')) {
      error.value = 'File harus berupa gambar.';
      return;
    }

    imageFile.value = file;

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

const submitForm = async () => {
  try {
    if (!imageFile.value) {
      error.value = 'Harap pilih gambar cover buku.';
      return;
    }

    loading.value = true;
    error.value = null;

    const formData = new FormData();
    formData.append('coverImage', imageFile.value);
    
    // Append other book data
    Object.entries(bookData.value).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });

    await apiService.addBook(formData);
    router.push('/books');
  } catch (err) {
    error.value = 'Gagal menambahkan buku';
    console.error('Error adding book:', err);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="container mx-auto p-2">
    <div class="max-w-2xl mx-auto">
      <h1 class="text-2xl font-bold mb-4">Tambah Buku Baru</h1>

      <form @submit.prevent="submitForm" class="bg-white rounded-lg shadow-md p-4">
        <!-- Error Alert -->
        <div v-if="error" class="mb-4 bg-red-50 text-red-500 p-2 rounded-lg">
          {{ error }}
        </div>

        <!-- Image Upload -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Cover Buku <span class="text-red-500">*</span>
          </label>
          <div class="flex items-center space-x-2">
            <div class="w-24 h-32 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
              <img 
                v-if="imagePreview"
                :src="imagePreview"
                alt="Book cover preview"
                class="w-full h-full object-cover"
              >
              <span v-else class="text-gray-400 text-sm text-center px-2">
                Pilih gambar cover
              </span>
            </div>
            <div class="flex-1">
              <input 
                type="file"
                accept="image/*"
                class="w-full"
                @change="handleImageChange"
                required
              >
              <p class="mt-1 text-xs text-gray-500">
                PNG, JPG, atau WEBP (max. 5MB)
              </p>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <!-- Book Title -->
          <div class="mb-3">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Judul Buku <span class="text-red-500">*</span>
            </label>
            <input 
              v-model="bookData.title"
              type="text"
              required
              class="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan judul buku"
            >
          </div>

          <!-- Author -->
          <div class="mb-3">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Penulis <span class="text-red-500">*</span>
            </label>
            <input 
              v-model="bookData.author"
              type="text"
              required
              class="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan nama penulis"
            >
          </div>

          <!-- Publisher -->
          <div class="mb-3">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Penerbit <span class="text-red-500">*</span>
            </label>
            <input 
              v-model="bookData.publisher"
              type="text"
              required
              class="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan nama penerbit"
            >
          </div>

          <!-- Published Date -->
          <div class="mb-3">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Tanggal Terbit <span class="text-red-500">*</span>
            </label>
            <input 
              v-model="bookData.publishedDate"
              type="date"
              required
              class="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
          </div>

          <!-- Category -->
          <div class="mb-3">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Kategori <span class="text-red-500">*</span>
            </label>
            <input 
              v-model="bookData.category"
              type="text"
              required
              class="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan kategori buku"
            >
          </div>

          <!-- Initial Quantity -->
          <div class="mb-3">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Jumlah Buku <span class="text-red-500">*</span>
            </label>
            <input 
              v-model.number="bookData.initialQty"
              type="number"
              required
              min="1"
              class="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
          </div>
        </div>

        <!-- Description -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Deskripsi <span class="text-red-500">*</span>
          </label>
          <textarea 
            v-model="bookData.description"
            required
            rows="3"
            class="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Masukkan deskripsi buku"
          ></textarea>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-end gap-2">
          <button 
            type="button"
            @click="router.push('/books')"
            class="px-3 py-1 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
            :disabled="loading"
          >
            Batal
          </button>
          <button 
            type="submit"
            class="px-3 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            :disabled="loading"
          >
            {{ loading ? 'Menyimpan...' : 'Simpan Buku' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
