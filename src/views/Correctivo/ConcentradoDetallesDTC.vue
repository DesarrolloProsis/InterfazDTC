<template>
  <div class="relative">
    <Nav></Nav>
    <h1 class="text-black text-center text-4xl mt-3 sm:mb-1">Detalles DTC</h1>

      <div class="flex border border-gray-400 shadow-lg rounded-md m-4">
        <div class="m-10 mt-3 sm:m-1 text-base font-light text-gray-900">
          <div class="m-5 sm:mr-0">
            <p class="mb-1">Referencia</p>
            <p class="text-lg font-semibold"></p>       
          </div>
          <div class="m-5 sm:mr-0">
            <p class="mb-1">Fecha Siniestro</p>
            <p class="text-lg font-semibold"></p>        
          </div>
          <div class="m-5 sm:mr-0">
            <p class="mb-1">N° Siniestro:</p>
            <p class="text-lg font-semibold"></p>
          </div>
          <div class="m-5 sm:mr-0">
            <p class="mb-1">N° Modelo:</p>
            <p class="text-lg font-semibold"></p>
          </div>
          <div class="m-5 sm:mr-0">
            <p class="mb-1">Folio:</p>
            <p class="text-lg font-semibold"></p>
          </div>        
          <div class="m-5 sm:mr-0">
            <p class="mb-1">Observaciones:</p>
            <p class="text-lg font-semibold"></p>
          </div>
        </div>
        <!--///////////////////////////////////////////////////////////////////
          ////                     COLUMNA DERECHA                        ////
          ////////////////////////////////////////////////////////////////////-->
        <div class="m-10 mt-3 sm:m-1 sm:text-sm text-base font-light text-gray-900 sm:mb-6" >
          <div class="m-5 sm:ml-10">
            <p class="mb-1">Fecha de Instalacion</p>
            <p class="text-lg font-semibold"></p>
          </div>
          <div class="m-5 sm:ml-10">
            <p class="mb-1">Fecha Ultimo Mantenimiento</p>
            <p class="text-lg font-semibold"></p>
          </div>
          <div class="m-5 sm:ml-10">
            <p>Folio Ultimo Mantenimiento</p>
            <p class="text-lg font-semibold"></p>
          </div>
          <div class="m-5 sm:ml-10">
            <p class="mb-1">No. Inventario CAPUFE</p>
            <p class="text-lg font-semibold"></p>
          </div>
          <div class="m-5 sm:ml-10">
            <p class="mb-1">No. Inventario Prosis</p>
            <p class="text-lg font-semibold"></p>
          </div>
          <div class="m-5 sm:ml-10">
            <p class="mb-1">Ubicacion</p>
            <p class="text-lg font-semibold"></p>
          </div>
          <div class="flex justify-center mt-5 sm:ml-5 sm:text-xs" v-if="tipoUsuario != 7">
            <button
              @click="Regresar()" 
              class="botonIconNext">
              <img src="../../assets/img/deshacer.png" class="mr-2" width="25" height="2" />
              <span>Atrás</span>
            </button>
          </div>
        </div>
      </div>

  </div>
</template>

<script>
import Nav from "../../components/Navbar";

export default {
  name: "EditarComponente",
  components: {
    Nav,
  },
    methods:{
    Regresar: function (){
        console.log("Mostar Más")
        this.$router.push({
        path: "/ConcentradoDTC"
        });
    }
}
}
</script>

<style>

</style>