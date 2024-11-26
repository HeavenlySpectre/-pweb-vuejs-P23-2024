import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import BookList from '../components/BookList.vue';
import BookDetail from '../components/BookDetail.vue';
import AddBook from '../components/AddBook.vue';
import NotFound from '../views/NotFound.vue';

const routes: Array<RouteRecordRaw> = [
  { 
    path: '/', 
    name: 'home',
    component: Home 
  },
  { 
    path: '/books', 
    name: 'books',
    component: BookList 
  },
  { 
    path: '/books/:id', 
    name: 'book-detail',
    component: BookDetail,
    props: true 
  },
  { 
    path: '/add-book', 
    name: 'add-book',
    component: AddBook 
  },
  { 
    path: '/:pathMatch(.*)*', 
    name: 'not-found',
    component: NotFound 
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
