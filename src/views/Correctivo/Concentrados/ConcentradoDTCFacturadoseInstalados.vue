<template>
    <div class="container mx-auto">
        <!--///////////////////////////////////////////////////////////////////
        ////                          TITULO                            ////
        ////////////////////////////////////////////////////////////////////-->
        <HeaderGenerico 
          @limpiar-filtros="limpiar_filtros" 
          @filtrar-dtc="filtro_dtc" 
          @buscar-facturado="guardar_palabra_busqueda" 
          :titulo="'Concentrado DTC Facturados e Instalados'" 
          :tipo="'CDTCF'" 
        />
        <div class="rounded-lg shadow-xl sm:mt-3 xl:overflow-auto xl:h-75 mb-20">
          <table class="w-full rounded-lg mt-4">
          <thead class="">
            <tr>
              <th class="p-3 text-sm sm:text-xs sm:w-8 text-white font-semibold tracking-wide cabeceraTable  rounded-l-lg">Referencia</th>
              <th class="p-3 text-sm sm:text-xs text-white font-semibold tracking-wide cabeceraTable sm:hidden">Usuario</th>
              <th class="p-3 text-sm sm:text-xs sm:w-8 text-white font-semibold tracking-wide  cabeceraTable">Tipo de Falla</th>
              <th class="p-3 text-sm sm:text-xs sm:w-8 text-white font-semibold tracking-wide  cabeceraTable rounded-r-lg">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="dtc in lista_DTC_Filtrada" :key="dtc.referenceNumber" :class="{'hidden': dtc.typeFaultId == 0}">
              <td class="p-3 sm:w-8 text-sm text-gray-700 text-center sm:text-xs">{{dtc.referenceNumber}}</td>
              <td class="p-3 text-sm text-gray-700 text-center sm:text-xs sm:hidden">{{dtc.userName}}</td>
              <td class="p-3 sm:w-8 text-sm text-gray-700 text-center sm:text-xs">{{dtc.faultDescription}}</td>
              <td class="P-3 sm:w-8 w-50 text-center">
                  <multiselect
                  v-model="selectMulti" 
                  @close="acciones_mapper(dtc)" 
                  placeholder="Seleccione una Accion" 
                  label="title" track-by="title" 
                  class="multi sm:w-32 sm:h-auto sm:ml-4" 
                  :options="opticones_select_acciones(dtc)" 
                  :option-height="200" 
                  :custom-label="customLabel"  
                  :show-labels="false">
                    <template slot="option" slot-scope="props">                                                
                      <div class="option__desc">
                      <span class="option__title inline-flex sm:text-xs">
                      <img :src="props.option.img" class="mr-5 sm:w-4 sm:mr-1" width="15" height="15">    
                      {{ props.option.title }}</span>
                      </div>
                    </template>
                  </multiselect>
                </td>
            </tr>
          </tbody>
        </table>
        </div>   
        <!--//////////////////////////////////////////////////////////////////
        ////                         MODAL ANEXOS GENERADOS            ////
        //////////////////////////////////////////////////////////////////-->
        <div class="sticky inset-0 font-titulo " :class="{'modal-container': showModal}">
                <div v-if="showModal" class="rounded-lg p-2 grid grid-cols-1 content-center h-full">
                    <div class="container mx-auto rounded-lg border bg-white border-gray-400 px-4 py-10">
                      <div class="flex flex-col">
                        <div class="flex flex-row-reverse">
                          <button @click="botoncancelar_modal()" class="p-4 mr-10"><img src="../../../assets/img/cerrarmodal.png" alt="cerrarmodal" width="20" height="25"></button>
                        </div>
                        <div>
                          <h1 class="text-center text-4xl font-bold sm:text-2xl">Anexos Generados</h1>
                        </div>
                      </div>
                        <div class="flex justify-center w-full sm:overflow-auto sm:h-60 md:overflow-auto md:h-60 lg:overflow-auto lg:h-60 xl:overflow-auto xl:h-70">
                            <table class="tablaf mt-6">
                                <thead>
                                    <tr class="text-sm text-center text-white trTable sm:text-xs">
                                        <th class="w-24 md:w-34 lg:w-49 xl:w-54 cabeceraTable font-medium sticky top-0 rounded-l-lg">Referencia</th>
                                        <th class="w-24 md:w-34 lg:w-49 xl:w-54 cabeceraTable font-medium sm:hidden sticky top-0">Usuario</th>
                                        <th class="w-24 md:w-34 lg:w-49 xl:w-54 cabeceraTable font-medium sticky top-0 rounded-r-lg">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="anxg in listaanexosgenerados" :key="anxg.anexoReference">
                                      <td class="p-2 text-center text-xs">{{anxg.anexoReference}}</td>
                                      <td class="p-2 text-center text-xs sm:hidden">{{anxg.userName}}</td>
                                      <td>
                                        <multiselect v-model="selectMultiModal" 
                                          @close="acciones_mapper_modal(anxg)" 
                                          placeholder="Seleccione una Accion"
                                          label="title"
                                          track-by="title"
                                          class="multi sm:w-32 sm:h-auto sm:ml-4"
                                          :options="opticones_select_acciones_modal()"
                                          :option-height="50" 
                                          :custom-label="customLabel" 
                                          :show-labels="false">
                                        <template slot="option" slot-scope="props">                                                
                                            <div class="option__desc">
                                            <span class="option__title inline-flex sm:text-xs">
                                            <img :src="props.option.img" class="mr-5 sm:w-4 sm:mr-1" width="15" height="15">    
                                            {{ props.option.title }}</span>
                                            </div>
                                          </template>
                                        </multiselect>
                                        </td>
                                      </tr>
                                </tbody>
                            </table>
                        </div>  
                    </div>
                </div>
        </div>
        <!--////////////////////////////////////////////////////////////////////
        ////                      MODAL CAMBIAR STATUS                   //////
        ////////////////////////////////////////////////////////////////////-->
        <div class="sticky inset-0" :class="{'modal-container': modalCambiarStatus}">
          <div v-if="modalCambiarStatus" class="rounded-lg justify-center absolute inset-x-0 md:w-69 lg:w-69 xl:w-69 mx-auto px-12 py-1 sm:p-2 mt-48 sm:-mt-32">
            <div class="rounded-lg border bg-white border-gray-700 px-12 py-10 shadow-2xl">
              <p class="text-gray-900 font-thin text-md">Seguro que quieres cambiar el estatus de la referencia <b class="font-bold">{{dtcCambiarestatus.referenceNumber}}</b></p>
              <div>
                <div class="mt-5">
                  <p class="mb-1 sm:text-sm">Estatus DTC</p>
                  <select v-model="statusEdit" class="w-full is_valid" type="text">
                    <option value="">Selecionar...</option>     
                    <option value="1">Inconcluso</option>  
                    <option value="2">Concluido</option>                                                                  
                    <option value="3">Sellado</option>                                                                                                                               
                    <option value="4">GMMEP</option>  
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
                <button @click="modalCambiarStatus = false" class="botonIconCancelar m-4">Cancelar</button>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script>

