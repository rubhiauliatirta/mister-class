import Vue from 'vue'
import VueRouter from 'vue-router'
import { Home, Auth, Course, PrivacyPolicy } from "../views"

Vue.use(VueRouter)

const checkAuth = (to, from, next) => {
  if (localStorage.getItem("access_token")) {
    next()
  }
  else {
    next("/auth")
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: checkAuth
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth
  },
  {
    path: '/privacy-policy',
    name: 'PrivacyPolicy',
    component: PrivacyPolicy
  },
  {
    path: '/course/:courseId',
    name: 'Course',
    component: Course,
    beforeEnter: checkAuth
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
