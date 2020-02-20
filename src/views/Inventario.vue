<template>
  <div>
    <Nav></Nav>
    <h1 class="text-center text-4xl text-blue-600 pt-10 font-mono mb-10">
      Inventario
    </h1>

    <div class="flex flex-wrap sm:p-4 md:m-5 md:pl-48 md:pr-48">
      <div class="p-3 w-screen inline">
        <div
          class="mb-5 flex-row flex-wrap flex mt-0 border p-5 justify-center"
        >
          <select
            v-model="datos.year"
            class="appearance-none border-2 border-gray-200 rounded py-2 px-16 md:py-2 md:px-48 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-600 m-3"
            type="text"
          >
            <option disabled value>Seleciona el Año</option>
            <option
              v-for="(year, index) in listaYear"
              v-bind:value="year.value"
              :key="index"
              >{{ year.text }}</option
            >
          </select>

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
            @click="buscarRefacciones()"
            class="shadow focus:shadow-outline focus:outline-none py-2 px-10 rounded m-3"
            type="button"
          >
            Buscar
          </button>

          <button
            @click="crearRefaccion()"
            class="shadow bg-green-500 focus:shadow-outline focus:outline-none py-2 px-12 m-3 rounded"
            type="button"
          >
            +
          </button>
        </div>

        <div class="overflow-x-scroll">
          <table class="w-full rounded-lg bg-scroll">
            <thead>
              <tr class="text-center">
              
                <th
                  class="bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-2 border-grey-light p-2 sm:p-2 md:p-4"
                >
                  Numero de Parte
                </th>
                <th
                  class="bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-2 border-grey-light p-2 sm:p-2 md:p-4"
                >
                  Nombre
                </th>

  <!-- <th
                  class="bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-2 border-grey-light p-2 sm:p-2 md:p-4"
                >
                  Precio
                </th> -->

                <th
                  class="bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-2 border-grey-light p-2 sm:p-2 md:p-4"
                >
                  Status
                </th>
         
                <th
                  class="bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-2 border-grey-light p-2 sm:p-2 md:p-4"
                >
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="hover:bg-gray-200 text-center"
                v-for="(inventario, index) in listaInventario"
                :key="index"
              >          
                <td class="border-b border-grey-light p-2 md:p-3 border-2">
                  {{ inventario.numPart }}
                </td>                
                <td class="border-b border-grey-light p-2 md:p-3 border-2">
                  {{ inventario.name }}
                </td>  
                 <!-- <td class="border-b border-grey-light p-2 md:p-3 border-2">
                  {{ '$' + inventario.price }}
                </td>       -->
                <td v-if="inventario.status == false"  class="border-b border-grey-light p-2 md:p-3 border-2">
                  {{ "Almacen" }}
                </td>
                  <td v-else  class="border-b border-grey-light p-2 md:p-3 border-2">
                  {{ "Ocupado" }}
                </td>
                <td class="border-b border-grey-light  md:p-3 border-2">
                  <button
                    @click="editarRefaccion(inventario)"
                    class="text-grey-lighter py-2 w-20 font-bold rounded text-xs bg-yellow-400 hover:bg-yellow-500 mb-2 md:mr-2"
                  >
                    Editar
                  </button>
                  <button
                    @click="eliminarRefaccion(inventario)"
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
  name: "Refacciones",
  components: {
    Nav
  },
  data() {
    return {
      datos: {
        year: "",
        marca: ""
      },

      listaYear: [
        { value: "2020", text: "2020" },
        { value: "2019", text: "2019" },
        { value: "2018", text: "2018" }
    ],
      listaServicio: [
        { value: "01", text: "Reparacion" },
        { value: "02", text: "Cambios" }
      ],
      listaMarca: [
       { value: "GEA", text: "GEA" },
        { value: "Prosis", text: "Prosis" },
        { value: "LBA", text: "LBA" },
        { value: "TATTILE", text: "TATTILE" },
        { value: "SIQURA", text: "SIQURA" },
        { value: "HP", text: "HP" },
        { value: "LACROIX", text: "LACROIX" },
        { value: "IPRONET", text: "IPRONET" },
        { value: "KINGSTON", text: "KINGSTON" },
        { value: "SIRIT", text: "SIRIT" },
        { value: "EARTHRON", text: "EARTHRON" },
        { value: "TOSHIBA", text: "TOSHIBA" },
        { value: "QLIGHT", text: "QLIGHT" },
        { value: "START", text: "START" },
        { value: "TATUNG", text: "TATUNG" },
        { value: "BOSCH", text: "BOSCH" },
        { value: "LACROIX", text: "LACROIX" },
        { value: "MOXA", text: "MOXA" },
        { value: "HIRSCHMAN", text: "HIRSCHMAN" },
        { value: "CISCO", text: "CISCO" },
        { value: "POWER ALL", text: "POWER ALL" },



      ],
      listaInventario: []
    };
  },
  methods: {
    async buscarRefacciones() {
           
       await this.$store.dispatch("Inventario/buscarInventario",this.datos)
       this.listaInventario = await this.$store.getters['Inventario/getListaInventario'] 
       
    },
    editarRefaccion(value) {
      let item = Object.assign({}, value);

      
      
    console.log(item)
      
      this.$router.push({
        name: "InventarioEditar",
        params: {
          object: item
        }
      });

    },
    crearRefaccion() {
      this.$router.push("/Inventario/Nueva");
    },
    async eliminarRefaccion(value) {
      

        console.log(value)
        await this.$store.dispatch("Inventario/eliminarInventario",value);

    }
  }
};
</script>
