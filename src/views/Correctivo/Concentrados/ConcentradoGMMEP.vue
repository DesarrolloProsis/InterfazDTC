<template>
  <div>    
    <div class="flex justify-center -mt-6">
      <div class="grid gap-4 grid-cols-1 py-3 px-3"> 
        <PdfEscaneado 
          @limpiar-componente-escaneado="limpiar_componete_escaneado" 
          :abrirModal="modalSubirSellado" 
          :objInsert="objInsertEscaneado" 
          :tipoReporte="tipoEscaneado"
        ></PdfEscaneado>                           
        <!--/////////////////////////////////////////////////////////////////////
        ////                         MODAL CARRUSEL                        /////
        ////////////////////////////////////////////////////////////////////-->
        <div class="sticky inset-0">
          <div v-if="carruselModal" class="carruselGMMEP">          
            <div class="justify-center text-center block">            
                <Carrusel 
                  @cerrar-modal-carrusel="carruselModal = false, arrayImagenesCarrusel = []" 
                  :arrayImagenes="arrayImagenesCarrusel"
                ></Carrusel>
            </div>
          </div>
        </div>
        <!--/////////////////////////////////////////////////////////////////////
        ////                    MODAL SUBIR IMAGENES                        /////
        ////////////////////////////////////////////////////////////////////-->
        <div class="sticky inset-0">
          <div v-if="subirImgModal" class="rounded-lg border max-w-2xl h-44 justify-center absolute inset-x-0 bg-white mx-auto border-gray-400 shadow-2xl mt-66">          
            <button @click="subirImgModal = false" class="ml-74 mt-1 -mb-10 justify-end sm:ml-66">
              <img src="../../../assets/img/close.png" class="justify-center" width="30" height="30"/></button>
            <div class="mt-1 ml-4 mr-4 -mb-10">
              <AgregarImg 
                :reporteDataInsertada="true" 
                :tipo="'ConcentradoDTC'" 
                :referenceNumber="datosImg.referenceNumber"
              >
              </AgregarImg>
            </div>
            <div class="justify-center flex mt-5 sm:mt-8">
              <button @click="subirImg" class="botonIconCrear m-4">Subir</button>
            </div>
          </div>
        </div> 
    <!--////////////////////////////////////////////////////////////////////
        ////                      MODAL CAMBIAR STATUS                   //////
        ////////////////////////////////////////////////////////////////////-->
        <div class="sticky inset-0" :class="{'modal-container': modalCambiarStatus}">
          <div v-if="modalCambiarStatus" class="rounded-lg justify-center absolute inset-x-0 md:w-69 lg:w-69 xl:w-69 mx-auto px-12 py-1 sm:p-2 mt-48 sm:-mt-32">
            <div class="rounded-lg border bg-white border-gray-700 px-12 py-10 shadow-2xl">
              <p class="text-gray-900 font-thin text-md">Seguro que quieres cambiar el estatus de la referencia <b class="font-bold">{{ dtcEdit.referenceNumber }}</b></p>
              <div>
                <div class="mt-5">
                  <p class="mb-1 sm:text-sm">Status DTC</p>
                  <select v-model="statusEdit" class="w-full is_valid" type="text">
                    <option value="">Selecionar...</option>     
                    <option value="1">Inconcluso</option>  
                    <option value="2">Concluido</option>                                                                  
                    <option value="3">Sellado</option>                                                                                                                               
                    <option v-if="tipoUsuario == 10" value="4">GMMEP</option>
                    <option v-if="dtcEdit.technicalSheetReference != '--' " value="5">Almacen</option>  
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
        <!--/////////////////////////////////////////////////////////////////////
        ////                         MODAL ACTUALIZAR                      /////
        ////////////////////////////////////////////////////////////////////-->
        <div class="sticky inset-0 font-titulo" :class="{'modal-container': modalActualizar}">
          <div v-if="modalActualizar" class="carruselGMMEP h-62 mt-64">          
            <div class="justify-center text-center block">    
              <p class="mt-10 text-black text-2xl font-bold sm:ml-6 sm:-mt-6">Advertencia</p>        
              <p class="w-69 ml-24 sm:ml-0 sm:w-full text-justify">Se van a Actualizar los componentes requeridos del DTC con Referencia {{ infoAcrualizar.referenceNumber }}</p> 
            </div>
            <div class="mt-12 flex justify-center">
                <button class="botonIconCrear font-boton"><span class="" @click="actualizar_componentes_dtc">Aceptar</span></button>
                <button class="botonIconCancelar font-boton" @click="modalActualizar = false"><span class="">Cancelar</span></button>
            </div>
          </div>
        </div>
        <!--/////////////////////////////////////////////////////////////////////
        /////                    FILTROS DE NAVEGACION                      ////
        ////////////////////////////////////////////////////////////////////-->   
        <HeaderGenerico 
          @limpiar-filtros="limpiar_filtros" 
          @filtrar-dtc="filtro_dtc" 
          @buscar-gmmep="guardar_palabra_busqueda" 
          :titulo="'Concentrado GMMEP'" 
          :tipo="'GMMEP'"
        >
        </HeaderGenerico>  
    <!--/////////////////////////////////////////////////////////////////////
        /////                    TABLA GMMEP                            ////
        ////////////////////////////////////////////////////////////////////-->           
        <TablaGenerica  
            @acciones-mapper="acciones_mapper"              
            :listaDataTable="lista_DTC_Filtrada"
            :loadingTabla="loadingTabla"
            :validarAcciones="opticones_select_acciones"
            :normalheaderKey="[{text: 'Numero Referencia', key: 'referenceNumber'},{text: 'Fecha Elaboracion', key: 'elaborationDate', formatoFecha: true},{text: 'Fecha Siniestro', key: 'sinisterDate', formatoFecha: true},{text: 'Registro Sistema', key: 'dateStamp', formatoFecha: true},{text: 'Folio', key: 'failureNumber'},{text: 'N° Reporte', key:'reportNumber'},{text: 'N° Siniestro', key: 'sinisterNumber'},{text: 'Fecha Falla', key: 'sinisterNumber'},{text: 'Acciones', key: 'Acciones'}]"
            :movilHeaderKey="[{text: 'Numero Referencia', key: 'referenceNumber'},{text: 'Fecha Elaboracion', key: 'elaborationDate', formatoFecha: true},{text: 'Acciones', key: 'Acciones'}]"
        >
        </TablaGenerica>     
        </div>  
    </div> 
  </div>
