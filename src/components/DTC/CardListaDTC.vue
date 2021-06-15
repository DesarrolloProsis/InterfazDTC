<template>
  <div>
    <div class="w-66 sm:w-auto">
      <!-- //////////////////////////////////////////////////////////////////////
      ///    /                      REFERENCIA                              ////
      ///////////////////////////////////////////////////////////////////// -->
      <div class="flex flex-row mb-6 font-titulo">
        <div class="flex justify-between">
          <div class="font-semibold w-33">{{ infoCard.referenceNumber }}</div>           
          <div class=" inline-flex sm:ml-10 ml-16">
            <div class="m-3 p-0 inline-block text-sm -ml-6">
              <p>{{ infoCard.sinisterDate | formatDate }}</p>
              <span class="text-xs text-gray-800">*Fecha Siniestro</span>
            </div>    
            <div class="mt-2 ml-5 mr-3 w-5" v-if="(TIPO_USUARIO.Supervisor_Sitemas == tipoUsuario || TIPO_USUARIO.Sistemas == tipoUsuario || TIPO_USUARIO.Tecnico == tipoUsuario || TIPO_USUARIO.Supervisor_Tecnico  == tipoUsuario) && infoCard.statusId == 2">
              <button @click="editar_header" class="bg-gray-300 hover:bg-gray-400 text-gray-800 text-xs font-bold px-1 py-1 rounded inline-flex items-center border-b-2 border-yellow-600">
                <img src="../../assets/img/pencil.png" class="" width="30" height="30" />              
              </button>
            </div>   
            <div v-if="(TIPO_USUARIO.Administracion == tipoUsuario || tipoUsuario == 10)" class="mt-2 w-5">
              <button @click="editar_fechas_calendario" class="bg-gray-300 hover:bg-gray-400 text-gray-800 text-xs font-bold px-1 py-1 rounded inline-flex items-center border-b-2 border-yellow-600">
                <img src="../../assets/img/schedule.png" class="" width="30" height="30" />              
              </button>
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
          <p class="text-left font-semibold text-sm">Referencia Diagnostico: {{ infoCard.technicalSheetReference }}</p>
          <p class="text-left font-semibold text-sm">N° Siniestro: {{ infoCard.sinisterNumber }}</p>
          <p class="text-left font-semibold text-sm">N° Reporte: {{ infoCard.reportNumber }}</p>
          <p class="text-left font-semibold text-sm break-words">Folio: {{ infoCard.failureNumber }}</p> 
          <p class="text-left text-sm break-words">Registro en Sistema: {{ infoCard.dateStamp | formatDate }}</p>        
          <p class="font-bold text-sm text-green-600" v-if="infoCard.statusId == 4">Autorizado GMMEP</p>
          <p @click="editar_status_dtc()" v-if="TIPO_USUARIO.Supervisor_Tecnico == tipoUsuario || TIPO_USUARIO.Administracion == tipoUsuario || tipoUsuario == 10"  class=" text-sm cursor-pointer text-blue-700 font-mono">Cambiar Estatus</p>
          <div class="w-64 break-words text-left text-gray-800 font-normal mt-6">
            <p class="text-sm text-black w-40 font-semibold">Observaciones:</p>{{ infoCard.observation }}
          </div>
        </div>
        <!-- //////////////////////////////////////////////////////////////////////
        ////                         SUBIR PDF SELLADO                        ////
        ///////////////////////////////////////////////////////////////////// -->        
        <div v-if="infoCard.statusId == 2 && !showmenosMas == true">
          <div class="border-2 border-gray-500 flex-col justify-center h-12 border-dashed w-full mt-5" v-if="TIPO_USUARIO.Tecnico == tipoUsuario || TIPO_USUARIO.Supervisor_Tecnico == tipoUsuario || TIPO_USUARIO.Sistemas == tipoUsuario || TIPO_USUARIO.Supervisor_Sitemas == tipoUsuario" >
            <div class="flex justify-center" v-if="pdfSelladoBool == false">
              <input type="file" class="opacity-0 w-auto h-12 absolute" @change="recibir_pdf_sellado"/>
              <img src="../../assets/img/pdf.png" class="w-6 mr-3 mt-3 border"/>
              <p class="text-base text-gray-900 mt-3">PDF Sellado</p>
            </div>
            <div class="grid grid-cols-2" v-else>
              <div class="inline-flex">
                <img src="../../assets/img/pdf.png" class="w-6 h-8 m-2 border opacity-75" alt/>    
                <p class="ml-2 mt-3 mr-1 text-sm">{{ pdfSellado.name }}</p>
              </div>
              <div class="inline-flex">
                <button @click="pdfSelladoBool = false, pdfSellado = ''" class="botonIconCancelar ml-4 h-10 text-sm justify-center px-1">Cancelar</button>
                <button @click="status_dtc_sellado" class="botonEnviarPDF mr-2 px-2 py-2 h-10 text-sm justify-center w-24">Subir</button>
              </div>            
            </div>
          </div>
        </div>        
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
        <a @click="mas" v-show="menosMas" class="text-sm text-gray-900 ">Estatus {{ infoCard.statusId }}: {{ infoCard.statusDescription }}</a>        
        <div class="pb-2 -mt-1" v-if="TIPO_USUARIO.Administracion == tipoUsuario && infoCard.statusId == 3 || TIPO_USUARIO.Administracion == tipoUsuario && infoCard.statusId == 2" v-show="menosMas">
          <span class="text-sm font-bold text-orange-500">Autorización GMMEP</span>
          <input @change="status_autorizacion_gmmep()" v-model="statusAgregarFimar" class="ml-1 h-2 w-2 rounded-lg" type="checkbox" />        
        </div>
        <a @click="mas" v-show="menosMas" class="cursor-pointer text-green-700 ">Ver Mas</a>
      </div>
      <!-- /////////////////////////////////////////////////////////////////////
          ////                 MINI TABLA CARD                              ////
          ///////////////////////////////////////////////////////////////////// -->
      <div v-if="showmenosMas" class="-ml-2 sm:ml-0">
        <div class="flex flex-col md:flex-row mb-6 mt-8">
          <div class="text-xs text-center divtabla">
            <table class="ml-2  sm:ml-0 w-66 sm:w-full border-collapse table-auto bg-white">
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
      <!-- /////////////////////////////////////////////////////////////////////
          ////                           BOTONES                            ////
          ///////////////////////////////////////////////////////////////////// -->
      <div v-if="showmenosMas">
        <div class="flex justify-between" v-if="true">
          <div class="inline-flex">
            <button v-if="tipoUsuario == 4 || infoCard.statusId < 2 || (tipoUsuario == 10 && infoCard.statusId <= 3)" @click.prevent="borrar_dtc" class="botonIconBorrarCard font-boton">
              <img src="../../assets/img/borrar.png" class="mr-2" width="12" height="1"/>
              <span>Borrar</span>
            </button>
          </div>
          <div class=" inline-flex">
            <div v-if="infoCard.statusId == 1">
                <button @click.prevent="editar_dtc" class="botonIconEditCard font-boton" :class="{'hidden' :tipoUsuario == 4 || tipoUsuario == 10}">
                  <img src="../../assets/img/pencil.png" class="mr-2" width="12" height="1"/>
                  <span class="text-xs">Editar</span>
                </button>
            </div>
            <div v-else class="text-xs inline-flex">
              <div v-if="tipoUsuario != 8">
                <button  @click="fotografico" class="botonIconBorrarCard font-boton">
                  <img src="../../assets/img/pdf.png" class="mr-2" width="12" height="1"/>              
                  <span>Fotografico</span>                
                </button> 
                <button  @click.prevent="generar_pdf(2)" class="botonIconBorrarCard font-boton">
                  <img src="../../assets/img/pdf.png" class="mr-2" width="12" height="1"/>              
                  <span>Firmado</span>                
                </button>   
                <button v-if="infoCard.statusId > 2" @click.prevent="generar_pdf(3)" class=" ml-1 botonIconBorrarCard font-boton">
                  <img src="../../assets/img/pdf.png" class="mr-2" width="12" height="1"/>                              
                  <span>Sellado</span>
                </button>  
              </div> 
              <div v-else>
                <button  @click.prevent="generar_pdf(1)" class="botonIconBorrarCard font-boton">
                  <img src="../../assets/img/pdf.png" class="mr-2" width="12" height="1"/>                              
                  <span>Sin Firma</span>
                </button>  
              </div>                
            </div>          
          </div>
        </div>
        <div class="flex justify-end" v-else>        
          <div>
            <a @click="menos" class="text-gray-700 md:mr-4 md:mt-2 cursor-pointer mr-2">Menos ↑</a>          
          </div>
        </div>
        <div class="mt-62 flex justify-end">
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
const API = process.env.VUE_APP_URL_API_PRODUCCION

