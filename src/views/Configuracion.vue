<template>
  <div>    
    <div class="flex justify-center mt-2 sm:mt-2 font-titulo">
      <div class="grid grid-cols-2 sm:grid-cols-1 sm:mt-1 mt-48" :class="{'grid grid-cols-3':typeUser == 10 || typeUser == 4}"> 
        <div v-if="this.typeUser != 1 && this.typeUser != 3" class="botonesCorrectivo h-full bg-blue-100 border-0 border-l-8 border-blue-800 animacion sm:m-4 sm:p-3">
          <router-link to="/EncargadosPlaza" class="text-center cursor-pointer">
            <!-- <img src="../assets/img/encargado.png" height="200" width="200" class="m-10 sm:m-1" /> -->
            <font-awesome-icon icon="fa-solid fa-building-user" class="text-blue-800 w-37 h-32 mx-20 mt-10"/>
            <h1 class="text-gray-900 text-xl sm:text-sm font-black font-mono">Encargados de Plaza</h1>
          </router-link>
        </div>
        <div class="botonesCorrectivo bg-yellow-100 border-0 h-full border-l-8 border-yellow-500 animacion sm:m-4 sm:p-3">
          <router-link to="/Usuarios" class="text-center cursor-pointer">
            <!-- <img src="../assets/img/customer.png" height="200" width="200" class="m-10 sm:m-1" /> -->
            <font-awesome-icon icon="fa-solid fa-users-gear" class="text-blue-800 w-37 h-32 mx-20 mt-10"/>
            <h1 class="text-gray-900 text-xl sm:text-sm font-black font-mono">Usuarios de Bitacora</h1>
          </router-link>
        </div>
        <div v-if="typeUser == 10 || typeUser == 4" class="botonesCorrectivo h-full bg-green-100 border-0 border-l-8 border-green-500 animacion sm:m-4 sm:p-3">
          <router-link to="/IniciosSesion" class="text-center cursor-pointer">
            <!-- <img src="../assets/img/search.png" height="200" width="200" class="m-10 sm:m-1" /> -->
            <font-awesome-icon icon="fa-solid fa-arrows-down-to-people" class="text-blue-800 w-37 h-32 mx-20 mt-10"/>
            <h1 class="text-gray-900 text-xl sm:text-sm font-black font-mono">Inicios de Sesion</h1>
          </router-link>
        </div>
      </div>
    </div>  
  </div>
</template>

<script>
import ReportesPDFService from '../services/ReportesPDFService'
export default {
  name: 'Configuracion',
  data () {
    return {
      typeUser:''
    }
  },
  beforeMount (){
    this.typeUser = this.$store.state.Login.cookiesUser.rollId
  },
  methods:{
    manual_pdf(){
      ReportesPDFService.manual_pdf()
    }
  }
}
</script>
