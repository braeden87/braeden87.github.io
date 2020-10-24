import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from "../views/About.vue"
import UserPage from "../views/UserPage.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/About',
    component: About
  },
  {
    path: '/Add&nbspUser',
    name: 'AddUser',
    component: UserPage
  }
]

const router = new VueRouter({
  routes
})

export default router
