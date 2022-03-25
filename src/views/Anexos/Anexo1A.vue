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
          v-model="fechaapertura"
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
              <select class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" :class="{ 'border border-red-500': vtestigo1, 'border border-gray-400' : !vtestigo1 }" v-model="testigo1" @change="cambiarvalort1()">
                <option value="">Selecciona a un testigo</option>
                <option :value="testigo.id" v-for="testigo in testigoscompleto" :key="testigo.id">{{testigo.nombre}}</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
          </div>
          <div class="inline-block relative w-full">
              <select class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" :class="{ 'border border-red-500': vtestigo2, 'border border-gray-400' : !vtestigo2 }" v-model="testigo2" @change="cambiarvalort2()">
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
        EL DÍA <datetime v-model="fechaapertura" class="inline-flex"
         input-class="inputanexo" 
         :format="{ year: 'numeric', month: 'long', day: 'numeric' }"
         :min-datetime="this.fechaapertura"
         value-zone="America/Mexico"
         disabled
         ></datetime>, DICHA FALLA CONSISTIÓ EN DAÑO A COMPONENTE
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
          :Editar="false"
          :plazareferencia="this.$route.params.referenceSquare" 
          :dtcreference="this.$route.params.referencenumber"
          @listacarriles = "onagregarcomponentes"
          @listanombrecom = "onagregarnombrescomponentes"
          @componentesfinales = "agregarcomponenteseditados"
        />
        <p class="mb-2">SUPERVISOR DE PLAZA
        </p>
        <div class="inline-block relative w-full">
              <select class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
               :class="{ 'border border-red-500': vsuperior, 'border border-gray-400' : !vsuperior }" 
               v-model="selectsupervisor"
               @change="cambiarvalorsupervisor()">
                <option value="">Selecciona un supervisor de plaza</option>
                <option :value="supervisor.id" v-for="supervisor in listaSupervisor" :key="supervisor.id">{{supervisor.nombre}}</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
        </div>
        <div class="inline-flex mt-4">
            <p class="mr-2">SE CIERRA LA PRESENTE ACTA EN FECHA</p>
            <datetime v-model="fechaapertura" class="inline-flex" input-class="inputanexo" disabled></datetime>
            <p class="ml-2">,SIENDO LAS</p>
            <datetime type="time" v-model="time" class="inline-flex ml-2" input-class="inputanexo"></datetime>
        </div>
        <div class="p-2 mb-10 sm:mb-18 flex justify-center w-full">
            <button @click="validacionanexo()" class="botonIconCrear" :class="{'CrearDeshabilitado' :modalLoading,'bg-gray-300 hover:text-black border-black hover:border-black cursor-not-allowed opacity-50': modalLoading, 'hover:bg-gray-300 hove:border-black': modalLoading}" :disabled="modalLoading">
              <img src="@/assets/img/add.png" class="mr-2" width="35" height="35" />
              <span>Insertar Anexo 1-A</span>
            </button>
        </div>
        </div>
    </div>
    <!--/////////////////////////////////////////////////////////////////////
    ////                     MODAL ADVERTENCIAS                       /////
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
                      @bloquear-boton-diagnostico="bloquear_boton_anexo_img">
                    </ImagenesAnexo>
                    <button @click="insertaranexo()" :disabled="blockBotonModal" class="botonIconCrear mt-6" :class="{'bg-gray-300 hover:text-black border-black hover:border-black cursor-not-allowed opacity-50': blockBotonModal, 'hover:bg-gray-300 hove:border-black': blockBotonModal }">
                        <img src="../../assets/img/add.png" class="mr-2" width="35" height="35" />
                        <span>Generar Anexo 1-A</span>
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
                <h1 class="text-xl text-center font-bold">DATOS COMPLETOS</h1>
                <div class="text-justify mt-3 sm:mt-0 sm:ml-4 sm:text-left">
                  <div class="mt-2">
                    <p class="">los datos de tu anexo son los siguientes:</p>
                  </div>
                  <div>
                    <ul class="mt-3 list-disc list-inside text-justify">
                        <li>DTC: {{this.lista_DTC_Filtrada[0].referenceNumber}}</li>
                        <li>Fecha de apertura: {{this.fechaaperturaformateada}}</li>
                        <li>Fecha de cierre: {{this.fechacierreformateada}}</li>
                        <li>Tipo de Anexo: 1-A</li>
                      </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex gap-4 bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm" @click="pasarinsertaranexo()">Confirmar</button>
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
import TablaEquipoMalo from "../../components/Anexo/TablaEquipoMaloAnexo.vue";
import ImagenesAnexo from '../../components/ImagenesGenericas.vue'
import { Datetime } from 'vue-datetime';
import ServiceFiltrosDTC from "../../services/FiltrosDTCServices.js";
import ServiceReportPDF from "../../services/ReportesPDFService";
import Modal from "../../components/ModalGenerico.vue";
import { ExclamationIcon,CheckCircleIcon,DownloadIcon } from '@vue-hero-icons/outline';
import moment from 'moment'



