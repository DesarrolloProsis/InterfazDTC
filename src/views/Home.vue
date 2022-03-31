<template>
  <div class="w-full h-full">    
    <transition name="slide-fade">
    <div class="flex justify-center sm:mt-6 md:mt-2 xl:mt-1" v-if="acultarPrimerosBotones">
      <div class>
        <div class="grid grid-cols-2 mx-auto mt-12 lg:grid-cols-2 lg:-mt-10 sm:grid-cols-1 md:grid-cols-2 md:my-auto sm:mt-4" :class="{'mx-auto my-30':typeUser == 7}">
          <div class="Home animacion bg-blue-100 border-0 border-l-8 border-blue-800 sm:m-4 sm:p-3 sm:botonesCorrectivo sm:-mt-6 sm:h-56" v-if="typeUser == 7 || typeUser == 1 ||typeUser == 2 || typeUser == 3 || typeUser == 4 || typeUser == 5 || typeUser == 10">
            <router-link :to="`home/${typeUser}/preventivo`" class="text-center">
              <!-- <img src="../assets/img/wrench.png" height="200" width="200" class="m-10 mt-6 mb-6 sm:m-1 sm:mt-2 sm:mb-4 md:mt-6 md:mb-6"/> -->
                  <font-awesome-icon icon="fa-solid fa-toolbox" class="text-blue-800 w-37 h-37 mx-20 mt-6"/>
                  <h1 class="text-blue-800 text-2xl sm:text-sm font-titulo font-bold sm:-mt-2">Mantenimiento</h1>
                  <h1 class="text-blue-800 text-2xl sm:text-sm font-titulo font-bold sm:-mt-2">Preventivo</h1>
            </router-link>
          </div>
          <div class="Home animacion bg-green-100 border-0 border-l-8 border-green-500 sm:m-4 sm:p-3 sm:botonesCorrectivo sm:h-56">
            <router-link :to="`home/${typeUser}/correctivo`" class="text-center">
              <!-- <img src="../assets/img/mantenimientoCorrectivo.png" height="200" width="200" class="m-10 mt-6 mb-6 sm:m-1 sm:-mt-1 sm:mb-4 md:mt-6 md:mb-6"/> -->
              <font-awesome-icon icon="fa-solid fa-screwdriver-wrench" class="text-blue-800 w-37 h-37 mx-20 mt-6"/>
              <p class="text-blue-800 text-2xl sm:text-sm font-titulo font-bold">Mantenimiento</p>
              <p class="text-blue-800 text-2xl sm:text-sm font-titulo font-bold">Correctivo</p>
            </router-link>
          </div>
          <div class="Home animacion bg-red-100 border-0 border-l-8 border-red-500 sm:m-4 sm:p-3 sm:mb-16 sm:botonesCorrectivo sm:h-56" v-if="typeUser != 7">
            <router-link to="/Configuracion" class="text-center cursor-pointer">
              <!-- <img src="../assets/img/engranajes.png" height="200" width="200" class="m-10 mt-6 mb-6 sm:m-1 sm:mt-4 sm:mb-4 md:mt-6 md:mb-6"/> -->
              <font-awesome-icon icon="fa-solid fa-gears" class="text-blue-800 w-37 h-37 mx-20 mt-10" />
              <h1 class="text-blue-800 text-2xl sm:text-sm font-titulo font-bold">Configuración</h1>
            </router-link>
          </div> 
          <div class="Home animacion  bg-yellow-100 border-0 border-l-8 border-yellow-500 sm:-mt-8 sm:m-4 sm:p-3 sm:mb-10 sm:botonesCorrectivo sm:h-56" v-if="typeUser != 7">
            <router-link to="/Ayuda" class="text-center cursor-pointer">
              <!-- <img src="../assets/img/ayuda.png" height="200" width="200" class="m-10 mt-6 mb-6 sm:m-1 sm:mt-4 sm:mb-4 md:mt-6 md:mb-6"/> -->
              <font-awesome-icon icon="fa-regular fa-circle-question" class="text-blue-800 w-37 h-37 mx-20 mt-10" />
              <h1 class="text-blue-800 text-2xl sm:text-sm font-titulo font-bold">Ayuda</h1>
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
  created: function(){
    document.querySelector('body').classList.remove('overflow-hidden'); 
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
