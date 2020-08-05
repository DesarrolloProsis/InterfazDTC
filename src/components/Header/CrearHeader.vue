<template>
  <div class="bg-blue-400 m-0 p-0 bg-white">
    <div
      class="mt-8  grid grid-cols-3 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 md:border border-black px-8 pt-6 pb-8 mt-8 w-full sm:screen flex flex-col flex-wrap my-2"
    >
      <!-- TituloyReferencia -->
      <div>
        <img
          src="../../assets/img/prosis-logo.jpg"
          height="200"
          width="200"
          class="m-2"
        />
      </div>
      <div
        class="border-2 border-black text-center h-24 text-gray-800 p-0 md:text-lg lg:text-3xl font-extrabold"
      >
        <p class="p-0">Dictamen Tecnico y Cotizacion</p>
      </div>
      <div class="text-left pl-2">
        <br />
        <label class="mr-2" style="font-weight: normal">Referencia:</label>
        <label style="font-weight: bold">{{
          datosSinester.ReferenceNumber
        }}</label>
      </div>

      <!-- SubTitulo -->

      <div>
        <br />
        <label class for="inline-full-name" style="font-weight: normal">Contrato / Oferta:</label>
        <label style="font-weight: bold; padding-left: 0.5vw">{{ datosUser.agrement }}</label>
      </div>

      <div>
        <br />
        <div class="border-black border-2 text-lg text-center font-bold">
          <h6>En caso de Siniestro</h6>
        </div>
      </div>

      <div class="text-left pl-2">
        <br />
        <label class="inline-full-name" style="font-weight: normal">Tipo de Dictamen:</label>
        <label class="inline-full-name" style="padding-left: 0.5vw">CORRECTIVO</label>
      </div>

      <!-- ------Tercera Linea-------- -->
        <div class="mr-6">
          <label>Atencion:</label>
          <label class="ml-2 text-sm" style="font-weight: normal">{{
            datosUser.managerName
          }}</label>
        </div>
        <div class="flex pl-2 pr-2">
          <p class="w-1/2 text-md mb-1 font-semibold text-gray-900">No. Siniestros</p>
          <input
            v-validate="'uniqueSinester'"
            v-model="datosSinester.SinisterNumber"
            class="w-full"
            type="text"
            name="NoSiniestro"
            placeholder
          />
          <p class="w-1/2 text-red-600 text-xs">{{ errors.first("NoSiniestro") }}</p>
          <p class="w-1/2 text-md mb-1 font-semibold text-gray-900">No. Reporte:</p>
          <input
            v-validate="'uniqueReport'"
            v-model="datosSinester.ReportNumber"
            class="w-full"
            type="text"
            name="NoReporte"
          />
          <p class="text-red-600 text-xs">{{ errors.first("NoReporte") }}</p>
        </div>
        <!-- <div class="pl-2 pr-2"></div> -->
        <div class="w-1/4 pl-2 pr-2">
          <p class="text-md font-semibold mb-1 text-gray-900">
            Tipo de Descripcion
          </p>
          <select
            v-model="datosSinester.TypeDescriptionId"
            v-validate="'required'"
            class="w-full"
            type="text"
            name="TipoDescripcion"
          >
            <option disabled value="">Selecionar...</option>
            <option
              v-for="(desc, index) in descripciones"
              v-bind:value="desc.typeDescriptionId"
              :key="index"
              >{{ desc.description }}</option
            >
          </select>
          <p class="text-red-600 text-xs">
            {{ errors.first("TipoDescripcion") }}
          </p>
        </div>
        <!-- ------cuarta Linea-------- -->
        <div class="mr-6">
          <label class="inline">Cargo:</label>
          <label class="inline ml-2 text-sm" style="font-weight: normal">{{
            datosUser.position
          }}</label>
        </div>
        <div class="pl-2 pr-2">
          <p class="text-md mb-1 font-semibold text-gray-900">
            Fecha Siniestro:
          </p>
          <input
            @change="crearReferencia()"
            v-validate="'required'"
            :disabled="fechaSiniestoEdit"
            v-model="datosSinester.SinisterDate"
            class="w-full"
            name="FechaSiniestro"
            type="date"
          />
          <p class="text-red-600 text-xs">
            {{ errors.first("FechaSiniestro") }}
          </p>
        </div>
        <div class="pl-2 pr-2">
          <p class="text-md mb-1 font-semibold text-gray-900">
            Fecha de Envio:
          </p>
          <input
            v-model="datosSinester.ShippingElaboracionDate"
            v-validate="'required'"
            class="w-full"
            type="date"
            name="FechaEnvio"
          />
          <p class="text-red-600 text-xs">{{ errors.first("FechaEnvio") }}</p>
        </div>
      <!--*************** Quinta Linea ***********************-->
        <div class="mr-6">
          <label class="inline">Correo:</label>
          <label class="inline ml-2 text-sm" style="color: blue;">{{
            datosUser.mail
          }}</label>
        </div>
        <div class="pl-2 pr-2">
          <p class="text-md mb-1 font-semibold text-gray-900">
            Folio de Falla:
          </p>
          <input
            v-model="datosSinester.FailureNumber"
            class="w-full"
            type="text"
            placeholder="S/M"
          />
        </div>
          <div class="pl-2 pr-2">
          <p class="text-md mb-1 font-semibold text-gray-900">
            Fecha de Elaboracion:
          </p>
          <input disabled="true" class="w-full" type="date" />
        </div>
      <!--*********************Sexta Linea**************************************-->
        <div class="mr-6">
          <label>Plaza Cobro:</label>
          <label
            class="text-sm text-gray-900 ml-2"
            style="font-weight: normal"
            >{{ datosUser.plaza }}</label
          >
        </div>
        <div class="pl-2 pr-2">
          <p class="text-md mb-1 font-semibold text-gray-900">
            Fecha de Falla:
          </p>
          <input
            v-model="datosSinester.FailureDate"
            class="w-full"
            type="date"
          />
        </div>
        <div class="pl-2 pr-2">
          <label>Tecnico Responsable:</label>
          <label class="text-md ml-2" style="font-weight: normal">{{
            datosUser.nombre
          }}</label>
        </div>
      <!--**************Septima Linea******************************-->
      <div></div>
      <div></div>
      <div class="w-1/4 pl-2 pr-2">
          <label>Coordinacion Regional:</label>
          <label class="text-md" style="font-weight: normal;">{{
            datosUser.regionalCoordination
          }}</label>
        </div>
      <!--***************Octava linea****************************-->
        <div></div>
        <div></div>
        <div class="pl-2 pr-2">
          <label>Centro de Servicio:</label>
          <label>CDMX</label>
        </div>
      <!--***************novena Linea****************************-->
        <div></div>
        <div></div>
        <div class="w-1/4 pl-2 pr-2">
          <label>Correo:</label>
          <label>hguzman@grupo-prosis.com</label>
        </div>
      <!--***********************************************************-->
      <br />
      <br />
    </div>
    <!-- COMPONENTE TABLA EQUIPO DAÑANDA -->
    <TablaEquipoMalo
      :listaComponentes="listaComponentes"
      :dateSinester="datosSinester.SinisterDate"
    ></TablaEquipoMalo>
  </div>
