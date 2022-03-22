<template>

    <div class="container mx-auto">
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
        EN LA CIUDAD DE <label class="font-bold ml-1">PALO BLANCO, GUERRERO</label>, SIENDO 
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
              <select class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" v-model="testigo1" @change="vervalordelselect">
                <option value="">Selecciona a un testigo</option>
                <option :value="testigo.id" v-for="testigo in testigoscompleto" :key="testigo.id">{{testigo.nombre}}</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
          </div>
          <div class="inline-block relative w-full">
              <select class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" v-model="testigo2" @change="vervalordelselect">
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
        DE FECHA <datetime v-model="solicitudfechainicio" class="inline-flex" input-class="inputanexo"></datetime>, Y AUTORIZADA EN OFICIO <input type="text" v-model="foliooficio" placeholder="DO/3741/2021" class="inputanexo">
        DE FECHA <datetime v-model="fechaoficioinicio" class="inline-flex" input-class="inputanexo"></datetime> POR LA GERENCIA DE MANTENIMIENTO Y MODERNIZACIÓN DE EQUIPOS DE PEAJE; PARA CUYO EFECTÓ FUÉ NECESARIO REPONER EN FECHA
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
        <p class="mb-2">SUPERVISOR DE PLAZA: 
        </p>
        <div class="inline-block relative w-full">
              <select class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" v-model="selectsupervisor">
                <option value="">Selecciona un supervisor de plaza</option>
                <option :value="supervisor.id" v-for="supervisor in listaSupervisor" :key="supervisor.id">{{supervisor.nombre}}</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
          </div>
        <div class="p-2 mb-10 sm:mb-18 flex justify-center w-full">
            <button @click="insertaranexo()" class="botonIconCrear" :class="{'CrearDeshabilitado' :modalLoading,'bg-gray-300 hover:text-black border-black hover:border-black cursor-not-allowed opacity-50': modalLoading, 'hover:bg-gray-300 hove:border-black': modalLoading}" :disabled="modalLoading">
              <img src="@/assets/img/add.png" class="mr-2" width="35" height="35" />
              <span>Generar anexo 1-B</span>
            </button>
        </div>
        </div>
    <!--/////////////////////////////////////////////////////////////////////
    ////                     MODAL IMAGENES                        /////
    ////////////////////////////////////////////////////////////////////-->
        <div class="sticky inset-0" v-if="modalImage" :class="{'modal-container': modalImage}">
            <div v-if="true" class="modalCargarImg sm:mt-34 sm:m-4 md:mt-66 mt-66">          
                <span @click="modalImage = false" class="absolute  top-0 right-0">
                    <img  src="@/assets/img/close.png" class=" w-8 cursor-pointer sm:w-6 sm:h-6" />
                </span> 
                <div class="justify-center text-center block">            
                    <!-- /////////////////////////////////////////////////////////////////////
                    ////                         IMAGENES                             ////
                    ///////////////////////////////////////////////////////////////////// -->
                    <ImagenesAnexo 
                      :reporteDataInsertada="true"
                      :tipo="'Anexo'" 
                      :referenceNumber="this.lista_DTC_Filtrada[0].referenceNumber">
                    </ImagenesAnexo>
                    <button @click="enviar_header_diagnostico(false)" :disabled="blockBotonModal" class="botonIconCrear mt-6" :class="{'bg-gray-300 hover:text-black border-black hover:border-black cursor-not-allowed opacity-50': blockBotonModal, 'hover:bg-gray-300 hove:border-black': blockBotonModal }">
                        <img src="../../assets/img/add.png" class="mr-2" width="35" height="35" />
                        <span>Generar Anexo 1-B</span>
                    </button>  
                </div>
            </div>
        </div>
        
       
    </div>
</template>

<script>
import HeaderGenerico from "../../components/Header/HeaderGenerico.vue";
import TablaEquipoMalo from "../../components/Anexo/TablaEquipoMaloAnexo.vue";
import ImagenesAnexo from '../../components/ImagenesGenericas.vue';
import { Datetime } from 'vue-datetime';
import ServiceFiltrosDTC from "../../services/FiltrosDTCServices.js";
import ServiceReportPDF from "../../services/ReportesPDFService";

