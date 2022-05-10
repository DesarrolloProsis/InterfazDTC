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
        <datetime 
        class="ml-2 inline-flex"
        v-model="fechaapertura"
        use12-hour type="datetime"
        name="HoraInicio" 
        input-class="inputanexo"></datetime>
        EL <label class="font-bold">{{this.plazadtc[0].adminName.toUpperCase() }}</label> ADMINISTRADOR DE LA PLAZA DE COBRO, EL<label class="font-bold"> {{this.lista_DTC_Filtrada[0].name.toUpperCase() }}</label>, TÉCNICO REPRESENTANTE DE LA EMPRESA <label class="font-bold">PROYECTOS Y SISTEMAS INFORMATICOS S.A. DE C.V.</label> 
        TENIENDO COMO TESTIGOS DE ASISTENCIA A:
        </p>
        <div class="flex w-full gap-4 p-2">
          <div class="inline-block relative w-full">
              <select class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" v-model="testigo1">
                <option value="">Selecciona a un testigo</option>
                <option :value="testigo.id" v-for="testigo in testigoscompleto" :key="testigo.id">{{testigo.nombre}}</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
          </div>
          <div class="inline-block relative w-full">
              <select class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" v-model="testigo2">
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
        DE ACUERDO A LA SOLICITUD <input type="text" v-model="solciitud" placeholder="URC-SOC.2314-2021" class="inputanexo">, 
        DE FECHA <input type="date" v-model="solicitudfechainicio" class="inline-flex" input-class="inputanexo"/>, Y AUTORIZADA EN OFICIO <input type="text" v-model="foliooficio" placeholder="DO/3741/2021" class="inputanexo">
        DE FECHA <input type="date" v-model="fechaoficioinicio" class="inline-flex" input-class="inputanexo"/> POR LA GERENCIA DE MANTENIMIENTO Y MODERNIZACIÓN DE EQUIPOS DE PEAJE; PARA CUYO EFECTÓ FUÉ NECESARIO REPONER EN FECHA
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
        :Editar="false"
        :dateSinester="datosSinester.SinisterDate"
        @listacarriles = "onagregarcomponentes"
        @listanombrecom = "onagregarnombrescomponentes"
        @componentesfinales = "agregarcomponenteseditados"
        ></TablaEquipoMalo>
        <p class="text-sm mb-2 uppercase">Supervisor de plaza <span class="text-sm font-bold">{{ this.lista_DTC_Filtrada[0].name }}</span></p>
        <div class="inline-flex mt-4">
            <p class="mr-2">SE CIERRA LA PRESENTE ACTA EN FECHA</p>
            <datetime v-model="fechaapertura" class="inline-flex" input-class="inputanexo" disabled></datetime>
            <p class="ml-2">,SIENDO LAS</p>
            <datetime type="time" v-model="time" class="inline-flex ml-2" input-class="inputanexo"></datetime>
        </div>
        <div class="mt-4">
           <ValidationObserver ref="observer" class="">  
                        <div class="w-full">
                            <ValidationProvider name="ComentarioCalendario" rules="max:500" v-slot="{ errors }">
                                <span class="text-center font-titulo font-semibold uppercase sm:flex sm:flex-col md:grid lg:grid">Observaciones para reporte fotografico</span>
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
        <div class="p-2 mb-10 sm:mb-18 flex justify-center w-full">
            <button @click="validacionanexo()" class="botonIconCrear" :class="{'CrearDeshabilitado' :modalLoading,'bg-gray-300 hover:text-black border-black hover:border-black cursor-not-allowed opacity-50': modalLoading, 'hover:bg-gray-300 hove:border-black': modalLoading}" :disabled="modalLoading">
              <img src="@/assets/img/add.png" class="mr-2" width="35" height="35" />
              <span>Generar acta 1-B</span>
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
                      @bloquear-boton-diagnostico="bloquear_boton_anexo_img"
                      >
                    </ImagenesAnexo>
                    <button @click="pasarinsertaranexo()" :disabled="blockBotonModal" class="botonIconCrear mt-6" :class="{'bg-gray-300 hover:text-black border-black hover:border-black cursor-not-allowed opacity-50': blockBotonModal, 'hover:bg-gray-300 hove:border-black': blockBotonModal }">
                        <img src="../../assets/img/add.png" class="mr-2" width="35" height="35" />
                        <span>Generar Acta 1-B</span>
                    </button>  
                </div>
      </Modal>
    <!--/////////////////////////////////////////////////////////////////////
    ////                     MODAL VALIDACION ERORES                   /////
    ////////////////////////////////////////////////////////////////////-->
    <Modal :showing="modalvalidacionanexo" @close="modalvalidacionanexo = false">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                  <div class="w-12 mx-auto flex-shrink-0 flex items-center justify-center h-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <ExclamationIcon class="h-10 w-10 text-red-600" aria-hidden="true" />
                </div>
                <h1 class="text-xl text-center font-bold">NO SE PUEDE GENERAR EL ACTA</h1>
                <div class="text-justify mt-3 sm:mt-0 sm:ml-4 sm:text-left">
                  <div class="mt-2">
                    <p class="">Por las siguientes razones no se puede generar el acta:</p>
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
                  <div class="w-12 mx-auto flex-shrink-0 flex items-center justify-center h-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <CheckCircleIcon class="h-10 w-10 text-green-600" aria-hidden="true" />
                </div>
                <h1 class="text-xl text-center font-bold">DATOS COMPLETOS</h1>
                <div class="text-justify mt-3 sm:mt-0 sm:ml-4 sm:text-left">
                  <div class="mt-2">
                    <p class="">los datos de tu anexo son los siguientes:</p>
                  </div>
                  <div>
                    <ul class="mt-3 list-disc list-inside text-justify">
                        <li>DTC: {{this.lista_DTC_Filtrada[0].referenceNumber}}</li>
                        <li>Fecha de Apertura: {{this.fechaaperturaformateada}}</li>
                        <li>Solicitud: {{this.solciitud}}</li>
                        <li>Fecha de solicitud: {{this.fechasolicitudformateada}}</li>
                        <li>Oficio: {{this.foliooficio}}</li>
                        <li>Fecha Oficio:{{this.fechaoficioformateada}}</li>
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
                  <DownloadIcon class="h-10 w-10 text-blue-600" aria-hidden="true" />
                </div>
                <h1 class="text-xl text-center font-bold">SE GENERO EL ACTA DEL DTC CON REFERENCIA <b>{{this.lista_DTC_Filtrada[0].referenceNumber}}</b></h1>
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
import TablaEquipoMalo from "../../components/Anexo/TablaEquipoMaloAnexo.vue";
import ImagenesAnexo from '../../components/ImagenesGenericas.vue';
import { Datetime } from 'vue-datetime';
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
    //Declaracion de las variables a utilizar
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
      listaSupervisor:[],
      listaTestigos:[], 
      plazadtc: [],
      nombrecarriles:[],
      testigoscompleto:[],
      componentesfinaleseditados:[],
      fechaapertura: '',
      foliooficio: '',
      fechaoficioinicio: '',
      blockBotonModal: true,
      modalImage: false,
      modalLoading: false,
      solciitud: '',
      solicitudfechainicio:'',
      modalvalidacionanexo : false,
      errores:[],
      vfechaapertura:false,
      vfechacierre:false,
      vtestigo1:false,
      vtestigo2:false,
      vsuperior:false,
      modalconfirmacionanexo: false,
      modaldescarga:false,
      fechaaperturaformateada: "",
      fechacierreformateada: "",
      fechasolicitudformateada:"",
      fechaoficioformateada: "",
      horacierre: "",
      fechacierre: "",
       comentario:'',
      numerodefotos: 0,
      limite:500,
      ciudad:[],
      referenciaAnexo:''
    };
    },
    //Creacion de la pagina antes de que el usuario pueda verla
    created(){
      this.SupervisorDtc()
      this.TestigosDtc()
      this.filtro_dtc()
    },
    methods: {
    //Funcion para cargar las opciones del select de los testigos
      async filtro_dtc() {    
      let iddtc = this.$route.params.referencenumber;
      try{
        let dtcfiltrado = await ServiceFiltrosDTC.filtrarDTC(this.filtroVista, ''  , '' , iddtc , undefined, false, undefined)
        let resultdtc =  dtcfiltrado.filter(e => e.referenceNumber == this.$route.params.referencenumber)
        this.lista_DTC_Filtrada = resultdtc;
        const months = ["ENERO", "FEBRERO", "MARZO","ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];
        let datesiniestro = new Date(this.lista_DTC_Filtrada[0].sinisterDate);
        let formatted_date = datesiniestro.getDate() + " DE " + months[datesiniestro.getMonth()] + " DE " + datesiniestro.getFullYear()
        this.fechasiniestro = formatted_date;
        let dataHeader = await this.$store.state.Login.listaHeaderDtcUser
        const result = dataHeader.filter(e => e.adminSquareId == this.lista_DTC_Filtrada[0].adminId);
        this.plazadtc  = result;
        let plazacompletas = await this.$store.state.Login.listaPlazas
        const resultadoplaza = plazacompletas.filter(e => e.referenceSquare == this.plazadtc[0].referenceSquare);
        this.ciudad = resultadoplaza;  
      }
      catch (error) {
        console.log(error);
      } 
      
    },
    //Funcion para cargar las opciones del select de los testigos
    async TestigosDtc(){
      try {
        const data = await fetch(`${API}/AnexoDTC/Testigos/${this.$route.params.referenceSquare}/${this.$route.params.squareCatalogId}`)
        const objeto = await data.json();
        let resultado = objeto.result;
        this.testigoscompleto = resultado;
        let nombretestigos = [];
        resultado.forEach(e => nombretestigos.push(e.nombre));
        this.listaTestigos = nombretestigos; 
      } catch (error) {
        console.log(error);
      }
    },
    //Funcion para cargar las opciones del supervisor del dtc
    async SupervisorDtc(){
      try {
        const data = await fetch(`${API}/AnexoDTC/Supervisor/${this.$route.params.referenceSquare}/${this.$route.params.squareCatalogId}`)
        const objeto = await data.json();
        let listaSupervisorprueba = objeto.result;
        this.listaSupervisor = listaSupervisorprueba;
      } catch (error) {
        console.log(error);
      }
    },
    //Funcion que nos regresa los carriles en los que se encuentra un componente
    onagregarcomponentes(data) {
    let result = data.filter((item,index)=>{
      return data.indexOf(item) === index;
    })
      this.nombrecarriles = result;
    },
    //Funcion que nos retorna el nombre de los componentes
    onagregarnombrescomponentes(data) {
      let result = data.filter((item,index)=>{
      return data.indexOf(item) === index;
      })
      this.nombrecomponentes = result;
    },
    //Funcion que nos proporciona el arreglo para enviar en el end point final del anexo a insertar
    agregarcomponenteseditados(data){
      this.componentesfinaleseditados = data;
    },
    //Funcion para insertar anexo
    async insertaranexo(){
      //Abrir el modal de insertar anexo
      this.modalImage = true
      //Damos formato a las fechas para poder crear el objeto de los anexos
      const formateadorapertura = moment(this.fechaapertura.substring(0, 50)).format("YYYY-MM-DD HH:mm:ss"); 
      const formateadorcierre = moment(this.fechacierre.substring(0, 50)).format("YYYY-MM-DD HH:mm:ss");
      const formateadorfechasolicitud = moment(this.solicitudfechainicio.substring(0, 50)).format("YYYY-MM-DD HH:mm:ss");
      console.log(formateadorfechasolicitud);
      const fomateadorfechaoficio = moment(this.fechaoficioinicio.substring(0, 50)).format("YYYY-MM-DD HH:mm:ss");
      console.log(fomateadorfechaoficio);
      //Creamos el nuevo objeto del anexo
      let Anexo = {
          "DTCReference": this.lista_DTC_Filtrada[0].referenceNumber,
          "AnexoReference": "",
          "FechaApertura": formateadorapertura,
          "FechaCierre": formateadorcierre,
          "Solicitud": this.solciitud,
          "FechaSolicitudInicio" : formateadorfechasolicitud,
          "FolioOficio": this.foliooficio,
          "FechaOficioInicio": fomateadorfechaoficio,
          "Observaciones": this.comentario,
          "Testigo1Id": this.testigo1,
          "Testigo2Id": this.testigo2,
          "TipoAnexo": "B",
          "ComponentesAnexo":this.componentesfinaleseditados  
       }
       console.log(Anexo)
      try
      {
        // //Hacemos la peticion para insertar un anexo
        this.$http.post(`${API}/AnexoDTC/${this.$route.params.referenceSquare}/false`,Anexo)
        .then((response) => {
          let refenciaanexo = response.data.result;
          this.referenciaAnexo = refenciaanexo;
          console.log(this.referenciaAnexo)
          this.modalconfirmacionanexo=false;
          this.modalImage = true;
          // let refenciaanexo = response.data.result;
          // let subversion = false;
          // //Una vez generada la referencia del anexo generamos los dos documentos
          // ServiceReportPDF.generar_pdf_anexoB(this.lista_DTC_Filtrada[0].referenceNumber,refenciaanexo,subversion);
          // ServiceReportPDF.reporte_fotografico_anexo(this.lista_DTC_Filtrada[0].referenceNumber,refenciaanexo);
        })
        .catch((error) => {
          console.log(error);
        })
      }catch(error){
        console.error(error)
      }
     },
    //Funcion para validar la informacion del anexo
     validacionanexo(){
       this.errores = [];
      //Validacion de las fechas de apertura y hora de cierre
      //Primero preguntamos si alguna esta vacia de lo contrario no podriamos construir la fecha de cierre
      //Para crear la fecha y darle formato en el modal creamos un array con los nombres de los meses y procedemos a darle a una variable el formato de la fecha a enseñar
      if(this.fechaapertura != "" && this.time != ""){
        let fechaapertura = new Date(this.fechaapertura);
        let horadecierre = new Date(this.time);
        var hora = horadecierre.getHours() + ':' + horadecierre.getMinutes() + ':' + horadecierre.getSeconds();
        var mes = fechaapertura.getMonth() + 1
        var fecha = fechaapertura.getFullYear()+ '-' + mes + '-' + fechaapertura.getDate();
        let fechacierra = fecha + ' ' + hora;
        var fechacierrefinal = new Date(fechacierra);
        this.fechacierre = fechacierrefinal.toISOString();
        let hoy = Date.now();
        if(fechaapertura > hoy){
         this.errores.push("La fecha de apertura no puede ser mayor al dia de hoy");
       }
       const months = ["ENERO", "FEBRERO", "MARZO","ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];
        let dateapertura = new Date(this.fechaapertura);
        let formatted_date_apertura = dateapertura.getDate() + " DE " + months[dateapertura.getMonth()] + " DE " + dateapertura.getFullYear() + ' A LAS ' + dateapertura.getHours() + ':' + dateapertura.getMinutes() + ':' + dateapertura.getSeconds()
        let datecierre = new Date(this.fechacierre);
        let formatted_date_cierre = datecierre.getDate() + " DE " + months[datecierre.getMonth()+1] + " DE " + datecierre.getFullYear() + ' A LAS ' + horadecierre.getHours() + ':' + horadecierre.getMinutes() + ':' + horadecierre.getSeconds()
        let datesolicitud = new Date(this.solicitudfechainicio);
        datesolicitud.setMinutes(datesolicitud.getMinutes() + datesolicitud.getTimezoneOffset())
        let formatted_date_solicitud = datesolicitud.getDate() + " DE " + months[datesolicitud.getMonth()] + " DE " + datesolicitud.getFullYear() 
        let dateoficio = new Date(this.fechaoficioinicio);
        dateoficio.setMinutes(dateoficio.getMinutes() + dateoficio.getTimezoneOffset())
        let formatted_date_oficio = dateoficio.getDate() + " DE " + months[dateoficio.getMonth()] + " DE " + dateoficio.getFullYear()
        this.fechaaperturaformateada = formatted_date_apertura;
        this.fechacierreformateada = formatted_date_cierre;
        this.fechasolicitudformateada = formatted_date_solicitud;
        this.fechaoficioformateada = formatted_date_oficio;
      }else{
      //En caso de que esten vacios los datos entonces agregamos los errores en el modal para que el usuario vea lo que esta haciendo mal
        this.errores.push("La fecha de apertura esta vacia")
        this.errores.push("La hora de cierre esta vacia")
      }
     //Validacion por si falta el primer testigo
      if(this.testigo1 == ""){
        this.errores.push("Debes seleccionar el primer testigo")
        this.vtestigo1 = true
      }
      //Validacion por si falta el primer testigo
      if(this.testigo1 == "" || this.testigo2 == ""){
        this.errores.push("Debes seleccionar ambos testigos ")
        this.vtestigo1 = true
        this.vtestigo2 = true
      }
      //Validacion por si los testigos son los mismos
      if((this.testigo1 != '' && this.testigo2 != '') && (this.testigo1 == this.testigo2)){
        this.errores.push("Los Testigos no pueden ser los mismos")
        this.vtestigo1 = true
        this.vtestigo2 = true
      }
      //Validacion para que la solicitud sea diferente a vacio
       if(this.solciitud == ""){
         this.errores.push("Debes ingresar el numero de solicitud del anexo")
       }
      //Validacion para que el oficio sea diferente a vacio
       if(this.foliooficio == ""){
         this.errores.push("Debes ingresar el folio del anexo")
       }
      //Validacion para que la fecha de solicitud sea diferente a vacio
       if(this.solicitudfechainicio == ""){
         this.errores.push("Debes ingresar la fecha de la solicitud del anexo")
       }
      //Validacion para que la fecha de oficio sea diferente a vacio
       if(this.fechaoficioinicio == ""){
         this.errores.push("Debes ingresar la fecha del folio del anexo")
       }
      //Validaciones para saber si los componentes fueron agregados o editados
      if(this.nombrecomponentes == undefined){
        this.errores.push("Tienes que seleccionar por lo menos 1 componente")
      }else{
        if (this.nombrecomponentes.length == 0) {
        this.errores.push("Tienes que seleccionar por lo menos 1 componente")
        }
      }
      
      if (this.componentesfinaleseditados.length == 0) {
        this.errores.push("Inserta el numero de serie del componente nuevo")
      }
      if(this.componentesfinaleseditados.length > 0){
        this.componentesfinaleseditados.forEach((e) =>{
          let arrayfaltantes = []
          let i = 0;
          if(e.SerialNumber == ''){
            i = i++;
            arrayfaltantes.push(i)
          }
          if(arrayfaltantes.length == 1){
            this.errores.push("Inserta el numero de serie del componente nuevo")
          }
          if(arrayfaltantes.length > 1){
            this.errores.push("Inserta los numeros de serie de los componentes nuevos")
          }
        })
      }
       if (this.errores.length > 0) {
        this.modalvalidacionanexo = true;
       }else{
         this.modalconfirmacionanexo = true;
       }
     },
     //Funcion para el boton cancelar en el modal de validaciones
     limpiarvalidacion(){
       this.errores = [];
       this.modalvalidacionanexo = false;
     },
     //Funcione para el cambio de las validaciones y cambie el estilo css de los select
     cambiarvalort1(){
       if(this.vtestigo1){
         this.vtestigo1 = false;
       }
     },
     cambiarvalort2(){
       if(this.vtestigo2){
         this.vtestigo2 = false;
       }
     },
     cambiarvalorsupervisor(){
       if(this.vsuperior){
         this.vsuperior = false;
       }
     },
    //Funcion para el boton de aceptar
     pasarinsertaranexo(){
      this.modalImage = false;
      this.modaldescarga = true;
       //Tiempo para regresar a la pagina de inicio y en caso de que no exista  el scroll quitar la la clase para que aparezca
      setTimeout(() => {
           this.$router.push('/ConcentradoDTCFacturados');
           document.querySelector('body').classList.remove('overflow-hidden'); 
      },3000)
     },
    //Funcion para el boton del modal de descarga de los anexos
     saliranexos(){
     this.modaldescarga = false;
     this.modalconfirmacionanexo=false;
     this.modalImage = false;
     this.modalvalidacionanexo = false;
     this.$router.push('/home');
     document.querySelector('body').classList.remove('overflow-hidden');  
     },
     //Funcion para bloquear el boton de los anexos
     bloquear_boton_anexo_img(value){
        this.blockBotonModal = value
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
