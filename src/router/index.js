import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LazyImagem from '../views/LazyImagemView.vue'
import Imagem from '../views/ImageView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/lazyimagem',
      name: 'LazyImagem',
      component: LazyImagem
    },
    {
      path: '/imagem',
      name: 'Imagem',
      component: Imagem
    },
  ]
})

export default router
