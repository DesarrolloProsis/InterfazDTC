<template>
  <div>    
    <div class="flex justify-center mt-2 sm:mt-14 font-titulo">
      <div class="grid grid-cols-2"> 
        <div v-if="this.typeUser != 9" class="botonesCorrectivo animacion sm:m-4 sm:p-3">
          <router-link to="/EncargadosPlaza" class="text-center cursor-pointer">
            <img src="../assets/img/encargado.png" height="200" width="200" class="m-10 sm:m-1" />
            <h1 class="text-gray-900 text-xl sm:text-sm font-black font-mono">Encargados de Plaza</h1>
          </router-link>
        </div>
        <div class="botonesCorrectivo animacion sm:m-4 sm:p-3">
          <router-link to="/Usuarios" class="text-center cursor-pointer">
            <img src="../assets/img/customer.png" height="200" width="200" class="m-10 sm:m-1" />
            <h1 class="text-gray-900 text-xl sm:text-sm font-black font-mono">Usuarios de Bitacora</h1>
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
