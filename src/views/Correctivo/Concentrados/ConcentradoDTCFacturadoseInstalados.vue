<template>
    <div class="container mx-auto">
        <!--///////////////////////////////////////////////////////////////////
        ////                          TITULO                            ////
        ////////////////////////////////////////////////////////////////////-->
        <HeaderGenerico
          @filtro_Actas="filtro_Actas" 
          @filtrar-todos-Actas="todos"
          :titulo="'Actas de Entrega y Recepción'" 
          :tipo="'CDTCF'" 
        />
        <div class="rounded-lg shadow-xl sm:mt-3 xl:overflow-auto mb-20" style="height:506px;">
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
            <template v-if="lista_DTC_Filtrada.length == 0 && !loadingTabla "> 
              <tr>
                <td class="w-full text-center text-red-500 m-10" colspan="6">                                    
                  <div class="mt-8 mb-8">Sin Informacion</div>
                </td>
              </tr>  
            </template>
            <template v-else-if="loadingTabla && lista_DTC_Filtrada.length == 0">  
                    <tr>
                        <td colspan="9">                                    
                            <div style="border-top-color:transparent" class="mt-8 mb-8 border-solid animate-spin rounded-full border-blue-400 border-2 h-10 w-10 mx-auto"></div>
                        </td>                          
                    </tr>  
            </template>  
            <template v-if="lista_DTC_Filtrada.length > 0">
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
                       <font-awesome-icon :icon="props.option.img" class="text-blue-800 w-4 h-4 mr-2"/>      
                      {{ props.option.title }}</span>
                      </div>
                    </template>
                  </multiselect>
                </td>
            </tr>
            </template>
          </tbody>
          </table>
        </div>  
        <Pagination
          :total-pages="totalPages" 
          :total="total" :per-page="perPage" 
          :current-page="currentPage"
          :has-more-pages="hasMorePages" 
          @pagechanged="showMore"
        ></Pagination> 
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
                                        <th class="w-24 md:w-34 lg:w-49 xl:w-54 cabeceraTable font-medium sm:hidden sticky top-0">Estatus</th>
                                        <th class="w-24 md:w-34 lg:w-49 xl:w-54 cabeceraTable font-medium sticky top-0 rounded-r-lg">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="anxg in listaanexosgenerados" :key="anxg.anexoReference">
                                      <td class="p-2 text-center text-sm">{{anxg.anexoReference}}</td>
                                      <td class="p-2 text-center text-sm sm:hidden">{{anxg.userName}}</td>
                                      <td class="p-2 text-center text-sm sm:hidden">
                                        <div v-if="anxg.statusId == 5" class="w-full mx-auto flex justify-center">
                                          <span class="text-white text-sm bg-blue-500 border border-blue-500 rounded-xl p-1 uppercase font-medium">Edición</span>
                                        </div>
                                        <div v-else-if="anxg.statusId == 6" class="w-full mx-auto flex justify-center">
                                          <span class="text-white text-sm bg-yellow-500 border border-yellow-500 rounded-xl p-1 uppercase font-medium">Revisión</span>
                                        </div>
                                        <div v-else-if="anxg.statusId == 7" class="w-full mx-auto flex justify-center">
                                          <span class="text-white text-sm bg-green-500 border border-green-500 rounded-xl p-1 uppercase font-medium">Facturación</span>
                                        </div>
                                      </td>
                                      <td>
                                          <multiselect v-model="selectMultiModal" 
                                          @close="acciones_mapper_modal(anxg)" 
                                          placeholder="Seleccione una Accion"
                                          label="title"
                                          track-by="title"
                                          class="multi sm:w-32 sm:h-auto sm:ml-4"
                                          :options="opticones_select_acciones_modal(anxg)"
                                          :option-height="50" 
                                          :custom-label="customLabel" 
                                          :show-labels="false">
                                        <template slot="option" slot-scope="props">                                                
                                            <div class="option__desc">
                                            <span class="option__title inline-flex sm:text-xs">
                                            <font-awesome-icon :icon="props.option.img" class="text-blue-800 w-4 h-4 mr-2"/>     
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
        ////                      MODAL CAMBIAR STATUS DTC               //////
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
         <!--////////////////////////////////////////////////////////////////////
        ////                      MODAL CAMBIAR STATUS ANEXO               //////
        ////////////////////////////////////////////////////////////////////-->
        <div class="sticky inset-0" :class="{'modal-container': modalCambiarStatusAnexo}">
          <div v-if="modalCambiarStatusAnexo" class="rounded-lg justify-center absolute inset-x-0 md:w-69 lg:w-69 xl:w-69 mx-auto px-12 py-1 sm:p-2 mt-48 sm:-mt-32">
            <div class="rounded-lg border bg-white border-gray-700 px-12 py-10 shadow-2xl">
              <p class="text-gray-900 font-thin text-xl">{{textomodalanexo}} <b class="font-bold">{{anexocambiarestatus.anexoReference}}</b></p>
              <div>
                <!-- <div class="mt-5">
                  <p class="mb-1 sm:text-sm">Estatus Anexo</p>
                  <select v-model="statusEditAnexo" class="w-full is_valid" type="text">
                    <option value="">Selecionar...</option>     
                    <option value="5">Gerencia</option>  
                    <option value="7">Facturacion</option>                                                                  
                  </select> 
                </div> -->
                <div class="mt-5" v-if="correccion">
                  <p class="mb-1 sm:text-sm">Motivo</p>
                  <textarea v-model="motivoCambioAnexo" class="appearance-none block bg-grey-lighter container mx-auto text-grey-darker is_valid border-black rounded-lg py-4 mb-0 h-24 placeholder-gray-500 border" placeholder="Motivo del Cambio" v-bind:maxlength="limite"/>
                  <span class="text-gray-500">{{ restante }}/300</span>
                </div>
              </div>
              <div class="justify-center flex mt-5">
                <button @click="editar_status_anexo" class="botonIconCrear m-4">Confirmar</button>
                <button @click="cerrar_modal_anexo" class="botonIconCancelar m-4">Cancelar</button>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script>

