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
          <div class="-mx-3 w-full sm:screen flex mb-4">
            <div class=" md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="input-Convenio"
              >Numero de Parte</label>
              <input
              disabled
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
                id="input-Convenio"
                v-model="datos.ComponentId"
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
                v-model="datos.ComponentName"
                placeholder="Nombre de la pieza"
              />
            </div>
              <div class=" md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="input-Convenio"
                >Descripcion</label
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
              >Precio</label>
              <input
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
                id="input-Convenio"
                type="text"
                v-model="datos.Price"
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
                v-model="datos.Unit"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
              >
                <option value="">Selecciona la Unidad</option>
                <option value=1>Pza</option>
                <option value=2>Metro</option>
                <option value=3>Mano de Obra</option>
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
                <option value="2018">2018</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
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
        
        <button
              @click="editarRefaccion()"
              class="shadow bg-yellow-400 mt-6 focus:shadow-outline focus:outline-none ml-0 px-32 py-2 md:px-56 m-3 rounded"
              type="button"
            >Editar</button>
              
            </div>
          

          <!-- Primeros dos input  -->
         
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

        
      ComponentId: this.$route.params.object.ComponentId,
      ComponentName: this.$route.params.object.ComponentName,
      Price: this.$route.params.object.Price,
      Year: this.$route.params.object.Year,      
      Brand: this.$route.params.object.Brand,
      Description: this.$route.params.object.Description,
      ServiceTypeId: this.$route.params.object.ServiceTypeId,
      UnitId: this.$route.params.object.UnitId,
      Model: this.$route.params.object.Model,
      automaticSignature: this.$route.params.object.automaticSignature
      

      // NoParte: this.$route.params.object.componentId,
      // Descripcion: this.$route.params.object.componentName,
      // Precio: this.$route.params.object.price,
      // Year: this.$route.params.object.year,
      // Unidad: this.$route.params.object.unit,
      // TipoServicio: this.$route.params.object.typeService,
      // Marca: this.$route.params.object.brand,
      // Nombre: this.$route.params.object.name,
      // Imagen: this.$route.params.object.sparePartImage
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