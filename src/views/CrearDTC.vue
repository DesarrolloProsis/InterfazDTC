<template>
  <div>
    <Nav></Nav>
    <div class="m-5">
      <form class="flex flex-wrap md:ml-10 md:mr-10 justify-center">
        <div
          class="shadow-md rounded md:border border-grey-light px-8 pt-6 pb-8 mt-8 w-full sm:screen flex flex-col flex-wrap my-2"
        >
          <h1 class="text-center text-4xl text-blue-600 font-mono text-lg mb-10">Datos Generales</h1>

          <!-- Primeros dos input  -->
          <div class="-mx-3 w-full sm:screen md:flex mb-6">
            <div class="md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="input-Convenio"
              >Numero de Convenio</label>
             <select
                v-model="datos.Plaza"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
              >
                <option disabled value>Seleciona el Convenio</option>
                <option
                  v-for="(encabezado, index) in listaEncabezado"
                  v-bind:value="encabezado.value"
                  :key="index"
                >{{encabezado.text}}</option>
              </select>
            </div>

            <div class="md:w-1/3 px-3">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-last-name"
              >Tipo de Dictamen</label>
              <input
                v-model="datos.TipoDictamen"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
                id="grid-last-name"
                type="text"
                placeholder="Tipo de Dictamen"
              />
            </div>

            <div class="md:w-1/3 px-3">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              >Plaza</label>
              <select
                v-model="datos.Plaza"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
              >
                <option disabled value>Seleciona la Plaza</option>
                <option
                  v-for="(plaza, index) in listaPlazas"
                  v-bind:value="plaza.value"
                  :key="index"
                >{{plaza.text}}</option>
              </select>
            </div>
          </div>

          <!--Segundos dos input  -->
          <div class="-mx-3 md:flex mb-6">
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              >Carril</label>
              <select
                v-model="datos.Carril"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
              />
            </div>

            <div class="md:w-1/2 px-3">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-last-name"
              >Componente</label>
              <select
                v-model="datos.Componente"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
                id="grid-last-name"
              />
            </div>

            <div class="md:w-1/2 px-3">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-last-name"
              >Subir Imagen</label>
              <input
                @change="processFile($event)"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
                id="grid-last-name"
                type="file"
              />
            </div>
          </div>

          <h4
            class="text-center text-3xl text-blue-600 font-mono text-lg mb-10"
          >Datos de la Aseguradora</h4>

          <!-- input Info Aseguradora -->
          <div class="-mx-3 md:flex mb-6">
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="input-Convenio"
              >Numero AXA</label>
              <input
                v-model="datos.NumeroAXA"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red py-2 rounded-lg mb-3"
                id="input-Convenio"
                type="text"
                placeholder="Numero AXA"
              />
            </div>

            <div class="md:w-1/2 px-3">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-last-name"
              >Folio de Falla</label>
              <input
                v-model="datos.FolioFalla"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
                id="grid-last-name"
                type="text"
                placeholder="Folio Falla"
              />
            </div>
          </div>

          <div class="-mx-3 md:flex mb-6">
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              >Fecha del Siniestro</label>
              <input
                v-model="datos.FechaSiniestro"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
                type="date"
              />
            </div>

            <div class="md:w-1/2 px-3">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-last-name"
              >Fecha de Falla</label>
              <input
                v-model="datos.FechaFalla"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
                id="grid-last-name"
                type="date"
              />
            </div>
          </div>

          <!--Tercero Input -->
          <div class="-mx-3 md:flex mb-6">
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="input-Convenio"
              >Descripcion</label>
              <textarea
                v-model="datos.Descripcion"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
                id="grid-last-name"
              />
            </div>

            <div class="md:w-1/2 px-3">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-last-name"
              >Observacion</label>
              <textarea
                v-model="datos.Observacion"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
                id="grid-last-name"
              />
            </div>
            <div class="mt-6 mb-6 md:mb-0">
              <button
                @click="crearDTC()"
                class="text-grey-lighter py-3 md:py-8 w-full md:w-64 font-bold rounded text-xs bg-green-400 hover:bg-green-500"
              >Crear</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Nav from "../components/Navbar";

export default {
  name: "CrearDTC",
  components: {
    Nav
  },
  data() {
    return {
      datos: {
        NoReferencia: '',
        NoConvenio: '',
        TipoDictamen: '',
        Plaza: '',
        Carril: '',
        Componente: '',
        Imagen: '',
        NumeroAXA: '',
        FolioFalla: '',
        FechaSiniestro: '',
        FechaFalla: '',
        Descripcion: '',
        Observacion: ''
      },
      listaEncabezado:[
          { value: "Encabezado01", text: "2341---Eloy Gameno"},
          { value: "Encabezado02", text: "5201---Luz Hiano"},
          { value: "Encabezado03", text: "9506---Juan Escutia"},
          { value: "Encabezado04", text: "4847---Pedro Paramo"},
      ],
      listaPlazas: [
        
        { value: "004", text: "Tepotzotlan" },                
        { value: "005", text: "Palmillas" },
        { value: "006", text: "Queretaro" },
        { value: "041", text: "Salamanca" },
        { value: "061", text: "Libramiento" },
        { value: "127", text: "Chichimequillas" },
        { value: "183", text: "Villagrand" },
        { value: "186", text: "Cerro Gordo" },
      ]
    };
  },
  methods: {
    crearDTC() {},
    processFile(e) {
    const file = e.target.files[0]      

      if (!file.type.includes('image/')) {
        alert('Please select an image file')
        return
      }

      if (typeof FileReader === 'function') {
        const reader = new FileReader()
        

        reader.onload = (event) => {
          this.imgSrc = event.target.result          
          //console.log(this.imgSrc)
          // rebuild cropperjs with the updated source          
        }
        reader.readAsDataURL(file)
        alert(reader)
        this.datos.Imagen = reader.result
      } else {
        alert('Sorry, FileReader API not supported')
      }
    }
  }
};
</script>
