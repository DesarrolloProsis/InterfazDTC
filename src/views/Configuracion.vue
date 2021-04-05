<template>
  <div>    
    <div class="flex justify-center mt-2 sm:mt-14">
      <div class="grid grid-cols-2"> 
        <div class="border-gray-200 border-2 rounded-lg m-8 sm:m-4 sm:p-3 shadow-xl hover:bg-gray-400 animacion">
          <router-link to="/EncargadosPlaza" class="text-center cursor-pointer">
            <img src="../assets/img/encargado.png" height="200" width="200" class="m-10 sm:m-1" />
            <h1 class="text-gray-900 text-xl sm:text-sm font-black font-mono">Encargados de Plaza</h1>
          </router-link>
        </div>
        <div class="border-gray-200 border-2 rounded-lg m-8 sm:m-4 sm:p-3 shadow-xl hover:bg-gray-400 animacion">
          <router-link to="/Usuarios" class="text-center cursor-pointer">
            <img src="../assets/img/customer.png" height="200" width="200" class="m-10 sm:m-1" />
            <h1 class="text-gray-900 text-xl sm:text-sm font-black font-mono">Usuarios de Bitacora</h1>
          </router-link>
        </div>
      </div>
    </div>  
  </div>
</template>

<script>
export default {
  
}
</script>
