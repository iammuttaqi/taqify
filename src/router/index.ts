import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const setAccessToken = () => {
  const url = window.location.href
  const parsedUrl = new URL(url)
  const hash = parsedUrl.hash.substring(1)
  const params = new URLSearchParams(hash)

  const accessToken = params.get('access_token')
  if (accessToken) {
    localStorage.setItem('access_token', accessToken)
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/callback',
      name: 'callback',
      beforeEnter: (to, from, next) => {
        setAccessToken()
        next({ name: 'home' })
        return false
      },
      component: () => import('../views/Callback/Index.vue')
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/artists',
      name: 'artists',
      component: () => import('../views/Artists/Index.vue')
    },
    {
      path: '/songs',
      name: 'songs',
      component: () => import('../views/Songs/Index.vue')
    },
    {
      path: '/albums',
      name: 'albums',
      component: () => import('../views/Albums/Index.vue')
    },
    {
      path: '/genres',
      name: 'genres',
      component: () => import('../views/Genres/Index.vue')
    },
    {
      path: '/recents',
      name: 'recents',
      component: () => import('../views/Recents/Index.vue')
    },
    {
      path: '/wrapped',
      name: 'wrapped',
      component: () => import('../views/Wrapped/Index.vue')
    }
  ]
})

export default router
