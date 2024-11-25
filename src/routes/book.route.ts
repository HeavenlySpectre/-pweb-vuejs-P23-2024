import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import BookList from '@/components/BookList.vue';
import BookDetail from '@/components/BookDetail.vue';
import AddBook from '@/components/AddBook.vue';
import NotFound from '@/views/NotFound.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/books', component: BookList },
  { path: '/books/:id', component: BookDetail },
  { path: '/add-book', component: AddBook },
  { path: '/:pathMatch(.*)*', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
