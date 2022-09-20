<template>
  <div class="sticky inset-x-0 top-0 z-10">
    <nav class="flex justify-between bg-blue-800 p-3" id="navBarShow" v-if="$route != undefined && $route.name != 'login' && $route.name != 'SesionExpirada'">
      <div class="group inline-block font-titulo">
        <button @click="openMenu" class="mt-1 mr-3 font-titulo">
          <!-- <img class="h-8 w-10" src="@/assets/img/lista.png" alt="" /> -->
          <font-awesome-icon icon="fa-solid fa-bars" class="text-white h-8 w-10"/> 
        </button>
      </div>  
      <!--BOTON INICIO-->
      <div class="text-lg -ml-90">
        <router-link to="/home" class="inline-block pl-5 pt-1 text-white text-xl font-titulo">
          <img src="../assets/img/logoProsis.png" height="30" width="30" class="inline" />
          Inicio          
        </router-link>     
      </div>   
      <!--PANEL NOMBRE DE USUARIO-->   
      <div class="flex">
        <p v-if="nombreUsuario != undefined" id="testNombreUsuario" class="m-2 ml-5 text-white inline-block font-titulo text-left mr-5 sm:hidden">Bienvenido: {{ nombreUsuario }}</p>                
        <!--PANEL NOMBRE DE NOTIFICACIONES-->  
        <button @click="openNotifications" class="mt-1 mr-3 font-titulo border-none">
            <font-awesome-icon icon="fa-regular fa-bell" class="text-white h-6 w-10 border-none" />
        </button>
        <div v-if="notificationOpen" @click="openNotifications" class="fixed inset-0 w-full h-full mt-15 z-0"></div>
            <transition name="fade">
              <div v-if="notificationOpen"
              class="
              absolute 
              top-0 
              mt-15 
              right-0 
              mr-20 
              flex-col
              font-titulo 
              bg-white border 
              border-gray-300 
              shadow-2xl 
              rounded-lg 
              p-3
              w-70
              h-76 
              sm:-mr-2 
              sm:w-67 
              overflow-y-auto
              z-20"
              >
                  <h3 class="p-4 font-titulo text-2xl font-bold text-blue-700 border-b-2 border-blue-600">Notificaciones</h3>
                  <div class="flex gap-4 mt-2">
                    <span class="font-medium bg-gray-200 rounded-lg ml-2 p-2">Todos</span>
                    <span class="font-medium bg-gray-200 rounded-lg  p-2">No Leidas</span>
                  </div>
                  <div class="h-10 text-justify p-4 mb-3">
                    <div class="flex content-center items-center p-2 rounded-lg hover:bg-gray-200">
                        <font-awesome-icon icon="fa-solid fa-arrow-right-arrow-left" class="text-blue-800 h-4 p-2 bg-blue-200 rounded-full" />
                        <div class="text-sm p-4">is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the</div>
                        <input type="radio" class="mb-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2">
                    </div>
                  </div>
              </div>
        </transition>            
      </div>     
    </nav>
    <div v-if="$route != undefined && $route.name != 'login'" class="relative mr-3 ">     
      <div v-if="navbarOpen" @click="openMenu" class="fixed inset-0 w-full h-full mt-15 z-0"></div>
      <transition name="fade">
        <div v-if="navbarOpen" class="absolute left w-auto flex font-titulo -mt-10.5 sm:-ml-4 border border-r-0 rounded-l-lg transform scale-90">     
          <div class="bg-white            
          w-60
          sm:-mr-2 
          sm:w-67
          "
          :class="{'bg-white border-r border-blue-800 p-3 pr-1 pt-0 w-52 ': rollUsuario == 7}">    
          <!--NavIzquierda-->              
            <div v-for="(item, key) in filtroMenuIzq" :key="key" class="rounded-2xl p-1 pl-0 mt-1 ">
              <p class="p-4 font-titulo text-md font-bold text-blue-700 border-b-2 border-blue-600">{{ item.texto }}</p>              
                <div v-for="(itemsub, keySub) in item.subMenu" :key="keySub" class="w-full p-1 sm:w-full sm:text-xs">
                  <button @click="$router.push(itemsub.path)" class="inline-flex mt-1 hover:bg-gray-200 pb-1 w-full sm:mt-0 sm:pb-0">
                    <font-awesome-icon :icon="itemsub.img" class="text-blue-800 w-4 h-4 ml-2 mt-2"/>
                    <div class="ml-4 text-left font-bold text-sm sm:text-justify">
                      <template  v-if="itemsub.texto.split('-').length == 1">
                        <p class="mt-2 sm:mt-3 sm:text-sm" >{{ itemsub.texto }}</p> 
                      </template>     
                      <template v-else>
                        <p v-for="(itemtext, key) in itemsub.texto.split('-')" :key="key" class="mt-2">{{ itemtext }}</p> 
                      </template>                                                       
                    </div>
                  </button>
                </div>
                              
            </div>
            <button @click="$router.push('/')" class="inline-flex mt-1 hover:bg-red-400 pl-1 pr-1 pb-1 w-full h-12 sm:text-sm sm:my-auto" :class="{'hidden':rollUsuario != 7}">
              <!-- <img src="@/assets/img/cerrar-sesion.png" class="w-8 h-8 ml-2 mt-1" > -->
              <font-awesome-icon icon="fa-solid fa-right-from-bracket" class="text-red-700 w-8 h-8 ml-2 mt-1"/>
              <div  class="ml-4 text-left">
                <p class=" sm:mt-3 mt-3">Cerrar Sesion</p>                                
              </div>  
            </button> 
            <!-- NavDerecha                
            <div v-for="(item, key) in filtroMenuDer" :key="key" class="rounded-2xl p-1 pl-0 mt-1">
              <p class="p-4 font-titulo text-md font-bold text-blue-700 border-b-2 border-blue-600 text-center">{{ item.texto }}</p>                  
              <div v-for="(itemsub, keySub) in item.subMenu" :key="keySub" class="w-full p-1">
                <button v-if="itemsub.texto != 'Manual de Usuario'" @click="$router.push({ path: itemsub.path, query: itemsub.query})" class="inline-flex mt-1 hover:bg-gray-400 pl-1 pr-1 pb-1 w-full bg-white">
                  -- <img :src="itemsub.img" class="w-8 h-8 ml-2 mt-1" > -
                  <font-awesome-icon :icon="itemsub.img" class="text-blue-800 w-8 h-8 ml-2 mt-1"/>
                  <div  class="ml-4 text-sm text-left">
                    <p class="mt-2">{{ itemsub.texto }}</p>                    
                  </div>  
                </button>
                <button v-else @click="manual_pdf" class="inline-flex mt-1 hover:bg-gray-200 pl-1 pr-1 pb-1 w-full">
                  - <img :src="itemsub.img" class="w-8 h-8 ml-2 mt-1" > -
                  <font-awesome-icon :icon="itemsub.img" class="text-blue-800 w-8 h-8 ml-2 mt-1"/>
                  <div  class="ml-4 text-left">
                    <p class="mt-2">{{ itemsub.texto }}</p>                                       
                  </div>  
                </button>                  
              </div>                                     
            </div>   -->
            <!--NavCerrar-->
            <div class="hiddenrounded-2xl p-1 pl-0 pt-0" >
              <div class="w-full p-1">
              <button @click="$router.push('/')" class="inline-flex mt-1 hover:bg-gray-200 pl-1 pr-1 pb-1 w-full">
                <!-- <img src="@/assets/img/cerrar-sesion.png" class="w-8 h-8 ml-2 mt-1" > -->
                <font-awesome-icon icon="fa-solid fa-right-from-bracket" class="text-red-700 w-4 h-4 ml-2 mt-1"/>
                <div  class="ml-4 text-left font-bold">
                  <p class="">Cerrar Sesion</p>                                
                </div>  
              </button> 
              </div>
            </div>                   
          </div>
          <div class="bg-white 
            border
            border-l-0
            rounded-r-lg
            p-3
            pr-1
            pt-0 
            w-52 
            sm:hidden" :class="{'hidden':rollUsuario == 7}">               
          </div>
        </div>
      </transition >      
    </div>
  </div>
