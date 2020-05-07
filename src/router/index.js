import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import CrearDTC from '../views/CrearDTC.vue'
import ListarDTC from '../views/ListarDTC.vue'
import Login from '../views/Login.vue'
import Inventario from '../views/Inventario.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/NuevoDtc',
    name: 'NuevoDtc',
    component: CrearDTC
  },
  {
    path: '/ListarDtc',
    name: 'ListarDtc',
    component: ListarDTC
  },
  {
    path: '/Inventario',
    name: 'Inventario',
    component: Inventario
  }

 
]

const router = new VueRouter({
  routes
})

export default router
