import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CrearDTC from '../views/CrearDTC.vue'
import ListarDTC from '../views/ListarDTC.vue'
import Carriles from '../views/Carriles.vue'
import Refacciones from '../views/Refacciones.vue'
import Inventario from '../views/Inventario.vue'
import Login from '../views/Login.vue'

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
    path: '/Carriles',
    name: 'Carriles',
    component: Carriles,
    
  },
  {
    path: '/Carriles/Nuevo',
    name: 'CarrilesNuevo',
    component: () => import('../components/Carriles/CrearCarriles.vue')
  },
  {
    path: '/Carriles/Editar/:object',
    name: 'CarrilesEditar',
    component: () => import('../components/Carriles/EditarCarriles.vue')
  },
  {
    path: '/Refacciones',
    name: 'Refacciones',
    component: Refacciones
  },
  {
    path: '/Refacciones/Nueva',
    name: 'RefaccionNueva',
    component: ()=> import('../components/Refacciones/CrearRefaccion.vue')
  },
  {
    path: '/Refacciones/Editar/:object',
    name: 'RefaccionEditar',
    component: ()=> import('../components/Refacciones/EditarRefaccion.vue')
  },
  {
    path: '/Inventario',
    name: 'Inventario',
    component: Inventario
  },
  {
    path: '/Inventario/Nueva',
    name: 'InventarioNuevo',
    component: ()=> import('../components/Inventario/CrearInventario.vue')
  },
  {
    path: '/Inventario/Editar/:object',
    name: 'InventarioEditar',
    component: ()=> import('../components/Inventario/EditarInventario.vue')
  },

]

const router = new VueRouter({
  routes
})

export default router
