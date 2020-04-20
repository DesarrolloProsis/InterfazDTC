<template>
  <div class="m-0 bg-white">
    <form class="flex flex-no-wrap bg-white md:ml-5 md:mr-5 justify-center">
      <div
        class="shadow-sm rounded md:border border-black px-8 pt-6 pb-8 mt-8 w-full sm:screen flex flex-col flex-wrap my-2"
      >
        <!-- TituloyReferencia -->
        <div class="flex">
          <div class="w-1/3">
            <img src="../../assets/img/prosis-logo.jpg" height="200" width="200" class="m-2" />
          </div>
          <div
            class="w-1/3 border-2 border-black text-center p-0 md:text-lg lg:text-3xl font-extrabold"
          >
            <p class="p-0">Dictamen Tecnico y Cotizacion</p>
          </div>
          <div class="w-1/3 text-center">
            <br />
            <label class="m-16" style="font-weight: normal">Referencia:</label>
            <label style="font-weight: bold">{{ datosSinester.ReferenceNumber }}</label>
          </div>
        </div>

        <!-- SubTitulo -->
        <div class="flex mt-5 mb-16">
          <div class="w-1/3">
            <br />
            <label class for="inline-full-name" style="font-weight: normal">Contrato / Oferta:</label>
            <label style="font-weight: bold; padding-left: 0.5vw">
              {{
              datosUser.agrement
              }}
            </label>
          </div>
          <div class="w-1/3">
            <br />
            <div class="border-black border-2 text-lg text-center font-bold">
              <h6>En caso de Siniestro</h6>
            </div>
          </div>
          <div class="w-1/3 text-center">
            <br />
            <label class for="inline-full-name" style="font-weight: normal">Tipo de Dictamen:</label>
            <label class for="inline-full-name" style="padding-left: 0.5vw">CORRECTIVO</label>
          </div>
        </div>

        <!-- --------------------------------------------------- -->

        <div class="flex md:mb-5 md:text-xs lg:text-lg">
          <div class="w-1/4 mr-6">
            <label>Atencion:</label>
            <label style="font-weight: normal">{{ datosUser.managerName }}</label>
          </div>
          <div class="w-1/4">
            <label>No. Siniestro:</label>
            <input
              v-model="datosSinester.SinisterNumber"
              class="border border-black"
              type="text"
              placeholder
            />
            <!-- <div v-if="validateNumerSinester" class="mt-2 text-red-700 font-semibold text-center"> -->
              <div v-if="validateNumerSinester" class="mt-2 text-red-700 font-semibold text-center">
              <p>{{ messageSinester }}</p>
            </div>
          </div>
          <div class="w-1/4">
            <label>Reporte:</label>
            <input
              v-model="datosSinester.ReportNumber"
              class="border border-black"
              type="text"
              placeholder="10301/3030099"
            />
            <div v-if="validateNumerReport" class="mt-2 text-red-700 font-semibold text-center mr-20">
              <p>{{ messageReport }}</p>
            </div>
          </div>
          <div class="w-1/4">
            <label>Tipo de Descripcion:</label>
            <select
              v-model="datosSinester.TypeDescriptionId"
              class="appearance-none border border-black"
              type="text"
            >
              <option disabled value>Selecionar...</option>
              <option
                v-for="(desc, index) in descripciones"
                v-bind:value="desc.typeDescriptionId"
                :key="index"
              >{{ desc.description }}</option>
            </select>
          </div>
        </div>

        <!--***********************************************************-->

        <div class="flex md:mb-5 md:text-xs lg:text-lg">
          <div class="w-1/4 mr-6">
            <label class="inline">Cargo:</label>
            <label class="inline" style="font-weight: normal">{{ datosUser.position }}</label>
          </div>
          <div class="w-1/4">
            <label>Fecha Siniestro:</label>
            <input
              v-model="datosSinester.SinisterDate"
              class="appearance-none border border-black"
              type="date"
            />
          </div>
          <div class="w-1/4"></div>
          <div class="w-1/4 h-8">
            <label>Fecha de Envio:</label>
            <input
              @change="crearReferencia()"
              v-model="datosSinester.ShippingElaboracionDate"
              class="appearance-none border border-black"
              type="date"
            />
          </div>
        </div>

        <!--***********************************************************-->
        <div class="flex md:text-xs lg:text-lg">
          <div class="w-1/4 mr-6">
            <label class="inline">Correo:</label>
            <label class="inline" style="color: blue;">
              {{
              datosUser.mail
              }}
            </label>
          </div>
          <div class="w-1/4">
            <label>Folio Falla:</label>
            <input
              v-model="datosSinester.FailureNumber"
              class="md:border border-black"
              type="text"
              placeholder="S/M"
            />
          </div>
          <div class="w-1/4 h-8"></div>
          <div class="w-1/4 h-8">
            <label>Fecha Elaboracion:</label>
            <input
              v-model="datosSinester.ShippingElaboracionDate"
              class="appearance-none border border-black"
              type="date"
            />
          </div>
        </div>

        <!--***********************************************************-->
        <div class="flex md:text-xs lg:text-lg">
          <div class="w-1/4 mr-6">
            <label>Plaza Cobro:</label>
            <label style="font-weight: normal">{{ datosUser.plaza }}</label>
          </div>
          <div class="w-1/4">
            <label class for="inline-full-name">Fecha Falla:</label>
            <input
              v-model="datosSinester.FailureDate"
              class="appearance-none border border-black"
              type="date"
            />
          </div>
          <div class="w-1/4 h-8"></div>
          <div class="w-1/4 h-8">
            <label>Tecnico Responsable:</label>
            <label style="font-weight: normal;">{{ datosUser.nombre }}</label>
          </div>
        </div>
        <!--***********************************************************-->
        <div class="flex md:text-xs lg:text-lg">
          <div class="w-1/4"></div>
          <div class="w-1/4"></div>
          <div class="w-1/4"></div>
          <div class="w-1/4">
            <label>Coordinacion Regional:</label>
            <label style="font-weight: normal;">{{ datosUser.regionalCoordination }}</label>
          </div>
        </div>
        <!--***********************************************************-->
        <div class="flex md:text-xs text-sm">
          <div class="w-1/4"></div>
          <div class="w-1/4"></div>
          <div class="w-1/4"></div>
          <div class="w-1/4">
            <label>Centro de Servicio:</label>
            <label>CDMX</label>
          </div>
        </div>
        <!--***********************************************************-->

        <div class="flex md:text-xs lg:text-sm">
          <div class="w-1/4"></div>

          <div class="w-1/4"></div>

          <div class="w-1/4"></div>

          <div class="w-1/4">
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
        this.datosSinester.ShippingElaboracionDate.substr(8, 2)
      );
      let mesActual = parseInt(
        this.datosSinester.ShippingElaboracionDate.substr(6, 2)
      );
      let yearActual = parseInt(
        this.datosSinester.ShippingElaboracionDate.substr(0, 4)
      );
      let diaCorriente = 0;
      let newYear = parseInt(
        this.datosSinester.ShippingElaboracionDate.substr(2, 2)
      );

      diaCorriente = diaActual;

      for (let i = 1; i < mesActual; i++) {
        diaCorriente += parseInt(new Date(yearActual, i, 0).getDate());
      }

      let numPlaza = parseInt(this.datosUser.plaza.substr(0, 3));

      let nomPlaza = "";

      if (numPlaza != null) {
        if (numPlaza == "004") nomPlaza = "TPZ";
        else if (numPlaza == "102") {
          nomPlaza = "PMO";
        } else if (numPlaza == "103") nomPlaza = "TLPA";
        else if (numPlaza == "041") nomPlaza = "SLM";
        else if (numPlaza == "061") nomPlaza = "LBM";
        else if (numPlaza == "069") nomPlaza = "JOR";
        else if (numPlaza == "070") nomPlaza = "POL";
        else if (numPlaza == "127") nomPlaza = "CHI";
        else if (numPlaza == "183") nomPlaza = "VIL";
        else if (numPlaza == "186") nomPlaza = "CGO";
        else nomPlaza = "Inserte un numero correcto";
      } else {
        ("Inserte un numero correcto");
      }

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
      // console.log( this.datosSinester.ReferenceNumber + "desde vista");
    }
  },
  computed: {
    messageSinester: function() {
      if (this.datosSinester.SinisterNumber == "") return "Campo requerido";
      else return "Numero Repetido";
    },
    messageReport: function() {
      if (this.datosSinester.ReportNumber == "") return "Campo requerido";
      else return "Numero Repetido";
    },
    validateNumerSinester: function() {
      if (this.datosSinester.SinisterNumber == "") {
        let newObject = {
          index: 0,
          data: false
        };
        this.$store.commit("DTC/validacionMutation", newObject);
        return true;
      } else {
        let listaUnique = this.$store.getters["Header/getListaunique"];

        for (let i = 0; i < listaUnique.length; i++) {
          if (
            this.datosSinester.SinisterNumber ==
            listaUnique[i]["sinisterNumber"]
          ) {
            let newObject = {
              index: 0,
              data: true
            };
            this.$store.commit("DTC/validacionMutation", newObject);
            return true;
          }
        }

        let newObject = {
          index: 0,
          data: false
        };
        this.$store.commit("DTC/validacionMutation", newObject);
        return false;
      }
    },
    validateNumerReport: function() {
      if (this.datosSinester.ReportNumber == "") {
        let newObject = {
          index: 1,
          data: false
        };
        this.$store.commit("DTC/validacionMutation", newObject);
        return true;
      } else {
        let listaUnique = this.$store.getters["Header/getListaunique"];

        for (let i = 0; i < listaUnique.length; i++) {
          if (
            this.datosSinester.ReportNumber == listaUnique[i]["reportNumber"]
          ) {
            let newObject = {
              index: 1,
              data: true
            };
            this.$store.commit("DTC/validacionMutation", newObject);
            return true;
          }
        }
        let newObject = {
          index: 1,
          data: false
        };
        this.$store.commit("DTC/validacionMutation", newObject);
        return false;
      }
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
    await this.$store.dispatch("Refacciones/buscarComponentes");
    this.listaComponentes = await this.$store.getters[
      "Refacciones/getListaRefacciones"
    ];

    await this.$store.dispatch("DTC/buscarDescriptions");
    this.listaDescripciones = await this.$store.getters[
      "DTC/getListaDescriptions"
    ];
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