import HeaderGenerico from "../../../components/Header/HeaderGenerico";
import Multiselect from "vue-multiselect";
import ServiceFiltrosDTC from "../../../services/FiltrosDTCServices"
import ServiceReportPDF from "../../../services/ReportesPDFService";
const API = process.env.VUE_APP_URL_API_PRODUCCION

export default {
    name: "DTCFacturados",
    components:{
        HeaderGenerico,
        Multiselect
    },
    /////////////////////////////////////////////////////////////////////
    ////                      DATA                                   ////
    /////////////////////////////////////////////////////////////////////
    data: function (){
    return {      
        loadingTabla: false,
        lista_DTC_Filtrada: [],
        showModal: false,
        modalCambiarStatus: false,     
        selectMulti:'', 
        selectMultiModal:'',
        infoDTC: [],
        lista_dtc: [],       
        plazasValidas: [],
        dtcCambiarestatus:{},
        statusEdit: "",
        motivoCambio:"",
        limite:300,
        listaanexosgenerados:{},             
        }
    },
    /////////////////////////////////////////////////////////////////////
    ////                       CICLOS DE VIDA                        ////
    /////////////////////////////////////////////////////////////////////
    beforeMount: function () {
      this.filtroVista = undefined
      this.tipoUsuario = this.$store.state.Login.cookiesUser.rollId
      this.infoDTC =  this.$store.getters["DTC/GET_LISTA_DTC"](this.filtroVista);  
      this.lista_DTC_Filtrada = this.infoDTC
      console.log(this.lista_DTC_Filtrada)
    },
    /////////////////////////////////////////////////////////////////////
    ////                           METODOS                           ////
    /////////////////////////////////////////////////////////////////////
    methods:{
    acciones_mapper(dtc){     
      console.log(this.selectMulti.title);
      console.log(dtc)          
      if(this.selectMulti.title == 'Anexos Generados'){
        this.showModal = true;
        this.selectMulti = '';
        this.Anexosgenerados(dtc);
      }
      else if(this.selectMulti.title == 'Generar Anexo'){
        if (dtc.typeFaultId === 2) {
          this.$router.push(`/Anexo1A/${dtc.referenceSquare}/${dtc.squareCatalogId}/${dtc.referenceNumber}`);
          this.selectMulti = '';
        } else if (dtc.typeFaultId === 3){
          this.$router.push(`/Anexo1B/${dtc.referenceSquare}/${dtc.squareCatalogId}/${dtc.referenceNumber}`);
          this.selectMulti = '';
        }
      } 
      else if(this.selectMulti.title == 'Cambiar Estatus'){
        this.modalCambiarStatus = true;
        this.dtcCambiarestatus = dtc;
        console.log(this.dtcCambiarestatus);
        this.selectMulti = '';
        console.log(this.modalCambiarStatus);
      } 
    },
    customLabel ({ title }) {
      return `${title}`
    },
    opticones_select_acciones(dtc){
            const options= [                
            { title: 'Anexos Generados', accionCss: 'terminar', img: '/img/list.03b04500.png' }, //0
            { title: 'Generar Anexo', accionCss: 'terminar', img: '/img/slide.44400136.png' },//1
            { title: 'Cambiar Estatus', accionCss: 'editar', img: '/img/flechas.a7d6bd28.png' },//2
            ]
            let filtroOpciones = []
            if(dtc.isAnexoCreate == true){
            filtroOpciones.push(options[0])
            }
            filtroOpciones.push(options[1])
            filtroOpciones.push(options[2])

            return filtroOpciones
    },
    botoncancelar_modal: function (){ 
    this.selectMulti = "";
    this.showModal = false; 
    document.body.classList.remove("modal-open");
    },
    opticones_select_acciones_modal(){
            const options= [                
            { title: 'Editar', accionCss: 'editar', img: '/img/pencil.04ec78bc.png' }, //0
            { title: 'Descargar Anexo', accionCss: 'terminar', img: '/img/download.ea0ec6db.png' },
            ]
            let filtroOpciones = []
            filtroOpciones.push(options[0])
            filtroOpciones.push(options[1])

            return filtroOpciones
    },
    acciones_mapper_modal(anxg){
      console.log(this.selectMultiModal.title);
      console.log(anxg);
      if(this.selectMultiModal.title == 'Editar'){
        if (anxg.tipoAnexo === "A") {
          this.$router.push(`/EditarAnexo1A/${anxg.anexoReference}/${anxg.dtcReference}`);
          this.selectMultiModal = '';
        } else if (anxg.tipoAnexo === "B"){
          this.$router.push(`/EditarAnexo1B/${anxg.anexoReference}/${anxg.dtcReference}`);
          this.selectMultiModal = '';
        }
      }else if(this.selectMultiModal.title == 'Descargar Anexo'){
        let subversion = true;
         if (anxg.tipoAnexo === "A") {
           ServiceReportPDF.generar_pdf_anexoA(anxg.dtcReference,anxg.anexoReference,subversion);
        } else if (anxg.tipoAnexo === "B"){
           ServiceReportPDF.generar_pdf_anexoB(anxg.dtcReference,anxg.anexoReference,subversion);
        }
      }
    },
    guardar_palabra_busqueda: function(newPalabra){
    if (newPalabra != "") {   
      this.lista_DTC_Filtrada = [] 
      console.log(newPalabra);  
      setTimeout(async () => {
        let array_filtrado = this.infoDTC.filter(item => {
          return item.referenceNumber.toUpperCase().includes(newPalabra.toUpperCase())
        })       
        this.lista_DTC_Filtrada = array_filtrado;
      },1000)
    }
    else{
      this.lista_DTC_Filtrada = this.infoDTC
    }
  }, 
  filtro_dtc: async function (objFiltro) {     
    if( objFiltro.plazaFiltro != '' || objFiltro.referenciaFiltro != ''){      
      this.lista_DTC_Filtrada = []   
      setTimeout(async () => {
        let listaFiltrada = await ServiceFiltrosDTC.filtrarDTC(this.filtroVista, objFiltro.plazaFiltro, '' , objFiltro.referenciaFiltro, undefined, false, undefined)    
        this.$nextTick().then(() => {      
            this.lista_DTC_Filtrada = listaFiltrada            
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
    this.$nextTick().then(() => {             
      this.lista_DTC_Filtrada = this.infoDTC
    })           
  },
  editar_status_dtc: function (){    
    this.modalCambiarStatus = false
    let user = this.$store.getters['Login/GET_USEER_ID_PLAZA_ID']    
    let objeActualizado = { "referenceNumber": this.dtcCambiarestatus.referenceNumber, "statusId": parseInt(this.statusEdit), "userId": user.idUser, "comment": this.motivoCambio }        
    if(this.statusEdit != '' && this.motivoCambio != ''){         
      this.$http.post(`${API}/Pdf/ActualizarDtcAdministratores/${this.dtcCambiarestatus.referenceNumber.split('-')[0]}`, objeActualizado)
      .then(() => {                          
        let indexRowUpdate = this.lista_DTC_Filtrada.findIndex(item => item.referenceNumber == this.dtcCambiarestatus.referenceNumber)
        this.lista_DTC_Filtrada.splice(indexRowUpdate, 1)
        this.infoDTC = this.lista_DTC_Filtrada              
        this.statusEdit = ''; this.motivoCambio = '';  this.dtcCambiarestatus = '';
      }) 
    }
    else {
      this.$notify.warning({
        title: "Ups!",
        msg: `NO SE HA LLENADO LOS CAMPOS.`,
        position: "bottom right",
        styles: { height: 100, width: 500 },
      });
      this.lista_DTC_Filtrada = this.infoDtc
    }
  },
  async Anexosgenerados(dtc){
      try {
        const data = await fetch(`${API}/AnexoDTC/Historico/${dtc.referenceSquare}/${dtc.referenceNumber}`)
        const objeto = await data.json()
        this.listaanexosgenerados = objeto.result;
        console.log(this.listaanexosgenerados);
      } catch (error) {
        console.log(error);
      }
  }
  },
  /////////////////////////////////////////////////////////////////////
  ////                       COMPUTADOS                            ////
  /////////////////////////////////////////////////////////////////////
  computed:{
      restante(){
          return  this.motivoCambio.length
      }
  },
}
</script>

<style scoped>
.modal-container{
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.5);
}
</style>