const API = process.env.VUE_APP_URL_API_PRODUCCION

    export default {
    name: "Anexo1-A",
    components:{
        HeaderGenerico,
        TablaEquipoMalo,
        Datetime,
        ImagenesAnexo
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
      listaSupervisor:[],
      listaTestigos:[], 
      plazadtc: [],
      nombrecarriles:[],
      testigoscompleto:[],
      componentesfinaleseditados:[],
      fechaapertura: '',
      foliooficio: '',
      fechaoficioinicio: '',
      blockBotonModal: false,
      modalImage: false,
      modalLoading: false,
      solciitud: '',
      solicitudfechainicio:'',
      selectsupervisor:'',
    };
    },
    created(){
      this.SupervisorDtc()
      this.TestigosDtc()
      this.filtro_dtc()
    },
    methods: {
      async filtro_dtc() {    
      let iddtc = this.$route.params.referencenumber;
      console.log(iddtc);
      try{
        let dtcfiltrado = await ServiceFiltrosDTC.filtrarDTC(this.filtroVista, ''  , '' , iddtc , undefined, false, undefined)
        this.lista_DTC_Filtrada = dtcfiltrado;
        console.log(this.lista_DTC_Filtrada);
        const months = ["ENERO", "FEBRERO", "MARZO","ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];
        let datesiniestro = new Date(this.lista_DTC_Filtrada[0].sinisterDate);
        let formatted_date = datesiniestro.getDate() + " DE " + months[datesiniestro.getMonth()] + " DE " + datesiniestro.getFullYear()
        console.log(formatted_date);
        this.fechasiniestro = formatted_date;
        let dataHeader = await this.$store.state.Login.listaHeaderDtcUser
        console.log(dataHeader);
        const result = dataHeader.filter(e => e.adminSquareId == this.lista_DTC_Filtrada[0].adminId);
        this.plazadtc  = result;
        console.log(this.plazadtc);  
      }
      catch (error) {
        console.log(error);
      } 
      
    },
    async TestigosDtc(){
      try {
        const data = await fetch(`${API}/AnexoDTC/Testigos/${this.$route.params.referenceSquare}/${this.$route.params.squareCatalogId}`)
        const objeto = await data.json();
        let resultado = objeto.result;
        this.testigoscompleto = resultado;
        console.log(resultado)
        let nombretestigos = [];
        resultado.forEach(e => nombretestigos.push(e.nombre));
        this.listaTestigos = nombretestigos; 
        console.log(this.listaTestigos);
      } catch (error) {
        console.log(error);
      }
    },
    async SupervisorDtc(){
      try {
        const data = await fetch(`${API}/AnexoDTC/Supervisor/${this.$route.params.referenceSquare}/${this.$route.params.squareCatalogId}`)
        const objeto = await data.json();
        let listaSupervisorprueba = objeto.result;
        console.log(listaSupervisorprueba)
        this.listaSupervisor = listaSupervisorprueba;
        console.log(this.listaSupervisor);
      } catch (error) {
        console.log(error);
      }
    },
    onagregarcomponentes(data) {
    let result = data.filter((item,index)=>{
      return data.indexOf(item) === index;
    })
      this.nombrecarriles = result;
      console.log(this.nombrecarriles);
     },
    onagregarnombrescomponentes(data) {
      let result = data.filter((item,index)=>{
      return data.indexOf(item) === index;
      })
      this.nombrecomponentes = result;
    },
    agregarcomponenteseditados(data){
      this.componentesfinaleseditados = data;
      console.log(this.componentesfinaleseditados);
    },
    async insertaranexo(){
      this.modalImage = true
      let Anexo = {
          "DTCReference": this.lista_DTC_Filtrada[0].referenceNumber,
          "AnexoReference": "",
          "FechaApertura": this.fechaapertura,
          "FechaCierre": this.fechacierre,
          "Solicitud": this.solciitud,
          "FechaSolicitudInicio" : this.solicitudfechainicio,
          "FolioOficio": this.foliooficio,
          "FechaOficioInicio": this.fechaoficioinicio,
          "SupervisorId": this.selectsupervisor,
          "Testigo1Id": this.testigo1,
          "Testigo2Id": this.testigo2,
          "TipoAnexo": "B",
          "ComponentesAnexo":this.componentesfinaleseditados  
       }
       console.log(Anexo);
      try
      {
        this.$http.post(`${API}/AnexoDTC/${this.$route.params.referenceSquare}/false`,Anexo)
        .then((response) => {
          console.log(response.data.result);
          let refenciaanexo = response.data.result;
          let subversion = false;
          ServiceReportPDF.generar_pdf_anexoB(this.lista_DTC_Filtrada[0].referenceNumber,refenciaanexo,subversion);
        })
        .catch((error) => {
          console.log(error);
        })
        console.log("Se envio correctamente el anexo");
      }catch(error){
        console.error(error)
      }
     },
     vervalordelselect(){
       
       console.log(this.testigo1)
       console.log(this.testigo2)
       
     },
      

    }
    }
</script>
