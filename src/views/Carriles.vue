<template>
  <div>
    <Nav></Nav>

    <div class="flex flex-wrap justify-center sm:p-4 md:m-5 md:pl-48 md:pr-48">
      <div class="p-3 w-screen inline">
        <h1 class="text-center text-4xl text-blue-600 pt-10 font-mono mb-10">Informacion de Carriles</h1>

        <div class="mb-5 w-4/5flex-row flex-wrap m-0 flex mt-0 border p-3 justify-center">
          <select
            v-model="datos.Plaza"
            class="appearance-none border-2 border-gray-200 rounded py-2 px-32 md:py-2 md:px-48 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-600 m-3"
            type="text"
          >
            <option disabled value>Seleciona la Plaza</option>
            <option
              v-for="(plaza, index) in listaPlazas"
              v-bind:value="plaza.value"
              :key="index"
            >{{plaza.text}}</option>
          </select>

          <select
          v-model="datos.TipoCarril"
            class="appearance-none border-2 border-gray-200 rounded py-2 px-32 md:py-2 md:px-48 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-600 m-3"
            type="text"
          >
            <option disabled value>Tipo de Carril</option>
              <option
              v-for="(carril, index) in listaCarriles"
              v-bind:value="carril.value"
              :key="index"
            >{{carril.text}}</option>
            
          </select>

          <button
          @click="buscarCarriles()"
            class="shadow focus:shadow-outline focus:outline-none py-2 px-10 rounded m-3"
            type="button"
          >Buscar</button>

          <button
            @click="crearCarril()"
            class="shadow bg-green-500 focus:shadow-outline focus:outline-none py-2 px-12 m-3 rounded"
            type="button"
          >+</button>
        </div>
        <div class="overflow-x-scroll">
          <table class="w-full rounded-lg bg-scroll">
            <thead>
              <tr class="text-center">
                <th
                  class="bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-2 border-grey-light p-2 sm:p-2 md:p-4"
                >Numero Capufe</th>
                <th
                  class="bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-2 border-grey-light p-2 sm:p-2 md:p-4"
                >Id Gare</th>
                <th
                  class="bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-2 border-grey-light p-2 sm:p-2 md:p-4"
                >Lane</th>
                <th
                  class="bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-2 border-grey-light p-2 sm:p-2 md:p-4"
                >Tipo Carril</th>
                <th
                  class="bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-2 border-grey-light p-2 sm:p-2 md:p-4"
                >Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="hover:bg-gray-200 text-center"
                v-for="(carril, index) in carriles"
                :key="index"
              >
                <td class="border-b border-grey-light p-2 md:p-3 border-2">{{carril.capufeLaneNum}}</td>
                <td class="border-b border-grey-light p-2 md:p-3 border-2">{{carril.idGare}}</td>
                <td class="border-b border-grey-light p-2 md:p-3 border-2">{{carril.lane}}</td>
                <td class="border-b border-grey-light p-2 md:p-3 border-2">{{carril.typeCarril}}</td>
                <td class="border-b border-grey-light p-2 md:p-3 border-2">
                  <button
                    @click="editarCarril(carril)"
                    class="text-grey-lighter py-2 w-20 font-bold rounded text-xs bg-yellow-400 hover:bg-yellow-500 mb-1 md:mr-5"
                  >Editar</button>
                  <button
                    @click="eliminarCarril(carril)"
                    class="text-grey-lighter py-2 w-20 font-bold rounded text-xs bg-red-400 hover:bg-red-500"
                  >Eliminar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>    
  </div>
</template>

<script>
import Nav from "../components/Navbar";




export default {
  name: "Refacciones",
  components: {
    Nav
  },
  data() {
    return {
      datos: {
        Plaza: "",
        TipoCarril: ""
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
        {value: 1, text: "Express"},
        {value: 2, text: "Multimodal"},        
        {value: 3, text: "Reversible"},
        {value: 4, text: "Otro?"},

      ],
      nuevoCarrilBool: true,
      carriles: []
    };
  },
  computed:{

 

     
  },
  methods: {

   async buscarCarriles(){      

       
       await this.$store.dispatch("Carriles/buscarCarriles",this.datos);
       this.carriles = await this.$store.getters['Carriles/getListaCarriles'] 
       
       
            
    },
    editarCarril(item) {        

      let value = Object.assign({}, item)
        console.log("Editar")
        
        for(let i = 0; i < 2; i++){
            if(value.typeCarril == this.listaCarriles[i].text){
                value.typeCarril = this.listaCarriles[i].value
                console.log(value)
            }
        }

      this.$router.push({
        name: "CarrilesEditar",
        params: {
          object: value,
          
        }
      });
    },
    crearCarril() {
      this.$router.push("/Carriles/Nuevo");
    },
    async eliminarCarril(item){


       let value = Object.assign({}, item)
   
        for(let i = 0; i < 2; i++){
            if(value.typeCarril == this.listaCarriles[i].text){
                value.typeCarril = this.listaCarriles[i].value
                
            }
        }

        console.log(value)                      
        await this.$store.dispatch("Carriles/eliminarCarril",value);

    }
  }
};
</script>
