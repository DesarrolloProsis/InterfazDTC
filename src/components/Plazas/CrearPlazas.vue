<template>
  <div>
    
    <Nav></Nav>

    <div class="m-5">
      <form class="flex flex-wrap md:ml-10 md:mr-10 justify-center md:p-16 md:pt-0">
        <div
          class="shadow-md rounded md:border border-black p-5 md:p-24 mt-0 w-full sm:screen flex flex-col flex-wrap my-2"
        >
          <h1 class="text-center text-4xl text-blue-600 font-mono text-lg mb-10">Agregar Nueva Plaza</h1>

          <!-- Primeros dos input  -->
          <div class="-mx-3 w-full sm:screen md:flex mb-6">
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="input-Convenio"
              >Numero Plaza</label>
              <input
                v-model="datos.SquareNum"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
                id="input-Convenio"                                                
                placeholder="Numero Plaza"
              />
            </div>

            <div class="md:w-1/2 px-3">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-last-name"
              >Nombre de Plaza</label>
              <input
                v-model="datos.SquareName"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
                id="grid-last-name"
                type="text"
                placeholder="Nombre Plaza"
              />
            </div>



          </div>

 <div class="-mx-3 w-full sm:screen md:flex mb-6">
              <div class="md:w-1/2 px-3">
                <label
                  class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  for="grid-last-name"
                  >Delegacion</label>
              <input
                v-model="datos.Delegation"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
                id="grid-last-name"
                type="text"
                placeholder="Nombre Plaza"
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
          @click="crearPlaza()"
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
        SquareNum: '',
        SquareName: '',
        Delegation: ''
      },
    };
  },
  watch:{


  },
  methods: {

 async crearPlaza(){            
     await this.$store.dispatch("Plazas/crearPlaza",this.datos)            
      this.$router.push('/Plazas/')
      console.log(this.datos)
    }
  }
};
</script>
