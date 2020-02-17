<template>
  <div>
    
<Nav></Nav>

    <div class="m-5">
      <form class="flex flex-wrap md:ml-10 md:mr-10 justify-center md:p-16 md:pt-0">
        <div
          class="shadow-md rounded md:border border-grey-light p-5 md:p-24 mt-0 w-full sm:screen flex flex-col flex-wrap my-2"
        >
          <h1 class="text-center text-4xl text-blue-600 font-mono text-lg mb-10">Nuevo Carril</h1>

          <!-- Primeros dos input  -->
          <div class="-mx-3 w-full sm:screen md:flex mb-6">
            <div class="md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="input-Convenio"
              >Numero Capufe</label>
              <input
                v-model="datos.CapufeLaneNum"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
                id="input-Convenio"                                                
                placeholder="Numero Capufe"
              />
            </div>

            <div class="md:w-1/3 px-3">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-last-name"
              >Lane</label>
              <input
                v-model="datos.Lane"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
                id="grid-last-name"
                type="text"
                placeholder="Lane"
              />
            </div>


               <div class="md:w-1/3 px-3">
                 <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-last-name"
              >Id Gare</label>
             <select
              v-model="datos.IdGare"
                class="appearance-none border-2 border-gray-200 rounded text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-600 py-2 mb-3 w-full"
                id="input-Convenio"
                type="text"
                placeholder="Tipo de Carril"
              >
             <option disabled value>Numero de Tramo</option>
              <option
              v-for="(gare, index) in listaGare"
              v-bind:value="gare.id"
              :key="index"
            >{{gare.nombreTramo}}</option>
              </select>
            </div>
          </div>

 <div class="-mx-3 w-full sm:screen md:flex mb-6">
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
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
            </div>

            <div class="md:w-1/2 px-3">
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
            </div>

               <button
          @click="crearCarriles()"
            class="shadow bg-green-500 focus:shadow-outline focus:outline-none ml-0 px-32 py-2 md:px-40 m-3 rounded"
            type="button"
          >Crear</button>



          </div>                   
        </div>
      </form>
    </div>
  </div>
</template>

<script>

import Nav from "../components/Navbar"
import ListaIdGare from "../assets/static/idGare.json"

export default {
  name: "CrearCarriles",
  components: {
    Nav
  },
  data() {
    return {
      datos: {

        CapufeLaneNum: '',
        Lane: '',
        IdGare: '',
        LaneType: '',
        SquaresCatalogId: '',
        DTCTechnical: {}

      },
      listaPlazas: [        
        { value: "004", text: "Tepotzotlan" },                
        { value: "005", text: "Palmillas" },
        { value: "006", text: "Queretaro" },
        { value: "041", text: "Salamanca" },
        { value: "061", text: "Libramiento" },
        { value: "127", text: "Chichimequillas" },
        { value: "183", text: "Villagrand" },
        { value: "186", text: "Cerro Gordo" },
      ],
      listaCarriles: [
        {value: 1, text: "Expres"},
        {value: 2, text: "Multimodal"},        
        {value: 3, text: "Reversible"},
        {value: 4, text: "Otro?"},
      ],
      listaGare: [           
      ]
    };
  },
  watch:{


  },
  methods: {

    cambiarIdGare(){


   
      let lista = ListaIdGare["listaIdGare"]
      

      for(let i = 0; i < this.listaPlazas.length; i ++){

          if(lista[i]["numPlaza"] == this.datos.SquaresCatalogId){
          console.log(lista[i]["idGare"])
          this.listaGare = Object.assign({}, lista[i]["idGare"])
          }
      }        

    },

   async crearCarriles(){            
     await this.$store.dispatch("Carriles/crearCarril",this.datos)            
      this.$router.push('/Carriles/')
    }
  }
};
</script>
