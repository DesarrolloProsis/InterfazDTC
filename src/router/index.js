import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import Home from '../views/Home.vue'
import CrearDTC from '../views/Correctivo/CrearDTC.vue'
import ListarDTC from '../views/Correctivo/ListarDTC.vue'
import Login from '../views/Login.vue'
import Inventario from '../views/Correctivo/Inventario.vue'
import InventarioDetalle from '../views/Correctivo/InventarioDetalle.vue'
import Configuracion from '../views/Configuracion.vue'
import Register from '../views/Register.vue'
import CrearDtcLibre from '../views/Correctivo/CrearDTCLibre.vue'
import ReportesMantenimiento from '../views/Preventivo/ReportesMantenimiento.vue'
import CalendarioActividades from '../views/Preventivo/CalendarioForm'
import servicioActividades from '../services/ActividadesService.js'
import CalendarioHistorico from '../views/Preventivo/CalendarioHistorico'
import ServiceCookies from '../services/CookiesService'
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
    component: () => import('../views/Preventivo/MantenimientoPreventivo.vue') 
  },
  {
    path: '/home/:tipoUsuario/correctivo',
    name: 'Correctivo',
    component: () => import('../views/Correctivo/MantenimientoCorrectivo.vue')
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
      let user = store.getters['Login/GET_USEER_ID_PLAZA_ID']
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
      await ServiceCookies.actualizar_plaza()            
      next()
    }
  },
  {
    path: '/ConcentradoDTC',
    name: 'ConcentradoDTC',
    component: () => import('../views/Correctivo/ConcentradoDTC'),
    beforeEnter: async function (to, from, next) {
      let info = store.getters['Login/GET_USEER_ID_PLAZA_ID']      
      await store.dispatch('DTC/BUSCAR_LISTA_DTC', info)
      next()
    }
  },
  {
    path: '/ConcentradoDetallesDTC',
    name:'ConcentradoDetallesDTC',
    component: () => import('../views/Correctivo/ConcentradoDetallesDTC')
  },

  {
    path: '/Pruebas',
    name: 'Pruebas',
    component: () => import('../views/Correctivo/Pruebas')
  },
  {
    path: '/ListarDtc',
    name: 'ListarDtc',
    component: ListarDTC,
    beforeEnter: async function (to, from, next) {
      let info = store.getters['Login/GET_USEER_ID_PLAZA_ID']      
      await store.dispatch('DTC/BUSCAR_LISTA_DTC', info)
      store.commit("DTC/LIMPIAR_IMAGENES_FULL");
      next()
    }
  },
  {
    path: '/InventarioDetalle',
    name: 'InventarioDetalle',
    component: InventarioDetalle,
    beforeEnter: async function (to, from, next) {
      let plaza = store.getters['Header/GET_CONVENIO_PLAZA']
      await store.dispatch('Refacciones/buscarComponentesInventario', plaza)
      await store.dispatch('Refacciones/buscarUbicacionGeneralInventario')
      next()
    }
  },  
  {
    path: '/ReportesMantenimiento',
    name: 'ReportesMantenimiento',
    component: ReportesMantenimiento,
    children: [
      {
        path: 'TablaActividades',
        component: () => import('../views/Preventivo/TablaActividades.vue'),
        beforeEnter: async function(to,from,next){          
          let result = await servicioActividades.filtrar_actividades_mensuales(undefined, undefined, false)                    
          to.params.cargaInicial = result                             
          next()
        }      
      },      
      {
        path: 'FormularioReporte',
        component: () => import('../views/Preventivo/FormularioReporte.vue'),
        beforeEnter: async function(to, from, next) {
          console.log(!to.query.edicion)
          if(!to.query.edicion == true)
            await store.dispatch('Actividades/OBTENER_LISTA_ACTIVIDADES_CHECK', to.query.header)                    
          next()          
        }
      }
    ]
  },
  {
    path: '/CalendarioActividades',
    name: 'CalendarioActividades',
    component: CalendarioActividades,
    beforeEnter: async function(to,from,next){
      let result = await servicioActividades.filtrar_actividades_mensuales(undefined, undefined, true)                    
      to.params.cargaInicial = result                             
      next()
    } 
  },
  {
    path: '/CalendarioHistorico',
    name: 'CalendarioHistorico',
    component: CalendarioHistorico
  }
]
const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (to.name == 'login' || to.name == 'register') next()
  else if (to.name !== 'login' && store.getters['Login/GET_USER_IS_LOGIN']) next()
  else next({ name: 'login' })
})

export default router
