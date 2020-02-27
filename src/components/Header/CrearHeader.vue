<template>
  <div>
    
    <Nav></Nav>

    <div class="m-5">
      <form class="flex flex-wrap md:ml-10 md:mr-10 justify-center md:p-16 md:pt-0">
        <div
          class="shadow-md rounded md:border border-black p-5 md:p-24 mt-0 w-full sm:screen flex flex-col flex-wrap my-2"
        >
          <h1 class="text-center text-4xl text-blue-600 font-mono text-lg mb-10">Crear Nuevo Encabezado</h1>

          <!-- Primeros dos input  -->
          <div class="-mx-3 w-full sm:screen md:flex mb-6">
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="input-Convenio"
              >Id de Encabezado</label>
              <input
                v-model="datos.DTCHeaderId"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
                id="input-Convenio"                                                
                placeholder="H-1234"
              />
            </div>

            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="input-Convenio"
              >Numero de Convenio</label>
              <input
                v-model="datos.AgreementNum"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
                id="input-Convenio"                                                
                placeholder="4475896"
              />
            </div>

            <div class="md:w-1/2 px-3">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-last-name"
              >Nombre del Encargado</label>
              <input
                v-model="datos.ManagerName"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
                id="grid-last-name"
                type="text"
                placeholder="Juan Perez"
              />
            </div>



          </div>

 <div class="-mx-3 w-full sm:screen md:flex mb-6">
              <div class="md:w-1/2 px-3">
                <label
                  class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  for="grid-last-name"
                  >Cargo</label>
              <input
                v-model="datos.Position"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
                id="grid-last-name"
                type="text"
                placeholder="Cargo en la empresa"
              />
            </div>
            <div class="md:w-1/2 px-3">
                <label
                  class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  for="grid-last-name"
                  >Correo Electronico</label>
              <input
                v-model="datos.Mail"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
                id="grid-last-name"
                type="text"
                placeholder="Email"
              />
            </div>
            
            <!-- <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="input-Convenio"
              >Tipo de Carril</label>
              <select
              v-model="datos.LaneType"
                class="appearance-none border-2 border-gray-200 rounded text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-600 py-2 mb-3 w-full"
                id="input-Convenio"
                type="text"
                placeholder="Tipo de Carril"
              >
             <option disabled value>Tipo de Carril</option>
              <option
              v-for="(carril, index) in listaCarriles"
              v-bind:value="carril.value"
              :key="index"
            >{{carril.text}}</option>
              </select>
            </div> -->

            <!-- <div class="md:w-1/2 px-3">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-last-name"
              >Plaza</label>
              <select
                @change="cambiarIdGare()"
                v-model="datos.SquaresCatalogId"
                class="appearance-none border-2 border-gray-200 rounded text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-600 py-2 mb-3 w-full"
                id="grid-last-name"                                
              >
                    <option disabled value>Seleciona la Plaza</option>
            <option              
              v-for="(plaza, index) in listaPlazas"
              v-bind:value="plaza.value"
              :key="index"
            >{{plaza.text}}</option>
              </select>
            </div> -->


               <button
          @click="crearHeaders()"
            class="shadow bg-green-500 focus:shadow-outline focus:outline-none ml-0 px-32 py-2 md:px-40 m-3 rounded"
            type="button"
          >Agregar</button>



          </div>                   
        </div>
      </form>
    </div>
  </div>
</template>

<script>

import Nav from "../Navbar.vue"

export default {
  name: "CrearPlazas",
  components: {
    Nav
  },
  data() {
    return {
      datos: {
        DTCHeaderId: '',
        AgreementNum: '',
        ManagerName: '',
        Position: '',
        Mail: ''
      },
    };
  },
  watch:{


  },
  methods: {

    crearHeaders() {
      this.$store.dispatch("Header/crearHeaders", this.datos);
        this.$router.push("/Header/");
    }
  }
};
</script>
