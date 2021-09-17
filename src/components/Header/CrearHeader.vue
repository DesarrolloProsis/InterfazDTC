<template>
  <div class="sm:text-xs">    
    <div class="m-0 p-0 bg-white" :class="{ 'pointer-events-none': modalReferencia, 'opacity-75':modalReferencia }">
      <ValidationObserver ref="observer">  
      <div class="mt-8 grid grid-cols-3 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 md:border border-black px-8 pt-6 pb-8 w-full sm:screen  flex-col flex-wrap my-2 sm:-mb-16">
          <!-- /////////////////////////////////////////////////////////////////
          ////                          TITULO                              ////
          ///////////////////////////////////////////////////////////////////// -->            
          <div class="box-content p-4 xl:w-3/4 sm:-mt-12 justify-items-center">
            <img src="../../assets/img/prosis-logo.jpg" class="xl:h-16 4k:h-12 xl:ml-20 lg:ml-1 md:ml-1 sm:ml-1 " />
          </div>
          <div class="text-3xl text-center h-24 text-gray-800 md:text-lg lg:text-3xl font-titulo font-bold p-4 sm:text-sm sm:-mb-32 sm:-mt-6">Dictamen Tecnico y Cotizacion</div>
          <div class="text-left font-titulo">
            <br />
            <span class="mr-2 ml-5 text-lg font-semibold sm:ml-0 sm:text-xs">Referencia:</span>
            <span style="font-weight: bold">{{ datosSinester.ReferenceNumber }}</span>
          </div>
          <!-- //////////////////////////////////////////////////////////////////
          ////                       SUB-TITULO                              ////
          ///////////////////////////////////////////////////////////////////// -->
          <div>
            <br class="sm:hidden"/>
            <span class for="inline-full-name font-titulo" style="font-weight: normal">Contrato / Oferta:</span>
            <span style="font-weight: bold; padding-left: 0.5vw">{{ headerSelecionado.agrement }}</span>
          </div>
          <!-- //////////////////////////////////////////////////////////////////
          ////                       SUB-TITULO                              ////
          ///////////////////////////////////////////////////////////////////// -->
          <div>
            <br />
            <div class="text-xl text-center font-titulo font-bold sm:-mb-6">
              <h6 class="sm:text-sm">En caso de Siniestro</h6>
            </div>
          </div>
          <!-- //////////////////////////////////////////////////////////////////
          ////                       SUB-TITULO                              ////
          ///////////////////////////////////////////////////////////////////// -->
          <div class="text-left">
            <br />
            <span class="inline-full-name font-titulo font-medium" style="font-weight: normal">Tipo de Dictamen:</span>
            <span class="inline-full-name font-titulo font-semibold" style="padding-left: 0.5vw">CORRECTIVO</span>
          </div>
          <!-- //////////////////////////////////////////////////////////////////
          ////                   PRIMERA LINEA                              ////
          ///////////////////////////////////////////////////////////////////// -->
          <div class="mr-6 font-titulo">
              <span class="font-semibold">Atencion:</span>
              <span class="ml-2 text-sm font-titulo" style="font-weight: normal">{{ headerSelecionado.managerName }}</span>
          </div>
          <div class="sm:flex-col pr-2 inline-block font-titulo">
            <ValidationProvider name="NoSiniestro" immediate rules="max:30" :custom-messages="{ uniqueSinester: 'Numero de siniestro repetido' }" v-slot="{ errors }">                            
                <p class="w-1/2 text-md mb-1 font-medium text-gray-900">No. Siniestros:</p>
                <input v-model="datosSinester.SinisterNumber" class="w-full font-titulo font-normal is_valid" name="NoSiniestro" type="text"/>
                <span class="text-red-600 text-xs block">{{ errors[0] }}</span>
            </ValidationProvider>                                      
            <template v-if="$route.params.tipoFalla == 3">
                <ValidationProvider name="NoOficio" immediate rules="max:20" :custom-messages="{ uniqueReport: 'Numero de reporte repetido' }"  v-slot="{ errors }">
                  <p class="w-1/2 mt-2 text-md mb-1 font-medium text-gray-900">No. Oficio:</p>
                  <input v-model="datosSinester.ReportNumber" immediate class="w-full is_valid" type="text" name="NoOficio"/>  
                  <span class="text-red-600 text-xs block">{{ errors[0] }}</span>                
                </ValidationProvider>
            </template>
            <template v-else>
                  <p class="w-1/2 mt-2 text-md mb-1 font-medium text-gray-900">No. Reporte:</p>
                  <input v-model="datosSinester.ReportNumber" class="w-full is_valid" type="text" name="NoReporte"/>  
            </template>
          </div>      
          <div class="pr-2 font-titulo">
            <!-- <ValidationProvider name="TipoDescripcion" rules="required"  v-slot="{ errors }"> -->
              <p class="text-md font-medium mb-1 text-gray-900">Tipo de Descripcion</p>
              <select v-model="datosSinester.TypeDescriptionId" class="w-full font-titulo font-normal is_valid" type="text" name="TipoDescripcion">                
                <option v-for="(desc, index) in descripciones" :value="desc.typeDescriptionId" :key="index">
                  {{ desc.description }}
                </option>
              </select>
              <!-- <span class="text-red-600 text-xs block">{{ errors[0] }}</span> -->
            <!-- </ValidationProvider>               -->
          </div>
          <!-- //////////////////////////////////////////////////////////////////
          ////                   SEGUNDA LINEA                              ////
          ///////////////////////////////////////////////////////////////////// -->
            <div class="mr-6 font-titulo -mt-20 sm:mt-0">
              <span class="inline font-semibold">Cargo:</span>
              <span class="inline ml-2 text-sm font-titulo" style="font-weight: normal">{{ headerSelecionado.position }}</span>
            </div>
            <div class="pr-2 font-titulo">
              <ValidationProvider name="FechaSiniestro" immediate rules="required|fechaMenorNow" :custom-messages="{ fechaMenorNow: 'La fecha debe ser menor que la fecha actual' }" v-slot="{ errors }">
                <p class="text-md mb-1 font-medium text-gray-900">Fecha de Siniestro:</p>
                <input v-model="datosSinester.SinisterDate" @change="crear_referencia_dtc()" class="w-full font-titulo is_valid" :disabled="fechaSiniestoEdit" name="FechaSiniestro" type="date" onkeydown="return false"/>              
                <span class="text-red-600 text-xs block">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <div class="pr-2 font-titulo -mt-16 sm:mt-0">
              <ValidationProvider name="FechaEnvio" immediate rules="required"  v-slot="{ errors }">
                <p class="text-md mb-1 font-medium text-gray-900">Fecha de Envio:</p>
                <input v-model="datosSinester.ShippingElaboracionDate" class="w-full is_valid" type="date" name="FechaEnvio" onkeydown="return false"/>
                <span class="text-red-600 text-xs block">{{ errors[0] }}</span>
              </ValidationProvider>              
            </div>
            <!-- //////////////////////////////////////////////////////////////////
            ////                   TERCERA LINEA                              ////
            ///////////////////////////////////////////////////////////////////// -->
            <div class="mr-6 font-titulo -mt-24 sm:mt-0">
            <span class="inline font-semibold">Correo:</span>
            <span class="inline ml-2 text-md font-titulo font-normal" style="color: blue">{{ headerSelecionado.mail }}</span>
            </div>  
            <div class="pr-2 font-titulo">
              <ValidationProvider name="FolioFalla" immediate rules="max:60"  v-slot="{ errors }">
                <p class="text-md mb-1 font-medium text-gray-900">Folio de Falla:</p>              
                <input v-model="datosSinester.FailureNumber" class="w-full is_valid" name="FolioFalla" type="text" placeholder="S/M"/>
                <span class="text-red-600 text-xs block">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <div class="pr-2 font-titulo -mt-16 sm:mt-0">
              <p class="text-md mb-1 font-medium text-gray-900">Fecha de Elaboracion:</p>
              <input disabled="true" class="w-full is_valid" type="date" readonly />
            </div>
            <!-- //////////////////////////////////////////////////////////////////
            ////                   CUARTA  LINEA                              ////
            ///////////////////////////////////////////////////////////////////// -->
            <div class="mr-6 font-titulo -mt-24 sm:mt-0">
              <span class="font-semibold">Plaza Cobro:</span>
              <span class="text-sm text-gray-900 ml-2" style="font-weight: normal">{{ headerSelecionado.plaza }}</span>
            </div>
            <div class="pr-2 font-titulo">
              <ValidationProvider name="FechaFalla" immediate rules="required|fechaMenorNow" :custom-messages="{ fechaMenorNow: 'La fecha debe ser menor que la fecha actual' }"  v-slot="{ errors }">
                <p class="text-md mb-1 font-medium text-gray-900">Fecha de Falla:</p>
                <input v-model="datosSinester.FailureDate" class="w-full is_valid" name="FechaFalla" type="date" onkeydown="return false"/>
                <span class="text-red-600 text-xs block">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <div class="pr-2 font-titulo -mt-16 sm:mt-0">
              <span class="text-lg font-semibold sm:text-xs">Tecnico Responsable:</span>
              <span class="text-lg ml-2 sm:text-xs" style="font-weight: normal">{{ headerSelecionado.nombre }}</span>
            </div>
            <!-- //////////////////////////////////////////////////////////////////
            ////                   QUINTA  LINEA                              ////
            ///////////////////////////////////////////////////////////////////// -->
          <div class="text-sm -mt-24 sm:mt-0" :class="{'hidden': boolCambiarPlaza == false}">
            <SelectPlaza @actualizar-plaza="cambiar_plaza" :fullPlazas="true" :tipo="'editDTC'"></SelectPlaza>
            <span v-if="boolCambiarPlaza" class="block m-1 text-red-600 font-titulo font-normal">Advertencia una vez creado no puedes cambiar la plaza</span>
          </div>
          <div class="text-sm -mt-32 sm:-mt-1" :class="{'hidden': boolCambiarPlaza == true}">
            <span class="text-lg font-semibold font-titulo sm:text-xs">Cambiar Plaza:</span>
            <SelectPlaza @actualizar-plaza="cambiar_plaza" :fullPlazas="true" :tipo="'tipoPlazaSelect'"></SelectPlaza>
            <!-- <span v-if="boolCambiarPlaza" class="block m-1 text-red-600">Advertencia una vez creado no puedes cambiar la plaza</span> -->
          </div>
          <div></div>
          <div class="pr-2 font-titulo -mt-20 sm:-mt-4">
            <span class="font-semibold text-lg sm:text-xs">Coordinacion Regional:</span>
            <label class="text-md" style="font-weight: normal">{{ headerSelecionado.regionalCoordination }}</label>
          </div>
            <!-- //////////////////////////////////////////////////////////////////
            ////                   SEXTA LINEA                              ////
            ///////////////////////////////////////////////////////////////////// -->
            <div></div>
            <div></div>
            <div class="pr-2 font-titulo -mt-12 sm:-mt-10">
              <span class="font-semibold text-lg sm:text-xs">Centro de Servicio: Ciudad de México</span>
              <label></label>
            </div>
          <!-- //////////////////////////////////////////////////////////////////
          ////                   SEPTIMA LINEA                              ////
          ///////////////////////////////////////////////////////////////////// -->
            <div class="sm:hidden"></div>
            <div class="sm:hidden"></div>
            <div class="pr-2 font-titulo -mt-8 sm:-mt-8">
              <span class="font-semibold text-lg sm:text-xs">Correo:</span>
              <span class="font-semibold text-lg sm:text-xs">hguzman@grupo-prosis.com</span>
            </div>   
            <br class="sm:hidden"/>
            <br class=""/>        
      </div> 
      </ValidationObserver>     
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
          <div v-if="modalReferencia" class="rounded-lg border border-gray-400 bg-white px-10 py-8 shadow-2xl">
            <p class="text-gray-900  text-center text-xl">Seleccione una Referencia</p>
            <div class="justify-center mt-10 inline-block">
              <div>
                <select v-model="referenceSelected" class="w-full is_valid" type="text">
                  <option disabled value="">Selecionar...</option>
                  <option v-for="(item, index) in arrayReference" :value="item.referenceNumber" :key="index">{{ item.referenceNumber }}</option>
                </select>
                </div>
                <div class="mt-10">                  
                    <button @click="confirmar_referencia(false)" class="font-boton px-4 py-3 rounded-lg m-2 botonIconCancelar">Cancelar</button>
                    <button @click="confirmar_referencia(true)" class="font-boton px-5 py-3 rounded-lg m-2 botonIconCrear">Aceptar</button>
                </div>
            </div>
          </div>
    </div>      
