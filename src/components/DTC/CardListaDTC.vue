<template>
  <div>
    <div class="w-66 sm:w-auto">
      <!-- /////////////////////////////////////////////////////////////////////
          ////                      REFERENCIA                              ////
          ///////////////////////////////////////////////////////////////////// -->
      <div class="flex flex-row mb-6">
        <div class="flex justify-between">
          <div class="font-black m-3">{{ infoCard.referenceNumber }}</div>
          <div class=" inline-flex sm:ml-10 ml-20">
            <div class="m-3">{{ infoCard.sinisterDate | formatDate }}</div>
            <div class="mt-2" v-if="TIPO_USUARIO.Tecnico == tipoUsuario">
              <button @click="editar_header" class="bg-gray-300 hover:bg-gray-400 text-gray-800 text-xs font-bold py-2 px-2 ml-14 rounded inline-flex items-center border border-yellow-600">
                <img src="../../assets/img/pencil.png" class="mr-2" width="20" height="1" />              
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
          <p class="text-left font-bold text-sm mb-6 break-words">Folio: {{ infoCard.failureNumber }}</p>
          <div class="w-64 break-words text-left text-gray-800 font-normal">
            <p class="text-sm text-black w-40 font-bold">Observaciones:</p>{{ infoCard.observation }}
          </div>
        </div>
        <!-- /////////////////////////////////////////////////////////////////////
            ////                       SUBIR PDF SELLADO                      ////
            ///////////////////////////////////////////////////////////////////// -->
        <!-- <div class="border-2 border-gray-500 flex-col justify-center h-12 border-dashed w-full mt-5" v-if="inconcluso == 2 && tipoUsuario != 2"> -->
          <div class="border-2 border-gray-500 flex-col justify-center h-12 border-dashed w-full mt-5" v-if="TIPO_USUARIO.Tecnico == tipoUsuario">
          <div class="flex justify-center" v-if="pdfSelladoBool == false">
            <input type="file" class="opacity-0 w-auto h-12 absolute" @change="recibirImagenes"/>
            <img src="../../assets/img/pdf.png" class="w-6 mr-3 mt-3 border opacity-75" alt/>
            <p class="text-base text-gray-900 mt-3">PDF Sellado</p>
          </div>
          <div class="flex" v-else>
            <div class="inline-flex">
              <img src="../../assets/img/pdf.png" class="w-6 m-2 border opacity-75" alt/>    
              <p class="ml-2 mt-3 text-sm">{{ pdfSellado.nombre }}</p>
            </div>
            <div class="mt-2 justify-between">
              <button @click="pdfSelladoBool = false, pdfSellado = ''" class="rounded-md border ml-4 h-7 p-1 bg-red-600 text-sm">Cancelar</button>
              <button @click="enviar_pdf" class="rounded-md border ml-2 h-7 p-1 bg-green-600 text-sm">Enviar PDF</button>
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
      <div class="flex justify-between static">
        <a @click="mas" v-show="menosMas" class="text-sm text-gray-900 relative">Status: {{ infoCard.statusDescription }}</a>
        <a @click="mas" v-show="menosMas" class="cursor-pointer text-green-700 rel">Ver Mas</a>
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
            <button @click.prevent="borrar" class="bg-gray-300 hover:bg-gray-400 text-gray-800 text-xs font-bold py-2 px-2 ml-14 rounded inline-flex items-center border border-red-700 mt-1">
              <img src="../../assets/img/bin.png" class="mr-2" width="20" height="1"/>
              <span>Borrar</span>
            </button>
          </div>
          <div>
            <a @click="menos" class="text-gray-700 md:mr-4 md:mt-2 cursor-pointer mr-2">Menos ↑</a>
            <button v-if="inconcluso == 1"
              @click.prevent="editar"
              class="bg-gray-300 m-1 hover:bg-gray-400 text-gray-800 text-xs font-bold py-2 px-2 ml-14 rounded inline-flex items-center border border-yellow-600"
            >
              <img
                src="../../assets/img/pencil.png"
                class="mr-2"
                width="20"
                height="1"
              />
              <span class="text-xs">Editar</span>
            </button>
            <button v-else
              @click.prevent="pdf"
              class="bg-gray-300 hover:bg-gray-400 text-gray-800 text-xs font-bold py-2 px-2 ml-14 rounded inline-flex items-center border border-red-700"
            >
              <img
                src="../../assets/img/pdf.png"
                class="mr-2"
                width="20"
                height="1"
              />
              <span>PDF</span>
            </button>      
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
import saveAs from "file-saver";
import ImagenesCard from "../DTC/ImagenesCard.vue";
import Axios from 'axios';
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
      TIPO_USUARIO: 0   
    };
  },
