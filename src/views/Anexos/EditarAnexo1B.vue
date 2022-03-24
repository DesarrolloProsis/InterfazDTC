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
        <datetime class="ml-2 inline-flex"
        use12-hour
        v-model="this.anexo.fechaApertura"
        type="datetime"
        name="HoraInicio" 
        input-class="inputanexo"></datetime>
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
        PARA HACER CONSTAR QUE LA SUSTITUCIÓN DE COMPONENTES DEL EQUIPO DEL <span class="font-bold">CARRIL {{this.nombrecarriles.toString()}}</span>,
        DE ACUERDO A LA SOLICITUD <input type="text" v-model="this.anexo.solicitud" placeholder="URC-SOC.2314-2021" class="inputanexo">, 
        DE FECHA <datetime v-model="this.anexo.fechaSolicitudInicio" class="inline-flex" input-class="inputanexo"></datetime>, Y AUTORIZADA EN OFICIO <input type="text" v-model="this.anexo.folioOficio" placeholder="DO/3741/2021" class="inputanexo">
        DE FECHA <datetime v-model="this.anexo.fechaOficioInicio" class="inline-flex" input-class="inputanexo"></datetime> POR LA GERENCIA DE MANTENIMIENTO Y MODERNIZACIÓN DE EQUIPOS DE PEAJE; PARA CUYO EFECTÓ FUÉ NECESARIO REPONER EN FECHA
        <datetime v-model="this.anexo.fechaApertura" class="inline-flex" input-class="inputanexo" disabled></datetime> LAS PARTES QUE A CONTINUACIÓN SE DETALLAN.
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
                      @bloquear-boton-diagnostico="bloquear_boton_anexo_img"
                      >
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
                <h1 class="text-xl text-center font-bold">UUUPPPSSSS NO PODEMOS CONTINUAR!!!</h1>
                <div class="text-justify mt-3 sm:mt-0 sm:ml-4 sm:text-left">
                  <div class="mt-2">
                    <p class="">No puedes generar aun tu anexo debes llenar los campos faltantes:</p>
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
                <h1 class="text-xl text-center">LISTO TU ANEXO CON REFERENCIA <b>{{this.lista_DTC_Filtrada[0].referenceNumber}}</b> YA SE GENERO</h1>
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
import ServiceReportPDF from "../../services/ReportesPDFService";
import Modal from "../../components/ModalGenerico.vue";
import { ExclamationIcon,CheckCircleIcon,DownloadIcon } from '@vue-hero-icons/outline';


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
    };
    },
    created(){
      this.filtro_dtc()
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
     },
     async insertaranexo(){
      this.modalImage = true
      let Anexo = {
          "DTCReference": this.anexo.dtcReference,
          "AnexoReference": this.$route.params.anexoReference,
          "FechaApertura": this.anexo.fechaApertura,
          "FechaCierre": this.anexo.fechaCierre,
          "Solicitud": this.anexo.solicitud,
          "FechaSolicitudInicio" : this.anexo.fechaSolicitudInicio,
          "FolioOficio": this.anexo.folioOficio,
          "FechaOficioInicio": this.anexo.fechaOficioInicio,
          "SupervisorId": this.anexo.supervisorId,
          "Testigo1Id": this.anexo.testigo1Id,
          "Testigo2Id": this.anexo.testigo2Id,
          "TipoAnexo": "B",
          "ComponentesAnexo":this.componentesfinaleseditados  
       }
       console.log(Anexo);
      try
      {
        this.$http.post(`${API}/AnexoDTC/${this.lista_DTC_Filtrada[0].referenceSquare}/true`,Anexo)
        .then((response) => {
          this.modalImage = false;
          this.modaldescarga = true;
          console.log(response.data.result);
          let subversion = true;
          ServiceReportPDF.generar_pdf_anexoB(this.lista_DTC_Filtrada[0].referenceNumber,this.$route.params.anexoReference,subversion);
          ServiceReportPDF.reporte_fotografico_anexo(this.lista_DTC_Filtrada[0].referenceNumber,this.$route.params.anexoReference);
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
     bloquear_boton_anexo_img(value){
        this.blockBotonModal = value
    },
    validacionanexo(){
      if(this.anexo.fechaApertura == ""){
        this.errores.push("La fecha de apertura esta vacia")
      }
      if(this.anexo.fechaCierre == ""){
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
      if(this.anexo.supervisorId == ""){
        this.errores.push("Tienes que seleccionar un supervisor de la plaza")
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
         console.log(this.componentesfinaleseditados);
       }
       let fechaapertura = new Date(this.anexo.fechaApertura);
       let hoy = Date.now();
       if(fechaapertura > hoy){
         this.errores.push("La fecha de apertura no debe ser mayor al dìa de hoy");
       }
       const months = ["ENERO", "FEBRERO", "MARZO","ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];
        let dateapertura = new Date(this.anexo.fechaApertura);
        let formatted_date_apertura = dateapertura.getDate() + " DE " + months[dateapertura.getMonth()] + " DE " + dateapertura.getFullYear()
        console.log(formatted_date_apertura);
        
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
     this.$router.push('/home');
     document.querySelector('body').classList.remove('overflow-hidden'); 
     },
    }
    }
</script>