</div>
</template>

<script>
import TablaEquipoMalo from "../DTC/TablaEquipoMalo";
import ServiceReportePDF from '../../services/ReportesPDFService'
import EventBus from "../../services/EventBus.js";
import SelectPlaza from '../Header/SelectPlaza'
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
    headerEdit: {
      type: Object,
      default: () => {},
    },
    datosUser: {
      type: Object,
      default: () => {}
    }     
  },
  components: {
    TablaEquipoMalo,
    SelectPlaza,
    
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
        TypeDescriptionId: 1,
        UserId: null,
        AgremmentInfoId: null,
        Descripcion: null,
        Observaciones: null,
      },
      listaComponentes: [],
      fechaSiniestoEdit: false,
      sizeSmall: false,      
      boolCambiarPlaza: false,
      fecha_validacion: '',
      modalReferencia: false,
      arrayReference: [],
      referenceSelected: '',      
      tipoPlazaSelect: '',      
    };
  },
/////////////////////////////////////////////////////////////////////
////                       CICLOS DE VIDA                        ////
/////////////////////////////////////////////////////////////////////
created:  function (){            
    EventBus.$on('validar_header_dtc', (value) => this.validar_header(value));
},
beforeMount: async function () {    
  let f = new Date()
  this.tipoPlazaSelect = 'insersion'        
  this.datosSinester.ShippingElaboracionDate = moment(f,"DD-MM-YYYY").format("YYYY-MM-DD");
  this.fecha_validacion = moment(f, "DD-MM-YYYY").add('days', 1).format("YYYY-MM-DD");  
  let value = await this.$store.getters["Header/GET_CONVENIO_PLAZA"];
  await this.$store.dispatch("Refacciones/BUSCAR_COMPONETES", value);
  this.listaComponentes = await this.$store.state.Refacciones.listaRefacciones
  await this.$store.dispatch("DTC/BUSCAR_DESCRIPCIONES_DTC");
  this.listaDescripciones = await this.$store.state.DTC.listaDescriptions
  if (JSON.stringify(this.headerEdit) != "{}") {    
    this.tipoPlazaSelect = 'edicion'      
    this.boolCambiarPlaza = true
    this.datosSinester.ReferenceNumber = this.headerEdit.referenceNumber;
    this.datosSinester.SinisterNumber = this.headerEdit.sinisterNumber;
    this.datosSinester.ReportNumber = this.headerEdit.reportNumber;
    this.datosSinester.SinisterDate = await moment(this.headerEdit.sinisterDate).format("YYYY-MM-DD");
    this.datosSinester.FailureNumber = this.headerEdit.failureNumber;
    this.datosSinester.FailureDate = moment(this.headerEdit.failureDate).format("YYYY-MM-DD");
    this.datosSinester.ShippingElaboracionDate = moment(this.headerEdit.shippingDate).format("YYYY-MM-DD");
    this.datosSinester.TypeDescriptionId = this.headerEdit.typeDescriptionId;
    this.fechaSiniestoEdit = true;    
  }  
},
destroyed(){
  EventBus.$off('validar_header_dtc')
},
/////////////////////////////////////////////////////////////////////
////                            METODOS                          ////
/////////////////////////////////////////////////////////////////////
methods: {
  confirmar_referencia(value){
    if(value){
      this.$store.commit("Header/REFERENCIA_DTC_MUTATION", this.referenceSelected)
      this.datosSinester.ReferenceNumber = this.referenceSelected
      this.modalReferencia = false
    }
    else{
      this.datosSinester.SinisterDate = ''
      this.datosSinester.ReferenceNumber = ''
      this.referenceSelected = ''
      this.$store.commit("Header/REFERENCIA_DTC_MUTATION", this.referenceSelected)
      this.modalReferencia = false
    }
  },
  crear_referencia_dtc: async function () {      
      let _arrayReference  = await ServiceReportePDF.crear_referencia(
        moment(this.datosSinester.SinisterDate,"YYYY-MM-DD").format("DD-MM-YYYY"), 
        this.headerSelecionado.referenceSquare
      )
      if(typeof(_arrayReference) == 'object'){
          this.arrayReference = _arrayReference
          this.modalReferencia = true
      }
      else{
        this.datosSinester.ReferenceNumber = _arrayReference
      }          
  },
  async cambiar_plaza() {   
      this.listaComponentes = []  
      this.headerSelecionado = this.$store.getters["Header/GET_HEADER_SELECCIONADO"];
      let value = await this.$store.getters["Header/GET_CONVENIO_PLAZA"];
      await this.$store.dispatch("Refacciones/BUSCAR_COMPONETES", value);
      this.listaComponentes = await this.$store.state.Refacciones.listaRefacciones
      await this.$store.dispatch("DTC/BUSCAR_DESCRIPCIONES_DTC");
      this.listaDescripciones = await this.$store.state.DTC.listaDescriptions
      this.crear_referencia_dtc()      
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
  },
  validar_header: async function(value){        
    let fechaActual = Date.now()
    let fechaSinisestro = Date.parse(this.datosSinester.SinisterDate)
    let fechaFalla = Date.parse(this.datosSinester.FailureDate)
    if(this.datosSinester.SinisterDate != '' && this.datosSinester.FailureDate != '' && fechaSinisestro < fechaActual && fechaFalla < fechaActual){ 
      this.$store.commit("Header/DATOS_SINESTER_MUTATION", this.datosSinester);            
      this.$emit('crear-dtc', value)
    }
    else{
      this.$notify.warning({
              title: "Ops!!",
              msg: "NO SE PUDO INSERTAR LOS DATOS DEL DTC.",
              position: "bottom right",
              styles: { height: 100, width: 500 },
          });
    }
  }
  
},
//////////////////////////////////////////////////////////////////////
////                          OBSERVADORES                        ////
/////////////////////////////////////////////////////////////////////
watch: {    
  headerSelecionado: function (newValue) {
      this.datosSinester.UserId = newValue["userId"];
      this.datosSinester.AgremmentInfoId = newValue["agremmentInfoId"];
  },
  datosSinester: {
      deep: true,
      handler(datosSinester) {
        this.$store.commit("Header/DATOS_SINESTER_MUTATION", datosSinester);
      },
  },  
},
computed: {
  headerSelecionado(){    
    return this.$store.getters["Header/GET_HEADER_SELECCIONADO"];
  }
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