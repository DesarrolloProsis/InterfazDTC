<template>
  <div>
    <div class="flex justify-center mt-2 sm:mt-14" v-if="tipoBotones">
      <div class="grid grid-cols-2">       
        
          <div class="border-gray-200  border-2 rounded-lg m-8 sm:m-4 sm:p-3 shadow-xl hover:bg-gray-400 animacion">
            <router-link to="/ListarDTC" class="text-center cursor-pointer ">
              <img src="../../assets/img/add-file.png" height="200" width="200" class="m-10 sm:m-1" />
              <h1 class="text-gray-900 text-xl sm:text-sm font-black font-mono">Revisar DTC</h1>
            </router-link>
          </div>
          <div class="border-gray-200  border-2 rounded-lg m-8 sm:m-4 sm:p-3 shadow-xl hover:bg-gray-400 animacion">
            <router-link to="/ConcentradoDTC" class="text-center">
              <img src="../../assets/img/terminado.png" height="200" width="200" class="m-10 sm:m-1"/>
              <h1 class="text-gray-900 text-xl sm:text-sm font-black font-mono">Autorizado GMMEP</h1>
            </router-link>
          </div>
          <div class="border-gray-200  border-2 rounded-lg m-8 sm:m-4 sm:p-3 shadow-xl hover:bg-gray-400 animacion">
            <router-link to="/Inventario" class="text-center cursor-pointer">
              <img src="../../assets/img/inventory.png" height="200" width="200" class="m-10 sm:m-1"/>
              <h1 class="text-gray-900 text-xl sm:text-sm font-black font-mono">Inventario Plaza</h1>
            </router-link>
          </div>             
          <div class="border-gray-200  border-2 rounded-lg m-8 sm:m-4 sm:p-3 shadow-xl hover:bg-gray-400 animacion">
            <router-link to="/Configuracion" class="text-center cursor-pointer">
              <img src="../../assets/img/engranajes.png" height="200" width="200" class="m-10 sm:m-1" />
              <h1 class="text-gray-900 text-xl sm:text-sm font-black font-mono">Configuración</h1>
            </router-link>
          </div>
<!--           <div class="border-black border-2 rounded-lg m-8 sm:m-4 sm:p-3 shadow-xl hover:bg-gray-400 animacion">
            <router-link to="/EncargadosPlaza" class="text-center cursor-pointer">
              <img src="../../assets/img/encargado.png" height="200" width="200" class="m-10 sm:m-1" />
              <h1 class="text-gray-900 text-xl sm:text-sm font-black font-mono">Encargados de Plaza</h1>
            </router-link>
          </div> -->   
      </div>
    </div>
    <div class="flex justify-center mt-2 sm:mt-14" v-else>
      <div class="mb-66">       
          <div class="flex">     
              <div class="border-gray-200 border-2 rounded-lg m-8 sm:m-4 sm:p-3 shadow-xl h-72 sm:h-64 hover:bg-gray-400 animacion">
                  <router-link to="/CalendarioHistorico" class="text-center cursor-pointer">
                      <img src="../../assets/img/document.png" height="200" width="200" class="m-10 sm:m-1" />
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