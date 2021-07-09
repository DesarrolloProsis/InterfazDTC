<template>
  <div>
<!--/////////////////////////////////////////////////////////////////////
////                          CORRECTIVO                           /////
////////////////////////////////////////////////////////////////////-->
    <div class="flex justify-center mt-2 mb-16 sm:mt-14" v-if="tipoBotones">
      <div class="grid grid-cols-3 sm:grid-cols-2 sm:mb-20">
          <div class="botonesCorrectivo animacion sm:m-4 sm:p-3 hidden">
            <router-link to="/NuevoDtc/Crear" class="text-center">
              <img src="../../assets/img/add-file.png" height="200" width="200" class="m-10 sm:m-1"/>
              <h1 class="text-gray-900 text-xl sm:text-sm font-titulo font-medium">Nuevo DTC</h1>
            </router-link>
          </div>
          <div class="botonesCorrectivo animacion sm:m-4 sm:p-3">
            <router-link to="/Correctivo/PreDTC/Crear/DiagnosticoDeFalla" class="text-center">
              <img src="../../assets/img/document.png" height="200" width="200" class="m-10 sm:m-1" />
              <h1 class="text-gray-900 text-xl sm:text-sm font-titulo font-medium">Diagnóstico de Fallas</h1>              
            </router-link>
          </div>
          <div class="border-gray-200  border-2 rounded-lg m-8 sm:m-4 sm:p-3 shadow-xl hover:bg-gray-400 animacion ">
            <router-link to="/ConcentradoFichas" class="text-center cursor-pointer">
              <img src="../../assets/img/carpeta.png" height="200" width="200" class="m-10 sm:m-1" />
              <h1 class="text-gray-900 text-xl sm:text-sm font-titulo font-medium">Concentrado Diagnóstico</h1>
            </router-link>
          </div>   
          <div class="botonesCorrectivo animacion sm:m-4 sm:p-3">
            <router-link to="/ListarDTC" class="text-center">
              <img src="../../assets/img/to-do.png" height="200" width="200" class="m-10 sm:m-1"/>
              <h1 class="text-gray-900 text-xl sm:text-sm font-titulo font-medium">Concentrado DTC</h1>
            </router-link>
          </div>
          <div class="botonesCorrectivo animacion sm:m-4 sm:p-3">
            <router-link to="/ConcentradoGMMEP" class="text-center">
              <img src="../../assets/img/terminado.png" height="200" width="200" class="m-10 sm:m-1"/>
              <h1 class="text-gray-900 text-xl sm:text-sm font-titulo font-medium">Concentrado GMMEP</h1>
            </router-link>
          </div>
          <div class="botonesCorrectivo animacion sm:m-4 sm:p-3">
            <router-link to="/Inventario" class="text-center cursor-pointer">
              <img src="../../assets/img/inventory.png" height="200" width="200" class="m-10 sm:m-1"/>
              <h1 class="text-gray-900 text-xl sm:text-sm font-titulo font-medium">Inventario Plaza</h1>
            </router-link>
          </div>
      </div>
    </div>
    <div class="flex justify-center mb-16 mt-2 sm:mt-14" v-else>
      <div class="grid grid-cols-2" :class="{'grid grid-cols-3':typeUser == 2 && typeUser == 5}">     
          <div class="botonesCorrectivo animacion sm:m-4 sm:p-3">
            <router-link to="/CalendarioActividades" class="text-center cursor-pointer">
              <img src="../../assets/img/schedule.png" height="200" width="200" class="m-10 sm:m-1"/>
              <h1 class="text-gray-900 text-xl sm:text-sm font-titulo font-medium">Calendario</h1>
              <h1 class="text-gray-900 text-xl sm:text-sm font-titulo font-medium">Actividades</h1>
            </router-link>
          </div>
          <div class="botonesCorrectivo animacion sm:m-4 sm:p-3">
            <router-link to="/ReportesMantenimiento/TablaActividades" class="text-center">
              <img src="../../assets/img/report.png" height="200" width="200" class="m-10 sm:m-1" />
              <h1 class="text-gray-900 text-xl sm:text-sm font-titulo font-medium">Reportes</h1>
              <h1 class="text-gray-900 text-xl sm:text-sm font-titulo font-medium">Mantenimiento</h1>
            </router-link>
          </div>
          <div class="botonesCorrectivo animacion sm:m-4 sm:p-3" v-if="typeUser == 2 || typeUser == 5">
            <router-link to="/CalendarioHistorico" class="text-center cursor-pointer">
                <img src="../../assets/img/buscar.png" height="200" width="200" class="m-10 sm:m-1" />
                <h1 class="text-gray-900 text-xl sm:text-sm font-titulo font-medium">Concentrado de</h1>                            
                <h1 class="text-gray-900 text-xl sm:text-sm font-titulo font-medium">Calendarios</h1>
            </router-link>                     
          </div>
      </div>
    </div>
    <!-- </transition> -->
  </div>
</template>
<script>
export default {
  data(){
    return{
      tipoBotones: true
    } 
  },
  beforeMount(){
    this.typeUser = this.$store.state.Login.cookiesUser.rollId  
    this.tipoBotones = this.$router.currentRoute.name === 'Preventivo' 
    ? false 
    : true
  }
}
</script>