</template>

<script>
import TablaEquipoMalo from "../DTC/TablaEquipoMalo";

import moment from "moment";

export default {
  name: "CrearHeader",
  props: {
    descripciones: {
      type: Array,
      default: () => [],
    },
    datosUser: {
      type: Object,
      default: () => {},
    },
    headerEdit: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    TablaEquipoMalo,
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
        Observaciones: null,
      },
      listaComponentes: [],
      fechaSiniestoEdit: false,

      sizeSmall: false,
    };
  },
  methods: {
    async crearReferencia() {
      let diaActual = parseInt(this.datosSinester.SinisterDate.substr(8, 2));
      let mesActual = parseInt(this.datosSinester.SinisterDate.substr(6, 2));
      let yearActual = parseInt(this.datosSinester.SinisterDate.substr(0, 4));

      let diaCorriente = 0;

      let newYear = parseInt(this.datosSinester.SinisterDate.substr(2, 2));

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
    },
  },
  watch: {
    //ARREGLAR WATCHER!!!!!
    datosUser: function (newValue) {
      this.datosSinester.UserId = newValue["userId"];
      this.datosSinester.AgremmentInfoId = newValue["agremmentInfoId"];
    },
    datosSinester: {
      deep: true,
      handler(datosSinester) {
        this.$store.commit("Header/datosSinesterMutation", datosSinester);
      },
    },
  },
  beforeMount: async function() {
    let value = await this.$store.getters["Header/getConvenioPlaza"];
    await this.$store.dispatch("Refacciones/buscarComponentes", value);
    this.listaComponentes = await this.$store.getters[
      "Refacciones/getListaRefacciones"
    ];

    await this.$store.dispatch("DTC/buscarDescriptions");
    this.listaDescripciones = await this.$store.getters[
      "DTC/getListaDescriptions"
    ];

    if (JSON.stringify(this.headerEdit) != "{}") {
      this.datosSinester.ReferenceNumber = this.headerEdit.referenceNumber;
      this.datosSinester.SinisterNumber = this.headerEdit.sinisterNumber;
      this.datosSinester.ReportNumber = this.headerEdit.reportNumber;
      this.datosSinester.SinisterDate = moment(
        this.headerEdit.sinisterDate
      ).format("YYYY-MM-DD");
      this.datosSinester.FailureNumber = this.headerEdit.failureNumber;
      this.datosSinester.FailureDate = moment(
        this.headerEdit.failureDate
      ).format("YYYY-MM-DD");
      this.datosSinester.ShippingElaboracionDate = moment(
        this.headerEdit.shippingDate
      ).format("YYYY-MM-DD");
      this.datosSinester.TypeDescriptionId = 2;
      this.fechaSiniestoEdit = true;
    }
    //this.$validator.validateAll();
  },
};
</script>

<style scoped>
label {
  font-weight: bold;
  color: black;
  font-family: Tahoma, Geneva, Verdana, sans-serif;
}
</style>
