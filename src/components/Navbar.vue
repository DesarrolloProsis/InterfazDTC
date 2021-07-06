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
    <div v-if="$route != undefined && $route.name != 'login'" class="relative mr-3 rounded rounded-2xl">      
      <transition name="fade">
        <div v-if="navbarOpen" class="absolute top-0 right-0 bg-blue-800 w-auto sm:w-full rounded-lg">    
          <p v-if="nombreUsuario != undefined" id="testNombreUsuario" class="m-2 ml-5 text-white inline-block font-titulo text-left md:hidden lg:hidden xl:hidden">Bienvenido: {{ nombreUsuario }}</p>   
          <div v-for="(item, key) in listaAccesoRapido" :key="key" class="p-1 text-center w-full border border-gray-800" :class="{'bg-blue-600': key % 2 == 0, 'bg-blue-700': key % 2 != 0 }">        
            <button @click="navbarOpen = false" class="flex text-left w-65">
              <router-link :to="item.path" class="text-white ml-2 mt-1 w-full">
                {{ item.texto}}              
              </router-link>            
            </button>
          </div> 
           <div class="p-1 text-center w-full border border-gray-800 bg-red-600">        
            <button @click="navbarOpen = false" class="flex text-left w-65">
              <router-link to="/" class="text-white ml-2 mt-1 w-full">
                Salir            
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
        { texto: 'Configuración', path: '/Configuracion', rollValidos: [1, 10]}        
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