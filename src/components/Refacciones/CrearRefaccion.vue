<template>
  <div>
    <Nav></Nav>

    <div class="m-5">
      <form
        class="flex flex-wrap md:ml-10 md:mr-10 justify-center md:p-16 md:pt-4"
      >
        <div
          class="shadow-md rounded md:border border-black p-5 md:p-24 mt-8 w-full sm:screen flex flex-col flex-wrap my-2"
        >
          <h1
            class="text-center text-4xl text-blue-600 font-mono text-lg mb-10"
          >
           Agregar Objeto al Catalogo
          </h1>

          <!-- Primeros dos input  -->
          <div class="-mx-3 w-full sm:screen md:flex mb-6">
            <div class="md:w-1/3 px-3">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-last-name"
                >Servico o Componente</label
              >
              <select
                v-model="datos.ServiceTypeId"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
              >
                <option value="">Selecciona la Opcion</option>
                <option value=1>SERVICIO</option>
                <option value=2>COMPONENTE</option>
                <!-- <option value=3>REFACCION</option> -->
              </select>
            </div>

            <div class=" md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="input-Convenio"
                >Nombre</label
              >
              <input
                v-model="datos.ComponentName"
                v-validate="'required|max:25|min:0'"
                v-bind:class="{ 'border-red-600': errors.has('nameComponent') }"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border   rounded-lg py-2 mb-3"
                name="nameComponent"
                value
                placeholder="Numero de Parte"
              />
              <span class="text-red-600" v-if="errors.has('nameComponent')">{{
                "No puedes excedes 25 caracteres"
              }}</span>
            </div>

              <div class=" md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="input-Convenio"
                >Modelo</label
              >
              <input
                v-model="datos.Model"
                v-validate="'required|max:25|min:0'"
                v-bind:class="{ 'border-red-600': errors.has('nameComponent') }"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border   rounded-lg py-2 mb-3"
                name="nameComponent"
                value
                placeholder="Modelo"
              />
              <span class="text-red-600" v-if="errors.has('nameComponent')">{{
                "No puedes excedes 25 caracteres"
              }}</span>
            </div>

            <div class=" md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="input-Convenio"
                >Detalles</label
              >
              <input
                v-model="datos.Description"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border   rounded-lg py-2 mb-3"
                name="nameComponent"
                value
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
                >Precio</label
              >
              <input
                v-model="datos.Price"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
                id="input-Convenio"
                type="text"
                placeholder="Precio"
              />
            </div>
   <div class="md:w-1/3 px-3">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-last-name"
                >Tipo de unidad</label
              >
              <select
                v-model="datos.UnitId"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
              >
                <!-- <option value="">Selecciona la Unidad</option> -->
                <option value=1>Pza</option>
                <!-- <option value=2>Metro</option>
                <option value=3>Mano de Obra</option> -->
              </select>
            </div>

            <div class="md:w-1/3 px-3">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-last-name"
                >Año</label
              >
              <select
                v-model="datos.Year"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
              >
                <option value="">Selecciona Año</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
              </select>
            </div>

            <div class="md:w-1/4 px-3">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="input-Convenio"
                >Marca</label
              >
              <select
                v-model="datos.Brand"
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
              <div class="md:w-1/3 px-3">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-last-name"
                >Firma</label
              >
              <select
                v-model="datos.AutomaticSignature"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
              >
                <option disabled value>Seleccion Automatica</option>
                <option
                  v-for="(firma, index) in listaAutFirma"
                  v-bind:value="firma.value"
                  :key="index"
                  >{{ firma.text }}</option
                >
              </select>
            </div>

            <div class="md:w-1/3 px-3">
              <button
                @click="crearRefaccion()"
                class="shadow bg-green-500 focus:shadow-outline focus:outline-none ml-0 px-32 py-2 md:px-56 mt-6 rounded"
                type="button"
              >
                Crear
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Nav from "../Navbar";

export default {
  data() {
    return {
      datos: {
        ComponentName: "",
        Year: "",
        Price: "",
        Brand: "",
        Description: "",
        UnitId: null,
        ServiceTypeId: null,
        Model: "",
        AutomaticSignature: ""
      },
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
        { value: "POWER ALL", text: "POWER ALL" }
      ],
      hasError: false,
      listaAutFirma: [
        { value: "true", text: "Si" },
        { value: "false", text: "No" }
      ],
    };
  },
  components: {
    Nav
  },
  computed: {},
  methods: {
    crearRefaccion() {
      console.log("Antes de Enviar")
      console.log(this.datos)
      this.$store.dispatch("Refacciones/crearRefaccion", this.datos);
      this.$router.push("/Refacciones/");
    }
  }
};
</script>
