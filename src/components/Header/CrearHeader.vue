<template>
  <div class="m-0 bg-white">
    <form class="flex flex-no-wrap bg-white md:ml-5 md:mr-5 justify-center font-light">
      <div
        class="shadow-sm rounded md:border border-black px-8 pt-6 pb-8 mt-8 w-full sm:screen flex flex-col flex-wrap my-2"
      >
        <!-- TituloyReferencia -->
        <div class="flex">
          <div class="w-1/3">
            <img src="../../assets/img/prosis-logo.jpg" height="200" width="200" class="m-2" />
          </div>
          <div
            class="w-1/3 border-2 border-black text-center h-24 text-gray-800 p-0 md:text-lg lg:text-3xl font-extrabold"
          >
            <p class="p-0">Dictamen Tecnico y Cotizacion</p>
          </div>
          <div class="w-1/3 text-center">
            <br />
            <label class="ml-5 mr-2" style="font-weight: normal">Referencia:</label>
            <label style="font-weight: bold">{{ datosSinester.ReferenceNumber }}</label>
          </div>
        </div>
        <!-- SubTitulo -->
        <div class="flex mt-5 mb-16">
          <div class="w-1/3">
            <br />
            <label class for="inline-full-name" style="font-weight: normal">Contrato / Oferta:</label>
            <label style="font-weight: bold; padding-left: 0.5vw"> {{ datosUser.agrement }}</label>
          </div>
          <div class="w-1/3">
            <br />
            <div class="border-black border-2 text-lg text-center font-bold">
              <h6>En caso de Siniestro</h6>
            </div>
          </div>
          <div class="w-1/3 text-center pl-12">
            <br />
            <label class="inline-full-name" style="font-weight: normal">Tipo de Dictamen:</label>
            <label class="inline-full-name" style="padding-left: 0.5vw">CORRECTIVO</label>
          </div>
        </div>
        <!-- --------------------------------------------------- -->
        <div class="flex md:mb-5 md:text-xs lg:text-lg">
          <div class="w-1/4 mr-6">
            <label>Atencion:</label>
            <label class="ml-2 text-sm" style="font-weight: normal">{{ datosUser.managerName }}</label>
          </div>
          <div class="w-1/4 pl-2 pr-2">
            <p class="text-md mb-1 font-semibold text-gray-900">No. Siniestros</p>
            <input
              v-validate="'uniqueSinester'"
              v-model="datosSinester.SinisterNumber"
              class="w-full bg-white border-gray-600 border shadow"
              type="text"
              name="NoSiniestro"
              placeholder
            />
            <p class="text-red-600 text-xs">{{ errors.first('NoSiniestro') }}</p>
          </div>
          <div class="w-1/4 pl-2 pr-2">
            <p class="text-md mb-1 font-semibold text-gray-900">No. Reporte:</p>
            <input
              v-validate="'uniqueReport'"
              v-model="datosSinester.ReportNumber"
              class="w-full bg-white border-gray-600 border shadow"
              type="text"  
              name="NoReporte"                         
            />
            <p class="text-red-600 text-xs">{{ errors.first('NoReporte') }}</p>
          </div>
          <div class="w-1/4 pl-2 pr-2">
            <p class="text-md font-semibold mb-1 text-gray-900">Tipo de Descripcion</p>
            <select
              v-model="datosSinester.TypeDescriptionId"
              v-validate="'required'" 
              class="w-full bg-white border-gray-600 border shadow"
              type="text"
              name="TipoDescripcion"
            >
              <option disabled value="">Selecionar...</option>
              <option
                v-for="(desc, index) in descripciones"
                v-bind:value="desc.typeDescriptionId"
                :key="index"
              >{{ desc.description }}</option>
            </select>
            <p class="text-red-600 text-xs">{{ errors.first('TipoDescripcion') }}</p>
          </div>
        </div>
        <!--***********************************************************-->
        <div class="flex lg:text-lg">
          <div class="w-1/4 mr-6">
            <label class="inline">Cargo:</label>
            <label class="inline ml-2 text-sm" style="font-weight: normal">{{ datosUser.position }}</label>
          </div>
          <div class="w-1/4 pl-2 pr-2">
            
            <p class="text-md mb-1 font-semibold text-gray-900">Fecha Siniestro:</p>
            <input
              @change="crearReferencia()"
              v-validate="'required'" 
              v-model="datosSinester.SinisterDate"
              class="w-full bg-white border-gray-600 border shadow"
              name="FechaSiniestro"
              type="date"
            />
             <p class="text-red-600 text-xs">{{ errors.first('FechaSiniestro') }}</p>
          </div>
          <div class="w-1/4"></div>
          <div class="w-1/4 pl-2 pr-2">            
            <p class="text-md mb-1 font-semibold text-gray-900">Fecha de Envio:</p>
            <input              
              v-model="datosSinester.ShippingElaboracionDate"
              v-validate="'required'" 
              class="w-full bg-white border-gray-600 border shadow"
              type="date"
              name="FechaEnvio"
            />
            <p class="text-red-600 text-xs">{{ errors.first('FechaEnvio') }}</p>
          </div>
        </div>
        <!--***********************************************************-->
        <div class="flex md:text-xs lg:text-lg">
          <div class="w-1/4 mr-6">
            <label class="inline">Correo:</label>
            <label class="inline ml-2 text-sm" style="color: blue;">{{ datosUser.mail }}</label>
          </div>
          <div class="w-1/4 pl-2 pr-2">            
            <p class="text-md mb-1 font-semibold text-gray-900">Folio de Falla:</p>
            <input
              v-model="datosSinester.FailureNumber" 
              class="w-full bg-white border-gray-600 border shadow"          
              type="text"
              placeholder="S/M"
            />
          </div>
          <div class="w-1/4"></div>
          <div class="w-1/4 pl-2 pr-2">            
            <p class="text-md mb-1 font-semibold text-gray-900">Fecha de Elaboracion</p>
            <input
            disabled="true"
              class="w-full bg-white border-gray-600 border shadow"
              type="date"
            />
          </div>
        </div>
        <!--***********************************************************-->
        <div class="flex md:text-xs lg:text-lg">
          <div class="w-1/4 mr-6">
            <label>Plaza Cobro:</label>
            <label class="text-sm text-gray-900 ml-2" style="font-weight: normal">{{ datosUser.plaza }}</label>
          </div>
          <div class="w-1/4 pl-2 pr-2">        
            <p class="text-md mb-1 font-semibold text-gray-900">Fecha de Falla:</p>
            <input
              v-model="datosSinester.FailureDate"
              class="w-full bg-white border-gray-600 border shadow"
              type="date"
            />
          </div>
          <div class="w-1/4"></div>
          <div class="w-1/4 pl-2 pr-2">
            <label>Tecnico Responsable:</label>
            <label class="text-md ml-2" style="font-weight: normal">{{ datosUser.nombre }}</label>
          </div>
        </div>
        <!--***********************************************************-->
        <div class="flex h-16">
          <div class="w-1/4"></div>
          <div class="w-1/4"></div>
          <div class="w-1/4"></div>
          <div class="w-1/4 pl-2 pr-2">
            <label>Coordinacion Regional:</label>
            <label class="text-md" style="font-weight: normal;">{{ datosUser.regionalCoordination }}</label>
          </div>
        </div>
        <!--***********************************************************-->
        <div class="flex h-12">
          <div class="w-1/4"></div>
          <div class="w-1/4"></div>
          <div class="w-1/4"></div>
          <div class="w-1/4 pl-2 pr-2">
            <label>Centro de Servicio:</label>
            <label>CDMX</label>
          </div>
        </div>
        <!--***********************************************************-->

        <div class="flex">
          <div class="w-1/4"></div>

          <div class="w-1/4"></div>

          <div class="w-1/4"></div>

          <div class="w-1/4 pl-2 pr-2">
            <label>Correo:</label>
            <label>hguzman@grupo-prosis.com</label>
          </div>
          <br />
        </div>
        <br />
        <br />
      </div>
    </form>
    <!-- COMPONENTE TABLA EQUIPO DAÑANDA -->
    <TablaEquipoMalo
      :listaComponentes="listaComponentes"
      :numReference="datosSinester.ReferenceNumber"
      :dateSinester="datosSinester.SinisterDate"
    ></TablaEquipoMalo>
  </div>
