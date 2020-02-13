<template>
  <div>
    <Nav></Nav>

    <div class="m-5">
      <form class="flex flex-wrap md:ml-10 md:mr-10 justify-center md:p-16 md:pt-4">
        <div
          class="shadow-md rounded md:border border-grey-light p-5 md:p-24 mt-8 w-full sm:screen flex flex-col flex-wrap my-2"
        >
          <h1 class="text-center text-4xl text-blue-600 font-mono text-lg mb-10">Nueva Refaccion</h1>

          <!-- Primeros dos input  -->
          <div class="-mx-3 w-full sm:screen md:flex mb-6">
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="input-Convenio"
              >Numero de Parte</label>
              <input
              v-model="datos.NoParte"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
                id="input-Convenio"
                value
                placeholder="Numero de Parte"
              />
            </div>

            <div class="md:w-1/2 px-3">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-last-name"
              >Descripcion de Componente</label>
              <input
              v-model="datos.Descripcion"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
                id="grid-last-name"
                type="text"
                placeholder="Descripcion"
              />
            </div>
          </div>

          <!-- Primeros dos input  -->
          <div class="-mx-3 w-full sm:screen md:flex mb-6">
            <div class="md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="input-Convenio"
              >Precio</label>
              <input
              v-model="datos.Precio"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
                id="input-Convenio"
                type="number"
                placeholder="Precio"
              />
            </div>

            <div class="md:w-1/3 px-3">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-last-name"
              >Año</label>
              <select
              v-model="datos.Year"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
              >
                <option value="value1">Selecciona Año</option>
                <option value="value1">2018</option>
                <option value="value2">2019</option>
                <option value="value3">2020</option>
              </select>
            </div>

            <div class="md:w-1/3 px-3">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-last-name"
              >Unidad</label>
              <input
              v-model="datos.Unidad"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
                type="text"
                placeholder="Unidad"
              />
            </div>
          </div>

          <!-- Primeros dos input  -->
          <div class="-mx-3 w-full sm:screen md:flex mb-6">
            <div class="md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="input-Convenio"
              >Tipo de Servicio</label>
              <input
              v-model="datos.TipoServicio"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
                id="input-Convenio"
                type="text"
                placeholder="Tipo de Servicio"
              />
            </div>

            <div class="md:w-1/3 px-3 mb-6 md:mb-0">
              <label              
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="input-Convenio"
              >Marca</label>
              <select
                v-model="datos.Marca"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
                id="input-Convenio"
                type="text"                
              >
            <option disabled value>Seleciona la Marca</option>
            <option
              v-for="(marca, index) in listaMarca"
              v-bind:value="marca.value"
              :key="index"
              >{{ marca.text }}</option
            >
              </select>
              
            </div>

            <div class="md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="input-Convenio"
              >Imagen</label>
              <input
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
                id="input-Convenio"
                type="file"
              />
            </div>

            <button
              @click="crearRefaccion()"
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
import Nav from "../components/Navbar";

export default {
  data() {
    return {

      datos:{
        NoParte: '',
        Descripcion: '',
        Precio: '',
        Year: '',
        Unidad: '',
        TipoServicio: '',
        Marca: "",
        Imagen: '',
      },
      listaMarca: [
        { value: "01", text: "GEA" },
        { value: "02", text: "Prosis" },
        { value: "03", text: "LBA" },
        { value: "04", text: "TATTILE" },
        { value: "05", text: "SIQURA" },
        { value: "06", text: "HP" },
        { value: "07", text: "LACROIX" },
        { value: "08", text: "IPRONET" },
        { value: "09", text: "KINGSTON" },
        { value: "10", text: "SIRIT" },
        { value: "11", text: "EARTHRON" },
        { value: "12", text: "TOSHIBA" },
        { value: "13", text: "QLIGHT" },
        { value: "14", text: "START" },
        { value: "15", text: "TATUNG" },
        { value: "16", text: "BOSCH" },
        { value: "17", text: "LACROIX" },
        { value: "18", text: "MOXA" },
        { value: "19", text: "HIRSCHMAN" },
        { value: "20", text: "CISCO" },
        { value: "21", text: "POWER ALL" },


      ],

    };
  },
  components: {
    Nav
  },
  methods: {

    crearRefaccion(){

      this.$store.dispatch("Refacciones/crearRefaccion",this.datos)
      this.$router.push('/Refacciones/')

    }

  }
};
</script>   