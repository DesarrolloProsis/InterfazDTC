<template>
<div>
    <div class="container mx-auto">
        <HeaderGenerico :titulo="'ACTA ADMINISTRATIVA INFORMATIVA (ENTREGA-RECEPCIÓN)'" :subtitulo="'FORMATO 1-A'" :tipo="'anexo1A'" />
        <div class="mt-1 mb-1 text-sm flex flex-col leading-7 sm:block sm:p-1 sm:pr-2 sm:text-xs border sm:m-1 shadow-md md:w-auto text-justify p-6">
        <p class="">SE LEVANTA LA PRESENTE ACTA,
        PARA HACER CONSTAR EL SERVICIO DE MANTENIMIENTO <label class="font-bold">CORRECTIVO (SINIESTRO, ACCIDENTE VEHICULAR, DESCARGA ELÉCTRICA, ETC.)</label> 
        </p>
        <p>
        REALIZADO AL EQUIPO DE CONTROL DE TRANSITO DE <label class="font-bold">CARRIL {{this.nombrecarriles.toString()}}</label>, 
        EN LA PLAZA DE COBRO <label class="font-bold"> No. {{this.plazadtc[0].plaza.toUpperCase() }},</label>
        PERTENECIENTE A LA <label class="font-bold">{{this.plazadtc[0].regionalCoordination.toUpperCase() }}</label>
        </p>
        <p>
        EN LA CIUDAD DE <label class="font-bold ml-1">PALO BLANCO, GUERRERO</label>, SIENDO 
        <datetime class="ml-1 inline-flex" use12-hour 
          v-model="this.anexo.fechaApertura"
          type="datetime"
          name="HoraInicio" 
          input-class="inputanexo" 
          :format="{ year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZoneName: 'short' }"
          >
        </datetime>
        EL <label class="font-bold">{{this.plazadtc[0].adminName.toUpperCase() }}</label> ADMINISTRADOR DE LA PLAZA DE COBRO, EL<label class="font-bold"> {{this.lista_DTC_Filtrada[0].name.toUpperCase() }}</label>, TÉCNICO REPRESENTANTE DE LA EMPRESA <label class="font-bold">PROYECTOS Y SISTEMAS INFORMATICOS S.A. DE C.V.</label> 
        TENIENDO COMO TESTIGOS DE ASISTENCIA A:
        </p>
        <div class="flex w-full gap-4 p-2">
          <div class="inline-block relative w-full">
              <select class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" v-model="this.anexo.testigo1Id" @change="vervalordelselect">
                <option value="">Selecciona a un testigo</option>
                <option :value="testigo.id" v-for="testigo in testigoscompleto" :key="testigo.id">{{testigo.nombre}}</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
          </div>
          <div class="inline-block relative w-full">
              <select class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" v-model="this.anexo.testigo2Id" @change="vervalordelselect">
                <option value="">Selecciona a un testigo</option>
                <option :value="testigo.id" v-for="testigo in testigoscompleto" :key="testigo.id">{{testigo.nombre}}</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
          </div>
        </div>
        <p class="">
        PARA HACER CONSTAR QUE LA FALLA DEL EQUIPO DEL <span class="font-bold">CARRIL {{this.nombrecarriles.toString()}}</span>,REPORTADA CON No. DE ACUSE / FOLIO <span class="font-bold">{{this.lista_DTC_Filtrada[0].failureNumber }}</span>, DE FECHA <span class="font-bold">{{this.fechasiniestro}}</span>; FUE REPARADA
        EL DÍA <datetime v-model="this.anexo.fechaCierre" class="inline-flex" input-class="inputanexo" :format="{ year: 'numeric', month: 'long', day: 'numeric' }"></datetime>, DICHA FALLA CONSISTIÓ EN DAÑO A COMPONENTE
        <span class="font-bold">{{this.nombrecomponentes.toString()}}</span> Y FUÉ PROVOCADA POR <span class="font-bold">{{this.lista_DTC_Filtrada[0].diagnosis.toUpperCase() }}</span>, OCURRIDO EL 
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
        <span class="font-bold">NO. SINIESTRO</span> Y/O <span class="font-bold">NO. DE REPORTE {{this.lista_DTC_Filtrada[0].failureNumber }}</span> DE FECHA <span class="font-bold">{{this.fechasiniestro}}</span>
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
        />
        <p class="mb-2">SUPERVISOR DE PLAZA
        </p>
        <div class="inline-block relative w-full">
              <select class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" v-model="this.anexo.supervisorId">
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
              <span>Editar Anexo 1-A</span>
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
                    <ImagenesAnexo 
                      :reporteDataInsertada="true"
                      :tipo="'Diagnostico'" 
                      :referenceNumber="''">
                    </ImagenesAnexo>
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
import TablaEquipoMalo from "../../components/Anexo/TablaEditarEquipoMaloAnexo.vue";
import ImagenesAnexo from '../../components/ImagenesGenericas.vue'
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
      testigoscompleto:[],
      idtestigos:0,
      blockBotonModal: false,
      anexo: {},
      objetocomponentesanexosaeditar:[],
      arraycomponentes:[],
      componenteseditadostraidos:[],
    };
    },
    created() {
      this.filtro_dtc();
    }, 
   methods: {
    async filtro_dtc() {    
      let iddtc = this.$route.params.dtcReference;
      console.log(iddtc);
      let referenciaanexo = this.$route.params.anexoReference; 
      console.log(referenciaanexo)
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
        const datasupervisor = await fetch(`${API}/AnexoDTC/Supervisor/${this.lista_DTC_Filtrada[0].referenceSquare}/${this.lista_DTC_Filtrada[0].squareCatalogId}`)
        const objetosupervisor = await datasupervisor.json();
        let listaSupervisorprueba = objetosupervisor.result;
        console.log(listaSupervisorprueba)
        this.listaSupervisor = listaSupervisorprueba;
        console.log(this.listaSupervisor);
        const datatestigo = await fetch(`${API}/AnexoDTC/Testigos/${this.lista_DTC_Filtrada[0].referenceSquare}/${this.lista_DTC_Filtrada[0].squareCatalogId}`)
        const objetotestigo = await datatestigo.json();
        let resultado = objetotestigo.result;
        console.log(resultado)
        this.testigoscompleto = resultado;
        console.log(this.testigoscompleto);
        const dataanexo = await fetch(`${API}/AnexoDTC/HeaderAnexo/${this.lista_DTC_Filtrada[0].referenceSquare}/${referenciaanexo}`)
        const anexo = await dataanexo.json()
        let objetoresultadoanexo = anexo.result;
        this.anexo = objetoresultadoanexo[0];
        console.log(this.anexo)
        const componentesanexo = await fetch(`${API}/AnexoDTC/HistoricoComponetesAnexo/${this.lista_DTC_Filtrada[0].referenceSquare}/${referenciaanexo}`) 
        const canexos = await componentesanexo.json();
        let objetocomponentesanexo = canexos.result;
        this.objetocomponentesanexosaeditar = objetocomponentesanexo;
        const data = await fetch(`${API}/AnexoDTC/ComponentesRequest/${this.lista_DTC_Filtrada[0].referenceSquare}/${this.$route.params.dtcReference}`)
        const objeto = await data.json();
        this.arraycomponentes = objeto.result;
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
          "DTCReference": this.anexo.dtcReference,
          "AnexoReference": this.anexo.anexoReference,
          "FechaApertura": this.anexo.fechaApertura,
          "FechaCierre": this.anexo.fechaCierre,
          "Solicitud": this.anexo.solicitud,
          "FechaSolicitudInicio" : this.anexo.fechaSolicitudInicio,
          "FolioOficio": this.anexo.folioOficio,
          "FechaOficioInicio": this.anexo.fechaOficioInicio,
          "SupervisorId": this.anexo.supervisorId,
          "Testigo1Id": this.anexo.testigo1Id,
          "Testigo2Id": this.anexo.testigo2Id,
          "TipoAnexo": "A",
          "ComponentesAnexo":this.componentesfinaleseditados  
       }
       console.log(Anexo);
      try
      {
        this.$http.post(`${API}/AnexoDTC/${this.lista_DTC_Filtrada[0].referenceSquare}/true`,Anexo)
        .then((response) => {
          console.log(response.data.result);
          let subversion = true;
          ServiceReportPDF.generar_pdf_anexoA(this.lista_DTC_Filtrada[0].referenceNumber,this.anexo.anexoReference,subversion);
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
     filtrarcomponentes(componenteseditados,componentestotales){
       console.log(componenteseditados);
       console.log(componentestotales);
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
     } 
   },
   
  }
</script>