</template>
<script>
import ReportesPDFService from '../services/ReportesPDFService'
import Vue from "vue";
Vue.directive("click-outside", {
  bind(el, binding, vnode) {
    el.clickOutsideEvent = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener("click", el.clickOutsideEvent);
  },
  unbind(el) {
    document.body.removeEventListener("click", el.clickOutsideEvent);
  },
});
export default {
  name: 'NavBar',
  data(){
    return{
      listaMenuIzq: [
        { texto: 'Mantenimiento Preventivo', subMenu: [
            { texto: 'Calendario de Actividades', img: "fa-solid fa-calendar-days", path: '/CalendarioActividades', rollValidos: [1, 2, 3, 5] },
            { texto: 'Reporte Mantenimiento', img: "fa-solid fa-file-waveform", path: '/ReportesMantenimiento/TablaActividades', rollValidos: [1, 2, 3, 5] },
            { texto: 'Bitacora de Vistas de Mantenimiento-Equipos de Peaje', img: "fa-solid fa-copy", path: '/CalendarioHistorico', rollValidos: [2, 4, 7, 8, 10] },
            { texto: 'Concentrado de Actividades de-Mantenimiento Preventivo', img: "fa-solid fa-file-waveform", path: '/ReportesMantenimiento/TablaActividades', rollValidos: [4, 5, 7, 8, 10], }
          ] 
        },
        { texto: 'Mantenimiento Correctivo', subMenu: [
            { texto: 'Diagnóstico de Falla', img: "fa-solid fa-file-signature", path: '/Correctivo/PreDTC/Crear/DiagnosticoDeFalla', rollValidos: [1, 2, 3, 5, 8, 10]},
            { texto: 'Concentrado Diag/Ficha', img: "fa-solid fa-folder-tree", path: '/ConcentradoFichas', rollValidos:[1, 2, 3, 4, 5, 7, 9, 10]},
            { texto: 'Concentrado DTC', img: "fa-solid fa-paste", path: '/ListarDtc', rollValidos: [1, 2, 3, 4, 5, 7, 8, 10]},
            { texto: 'Concentrado GMMEP', img: "fa-solid fa-file-circle-check", path: '/ConcentradoGMMEP', rollValidos: [1, 2, 3, 4, 5, 7, 8, 9, 10]},
            { texto: 'Concentrado DTC Borrados', img: 'fa-solid fa-file-circle-xmark', path: '/ConcentradoBorrados', rollValidos: [4, 8, 10]},
            { texto: 'Inventario', img: "fa-solid fa-boxes-stacked", path: '/Inventario', rollValidos: [1, 2, 3, 4, 5, 7, 10]},
            { texto: 'Entrega / Recepción', img: "fa-solid fa-file-invoice-dollar", path: '/ConcentradoDTCFacturados', rollValidos: [1, 2, 3, 4, 5, 7, 8, 10]},
            { texto: 'Reportes', img: "fa-solid fa-file-invoice", path: '/Reportes', rollValidos: [4]},
          ] 
        },   
        { texto: 'Ayuda', subMenu: [
            { texto: 'Comentarios', img: "fa-regular fa-comments", path: '/Ayuda', query: { tipo: 'comentario' }, rollValidos: [1, 2, 3, 4, 5, 8, 10] },
            { texto: 'Videos', img: "fa-solid fa-video", path: '/Ayuda', query: { tipo: 'videos' }, rollValidos: [1, 2, 3, 4, 5, 8,10] },
            { texto: 'Manual de Usuario', img: "fa-solid fa-file-circle-question", path: '/Configuracion', rollValidos: [1, 2, 3, 4, 5, 8, 10] },
          ] 
        }, 
        { texto: 'Configuracion', subMenu: [
            { texto: 'Encargados de Plaza', img: "fa-solid fa-building-user", path: '/EncargadosPlaza', rollValidos: [1, 2, 3, 4, 5, 8, 10] },
            { texto: 'Usuarios de Bitacora', img: "fa-solid fa-users-gear", path: '/Usuarios', rollValidos: [1, 2, 3, 4, 5, 8, 10] },
          ] 
        }  
      ],
      listaMenuDer:[ 
        { texto: 'Ayuda', subMenu: [
            { texto: 'Comentarios', img: "fa-regular fa-comments", path: '/Ayuda', query: { tipo: 'comentario' }, rollValidos: [1, 2, 3, 4, 5, 8, 10] },
            { texto: 'Videos', img: "fa-solid fa-video", path: '/Ayuda', query: { tipo: 'videos' }, rollValidos: [1, 2, 3, 4, 5, 8,10] },
            { texto: 'Manual de Usuario', img: "fa-solid fa-file-circle-question", path: '/Configuracion', rollValidos: [1, 2, 3, 4, 5, 8, 10] },
          ] 
        }, 
        { texto: 'Configuracion', subMenu: [
            { texto: 'Encargados de Plaza', img: "fa-solid fa-building-user", path: '/EncargadosPlaza', rollValidos: [1, 2, 3, 4, 5, 8, 10] },
            { texto: 'Usuarios de Bitacora', img: "fa-solid fa-users-gear", path: '/Usuarios', rollValidos: [1, 2, 3, 4, 5, 8, 10] },
          ] 
        }
      ],
      navbarOpen: false,
      notificationOpen: false,
      firstOpen: false      
    }
  },
  computed:{    
    rollUsuario(){
      return this.$store.state.Login.cookiesUser.rollId
    },
    nombreUsuario(){
      return this.$store.state.Login.cookiesUser.nombreUsuario
    },
    filtroMenuIzq: function(){
      if(this.rollUsuario != undefined){    
        let listaFiltrada = []     
        this.listaMenuIzq.forEach(item => {
            let arrayBotones = []
            item.subMenu.map(itemSub => {
              if(itemSub.rollValidos.includes(this.rollUsuario)){                              
                arrayBotones.push(itemSub)
              }
            })
            if(arrayBotones.length > 0){
              item.subMenu = arrayBotones
              listaFiltrada.push(item)
            }
        })
        return listaFiltrada
      }
      return []
    },
    filtroMenuDer: function(){
      if(this.rollUsuario != undefined){    
        let listaFiltrada = []     
        this.listaMenuDer.forEach(item => {
            let arrayBotones = []
            item.subMenu.map(itemSub => {
              if(itemSub.rollValidos.includes(this.rollUsuario)){                              
                arrayBotones.push(itemSub)
              }
            })
            if(arrayBotones.length > 0){
              item.subMenu = arrayBotones
              listaFiltrada.push(item)
            }
        })
        return listaFiltrada
      }
      return []
    }
  },
  methods:{
    manual_pdf(){
      ReportesPDFService.manual_pdf()
    },
    openNotifications(){
      if(this.navbarOpen == true){
        this.navbarOpen = false
      }
      this.notificationOpen = this.notificationOpen ? false : true    
    },
    onClickOutside(){
      this.notificationOpen = false
    },
    openMenu(){
      if(this.notificationOpen == true){
        this.notificationOpen = false
      }
      this.navbarOpen = this.navbarOpen ? false : true
    },    
  },
  watch: {
    '$route' (){            
      this.navbarOpen = false      
    }
  },    
};
</script>
<style >
.fondomodal{
    background: rgba(0, 0, 0, 0.5);
}
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}
.modal-container{
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.5);
}
</style>