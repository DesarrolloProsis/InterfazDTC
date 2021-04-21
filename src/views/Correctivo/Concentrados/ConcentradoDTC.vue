<template>
<div>    
    <div class="flex justify-center">
        <div class="grid gap-4 grid-cols-1 py-3 px-3">                
        <!-- <Generico :titulo="'CONCENTRADO DTC'" :tipo="'DTC'"></Generico>  -->
        <!--/////////////////////////////////////////////////////////////////////
        ////                         MODAL CARRUSEL                        /////
        ////////////////////////////////////////////////////////////////////-->
        <div class="sticky inset-0">
          <div v-if="carruselModal" class="rounded-lg border max-w-2xl h-69 justify-center absolute inset-x-0 bg-white mx-auto border-gray-700 shadow-2xl">          
            <div class="justify-center text-center block">            
                <Carrusel @cerrar-modal-carrusel="carruselModal = false, arrayImagenesCarrusel = []" :arrayImagenes="arrayImagenesCarrusel"></Carrusel>
            </div>
          </div>
        </div>
        <!--/////////////////////////////////////////////////////////////////////
        ////                         MODAL CARRUSEL                        /////
        ////////////////////////////////////////////////////////////////////-->
        <div class="relative inset-0">
          <div v-if="subirImgModal" class="rounded-lg border max-w-2xl h-34 justify-center absolute inset-x-0 bg-white mx-auto border-gray-700 shadow-2xl">          
            <AgregarImg></AgregarImg>
            <div class="justify-center flex mt-5">
              <button class="botonIconCrear m-4">Subir</button>
              <button @click="subirImgModal = false" class="botonIconCancelar m-4">Cancelar</button>
            </div>
          </div>
        </div>
      <!--/////////////////////////////////////////////////////////////////////
      /////                    FILTROS DE NAVEGACION                      ////
      ////////////////////////////////////////////////////////////////////-->   
      <HeaderGenerico @limpiar-filtros="limpiar_filtros" @filtrar-dtc="filtro_dtc" :titulo="'Autorizado GMMEP'" :tipo="'DTC'"></HeaderGenerico>       
      <!--////////////////////////////////////////////////////////////////////
      ////                      MODAL CAMBIAR STATUS                   //////
      ////////////////////////////////////////////////////////////////////-->
      <div class="sticky inset-0">
        <div v-if="modalCambiarStatus" class="rounded-lg justify-center absolute inset-x-0 md:w-69 lg:w-69 xl:w-69 mx-auto px-12 py-1 sm:p-2 -mt-10 sm:-mt-32">
          <div class="rounded-lg border bg-white border-gray-700 px-12 py-10 shadow-2xl">
            <p class="text-gray-900 font-thin text-md">Seguro que quieres cambiar el status de la referencia {{ dtcEdit.referenceNumber }}</p>
            <div>
              <div class="mt-5">
                <p class="mb-1 sm:text-sm">Status DTC</p>
                <select v-model="statusEdit" class="w-full" type="text">
                  <option value="">Selecionar...</option>     
                  <option value="1">Inconcluso</option>  
                  <option value="2">Concluido</option>                                                                  
                  <option value="3">Sellado</option>                                                                                                                               
                  <option v-if="tipoUsuario == 10" value="4">GMMEP</option>  
                </select> 
              </div>
              <div class="mt-5">
                <p class="mb-1 sm:text-sm">Motivo del Cambio</p>
                <textarea
                v-model="motivoCambio"
                class="appearance-none block bg-grey-lighter container mx-auto text-grey-darker  border-black rounded-lg py-4 mb-0 h-24 placeholder-gray-500 border"
                placeholder="Motivo del Cambio"
                v-bind:maxlength="limite"
                />
                <span class="text-gray-500">{{ restante }}/300</span>
              </div>
            </div>
            <div class="justify-center flex mt-5">
              <button @click="editar_status_dtc" class="botonIconCrear m-4">Aceptar</button>
              <button @click="modalCambiarStatus = false, statusEdit = '', motivoCambio =''" class="botonIconCancelar m-4">Cancelar</button>
            </div>
          </div>
        </div>
      </div>
        <div class="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto sm:mb-24 md:mb-16" style="height:500px;">
          <table class="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped">
            <!--/////////////////////////////////////////////////////////////////
            ////                           HEADER TABLA                      ////
            ////////////////////////////////////////////////////////////////////-->
            <thead>
                <tr class="text-md text-gray-400 font-normal bg-blue-800">                
                    <th class="cabeceraTable">Referencia</th>
                    <th class="cabeceraTable">Fecha de Elaboracion</th>
                    <th class="cabeceraTable">Fecha de Siniestro</th>
                    <th class="cabeceraTable">Registro en Sistema</th>
                    <th class="cabeceraTable">Folio</th>
                    <th class="cabeceraTable">N° de Reporte</th>
                    <th class="cabeceraTable">N° de Siniestro</th>
                    <th class="cabeceraTable">Fecha de Falla</th>
                    <th class="cabeceraTable">Fotografias</th>
                    <th class="cabeceraTable" v-if="tipoUsuario == 4 || tipoUsuario == 10">Cambiar Status</th>
                    <th class="cabeceraTable">PDF</th>
                </tr>
            </thead>
            <!--/////////////////////////////////////////////////////////////////
            ////                          BODY TABLA                          ////
            ////////////////////////////////////////////////////////////////////-->
            <tbody name="table" is="transition-group">  
                <tr class="h-12 text-gray-900 text-sm text-center" v-for="(item, key) in infoDTC" :key="key">                
                  <td class="cuerpoTable">{{ item.referenceNumber }}</td>
                  <td class="cuerpoTable">{{ item.elaborationDate | formatDate }}</td>
                  <td class="cuerpoTable">{{ item.sinisterDate | formatDate}}</td>
                  <td class="cuerpoTable">{{ item.dateStamp | formatDate}}</td>
                  <td class="cuerpoTable">
                    <input class="text-center border-0 shadow-none" v-model="item.failureNumber" type="text" placeholder="Sin Información" readonly/>
                  </td>
                  <td class="cuerpoTable">
                    <input class="text-center border-0 shadow-none" v-model="item.reportNumber" type="text" placeholder="Sin Información" readonly/>
                  </td>
                  <td class="cuerpoTable">
                    <input class="text-center border-0 shadow-none" v-model="item.sinisterNumber" type="text" placeholder="Sin Información" readonly/>
                  </td>
                  <td class="cuerpoTable">{{ item.failureDate | formatDate }}</td>
                  <td>
                    <div>
                      <button @click="abrirCarrusel(item)" class="botonIconCrear" v-if="!item.imgbool" :class="{'bg-gray-400 hover:bg-gray-400': item.imgbool }" :disabled=" item.imgbool ">
                        <img src="../../../assets/img/image-mini.png" class="justify-center" width="15" height="15"/>
                      </button>
                      <button @click="abrirSubir(item)" class="botonIconCrear" v-else >
                        <img src="../../../assets/img/more.png" class="justify-center" width="15" height="15"/>
                      </button>
                    </div>
                  </td>
                  <td class="cuerpoTable" v-if="tipoUsuario == 4 || tipoUsuario == 10">
                    <div>
                      <button class="botonIconBuscar" @click="abrir_modal_editar(item)">Cambiar Status</button>
                    </div>
                  </td>
                  <td class="cuerpoTable">
                  <!-- <input type="checkbox"> -->
                  <div class="grid grid-cols-2 md:grid-cols-1 md:mr-24 sm:grid-cols-1 sm:mr-24 justify-center" v-if="tipoUsuario != 8">
                    <button @click="descargar_PDF(item,2)" class="botonIconBorrarCard  w-24 sm:w-10 sm:ml-8 mr-2">
                        <img src="../../../assets/img/pdf-firmado.png" class="mr-2 sm:m-0 sm:ml-1" width="15" height="15" />
                        <span class="text-xs sm:hidden">Firmado</span>
                    </button>
                    <button v-if="item.statusId >= 3" @click="descargar_PDF(item,3)" class="botonIconBorrarCard w-24 sm:w-10 sm:ml-8" :class="{'hidden': item.escaneadobool  }" :disabled=" item.escaneadobool ">
                        <img src="../../../assets/img/pdf-sellado.png" class="mr-2 sm:m-0 sm:ml-1" width="15" height="15" />
                        <span class="text-xs sm:hidden">Sellado</span>
                    </button>

                    <!-- /////////////////////////////////////////////////////////////////////
                    ////                       SUBIR PDF SELLADO                      ////
                    ///////////////////////////////////////////////////////////////////// -->        
                    <div v-if="item.escaneadobool">                    
                      <button class="mt-1" v-if="!item.confirmpdf">
                        <div class="flex justify-center botonIconSellado">
                          <input type="file" class="opacity-0 w-auto h-4 absolute" @change="recibir_pdf_sellado($event, key)"/>
                          <img src="../../../assets/img/pdf.png" class="mr-1" width="15" height="15"/>
                          <p class="text-xs mt-1">Subir Sellado</p>
                        </div>                   
                      </button>
                      <div class="grid grid-cols-1" v-else>
                        <div class="grid grid-cols-2">
                        <img src="../../../assets/img/pdf.png" class="w-4 h-4 -ml-4 opacity-75" alt/>     
                        <p class="-ml-32 text-sm">{{ pdfSellado.name }}</p>
                        </div>
                        <div class="grid grid-cols-2 -ml-10">
                          <button @click="item.confirmpdf = false, pdfSellado = ''" class="botonIconCancelar -ml-2 h-10 text-sm justify-center px-1">Cancelar</button>
                          <button @click="enviar_pdf_sellado(key)" class="botonEnviarPDF mr-2 px-2 py-2 h-10 text-sm justify-center w-24">Subir</button>
                        </div>            
                      </div>
                    </div>
                  </div>                                 
                  
                  <div v-else>
                    <button @click="descargar_PDF(item,1)" class="botonIconBorrarCard mr-2">
                      <img src="../../../assets/img/pdf.png" class="mr-2 sm:m-0" width="15" height="15" />                      
                      <span class="text-xs sm:hidden w-24">Sin Firma</span>
                    </button>
                  </div>
                  </td>
                </tr>
            </tbody>
          </table>
        </div>  
      </div>  
    </div> 