</template>

<script>
import TablaEquipoMalo from "../DTC/TablaEquipoMalo";


export default {
  name: "CrearHeader",
  props: {
    descripciones: {
      type: Array,
      default: () => []
    },
    datosUser: {
      type: Object,
      default: () => {}
    },
    descripcion: {
      type: String,
      default: ""
    },
    observaciones: {
      type: String,
      default: ""
    }
  },
  components: {
    TablaEquipoMalo
  },
  data() {
    return {
      datosSinester: {
        ReferenceNumber: "",
        SinisterNumber: "",
        ReportNumber: "",
        SinisterDate: "",
        FailureDate: "",
        FailureNumber: "",
        ShippingElaboracionDate: "",
        Diagnosis: "",
        Observation: "",
        TypeDescriptionId: "",
        UserId: null,
        AgremmentInfoId: null,
        Descripcion: null,
        Observaciones: null
      },
      listaComponentes: []
    };
  },
  methods: {
    async crearReferencia() {
      let diaActual = parseInt(
        this.datosSinester.SinisterDate.substr(8, 2)
      );
      let mesActual = parseInt(
        this.datosSinester.SinisterDate.substr(6, 2)
      );
      let yearActual = parseInt(
        this.datosSinester.SinisterDate.substr(0, 4)
      );

      let diaCorriente = 0;

      let newYear = parseInt(
        this.datosSinester.SinisterDate.substr(2, 2)
      );

      diaCorriente = diaActual;

      for (let i = 1; i < mesActual; i++) {
        diaCorriente += parseInt(new Date(yearActual, i, 0).getDate());
      }
      let nomPlaza = this.datosUser.referenceSquare;

      let autoCompleteDias;

      if (diaCorriente < 10) {
        autoCompleteDias = "00" + diaCorriente.toString();
      } else if (diaCorriente < 100) {
        autoCompleteDias = "0" + diaCorriente.toString();
      } else {
        autoCompleteDias = diaCorriente.toString();
      }

      this.datosSinester.ReferenceNumber =
        nomPlaza + "-" + newYear + autoCompleteDias;

      await this.$store.commit(
        "Header/referenceNumMutation",
        this.datosSinester.ReferenceNumber
      );
      await this.$store.dispatch(
        "Header/buscarReferencia",
        this.datosSinester.ReferenceNumber
      );
      this.datosSinester.ReferenceNumber = await this.$store.getters[
        "Header/getreferenceNum"
      ];      
    }
  },
  watch: {
    //ARREGLAR WATCHER!!!!!
    datosUser: function(newValue) {
      this.datosSinester.UserId = newValue["userId"];
      this.datosSinester.AgremmentInfoId = newValue["agremmentInfoId"];
    },
    observaciones: function(newValue) {
      this.datosSinester.Observaciones = newValue;
    },
    datosSinester: {
      deep: true,
      handler(datosSinester) {
        this.$store.commit("Header/datosSinesterMutation", datosSinester);
      }
    }
  },
  async beforeMount() {
    let value = await this.$store.getters['Header/getConvenioPlaza']
    await this.$store.dispatch("Refacciones/buscarComponentes", value);
    this.listaComponentes = await this.$store.getters[
      "Refacciones/getListaRefacciones"
    ];

    await this.$store.dispatch("DTC/buscarDescriptions");
    this.listaDescripciones = await this.$store.getters[
      "DTC/getListaDescriptions"
    ];

    
    //this.$validator.validateAll();
  }
 
};
</script>

<style scoped>
label {
  font-weight: bold;
  color: black;
  font-family: Tahoma, Geneva, Verdana, sans-serif;
}
</style>
