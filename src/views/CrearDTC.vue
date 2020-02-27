<template>
  <div>
    <Nav></Nav>
    <div class="m-5">
      <form class="flex flex-wrap md:ml-10 md:mr-10 justify-center">
        <div
          class="shadow-md rounded md:border border-black px-8 pt-6 pb-8 mt-8 w-full sm:screen flex flex-col flex-wrap my-2"
        >
          <h1 class="text-center text-4xl text-blue-600 font-mono text-lg mb-10">Datos Generales</h1>

          <!-- Primeros dos input  -->
          <div class="-mx-3 w-full sm:screen md:flex mb-4">
            <!-- <div class="md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="input-Convenio"
              >Numero de Convenio</label>
              <select
                v-model="datos.NoConvenio"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
              >
                <option disabled value>Seleciona el Convenio</option>
                <option
                  v-for="(encabezado, index) in listaEncabezado"
                  v-bind:value="encabezado.value"
                  :key="index"
                >{{encabezado.text}}</option>
              </select>
            </div>-->

            <div class="md:w-1/3 px-3">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-last-name"
              >Numero de Referencia</label>
              <input
                v-model="datos.ReferenceNum"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
                id="grid-last-name"
                type="text"
                placeholder="CG-0572020-01"
              />
            </div>

            <div class="md:w-1/3 px-3">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-last-name"
              >Numero de Usuario</label>
              <input
                v-model="datos.UserId"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
                id="grid-last-name"
                type="text"
                placeholder="1288"
              />
            </div>
            <div class="md:w-1/3 px-3">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-last-name"
              >Numero de Encabezado</label>
              <select
                v-model="datos.DTCHeaderId"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
                id="grid-last-name"
              >
                <option disabled value>Seleciona un Encabezado</option>
                <option
                  v-for="(head, index) in listaHeaders"
                  v-bind:value="head.dtcHeaderId"
                  :key="index"
                >{{head.dtcHeaderId}}</option>
              </select>
            </div>
          </div>

          <div class="-mx-3 w-full sm:screen md:flex mb-4">
            <div class="md:w-1/3 px-3">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              >Plaza</label>
              <select
                @change="getCarriles()"
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

            <div class="md:w-1/3 px-3">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              >Carril</label>
              <select
                @change="actualizarCapufeId()"
                v-model="datos.LanesCatalogCapufeLaneNum"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
              >
                <option disabled value>Seleciona un Carril</option>
                <option
                  v-for="(carril, index) in listaCarriles"
                  v-bind:value="carril.capufeLaneNum"
                  :key="index"
                >{{carril.lane}}</option>
              </select>
            </div>
          </div>

          <!--Segundos dos input  -->
          <div class="-mx-3 w-full sm:screen md:flex mb-4">
            <div class="md:w-1/3 px-3">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-last-name"
              >Tipo de Dictamen</label>
              <select
                v-model="datos.OpinionType"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
                id="grid-last-name"
              >
                <option value="Correctivo">Correctivo</option>
                <!-- <option
                  v-for="(componente, index) in listaPiezas"
                  v-bind:value="componente.componentId"
                  :key="index"
                >{{componente.componentName}}</option>-->
              </select>
            </div>

            <div class="md:w-1/3 px-3">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-last-name"
              >Status</label>
              <select
                v-model="datos.Status"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
                id="status"
              >
                <option disabled value>Selecionar...</option>
                <option
                  v-for="(choose, index) in listaStatus"
                  v-bind:value="choose.value"
                  :key="index"
                >{{choose.text}}</option>
              </select>
            </div>

            <div class="md:w-1/3 px-3">
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
                v-model="datos.AxaNum"
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
                v-model="datos.FailureNum"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
                id="grid-last-name"
                type="text"
                placeholder="Folio Falla"
              />
            </div>
          </div>

          <div class="-mx-3 md:flex mb-4">
            <div class="md:w-1/4 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              >Fecha del Siniestro</label>
              <input
                v-model="datos.IncidentDate"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
                type="date"
              />
            </div>

            <div class="md:w-1/4 px-3">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-last-name"
              >Fecha de Falla</label>
              <input
                v-model="datos.FailureDate"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
                id="grid-last-name"
                type="date"
              />
            </div>
            <div class="md:w-1/4 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              >Fecha de Envio</label>
              <input
                v-model="datos.ShippingDate"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
                type="date"
              />
            </div>

            <div class="md:w-1/4 px-3">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-last-name"
              >Fecha de Elaboracion</label>
              <input
                v-model="datos.ElaborationDate"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
                id="grid-last-name"
                type="date"
              />
            </div>
          </div>

          <div class="-mx-3 md:flex mb-6"></div>

          <!--Tercero Input -->
          <div class="-mx-3 md:flex mb-6">
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="input-Convenio"
              >Descripcion</label>
              <textarea
                v-model="datos.Description"
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
                v-model="datos.Observation"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
                id="grid-last-name"
              />
            </div>
            <div class="md:w-1/2 px-3">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                for="grid-last-name"
              >Diagnostico</label>
              <textarea
                v-model="datos.Diagnostic"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-2 mb-3"
                id="grid-last-name"
              />
            </div>
            <div class="mt-6 mb-6 md:mb-0">
              <button
                @click="crearDTCTecnico()"
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
        ReferenceNum: "",
        UserId: "",
        DTCHeaderId: "H-8080",
        AxaNum: "",
        FailureNum: "",
        Status: "false",
        FailureDate: "",
        IncidentDate: "",
        ElaborationDate: "",
        ShippingDate: "",
        OpinionType: "Correctivo",
        Description: "",
        Diagnostic: "",
        Observation: "",
        Image: "No-Img",
        LanesCatalogCapufeLaneNum: "",
        LanesCatalogIdGare: "87"
      },
      listaStatus: [
        { value: "1", text: "Finalizado" },
        { value: "2", text: "En Proceso" }
      ],
      selectedEncabezado: null,
      listaPlazas: [
        { value: "004", text: "Tepotzotlan" },
        { value: "005", text: "Palmillas" },
        { value: "006", text: "Queretaro" },
        { value: "041", text: "Salamanca" },
        { value: "061", text: "Libramiento" },
        { value: "127", text: "Chichimequillas" },
        { value: "183", text: "Villagrand" },
        { value: "186", text: "Cerro Gordo" }
      ],
      listaCarriles: [],
      listaPiezas: [],
      listaHeaders: [],
      loader: false
    };
  },
  methods: {
    crearDTC() {},
    processFile(e) {
      const file = e.target.files[0];

      if (!file.type.includes("image/")) {
        alert("Please select an image file");
        return;
      }

      if (typeof FileReader === "function") {
        const reader = new FileReader();

        reader.onload = event => {
          this.imgSrc = event.target.result;
          //console.log(this.imgSrc)
          // rebuild cropperjs with the updated source
        };
        reader.readAsDataURL(file);
        alert(reader);
        this.datos.Imagen = reader.result;
      } else {
        alert("Sorry, FileReader API not supported");
      }
    },
    async getCarriles() {
      console.log(this.datos.Plaza);
      await this.$store.dispatch(
        "Carriles/buscarCarrilesPlaza",
        this.datos.Plaza
      );
      this.listaCarriles = await this.$store.getters[
        "Carriles/getListaCarriles"
      ];
    },
    async buscarHeaders() {
      console.log(this.datos.Header);
      await this.$store.dispatch("Header/buscarHeaders", this.datos.Header);
      this.listaCarriles = await this.$store.getters[
        "Carriles/getListaCarriles"
      ];
    },

    crearDTCTecnico() {
      this.$store.dispatch("DTC/crearDTCTecnico", this.datos);
      this.$router.push("/home/");
    },
    // async buscarRefacciones() {
    //   console.log("COmponente");
    //   console.log(this.datos);
    //   await this.$store.dispatch("Refacciones/buscarRefacciones", this.datos);
    //   this.Piezas = await this.$store.getters[
    //     "Refacciones/getListaRefacciones"
    //   ];
    // },
    actualizarCapufeId() {
      for (let i = 0; i < this.listaCarriles.length; i++) {
        if (this.datos.Carril == this.listaCarriles[i].capufeLaneNum) {
          this.datos.LanesCatalogIdGare == this.listaCarriles[i].idGare;
          console.log(this.listaCarriles[i].capufeLaneNum);
        }
      }
    },
    actualizarIdGare() {
      for (let i = 0; i < this.listaCarriles.length; i++) {
        if (this.datos.Carril == this.listaCarriles[i].capufeLaneNum) {
          console.log(this.listaCarriles[i].idGare);
        }
      }
    }
  },
  async beforeMount() {
    await this.$store.dispatch("Refacciones/buscarComponentes");
    (this.listaPiezas = await this.$store.getters[
      "Refacciones/getListaRefacciones"
    ]),
      await this.$store.dispatch("Header/buscarHeaders");
    this.listaHeaders = await this.$store.getters["Header/getHeaders"];
  }
  //   async beforeMount2() {
  //   await this.$store.dispatch("Header/buscarHeaders");
  //   this.listaHeaders = await this.$store.getters[
  //     "Header/listaHeaders"
  //   ];
  // }
};
</script>



