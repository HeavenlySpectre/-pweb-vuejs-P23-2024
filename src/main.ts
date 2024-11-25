import { createApp } from 'vue';
import App from './App.vue';
import router from '@/routes/book.route';

createApp(App).use(router).mount('#app');