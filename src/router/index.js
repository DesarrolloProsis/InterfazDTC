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
import Axios from "axios";


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
    component: Home
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
      let nombre_plaza = await store.getters["Login/getPlaza"].squareName;
      let dtc = await store.getters["DTC/getlistaInfoDTC"];
      function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

      for (let item of dtc) {
        let arrayimg = []
        await Axios.get(
          `https://localhost:44358/api/Image/GetImages/${nombre_plaza}/${item.referenceNumber}`
        )
          .then((response) => {
           
            for (let item2 of response.data) {
              Axios.get(`https://localhost:44358/api/Image/DownloadFile/${nombre_plaza}/${item.referenceNumber}/${item2}`
              )
              .then(() => {
                                    
                  arrayimg.push({"fileName": item2, "image": `https://localhost:44358/api/Image/DownloadFile/${nombre_plaza}/${item.referenceNumber}/${item2}` })
                  sleep(200000000);
                  
              })
              
            }
            let obj = {
              "referenceNumber": item.referenceNumber,
              "array_img": arrayimg
            }
            store.commit("DTC/LISTA_IMAGENES_DTC_MUTATION", obj)
          })
          .catch((ex) => {
            console.log(ex);
          });
      }
      
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
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {

  if (to.name == 'login' || to.name == 'register') {
    next()
  }
  else if (to.name !== 'login' && store.getters['Login/getUserLogeado']) {
    next()
  }
  else {
    next({ name: 'login' })
  }
})

export default router