const API = process.env.VUE_APP_URL_API_PRODUCCION

    export default {
    name: "Anexo1-A",
    components:{
        HeaderGenerico,
        TablaEquipoMalo,
        datetime: Datetime,
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
      testigoscompleto:[],
      idtestigos:0,
      blockBotonModal: false,
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
      horacierre: "",
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
        this.testigoscompleto = resultado;
        console.log(this.testigoscompleto);
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
      const formateadorapertura = moment(this.fechaapertura.substring(0, 50)).format("YYYY-MM-DD HH:mm:ss"); 
      const formateadorcierre = moment(this.fechacierre.substring(0, 50)).format("YYYY-MM-DD HH:mm:ss"); 
      let Anexo = {
          "DTCReference": this.lista_DTC_Filtrada[0].referenceNumber,
          "AnexoReference": "",
          "FechaApertura": formateadorapertura,
          "FechaCierre": formateadorcierre,
          "Solicitud": "",
          "FechaSolicitudInicio" : null,
          "FolioOficio": "",
          "FechaOficioInicio": null,
          "SupervisorId": this.selectsupervisor,
          "Testigo1Id": this.testigo1,
          "Testigo2Id": this.testigo2,
          "TipoAnexo": "A",
          "ComponentesAnexo":this.componentesfinaleseditados  
       }
       console.log(Anexo);
      try
      {
        this.$http.post(`${API}/AnexoDTC/${this.$route.params.referenceSquare}/false`,Anexo)
        .then((response) => {
          this.modalImage = false;
          this.modaldescarga = true;
          console.log(response.data.result);
          let refenciaanexo = response.data.result;
          let subversion = false;
          ServiceReportPDF.generar_pdf_anexoA(this.lista_DTC_Filtrada[0].referenceNumber,refenciaanexo,subversion);
          ServiceReportPDF.reporte_fotografico_anexo(this.lista_DTC_Filtrada[0].referenceNumber,refenciaanexo);
          setTimeout(() => {
            this.$router.push('/home');
            document.querySelector('body').classList.remove('overflow-hidden'); 
          },3000)
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
     validacionanexo(){
      console.log(this.fechaapertura)
      let fechaapertura = new Date(this.fechaapertura);
      let horadecierre = new Date(this.time);
      var hora = horadecierre.getHours() + ':' + horadecierre.getMinutes() + ':' + horadecierre.getSeconds();
      var fecha = fechaapertura.getFullYear()+ '-' + fechaapertura.getMonth() + '-' + fechaapertura.getDate();
      let fechacierra = fecha + ' ' + hora;
      var fechacierrefinal = new Date(fechacierra);
      this.fechacierre = fechacierrefinal.toISOString();
      console.log(this.fechacierre);
      let hoy = Date.now();
      if(this.fechaapertura == ""){
        this.errores.push("La fecha de apertura esta vacia")
        this.vfechaapertura = true
      }
      if(this.fechacierre == ""){
        this.errores.push("La fecha de cierre esta vacia")
        this.vfechacierre = true
      }
      if(this.testigo1 == ""){
        this.errores.push("Debes seleccionar el primer testigo")
        this.vtestigo1 = true
      }
      if(this.testigo2 == ""){
        this.errores.push("Debes seleccionar el segundo testigo")
        this.vtestigo2 = true
      }
      if(this.testigo1 == this.testigo2){
        this.errores.push("Los Testigos no pueden ser los mismos")
        this.vtestigo1 = true
        this.vtestigo2 = true
      }
      if(this.selectsupervisor == ""){
        this.errores.push("Tienes que seleccionar un supervisor de la plaza")
        this.vsuperior = true
       }
       if (this.componentesfinaleseditados.length == 0) {
         this.errores.push("Tienes que seleccionar por lo menos 1 componente")
       }
        if (this.componentesfinaleseditados.length == 0) {
         this.errores.push("Edita el numero de serie faltante del componente")
        }
       if(fechaapertura > hoy){
         this.errores.push("La fecha de apertura no debe ser mayor al dìa de hoy");
       }
       const months = ["ENERO", "FEBRERO", "MARZO","ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];
        let dateapertura = new Date(this.fechaapertura);
        let formatted_date_apertura = dateapertura.getDate() + " DE " + months[dateapertura.getMonth()] + " DE " + dateapertura.getFullYear() + ' A LAS ' + dateapertura.getHours() + ':' + dateapertura.getMinutes() + ':' + dateapertura.getSeconds()
        console.log(formatted_date_apertura);
        let datecierre = new Date(this.fechacierre);
        let formatted_date_cierre = datecierre.getDate() + " DE " + months[datecierre.getMonth()+1] + " DE " + datecierre.getFullYear() + ' A LAS ' + horadecierre.getHours() + ':' + horadecierre.getMinutes() + ':' + horadecierre.getSeconds()
        console.log(formatted_date_apertura);
        this.fechaaperturaformateada = formatted_date_apertura;
        this.fechacierreformateada = formatted_date_cierre;
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
     pasarinsertaranexo(){
       this.modalconfirmacionanexo=false;
       this.modalImage = true;
     },
     saliranexos(){
     this.modaldescarga = false;
     this.modalconfirmacionanexo=false;
     this.modalImage = false;
     this.modalvalidacionanexo = false;
     this.$router.push('/home');
     document.querySelector('body').classList.remove('overflow-hidden'); 
     },
     bloquear_boton_anexo_img(value){
        this.blockBotonModal = value;
    },
    cambiohoracierre(){
      console.log(this.time)
    }
   },
   
  }
</script>
