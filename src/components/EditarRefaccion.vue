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
            <div class="md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="input-Convenio"
              >Numero de Parte</label>
              <input
              disabled
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
                id="input-Convenio"
                v-model="datos.NoParte"
                placeholder="Numero de Parte"
              />
            </div>

              <div class="md:w-1/3 px-3">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-last-name"
              >Nombre</label>
              <input
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
                id="grid-last-name"
                type="text"
                v-model="datos.Nombre"
                placeholder="Descripcion"
              />
            </div>


            <div class="md:w-1/3 px-3">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-last-name"
              >Descripcion de Comonente</label>
              <input
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
                id="grid-last-name"
                type="text"
                v-model="datos.Descripcion"
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
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
                id="input-Convenio"
                type="number"
                v-model="datos.Precio"
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
              <option disabled value>Seleciona el Año</option>
            <option
              v-for="(year, index) in listaYear"
              v-bind:value="year.value"
              :key="index"
            >{{year.text}}</option>
              </select>
            </div>

            <div class="md:w-1/3 px-3">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-last-name"
              >Marca</label>
              <select
                v-model="datos.Marca"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
                type="text"                
                >
         <option disabled value>Seleciona el Servicio</option>
            <option
              v-for="(marca, index) in listaMarca"
              v-bind:value="marca.value"
              :key="index"
            >{{marca.text}}</option>
                
                </select>
              
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
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
                id="input-Convenio"
                type="text"
                v-model="datos.TipoServicio"
                placeholder="Tipo de Servicio"
              />
            </div>

            <div class="md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="input-Convenio"
              >Unidad</label>
              <input
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
                id="input-Convenio"
                type="text"
                v-model="datos.Unidad"
                placeholder="Unidad"
              />
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
              @click="editarRefaccion()"
              class="shadow bg-yellow-400  focus:shadow-outline focus:outline-none ml-0 px-32 py-2 md:px-40 m-3 rounded"
              type="button"
            >Editar</button>
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
       listaYear: [

        {value: "2020", text: "2020"},
        {value: "2019", text: "2019"},
        {value: "2018", text: "2018"},

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

      datos:{

      NoParte: this.$route.params.object.numPart,
      Descripcion: this.$route.params.object.description,
      Precio: this.$route.params.object.price,
      Year: this.$route.params.object.pieceYear,
      Unidad: this.$route.params.object.unit,
      TipoServicio: this.$route.params.object.typeService,
      Marca: this.$route.params.object.brand,
      Nombre: this.$route.params.object.name,
      Imagen: this.$route.params.object.sparePartImage
      }

    };
  },
  components: {
    Nav
  },
  methods:{

    editarRefaccion(){

      console.log(this.datos)

      this.$store.dispatch("Refacciones/editarRefaccion", this.datos)
      this.$router.push('/Refacciones/')

    }
  }
};
</script>   