</div>
</template>

<script>
import Axios from "axios";
const API = process.env.VUE_APP_URL_API_PRODUCCION
import moment from "moment";
import ServiceFiltrosDTC from "../../../services/FiltrosDTCServices"
import ServiceReportPDF from "../../../services/ReportesPDFService"
import Carrusel from "../../../components/Carrusel";
import HeaderGenerico from "../../../components/Header/HeaderGenerico";
import AgregarImg from "../../../components/ImagenesGenericas"

export default {
  name: "ConcentradoDTC",
  components: {    
    Carrusel,
    HeaderGenerico,
    AgregarImg
  },

/////////////////////////////////////////////////////////////////////
////                      DATA                                    ////
/////////////////////////////////////////////////////////////////////
data: function (){
    return {      
      infoDTC:[],            
      filtroVista: true,
      modalCambiarStatus: false,
      dtcEdit: {},
      motivoCambio:"",
      statusEdit: "",
      limite:300,
      carruselModal: false,
      dtcImg: {},
      arrayImagenesCarrusel: [],
      pdfSelladoBool: true,
      pdfSellado:'',
      bandera:false,
      subirImgModal: false,
    }
  },
/////////////////////////////////////////////////////////////////////
////                       CICLOS DE VIDA                        ////
/////////////////////////////////////////////////////////////////////
/* mounted(){ 
console.log(this.$el)
}, */

beforeMount: function () {
  this.filtroVista = true
  this.infoDTC =  this.$store.getters["DTC/GET_LISTA_DTC"](this.filtroVista);  
  this.tipoUsuario = this.$store.state.Login.cookiesUser.rollId
/*   console.log(this.$el)
  console.log(this.$data)
  console.log(this.$options.data) */

},
/////////////////////////////////////////////////////////////////////
////                       COMPUTADOS                            ////
/////////////////////////////////////////////////////////////////////
computed:{
    restante(){
        return  this.motivoCambio.length
    }
},
/////////////////////////////////////////////////////////////////////
////                           METODOS                           ////
/////////////////////////////////////////////////////////////////////
methods:{
abrirSubir: function () {
  this.subirImgModal = true
},
abrirCarrusel : async function (item){  
  this.dtcImg = item
  await Axios.get(`${API}/dtcData/EquipoDañado/Images/GetPaths/${item.referenceNumber.split('-')[0]}/${item.referenceNumber}`)
    .then((response) => {              
        if(response.status != 404){                 
          if(response.data.length > 0){
            let array = response.data.map(imgData => {
              return {
                "fileName": imgData, 
                "image": `${API}/dtcData/EquipoDañado/Images/${item.referenceNumber.split('-')[0]}/${item.referenceNumber}/${imgData}`
              }
            })            
            this.arrayImagenesCarrusel = {
              array_img: array,
              referenceNumber: item.referenceNumber,
            };  
            this.carruselModal = true
          }
          else{
            this.$notify.warning({
            title: "Ups!",
            msg: `SIN FOTOS.`,
            position: "bottom right",
            styles: {
              height: 100,
              width: 500,
            },
          });
        }   
      }                   
    })
    .catch((error) => {   
      console.log(error)            
    });      
},
editar_status_dtc: function (){
  let user = this.$store.getters['Login/GET_USEER_ID_PLAZA_ID']
  //Crea un objeto con los elementos necesarios para hacer un evento post
  let objeActualizado = {
        "ReferenceNumber": this.dtcEdit.referenceNumber,
        "StatusId": parseInt(this.statusEdit),
        "UserId": user.idUser,
        "Comment": this.motivoCambio,
      }        
    if( this.statusEdit != '' && this.motivoCambio != ''){
      //Evento post que llama a la api 
    Axios.post(`${API}/Pdf/ActualizarDtcAdministratores/${this.dtcEdit.referenceNumber.split('-')[0]}`, objeActualizado)
      .then(async() => {        
        this.statusEdit = ''
        this.motivoCambio = ''   
        let info = await this.$store.getters['Login/GET_USEER_ID_PLAZA_ID']  
        await this.$store.dispatch('DTC/BUSCAR_LISTA_DTC', info)
        this.modalCambiarStatus = false
        this.infoDTC = await this.$store.getters["DTC/GET_LISTA_DTC"](this.filtroVista);                              
      })
      .catch(error => {                    
        console.log(error);
      });
    }
    else {
          this.$notify.warning({
          title: "Ups!",
          msg: `NO SE HA LLENADO LOS CAMPOS.`,
          position: "bottom right",
          styles: {
            height: 100,
            width: 500,
          },
        });
    }
},
abrir_modal_editar : function (item){
  this.modalCambiarStatus = true
  //Toma la variable y la iguala al objeto item que trae toda la fila 
  this.dtcEdit = item
},
descargar_PDF: function (infoDtc, status){
    ServiceReportPDF.generar_pdf_correctivo(infoDtc.referenceNumber, status, false)
},
filtro_dtc: async function (objFiltro) {   
  if( objFiltro.plazaFiltro != '' || objFiltro.fechaFiltro != '' || objFiltro.referenciaFiltro != ''){        
    let listaFiltrada = await ServiceFiltrosDTC.filtrarDTC(this.filtroVista, objFiltro.plazaFiltro, objFiltro.fechaFiltro, objFiltro.referenciaFiltro, undefined, false)    
    this.$nextTick().then(() => {      
        this.infoDTC = listaFiltrada            
    }) 
  }  
  else{
    this.$notify.warning({
      title: "Ups!",
      msg: `NO SE HA LLENADO NINGUN CAMPO PARA FILTRAR.`,
      position: "bottom right",
      styles: {
        height: 100,
        width: 500,
      },
    });
  }
},
limpiar_filtros: function() {             
  this.modalLoading = true                            
  this.$nextTick().then(() => {             
    this.infoDTC = this.$store.getters["DTC/GET_LISTA_DTC"](this.filtroVista);              
  })           
},
recibir_pdf_sellado(e, index) { 
  console.log(index)               
  var files = e.target.files || e.dataTransfer.files;
  if (!files.length) return;
  else {  
    for (let item of files) {        
      if(this.crearImage(item)){
        console.log(this.infoDTC[index].confirmpdf)
        this.$nextTick().then(() => {
          this.pdfSelladoBool = false
          this.infoDTC[index].confirmpdf = true             
          this.infoDTC.splice(index, 1 ,  Object.assign(this.infoDTC[index]))          
          
        })
      }
    }        
  }
},
crearImage(file) {
  console.log(file)
  if(file.type.split('/')[1] == 'pdf'){
    var reader = new FileReader(); 
    reader.onload = (e) => {
      this.$nextTick().then(() => {
        this.pdfSellado = {
          imgbase: e.target.result.split(',')[1],
          name: file.name,
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
enviar_pdf_sellado(index){
  console.log(index)                      
  let formData = new FormData();
  let file = this.base64ToFile(this.pdfSellado.imgbase, this.pdfSellado.name)
  formData.append("file", file);     
  let obj = {
    referenceNumber: this.infoDTC[index].referenceNumber,
    file: formData,
  }
  this.infoDTC[index].escaneadobool = false        
  this.infoDTC.splice(index, 1, Object.assign(this.infoDTC[index]))  
  let pdf_sellado_promise = new Promise((resolve, reject) => {    
  Axios.post(`${API}/pdf/PdfSellado/${obj.referenceNumber.split('-')[0]}/${obj.referenceNumber}/${false}`, obj.file)
    .then(() => {          
      Axios.get(`${API}/pdf/GetPdfSellado/${obj.referenceNumber.split('-')[0]}/${obj.referenceNumber}`)
      .then(() => {                         
          let info = this.$store.getters['Login/GET_USEER_ID_PLAZA_ID']  
          this.$store.dispatch('DTC/BUSCAR_LISTA_DTC', info)                                     
          resolve('ok')                                                                           
      })                                  
    })
    .catch((error) => {                      
      reject(error)                          
      this.$notify.error({
        title: "ups!",
        msg: error,
        position: "bottom right",
        styles: {
          height: 100,
          width: 500,
        },
      });        
    });              
  })
    setTimeout(() => {
      pdf_sellado_promise.then(() => {  
        this.modalLoading = false                  
        this.limpiar_filtros()
        this.$notify.success({
            title: "Ok!",
            msg: `SE SUBIO CORRECTAMENTE EL ARCHIVO.`,
            position: "bottom right",
            styles: {
              height: 100,
              width: 500,
            },
        });  
      })
      .catch((error) =>  console.log(error))    
    }, 3000);      
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

<style>

</style>