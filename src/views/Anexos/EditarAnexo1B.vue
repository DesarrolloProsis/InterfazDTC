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
        <datetime class="ml-2 inline-flex" use12-hour type="datetime" name="HoraInicio" input-class="inputanexo"></datetime>
        EL <label class="font-bold">{{this.plazadtc[0].adminName.toUpperCase() }}</label> ADMINISTRADOR DE LA PLAZA DE COBRO, EL<label class="font-bold"> {{this.lista_DTC_Filtrada[0].name.toUpperCase() }}</label>, TÉCNICO REPRESENTANTE DE LA EMPRESA <label class="font-bold">PROYECTOS Y SISTEMAS INFORMATICOS S.A. DE C.V.</label> 
        TENIENDO COMO TESTIGOS DE ASISTENCIA A:
        </p>
        <div class="flex w-full gap-4 p-2">
             <multiselect
                :disabled="blockInput"
                :value="testigoscompleto.id"
                v-model="testigo1"  
                :custom-label="label_multi_select"                                                  
                :close-on-select="true"
                :clear-on-select="true"
                :hideSelected="false"                               
                placeholder="Selecciona un testigo"
                :options="listaTestigos"
                select-label=""
                class="w-full"                 
                >
        </multiselect>
        <multiselect
                :disabled="blockInput"
                :value="testigoscompleto.id"
                v-model="testigo2"  
                :custom-label="label_multi_select"                                                  
                :close-on-select="true"
                :clear-on-select="true"
                :hideSelected="false"
                placeholder="Selecciona un testigo"
                :options="listaTestigos"
                select-label=""
                class="w-full"                 
                >
        </multiselect>
        </div>
        <p class="">
        PARA HACER CONSTAR QUE LA SUSTITUCIÓN DE COMPONENTES DEL EQUIPO DEL <span class="font-bold">CARRIL {{this.nombrecarriles.toString()}}</span>,
        DE ACUERDO A LA SOLICITUD <input type="text" placeholder="URC-SOC.2314-2021" class="inputanexo">, 
        DE FECHA <datetime v-model="date" class="inline-flex" input-class="inputanexo"></datetime> FUE REPARADA
        EL DÍA <datetime v-model="date" class="inline-flex" input-class="inputanexo"></datetime>, Y AUTORIZADA EN OFICIO <input type="text" placeholder="DO/3741/2021" class="inputanexo">
        DE FECHA <datetime v-model="date" class="inline-flex" input-class="inputanexo"></datetime> POR LA GERENCIA DE MANTENIMIENTO Y MODERNIZACIÓN DE EQUIPOS DE PEAJE; PARA CUYO EFECTÓ FUÉ NECESARIO REPONER EN FECHA
        <datetime v-model="date" class="inline-flex" input-class="inputanexo"></datetime> LAS PARTES QUE A CONTINUACIÓN SE DETALLAN.
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
        @listacarriles = "onagregarcomponentes"
        ></TablaEquipoMalo>
        <p class="mb-4">SE CIERRA LA PRESENTE ACTA EN FECHA <datetime class="ml-2 inline-flex" use12-hour type="datetime" name="HoraInicio" input-class="inputanexo"></datetime></p>
        <p class="mb-2">SUPERVISOR DE PLAZA: 
          <select class="shadow appearance-none border rounded text-gray-700 leading-tight text-center">
          <option value="">Selecciona un supervisor de plaza</option>
          <option value="" v-for="supervisor in listaSupervisor" :key="supervisor.id">{{supervisor.nombre}}</option>
          </select>
        </p>
        <div class="p-2 mb-10 sm:mb-18 flex justify-center w-full">
            <button @click="dtc_validaciones(2)" class="botonIconCrear" :class="{'CrearDeshabilitado' :modalLoading,'bg-gray-300 hover:text-black border-black hover:border-black cursor-not-allowed opacity-50': modalLoading, 'hover:bg-gray-300 hove:border-black': modalLoading}" :disabled="modalLoading">
              <img src="@/assets/img/add.png" class="mr-2" width="35" height="35" />
              <span>Generar anexo 1-B</span>
            </button>
        </div>
        </div>
        
       
    </div>
</template>

<script>
import HeaderGenerico from "../../components/Header/HeaderGenerico.vue";
import TablaEquipoMalo from "../../components/Anexo/TablaEquipoMaloAnexo.vue";
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

    }
    }
</script>
