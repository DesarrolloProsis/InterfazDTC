<template>
  <div>
    <div class="flex justify-center mt-2 sm:mt-14" v-if="tipoBotones">
      <div class="grid grid-cols-3 mb-16 sm:grid-cols-2 sm:mb-20">        
          <div class="botonesCorrectivo animacion sm:m-4 sm:p-3">
            <router-link to="/ConcentradoFichas" class="text-center cursor-pointer">
              <img src="../../assets/img/carpeta.png" height="200" width="200" class="m-10 sm:m-1" />
              <h1 class="text-gray-900 text-xl sm:text-sm font-titulo font-medium">Concentrado Diagnóstico</h1>
            </router-link>
          </div>
          <div class="botonesCorrectivo animacion sm:m-4 sm:p-3">
            <router-link to="/ListarDTC" class="text-center cursor-pointer ">
              <img src="../../assets/img/add-file.png" height="200" width="200" class="m-10 sm:m-1" />
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
            <router-link to="/ConcentradoBorrados" class="text-center cursor-pointer">
              <img src="../../assets/img/borrados.png" height="200" width="200" class="m-10 sm:m-1" />
              <h1 class="text-gray-900 text-xl sm:text-sm font-titulo font-medium">Concentrado DTC Borrado</h1>
            </router-link>
          </div> 
          <div class="botonesCorrectivo animacion sm:m-4 sm:p-3">
            <router-link to="/Inventario" class="text-center cursor-pointer">
              <img src="../../assets/img/inventory.png" height="200" width="200" class="m-10 sm:m-1"/>
              <h1 class="text-gray-900 text-xl sm:text-sm font-titulo font-medium">Inventario Plaza</h1>
            </router-link>
          </div>
          <div class="botonesCorrectivo animacion sm:m-4 sm:p-3">
            <router-link to="/Reportes" class="text-center cursor-pointer">
              <img src="../../assets/img/reportar.png" height="200" width="200" class="m-10 sm:m-1"/>
              <h1 class="text-gray-900 text-xl sm:text-sm font-titulo font-medium">Reportes</h1>
            </router-link>
          </div> 
          <div class="botonesCorrectivo animacion sm:m-4 sm:p-3">
            <router-link to="/ConcentradoDTCFacturados" class="text-center cursor-pointer">
              <img src="../../assets/img/factura.png" height="200" width="200" class="m-10 sm:m-1"/>
              <h1 class="text-gray-900 text-xl sm:text-sm font-titulo font-medium">DTC Facturado e instalados</h1>
            </router-link>
          </div> 
      </div>
    </div>
    <div class="flex justify-center mt-2 sm:mt-14" v-else>
      <div>       
        <div class="flex">     
          <div class="botonPrincipal m-8 mt-30 sm:m-4 sm:p-3 h-69 sm:h-64 animacion">
            <router-link to="/CalendarioHistorico" class="text-center cursor-pointer">
              <img src="../../assets/img/evidencia.png" height="200" width="200" class="m-10 sm:m-1" />
              <h1 class="text-gray-900 text-xl sm:text-sm font-titulo font-medium break-words mt-2">Bitacora de Visitas</h1>                            
              <h1 class="text-gray-900 text-xl sm:text-sm font-titulo font-medium break-words">de Mantenimiento</h1>
              <h1 class="text-gray-900 text-xl sm:text-sm font-titulo font-medium break-words">Equipos De Peaje</h1>
            </router-link>                     
          </div> 
          <div class="botonPrincipal m-8 mt-30 sm:m-4 sm:p-3animacion">
            <router-link to="/ReportesMantenimiento/TablaActividades" class="text-center">
              <img src="../../assets/img/report.png" height="200" width="200" class="m-10 sm:m-1" />
              <h1 class="text-gray-900 text-xl sm:text-sm font-titulo font-medium break-words">Concentrado de</h1>                            
              <h1 class="text-gray-900 text-xl sm:text-sm font-titulo font-medium break-words">Actividades de </h1>
              <h1 class="text-gray-900 text-xl sm:text-sm font-titulo font-medium break-words">Mantenimiento</h1>
              <h1 class="text-gray-900 text-xl sm:text-sm font-titulo font-medium break-words">Preventivo</h1>
            </router-link>
          </div>                                                    
        </div>
      </div>                            
    </div>
  </div>
</template>

<script>
export default {
  data(){
        return{
            tipoUsuario: 0,
            tipoBotones: false
        }
    },  
    beforeMount(){
        this.tipoUsuario = this.$store.getters['Login/getTypeUser']                  
        this.tipoBotones = this.$router.currentRoute.name === 'Preventivo' 
        ? false 
        : true  
    }
}
</script>