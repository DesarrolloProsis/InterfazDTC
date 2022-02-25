<template>
<div>
    <div class="container mx-auto">
        <HeaderGenerico :titulo="'ACTA ADMINISTRATIVA INFORMATIVA (ENTREGA-RECEPCIÓN)'" :subtitulo="'FORMATO 1-A'" :tipo="'anexo1A'" />
        <div class="mt-1 mb-1 text-sm flex flex-col leading-7 sm:block sm:p-1 sm:pr-2 sm:text-xs border sm:m-1 shadow-md md:w-auto text-justify p-6">
        <p class="">SE LEVANTA LA PRESENTE ACTA,
        PARA HACER CONSTAR EL SERVICIO DE MANTENIMIENTO <label class="font-bold">CORRECTIVO (SINIESTRO, ACCIDENTE VEHICULAR, DESCARGA ELÉCTRICA, ETC.)</label> 
        </p>
        <p>
        REALIZADO AL EQUIPO DE CONTROL DE TRANSITO DE <label class="font-bold">CARRIL A09</label>, 
        EN LA PLAZA DE COBRO <label class="font-bold"> No. {{this.plazadtc[0].plaza.toUpperCase() }},</label>
        PERTENECIENTE A LA <label class="font-bold">{{this.plazadtc[0].regionalCoordination.toUpperCase() }}</label>
        </p>
        <p>
        EN LA CIUDAD DE <label class="font-bold ml-1">PALO BLANCO, GUERRERO</label>, SIENDO 
        <datetime class="ml-2 inline-flex" use12-hour type="datetime" name="HoraInicio" input-class="inputanexo"></datetime>
        EL <label class="font-bold">{{this.plazadtc[0].adminName.toUpperCase() }}</label> ADMINISTRADOR DE LA PLAZA DE COBRO, EL<label class="font-bold"> {{this.lista_DTC_Filtrada[0].name.toUpperCase() }}</label>, TÉCNICO REPRESENTANTE DE LA EMPRESA <label class="font-bold">PROYECTOS Y SISTEMAS INFORMATICOS S.A. DE C.V.</label> 
        TENIENDO COMO TESTIGOS DE ASISTENCIA A:
        </p>
        <div class="flex w-full gap-4 p-2">
          <multiselect
            v-model="testigo1"                                                    
            :close-on-select="false"
            :clear-on-select="true"
            :hideSelected="false"                               
            placeholder="Selecciona un testigo"
            :options="listaTestigos"
            :multiple="false"      
            select-label=""
            class="w-full"                 
            >
          </multiselect>
          <multiselect
            v-model="testigo2"                                                 
            :close-on-select="false"
            :clear-on-select="true"
            :hideSelected="false"
            placeholder="Selecciona un testigo"
            :options="listaTestigos"
            :multiple="false"      
            select-label=""
            class="w-full"                 
            >
          </multiselect>
        </div>
        <p class="">
        PARA HACER CONSTAR QUE LA FALLA DEL EQUIPO DEL <span class="font-bold">CARRIL A02, CARRIL A07</span>,REPORTADA CON No. DE ACUSE / FOLIO <span class="font-bold">403</span>, DE FECHA <span class="font-bold">13 DE JUNIO DE 2021</span>; FUE REPARADA
        EL DÍA <datetime v-model="date" class="inline-flex" input-class="inputanexo"></datetime>, DICHA FALLA CONSISTIÓ EN DAÑO A COMPONENTE
        (<span class="font-bold">BARRERA DE SALIDA COMPLETA, INCLUYE PLUMA DE CARBONO 3.30 MTS.</span>) Y FUÉ PROVOCADA POR <span class="font-bold">{{this.lista_DTC_Filtrada[0].diagnosis.toUpperCase() }}</span>, OCURRIDO EL 
        <span class="font-bold">{{this.fechasiniestro}}</span>; PARA 
        CUYO EFECTO FUÉ NECESARIO REPONER LAS PARTES QUE A CONTINUACIÓN SE DETALLAN.
        </p>
        <p class="text-sm">
        LOS EQUIPOS/COMPONENTES DAÑADOS QUEDAN BAJO RESGUARDO DEL ADMINISTRADOR DEBIÉNDOSE IDENTIFICAR CON EL No. SINIESTRO Y FECHA;
        ESPERAR AVISO DE LA GERENCIA DE SEGUROS A QUE LA ASEGURADORA EMITA EL CHEQUE (REEMBOLSO) QUEDANDO LOS EQUIPOS Y COMPONENTES A DISPOSICIÓN DE LA ASEGURADORA DE NO RECOGERLOS EN UN PLAZO DE 30 DÍAS, 
        LA SUBGERENCIA DE ALMACENES E INVENTARIOS INSTRUIRÁ EL DESTINO FINAL CONFORME LA NORMA
        </p>
        <p class="text-sm">
        LOS TRABAJOS, INSTALACIÓN Y OPERACIÓN DE LA PLAZA DE COBRO QUEDAN A ENTERA SATISFACCIÓN DEL ADMINISTRADOR DE LA PLAZA DE COBRO Y/O ENCARGADO DE TURNO.
        <span class="font-bold">NO. SINIESTRO</span> Y/O <span class="font-bold">NO. DE REPORTE 04</span> DE FECHA <span class="font-bold">13 DE JUNIO DE 2021.</span>
        </p>
        <h3 class="font-bold text-sm mt-2">COMPONENTES Y/O REFACCIONES DAÑADAS:</h3>
        <TablaEquipoMalo :listaComponentes="listaComponentes" :dateSinester="datosSinester.SinisterDate"/>
        <p class="mb-4">SE CIERRA LA PRESENTE ACTA EN FECHA <datetime class="ml-2 inline-flex" use12-hour type="datetime" name="HoraInicio" input-class="inputanexo"></datetime></p>
        <p class="mb-2">ENCARGADO DE PLAZA: 
          <select class="shadow appearance-none border rounded text-gray-700 leading-tight text-center">
          <option value="">Selecciona un supervisor de plaza</option>
          <option value="" v-for="supervisor in listaSupervisor" :key="supervisor.id">{{supervisor.nombre}}</option>
          </select>
        </p>
        <div class="p-2 mb-10 sm:mb-18 flex justify-center w-full">
            <button @click="modalImage = true" class="botonIconCrear" :class="{'CrearDeshabilitado' :modalLoading,'bg-gray-300 hover:text-black border-black hover:border-black cursor-not-allowed opacity-50': modalLoading, 'hover:bg-gray-300 hove:border-black': modalLoading}" :disabled="modalLoading">
              <img src="@/assets/img/add.png" class="mr-2" width="35" height="35" />
              <span>Insertar Anexo 1-A</span>
            </button>
        </div>
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
                    <ImagenesAnexo @bloquear-boton-diagnostico="bloquear_boton_diagnostioc_img" :reporteDataInsertada="true" :tipo="'Diagnostico'" :referenceNumber="''"></ImagenesAnexo>
                    <button @click="enviar_header_diagnostico(false)" :disabled="blockBotonModal" class="botonIconCrear mt-6" :class="{'bg-gray-300 hover:text-black border-black hover:border-black cursor-not-allowed opacity-50': blockBotonModal, 'hover:bg-gray-300 hove:border-black': blockBotonModal }">
                        <img src="../../assets/img/add.png" class="mr-2" width="35" height="35" />
                        <span>Generar Anexo 1-A</span>
                    </button>  
                </div>
            </div>
        </div>
