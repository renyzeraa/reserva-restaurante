import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/painel',
      name: 'painel',
      component: () => import('../views/PainelView.vue'),
      meta: {
        auth: true
      }
    },
    {
      path: '/',
      name: 'home',
      component: () => import('../views/ReservaView.vue'),
      meta: {
        auth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to?.meta?.auth) {
    const authStore = useAuthStore()
    // Isso aqui esta errado, deve ter uma rota na api para verificar o token de fato, mas vai ficar assim por enquanto
    const hasTokenUser = authStore.token && authStore.user
    if (hasTokenUser) {
      next()
    }
    else {
      next({ name: 'login' })
    }
  }
  else {
    next()
  }
})
export default router
