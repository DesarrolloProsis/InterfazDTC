<template>
  <div>
    <Nav></Nav>
    <div class="flex justify-center mt-10 sm:mt-14" v-if="acultarPrimerosBotones">
      <div class>
        <div class="flex">
          <div class="border-black border-2 rounded-lg m-8 sm:m-4 sm:p-3 shadow-xl h-73 sm:h-66">
            <router-link :to="`home/${typeUser}/preventivo`" class="text-center">
              <img src="../assets/img/mantenimientoPreventivo.png" height="200" width="200" class="m-10 mt-32 mb-32 sm:m-1 sm:mt-12 sm:mb-12"/>
              <h1 class="text-gray-900 text-xl sm:text-sm font-black font-mono">Mantenimineto</h1>
              <h1 class="text-gray-900 text-xl sm:text-sm font-black font-mono">Preventivo</h1>
            </router-link>
          </div>
          <div class="border-black border-2 rounded-lg m-8 sm:m-4 sm:p-3 shadow-xl h-73 sm:h-66">
            <router-link :to="`home/${typeUser}/correctivo`" class="text-center">
              <img src="../assets/img/mantenimientoCorrectivo.png" height="200" width="200" class="m-10 mt-32 mb-32 sm:m-1 sm:mt-12 sm:mb-12"/>
              <p class="text-gray-900 text-xl sm:text-sm font-black font-mono">Mantenimiento</p>
              <p class="text-gray-900 text-xl sm:text-sm font-black font-mono">Correctivo</p>
            </router-link>
          </div>
        </div>       
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Nav from "../components/Navbar";
import { mapGetters } from 'vuex'
export default {
  name: "home",
  components: {
    Nav,        
  },
  data: function(){
    return {
        typeUser: '',   
        acultarPrimerosBotones: true,     
      }
  },
  beforeMount: function(){
    this.typeUser = this.$store.getters['Login/getTypeUser']        
    
  },
  methods: {
    rutas(){
      
    }
  },
  computed: {
    ...mapGetters({getReferenceSquareActual: 'Login/getReferenceSquareActual'}),   
  }
};
</script>
