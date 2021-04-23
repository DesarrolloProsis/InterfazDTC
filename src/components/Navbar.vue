<template>
  <div>
    <nav class="flex justify-between bg-blue-800 p-3" id="nav" v-if="$route != undefined && $route.name != 'login'">
      <div class="text-lg">
        <router-link to="/home" class="inline-block pl-5 pt-1 text-white text-xl">
          <img src="../assets/img/logoProsis.png" height="30" width="30" class="inline" />
          Inicio          
        </router-link>     
      </div>      
      <div class="flex sm:mt-4">        
        <p v-if="nombreUsuario != undefined" class="sm:ml-6 mt-2 text-white inline-block sm:text-sm">Bienvenido: {{ nombreUsuario }}</p>
        <div class="group inline-block">
          <button class="bg-white rounded-lg flex items-center w-10 mt-3 ml-4 mr-0">
            <span>
              <svg class="fill-current h-4 w-4 transform group-hover:-rotate-180 transition duration-150 ease-in-out ml-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </span>
          </button>
          <ul class="bg-white border rounded-lg transform scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top min-w-32 -ml-16">
            <!--Técnicos -->
            <router-link to="/NuevoDtc"><li class="rounded-sm px-3 py-1 hover:bg-gray-100" v-if="rollUsuario == '1'">Nuevo DTC</li></router-link>
            <router-link to="/ListarDTC"><li class="rounded-sm px-3 py-1 hover:bg-gray-100" v-if="rollUsuario == '1'">DTC Pendiente</li></router-link>
            <router-link to="/CalendarioActividades"><li class="rounded-sm px-3 py-1 hover:bg-gray-100" v-if="rollUsuario == '1'">Calendario</li></router-link>
            <router-link to="/Configuracion"><li class="rounded-sm px-3 py-1 hover:bg-gray-100" v-if="rollUsuario == '1'">Configuración</li></router-link> 
            <!--Admin-->
            <router-link to="/ListarDTC"><li class="rounded-sm px-3 py-1 hover:bg-gray-100" v-if="rollUsuario == '4'">Revisar DTC</li></router-link>
            <router-link to="/ConcentradoDTC"><li class="rounded-sm px-3 py-1 hover:bg-gray-100" v-if="rollUsuario == '4'">Auto. GMMEP</li></router-link>
            <router-link to="/CalendarioHistorico"><li class="rounded-sm px-3 py-1 hover:bg-gray-100" v-if="rollUsuario == '4'">Calendario Historico</li></router-link>
            <!-- CAPUFE -->            
            <router-link to="/ListarDTC"><li class="rounded-sm px-3 py-1 hover:bg-gray-100" v-if="rollUsuario == '7'">Revisar DTC</li></router-link>
            <router-link to="/Inventario"><li class="rounded-sm px-3 py-1 hover:bg-gray-100" v-if="rollUsuario == '7'">Inventario</li></router-link>
            <router-link to="/ConcentradoDTC"><li class="rounded-sm px-3 py-1 hover:bg-gray-100" v-if="rollUsuario == '7'">Auto. GMMEP</li></router-link>
            <router-link to="/CalendarioHistorico"><li class="rounded-sm px-3 py-1 hover:bg-gray-100" v-if="rollUsuario == '7'">Calendario Historico</li></router-link>
            <!-- Desarrollo -->
            <router-link to="/NuevoDtc"><li class="rounded-sm px-3 py-1 hover:bg-gray-100" v-if="rollUsuario == '10'">Nuevo DTC</li></router-link>
            <router-link to="/ListarDTC"><li class="rounded-sm px-3 py-1 hover:bg-gray-100" v-if="rollUsuario == '10'">DTC Pendiente</li></router-link>
            <router-link to="/ConcentradoDTC"><li class="rounded-sm px-3 py-1 hover:bg-gray-100" v-if="rollUsuario == '10'">Auto. GMMEP</li></router-link>
            <router-link to="/Inventario"><li class="rounded-sm px-3 py-1 hover:bg-gray-100" v-if="rollUsuario == '10'">Inventario</li></router-link>
            <router-link to="/Configuracion"><li class="rounded-sm px-3 py-1 hover:bg-gray-100" v-if="rollUsuario == '10'">Configuración</li></router-link>
          </ul>
        </div>
        <router-link to="/" class="inline-block ml-2 mr-2 px-8 py-2 text-white text-xl leading-none rounded-lg border-black hover:border-black hover:text-white hover:bg-red-700">Salir</router-link>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  name: 'NavBar',
  data(){
    return{
      //rollUsuario: this.$store.state.Login.cookiesUser.rollId,
      //nombreUsuario: this.$store.state.Login.cookiesUser.nombreUsuario
    }
  }, 
  computed:{
    rollUsuario(){
      return this.$store.state.Login.cookiesUser.rollId
    },
    nombreUsuario(){
      return this.$store.state.Login.cookiesUser.nombreUsuario
    }

  }     
};
</script>
<style >
  li>ul { transform: translatex(100%) scale(0) }
  li:hover>ul { transform: translatex(101%) scale(1) }
  li > button svg { transform: rotate(-90deg) }
  li:hover > button svg { transform: rotate(-270deg) }
  .group:hover .group-hover\:scale-100 { transform: scale(1) }
  .group:hover .group-hover\:-rotate-180 { transform: rotate(180deg) }
  .scale-0 { transform: scale(0) }
  .min-w-32 { min-width: 8rem }
</style>