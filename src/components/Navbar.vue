<template>
  <div>
    <nav class="flex justify-between bg-blue-800 p-3" id="navBarShow" v-if="$route != undefined && $route.name != 'login'">
      <div class="text-lg">
        <router-link to="/home" class="inline-block pl-5 pt-1 text-white text-xl font-titulo">
          <img src="../assets/img/logoProsis.png" height="30" width="30" class="inline" />
          Inicio          
        </router-link>     
      </div>      
      <div class="flex">   
        <p v-if="nombreUsuario != undefined" id="testNombreUsuario" class="m-2 ml-5 text-white inline-block font-titulo text-left mr-5 sm:hidden">Bienvenido: {{ nombreUsuario }}</p>                
        <div class="group inline-block font-titulo">
          <button @click="navbarOpen == true ? navbarOpen = false : navbarOpen = true" class="mt-1 mr-3">
            <img class="h-8 w-10" src="@/assets/img/lista.png" alt="" />
          </button>
        </div>              
      </div>     
    </nav>
    <div v-if="$route != undefined && $route.name != 'login'" class="relative mr-3">      
      <transition name="fade">
        <div v-if="navbarOpen" class="absolute top-0 right-0 w-auto sm:w-full rounded-lg inline-flex">     
          <div class="bg-white border border-blue-800 inline-block p-3 pr-0 pt-0 w-69 rounded-t-none rounded-2xl">                  
            <div v-for="(item, key) in listaMenuIzq" :key="key" class="rounded-2xl inline-block p-1 pl-0 mt-1">
              <p class="font-bold">{{ item.texto }}</p>
              <button>
                <div v-for="(itemsub, keySub) in item.subMenu" :key="keySub">
                  <button class="border rounded-l-xl rounded-r-xl inline-flex mt-1 hover:bg-gray-300 pl-1 pr-1 pb-1">
                    <img :src="itemsub.img" class="w-8 h-8 ml-2 mt-1" >
                    <div  class="ml-4 text-left">
                      <p class="font-semibold">{{ itemsub.texto }}</p>
                      <p class="">Lorem ipsum dolor sit amet consectetur adipisicing</p>                  
                    </div>
                  </button>
                </div>
              </button>
            </div>
          </div>
          <div class="bg-white border border-blue-800 inline-block p-3 pr-0 pt-0 w-69 rounded-t-none rounded-2xl">                  
            <div v-for="(item, key) in listaMenuDer" :key="key" class="rounded-2xl inline-block p-1 pl-0 mt-1">
              <p class="font-bold">{{ item.texto }}</p>                  
                <div v-for="(itemsub, keySub) in item.subMenu" :key="keySub">
                  <button class="border rounded-l-xl rounded-r-xl inline-flex mt-1 hover:bg-gray-300 pl-1 pr-1 pb-1">
                  <img :src="itemsub.img" class="w-8 h-8 ml-2 mt-1" >
                  <div  class="ml-4 text-left">
                    <p class="font-semibold">{{ itemsub.texto }}</p>
                    <p class="">Lorem ipsum dolor sit amet consectetur adipisicing</p>                  
                  </div>  
                  </button>                 
                </div>                         
            </div>                 
          </div>
        </div>
      </transition >      
    </div>
    
  </div>
</template>
<script>
import ReportesPDFService from '../services/ReportesPDFService'
export default {
  name: 'NavBar',
  data(){
    return{
      accesoRapidoVistas: [
        { texto: 'Diagnóstico de Falla', path: '/Correctivo/PreDTC/Crear/DiagnosticoDeFalla', rollValidos: [1, 10]},
        { texto: 'Concentrado Diag/Ficha', path: '/ConcentradoFichas', rollValidos:[1,4,10]},
        { texto: 'Concentrado DTC', path: '/ListarDtc', rollValidos: [1, 10]},
        { texto: 'Concentrado GMMEP', path: '/ConcentradoGMMEP', rollValidos: [1,4, 7, 10]},
        { texto: 'Calendario de Actividades', path: '/CalendarioActividades', rollValidos: [1]},
        { texto: 'Revisar DTC', path: '/ListarDtc', rollValidos: [4, 7]},
        { texto: 'Calendario Historico', path: '/CalendarioHistorico', rollValidos: [4, 7]},
        { texto: 'Inventario', path: '/Inventario', rollValidos: [7, 10]},
        { texto: 'Configuración', path: '/Configuracion', rollValidos: [1, 10]}        
      ],
      listaMenuIzq: [
        { texto: 'Mantenimiento Preventivo', subMenu: [
            { texto: 'Calendario de Actividades', img: '/img/schedule.3544ed94.png', path: '/CalendarioActividades', rollValidos: [1] },
            { texto: 'Reporte Mantenimiento', img: '/img/report.f0a9dabd.png', path: '/CalendarioActividades', rollValidos: [1] },
          ] 
        },
        { texto: 'Mantenimiento Correctivo', subMenu: [
            { texto: 'Diagnóstico de Falla', img: '/img/documento.895fbd37.png', path: '/Correctivo/PreDTC/Crear/DiagnosticoDeFalla', rollValidos: [1, 10]},
            { texto: 'Concentrado Diag/Ficha', img: '/img/carpeta.c51576f5.png', path: '/ConcentradoFichas', rollValidos:[1,4,10]},
            { texto: 'Concentrado DTC', img: '/img/to-do.aebc450b.png', path: '/ListarDtc', rollValidos: [1, 10]},
            { texto: 'Concentrado GMMEP', img: '/img/terminado.6284708b.png', path: '/ConcentradoGMMEP', rollValidos: [1,4, 7, 10]},
            { texto: 'Inventario', img: '/img/inventory.b5c27f79.png', path: '/Inventario', rollValidos: [7, 10]},
          ] 
        },     
      ],
      listaMenuDer:[ 
        { texto: 'Ayuda', subMenu: [
            { texto: 'Comentarios', img: '/img/comentarios.d019c37b.png', path: '/Configuracion', rollValidos: [1, 10] },
            { texto: 'Videos', img: '/img/videos.0bc9c45c.png', path: '/Configuracion', rollValidos: [1, 10] },
            { texto: 'Manual de Usuario', img: '/img/guia.2bdce3ae.png', path: '/Configuracion', rollValidos: [1, 10] },
          ] 
        }, 
        { texto: 'Configuracion', subMenu: [
            { texto: 'Encargados de Plaza', img: '/img/encargado.cc1e52b0.png', path: '/Configuracion', rollValidos: [1, 10] },
            { texto: 'Usuarios de Bitacora', img: '/img/customer.f1d7f9c9.png', path: '/Configuracion', rollValidos: [1, 10] },
          ] 
        }
      ],
      navbarOpen: false
    }
  },
  computed:{    
    rollUsuario(){
      return this.$store.state.Login.cookiesUser.rollId
    },
    nombreUsuario(){
      return this.$store.state.Login.cookiesUser.nombreUsuario
    },
    listaAccesoRapido(){
      if(this.rollUsuario != undefined){        
        return this.accesoRapidoVistas.filter(boton => boton.rollValidos.includes(this.rollUsuario))
      }
      return []
    }
  },
  methods:{
    manual_pdf(){
      ReportesPDFService.manual_pdf()
    }
  },
  watch: {
    '$route' (){
      this.navbarOpen = false      
    }
  }    
};
</script>
<style >
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}
</style>