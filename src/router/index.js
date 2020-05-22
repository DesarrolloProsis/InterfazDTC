import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'


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
    component: ListarDTC,

      beforeEnter: async function(to, from, next) {      

        let info = store.getters['Login/getUserForDTC']      
        console.log(info)
        await store.dispatch('DTC/buscarListaDTC', info)                   
        next()
      }
  },
  {
    path: '/Inventario',
    name: 'Inventario',
    component: Inventario,

      beforeEnter: async function(to, from, next) {      

        let plaza = store.getters['Header/getConvenioPlaza']      
        await store.dispatch('Refacciones/buscarComponentesInventario', plaza)
        await store.dispatch('Refacciones/buscarUbicacionGeneralInventario')            
        next()
      }
  }

 
]

const router = new VueRouter({
  routes
})

export default router
