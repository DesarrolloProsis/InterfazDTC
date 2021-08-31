<template>
  <div>    
    <transition name="slide-fade">
    <div class="flex justify-center mt-12 mb-12 sm:mt-6 md:mt-2 xl:mt-1" v-if="acultarPrimerosBotones">
      <div class>
        <div class="grid grid-cols-2 sm:mt-4">
          <div class="Home animacion sm:m-4 sm:p-3 sm:botonesCorrectivo sm:h-56" v-if="typeUser == 7 || typeUser == 1 ||typeUser == 2 || typeUser == 3 || typeUser == 4 || typeUser == 5 || typeUser == 10">
            <router-link :to="`home/${typeUser}/preventivo`" class="text-center">
              <img src="../assets/img/wrench.png" height="200" width="200" class="m-10 mt-6 mb-6 sm:m-1 sm:mt-2 sm:mb-4 md:mt-6 md:mb-6"/>
              <h1 class="text-gray-900 text-xl sm:text-sm font-titulo font-medium sm:-mt-2">Mantenimiento</h1>
              <h1 class="text-gray-900 text-xl sm:text-sm font-titulo font-medium sm:-mt-2">Preventivo</h1>
            </router-link>
          </div>
          <div class="Home animacion sm:m-4 sm:p-3 sm:botonesCorrectivo sm:h-56">
            <router-link :to="`home/${typeUser}/correctivo`" class="text-center">
              <img src="../assets/img/mantenimientoCorrectivo.png" height="200" width="200" class="m-10 mt-6 mb-6 sm:m-1 sm:-mt-1 sm:mb-4 md:mt-6 md:mb-6"/>
              <p class="text-gray-900 text-xl sm:text-sm font-titulo font-medium">Mantenimiento</p>
              <p class="text-gray-900 text-xl sm:text-sm font-titulo font-medium">Correctivo</p>
            </router-link>
          </div>
          <div class="Home animacion sm:m-4 sm:p-3 sm:mb-16 sm:botonesCorrectivo sm:h-56">
            <router-link to="/Configuracion" class="text-center cursor-pointer">
              <img src="../assets/img/engranajes.png" height="200" width="200" class="m-10 mt-6 mb-6 sm:m-1 sm:mt-4 sm:mb-4 md:mt-6 md:mb-6"/>
              <h1 class="text-gray-900 text-xl sm:text-sm font-titulo font-medium">Configuración</h1>
            </router-link>
          </div> 
          <div class="Home animacion sm:m-4 sm:p-3 sm:mb-16 sm:botonesCorrectivo sm:h-56">
            <router-link to="/Ayuda" class="text-center cursor-pointer">
              <img src="../assets/img/ayuda.png" height="200" width="200" class="m-10 mt-6 mb-6 sm:m-1 sm:mt-4 sm:mb-4 md:mt-6 md:mb-6"/>
              <h1 class="text-gray-900 text-xl sm:text-sm font-titulo font-medium">Ayuda</h1>
            </router-link>
          </div> 
        </div>       
      </div>
    </div>
    </transition>
    <transition name="slide-fade">
      <router-view></router-view>
    </transition> 
  </div>
</template>

<script>
export default {
  name: "home",
  data: function(){
    return {
        typeUser: '',   
        acultarPrimerosBotones: true,     
      }
  },
  beforeMount: function(){
    this.typeUser = this.$store.state.Login.cookiesUser.rollId    
  },
};
</script>

<style scoped>
  body {
    margin: 0%;
  }

</style>
