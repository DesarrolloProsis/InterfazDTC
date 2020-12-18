  
<template>
  <div>
    <div class="m-0 p-0 bg-white" :class="{ 'pointer-events-none': modalReferencia, 'opacity-75':modalReferencia }">
      <div class="mt-8 grid grid-cols-3 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 md:border border-black px-8 pt-6 pb-8 w-full sm:screen  flex-col flex-wrap my-2">
      <!-- /////////////////////////////////////////////////////////////////
      ////                          TITULO                              ////
      ///////////////////////////////////////////////////////////////////// -->
        <div class="box-content p-4 border-4 border-gray-400 xl:w-3/4">
        <img src="../../assets/img/prosis-logo.jpg" class="xl:h-12 4k:h-12" />
        </div>
        <div class="border-2 border-black text-center h-24 text-gray-800 p-0 md:text-lg lg:text-3xl font-extrabold">
        Dictamen Tecnico y Cotizacion
        </div>
        <div class="text-left">
        <br />
        <label class="mr-2 ml-5 text-lg">Referencia:</label>
        <label style="font-weight: bold">{{ datosSinester.ReferenceNumber }}</label>
        </div>
      <!-- //////////////////////////////////////////////////////////////////
      ////                       SUB-TITULO                              ////
      ///////////////////////////////////////////////////////////////////// -->
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
        <div class="text-left">
        <br />
        <label class="inline-full-name" style="font-weight: normal">Tipo de Dictamen:</label>
        <label class="inline-full-name" style="padding-left: 0.5vw">CORRECTIVO</label>
        </div>
      <!-- //////////////////////////////////////////////////////////////////
      ////                   PRIMERA LINEA                              ////
      ///////////////////////////////////////////////////////////////////// -->
        <div class="mr-6">
        <label>Atencion:</label>
        <label class="ml-2 text-sm" style="font-weight: normal">{{ datosUser.managerName }}</label>
        </div>
        <div class="sm:flex-col pr-2 inline-block">
        <p class="w-1/2 text-md mb-1 font-semibold text-gray-900">No. Siniestros</p>
        <input
          v-validate="'uniqueSinester'"
          :class="{ is_valid: !errors.first('NoSiniestro'),is_invalid: errors.first('NoSiniestro')}"
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
          :class="{ is_valid: !errors.first('NoReporte'),is_invalid: errors.first('NoReporte')}"
          class="w-full"
          type="text"
          name="NoReporte"
        />
        <p class="text-red-600 text-xs">{{ errors.first("NoReporte") }}</p>
        </div>      
        <div class="pr-2">
        <p class="text-md font-semibold mb-1 text-gray-900">Tipo de Descripcion</p>
        <select
          v-model="datosSinester.TypeDescriptionId"
          v-validate="'required'"
          :class="{ is_valid: !errors.first('TipoDescripcion'),is_invalid: errors.first('TipoDescripcion')}"
          class="w-full"
          type="text"
          name="TipoDescripcion"
        >
          <option disabled value>Selecionar...</option>
          <option
            v-for="(desc, index) in descripciones"
            v-bind:value="desc.typeDescriptionId"
            :key="index"
          >
            {{ desc.description }}
          </option>
        </select>
        <p class="text-red-600 text-xs">{{ errors.first("TipoDescripcion") }}</p>
        </div>
      <!-- //////////////////////////////////////////////////////////////////
      ////                   SEGUNDA LINEA                              ////
      ///////////////////////////////////////////////////////////////////// -->
        <div class="mr-6">
        <label class="inline">Cargo:</label>
        <label class="inline ml-2 text-sm" style="font-weight: normal">{{ datosUser.position }}</label>
        </div>
        <div class="pr-2">
        <p class="text-md mb-1 font-semibold text-gray-900">Fecha de Siniestro:</p>
        <input
          @change="crearReferencia()"
          v-validate="`required|before:${fecha_validacion}`"          
          :class="{ is_valid: !errors.first('FechaSiniestro'),is_invalid: errors.first('FechaSiniestro')}"
          :disabled="fechaSiniestoEdit"
          v-model="datosSinester.SinisterDate"
          class="w-full"
          name="FechaSiniestro"
          type="date"
        />
        <p class="text-red-600 text-xs">{{ errors.first("FechaSiniestro") }}</p>
        </div>
        <div class="pr-2">
        <p class="text-md mb-1 font-semibold text-gray-900">Fecha de Envio:</p>
        <input
          v-model="datosSinester.ShippingElaboracionDate"
          v-validate="`required|before:${fecha_validacion}`"
          :class="{ is_valid: !errors.first('FechaEnvio'),is_invalid: errors.first('FechaEnvio')}"
          class="w-full"
          type="date"
          name="FechaEnvio"          
        />
        <p class="text-red-600 text-xs">{{ errors.first("FechaEnvio") }}</p>
        </div>
      <!-- //////////////////////////////////////////////////////////////////
      ////                   TERCERA LINEA                              ////
      ///////////////////////////////////////////////////////////////////// -->
        <div class="mr-6">
        <label class="inline">Correo:</label>
        <label class="inline ml-2 text-sm" style="color: blue">{{ datosUser.mail }}</label>
        </div>
        <div class="pr-2">
        <p class="text-md mb-1 font-semibold text-gray-900">Folio de Falla:</p>
        <input
          v-model="datosSinester.FailureNumber"
          class="w-full"
          type="text"
          placeholder="S/M"
        />
        </div>
        <div class="pr-2">
        <p class="text-md mb-1 font-semibold text-gray-900">Fecha de Elaboracion:</p>
        <input disabled="true" class="w-full" type="date" readonly />
        </div>
      <!-- //////////////////////////////////////////////////////////////////
      ////                   CUARTA  LINEA                              ////
      ///////////////////////////////////////////////////////////////////// -->
        <div class="mr-6">
        <label>Plaza Cobro:</label>
        <label class="text-sm text-gray-900 ml-2" style="font-weight: normal">{{ datosUser.plaza }}</label>
        </div>
        <div class="pr-2">
        <p class="text-md mb-1 font-semibold text-gray-900">Fecha de Falla:</p>
        <input v-model="datosSinester.FailureDate" v-validate="`required|before:${fecha_validacion}`" :class="{ is_valid: !errors.first('FechaFalla'),is_invalid: errors.first('FechaFalla')}" class="w-full" name="FechaFalla" type="date" />
        <p class="text-red-600 text-xs">{{ errors.first("FechaFalla") }}</p>
        </div>
        <div class="pr-2">
        <label>Tecnico Responsable:</label>
        <label class="text-md ml-2" style="font-weight: normal">{{ datosUser.nombre }}</label>
        </div>
      <!-- //////////////////////////////////////////////////////////////////
      ////                   QUINTA  LINEA                              ////
      ///////////////////////////////////////////////////////////////////// -->
        <div class="text-sm">
        <p class="text-md font-semibold mb-1 text-gray-900">Cambiar Plaza</p>
        <select
          v-model="plazaSelect"
          @change="cambiarPlaza"
          :disabled="boolCambiarPlaza"
          class="w-48"
          type="text"
          name="TipoDescripcion"
        >
          <option disabled value>Selecionar...</option>
          <option
            v-for="(item, index) in listaPlazasUser"
            v-bind:value="item.numPlaza"
            :key="index"
          >
            {{ item.plazaName }}
          </option>
        </select>
        <span v-if="boolCambiarPlaza" class="block m-1 text-red-600">Advertencia una vez creado no puedes cambiar la plaza</span>
        </div>
        <div></div>
        <div class="pr-2">
        <label>Coordinacion Regional:</label>
        <label class="text-md" style="font-weight: normal">{{ datosUser.regionalCoordination }}</label>
        </div>
      <!-- //////////////////////////////////////////////////////////////////
      ////                   SEXTA LINEA                              ////
      ///////////////////////////////////////////////////////////////////// -->
        <div></div>
        <div></div>
        <div class="pr-2">
        <label>Centro de Servicio: Ciudad de México</label>
        <label></label>
        </div>
      <!-- //////////////////////////////////////////////////////////////////
      ////                   SEPTIMA LINEA                              ////
      ///////////////////////////////////////////////////////////////////// -->
        <div></div>
        <div></div>
        <div class="pr-2">
        <label>Correo:</label>
        <label>hguzman@grupo-prosis.com</label>
        </div>   
        <br />
        <br />
      </div>
      <!-- //////////////////////////////////////////////////////////////////
      ////                    TABLA EQUIPO MALO                         ////
      ///////////////////////////////////////////////////////////////////// -->
      <TablaEquipoMalo
        :listaComponentes="listaComponentes"
        :dateSinester="datosSinester.SinisterDate"
      ></TablaEquipoMalo>
    </div>
      <!--/////////////////////////////////////////////////////////////////
        ////                  MODAL RREFERENCIAS                         ////
        ////////////////////////////////////////////////////////////////////-->
        <div class="flex absolute justify-center inset-x-0 top-0 mt-66 opacity-100">
          <div v-if="modalReferencia" class="rounded-lg border border-gray-700 bg-white px-10 py-8 shadow-2xl">
            <p class="text-gray-900  text-center text-xl">Seleccione una Referencia</p>
            <div class="justify-center mt-10 inline-block">
              <div>
                <select
                    v-model="referenceSelected"                                        
                    class="w-full"
                    type="text"                    
                >
                  <option disabled value="">Selecionar...</option>
                  <option
                    v-for="(item, index) in arrayReference"
                    v-bind:value="item.referenceNumber"
                    :key="index"
                  >
                    {{ item.referenceNumber }}
                  </option>
                </select>
                </div>
                <div class="mt-10">                  
                    <button @click="confirmar_referencia(false)" class="text-white  px-4 py-3 rounded-lg m-2 bg-red-700">Cancelar</button>
                    <button @click="confirmar_referencia(true)" class="text-white  px-5 py-3 rounded-lg m-2 bg-green-600">Aceptar</button>
                </div>
            </div>
          </div>
      </div>
