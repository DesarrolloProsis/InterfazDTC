<template>
  <div>
    <div class="flex justify-center mt-2 sm:mt-14" v-if="tipoBotones">
      <div class="grid grid-cols-3">        
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
            <router-link to="/ConcentradoDTC" class="text-center">
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
            <router-link to="/Configuracion" class="text-center cursor-pointer">
              <img src="../../assets/img/engranajes.png" height="200" width="200" class="m-10 sm:m-1" />
              <h1 class="text-gray-900 text-xl sm:text-sm font-titulo font-medium">Configuración</h1>
            </router-link>
          </div> 
      </div>
    </div>
    <div class="flex justify-center mt-2 sm:mt-14" v-else>
      <div class="mb-66">       
          <div class="flex">     
              <div class="botonAdminPre animacion sm:m-4 sm:p-3 ">
                  <router-link to="/CalendarioHistorico" class="text-center cursor-pointer">
                      <img src="../../assets/img/document.png" height="200" width="200" class="m-10 sm:m-1" />
                      <h1 class="text-gray-900 text-xl sm:text-md font-titulo font-medium break-words mt-32">Bitacora de Visitas</h1>                            
                      <h1 class="text-gray-900 text-xl sm:text-md font-titulo font-medium break-words">de Mantenimiento</h1>
                      <h1 class="text-gray-900 text-xl sm:text-md font-titulo font-medium break-words">Equipos De Peaje</h1>
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