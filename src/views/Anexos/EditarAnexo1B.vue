<template>

    <div class="container mx-auto font-titulo">
        <HeaderGenerico :titulo="'ACTA ADMINISTRATIVA INFORMATIVA (ENTREGA-RECEPCIÓN)'" :subtitulo="'FORMATO 1-B'" :tipo="'anexo1A'" />
        <div class="mt-1 mb-1 text-sm flex flex-col leading-7 sm:block sm:p-1 sm:pr-2 sm:text-xs border sm:m-1 shadow-md md:w-auto text-justify p-6">
        <p class="">SE LEVANTA LA PRESENTE ACTA,
        PARA HACER CONSTAR LA SUSTITUCIÓN DE COMPONENTES <label class="font-bold">POR FÍN DE VIDA ÚTIL/REUBICACIÓN/ACONDICIONAMIENTO, </label> 
        </p>
        <p>
        REALIZADO AL EQUIPO DE CONTROL DE TRANSITO DE <label class="font-bold">CARRIL {{this.nombrecarriles.toString()}}</label>, 
        EN LA PLAZA DE COBRO <label class="font-bold">No. {{this.plazadtc[0].plaza.toUpperCase() }},</label>
        PERTENECIENTE A LA <label class="font-bold">{{this.plazadtc[0].regionalCoordination.toUpperCase() }}</label>
        </p>
        <p>
        EN LA CIUDAD DE <label class="font-bold ml-1 uppercase">{{this.ciudad[0].ciudad}}, {{this.ciudad[0].estado}}</label>, SIENDO 
        <datetime class="ml-2 inline-flex"
        use12-hour
        v-model="fechaapertura"
        type="datetime"
        name="HoraInicio" 
        input-class="inputanexo"></datetime>
        EL <label class="font-bold">{{this.plazadtc[0].adminName.toUpperCase() }}</label> ADMINISTRADOR DE LA PLAZA DE COBRO, EL<label class="font-bold"> {{this.lista_DTC_Filtrada[0].name.toUpperCase() }}</label>, TÉCNICO REPRESENTANTE DE LA EMPRESA <label class="font-bold">PROYECTOS Y SISTEMAS INFORMATICOS S.A. DE C.V.</label> 
        TENIENDO COMO TESTIGOS DE ASISTENCIA A:
        </p>
        <div class="flex w-full gap-4 p-2">
          <div class="inline-block relative w-full">
              <select class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" v-model="this.anexo.testigo1Id">
                <option value="">Selecciona a un testigo</option>
                <option :value="testigo.id" v-for="testigo in testigoscompleto" :key="testigo.id">{{testigo.nombre}}</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
          </div>
          <div class="inline-block relative w-full">
              <select class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" v-model="this.anexo.testigo2Id">
                <option value="">Selecciona a un testigo</option>
                <option :value="testigo.id" v-for="testigo in testigoscompleto" :key="testigo.id">{{testigo.nombre}}</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
          </div>
        </div>
        <p class="">
        PARA HACER CONSTAR QUE LA SUSTITUCIÓN DE COMPONENTES DEL EQUIPO DEL <span class="font-bold">CARRIL {{this.nombrecarriles.toString()}}</span>,
        DE ACUERDO A LA SOLICITUD <input type="text" v-model="solicitud" placeholder="URC-SOC.2314-2021" class="inputanexo">, 
        DE FECHA <datetime v-model="fechasolicitud" class="inline-flex" input-class="inputanexo"></datetime>, Y AUTORIZADA EN OFICIO <input type="text" v-model="oficio" placeholder="DO/3741/2021" class="inputanexo">
        DE FECHA <datetime v-model="fechaoficio" class="inline-flex" input-class="inputanexo"></datetime> POR LA GERENCIA DE MANTENIMIENTO Y MODERNIZACIÓN DE EQUIPOS DE PEAJE; PARA CUYO EFECTÓ FUÉ NECESARIO REPONER EN FECHA
        <datetime v-model="fechaapertura" class="inline-flex" input-class="inputanexo" disabled></datetime> LAS PARTES QUE A CONTINUACIÓN SE DETALLAN.
        </p>
        <p class="text-sm">
        LOS EQUIPOS/COMPONENTES DAÑADOS EL ADMINISTRADOR DEBERÁ IDENTIFICAR Y EMBALAR, ENVIANDOLOS EN UN PERÍODO DE 5 DÍAS MÁXIMO AL ÁLMACÉN DE LA 
        COORDINACION REGIONAL POR OFICIO, PARA SU DESTINO FINAL CONFORME LA NORMA CAPUFE
        </p>
        <p class="text-sm">
        LOS TRABAJOS, INSTALACIÓN Y OPERACIÓN DE LA PLAZA DE COBRO QUEDAN A ENTERA SATISFACCIÓN DEL ADMINISTRADOR DE LA PLAZA DE COBRO Y/O ENCARGADO DE TURNO.
        </p>
        <h3 class="font-bold text-sm mt-2">COMPONENTES Y/O REFACCIONES DAÑADAS:</h3>
        <TablaEquipoMalo
          :listaComponentes="listaComponentes"
          :dateSinester="datosSinester.SinisterDate"
          :Editar="true"
          :plazareferencia="this.lista_DTC_Filtrada[0].referenceSquare" 
          :dtcreference="this.$route.params.dtcReference"
          :componentesinsertados="this.componenteseditadostraidos"
          @listacarriles = "onagregarcomponentes"
          @listanombrecom = "onagregarnombrescomponentes"
          @componentesfinales = "agregarcomponenteseditados"
        ></TablaEquipoMalo>
       <p class="text-sm mb-2 uppercase">Supervisor de plaza <span class="text-sm font-bold">{{ this.lista_DTC_Filtrada[0].name }}</span></p>
      <div class="inline-flex mt-4">
          <p class="mr-2">SE CIERRA LA PRESENTE ACTA EN FECHA</p>
          <datetime v-model="fechaapertura" class="inline-flex" input-class="inputanexo" disabled></datetime>
          <p class="ml-2">,SIENDO LAS</p>
          <datetime v-model="fechacierre" type="time" class="inline-flex ml-2" input-class="inputanexo" ></datetime>
        </div>
        <div class="mt-4">
           <ValidationObserver ref="observer" class="">  
                        <div class="w-full">
                            <ValidationProvider name="ComentarioCalendario" rules="max:500" v-slot="{ errors }">
                                <span class="text-center font-titulo font-semibold uppercase sm:flex sm:flex-col md:grid lg:grid">Observaciones para reporte fotografico equipo nuevo</span>
                                <textarea
                                    v-model="comentario"                                                               
                                    class="block container placeholder-gray-500 textAreaCalendario sm:mx-auto md:mx-auto lg:mx-auto"
                                    placeholder="Inserte observaciones del reporte fotografico"
                                    name="ComentarioCalendario"
                                    :maxlength="limite"
                                />
                                <span class="text-red-600 text-xs block">{{ errors[0] }}</span>
                                <span class="text-xs text-gray-500 ">{{ restante }}/500</span>    
                            </ValidationProvider>                    
                        </div>  
        </ValidationObserver>
        </div>
        <div class="p-2 mb-10 sm:mb-18 flex justify-center w-full mt-2">
            <button @click="validacionanexo()" class="botonIconCrear" :class="{'CrearDeshabilitado' :modalLoading,'bg-gray-300 hover:text-black border-black hover:border-black cursor-not-allowed opacity-50': modalLoading, 'hover:bg-gray-300 hove:border-black': modalLoading}" :disabled="modalLoading">
              <img src="@/assets/img/add.png" class="mr-2" width="35" height="35" />
              <span>Editar anexo 1-B</span>
            </button>
        </div>
        </div>
    <!--/////////////////////////////////////////////////////////////////////
    ////                     MODAL IMAGENES                        /////
    ////////////////////////////////////////////////////////////////////-->
    <Modal :showing="modalImage" @close="modalImage = false">
      <div class="justify-center text-center block">            
                    <!-- /////////////////////////////////////////////////////////////////////
                    ////                         IMAGENES                             ////
                    ///////////////////////////////////////////////////////////////////// -->
                    <ImagenesAnexo 
                      :reporteDataInsertada="true"
                      :tipo="'Anexo'" 
                      :referenceNumber="this.lista_DTC_Filtrada[0].referenceNumber"
                      :maximofotosanexo="this.double"
                      :referenciaAnexo="this.referenciaAnexo"
                      :subversionAnexo="true"
                      :editar="true"
                      @bloquear-boton-diagnostico="bloquear_boton_anexo_img"
                      >
                    </ImagenesAnexo>
                    <button @click="pasarinsertaranexo()" :disabled="blockBotonModal" class="botonIconCrear mt-6" :class="{'bg-gray-300 hover:text-black border-black hover:border-black cursor-not-allowed opacity-50': blockBotonModal, 'hover:bg-gray-300 hove:border-black': blockBotonModal }">
                        <img src="../../assets/img/add.png" class="mr-2" width="35" height="35" />
                        <span>Editar Anexo 1-B</span>
                    </button>  
                </div>
    </Modal>
    <!--/////////////////////////////////////////////////////////////////////
    ////                     MODAL VALIDACION                       /////
    ////////////////////////////////////////////////////////////////////-->
    <Modal :showing="modalvalidacionanexo" @close="modalvalidacionanexo = false">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                  <div class="w-12 mx-auto flex-shrink-0 flex items-center justify-center h-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <ExclamationIcon class="h-10 w-10 text-red-600" aria-hidden="true" />
                </div>
                <h1 class="text-xl text-center font-bold">NO SE PUEDE GENERAR EL ANEXO</h1>
                <div class="text-justify mt-3 sm:mt-0 sm:ml-4 sm:text-left">
                  <div class="mt-2">
                    <p class="">Por las siguientes razones no se puede generar el anexo:</p>
                  </div>
                  <div>
                    <ul class="mt-3 list-disc list-inside text-justify">
                        <li v-for="error in errores" :key="error">{{ error }}</li>
                      </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm" @click="limpiarvalidacion()">Continuar</button>
            </div>
    </Modal>
     <!--/////////////////////////////////////////////////////////////////////
    ////                     MODAL VALIDACION CONFIRMACION                /////
    ////////////////////////////////////////////////////////////////////-->
    <Modal :showing="modalconfirmacionanexo" @close="modalconfirmacionanexo = false">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                  <div class="w-12 mx-auto flex-shrink-0 flex items-center justify-center h-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                  <CheckCircleIcon class="h-10 w-10 text-green-600" aria-hidden="true" />
                </div>
                <h1 class="text-xl text-center font-bold">TU ANEXO ESTA COMPLETO</h1>
                <div class="text-justify mt-3 sm:mt-0 sm:ml-4 sm:text-left">
                  <div class="mt-2">
                    <p class="">los datos de tu anexo son los siguientes:</p>
                  </div>
                  <div>
                    <ul class="mt-3 list-disc list-inside text-justify">
                        <li>DTC: {{this.lista_DTC_Filtrada[0].referenceNumber}}</li>
                        <li>Fecha de Apertura: {{this.fechaaperturaformateada}}</li>
                        <li>Solicitud: {{this.anexo.solicitud}}</li>
                        <li>Fecha de solicitud: {{this.anexo.solicitudfechainicio}}</li>
                        <li>Oficio: {{this.anexo.folioOficio}}</li>
                        <li>Fecha Oficio:{{this.anexo.fechaoficioinicio}}</li>
                      </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex gap-4 bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm" @click="insertaranexo()">Confirmar</button>
              <button type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm" @click="modalconfirmacionanexo = false">Cancelar</button>
            </div>
    </Modal>
     <!--/////////////////////////////////////////////////////////////////////
    ////                     MODAL DESCARGA                          /////
    ////////////////////////////////////////////////////////////////////-->
    <Modal :showing="modaldescarga" @close="modaldescarga = false">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                  <div class="w-12 mx-auto flex-shrink-0 flex items-center justify-center h-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                  <DownloadIcon class="h-10 w-10 text-blue-800" aria-hidden="true" />
                </div>
                <h1 class="text-xl text-center">SE GENERO EL ANEXO DEL DTC CON REFERENCIA <b>{{this.lista_DTC_Filtrada[0].referenceNumber}}</b></h1>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm" @click="saliranexos()">Regresar al menu principal</button>
            </div>
    </Modal>
    </div>
