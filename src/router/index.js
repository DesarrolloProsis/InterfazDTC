import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CrearDTC from '../views/CrearDTC.vue'
import ListarDTC from '../views/ListarDTC.vue'
import Carriles from '../views/Carriles.vue'
import Refacciones from '../views/Refacciones.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
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
    path: '/Carriles',
    name: 'Carriles',
    component: Carriles
  },
  {
    path: '/Carriles/Nuevo',
    name: 'CarrilesNuevo',
    component: () => import('../components/CrearCarriles.vue')
  },
  {
    path: '/Carriles/Editar/:object',
    name: 'CarrilesEditar',
    component: () => import('../components/EditarCarriles.vue')
  },
  {
    path: '/Refacciones',
    name: 'Refacciones',
    component: Refacciones
  },
  {
    path: '/Refacciones/Nueva',
    name: 'RefaccionNueva',
    component: ()=> import('../components/CrearRefaccion.vue')
  },
  {
    path: '/Refacciones/Editar/:object',
    name: 'RefaccionEditar',
    component: ()=> import('../components/EditarRefaccion.vue')
  },

]

const router = new VueRouter({
  routes
})

export default router
