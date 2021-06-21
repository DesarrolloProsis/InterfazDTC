<template>
  <div>    
    <div class="flex justify-center -mt-6">
      <div class="grid gap-4 grid-cols-1 py-3 px-3">                        
      <!--/////////////////////////////////////////////////////////////////////
      ////                         MODAL CARRUSEL                        /////
      ////////////////////////////////////////////////////////////////////-->
      <div class="sticky inset-0">
        <div v-if="carruselModal" class="carruselGMMEP">          
          <div class="justify-center text-center block">            
              <Carrusel @cerrar-modal-carrusel="carruselModal = false, arrayImagenesCarrusel = []" :arrayImagenes="arrayImagenesCarrusel"></Carrusel>
          </div>
        </div>
      </div>
      <!--/////////////////////////////////////////////////////////////////////
      ////                         MODAL CARRUSEL                        /////
      ////////////////////////////////////////////////////////////////////-->
      <div class="sticky inset-0">
        <div v-if="subirImgModal" class="rounded-lg border max-w-2xl h-44 justify-center absolute inset-x-0 bg-white mx-auto border-gray-400 shadow-2xl mt-66">          
          <button @click="subirImgModal = false" class="ml-74 mt-1 -mb-10 justify-end sm:ml-66">
            <img src="../../../assets/img/close.png" class="justify-center" width="30" height="30"/></button>
          <div class="mt-1 ml-4 mr-4 -mb-10">
            <AgregarImg :reporteDataInsertada="true" :tipo="'ConcentradoDTC'" :referenceNumber="datosImg.referenceNumber"></AgregarImg>
          </div>
          <div class="justify-center flex mt-5 sm:mt-8">
            <button @click="subirImg" class="botonIconCrear m-4">Subir</button>
          </div>
        </div>
      </div>
      <!--/////////////////////////////////////////////////////////////////////
      ////                         MODAL ACTUALIZAR                      /////
      ////////////////////////////////////////////////////////////////////-->
      <div class="sticky inset-0 font-titulo">
        <div v-if="modalActualizar" class="carruselGMMEP h-62">          
          <div class="justify-center text-center block">    
            <p class="mt-10 text-black text-2xl font-bold sm:ml-6 sm:-mt-6">Advertencia</p>        
            <p class="w-69 ml-24 sm:ml-0 sm:w-full text-justify">Se van a Actualizar los componentes requeridos del DTC con Referencia {{ infoAcrualizar.referenceNumber }}</p> 
          </div>
          <div class="mt-12 flex justify-center">
              <button class="botonIconCrear font-boton" >
                  <span class="" @click="ActualizarComponentes">Aceptar</span>
              </button>
              <button class="botonIconCancelar font-boton" @click="modalActualizar = false">
                  <span class="">Cancelar</span>
              </button>
          </div>
        </div>
      </div>
      <!--/////////////////////////////////////////////////////////////////////
      /////                    FILTROS DE NAVEGACION                      ////
      ////////////////////////////////////////////////////////////////////-->   
      <HeaderGenerico @limpiar-filtros="limpiar_filtros" @filtrar-dtc="filtro_dtc" @buscar-gmmep="guardar_palabra_busqueda" :titulo="'Concentrado GMMEP'" :tipo="'GMMEP'"></HeaderGenerico>       
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
                <select v-model="statusEdit" class="w-full is_valid" type="text">
                  <option value="">Selecionar...</option>     
                  <option value="1">Inconcluso</option>  
                  <option value="2">Concluido</option>                                                                  
                  <option value="3">Sellado</option>                                                                                                                               
                  <option v-if="tipoUsuario == 10" value="4">GMMEP</option>  
                </select> 
              </div>
              <div class="mt-5">
                <p class="mb-1 sm:text-sm">Motivo del Cambio</p>
                <textarea v-model="motivoCambio" class="appearance-none block bg-grey-lighter container mx-auto text-grey-darker is_valid border-black rounded-lg py-4 mb-0 h-24 placeholder-gray-500 border" placeholder="Motivo del Cambio" v-bind:maxlength="limite"/>
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
      <div class="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto sm:mb-24 md:mb-16 font-titulo mb-16"
        :class="{'overflow-x-auto bg-white rounded-lg relative shadow overflow-y-auto sm:mb-24 md:mb-16 font-titulo mb-16' : !carruselModal && !modalCambiarStatus && !modalActualizar}"  style="height:550px;">
        <table class="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped ">
          <!--/////////////////////////////////////////////////////////////////
          ////                           HEADER TABLA                      ////
          ////////////////////////////////////////////////////////////////////-->
          <thead class="">
              <tr class="text-md text-gray-400 font-normal bg-blue-800">   
                <th class="cabeceraTable font-medium" v-if="tipoUsuario == 1">Actualizar</th>             
                <th class="cabeceraTable font-medium">Referencia</th>
                <th class="cabeceraTable font-medium">Fecha de Elaboracion</th>
                <th class="cabeceraTable font-medium">Fecha de Siniestro</th>
                <th class="cabeceraTable font-medium">Registro en Sistema</th>
                <th class="cabeceraTable font-medium">Folio</th>
                <th class="cabeceraTable font-medium">N° de Reporte</th>
                <th class="cabeceraTable font-medium">N° de Siniestro</th>
                <th class="cabeceraTable font-medium">Fecha de Falla</th>
                <th class="cabeceraTable font-medium">Fotografias</th>
                <th class="cabeceraTable font-medium" v-if="tipoUsuario == 4 || tipoUsuario == 10">Cambiar Estatus</th>
                <th class="cabeceraTable font-medium">PDF</th>
              </tr>
          </thead>
          <!--/////////////////////////////////////////////////////////////////
          ////                          BODY TABLA                          ////
          ////////////////////////////////////////////////////////////////////-->
          <tbody name="table">  
            <template v-if="lista_DTC_Filtrada.length == 0 && loadingTabla != true"> 
                <tr>
                    <td class="w-full text-center text-red-500 m-10" colspan="10">                                    
                        <div class="mt-8 mb-8">Sin Informacion</div>
                    </td>
                </tr>  
            </template> 
            <template v-if="loadingTabla">  
                <tr>
                    <td class="w-full" colspan="10">                                    
                        <div style="border-top-color:transparent" class="mt-8 mb-8 border-solid animate-spin rounded-full border-blue-400 border-2 h-10 w-10 mx-auto"></div>
                    </td>                          
                </tr>  
            </template>   
            <template v-if="lista_DTC_Filtrada.length > 0">
              <tr class="h-12 text-gray-900 text-sm text-center" v-for="(item, key) in lista_DTC_Filtrada" :key="key">  
                <td class="cuerpoTable" v-if="tipoUsuario == 1">
                  <div>
                    <button @click="abrirModal(item)" class="botonTodos">
                      <img src="@/assets/img/todos.png" class="mr-4 ml-1 sm:mr-2" width="35" height="35"/>
                    </button>
                  </div>
                </td>              
                <td class="cuerpoTable">{{ item.technicalSheetReference }}</td>
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
                <!-- Columna de las imagenes -->
                <td class="cuerpoTable">
                  <div v-if="tipoUsuario != 7">
                    {{ validar_imagenes_diagnostico(item) }}
                    <button v-if="validar_imagenes_diagnostico(item)" @click="abrirCarrusel(item)" class="botonIconCrear" :class="{'bg-gray-400 hover:bg-gray-400': validar_imagenes_diagnostico(item) }" :disabled="!validar_imagenes_diagnostico(item)">
                      <img src="@/assets/img/image-mini.png" class="justify-center w-5"/>
                    </button>
                    <button v-else @click="abrirSubir(item)" class="botonIconCrear" :class="{'bg-gray-400 hover:bg-gray-400 cursor-default': validar_imagenes_diagnostico(item) }" :disabled="validar_imagenes_diagnostico(item)" >
                      <img src="@/assets/img/no-camaras.png" class="justify-center w-5"/>
                    </button>
                  </div>
                  <div v-if="tipoUsuario == 7">
                    <button @click="abrirCarrusel(item)" class="botonIconCrear" :class="{'bg-gray-400 hover:bg-gray-400': tipoUsuario == 4 || tipoUsuario == 10 }" :disabled=" tipoUsuario == 4 || tipoUsuario == 10 ">
                      <img src="@/assets/img/image-mini.png" class="justify-center" width="15" height="15"/>
                    </button>
                  </div>
                </td>
                <!-- Columna de cambios de status -->
                <td class="cuerpoTable" v-if="tipoUsuario == 4 || tipoUsuario == 10">
                  <div>
                    <button class="botonIconBuscar" @click="abrir_modal_editar(item)">Cambiar Estatus</button>
                  </div>
                </td>
                <td class="cuerpoTable">
                  <div class="grid grid-cols-1 md:mr-24 sm:grid-cols-1 sm:mr-24 mr-32" v-if="tipoUsuario != 8">          
                      <button @click="descargar_PDF(item,2)" class="botonIconBorrarCard font-boton w-24 -mr-24 sm:-ml-1 ml-5" :class="{'ml-8': pdfSellado.name}">
                          <img src="../../../assets/img/pdf-firmado.png" class="mr-2 ml-1 sm:mr-2 " width="15" height="15" />
                          <span class="text-xs">Firmado</span>
                      </button>
                      <button v-if="item.statusId >= 3" @click="descargar_PDF(item,3)" class="botonIconBorrarCard font-boton w-24 sm:-ml-1 ml-5" :class="{'hidden': item.escaneadobool, 'ml-8': pdfSellado.name}" :disabled=" item.escaneadobool ">
                          <img src="../../../assets/img/pdf-sellado.png" class="mr-2 ml-1 sm:mr-2" width="15" height="15" />
                          <span class="text-xs">Sellado</span>
                      </button>
                    <!-- /////////////////////////////////////////////////////////////////////
                    ////                       SUBIR PDF SELLADO                      ////
                    ///////////////////////////////////////////////////////////////////// -->        
                    <div class="" v-if="tipoUsuario != 7">
                      <div v-if="item.escaneadobool">                    
                        <button class="mt-1 w-32 ml-1 sm:w-32 sm:-ml-5" v-if="!item.confirmpdf">
                          <div class="botonIconSellado font-boton">
                            <input type="file" class="opacity-0 w-24 h-4 absolute" @change="recibir_pdf_sellado($event, key)"/>
                            <img src="../../../assets/img/pdf.png" class="mr-1" width="15" height="15"/>
                            <p class="text-xs mt-1">Subir Sellado</p>
                          </div>                   
                        </button>
                        <div class="grid grid-cols-1 ml-6 sm:ml-0" v-else>
                          <div class="grid grid-cols-2">
                          <img src="../../../assets/img/pdf.png" class="w-4 h-4 -ml-4 sm:hidden opacity-75" alt/>     
                          <p class="ml-5 text-sm font-bold sm:ml-1">PDF Sellado</p>
                          </div>
                          <div class="grid grid-cols-1 -ml-10 sm:grid-cols-1 sm:-ml-1">
                            <button @click="enviar_pdf_sellado(key)" class="botonEnviarPDF font-boton px-1 ml-12 sm:ml-0 py-1 h-6 text-sm justify-center w-24">Subir</button>
                            <button @click="item.confirmpdf = false, pdfSellado = ''" class="botonIconCancelar font-boton ml-12 sm:ml-0 h-6 text-sm justify-center w-24 px-1 sm:w-24">Cancelar</button>                  
                          </div>            
                        </div>
                      </div>
                    </div> 
                    <div class="-ml-2" v-if="item.escaneadobool && tipoUsuario == 7">
                      <button class="botonIconBorrarCardDes font-boton w-24 sm:w-10 sm:ml-8"  :disabled=" item.escaneadobool ">
                        <img src="@/assets/img/pdf-sellado.png" class="mr-2 ml-1 sm:m-0 sm:ml-1" width="15" height="15" />
                        <span class="text-xs sm:hidden">Sellado</span>
                      </button>
                    </div>
                  </div>                                 
                  <div v-else>
                    <button @click="descargar_PDF(item,1)" class="botonIconBorrarCard mr-2">
                      <img src="@/assets/img/pdf.png" class="mr-2 sm:m-0" width="15" height="15" />                      
                      <span class="text-xs sm:hidden w-24">Sin Firma</span>
                    </button>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>  
      </div>  
    </div> 
  </div>
