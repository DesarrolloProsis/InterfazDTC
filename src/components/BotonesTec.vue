<template>
  <div>
    <div
      class="flex items-stretch flex-wrap justify-center xl:flex-row lg:flex-col md:flex-col sm:flex-col lg:mt-3 xl:mt-32"
    >
      <router-link
        to="/about"
        class="text-gray-700 text-center items-center hover:bg-gray-400 border-4 border-red-700 rounded-lg sm:px-64 sm:py-32 m-8"
      >
        <img src="../assets/img/perfiles.png" height="200" width="200" class="m-8" />
        Revisar DTC
      </router-link>

      <router-link
        to="/NuevoDtc"
        class="text-gray-700 hover:bg-gray-400 items-center text-center border-4 border-red-700 rounded-lg sm:px-64 sm:py-32 m-8"
      >
        <img src="../assets/img/nuevoDtc.png" height="200" width="200" class="m-8" />
        Crear DTC
      </router-link>
    </div>
  </div>
</template>