</div>
</template>

<script>
import TablaEquipoMalo from "../DTC/TablaEquipoMalo";
import EventBus from "../../services/EventBus.js";
import moment from "moment";
export default {
  name: "CrearHeader",
/////////////////////////////////////////////////////////////////////
////                          PROPS                              ////
/////////////////////////////////////////////////////////////////////
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
    listaPlazasUser: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    TablaEquipoMalo,
  },
/////////////////////////////////////////////////////////////////////
////                          DATA                               ////
/////////////////////////////////////////////////////////////////////
  data() {
    return {
      datosSinester: {
        ReferenceNumber: "",
        SinisterNumber: "",
        ReportNumber: "",
        SinisterDate: "",
        FailureDate: "",
        FailureNumber: "",
        ShippingElaboracionDate: '',  
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
      plazaSelect: 0,
      boolCambiarPlaza: false,
      fecha_validacion: '',
      modalReferencia: false,
      arrayReference: [],
      referenceSelected: ''
    };
  },
/////////////////////////////////////////////////////////////////////
////                       CICLOS DE VIDA                        ////
/////////////////////////////////////////////////////////////////////
created: function (){
    EventBus.$on("validar_header", async () => {
      await this.$validator.validateAll().then((item) => {
        if(item == false){
          this.errors.items.map((error) => {            
            this.$notify.warning({
              title: "Ups!",
              msg: `FALTA LLENAR EL CAMPO ${error.field.toUpperCase()}.`,
              position: "bottom right",
              styles: {
                height: 100,
                width: 500,
              },
            });
          })
        }
      })
    });
},
beforeMount: async function () {    
  let f = new Date()
  this.datosSinester.ShippingElaboracionDate = moment(f,"DD-MM-YYYY").format("YYYY-MM-DD");
  this.fecha_validacion = moment(f, "DD-MM-YYYY").add('days', 1).format("YYYY-MM-DD");
  this.plazaSelect = this.listaPlazasUser[this.plazaSelect = this.$store.state.Login.PLAZAELEGIDA].numPlaza;
  let value = await this.$store.getters["Header/getConvenioPlaza"];
  await this.$store.dispatch("Refacciones/buscarComponentes", value);
  this.listaComponentes = await this.$store.getters["Refacciones/getListaRefacciones"];
  await this.$store.dispatch("DTC/buscarDescriptions");
  this.listaDescripciones = await this.$store.getters["DTC/getListaDescriptions"];
  if (JSON.stringify(this.headerEdit) != "{}") {      
    this.boolCambiarPlaza = true
    this.datosSinester.ReferenceNumber = this.headerEdit.referenceNumber;
    this.datosSinester.SinisterNumber = this.headerEdit.sinisterNumber;
    this.datosSinester.ReportNumber = this.headerEdit.reportNumber;
    this.datosSinester.SinisterDate = moment(this.headerEdit.sinisterDate).format("YYYY-MM-DD");
    this.datosSinester.FailureNumber = this.headerEdit.failureNumber;
    this.datosSinester.FailureDate = moment(this.headerEdit.failureDate).format("YYYY-MM-DD");
    this.datosSinester.ShippingElaboracionDate = moment(this.headerEdit.shippingDate).format("YYYY-MM-DD");
    this.datosSinester.TypeDescriptionId = this.headerEdit.typeDescriptionId;
    this.fechaSiniestoEdit = true;
  }  
},
/////////////////////////////////////////////////////////////////////
////                            METODOS                          ////
/////////////////////////////////////////////////////////////////////
methods: {
  confirmar_referencia(value){
    if(value){
    this.$store.commit("Header/referenceNumMutation", this.referenceSelected)
    this.datosSinester.ReferenceNumber = this.referenceSelected
    this.modalReferencia = false
    }
    else{
      this.datosSinester.SinisterDate = ''
      this.datosSinester.ReferenceNumber = ''
      this.referenceSelected = ''
      this.$store.commit("Header/referenceNumMutation", this.referenceSelected)
      this.modalReferencia = false
    }
  },
  async crearReferencia() {
      let _datesplit = this.datosSinester.SinisterDate.split("-");
      let _diaActual = parseInt(_datesplit[2]);
      let _mesActual = parseInt(_datesplit[1]);
      let _yearActual = parseInt(_datesplit[0]);
      let _diaCorriente = 0;
      let _newYear = parseInt(this.datosSinester.SinisterDate.substr(2, 2));
      _diaCorriente = _diaActual;
      for (let i = 1; i < _mesActual; i++) {
        _diaCorriente += parseInt(new Date(_yearActual, i, 0).getDate());
      }
      let _nomPlaza = this.datosUser.referenceSquare;
      let _autoCompleteDias;
      if (_diaCorriente < 10) {
        _autoCompleteDias = "00" + _diaCorriente.toString();
      } else if (_diaCorriente < 100) {
        _autoCompleteDias = "0" + _diaCorriente.toString();
      } else {
        _autoCompleteDias = _diaCorriente.toString();
      }
      this.datosSinester.ReferenceNumber = _nomPlaza + "-" + _newYear + _autoCompleteDias;
      await this.$store.commit("Header/referenceNumMutation",this.datosSinester.ReferenceNumber);
      await this.$store.dispatch("Header/buscarReferencia",this.datosSinester.ReferenceNumber);
      let _arrayReference  = await this.$store.getters["Header/getreferenceNum"];
      if(typeof(_arrayReference) == 'object'){
          this.arrayReference = _arrayReference
          this.modalReferencia = true
      }
      else{
        this.datosSinester.ReferenceNumber = await this.$store.getters["Header/getreferenceNum"];
      }      
      
  },
  async cambiarPlaza() {   
      this.listaComponentes = []  
      let index = this.listaPlazasUser.findIndex(
        (item) => item.numPlaza == this.plazaSelect
      );
      this.$store.commit("Header/PLAZAELEGIDAMUTATION", index);
      this.$store.commit("Login/PLAZAELEGIDAMUTATION", index);
      EventBus.$emit("ACTUALIZAR_HEADER", index);
      this.plazaSelect = this.listaPlazasUser[index].numPlaza;
      let value = await this.$store.getters["Header/getConvenioPlaza"];
      await this.$store.dispatch("Refacciones/buscarComponentes", value);
      this.listaComponentes = await this.$store.getters["Refacciones/getListaRefacciones"];
      await this.$store.dispatch("DTC/buscarDescriptions");
      this.listaDescripciones = await this.$store.getters[
        "DTC/getListaDescriptions"
      ];      
      this.crearReferencia()      
      if (JSON.stringify(this.headerEdit) != "{}") {
        this.datosSinester.ReferenceNumber = this.headerEdit.referenceNumber;
        this.datosSinester.SinisterNumber = this.headerEdit.sinisterNumber;
        this.datosSinester.ReportNumber = this.headerEdit.reportNumber;
        this.datosSinester.SinisterDate = moment(this.headerEdit.sinisterDate).format("YYYY-MM-DD");
        this.datosSinester.FailureNumber = this.headerEdit.failureNumber;
        this.datosSinester.FailureDate = moment(this.headerEdit.failureDate).format("YYYY-MM-DD");
        this.datosSinester.ShippingElaboracionDate = moment(this.headerEdit.shippingDate).format("YYYY-MM-DD");
        this.datosSinester.TypeDescriptionId = 2;
        this.fechaSiniestoEdit = true;
      }
  }
},
//////////////////////////////////////////////////////////////////////
////                          OBSERVADORES                        ////
/////////////////////////////////////////////////////////////////////
watch: {    
  datosUser: function (newValue) {
      this.datosSinester.UserId = newValue["userId"];
      this.datosSinester.AgremmentInfoId = newValue["agremmentInfoId"];
  },
  datosSinester: {
      deep: true,
      handler(datosSinester) {
        this.$store.commit("Header/datosSinesterMutation", datosSinester);
      },
  }
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