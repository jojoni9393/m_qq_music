import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import RankingDetial from '../views/RankingDetial.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/ranking-detial',
    name: 'RankingDetial',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "ranking-detial" */ '../views/RankingDetial.vue'
      )
  }
]

const router = new VueRouter({
  routes
})

export default router