/////////////////////////////////////////////////////////////////////
////                       CICLOS DE VIDA                        ////
////////////////////////////////////////////////////////////////////
  beforeMount: function () { 
    //incloncluso 1 = inconcluso 2 = concluido       
    this.inconcluso = this.infoCard.statusId 
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
      await this.$store.dispatch(
        "DTC/tableFormComponent",
        this.infoCard.referenceNumber
      );
      this.tableFormat = await this.$store.getters["DTC/gettableFormComp"];
      this.showmenosMas = true;
    },
    menos: function () {
      this.menosMas = true;
      this.showmenosMas = false;
    },
    editar: async function () {
      let ruta = this.infoCard.openMode ? "COMPONENT_EDIT_OPEN" : "COMPONENT_EDIT";
      await this.$store.dispatch(`DTC/${ruta}`, this.infoCard.referenceNumber);
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
    editar_header(){
      window.scroll(0, 0);
      this.$emit("editar-card", this.infoCard.referenceNumber);
    },
    enviar_pdf(){
      alert('En construccion')
      let formData = new FormData();
      formData.append("file",this.pdfSellado);
      Axios.post(`${API}/${this.$store.getters['Login/getReferenceSquareActual']}/${this.infoCard.referenceNumber}`, formData)
        .then(() => {                
          this.$notify.success({
            title: "Ok!",
            msg: `SE INSERTO CORRECTAMENTE EL REPORTE SELLADO.`,
            position: "bottom right",
            styles: {
              height: 100,
              width: 500,
            },
          });
        })
        .catch((ex) => {                          
          this.$notify.error({
            title: "ups!",
            msg: ex,
            position: "bottom right",
            styles: {
              height: 100,
              width: 500,
            },
          });
        });
    },
    pdf: function () {
      var oReq = new XMLHttpRequest();
      let _ref = this.infoCard.referenceNumber;
      // The Endpoint of your server
      let urlTopdf =
        this.infoCard.openMode == false
          ? `${API}/pdf/${this.$store.getters["Login/getReferenceSquareActual"]}/${this.infoCard.referenceNumber}/${this.infoCard.referenceNumber.split("-")[0]}`
          : `${API}/pdf/${this.$store.getters["Login/getReferenceSquareActual"]}/open/${this.infoCard.referenceNumber}/${this.infoCard.referenceNumber.slice(0, 3)}`;
      let namePdf = `ReportDTC-${_ref}.pdf`;
      // Configure XMLHttpRequest
      oReq.open("GET", urlTopdf, true);
      // Important to use the blob response type
      oReq.responseType = "blob";
      // When the file request finishes
      // Is up to you, the configuration for error events etc.
      oReq.onload = function () {
        // Once the file is downloaded, open a new window with the PDF
        // Remember to allow the POP-UPS in your browser
        var file = new Blob([oReq.response], {
          type: "application/pdf",
        });
        // Generate file download directly in the browser !
        saveAs(file, namePdf);
      };
      oReq.send();
    },
    borrar: function () {
      window.scroll(0, 0);
      this.$emit("borrar-card", this.infoCard.referenceNumber);
      this.menosMas = true;
      this.showmenosMas = false;
    },
    recibirImagenes: function (e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      else {
        for (let item of files) {        
          this.crearImage(item);
        }
        this.pdfSelladoBool = true
      }
    },
    crearImage(file) {
      var reader = new FileReader();
      reader.onload = (e) => {
        this.$nextTick().then(() => {
          this.pdfSellado = {
            imgbasePDF: e.target.result,
            nombre: this.infoCard.referenceNumber + '-99',
          };
        })        
      };
      reader.readAsDataURL(file);            
    },
    base64ToFile: function (dataurl, fileName) {      
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], fileName, { type: mime });
    },
    
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

