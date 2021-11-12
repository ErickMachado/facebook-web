import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Cookies from 'js-cookie'
import { Auth, Feed, NotFound } from '../components/pages'

const routes: RouteRecordRaw[] = [
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
  },
  {
    component: NotFound,
    name: 'not found',
    path: '/:pathMatch(.*)*'
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
