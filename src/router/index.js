import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/:pathMatch(.*)',
    redirect: { name: 'SignIn' }
  },
  {
    path: '/',
    name: 'SignIn',
    meta: {
      layout: 'empty'
    },
    component: () => import('@/views/SignIn.vue')
  },
  {
    path: '/todo',
    name: 'TodoList',
    meta: {
      layout: 'auth'
    },
    component: () => import('@/views/TodoView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
