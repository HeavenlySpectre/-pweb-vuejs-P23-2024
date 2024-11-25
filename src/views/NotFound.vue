<template>
    <div class="not-found text-center mt-24">
        <h1 class="text-4xl text-red-500">404 - Halaman Tidak Ditemukan</h1>
        <p class="text-lg text-gray-700 mt-4">Maaf, halaman yang Anda cari tidak tersedia atau mungkin telah dipindahkan.</p>
        <button @click="goHome" class="mt-6 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 transition duration-300 ease-in-out">Kembali ke Beranda</button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'NotFound',
    setup() {
        const router = useRouter();

        const goHome = () => {
            router.push('/');
        };

        return { goHome };
    },
});
</script>

<style scoped>
.not-found {
    text-align: center;
    margin-top: 100px;
}
</style>
