import Vue from 'vue'
import VueRouter from 'vue-router'
import goTo from 'vuetify/es5/services/goto'
import Layout from '../views/layout/Index.vue'
import SignInLayout from '../views/auth/Index.vue'

Vue.use(VueRouter)
const routes = [
  {
    path: '/dashboard',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        meta: {
          name: 'Dashboard',
          title: 'SystemOverview'
        },
        component: () => import('../views/app/dashboard/Index.vue')
      },
      {
        path: '/article',
        name: 'Article',
        meta: {
          name: 'Article',
          title: 'ArticleManagement'
        },
        component: () => import('../views/app/article/Index.vue')
      },
      {
        path: '/markdown',
        name: 'Markdown',
        meta: {
          name: 'Markdown',
          title: 'Markdown'
        },
        component: () => import('../views/app/Markdown.vue')
      },
      {
        path: '/demo',
        name: 'Demo',
        meta: {
          name: 'Demo',
          title: 'Demo'
        },
        component: () => import('../views/app/demo/Index.vue')
      }
    ]
  },
  {
    path: '/',
    name: 'SignInLayout',
    component: SignInLayout,
    redirect: '/signin',
    children: [
      {
        path: 'signin',
        name: 'SignIn',
        meta: {
          name: 'SignIn',
          title: 'SignIn'
        },
        component: () => import('../views/auth/core/SignIn.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior: (to, from, savedPosition) => {
    let scrollTo = 0
    if (to.hash) {
      scrollTo = to.hash
    } else if (savedPosition) {
      scrollTo = savedPosition.y
    }
    return goTo(scrollTo, { duration: 1000 })
  }
})

export default router
