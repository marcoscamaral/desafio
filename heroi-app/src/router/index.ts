import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import HeroPage from '../views//HeroPage.vue';
import KnightDetails from '../views//KnightDetails.vue';
import CreateKnight from '../views/CreateKnight.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/heroes', component: HeroPage },
  { path: '/knights/:id', component: KnightDetails, props: true },
  { path: '/create-knight', component: CreateKnight }, // Página de cadastro
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
