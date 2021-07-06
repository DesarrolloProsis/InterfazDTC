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
        <div class="group inline-block font-titulo">
          <button @click="navbarOpen == true ? navbarOpen = false : navbarOpen = true" class="mt-1 mr-3">
            <img class="h-8 w-8" src="@/assets/img/lista.png" alt="" />
          </button>
          <!-- <button class="bg-white rounded-lg flex items-center w-10 mt-3 ml-4 mr-0">
            <span>
              <svg class="fill-current h-4 w-4 transform group-hover:-rotate-180 transition duration-150 ease-in-out ml-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </span>
          </button> 
          -->  
        </div>              
      </div>     
    </nav>
    <div v-if="$route != undefined && $route.name != 'login'" class="relative">
      <transition name="fade">
      <div v-if="navbarOpen" class="absolute top-0 right-0 bg-blue-800 rounded w-auto sm:w-full">    
        <p v-if="nombreUsuario != undefined" id="testNombreUsuario" class="m-2 ml-5 text-white inline-block font-titulo text-left">Bienvenido: {{ nombreUsuario }}</p>   
        <div v-for="(item, key) in listaAccesoRapido" :key="key" class="m-3 text-center">
          <button @click="navbarOpen = false">
            <router-link :to="item.path" class="text-white text-left ml-2">
              {{ item.texto}}
            </router-link>
          </button>
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
        { texto: 'Configuración', path: '/Configuracion', rollValidos: [1, 10]},
        { texto: 'Salir', path: '/', rollValidos: [1, 10, 4, 7]}
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