<template>
  <div>
      <!-- //////////////////////////////////////////////////////////////////////
      ////                         SUBIR PDF SELLADO                        ////
      ///////////////////////////////////////////////////////////////////// --> 
        <div class="sticky inset-0 font-titulo" :class="{'modal-container':modalSubirSellado}">
          <PdfEscaneado @limpiar-componente-escaneado="limpiar_componete_escaneado" @cancelar-escaneado="cancelar_escaneado" :abrirModal="modalSubirSellado" :objInsert="objInsertEscaneado" :tipoReporte="tipoEscaneado"></PdfEscaneado> 
        </div>
    <div class="w-66 sm:w-auto">
      <!--/////////////////////////////////////////////////////////////////////
      ////                         MODAL ACTUALIZAR                      /////
      ////////////////////////////////////////////////////////////////////-->
      <div class="sticky inset-0 font-titulo" :class="{'modal-container-cards':modalActualizar}">
        <div v-if="modalActualizar" class="carruselGMMEP h-62 mt-60">          
          <div class="justify-center text-center block"> 
            <h1 class="mb-10 text-center font-titulo font-bold text-4xl sm:text-xl">
              <img src="../../assets/img/warning.png" class="ml-40 mt-12 sm:-ml-6" width="50" height="50" />
              <p class="-mt-12 text-black sm:ml-6 ml-2 sm:-mt-6 text-4xl">Advertencia</p>
              <img src="../../assets/img/warning.png" class="ml-69 -mt-13 sm:-mt-10 sm:ml-49" width="50" height="50" />
            </h1>     
            <p class="m-4 mt-10 sm:ml-0 sm:w-full text-justify">Se van a Actualizar los componentes requeridos del DTC con Referencia <b>{{ infoCard.referenceNumber }}</b></p> 
          </div>
          <div class="flex justify-center">
              <button class="botonIconCrear font-boton mt-4" >
                  <span class="" @click="actualizarComponentes">Aceptar</span>
              </button>
              <button class="botonIconCancelar font-boton mt-4" @click="modalActualizar = false">
                  <span class="">Cancelar</span>
              </button>
          </div>
        </div>
      </div>
      <!-- //////////////////////////////////////////////////////////////////////
      ///    /                      REFERENCIA                              ////
      ///////////////////////////////////////////////////////////////////// -->
      <div class="flex flex-row mb-6 font-titulo">
        <div class="flex justify-between">
          <div class="font-semibold w-33">{{ infoCard.referenceNumber }}
            <br>
            <a class="font-normal text-sm text-gray-900">Estatus {{ infoCard.statusId }}:<label class="font-semibold"> {{ infoCard.statusDescription }}</label></a>
            </div>  
          <div class=" inline-flex sm:ml-10 ml-16">
            <div class="mt-1 p-0 inline-block text-sm ml-6"> 
              <p class="font-semibold">{{ infoCard.sinisterDate | formatDate }}</p>
              <span class="text-xs text-gray-800 -ml-3">*Fecha Siniestro</span>
            </div>     
          </div>
        </div>
        <hr />
      </div>
      <!-- //////////////////////////////////////////////////////////////////////
      ////                     INFORMACION DTC                              ////
      ///////////////////////////////////////////////////////////////////// -->
      <div class="flex-col md:flex-row flex mb-4 font-titulo">
        <div class="md:w-2/3">
          <p class="text-left text-sm">Usuario Asignado: <label class="font-semibold">{{ infoCard.userName }}</label></p>
          <p class="text-left text-sm">Referencia Diagnostico: <label class="font-semibold">{{ infoCard.technicalSheetReference }}</label></p>
          <p class="text-left text-sm">N° Siniestro: <label class="font-semibold">{{ infoCard.sinisterNumber }}</label></p>
          <p class="text-left text-sm">N° Reporte: <label class="font-semibold"> {{ infoCard.reportNumber }}</label></p>
          <p class="text-left text-sm break-words">Folio: <label class="font-semibold">{{ infoCard.failureNumber }}</label></p> 
          <p class="text-left text-sm break-words">Registro en Sistema: <label class="font-semibold">{{ infoCard.dateStamp | formatDate }}</label></p>        
          <p class="font-bold text-sm text-green-600" v-if="infoCard.statusId == 4">Autorizado GMMEP</p>
          <p @click="editar_status_dtc()" v-if="TIPO_USUARIO.Supervisor_Tecnico == tipoUsuario || TIPO_USUARIO.Administracion == tipoUsuario || tipoUsuario == 10 || tipoUsuario == 1"  class=" text-sm cursor-pointer text-blue-700 font-mono">Cambiar Estatus</p>  
          <div class="w-64 break-words text-left text-gray-800 font-normal">
            <p class="text-sm text-black w-40 font-semibold">Observaciones:</p>{{ infoCard.observation }}
          </div>
        </div>
          <p class="text-left font-semibold text-sm">Acciones:</p>
          <multiselect class="float:none" v-model="value"  @close="acciones_mapper()" placeholder="Seleccione una Accion" label="title" track-by="title" :options="opticones_select_acciones()" :option-height="200" :custom-label="customLabel" :show-labels="false" >
            <template slot="singleLabel" slot-scope="props">
              <div class=" inline-flex">
                <img :src="props.option.img" class="mr-5" width="15" height="15">                                                               
                <span class="option__title">{{ props.option.title }}</span>
              </div>
            </template>
            <template slot="option" slot-scope="props">                                                
              <div class="option__desc">
                <span class="option__title inline-flex">
                  <img :src="props.option.img" class="mr-5" width="15" height="15">    
                    {{ props.option.title }}
                </span>
              </div>
            </template>
          </multiselect>  
          <!-- /////////////////////////////////////////////////////////////////////
              ////                         IMAGENES                             ////
              ///////////////////////////////////////////////////////////////////// -->
        <div class="flex text-center cursor-pointer border-gray-800 flex-col mt-2 sm:m-3 sm:mt-5" v-if="!showmenosMas">
          <ImagenesCard
            :referenceNumber="infoCard.technicalSheetReference"        
            :plazasValidas="plazasValidas"                
          ></ImagenesCard>
        </div>
      </div>
      <!-- /////////////////////////////////////////////////////////////////////
          ////                 STATUS / VER MAS                             ////
          ///////////////////////////////////////////////////////////////////// -->
      <div class="flex justify-between" :class="{'grid grid-cols-2 justify-between': TIPO_USUARIO.Administracion == tipoUsuario }">     
        <div class="pb-2 -mt-1" v-if="TIPO_USUARIO.Administracion == tipoUsuario && infoCard.statusId == 3 || TIPO_USUARIO.Administracion == tipoUsuario && infoCard.statusId == 2" v-show="menosMas">
          <span class="text-sm font-bold text-orange-500">Autorización GMMEP</span>
          <input @change="status_autorizacion_gmmep()" v-model="statusAgregarFimar" class="ml-1 h-2 w-2 rounded-lg" type="checkbox" />        
        </div>
        <a @click="mas" v-show="menosMas" class="cursor-pointer text-green-700 m-auto">Ver Más</a>
      </div>
      <!-- /////////////////////////////////////////////////////////////////////
          ////                 MINI TABLA CARD                              ////
          ///////////////////////////////////////////////////////////////////// -->
      <div v-if="showmenosMas" class="-ml-1 sm:ml-0">
        <div class="flex flex-col ml-1 md:flex-row mb-6 mt-8">
          <div class="text-xs text-center divtabla">
            <table class="sm:ml-0 w-66 sm:w-full border-collapse table-auto bg-white">
              <tr class="h-8 trTable">
                <th class="w-1/3 cabeceraTable font-medium">Componete</th>
                <th class="w-1/8 cabeceraTable font-medium">Cantidad</th>
                <th class="w-1/8 cabeceraTable font-medium">Ubicacion</th>
              </tr>
              <tr class="" v-for="(item, key) in tableFormat" :key="key">
                <td class="cuerpoTabla">{{ item.componente }}</td>
                <td class="cuerpoTabla">{{ item.cantidad }}</td>
                <td class="cuerpoTabla">
                  <p v-for="(value, key2) in item.lane.split(',')" :key="key2">{{ value }}</p>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <!-- /////////////////////////////////////////////////////////////////////////
      ////                           BOTONES                                   ////
      ///////////////////////////////////////////////////////////////////////// -->
      <div v-if="showmenosMas">
        <div class="flex justify-between" v-if="true">
          <div class="inline-flex hidden">
            <button v-if="tipoUsuario == 4 || infoCard.statusId < 2 || (tipoUsuario == 10 && infoCard.statusId <= 3)" @click.prevent="borrar_dtc" class="botonIconBorrarCard font-boton">
              <img src="../../assets/img/borrar.png" class="mr-2" width="12" height="1"/>
              <span>Borrar</span>
            </button>
          </div>
        </div>
        <div class="flex justify-end" v-else>        
          <div>
            <a @click="menos" class="text-gray-700 md:mr-4 md:mt-2 cursor-pointer mr-2">Menos ↑</a>          
          </div>
        </div>
        <div class="mt-48 flex justify-end">
          <a @click="menos" class="text-gray-700 md:mr-4 cursor-pointer mr-2">Menos ↑</a>
        </div>
        
      </div>
    </div>   
  </div>
