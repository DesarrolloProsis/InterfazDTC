<template>
  <div>
<!--/////////////////////////////////////////////////////////////////////
////                          CORRECTIVO                           /////
////////////////////////////////////////////////////////////////////-->
    <div class="flex justify-center my-16 sm:mb-1 " v-if="tipoBotones">
      <div class="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 sm:mb-20">
          <div class="botonesCorrectivo bg-blue-100 border-0 border-l-8 border-blue-800 animacion sm:m-4 sm:p-3">
            <router-link to="/Correctivo/PreDTC/Crear/DiagnosticoDeFalla" class="text-center">
              <!-- <img src="../../assets/img/document.png" height="200" width="200" class="m-10 sm:m-1" /> -->
              <font-awesome-icon icon="fa-solid fa-file-signature" class="text-blue-800 w-37 h-37 mx-20 mt-10"/>
              <h1 class="text-blue-800 text-2xl sm:text-sm font-titulo font-bold">Diagnóstico de Fallas</h1>              
            </router-link>
          </div>
          <div class="botonesCorrectivo  bg-orange-100 border-0 border-l-8 border-orange-500 rounded-lg m-8 sm:m-4 sm:p-3 shadow-xl hover:bg-gray-400 animacion ">
            <router-link to="/ConcentradoFichas" class="text-center cursor-pointer">
              <!-- <img src="../../assets/img/carpeta.png" height="200" width="200" class="m-10 sm:m-1" /> -->
              <font-awesome-icon icon="fa-solid fa-folder-tree" class="text-blue-800 w-37 h-37 mx-20 mt-10"/>
              <h1 class="text-blue-800 text-2xl sm:text-sm font-titulo font-bold">Concentrado Diagnóstico</h1>
            </router-link>
          </div>   
          <div class="botonesCorrectivo bg-blue-100 border-0 border-l-8 border-blue-500 rounded-lg animacion sm:m-4 sm:p-3">
            <router-link to="/ListarDTC" class="text-center">
              <!-- <img src="../../assets/img/to-do.png" height="200" width="200" class="m-10 sm:m-1"/> -->
              <font-awesome-icon icon="fa-solid fa-paste" class="text-blue-800 w-37 h-37 mx-20 mt-10"/>
              <h1 class="text-blue-800 text-2xl sm:text-sm font-titulo font-bold">Concentrado DTC</h1>
            </router-link>
          </div>
          <div class="botonesCorrectivo bg-green-100 border-0 border-l-8 border-green-500  animacion sm:m-4 sm:p-3">
            <router-link to="/ConcentradoGMMEP" class="text-center">
              <!-- <img src="../../assets/img/terminado.png" height="200" width="200" class="m-10 sm:m-1"/> -->
              <font-awesome-icon icon="fa-solid fa-file-circle-check" class="text-blue-800 w-37 h-37 mx-20 mt-10"/>
              <h1 class="text-blue-800 text-2xl sm:text-sm font-titulo font-bold">Concentrado GMMEP</h1>
            </router-link>
          </div>
          <div class="botonesCorrectivo animacion bg-teal-100 border-0 border-l-8 border-teal-500 sm:m-4 sm:p-3">
            <router-link to="/Inventario" class="text-center cursor-pointer">
              <!-- <img src="../../assets/img/inventory.png" height="200" width="200" class="m-10 sm:m-1"/> -->
              <font-awesome-icon icon="fa-solid fa-boxes-stacked" class="text-blue-800 w-37 h-37 mx-20 mt-10"/>
              <h1 class="text-blue-800 text-2xl sm:text-sm font-titulo font-bold">Inventario Plaza</h1>
            </router-link>
          </div>
          <div class="botonesCorrectivo animacion bg-yellow-100 border-0 border-l-8 border-yellow-500 sm:m-4 sm:p-3">
            <router-link to="/ConcentradoDTCFacturados" class="text-center cursor-pointer">
              <!-- <img src="../../assets/img/factura.png" height="200" width="200" class="m-10 sm:m-1"/> -->
              <font-awesome-icon icon="fa-solid fa-file-invoice-dollar" class="text-blue-800 w-37 h-37 mx-20 mt-10"/>
              <h1 class="text-blue-800 text-2xl sm:text-sm font-titulo font-bold">Actas de Entrega y Recepción</h1>
            </router-link>
          </div>
      </div>
    </div>
    <div class="flex justify-center mb-16 mt-24 sm:mt-2" v-else>
      <div class="grid grid-cols-2 md:grid-cols-2 sm:grid-cols-1 mt-32"  :class="{'grid grid-cols-3':typeUser == 2 || typeUser == 5}">     
          <div class="botonesCorrectivo animacion bg-blue-100 border-0 border-l-8 border-blue-800 sm:m-4 sm:p-3">
            <router-link to="/CalendarioActividades" class="text-center cursor-pointer">
              <!-- <img src="../../assets/img/schedule.png" height="200" width="200" class="m-10 sm:m-1"/> -->
              <font-awesome-icon icon="fa-solid fa-calendar-days" class="text-blue-800 w-37 h-37 mx-20 mt-10" />
              <h1 class="text-blue-800 text-2xl sm:text-sm font-titulo font-bold">Calendario</h1>
              <h1 class="text-blue-800 text-2xl sm:text-sm font-titulo font-bold">Actividades</h1>
            </router-link>
          </div>
          <div class="botonesCorrectivo bg-green-100 border-0 border-l-8 border-green-500 animacion sm:m-4 sm:p-3">
            <router-link to="/ReportesMantenimiento/TablaActividades" class="text-center">
              <!-- <img src="../../assets/img/report.png" height="200" width="200" class="m-10 sm:m-1" /> -->
              <font-awesome-icon icon="fa-solid fa-file-waveform" class="text-blue-800 w-37 h-37 mx-20 mt-10"/>
              <h1 class="text-blue-800 text-2xl sm:text-sm font-titulo font-bold">Reportes</h1>
              <h1 class="text-blue-800 text-2xl sm:text-sm font-titulo font-bold">Mantenimiento</h1>
            </router-link>
          </div>
          <div class="botonesCorrectivo bg-blue-100 border-0 border-l-8 border-blue-500 animacion sm:m-4 sm:p-3" v-if="typeUser == 2 || typeUser == 5">
            <router-link to="/CalendarioHistorico" class="text-center cursor-pointer">
                <!-- <img src="../../assets/img/buscar.png" height="200" width="200" class="m-10 sm:m-1" /> -->
                <font-awesome-icon icon="fa-solid fa-calendar-check" class="text-blue-800 w-37 h-37 mx-20 mt-10"/>
                <h1 class="text-gray-900 text-xl sm:text-sm font-titulo font-bold">Concentrado de</h1>                            
                <h1 class="text-gray-900 text-xl sm:text-sm font-titulo font-bold">Calendarios</h1>
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

