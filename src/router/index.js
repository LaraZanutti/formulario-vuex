import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'cargarOpinion',
    component: () => import('@/views/CargarOpinion.vue')
  },
  {
    path: '/opiniones',
    name: 'opinionesTabla',
    component: () => import('@/views/OpinionesTabla.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