</template>
<script>
const API = process.env.VUE_APP_URL_API_PRODUCCION
import ServiceFiltrosDTC from "../../../services/FiltrosDTCServices"
import ServiceReportPDF from "../../../services/ReportesPDFService"
import Carrusel from "../../../components/Carrusel";
import HeaderGenerico from "../../../components/Header/HeaderGenerico";
import AgregarImg from "../../../components/ImagenesGenericas"
import PdfEscaneado from '../../../components/PdfEscaneado.vue'
import TablaGenerica from '../../../components/TablaGenerica.vue'

export default {
  name: "ConcentradoGMMEP",
  components: {    
    Carrusel,
    HeaderGenerico,
    AgregarImg,
    PdfEscaneado,
    TablaGenerica
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
      infoAcrualizar:{},
      value:'',
      modalSubirSellado: false,
      objInsertEscaneado: {},
      tipoEscaneado: 'GMMEP'                    
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
  acciones_mapper({ acciones, itemRow }){
    let clousure_pdf_fotografico = () => {
      if (this.tipoUsuario != 4 && this.tipoUsuario != 8) {
        setTimeout(()=>{ ServiceReportPDF.generar_pdf_fotografico_correctivo(itemRow.referenceNumber)},1000)
      }
    }    
    if(acciones.title == 'Bajar DTC Sin Firma'){      
      ServiceReportPDF.generar_pdf_correctivo(itemRow.referenceNumber, 1, false, itemRow.adminId)
      clousure_pdf_fotografico()
    }                
    if(acciones.title == 'Bajar DTC Firmado'){      
      ServiceReportPDF.generar_pdf_correctivo(itemRow.referenceNumber, 2, false, itemRow.adminId)
      clousure_pdf_fotografico()
    }
    if(acciones.title == 'Bajar DTC Sellado'){      
      ServiceReportPDF.generar_pdf_correctivo(itemRow.referenceNumber, 3, false)
      clousure_pdf_fotografico()
    }
    if(acciones.title == 'Terminar Diagnostico'){      
      this.$router.push({ path: '/Correctivo/PreDTC/Crear/DiagnosticoDeFalla',query: { referenceNumberFinishDiagnostic: itemRow.referenceNumber }})
    }
    if(acciones.title == 'Cambiar Estatus'){      
      this.modalCambiarStatus = true; this.dtcEdit = itemRow;
    }
    if(acciones.title == 'Actualizar Componentes'){      
      this.modalActualizar = true; this.infoAcrualizar = itemRow;        
    }
    if(acciones.title == 'Subir DTC Sellado'){      
      this.tipoEscaneado = 'GMMEP'
      this.modalSubirSellado = true
      this.objInsertEscaneado = {
          referenceNumber: itemRow.referenceNumber
      }
    }    
  },
  opticones_select_acciones(item){
    const options= [                
      { title: 'Bajar DTC Firmado', accionCss: 'terminar', img: '/img/download.ea0ec6db.png' }, //0
      { title: 'Terminar Diagnostico', accionCss: 'terminar', img: '/img/add.36624e63.png' },//1
      { title: 'Cambiar Estatus', accionCss: 'editar', img: '/img/flechas.a7d6bd28.png' },//2
      { title: 'Bajar DTC Sellado', accionCss: 'terminar', img: '/img/download.ea0ec6db.png' },//3
      { title: 'Subir DTC Sellado', accionCss: 'terminar', img: '/img/upload.8d26bb4f.png' },//4
      { title: 'Actualizar Componentes', accionCss: 'editar', img: '/img/actualizado.cafc2f1a.png' },//5
      { title: 'Bajar DTC Sin Firma',accionCss: 'terminar', img: '/img/download.ea0ec6db.png' },//6
    ]
    let filtroOpciones = []
    if(this.tipoUsuario == 8 || this.tipoUsuario == 4){
      filtroOpciones.push(options[6])
    }
    if (this.tipoUsuario != 4 && this.tipoUsuario != 8) {
      filtroOpciones.push(options[0])
    }
    if(item.statusId >= 3 && !item.escaneadobool){
      filtroOpciones.push(options[3])
    }
    if(this.tipoUsuario != 7 && this.tipoUsuario != 4 && item.escaneadobool){
      filtroOpciones.push(options[4])
    }
    if(item.technicalSheetReference == '--' && this.tipoUsuario == 1){
      filtroOpciones.push(options[1])   
    }
    if (this.tipoUsuario == 1 && !item.escaneadobool && item.statusId >= 3) {
      filtroOpciones.push(options[4])
    }
    if(this.tipoUsuario == 1){
      filtroOpciones.push(options[5])
    }
    if(this.tipoUsuario == 4 || this.tipoUsuario == 10){
      filtroOpciones.push(options[2])
    }
    
    return filtroOpciones
  },  
  limpiar_componete_escaneado: function(){
    this.modalSubirSellado = false
    this.loadingTabla = true                
    setTimeout(()=>{                             
      let indexRowUpdate = this.lista_DTC_Filtrada.findIndex(item => item.referenceNumber == this.objInsertEscaneado.referenceNumber)
      let rowUpdate = Object.assign(this.lista_DTC_Filtrada[indexRowUpdate])
      rowUpdate['confirmpdf'] = true; rowUpdate['escaneadobool'] = false;
      this.lista_DTC_Filtrada.splice(indexRowUpdate, 1, rowUpdate) 
      this.objInsertEscaneado = {}
      this.loadingTabla = false            
    },500)    
  },
  actualizar_componentes_dtc: function(){
    let clavePlaza = this.infoAcrualizar.referenceNumber.split('-')[0] 
    let userId = this.$store.state.Login.cookiesUser.userId
    this.modalActualizar = false; this.loadingTabla = true;
    this.$http.post(`${API}/Component/updateInventory/${clavePlaza}/${this.infoAcrualizar.referenceNumber}/${userId}`)
    .then(()=>{
      this.loadingTabla = false;
      this.$notify.success({
        title: "Ok!",
        class: "font-titulo",
        msg: `DTC CON REFERENCIA ${this.infoAcrualizar.referenceNumber} ACTUALIZADO CORRECTAMENTE.`,
        position: "bottom right",
        styles: { height: 100, width: 500 }});
    })    
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
  subirImg: async function (){
    this.subirImgModal = false
    let info = this.$store.getters['Login/GET_USEER_ID_PLAZA_ID']      
    await this.$store.dispatch('DTC/BUSCAR_LISTA_DTC', info)
    this.infoDTC =  this.$store.getters["DTC/GET_LISTA_DTC"](this.filtroVista);  
    this.lista_DTC_Filtrada = this.infoDTC
  },
  abrirCarrusel : async function ({ technicalSheetReference }){       
    let array = this.$store.state.DTC.listaInfoDTC
      .find(item => item.dtcView.technicalSheetReference == technicalSheetReference).pathImagesDF
      .map(imgData => {        
        return {
          "fileName": imgData, 
          "image": `${API}/DiagnosticoFalla/Images/${technicalSheetReference.split('-')[0]}/${technicalSheetReference}/${imgData}`
        }
      })        
    this.arrayImagenesCarrusel = { array_img: array, referenceNumber: technicalSheetReference };  
    this.carruselModal = true                                                                   
  },
  editar_status_dtc: function (){    
    this.modalCambiarStatus = false
    this.loadingTabla = true
    let user = this.$store.getters['Login/GET_USEER_ID_PLAZA_ID']    
    let objeActualizado = { "referenceNumber": this.dtcEdit.referenceNumber, "statusId": parseInt(this.statusEdit), "userId": user.idUser, "comment": this.motivoCambio }        
    if(this.statusEdit != '' && this.motivoCambio != ''){         
      this.$http.post(`${API}/Pdf/ActualizarDtcAdministratores/${this.dtcEdit.referenceNumber.split('-')[0]}`, objeActualizado)
      .then(() => {                          
        let indexRowUpdate = this.lista_DTC_Filtrada.findIndex(item => item.referenceNumber == this.dtcEdit.referenceNumber)
        this.lista_DTC_Filtrada.splice(indexRowUpdate, 1)
        this.infoDTC = this.lista_DTC_Filtrada              
        this.statusEdit = ''; this.motivoCambio = '';  this.dtcEdit = '';
        this.loadingTabla = false
      }) 
    }
    else {
      this.$notify.warning({
        title: "Ups!",
        msg: `NO SE HA LLENADO LOS CAMPOS.`,
        position: "bottom right",
        styles: { height: 100, width: 500 },
      });
      this.loadingTabla = false
      this.lista_DTC_Filtrada = this.infoDtc
    }
  },  
  filtro_dtc: async function (objFiltro) {     
    if( objFiltro.plazaFiltro != '' || objFiltro.fechaFiltro != '' || objFiltro.referenciaFiltro != ''){      
      this.lista_DTC_Filtrada = []
      this.loadingTabla = true    
      setTimeout(async () => {
        let listaFiltrada = await ServiceFiltrosDTC.filtrarDTC(this.filtroVista, objFiltro.plazaFiltro, objFiltro.fechaFiltro, objFiltro.referenciaFiltro, undefined, false, undefined)    
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
        styles: { height: 100, width: 500 },
      });
    }
  },
  limpiar_filtros: function() {             
    this.modalLoading = true                            
    this.$nextTick().then(() => {             
      this.lista_DTC_Filtrada = this.infoDTC
    })           
  },
  }
};
</script>

<style>
.modal-container{
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.5);
}
</style>