</template>

<script>
import HeaderGenerico from "../../components/Header/HeaderGenerico.vue";
import TablaEquipoMalo from "../../components/Anexo/TablaEditarEquipoMaloAnexo.vue";
import { Datetime } from 'vue-datetime';
import ImagenesAnexo from '../../components/ImagenesGenericas.vue';
import ServiceFiltrosDTC from "../../services/FiltrosDTCServices.js";
//import ServiceReportPDF from "../../services/ReportesPDFService";
import Modal from "../../components/ModalGenerico.vue";
import { ExclamationIcon,CheckCircleIcon,DownloadIcon } from '@vue-hero-icons/outline';
import moment from 'moment'


const API = process.env.VUE_APP_URL_API_PRODUCCION

    export default {
    name: "Anexo1-A",
    components:{
        HeaderGenerico,
        TablaEquipoMalo,
        Datetime,
        ImagenesAnexo,
        Modal,
        ExclamationIcon,
        CheckCircleIcon,
        DownloadIcon
    },
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
      testigo1: '',
      testigo2: '',
      fechasiniestro: '',
      modalImage: false,  
      modalLoading: false,
      listaSupervisor:[],
      dtc_filtrado:[],
      listaPlazas:[],
      plazadtc: [],
      componentesseleccionados:[],
      nombrecarriles:[],
      nombrecomponentes:[],
      componentesfinaleseditados:[],
      fechaapertura: "",
      fechacierre: "",
      selectsupervisor:'',
      solicitud:'',
      oficio:'',
      fechasolicitud: '',
      fechaoficio: '',
      testigoscompleto:[],
      idtestigos:0,
      blockBotonModal: false,
      anexo: {},
      objetocomponentesanexosaeditar:[],
      arraycomponentes:[],
      componenteseditadostraidos:[],
      modalvalidacionanexo : false,
      errores:[],
      vfechaapertura:false,
      vfechacierre:false,
      vtestigo1:false,
      vtestigo2:false,
      vsuperior:false,
      modalconfirmacionanexo:false,
      modaldescarga: false,
      fechaaperturaformateada: "",
      fechacierreformateada: "",
      comentario:'',
      numerodefotos: 0,
      limite:500,
      ciudad:[],
      referenciaAnexo: ''
    };
    },
    created(){
      this.filtro_dtc()
    },
    methods: {
     async filtro_dtc() {    
      let iddtc = this.$route.params.dtcReference;
      let referenciaanexo = this.$route.params.anexoReference; 
      try{
        let dtcfiltrado = await ServiceFiltrosDTC.filtrarDTC(this.filtroVista, ''  , '' , iddtc , undefined, false, undefined)
        let resultdtc =  dtcfiltrado.filter(e => e.referenceNumber == this.$route.params.dtcReference)
        this.lista_DTC_Filtrada = resultdtc;
        const months = ["ENERO", "FEBRERO", "MARZO","ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];
        let datesiniestro = new Date(this.lista_DTC_Filtrada[0].sinisterDate);
        let formatted_date = datesiniestro.getDate() + " DE " + months[datesiniestro.getMonth()] + " DE " + datesiniestro.getFullYear()
        this.fechasiniestro = formatted_date;
        let dataHeader = await this.$store.state.Login.listaHeaderDtcUser
        const result = dataHeader.filter(e => e.adminSquareId == this.lista_DTC_Filtrada[0].adminId);
        this.plazadtc  = result;
        const datatestigo = await fetch(`${API}/AnexoDTC/Testigos/${this.lista_DTC_Filtrada[0].referenceSquare}/${this.lista_DTC_Filtrada[0].squareCatalogId}`)
        const objetotestigo = await datatestigo.json();
        let resultado = objetotestigo.result;
        this.testigoscompleto = resultado;
        const dataanexo = await fetch(`${API}/AnexoDTC/HeaderAnexo/${this.lista_DTC_Filtrada[0].referenceSquare}/${referenciaanexo}`)
        const anexo = await dataanexo.json()
        let objetoresultadoanexo = anexo.result;
        this.anexo = objetoresultadoanexo[0];
        console.log(this.anexo)
        if(this.anexo.observaciones == null){
          this.comentario = ''
        }else{
          this.comentario = this.anexo.observaciones;
        }
        this.solicitud = this.anexo.solicitud;
        this.oficio = this.anexo.folioOficio;
        this.fechaapertura = this.anexo.fechaApertura;
        this.fechacierre=this.anexo.fechaCierre;
        this.fechasolicitud = this.anexo.fechaSolicitudInicio;
        this.fechaoficio = this.anexo.fechaOficioInicio;
        this.referenciaAnexo = this.anexo.anexoReference  
        console.log(this.referenciaAnexo)
        const componentesanexo = await fetch(`${API}/AnexoDTC/HistoricoComponetesAnexo/${this.lista_DTC_Filtrada[0].referenceSquare}/${referenciaanexo}`) 
        const canexos = await componentesanexo.json();
        let objetocomponentesanexo = canexos.result;
        this.objetocomponentesanexosaeditar = objetocomponentesanexo;
        const data = await fetch(`${API}/AnexoDTC/ComponentesRequest/${this.lista_DTC_Filtrada[0].referenceSquare}/${this.$route.params.dtcReference}`)
        const objeto = await data.json();
        this.arraycomponentes = objeto.result;
        let plazacompletas = await this.$store.state.Login.listaPlazas
        const resultadoplaza = plazacompletas.filter(e => e.referenceSquare == this.plazadtc[0].referenceSquare);
        this.ciudad = resultadoplaza;
      }
      catch (error) {
        console.log(error);
      } 
      this.filtrarcomponentes(this.objetocomponentesanexosaeditar,this.arraycomponentes);
    },
    onagregarcomponentes(data) {
    let result = data.filter((item,index)=>{
      return data.indexOf(item) === index;
    })
      this.nombrecarriles = result;
     }, 
     onagregarnombrescomponentes(data) {
      let result = data.filter((item,index)=>{
      return data.indexOf(item) === index;
      })
      this.nombrecomponentes = result;
     },
     agregarcomponenteseditados(data){
       this.componentesfinaleseditados = data;
     },
     filtrarcomponentes(componenteseditados,componentestotales){
        for (let i = 0; i < componentestotales.length; i++) {
          for(let j=0; j< componenteseditados.length; j++) {
            if(componentestotales[i].requestedComponentId == componenteseditados[j].componentDTCId){
              let componenteexistente = {
                brand: componentestotales[i].brand,
                brandPropuesto: componentestotales[i].brandPropuesto,
                lane: componentestotales[i].lane,
                model: componentestotales[i].model,
                modelPropuesto: componentestotales[i].modelPropuesto,
                nameComponent: componentestotales[i].nameComponent,
                observation: componentestotales[i].observation,
                requestedComponentId: componentestotales[i].requestedComponentId,
                serialNumber: componenteseditados[j].numeroSerie,
                useInAnexo: componentestotales[i].useInAnexo
              }
              this.componenteseditadostraidos.push(componenteexistente);
            }
          }
        }
     },
     async insertaranexo(){
      this.modalImage = true
      const formateadorapertura = moment(this.fechaapertura.substring(0, 50)).format("YYYY-MM-DD HH:mm:ss"); 
      const formateadorcierre = moment(this.fechacierre.substring(0, 50)).format("YYYY-MM-DD HH:mm:ss");
      const formateadorfechasolicitud = moment(this.fechasolicitud.substring(0, 50)).format("YYYY-MM-DD HH:mm:ss");
      const fomateadorfechaoficio = moment(this.fechaoficio.substring(0, 50)).format("YYYY-MM-DD HH:mm:ss");
      if(this.comentario == null){
        this.comentario == ""
      }
      console.log(this.comentario)
      let Anexo = {
          "DTCReference": this.anexo.dtcReference,
          "AnexoReference": this.$route.params.anexoReference,
          "FechaApertura": formateadorapertura,
          "FechaCierre": formateadorcierre,
          "Solicitud": this.solicitud,
          "FechaSolicitudInicio" : formateadorfechasolicitud,
          "FolioOficio": this.oficio,
          "FechaOficioInicio": fomateadorfechaoficio,
          "Observaciones": this.comentario,
          "SupervisorId": this.anexo.supervisorId,
          "Testigo1Id": this.anexo.testigo1Id,
          "Testigo2Id": this.anexo.testigo2Id,
          "TipoAnexo": "B",
          "ComponentesAnexo":this.componentesfinaleseditados  
       }
       console.log(Anexo)
      try
      {
        this.$http.post(`${API}/AnexoDTC/${this.lista_DTC_Filtrada[0].referenceSquare}/true`,Anexo)
        .then(() => {
          this.modalImage = false;
          this.modaldescarga = true;
          // let subversion = true;
          // ServiceReportPDF.generar_pdf_anexoB(this.lista_DTC_Filtrada[0].referenceNumber,this.$route.params.anexoReference,subversion);
          // ServiceReportPDF.reporte_fotografico_anexo(this.lista_DTC_Filtrada[0].referenceNumber,this.$route.params.anexoReference);
          setTimeout(() => {
            this.$router.push('/ConcentradoDTCFacturados');
            document.querySelector('body').classList.remove('overflow-hidden'); 
          },3000)
        })
        .catch((error) => {
          console.log(error);
        })
      }catch(error){
        console.error(error)
      }
     },
     bloquear_boton_anexo_img(value){
        this.blockBotonModal = value
    },
    validacionanexo(){
      let fechaapertura = new Date(this.fechaapertura);
      let horadecierre = new Date(this.fechacierre);
      var hora = horadecierre.getHours() + ':' + horadecierre.getMinutes() + ':' + horadecierre.getSeconds();
      var fecha = fechaapertura.getFullYear()+ '-' + fechaapertura.getMonth() + '-' + fechaapertura.getDate();
      let fechacierra = fecha + ' ' + hora;
      var fechacierrefinal = new Date(fechacierra);
      this.fechacierre = fechacierrefinal.toISOString();
      let hoy = Date.now();
      if(this.fechaapertura == ""){
        this.errores.push("La fecha de apertura esta vacia")
      }
      if(this.fechacierre == ""){
        this.errores.push("La fecha de cierre esta vacia")
      }
      if(this.anexo.testigo1Id == ""){
        this.errores.push("Debes seleccionar el primer testigo")
      }
      if(this.anexo.testigo2Id == ""){
        this.errores.push("Debes seleccionar el segundo testigo")
      }
      if(this.anexo.testigo1Id == this.anexo.testigo2Id){
        this.errores.push("Los Testigos no pueden ser los mismos")
      }
       if (this.componentesfinaleseditados.length == 0) {
         let componentes = this.objetocomponentesanexosaeditar.map(componente => {
           let c = {
             RequestedComponentId: componente.componentDTCId,
             SerialNumber: componente.numeroSerie
           }
           return c
         })
         this.componentesfinaleseditados = componentes;
       }
        if(this.objetocomponentesanexosaeditar.length > this.componentesfinaleseditados.length ){
        const index = this.objetocomponentesanexosaeditar.map(object => object.componentDTCId);
        for (let j = 0; j < this.componentesfinaleseditados.length; j++) {
            let position = index.indexOf(this.componentesfinaleseditados[j].RequestedComponentId);
            if(position != -1){
              this.objetocomponentesanexosaeditar.splice(position,1)
            }
        }
        for(let i = 0;i < this.objetocomponentesanexosaeditar.length; i++){
          let c = {
             RequestedComponentId: this.objetocomponentesanexosaeditar[i].componentDTCId,
             SerialNumber: this.objetocomponentesanexosaeditar[i].numeroSerie
            }
          this.componentesfinaleseditados.push(c);
        }
        }
         if(this.componentesfinaleseditados.length == this.objetocomponentesanexosaeditar.lenght){
          this.componentesfinaleseditados = this.componentesfinaleseditados
        }
       if(fechaapertura > hoy){
         this.errores.push("La fecha de apertura no debe ser mayor al dìa de hoy");
       }
       const months = ["ENERO", "FEBRERO", "MARZO","ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];
        let dateapertura = new Date(this.fechaapertura);
        let formatted_date_apertura = dateapertura.getDate() + " DE " + months[dateapertura.getMonth()] + " DE " + dateapertura.getFullYear()
        this.fechaaperturaformateada = formatted_date_apertura;
       if (this.errores.length > 0) {
        this.modalvalidacionanexo = true;
       }else{
         this.modalconfirmacionanexo = true;
       }
     },
     limpiarvalidacion(){
       this.errores = [];
       this.modalvalidacionanexo = false;
     },
     pasarinsertaranexo(){
       this.modalconfirmacionanexo=false;
       this.modalImage = true;
     },
     saliranexos(){
     this.modaldescarga = false;
     this.modalconfirmacionanexo=false;
     this.modalImage = false;
     this.modalvalidacionanexo = false;
     this.$router.push('/ConcentradoDTCFacturados');
     document.querySelector('body').classList.remove('overflow-hidden'); 
     },
    },
    computed: {
    restante(){
      return  this.comentario.length
    },
    double(){
      return this.componentesfinaleseditados.length * 2;
    }
  }
    }
</script>
