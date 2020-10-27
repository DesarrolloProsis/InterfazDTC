<template>
  <div>
    <div class="flex justify-center mt-2 sm:mt-14">
      <div class>
        <div class="flex">
          <div class="border-black border-2 rounded-lg m-8 sm:m-4 sm:p-3 shadow-xl">
            <router-link to="/NuevoDtc" class="text-center cursor-pointer">
              <img src="../assets/img/nuevoDtc.png" height="200" width="200" class="m-10 sm:m-1" />
              <h1 class="text-gray-900 text-xl sm:text-sm font-black font-mono">Nuevo DTC</h1>
            </router-link>
          </div>
          <div class="border-black border-2 rounded-lg m-8 sm:m-4 sm:p-3 shadow-xl">
            <router-link to="/NuevoDTCLibre" class="text-center cursor-pointer">
              <img src="../assets/img/dtcLibre.png" height="200" width="200" class="m-10 sm:m-1" />
              <h1 class="text-gray-900 text-xl sm:text-sm font-black font-mono">Nuevo DTC Libre</h1>
            </router-link>
          </div>
          <div class="border-black border-2 rounded-lg m-8 sm:m-4 sm:p-3 shadow-xl">
            <router-link to="/ListarDTC" class="text-center cursor-pointer">
              <img src="../assets/img/perfiles.png" height="200" width="200" class="m-10 sm:m-1" />
              <h1 class="text-gray-900 text-xl sm:text-sm font-black font-mono">Revisar DTC</h1>
            </router-link>
          </div>
        </div>
        <div class="flex">
          <div class="border-black border-2 rounded-lg m-8 sm:m-4 sm:p-3 shadow-xl">
            <router-link to="/Inventario" class="text-center cursor-pointer">
              <img src="../assets/img/inventario.png" height="200" width="200" class="m-10 sm:m-1" />
              <h1 class="text-gray-900 text-xl sm:text-sm font-black font-mono">Inventario Plaza</h1>
            </router-link>
          </div>
          <div class="border-black border-2 rounded-lg m-8 sm:m-4 sm:p-3 shadow-xl">
            <router-link to="/Configuracion" class="text-center cursor-pointer">
              <img src="../assets/img/config.png" height="200" width="200" class="m-10 sm:m-1" />
              <h1 class="text-gray-900 text-xl sm:text-sm font-black font-mono">Configuración</h1>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
