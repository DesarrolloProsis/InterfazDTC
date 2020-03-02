<template>
  <div>
    <Nav></Nav>
    <h1 class="text-center text-4xl text-blue-600 pt-10 font-mono mb-10">
      Cabecera del DTC
    </h1>

    <div class="flex flex-wrap sm:p-4 md:m-5 md:pl-48 md:pr-48">
      <div class="p-3 w-screen inline">
        <div
          class="mb-5 flex-row flex-wrap flex mt-0 border-2 border-black p-5 justify-center"
        >
          <!-- <select
            v-model="datos.year"
            class="appearance-none border-2 border-black rounded py-2 px-16 md:py-2 md:px-48 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-600 m-3"
            type="text"
          >
            <option disabled value>Seleciona el Año</option>
            <option
              v-for="(year, index) in listaYear"
              v-bind:value="year.value"
              :key="index"
              >{{ year.text }}</option
            >
          </select> -->

          <!-- <select
            v-model="datos.marca"
            class="appearance-none border-2 border-gray-200 rounded py-2 px-16 md:py-2 md:px-48 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-600 m-3"
            type="text"
          >
            <option disabled value>Seleciona la Marca</option>
            <option
              v-for="(marca, index) in listaMarca"
              v-bind:value="marca.value"
              :key="index"
              >{{ marca.text }}</option
            >
          </select> -->

          <button
            @click="buscarHeaders()"
            class="shadow bg-teal-500 focus:shadow-outline focus:outline-none py-2 px-10 rounded m-3"
            type="button"
          >
            Buscar
          </button>

          <button
            @click="crearHeader()"
            class="shadow bg-green-500 focus:shadow-outline focus:outline-none py-2 px-12 m-3 rounded"
            type="button"
          >
            Agregar
          </button>
        </div>

        <div class="overflow-x-scroll">
          <table class="w-full rounded-lg bg-scroll">
            <thead>
              <tr class="text-center">
              
                <th
                  class="bg-blue-500 font-bold uppercase text-sm text-grey-dark border-2 border-black p-2 sm:p-2 md:p-4"
                >
                  Id de Encabezado
                </th>
                <th
                  class="bg-blue-500 font-bold uppercase text-sm text-grey-dark border-2 border-black p-2 sm:p-2 md:p-4"
                >
                  Encargado
                </th>

  <!-- <th
                  class="bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-2 border-grey-light p-2 sm:p-2 md:p-4"
                >
                  Precio
                </th> -->

                <th
                  class="bg-blue-500 font-bold uppercase text-sm text-grey-dark border-2 border-black p-2 sm:p-2 md:p-4"
                >
                  Cargo
                </th>
         
                <th
                  class="bg-blue-500 font-bold uppercase text-sm text-grey-dark border-2 border-black p-2 sm:p-2 md:p-4"
                >
                  Correo
                </th>
                <th
                  class="bg-blue-500 font-bold uppercase text-sm text-grey-dark border-2 border-black p-2 sm:p-2 md:p-4"
                >Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="hover:bg-blue-200 text-center"
                v-for="(header, index) in listaHeaders"
                :key="index"
              >          
                <td class="border-b border-black p-2 md:p-3 border-2">
                  {{ header.dtcHeaderId }}
                </td>                
                <td class="border-b border-black p-2 md:p-3 border-2">
                  {{ header.managerName }}
                </td>  
                 <td class="border-b border-black p-2 md:p-3 border-2">
                  {{ header.position }}
                </td>      
                <td class="border-b border-black p-2 md:p-3 border-2">
                  {{ header.mail }}
                </td>    
                <!-- <td v-if="inventario.status == false"  class="border-b border-black p-2 md:p-3 border-2">
                  {{ "Almacen" }}
                </td>
                  <td v-else  class="border-b border-black p-2 md:p-3 border-2">
                  {{ "Ocupado" }}
                </td> -->
                <td class="border-b border-black  md:p-3 border-2">
                  <!-- <button
                    @click="editarRefaccion(header)"
                    class="text-grey-lighter py-2 w-20 font-bold rounded text-xs bg-yellow-400 hover:bg-yellow-500 mb-2 md:mr-2"
                  >
                    Editar
                  </button> -->
                  <button
                    @click="eliminarHeaders(header)"
                    class="text-grey-lighter py-2 w-20 font-bold rounded text-xs bg-red-400 hover:bg-red-500"
                  >
                    Eliminar
                  </button>
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
  name: "header",
  components: {
    Nav
  },
  data() {
    return {
      datos: {
      },
      listaHeaders: []
    };
  },

  methods: {
    async buscarHeaders() {
           
       await this.$store.dispatch("Header/buscarHeaders",this.datos)
       this.listaHeaders = await this.$store.getters['Login/getUser'] 
       
    },
    // editarRefaccion(value) {
    //   let item = Object.assign({}, value);

      
      
    // console.log(item)
      
    //   this.$router.push({
    //     name: "InventarioEditar",
    //     params: {
    //       object: item
    //     }
    //   });

    // },
    crearHeader() {
      this.$router.push("/Header/Nuevo");
    },
    async eliminarHeaders(value) {
        console.log(value)
        await this.$store.dispatch("Header/eliminarHeaders",value);
    }
  }
};
</script>