export default {
  props: {
    infoCard: {
      type: Object,
      default: () => {},
    },
    plazasValidas: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    ImagenesCard,    
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
          datosUser = response.data.result[0]                    
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
    fotografico(){
      ServiceReporte.generar_pdf_fotografico_correctivo(this.infoCard.referenceNumber)
    },
    generar_pdf(status) {
      ServiceReporte.generar_pdf_correctivo(
        this.infoCard.referenceNumber, 
        status,
        false
      )
    },
    borrar_dtc() {      
      this.$emit("borrar-card", this.infoCard.referenceNumber);
      this.menosMas = true;      
      this.showmenosMas = false;      
    },
    recibir_pdf_sellado(e) {                  
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      else {
        this.pdfSelladoBool = true
        for (let item of files) {        
          if(this.crearImage(item) == false)
            this.pdfSelladoBool = false
        }        
      }
    },
    crearImage(file) {
      if(file.type.split('/')[1] == 'pdf'){
        var reader = new FileReader(); 
        reader.onload = (e) => {
          this.$nextTick().then(() => {
            this.pdfSellado = {
              imgbase: e.target.result.split(',')[1],
              name: this.infoCard.referenceNumber,
            };
          })        
        };
        reader.readAsDataURL(file);   
        return true
      }
      else{
        this.$notify.warning({
          title: "Ups!",
          msg: `SOLO SE PUEDEN SUBIR ARCHIVOS .PDF`,
          position: "bottom right",
          styles: {
            height: 100,
            width: 500,
          },          
        });
        this.pdfSellado = {}
        return false
      }         
    },
    base64ToFile(dataurl, fileName) {                    
        let url = "data:text/pdf;base64," + dataurl;  
        var arr = url.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], fileName + '.pdf', { type: mime });
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
    status_dtc_sellado(){                      
      let formData = new FormData();
      let file = this.base64ToFile(this.pdfSellado.imgbase, this.pdfSellado.name)
      formData.append("file", file);     
      let obj = {
        referenceNumber: this.infoCard.referenceNumber,
        file: formData
      }
      this.pdfSelladoBool = false
      this.$emit("enviar_pdf_sellado", obj);      
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

