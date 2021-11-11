import { createRouter, createWebHistory } from 'vue-router'
import Cookies from 'js-cookie'
import { Auth, Feed } from '../components/pages'

const routes = [
  {
    component: Auth,
    name: 'auth',
    path: '/auth'
  },
  {
    component: Feed,
    meta: {
      auth: true
    },
    name: 'feed',
    path: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    const token = Cookies.get('facebook:token')

    if (!token) next({ name: 'auth' })
    else next()
  } else {
    next()
  }
})

export default router
