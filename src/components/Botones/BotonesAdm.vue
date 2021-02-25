<template>
  <div>
    <div class="flex justify-center mt-2 sm:mt-14" v-if="tipoBotones">
      <div class="grid grid-cols-2">       
        
          <div class="border-black border-2 rounded-lg m-8 sm:m-4 sm:p-3 shadow-xl hover:bg-gray-400">
            <router-link to="/ListarDTC" class="text-center cursor-pointer ">
              <img src="../../assets/img/perfiles.png" height="200" width="200" class="m-10 sm:m-1" />
              <h1 class="text-gray-900 text-xl sm:text-sm font-black font-mono">Revisar DTC</h1>
            </router-link>
          </div>
          <div class="border-black border-2 rounded-lg m-8 sm:m-4 sm:p-3 shadow-xl hover:bg-gray-400">
            <router-link to="/ConcentradoDTC" class="text-center">
              <img src="../../assets/img/DtcFinalizado.png" height="200" width="200" class="m-10 sm:m-1"/>
              <h1 class="text-gray-900 text-xl sm:text-sm font-black font-mono">Autorizado GMMEP</h1>
            </router-link>
          </div>
          <div class="border-black border-2 rounded-lg m-8 sm:m-4 sm:p-3 shadow-xl hover:bg-gray-400">
            <router-link to="/Inventario" class="text-center cursor-pointer">
              <img src="../../assets/img/inventario.png" height="200" width="200" class="m-10 sm:m-1"/>
              <h1 class="text-gray-900 text-xl sm:text-sm font-black font-mono">Inventario Plaza</h1>
            </router-link>
          </div>             
          <div class="border-black border-2 rounded-lg m-8 sm:m-4 sm:p-3 shadow-xl hover:bg-gray-400">
            <router-link to="/Configuracion" class="text-center cursor-pointer">
              <img src="../../assets/img/config.png" height="200" width="200" class="m-10 sm:m-1" />
              <h1 class="text-gray-900 text-xl sm:text-sm font-black font-mono">Configuración</h1>
            </router-link>
          </div>  
      </div>
    </div>
    <div class="flex justify-center mt-2 sm:mt-14" v-else>
      <div class="mb-66">       
          <div class="flex">     
              <div class="border-black border-2 rounded-lg m-8 sm:m-4 sm:p-3 shadow-xl h-72 sm:h-64">
                  <router-link to="/CalendarioHistorico" class="text-center cursor-pointer">
                      <img src="../../assets/img/evidencia.png" height="200" width="200" class="m-10 sm:m-1" />
                      <h1 class="text-gray-900 text-xl sm:text-sm font-black font-mono break-words mt-32">Bitacora de Visitas</h1>                            
                      <h1 class="text-gray-900 text-xl sm:text-sm font-black font-mono break-words">de Mantenimiento</h1>
                      <h1 class="text-gray-900 text-xl sm:text-sm font-black font-mono break-words">Equipos De Peaje</h1>
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

    }
  },  
}
</script>