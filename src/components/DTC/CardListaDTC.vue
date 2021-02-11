<template>
  <div>
    <div class="w-66 sm:w-auto">
      <!-- /////////////////////////////////////////////////////////////////////
          ////                      REFERENCIA                              ////
          ///////////////////////////////////////////////////////////////////// -->
      <div class="flex flex-row mb-6">
        <div class="flex justify-between">
          <div class="font-black m-3">{{ infoCard.referenceNumber }}</div>           
          <div class=" inline-flex sm:ml-10 ml-16">
            <div class="m-3 p-0 inline-block text-sm">
              <p>{{ infoCard.sinisterDate | formatDate }}</p>
              <span class="text-xs text-gray-800">*Fecha Siniestro</span>
            </div>    
            <div class="mt-2 w-5" v-if="(TIPO_USUARIO.Supervisor_Sitemas == tipoUsuario || TIPO_USUARIO.Sistemas == tipoUsuario || TIPO_USUARIO.Tecnico == tipoUsuario || TIPO_USUARIO.Supervisor_Tecnico  == tipoUsuario) && infoCard.statusId == 2">
              <button @click="editar_header" class="bg-gray-300 hover:bg-gray-400 text-gray-800 text-xs font-bold px-1 py-1 rounded inline-flex items-center border border-yellow-600">
                <img src="../../assets/img/pencil.png" class="" width="30" height="30" />              
              </button>
            </div>      
          </div>
        </div>
        <hr />
      </div>
      <!-- /////////////////////////////////////////////////////////////////////
          ////                 INFORMACION DTC                              ////
          ///////////////////////////////////////////////////////////////////// -->
      <div class="flex-col md:flex-row flex mb-4">
        <div class="md:w-2/3">
          <p class="text-left font-bold text-sm">N° Siniestro: {{ infoCard.sinisterNumber }}</p>
          <p class="text-left font-bold text-sm">N° Reporte: {{ infoCard.reportNumber }}</p>
          <p class="text-left font-bold text-sm break-words">Folio: {{ infoCard.failureNumber }}</p> 
          <p class="text-left text-sm break-words">Registro en Sistema: {{ infoCard.dateStamp | formatDate }}</p>        
          <p class="font-bold text-sm text-green-600" v-if="infoCard.statusId == 4">Autorizado GMMEP</p>
          <p @click="editar_status_dtc()" v-if="TIPO_USUARIO.Supervisor_Tecnico == tipoUsuario || TIPO_USUARIO.Administracion == tipoUsuario || tipoUsuario == 10"  class=" text-sm cursor-pointer text-blue-700 font-mono">Cambiar Estatus</p>
          <div class="w-64 break-words text-left text-gray-800 font-normal mt-6">
            <p class="text-sm text-black w-40 font-bold">Observaciones:</p>{{ infoCard.observation }}
          </div>
        </div>
        <!-- /////////////////////////////////////////////////////////////////////
            ////                       SUBIR PDF SELLADO                      ////
            ///////////////////////////////////////////////////////////////////// -->        
        <div v-if="infoCard.statusId == 2 && !showmenosMas == true">
          <div class="border-2 border-gray-500 flex-col justify-center h-12 border-dashed w-full mt-5" v-if="TIPO_USUARIO.Tecnico == tipoUsuario || TIPO_USUARIO.Supervisor_Tecnico == tipoUsuario || TIPO_USUARIO.Sistemas == tipoUsuario" >
            <div class="flex justify-center" v-if="pdfSelladoBool == false">
              <input type="file" class="opacity-0 w-auto h-12 absolute" @change="recibir_pdf_sellado"/>
              <img src="../../assets/img/pdf.png" class="w-6 mr-3 mt-3 border" alt/>
              <p class="text-base text-gray-900 mt-3">PDF Sellado</p>
            </div>
            <div class="flex" v-else>
              <div class="inline-flex">
                <img src="../../assets/img/pdf.png" class="w-6 m-2 border opacity-75" alt/>    
                <p class="ml-2 mt-3 text-sm">{{ pdfSellado.name }}</p>
              </div>
              <div class="mt-2 justify-between">
                <button @click="pdfSelladoBool = false, pdfSellado = ''" class="rounded-md border ml-4 h-7 p-1 bg-red-600 text-sm">Cancelar</button>
                <button @click="status_dtc_sellado" class="rounded-md border ml-2 h-7 p-1 bg-green-600 text-sm">Enviar PDF</button>
              </div>            
            </div>
          </div>
        </div>        
          <!-- /////////////////////////////////////////////////////////////////////
              ////                         IMAGENES                             ////
              ///////////////////////////////////////////////////////////////////// -->
        <div class="flex text-center cursor-pointer border-gray-800 flex-col mt-2 sm:m-3 sm:mt-5" v-if="!showmenosMas">
          <ImagenesCard
            :referenceNumber="infoCard.referenceNumber"        
            :plazasValidas="plazasValidas"                
          ></ImagenesCard>
        </div>
      </div>
      <!-- /////////////////////////////////////////////////////////////////////
          ////                 STATUS / VER MAS                             ////
          ///////////////////////////////////////////////////////////////////// -->
      <div class="flex justify-between">
        <a @click="mas" v-show="menosMas" class="text-sm text-gray-900 ">Status: {{ infoCard.statusDescription }}</a>        
        <div class="pb-2" v-if="TIPO_USUARIO.Administracion == tipoUsuario && infoCard.statusId == 3" v-show="menosMas">
          <span class="text-sm font-bold text-orange-500">Autorización GMMEP</span>
          <input @change="status_autorizacion_gmmep()" v-model="statusAgregarFimar" class="ml-1 h-2 w-2 rounded-lg" type="checkbox" />        
        </div>
        <a @click="mas" v-show="menosMas" class="cursor-pointer text-green-700 ">Ver Mas</a>
      </div>
      <!-- /////////////////////////////////////////////////////////////////////
          ////                 MINI TABLA CARD                              ////
          ///////////////////////////////////////////////////////////////////// -->
      <div v-if="showmenosMas">
        <div class="flex flex-col md:flex-row mb-6 mt-8">
          <div class="text-xs font-sans text-center">
            <table class="ml-2 table-fixed w-66 sm:w-65">
              <tr class="bg-blue-800 text-white h-8">
                <th class="w-1/3 border-2 border-gray-800">Componete</th>
                <th class="w-1/8 border-2 border-gray-800">Cantidad</th>
                <th class="w-1/8 border-2 border-gray-800">Ubicacion</th>
              </tr>
              <tr class="" v-for="(item, key) in tableFormat" :key="key">
                <td class="border border-gray-800">{{ item.componente }}</td>
                <td class="border border-gray-800">{{ item.cantidad }}</td>
                <td class="text-xs border border-gray-800">
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
          <div class="">
            <button v-if="tipoUsuario == 4 || infoCard.statusId < 2" @click.prevent="borrar" class="bg-gray-300 hover:bg-gray-400 text-gray-800 text-xs font-bold py-2 px-2 ml-14 rounded inline-flex items-center border border-red-700 mt-1">
              <img src="../../assets/img/bin.png" class="mr-2" width="12" height="1"/>
              <span>Borrar</span>
            </button>
          </div>
          <div class=" inline-flex">
            <a @click="menos" class="text-gray-700 md:mr-4 mt-3 cursor-pointer mr-2">Menos ↑</a>
            <div v-if="infoCard.statusId == 1">
                <button @click.prevent="editar_dtc" class="bg-gray-300 m-1 hover:bg-gray-400 text-gray-800 text-xs font-bold py-2 px-2 ml-14 rounded inline-flex items-center border border-yellow-600">
                  <img src="../../assets/img/pencil.png" class="mr-2" width="12" height="1"/>
                  <span class="text-xs">Editar</span>
                </button>
            </div>
            <div v-else class="text-xs inline-flex">
              <div v-if="tipoUsuario != 8">
                <button  @click.prevent="pdf(2)" class="bg-gray-300 hover:bg-gray-400 mr-2 text-gray-800 text-xs font-bold py-2 px-2 rounded inline-flex items-center border border-red-700">
                  <img src="../../assets/img/pdf.png" class="mr-2" width="12" height="1"/>              
                  <span>Firmado</span>                
                </button>   
                <button v-if="infoCard.statusId > 2" @click.prevent="generar_pdf(3)" class="bg-gray-300 hover:bg-gray-400 text-gray-800 text-xs font-bold py-2 px-2  rounded inline-flex items-center border border-red-700">
                  <img src="../../assets/img/pdf.png" class="mr-2" width="12" height="1"/>                              
                  <span>Sellado</span>
                </button>  
              </div> 
              <div v-else>
                <button  @click.prevent="generar_pdf(1)" class="bg-gray-300 hover:bg-gray-400 text-gray-800 text-xs font-bold py-2 px-2  rounded inline-flex items-center border border-red-700">
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
      </div>
    </div>   
  </div>
