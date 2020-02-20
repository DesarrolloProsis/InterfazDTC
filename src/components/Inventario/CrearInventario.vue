<template>
  <div>
    <Nav></Nav>

    <div class="m-5">
      <form
        class="flex flex-wrap md:ml-10 md:mr-10 justify-center md:p-16 md:pt-4"
      >
        <div
          class="shadow-md rounded md:border border-grey-light p-5 md:p-24 mt-8 w-full sm:screen flex flex-col flex-wrap my-2"
        >
          <h1
            class="text-center text-4xl text-blue-600 font-mono text-lg mb-10"
          >
            Nueva Refaccion
          </h1>

          <!-- Primeros dos input  -->
          <div class="-mx-3 w-full sm:screen md:flex mb-6">
            <div class="md:w-1/4 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="input-Convenio"
                >Numero de Parte</label
              >
              <input
                v-model="datos.NumPart"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
                id="input-Convenio"
                value
                placeholder="Numero de Parte"
              />
            </div>

            <div class="md:w-1/4 px-3">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-last-name"
                >Año</label
              >
              <select
                @change="listarRefacciones()"
                v-model="datos.year"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
              >
                <option value="">Selecciona Año</option>
                <option value="2018">2018</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
              </select>
            </div>

            <div class="md:w-2/4 px-3">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-last-name"
                >Selecciones la Refaccion</label
              >
              <select
                @change="insertarIdPieza()"
                v-model="datos.ComponentId"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
              >
                <option value="">Selecciona la Pieza</option>
                <option
                
                  v-for="(pieza, index) in listaPiezas"
                  v-bind:value="pieza.componentId"
                  :key="index"
                  >{{ pieza.componentName }}</option
                >
              </select>
            </div>
          </div>

          <!-- Primeros dos input  -->
          <div class="-mx-3 w-full sm:screen md:flex mb-6">
            <div class="md:w-1/4 px-3 mb-6 md:mb-0">
              <label                
                class="block  uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="input-Convenio"
                >Precio</label
              >
              <input
              disabled
                v-model="datos.Price"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
                id="input-Convenio"
                type="text"
                placeholder="Precio"
              />
            </div>

            <div class="md:w-1/4 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="input-Convenio"
                >Unidad</label
              >
              <input
                disabled
                v-model="datos.Unit"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
                id="input-Convenio"
                type="number"
                placeholder="Unidad"
              />
            </div>

            <div class="md:w-1/4 px-3">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="input-Convenio"
                >Marca</label
              >
              <select
              disabled
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

            <div class="md:w-1/4 px-3">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="input-Convenio"
                >Imagen</label
              >
              <input                
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
                id="input-Convenio"
                type="file"
              />
            </div>
          </div>

          <!-- Primeros dos input  -->
          <div class="-mx-3 w-full sm:screen md:flex mb-6">
            <div class="md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="input-Convenio"
                >Tipo de Servicio</label
              >
              <input
                disabled
                v-model="datos.TypeService"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
                id="input-Convenio"
                type="text"
                placeholder="Tipo de Servicio"
              />
            </div>

            <div class="md:w-2/3 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-last-name"
                >Descripcion de Componente</label
              >
              <input
                v-model="datos.Description"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
                id="grid-last-name"
                type="text"
                placeholder="Descripcion"
              />
            </div>

            <button
              @click="crearRefaccion()"
              class="shadow bg-green-500 focus:shadow-outline focus:outline-none ml-0 px-32 py-2 md:px-40 m-3 rounded"
              type="button"
            >
              Crear
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

import Nav from "../Navbar.vue"
export default {
  data() {
    return {
      datos: {
        Id: 0,
        NumPart: "",
        TypeService: "",
        Name: "",
        Brand: "",
        Price: '',
        Unit: 0,
        year: '',
        InventoryImage: 'Sin-Imagen',
        Description: '',
        ComponentId: 0,
        Status: false

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
      listaPiezas: []
    };
  },
  components: {
    Nav
  },
  methods: {
    async listarRefacciones() {
      await this.$store.dispatch("Refacciones/buscarRefacciones", this.datos);
      this.listaPiezas = await this.$store.getters[
        "Refacciones/getListaRefacciones"
      ];
    },

    crearRefaccion() {
      this.$store.dispatch("Inventario/crearInventario", this.datos);
        this.$router.push("/Inventario/");
    }
    ,
    insertarIdPieza(){

            for(let i = 0; i < this.listaPiezas.length; i++){

                if(this.datos.ComponentId === this.listaPiezas[i].componentId){

                    this.datos.Name = this.listaPiezas[i].componentName
                    this.datos.Brand = this.listaPiezas[i].brand
                    this.datos.Unit = this.listaPiezas[i].unit
                    this.datos.Price = this.listaPiezas[i].price
                    this.localizarTipoSercio(this.listaPiezas[i].serviceTypeId)
                }
            }
    },
    localizarTipoSercio(value){

        if(value == 1){

          this.datos.TypeService = "SERVICIO"
        }
        else if(value == 2){
          this.datos.TypeService = "COMPONENTE"
        }
        else{
          this.datos.TypeService = "REFACCION"
        }

    }
  }
};
</script>
