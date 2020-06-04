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
    component: Login,    
    beforeEnter: async function(to, from, next) {
      
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


router.beforeEach((to, from, next) =>{

      
    if(to.name == 'login'){
      next()
    }
    else if(to.name !== 'login' && store.getters['Login/getUserLogeado']){      
      next()

    }
    else{      
      next({name: 'login'})
    }


})

export default router