</div>
</template>

<script>
import HeaderGenerico from "../../components/Header/HeaderGenerico.vue";
import TablaEquipoMalo from "../../components/Anexo/TablaEquipoMaloAnexo.vue";
import ImagenesAnexo from '../../components/ImagenesGenericas.vue'
import { Datetime } from 'vue-datetime';
import Multiselect from "vue-multiselect";
import ServiceFiltrosDTC from "../../services/FiltrosDTCServices.js";

const API = process.env.VUE_APP_URL_API_PRODUCCION

    export default {
    name: "Anexo1-A",
    components:{
        HeaderGenerico,
        TablaEquipoMalo,
        Datetime,
        Multiselect,
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
      fechasiniestro: '',
      modalImage: false,  
      modalLoading: false,
      listaTestigos:[],
      listaSupervisor:[],
      dtc_filtrado:[],
      listaPlazas:[],
      plazadtc: [],
    };
    },
    created() {
      this.TestigosDtc();
      this.SupervisorDtc();
      this.filtro_dtc();
    },
   methods: {
     async TestigosDtc(){
      try {
        const data = await fetch(`${API}/AnexoDTC/Testigos/${this.$route.params.referenceSquare}/${this.$route.params.squareCatalogId}`)
        const objeto = await data.json();
        let resultado = objeto.result;
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
   },
  }
</script>
