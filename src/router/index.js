import VueRouter from 'vue-router'
import store from '../store/index'
import Home from '../views/Home.vue'
import CrearDTC from '../views/Correctivo/DTC/CrearDTC.vue'
import ListarDTC from '../views/Correctivo/DTC/ListarDTC.vue'
import Login from '../views/Login.vue'
import Inventario from '../views/Correctivo/Inventario.vue'
import InventarioDetalle from '../views/Correctivo/InventarioDetalle.vue'
import Configuracion from '../views/Configuracion.vue'
import InicioSesion from '../views/IniciosSesion.vue'
import Register from '../views/Register.vue'
import ReportesMantenimiento from '../views/Preventivo/ReportesMantenimiento.vue'
import FichaDiagnostico from '../views/Correctivo/FichaDiagnostico/FichaDiagnosticoInicio'
import CalendarioActividades from '../views/Preventivo/CalendarioForm'
import servicioActividades from '../services/ActividadesService.js'
import CalendarioHistorico from '../views/Preventivo/CalendarioHistorico'
import CookiesService from '../services/CookiesService'
const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
    beforeEnter: async function (to, from, next) {
      localStorage.clear()
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
    path: '/NuevoDtc/:tipoVista/:referenciaFicha/:tipoFalla',
    name: 'NuevoDtc',
    component: CrearDTC,
    beforeEnter: async function(to, from, next){
      await store.dispatch("DTC/BUSCAR_DESCRIPCIONES_DTC");
      if(to.params.tipoVista != 'Editar')
        await store.dispatch("Header/BUSCAR_LISTA_UNIQUE");    
      next()
    }
  },
  {
    path: '/Configuracion',
    name: 'Configuracion',
    component: Configuracion,  
  },
  {
    path: '/IniciosSesion',
    name: 'IniciosSesion',
    component: InicioSesion,  
  },
  {
    path: '/Ayuda',
    name: 'Ayuda',
    component: () => import('../views/Ayuda')
  },
  {
    path: '/Reportes',
    name: 'Reportes',
    component: () => import('../views/Correctivo/Reportes/Reportes'),
  },
  {
    path: '/ReporteComponentes',
    name:'ReporteComponentes',
    component: () => import('../views/Correctivo/Reportes/ReporteComponentes')
  },
  {
    path: '/ReporteNoSellados',
    name: 'ReporteNoSellados',
    component: () => import('../views/Correctivo/Reportes/ReporteNoSellados')
  },
  {
    path: '/Usuarios',
    name: 'Usuarios',
    component: () => import('../views/Usuarios')
  },
  {
    path: '/Comentarios',
    name: 'Comentarios',
    component: () => import('../views/Comentarios')
  },
  {
    path: '/EncargadosPlaza',
    name: 'Encargados',
    component: () => import('../views/Correctivo/EncargadosPlaza')
  },
  {
    path: '/Inventario',
    name: 'Inventario',
    component: Inventario,
    beforeEnter:  function (to, from, next) {          
      next()
    }
  },
  {
    path: '/ConcentradoGMMEP',
    name: 'ConcentradoGMMEP',
    component: () => import('../views/Correctivo/Concentrados/ConcentradoGMMEP'),
    beforeEnter: async function (to, from, next) {
      let info = store.getters['Login/GET_USEER_ID_PLAZA_ID']      
      await store.dispatch('DTC/BUSCAR_LISTA_DTC', info)
      next()
    }
  },
  {
    path: '/ConcentradoFichas',
    name:'ConccentradoFichas',
    component: () => import('../views/Correctivo/Concentrados/ConcentradoFichas')
  },
  {
    path: '/Correctivo/PreDTC/:tipoVista',
    name: 'CorrectivoDTC',
    component: FichaDiagnostico,
    children: [
      {
        path: 'DiagnosticoDeFalla',
        name: 'DiagnosticoDeFalla',
        component: () => import('../views/Correctivo/FichaDiagnostico/DiagnosticoDeFalla')
      },
      {
        path: 'FichaTecnicaDeFalla',
        name: 'FichaTecnicaDeFalla',
        component: () => import('../views/Correctivo/FichaDiagnostico/FichaDeFalla')
      },
    ]
  },
  {
    path: '/Pruebas',
    name: 'Pruebas',
    component: () => import('../views/Correctivo/Pruebas')
  },
  {
    path: '/ConcentradoBorrados',
    name: 'ConcentradoBorrados',
    component: () => import('../views/Correctivo/Concentrados/ConcentradoBorrados')
  },
  {
    path: '/SesionExpirada',
    name: 'SesionExpirada',
    component: () => import('../views/SesionExpirada')
  },
  {
  path: '/Error',
  name: 'Error',
  component: () => import('../views/Error')
  },
  {
    path: '/ListarDtc',
    name: 'ListarDtc',
    component: ListarDTC,
    beforeEnter: async function (to, from, next) {
      store.dispatch("DTC/BUSCAR_DESCRIPCIONES_DTC");
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
      await store.dispatch('Refacciones/BUSCAR_UBICACION_GENERAL_INVENTARIO')
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
        path: ':tipoVista/FormularioReporte',
        component: () => import('../views/Preventivo/FormularioReporte.vue'),
        beforeEnter: async function(to, from, next) {          
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
  mode: 'history',
  routes
})

router.beforeEach(async (to, from, next) => {

  if (to.name == 'login' || to.name == 'register') next()
  else if(from.name == 'SesionExpirada' && to.name != 'login')next(false)
  else if (to.name !== 'login' && store.getters['Login/GET_USER_IS_LOGIN']) next()
  else {
    let resultToken = await CookiesService.cache_token()        
      if(resultToken)
        next()  
      else
        router.push('/')            
  }
})
export default router
