import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CrearDTC from '../views/CrearDTC.vue'
import ListarDTC from '../views/ListarDTC.vue'
import Carriles from '../views/Carriles.vue'
import Refacciones from '../views/Refacciones.vue'
import Inventario from '../views/Inventario.vue'
import Login from '../views/Login.vue'
import Convenios from '../views/Convenios.vue'
import Configuracion from '../views/Configuration.vue'
import Plaza from '../views/Plaza.vue'
import DTCHeader from '../views/DTCHeader.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/convenios',
    name: 'convenios',
    component: Convenios
  },
  {
    path: '/header',
    name: 'header',
    component: DTCHeader
  },
  {

    path: '/config',
    name: 'config',
    component: Configuracion,

  },
  {
    path: '/plazas',
    name: 'plazas',
    component: Plaza
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
    path: '/Header/Nuevo',
    name: 'HeaderNuevo',
    component: () => import('../components/Header/CrearHeader.vue')
  },
  {
    path: '/Plazas/Nuevo',
    name: 'PlazasNuevo',
    component: () => import('../components/Plazas/CrearPlazas.vue')
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
