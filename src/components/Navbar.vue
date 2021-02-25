<template>
  <div>
    <nav class="flex justify-between bg-blue-900 p-3" id="nav">
      <div class="text-lg">
        <router-link to="/home" class="inline-block pl-5 pt-1 text-white text-xl">
          <img src="../assets/img/logoProsis.png" height="30" width="30" class="inline" />
          Inicio
        </router-link>     
      </div>
      <div class="flex sm:mt-4">        
        <p class="sm:ml-6 mt-2 text-white inline-block sm:text-sm">Bienvenido: {{nameUser}}</p>
        <router-link
          to="/"
          class="inline-block ml-2 px-8 py-2 text-white text-xl leading-none rounded-lg border-black hover:border-black hover:text-black hover:bg-red-700"
        >Salir</router-link>
      </div>
    </nav>
  </div>
</template>


<script>
export default {
  data: function () {
    return {
      nameUser: "",
    };
  },

  beforeMount: function () {
    this.nameUser = this.$store.getters["Header/GET_HEADER_SELECCIONADO"].nombre;    
  },
};
</script>
<style >

</style>