</template>

<script>
import moment from "moment";
import ServiceReporte from '../../services/ReportesPDFService'
import ImagenesCard from "../DTC/ImagenesCard.vue";
import CookiesService from '../../services/CookiesService'
import PdfEscaneado from '../PdfEscaneado.vue'
const API = process.env.VUE_APP_URL_API_PRODUCCION

export default {
  components: {
    ImagenesCard,
    PdfEscaneado    
  },
  props: {
    infoCard: {
      type: Object,
      default: () => {},
    },
    plazasValidas: {
      type: Array,
      default: () => [],
    },
    ocultarMulti: {
      type: Boolean,
      require: true,
      default: () => false,
    }
  },
  data: function () {
    return {
      menosMas: true,
      showmenosMas: false,
      tableFormat: [],
      inconcluso: 1,  
      tipoUsuario: '', 
      pdfSellado: '',
      pdfSelladoBool: false,
      statusAgregarFimar: '',
      cambiarStatus: 0,
      TIPO_USUARIO: 0 ,     
      modalSubir: false  ,
      infoActualizar:'',
      modalActualizar:false,        
      modalSubirSellado: false,
      objInsertEscaneado: {},          
      value: '',
      info: this.infoCard,
      tipoEscaneado: ''
    };
  },
/////////////////////////////////////////////////////////////////////
////                       CICLOS DE VIDA                        ////
////////////////////////////////////////////////////////////////////
  beforeMount: function () {   
    this.tipoUsuario = this.$store.state.Login.cookiesUser.rollId
    this.TIPO_USUARIO = Object.freeze({
        Tecnico: 1,
        Supervisor_Tecnico: 2,
        Sistemas: 3,
        Administracion: 4,
        Supervisor_Sitemas: 5,
    })  
  },
/////////////////////////////////////////////////////////////////////
////                          METODOS                            ////
/////////////////////////////////////////////////////////////////////
  methods: {
    acciones_mapper(){            
        if(this.value.title == 'Borrar DTC'){
          this.borrar_dtc()
        }
        if(this.value.title == 'Fechas'){
          this.editar_fechas_calendario()
        }
        if(this.value.title == 'Editar Campos'){
          this.editar_header()
        }
        if(this.value.title == 'Terminar DTC'){
          this.editar_dtc()
        }
        if(this.value.title == 'Subir DTC Escaneado'){
          this.tipoEscaneado = 'Card-DTC'
          this.modalSubirSellado = true
          this.objInsertEscaneado = {
            referenceNumber: this.infoCard.referenceNumber
          }
        }
        if(this.value.title == 'Bajar Dictamen Técnico'){
          this.generar_pdf(2)
        }
        if(this.value.title == 'Bajar DTC Escaneado'){
          this.generar_pdf(3)
        }
        if(this.value.title == 'Reporte Fotografico'){
          this.fotografico()
        }
        if(this.value.title == 'DTC Sin Firma'){
          this.generar_pdf(1)
        }
        if(this.value.title == 'Actualizar Componentes'){
          this.actualizar(this.infoCard.referenceNumber)
        }
        if(this.value.title == 'Terminar Diagnostico'){
          this.$router.push({ 
            path: '/Correctivo/PreDTC/Crear/DiagnosticoDeFalla',
            query: { referenceNumberFinishDiagnostic: this.infoCard.referenceNumber } 
          })
        }
        if(this.value.title ==  'Cambiar Usuario DTC'){
          this.$emit('cambiar-usuario-dtc',{ referenceNumber: this.infoCard.referenceNumber, referenceNumberDiagnosis: this.infoCard.technicalSheetReference, squareId: this.infoCard.squareCatalogId })
        }
        if(this.value.title == 'Subir RF Escaneado'){
          this.tipoEscaneado = 'Fotografico'
          this.modalSubirSellado = true
          this.objInsertEscaneado = { referenceNumber: this.infoCard.referenceNumber }
        }
        if(this.value.title == 'Bajar RF Escaneado'){
          this.fotografico_sellado()
        }
        this.value = ''
    },
    opticones_select_acciones(){
        let options = [
            { title: 'Borrar DTC', img: '/img/borrar.16664eed.png' }, //0
            { title: 'Fechas', img: '/img/pencil.04ec78bc.png' }, //1
            { title: 'Editar Campos', img: '/img/pencil.04ec78bc.png' }, //2   
            { title: 'Terminar DTC', img: '/img/add.36624e63.png' }, //3   
            { title: 'Subir DTC Escaneado', img: '/img/upload.8d26bb4f.png' }, //4                                                                               
            { title: 'Bajar Dictamen Técnico', img: '/img/download.ea0ec6db.png'}, //5
            { title: 'Bajar DTC Escaneado', img: '/img/download.ea0ec6db.png'}, //6
            { title: 'Reporte Fotografico', img: '/img/download.ea0ec6db.png'}, //7
            { title: 'DTC Sin Firma', img: '/img/download.ea0ec6db.png'}, //8
            { title: 'Actualizar Componentes', img: '/img/actualizado.cafc2f1a.png'}, //9
            { title: 'Terminar Diagnostico', img: '/img/add.36624e63.png'}, //10
            { title: 'Cambiar Usuario DTC', img: '/img/add.36624e63.png'}, //11
            { title: 'Subir RF Escaneado', img: '/img/upload.8d26bb4f.png'}, //12
            { title: 'Bajar RF Escaneado', img: '/img/download.ea0ec6db.png'}, //13
        ]
        let array = []       
        if(this.info.userId == this.$store.state.Login.cookiesUser.userId && this.infoCard.technicalSheetReference == '--'){
          array.push(options[10])
        }
        if(this.tipoUsuario == 4 || this.tipoUsuario == 10){
          array.push(options[1])
        }     
        if((this.info.userId == this.$store.state.Login.cookiesUser.userId && this.infoCard.statusId < 2) || this.tipoUsuario == 4 || (this.tipoUsuario == 10 && this.infoCard.statusId <= 3) ){
          array.push(options[0])
        }
        if(this.tipoUsuario == 4 || this.tipoUsuario == 10 && this.infoCard.statusId == 2){
          array.push(options[5])
        } 
        if((this.tipoUsuario == 5 || this.tipoUsuario == 3 || this.tipoUsuario == 1 || this.tipoUsuario == 2) && this.infoCard.statusId == 2 && this.info.userId == this.$store.state.Login.cookiesUser.userId){
          array.push(options[2])
        }
        if(this.info.userId == this.$store.state.Login.cookiesUser.userId && this.infoCard.statusId == 1){
          array.push(options[3])
        }
        else{
          if((this.tipoUsuario == 1 || this.tipoUsuario == 2 || this.tipoUsuario == 3 || this.tipoUsuario == 5) && this.infoCard.statusId >= 2){
            array.push(options[5])
            array.push(options[4])
            
          }
          if((this.tipoUsuario == 1 || this.tipoUsuario == 2 || this.tipoUsuario == 4) && this.infoCard.statusId == 3){
            array.push(options[6])
          }
          if(this.tipoUsuario == 10 && this.infoCard.statusId == 3){
            array.push(options[5])
            array.push(options[6])
          }
          if(this.tipoUsuario != 8 && this.infoCard.statusId >= 2){ 
            if(this.tipoUsuario != 4 || this.tipoUsuario != 8){
              array.push(options[7])
              if(this.tipoUsuario != 7 && this.tipoUsuario != 10 && this.tipoUsuario != 4){
                array.push(options[12])
              }
              if(this.info.pdfFotograficoSellado){
                array.push(options[13])
              }
            }
          }
          if(this.tipoUsuario == 8 ){
            array.push(options[8])
          }          
        }
        if((this.tipoUsuario == 5 || this.tipoUsuario == 3 || this.tipoUsuario == 1 || this.tipoUsuario == 2) && this.infoCard.statusId >= 2 && this.info.userId == this.$store.state.Login.cookiesUser.userId){
          array.push(options[9])
        }
        if(this.tipoUsuario == 4 || this.tipoUsuario == 10){
          array.push(options[11])
        }
        if(this.tipoUsuario == 7){
          array.push(options[5])
          array.push(options[6])
          array.push(options[13])
        }
        return array       
    },
    customLabel ({ title }) {
        return `${title}`
    },
    actualizar(item){
      this.infoActualizar = item
      this.modalActualizar = true
    },
    actualizarComponentes: async function(){
      let clavePlaza = this.infoActualizar.split('-')[0]
      let userId = this.$store.state.Login.cookiesUser.userId
      this.$http.post(`${API}/Component/updateInventory/${clavePlaza}/${this.infoActualizar}/${userId}`)
      .then(()=>{
        this.$notify.success({
            title: "Ok!",
            class: "font-titulo",
            msg: `DTC CON REFERENCIA ${this.infoActualizar} ACTUALIZADO CORRECTAMENTE.`,
            position: "bottom right",
            styles: { height: 100, width: 500 },
        });
      })
      this.modalActualizar = false
    },
    editar_fechas_calendario(){
      this.$emit('editar-fechas-dtc', this.infoCard)
    },   
    mas: async function () {
      this.menosMas = false;
      await this.$store.dispatch("DTC/BUSCAR_TABLA_CARDS",this.infoCard.referenceNumber);
      this.tableFormat = await this.$store.getters["DTC/GET_TABLE_DTC_CARDS"];
      this.showmenosMas = true;
    },
    menos: function () {
      this.menosMas = true;
      this.showmenosMas = false;
    },
    editar_dtc: async function () {
      let datosUser = {}      
      await this.$store.dispatch(`DTC/COMPONENT_EDIT`, this.infoCard.referenceNumber); 
      await this.$http.get(`${API}/dtcData/${this.infoCard.referenceNumber.split('-')[0]}/${this.infoCard.referenceNumber}`)
        .then(async (response) => { 
          datosUser = response.data.result.find(item => item.adminSquareId = this.infoCard.adminId)               
          await CookiesService.actualizar_plaza(datosUser.adminSquareId)          
        })         
      this.$store.commit('Header/LIBERAR_VALIDACION_NUMS', { numSiniestro: this.infoCard.sinisterNumber,  numReporte: this.infoCard.reportNumber })                         
      let datosSinester = {
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
      };      
      datosSinester.ReferenceNumber = this.infoCard.referenceNumber;
      datosSinester.SinisterNumber = this.infoCard.sinisterNumber;
      datosSinester.ReportNumber = this.infoCard.reportNumber;
      datosSinester.SinisterDate = moment(this.infoCard.sinisterDate).format("YYYY-MM-DD");
      datosSinester.FailureNumber = this.infoCard.failureNumber;
      datosSinester.FailureDate = moment(this.infoCard.failureDate).format("YYYY-MM-DD");
      datosSinester.ShippingElaboracionDate = moment(this.infoCard.shippingDate).format("YYYY-MM-DD");
      datosSinester.TypeDescriptionId = 2;
      this.$store.commit("Header/DATOS_SINESTER_MUTATION", datosSinester);
      let page = this.infoCard.openMode ? "NuevoDtcLibre" : "NuevoDtc/Editar";
      this.$router.push({
        path: `/${page}/--/3`,
        query: {
          headerInfo: { ...this.infoCard },
          datosDtc: { ...this.datosUser }
        },
      });
    },
    editar_header: async function(){      
      await this.$store.commit('Header/LIBERAR_VALIDACION_NUMS', { 
          numSiniestro: this.infoCard.sinisterNumber,  
          numReporte: this.infoCard.reportNumber 
        }
      )
      this.$emit("editar-card", this.infoCard.referenceNumber);
    },
    fotografico_sellado(){
      ServiceReporte.reporte_fotografico_sellado(this.infoCard.referenceNumber)
    },
    fotografico(){
      ServiceReporte.generar_pdf_fotografico_correctivo(this.infoCard.referenceNumber)
    },
    generar_pdf(status) {
      ServiceReporte.generar_pdf_correctivo(
        this.infoCard.referenceNumber, 
        status,
        false,
        this.infoCard.adminId
      )
    },
    borrar_dtc() {      
      this.$emit("borrar-card", this.infoCard.referenceNumber);
      this.menosMas = true;      
      this.showmenosMas = false;      
    },  
    cancelar_escaneado(){
      this.modalSubirSellado = false
    },
    limpiar_componete_escaneado(){
      this.modalSubirSellado = false
      let bandera = 0
      if(this.tipoEscaneado == 'Card-DTC')
        bandera = 1
      if(this.tipoEscaneado == 'Fotografico')
        bandera = 2
      this.$emit("enviar_pdf_sellado", this.objInsertEscaneado, bandera);  
    },   
    status_autorizacion_gmmep(){
      if(this.statusAgregarFimar){        
          window.scroll(0, 0);
          this.$emit("agregar_autorizacion_gmmep", this.infoCard.referenceNumber);
          this.statusAgregarFimar = false
      }
      else{
        this.statusAgregarFimar = false
      }
    },
    editar_status_dtc(){
      this.$emit("editar-status", this.infoCard.referenceNumber);
    }    
  },
/////////////////////////////////////////////////////////////////////
////                           FILTROS                           ////
/////////////////////////////////////////////////////////////////////
  filters: {
    formatDate: function (value) {
      return moment(value.substring(0, 10)).format("DD/MM/YYYY");
    },
  },
};
</script>
<style scoped>
.modal-container{
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.5);
}
.modal-container-cards{
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.5);
}
</style>