</template>
<script>
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
      arrayImagenesCarrusel: [],          
      rollId: true,
      lista_DTC_Filtrada: [],            
      filtroVista: true,
      pdfSelladoBool: true,
      subirImgModal: false,
      loadingTabla: false,
      modalCambiarStatus: false,
      bandera:false,
      carruselModal: false,      
      motivoCambio:"",
      statusEdit: "",
      limite:300,
      dtcEdit: {},
      dtcImg: {},
      datosImg:{},        
      pdfSellado:'',
      modalActualizar: false,
      infoAcrualizar:{}                        
    }
  },
/////////////////////////////////////////////////////////////////////
////                       CICLOS DE VIDA                        ////
/////////////////////////////////////////////////////////////////////
beforeMount: function () {
  this.loadingTabla = true
  this.filtroVista = true
  this.infoDTC =  this.$store.getters["DTC/GET_LISTA_DTC"](this.filtroVista);  
  this.lista_DTC_Filtrada = this.infoDTC
  this.tipoUsuario = this.$store.state.Login.cookiesUser.rollId
  this.loadingTabla = false
  let rol = this.$store.state.Login.cookiesUser.rollId
  if( rol == 7)
    this.rollId = false    
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
  validar_imagenes_diagnostico:  function({ technicalSheetReference }){
    if(technicalSheetReference != '--'){                
        return this.$http.get(`${API}/DiagnosticoFalla/Images/GetPaths/${technicalSheetReference.split('-')[0]}/${technicalSheetReference}`)      
          .then((response) => {                         
            if(response.data.length === 0)
              return false
            else
              return true
          })                      
    }
    else {      
      return false
    }
  } , 
  abrirModal(item){
    this.infoAcrualizar = item
    console.log(this.infoAcrualizar)
    this.modalActualizar = true
  },
  ActualizarComponentes: async function(){
    let clavePlaza = this.infoAcrualizar.referenceNumber.split('-')[0] 
    let userId = this.$store.state.Login.cookiesUser.userId
    this.$http.post(`${API}/Component/updateInventory/${clavePlaza}/${this.infoAcrualizar.referenceNumber}/${userId}`)
    this.modalActualizar = false
  },
  guardar_palabra_busqueda: function(newPalabra){  
    if (newPalabra != "") {   
      this.lista_DTC_Filtrada = [] 
      this.loadingTabla = true
      setTimeout(async () => {
        let array_filtrado = this.infoDTC.filter(item => {
          return item.referenceNumber.toUpperCase().includes(newPalabra.toUpperCase())
        })       
        this.lista_DTC_Filtrada = array_filtrado;
        this.loadingTabla = false
      },1000)
    }
    else{
      this.lista_DTC_Filtrada = this.infoDTC
    }
  },  
  abrirSubir: function (item) {
    this.subirImgModal = true
    this.datosImg = item
  },
  subirImg: async function (){
    this.subirImgModal = false
    let info = this.$store.getters['Login/GET_USEER_ID_PLAZA_ID']      
    await this.$store.dispatch('DTC/BUSCAR_LISTA_DTC', info)
    this.infoDTC =  this.$store.getters["DTC/GET_LISTA_DTC"](this.filtroVista);  
    this.lista_DTC_Filtrada = this.infoDTC
  },
  abrirCarrusel : async function (item){  
    this.dtcImg = item
    await this.$http.get(`${API}/dtcData/EquipoDañado/Images/GetPaths/${item.referenceNumber.split('-')[0]}/${item.referenceNumber}`)
      .then((response) => {              
          if(response.status != 404){                 
            if(response.data.length > 0){
              let array = response.data.map(imgData => {
                return {
                  "fileName": imgData, 
                  "image": `${API}/dtcData/EquipoDañado/Images/${item.referenceNumber.split('-')[0]}/${item.referenceNumber}/${imgData}`
                }
              })            
              this.arrayImagenesCarrusel = { array_img: array, referenceNumber: item.referenceNumber };  
              this.carruselModal = true
            }
            else{
              this.$notify.warning({
              title: "Ups!",
              msg: `SIN FOTOS.`,
              position: "bottom right",
              styles: { height: 100, width: 500 },
            });
          }   
        }                   
      })     
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
    this.$http.post(`${API}/Pdf/ActualizarDtcAdministratores/${this.dtcEdit.referenceNumber.split('-')[0]}`, objeActualizado)
      .then(async() => {        
        this.statusEdit = ''
        this.motivoCambio = ''   
        let info = await this.$store.getters['Login/GET_USEER_ID_PLAZA_ID']  
        await this.$store.dispatch('DTC/BUSCAR_LISTA_DTC', info)
        this.modalCambiarStatus = false
        this.infoDTC = await this.$store.getters["DTC/GET_LISTA_DTC"](this.filtroVista);                              
      }) 
      this.lista_DTC_Filtrada = this.infoDTC
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
    if (this.tipoUsuario != 4 && this.tipoUsuario != 8)
    {
      setTimeout(()=>{
        ServiceReportPDF.generar_pdf_fotografico_correctivo(infoDtc.referenceNumber);               
    },1000)

    }
  },


  },
  filtro_dtc: async function (objFiltro) {     

  if( objFiltro.plazaFiltro != '' || objFiltro.fechaFiltro != '' || objFiltro.referenciaFiltro != ''){      
    this.lista_DTC_Filtrada = []
    this.loadingTabla = true    
    setTimeout(async () => {
      let listaFiltrada = await ServiceFiltrosDTC.filtrarDTC(this.filtroVista, objFiltro.plazaFiltro, objFiltro.fechaFiltro, objFiltro.referenciaFiltro, undefined, false)    
      this.$nextTick().then(() => {      
          this.lista_DTC_Filtrada = listaFiltrada            
          this.loadingTabla = false
      }) 
    },1000)
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
    this.lista_DTC_Filtrada = this.infoDTC
  })           
  },
  recibir_pdf_sellado(e, index) {           
    var files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;
    else {  
      for (let item of files) {        
        if(this.crearImage(item)){        
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
  this.$http.post(`${API}/pdf/PdfSellado/${obj.referenceNumber.split('-')[0]}/${obj.referenceNumber}/${false}`, obj.file)
    .then(() => {          
      this.$http.get(`${API}/pdf/GetPdfSellado/${obj.referenceNumber.split('-')[0]}/${obj.referenceNumber}`)
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
    }, 3000);      
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