</template>

<script>
import moment from "moment";
import ServiceReporte from '../../services/ReportesPDFService'
//import ServiceImagenes from '../../services/ImagenesService'
import ImagenesCard from "../DTC/ImagenesCard.vue";
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
    this.tipoUsuario = this.$store.getters['Login/getTypeUser']; 
    this.TIPO_USUARIO = Object.freeze({
        Tecnico: 1,
        Supervisor_Tecnico: 2,
        Sistemas: 3,
        Administracion: 4,
        Supervisor_Sitemas: 5
    })   
  },
/////////////////////////////////////////////////////////////////////
////                          METODOS                            ////
/////////////////////////////////////////////////////////////////////
  methods: {
    mas: async function () {
      this.menosMas = false;
      await this.$store.dispatch("DTC/tableFormComponent",this.infoCard.referenceNumber);
      this.tableFormat = await this.$store.getters["DTC/gettableFormComp"];
      this.showmenosMas = true;
    },
    menos: function () {
      this.menosMas = true;
      this.showmenosMas = false;
    },
    editar_dtc: async function () {
      let ruta = this.infoCard.openMode ? "COMPONENT_EDIT_OPEN" : "COMPONENT_EDIT";
      await this.$store.dispatch(`DTC/${ruta}`, this.infoCard.referenceNumber);     
      this.$store.commit('Header/LIBERAR_VALIDACION_NUMS', 
        { 
          numSiniestro: this.infoCard.sinisterNumber,  
          numReporte: this.infoCard.reportNumber 
        }
      )       
      this.$store.commit("Header/PLAZAELEGIDAFINDMUTATION",this.infoCard.referenceNumber.split("-")[0]);
      this.$store.commit("Login/PLAZAELEGIDAFINDMUTATION",this.infoCard.referenceNumber.split("-")[0]);
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
      this.$store.commit("Header/datosSinesterMutation", datosSinester);
      let page = this.infoCard.openMode ? "NuevoDtcLibre" : "NuevoDtc";
      this.$router.push({
        path: `/${page}`,
        query: {
          headerInfo: { ...this.infoCard },
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
      console.log(file)
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