import HeaderGenerico from "../../../components/Header/HeaderGenerico";
import Multiselect from "vue-multiselect";
import ServiceFiltrosDTC from "../../../services/FiltrosDTCServices";
import ServiceReportPDF from "../../../services/ReportesPDFService";
import Pagination from '../../../components/Pagination.vue';
const API = process.env.VUE_APP_URL_API_PRODUCCION

export default {
    name: "DTCFacturados",
    components:{
        HeaderGenerico,
        Multiselect,
        Pagination,
    },
    /////////////////////////////////////////////////////////////////////
    ////                      DATA                                   ////
    /////////////////////////////////////////////////////////////////////
    data: function (){
    return {      
        loadingTabla: true,
        lista_DTC_Filtrada: [],
        showModal: false,
        modalCambiarStatus: false, 
        modalCambiarStatusAnexo: false,    
        selectMulti:'', 
        selectMultiModal:'',
        infoDTC: [],
        lista_dtc: [],       
        plazasValidas: [],
        dtcCambiarestatus:{},
        anexocambiarestatus:{},
        statusEdit: "",
        motivoCambio:"",
        limite:300,
        listaanexosgenerados:{},
        //Data de la paginacion 
        page: 1,//pagina en la que quieres iniciar la vista
        totalPages: 0,//total de paginas
        total: 10,//numero de resultados a mostrar
        perPage: 10,//no se ocupa
        currentPage: 1,//pagina actual
        hasMorePages: true,// tener más paginas
        fechaFiltro: '',
        buscarActa:'',
        plazaFiltro:'',
        estatus:'',
        plazaidsquare: {},   
        tipoUsuario: 0,
        statusEditAnexo:'',
        motivoCambioAnexo:'',
        textomodalanexo:'',
        correccion: false,
        dtcanexo: {},
        usuario: '',
        tipofalla: '',      
        }
    },
    /////////////////////////////////////////////////////////////////////
    ////                       CICLOS DE VIDA                        ////
    /////////////////////////////////////////////////////////////////////
    beforeMount: function () {
      this.tipoUsuario = this.$store.state.Login.cookiesUser.rollId
      let userId = this.$store.state.Login.cookiesUser.userId
      let clavePlaza = this.$store.state.Login.plazaSelecionada.refereciaPlaza
      let infousuario = this.$store.state.Login.cookiesUser
      this.$http.get(`${API}/dtcData/GMMEP/${clavePlaza}/${this.page}/${this.total}/${userId}/null/null/null/null/5/null`)
      .then((response) => {
          let prueba = response.data.result.rows
          prueba.forEach(element => this.infoDTC.push(element.dtcView));
          if(this.tipoUsuario == 4 || this.tipoUsuario == 10 || this.tipoUsuario == 7){
              this.lista_DTC_Filtrada = this.infoDTC
          }else {
              let dtcfiltradoporusuario = this.infoDTC.filter(dtc =>{
              if(dtc.userId == infousuario.userId){
              return dtc
            }
          })
            this.lista_DTC_Filtrada = dtcfiltradoporusuario;  
          }
          this.totalPages = response.data.result.numeroPaginas
          this.currentPage = response.data.result.paginaActual
          this.loadingTable = false
      }) 
      .catch((error) =>{ 
        console.log(error.response);
        if(error.response.status == 404){
          this.loadingTable = false
          this.infoDTC = []
          this.lista_DTC_Filtrada = [] 
        }
      }) 
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
            this.dtcanexo = dtc;
            this.Anexosgenerados(this.dtcanexo);
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
                { title: 'Anexos Generados', accionCss: 'terminar', img: 'fa-solid fa-window-restore' }, //0
                { title: 'Generar Anexo', accionCss: 'terminar', img: 'fa-solid fa-file-circle-plus' },//1
                { title: 'Cambiar Estatus', accionCss: 'editar', img: 'fa-solid fa-arrow-right-arrow-left' },//2
                ]
                let filtroOpciones = []
                if(this.tipoUsuario == 1 || this.tipoUsuario == 4){
                  if(dtc.isAnexoCreate == true){
                    filtroOpciones.push(options[0])
                  }
                  if(dtc.isValidCreate == true && this.tipoUsuario == 1){
                    filtroOpciones.push(options[1])
                  }
                }
                if(this.tipoUsuario == 4){
                  filtroOpciones.push(options[2])
                }

                return filtroOpciones
      },
      botoncancelar_modal: function (){ 
        this.selectMulti = "";
        this.showModal = false; 
        document.body.classList.remove("modal-open");
      },
      opticones_select_acciones_modal(anxg){
                const options= [                
                { title: 'Editar', accionCss: 'editar', img: 'fa-solid fa-file-pen' }, //0
                { title: 'Descargar Anexo', accionCss: 'terminar', img: 'fa-solid fa-download' },
                { title: 'Validar', accionCss: 'editar', img: 'fa-solid fa-file-circle-check' },
                { title: 'Corregir', accionCss: 'editar', img: 'fa-solid fa-file-pen' },
                ]
                console.log(anxg.statusId)
                let filtroOpciones = []
                if(anxg.statusId == 5 && (this.tipoUsuario == 1 || this.tipoUsuario == 2 ||  this.tipoUsuario == 3 ||  this.tipoUsuario ==  5)){
                  filtroOpciones.push(options[0])
                }
                if(anxg.statusId == 6 || anxg.statusId == 7){
                  filtroOpciones.push(options[1])
                }
                if(anxg.statusId == 6 && (this.tipoUsuario == 4 || this.tipoUsuario == 8)){
                  filtroOpciones.push(options[2])
                  filtroOpciones.push(options[3])
                }
                if(anxg.statusId == 7 && (this.tipoUsuario == 4 || this.tipoUsuario == 8)){
                  filtroOpciones.push(options[3])
                }
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
            let subversion = false;
            if (anxg.tipoAnexo === "A") {
              ServiceReportPDF.generar_pdf_anexoA(anxg.dtcReference,anxg.anexoReference,subversion);
              ServiceReportPDF.reporte_fotografico_anexo(anxg.dtcReference,anxg.anexoReference);
              this.selectMultiModal = '';
            } else if (anxg.tipoAnexo === "B"){
              ServiceReportPDF.generar_pdf_anexoB(anxg.dtcReference,anxg.anexoReference,subversion);
              ServiceReportPDF.reporte_fotografico_anexo(anxg.dtcReference,anxg.anexoReference);
              this.selectMultiModal = '';
            }
          }else if(this.selectMultiModal.title == 'Validar'){
            this.textomodalanexo = ''
            this.statusEditAnexo = ''
            this.modalCambiarStatusAnexo = true;
            this.anexocambiarestatus = anxg;
            this.textomodalanexo = 'Seguro que desea validar el anexo con referencia'
            this.statusEditAnexo = '7'
            this.selectMultiModal = '';
          }else if(this.selectMultiModal.title == 'Corregir'){
            this.textomodalanexo = ''
            this.statusEditAnexo = ''
            this.modalCambiarStatusAnexo = true;
            this.anexocambiarestatus = anxg;
            this.textomodalanexo = 'Seguro que desea regresar a corrección con referencia'
            this.statusEditAnexo = '5'
            this.correccion = true
            this.selectMultiModal = '';
          }
      },
      cerrar_modal_anexo(){
        this.modalCambiarStatusAnexo = false
        this.textomodalanexo = ''
        this.statusEditAnexo = ''
        this.anexocambiarestatus = {}
        this.correccion = false
      },
      editar_status_anexo(){
        this.modalCambiarStatusAnexo = false   
        let objeActualizado = {
          "userId":this.anexocambiarestatus.userId,
          "anexoReference": this.anexocambiarestatus.anexoReference,
          "statusId": this.statusEditAnexo,
          "comentario": this.motivoCambioAnexo,
        }    
        console.log(objeActualizado)
        if(this.statusEditAnexo != ''){         
          this.$http.post(`${API}/AnexoDTC/CambiarStatus/${this.anexocambiarestatus.anexoReference.split('-')[0]}`, objeActualizado)
          .then(() => {                                        
            this.statusEditAnexo = '' ; 
            this.motivoCambioAnexo = '' ;  
            this.anexocambiarestatus = {} ;
            this.correccion = false ;
            this.Anexosgenerados(this.dtcanexo) ;
          }) 
        }
        else {
          this.$notify.warning({
            title: "Ups!",
            msg: `OCURRIO ALGUN ERROR, NO SE REALIZARON LOS CAMBIOS.`,
            position: "bottom right",
            styles: { height: 100, width: 500 },
          });
          this.lista_DTC_Filtrada = this.infoDtc
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
            this.tipoUsuario = this.$store.state.Login.cookiesUser.rollId
            console.log(this.listaanexosgenerados);
          } catch (error) {
            console.log(error);
          }
      },
      filtro_Actas(plaza,referencia,usuario,tipofalla){
        this.lista_DTC_Filtrada = []
        this.plazaFiltro = plaza;
        this.buscarActa = referencia;
        console.log(this.buscarActa);
        this.usuario = usuario;
        this.tipofalla = tipofalla;
        let userId = this.$store.state.Login.cookiesUser.userId
        let clavePlaza = this.$store.state.Login.plazaSelecionada.refereciaPlaza
        let plazas = this.$store.state.Login.listaPlazas
        //let infousuario = this.$store.state.Login.cookiesUser
        if(this.plazaFiltro != ''){
          this.plazaidsquare = plazas.find(e => e.squareCatalogId == this.plazaFiltro)
        }
        //Filtros por 1 valor
        if(this.plazaFiltro != '' && this.buscarActa == '' && this.usuario == '' && this.tipofalla == ''){
          this.$http.get(`${API}/dtcData/GMMEP/${clavePlaza}/${this.page}/${this.total}/${userId}/null/null/${this.plazaidsquare.squareCatalogId}/null/5/null`)
          .then((response) => {
          let prueba = response.data.result.rows
          prueba.forEach(element => this.lista_DTC_Filtrada.push(element.dtcView));
          // if(this.tipoUsuario == 1 || this.tipoUsuario == 3){
          //   let dtcfiltradoporusuario = this.lista_DTC_Filtrada.filter(dtc =>{
          //     if(dtc.userId == infousuario.userId){
          //     return dtc
          //   }
          //   })
          //   this.lista_DTC_Filtrada =  dtcfiltradoporusuario
          // }
          
          this.totalPages = response.data.result.numeroPaginas
          this.currentPage = response.data.result.paginaActual
          this.loadingTable = false
          })
          .catch((error) =>{ 
          if(error.response.status == 404){
            this.lista_DTC_Filtrada = []
            this.loadingTable = false
          }
          })
        }
        else if(this.plazaFiltro == '' && this.buscarActa != '' && this.usuario == '' && this.tipofalla == ''){
          this.$http.get(`${API}/dtcData/GMMEP/${clavePlaza}/${this.page}/${this.total}/${userId}/null/null/null/${this.buscarActa}/5/null`)
          .then((response) => {
          let prueba = response.data.result.rows
          prueba.forEach(element => this.lista_DTC_Filtrada.push(element.dtcView));
          this.totalPages = response.data.result.numeroPaginas
          this.currentPage = response.data.result.paginaActual
          this.loadingTable = false
          })
          .catch((error) =>{ 
          if(error.response.status == 404){
            this.lista_DTC_Filtrada = []
            this.loadingTable = false
          }
          })
        }
        else if(this.plazaFiltro == '' && this.buscarActa == '' && this.usuario != '' && this.tipofalla == ''){
          this.$http.get(`${API}/dtcData/GMMEP/${clavePlaza}/${this.page}/${this.total}/${userId}/${this.usuario}/null/null/null/5/null`)
          .then((response) => {
          let prueba = response.data.result.rows
          prueba.forEach(element => this.lista_DTC_Filtrada.push(element.dtcView));
          this.totalPages = response.data.result.numeroPaginas
          this.currentPage = response.data.result.paginaActual
          this.loadingTable = false
          })
          .catch((error) =>{ 
          if(error.response.status == 404){
            this.lista_DTC_Filtrada = []
            this.loadingTable = false
          }
          })
        }
        else if(this.plazaFiltro == '' && this.buscarActa == '' && this.usuario == '' && this.tipofalla != ''){
          this.$http.get(`${API}/dtcData/GMMEP/${clavePlaza}/${this.page}/${this.total}/${userId}/null/${this.tipofalla}/null/null/5/null`)
          .then((response) => {
          let prueba = response.data.result.rows
          prueba.forEach(element => this.lista_DTC_Filtrada.push(element.dtcView));
          this.totalPages = response.data.result.numeroPaginas
          this.currentPage = response.data.result.paginaActual
          this.loadingTable = false
          })
          .catch((error) =>{ 
          if(error.response.status == 404){
            this.lista_DTC_Filtrada = []
            this.loadingTable = false
          }
          })
        }
        //Filtros por 2 valores
        else if(this.plazaFiltro != '' && this.buscarActa != '' && this.usuario == '' && this.tipofalla == ''){
          this.$http.get(`${API}/dtcData/GMMEP/${clavePlaza}/${this.page}/${this.total}/${userId}/null/null/${this.plazaidsquare.squareCatalogId}/${this.buscarActa}/5/null`)
          .then((response) => {
          let prueba = response.data.result.rows
          prueba.forEach(element => this.lista_DTC_Filtrada.push(element.dtcView));
          this.totalPages = response.data.result.numeroPaginas
          this.currentPage = response.data.result.paginaActual
          this.loadingTable = false
          })
          .catch((error) =>{ 
          if(error.response.status == 404){
            this.lista_DTC_Filtrada = []
            this.loadingTable = false
          }
          })
        }
        else if(this.plazaFiltro != '' && this.buscarActa == '' && this.usuario != '' && this.tipofalla == ''){
          this.$http.get(`${API}/dtcData/GMMEP/${clavePlaza}/${this.page}/${this.total}/${userId}/${this.usuario}/null/${this.plazaidsquare.squareCatalogId}/null/5/null`)
          .then((response) => {
          let prueba = response.data.result.rows
          prueba.forEach(element => this.lista_DTC_Filtrada.push(element.dtcView));
          this.totalPages = response.data.result.numeroPaginas
          this.currentPage = response.data.result.paginaActual
          this.loadingTable = false
          })
          .catch((error) =>{ 
          if(error.response.status == 404){
            this.lista_DTC_Filtrada = []
            this.loadingTable = false
          }
          })
        }
        else if(this.plazaFiltro != '' && this.buscarActa == '' && this.usuario == '' && this.tipofalla != ''){
          this.$http.get(`${API}/dtcData/GMMEP/${clavePlaza}/${this.page}/${this.total}/${userId}/null/${this.tipofalla}/${this.plazaidsquare.squareCatalogId}/null/5/null`)
          .then((response) => {
          let prueba = response.data.result.rows
          prueba.forEach(element => this.lista_DTC_Filtrada.push(element.dtcView));
          this.totalPages = response.data.result.numeroPaginas
          this.currentPage = response.data.result.paginaActual
          this.loadingTable = false
          })
          .catch((error) =>{ 
          if(error.response.status == 404){
            this.lista_DTC_Filtrada = []
            this.loadingTable = false
          }
          })
        }
        else if(this.plazaFiltro == '' && this.buscarActa != '' && this.usuario != '' && this.tipofalla == ''){
          this.$http.get(`${API}/dtcData/GMMEP/${clavePlaza}/${this.page}/${this.total}/${userId}/${this.usuario}/null/null/${this.buscarActa}/5/null`)
          .then((response) => {
          let prueba = response.data.result.rows
          prueba.forEach(element => this.lista_DTC_Filtrada.push(element.dtcView));
          this.totalPages = response.data.result.numeroPaginas
          this.currentPage = response.data.result.paginaActual
          this.loadingTable = false
          })
          .catch((error) =>{ 
          if(error.response.status == 404){
            this.lista_DTC_Filtrada = []
            this.loadingTable = false
          }
          })
        }
        else if(this.plazaFiltro == '' && this.buscarActa != '' && this.usuario == '' && this.tipofalla != ''){
          this.$http.get(`${API}/dtcData/GMMEP/${clavePlaza}/${this.page}/${this.total}/${userId}/${this.usuario}/${this.tipofalla}/null/null/5/null`)
          .then((response) => {
          let prueba = response.data.result.rows
          prueba.forEach(element => this.lista_DTC_Filtrada.push(element.dtcView));
          this.totalPages = response.data.result.numeroPaginas
          this.currentPage = response.data.result.paginaActual
          this.loadingTable = false
          })
          .catch((error) =>{ 
          if(error.response.status == 404){
            this.lista_DTC_Filtrada = []
            this.loadingTable = false
          }
          })
        }
        else if(this.plazaFiltro == '' && this.buscarActa == '' && this.usuario != '' && this.tipofalla != ''){
          this.$http.get(`${API}/dtcData/GMMEP/${clavePlaza}/${this.page}/${this.total}/${userId}/null/null/${this.plazaidsquare.squareCatalogId}/${this.buscarActa}/5/null`)
          .then((response) => {
          let prueba = response.data.result.rows
          prueba.forEach(element => this.lista_DTC_Filtrada.push(element.dtcView));
          this.totalPages = response.data.result.numeroPaginas
          this.currentPage = response.data.result.paginaActual
          this.loadingTable = false
          })
          .catch((error) =>{ 
          if(error.response.status == 404){
            this.lista_DTC_Filtrada = []
            this.loadingTable = false
          }
          })
        }
        //FIltros por 3 valores
        else if(this.plazaFiltro != '' && this.buscarActa != '' && this.usuario != '' && this.tipofalla == ''){
          this.$http.get(`${API}/dtcData/GMMEP/${clavePlaza}/${this.page}/${this.total}/${userId}/${this.usuario}/${this.tipofalla}/${this.plazaidsquare.squareCatalogId}/${this.buscarActa}/5/null`)
          .then((response) => {
          let prueba = response.data.result.rows
          prueba.forEach(element => this.lista_DTC_Filtrada.push(element.dtcView));
          this.totalPages = response.data.result.numeroPaginas
          this.currentPage = response.data.result.paginaActual
          this.loadingTable = false
          })
          .catch((error) =>{ 
          if(error.response.status == 404){
            this.lista_DTC_Filtrada = []
            this.loadingTable = false
          }
          })
        }
        //Filtro de acta
        else if(this.plazaFiltro != '' && this.buscarActa != '' && this.usuario != '' && this.tipofalla != ''){
          this.$http.get(`${API}/dtcData/GMMEP/${clavePlaza}/${this.page}/${this.total}/${userId}/${this.usuario}/${this.tipofalla}/${this.plazaidsquare.squareCatalogId}/${this.buscarActa}/5/null`)
          .then((response) => {
          let prueba = response.data.result.rows
          prueba.forEach(element => this.lista_DTC_Filtrada.push(element.dtcView));
          this.totalPages = response.data.result.numeroPaginas
          this.currentPage = response.data.result.paginaActual
          this.loadingTable = false
          })
          .catch((error) =>{ 
          if(error.response.status == 404){
            this.lista_DTC_Filtrada = []
            this.loadingTable = false
          }
          })
        }
        
      },
      todos(){
        this.infoDTC = []
        this.lista_DTC_Filtrada = []
        this.buscarActa = ''
        this.plazaFiltro = ''
        this.usuario = ''
        this.tipofalla = ''
        this.tipoUsuario = this.$store.state.Login.cookiesUser.rollId
        let userId = this.$store.state.Login.cookiesUser.userId
        let clavePlaza = this.$store.state.Login.plazaSelecionada.refereciaPlaza
        let infousuario = this.$store.state.Login.cookiesUser
        this.$http.get(`${API}/dtcData/GMMEP/${clavePlaza}/${this.page}/${this.total}/${userId}/null/null/null/null/5/null`)
        .then((response) => {
            let prueba = response.data.result.rows
            prueba.forEach(element => this.infoDTC.push(element.dtcView));
            if(this.tipoUsuario == 4 || this.tipoUsuario == 10 || this.tipoUsuario == 7){
              this.lista_DTC_Filtrada = this.infoDTC
            }else {
              let dtcfiltradoporusuario = this.infoDTC.filter(dtc =>{
              if(dtc.userId == infousuario.userId){
              return dtc
            }
            })
              this.lista_DTC_Filtrada = dtcfiltradoporusuario;  
            }
            this.totalPages = response.data.result.numeroPaginas
            this.currentPage = response.data.result.paginaActual
            this.loadingTable = false
          }) 
        .catch((error) =>{ 
          console.log(error);
          this.loadingTable = false 
        })
      },
      showMore(page) {
        this.lista_DTC_Filtrada = [];
        this.page = page;
        this.currentPage = page;  
        this.$router.push({path: 'ConcentradoGMMEP', query: { 'Pagina': page, 'nameFilter': null } })
        this.loadingTable = true
        let userId = this.$store.state.Login.cookiesUser.userId
        let clavePlaza = this.$store.state.Login.plazaSelecionada.refereciaPlaza
        this.tipoUsuario = this.$store.state.Login.cookiesUser.rollId
        let infousuario = this.$store.state.Login.cookiesUser
        if(this.plazaFiltro == '' && this.buscarActa == ''){
          this.$http.get(`${API}/dtcData/GMMEP/${clavePlaza}/${this.page}/${this.total}/${userId}/null/null/5/null`)
          .then((response) => {
              let prueba = response.data.result.rows
              prueba.forEach(element => this.infoDTC.push(element.dtcView));
              if(this.tipoUsuario == 4 || this.tipoUsuario == 10 || this.tipoUsuario == 7){
                  this.lista_DTC_Filtrada = this.infoDTC
              }else {
                  let dtcfiltradoporusuario = this.infoDTC.filter(dtc =>{
                  if(dtc.userId == infousuario.userId){
                  return dtc
                }
              })
                this.lista_DTC_Filtrada = dtcfiltradoporusuario;  
              }
              this.totalPages = response.data.result.numeroPaginas
              this.currentPage = response.data.result.paginaActual
              this.loadingTable = false
          }) 
          .catch((error) =>{ 
            console.log(error);
            this.loadingTable = false 
          }) 
        }else{
          this.filtro_Actas(this.plazaFiltro,this.buscarActa);
        }
      },
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