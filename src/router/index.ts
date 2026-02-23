import { createRouter, createWebHistory } from 'vue-router'
import IntuitionView from '@/views/IntuitionView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: IntuitionView
    }
  ]
})

export default router
