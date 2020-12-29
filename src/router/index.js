import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import Home from '../views/Home.vue'
import CrearDTC from '../views/CrearDTC.vue'
import ListarDTC from '../views/ListarDTC.vue'
import Login from '../views/Login.vue'
import Inventario from '../views/Inventario.vue'
import InventarioDetalle from '../views/InventarioDetalle.vue'
import Configuracion from '../views/Configuracion.vue'
import Register from '../views/Register.vue'
import CrearDtcLibre from '../views/CrearDTCLibre.vue'

//import Axios from "axios";
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
    beforeEnter: async function (to, from, next) {
      store.commit('DTC/cleanOut')
      store.commit('Header/cleanOut')
      store.commit('Login/cleanOut')
      store.commit('Refacciones/cleanOut')
      next()
    }
  },
  {
    path: '/home',
    name: 'home',
    component: Home,  
  },
  {
    path: '/home/:tipoUsuario/preventivo',
    name: 'Preventivo',
    component: () => import('../views/MantenimientoPreventivo.vue') 
  },
  {
    path: '/home/:tipoUsuario/correctivo',
    name: 'Correctivo',
    component: () => import('../views/MantenimientoCorrectivo.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/NuevoDtc',
    name: 'NuevoDtc',
    component: CrearDTC
  },
  {
    path: '/NuevoDtcLibre',
    name: 'NuevoDtcLibre',
    component: CrearDtcLibre
  },
  {
    path: '/Configuracion',
    name: 'Configuracion',
    component: Configuracion,
    beforeEnter: async function (to, from, next) {
      let user = store.getters['Login/getUserForDTC']
      let params = {
        Id: user.idUser,
        Square: user.numPlaza
      }
      await store.dispatch('Usuarios/Consulta_Users', params)
      next()
    }
  },
  {
    path: '/Inventario',
    name: 'Inventario',
    component: Inventario,
    beforeEnter: async function (to, from, next) {
      let plaza = store.getters['Header/getConvenioPlaza']
      await store.dispatch('Refacciones/FULL_COMPONETES', plaza)
      next()
    }
  },
  {
    path: '/ListarDtc',
    name: 'ListarDtc',
    component: ListarDTC,
    beforeEnter: async function (to, from, next) {
      let info = store.getters['Login/getUserForDTC']
      await store.dispatch('DTC/buscarListaDTC', info)
      store.commit("DTC/LIMPIAR_IMAGENES_FULL");
      next()
    }
  },
  {
    path: '/InventarioDetalle',
    name: 'InventarioDetalle',
    component: InventarioDetalle,
    beforeEnter: async function (to, from, next) {
      let plaza = store.getters['Header/getConvenioPlaza']
      await store.dispatch('Refacciones/buscarComponentesInventario', plaza)
      await store.dispatch('Refacciones/buscarUbicacionGeneralInventario')
      next()
    }
  },  
]
const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (to.name == 'login' || to.name == 'register') next()
  else if (to.name !== 'login' && store.getters['Login/getUserLogeado']) next()
  else next({ name: 'login' })
})

export default router
