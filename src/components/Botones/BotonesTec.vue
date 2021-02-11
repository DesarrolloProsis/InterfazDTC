<template>
  <div>
    <div class="flex justify-center mt-2 sm:mt-14" v-if="tipoBotones">
      <div class>
        <div class="flex">
          <div class="border-black border-2 rounded-lg m-8 sm:m-4 sm:p-3 shadow-xl">
            <router-link to="/NuevoDtc" class="text-center">
              <img src="../../assets/img/nuevoDtc.png" height="200" width="200" class="m-10 sm:m-1"/>
              <h1 class="text-gray-900 text-xl sm:text-sm font-black font-mono">Nuevo DTC</h1>
            </router-link>
          </div>
          <div class="border-black border-2 rounded-lg m-8 sm:m-4 sm:p-3 shadow-xl">
            <router-link to="/ListarDTC" class="text-center">
              <img src="../../assets/img/perfiles.png" height="200" width="200" class="m-10 sm:m-1"/>
              <h1 class="text-gray-900 text-xl sm:text-sm font-black font-mono">DTC Pendientes</h1>
            </router-link>
          </div>
           <div class="border-black border-2 rounded-lg m-8 sm:m-4 sm:p-3 shadow-xl">
            <router-link to="/ConcentradoDTC" class="text-center">
              <img src="../../assets/img/perfiles.png" height="200" width="200" class="m-10 sm:m-1"/>
              <h1 class="text-gray-900 text-xl sm:text-sm font-black font-mono">DTC Finalizados</h1>
            </router-link>
          </div>
        </div>
        <div class="flex justify-center">
          <div class="border-black border-2 rounded-lg m-8 sm:m-4 sm:p-3 shadow-xl">
            <router-link to="/Inventario" class="text-center cursor-pointer">
              <img src="../../assets/img/inventario.png" height="200" width="200" class="m-10 sm:m-1"/>
              <h1 class="text-gray-900 text-xl sm:text-sm font-black font-mono">Inventario Plaza</h1>
            </router-link>
          </div>
          <div class="border-black border-2 rounded-lg m-8 sm:m-4 sm:p-3 shadow-xl">
            <router-link to="/Configuracion" class="text-center">
              <img src="../../assets/img/config.png" height="200" width="200" class="m-10 sm:m-1" />
              <h1 class="text-gray-900 text-xl sm:text-sm font-black font-mono">Configuración</h1>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center mt-2 sm:mt-14" v-else>
      <div class>     
        <div class="flex justify-center">
          <div class="border-black border-2 rounded-lg m-8 sm:m-4 sm:p-3 shadow-xl">
            <router-link to="/CalendarioActividades" class="text-center cursor-pointer">
              <img src="../../assets/img/calendario.png" height="200" width="200" class="m-10 sm:m-1"/>
              <h1 class="text-gray-900 text-xl sm:text-sm font-black font-mono">Calendario</h1>
              <h1 class="text-gray-900 text-xl sm:text-sm font-black font-mono">Actividades</h1>
            </router-link>
          </div>
          <div class="border-black border-2 rounded-lg m-8 sm:m-4 sm:p-3 shadow-xl">
            <router-link to="/ReportesMantenimiento/TablaActividades" class="text-center">
              <img src="../../assets/img/reporteMante.png" height="200" width="200" class="m-10 sm:m-1" />
              <h1 class="text-gray-900 text-xl sm:text-sm font-black font-mono">Reportes</h1>
              <h1 class="text-gray-900 text-xl sm:text-sm font-black font-mono">Mantenimiento</h1>
            </router-link>
          </div>
        </div>
        <div class="flex justify-center">  
          <div class="border-black border-2 rounded-lg m-8 sm:m-4 sm:p-3 shadow-xl">
            <router-link to="/Configuracion" class="text-center">
              <img src="../../assets/img/evidencia.png" height="200" width="200" class="m-10 sm:m-1" />
              <h1 class="text-gray-900 text-xl sm:text-sm font-black font-mono">Evidencia</h1>
              <h1 class="text-gray-900 text-xl sm:text-sm font-black font-mono">Mantenimiento</h1>
            </router-link>
          </div>       
          <div class="border-black border-2 rounded-lg m-8 sm:m-4 sm:p-3 shadow-xl">
            <router-link to="/Configuracion" class="text-center">
              <img src="../../assets/img/config.png" height="200" width="200" class="m-10 sm:m-1" />
              <h1 class="text-gray-900 text-xl sm:text-sm font-black font-mono">Configuración</h1>
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
      tipoBotones: true
    } 
  },
  beforeMount(){
    this.tipoBotones = this.$router.currentRoute.name === 'Preventivo' 
    ? false 
    : true
  }
  
  
}
</script>
