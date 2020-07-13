<template>
  <div>
    <div
      class="flex items-stretch flex-wrap justify-center xl:flex-row lg:flex-col md:flex-col sm:flex-col lg:mt-3"
    >
      <router-link
        to="/NuevoDtc"
        class="text-gray-700 hover:bg-gray-400 items-center text-center border-4 border-red-800 rounded-lg sm:px-40 sm:py-20 m-4"
      >
        <img src="../assets/img/nuevoDtc.png" height="150" width="150" class="m-8" />
        <h1 class="text-gray-900 text-xl font-black font-mono">Nuevo DTC</h1>
      </router-link>
      
      <router-link
        to="/ListarDTC"
        class="text-gray-700 text-center items-center hover:bg-gray-400 border-4 border-red-800 rounded-lg sm:px-40 sm:py-20 m-4"
      >
        <img src="../assets/img/perfiles.png" height="150" width="150" class="m-8" />
        <h1 class="text-gray-900 text-xl font-black font-mono">Revisar DTC</h1>
      </router-link>


      <router-link
        to="/Inventario"
        class="text-gray-700 hover:bg-gray-400 items-center text-center border-4 border-red-800 rounded-lg sm:px-40 sm:py-16 m-4"
      >
        <img src="../assets/img/inventario.png" height="150" width="150" class="m-8" />
        <h1 class="text-gray-900 text-xl font-black font-mono">Inventario Plaza</h1>
      </router-link>

      
      <router-link
        to="/Configuracion"
        class="text-gray-700 hover:bg-gray-400 items-center text-center border-4 border-red-800 rounded-lg sm:px-40 sm:py-16 m-4"
      >
        <img src="../assets/img/config.png" height="150" width="150" class="m-8" />
        <h1 class="text-gray-900 text-xl font-black font-mono">Configuración</h1>
      </router-link>
    </div>  
  </div>
</template>