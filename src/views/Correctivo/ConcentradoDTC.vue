<template>
<div>
    <Nav></Nav>
    <div class="flex justify-center">
        <div class="grid gap-4 grid-cols-1 py-3 px-3">                
        <!-- <Generico :titulo="'CONCENTRADO DTC'" :tipo="'DTC'"></Generico>  -->
          <h1 class="text-black text-center text-4xl mt-3 mb-1 sm:mb-1 sm:text-2xl font-bold">Autorizado GMMEP</h1>
        <!--/////////////////////////////////////////////////////////////////
         ////                    FILTROS DE NAVEGACION                      ////
        ////////////////////////////////////////////////////////////////////-->
        <!--//////////////////////////////////////////////////////////////////////
        ////                         MODAL CARRUSEL                        ////
        ////////////////////////////////////////////////////////////////////-->
        <div class="sticky inset-0">
          <div v-if="carruselModal" class="rounded-lg border max-w-2xl h-69 justify-center absolute  inset-x-0 bg-white mx-auto border-gray-700 shadow-2xl"> 
            <div>
              <button
                @click="carruselModal = false">
                cerrar
              </button>
            </div>
            <div>
              <p>{{ dtcImg.referenceNumber }} Algo</p>
            </div>         
            <div class="justify-center text-center block">            
                <ImagenesCard
                  :plazasValidas="plazasValidas"
                  :infoCard="dtc"
                  > 
                </ImagenesCard>
            </div>
          </div>
        </div>
        <div class="mt-1 mb-1 justify-center sm:block sm:p-1 sm:pr-2 border sm:m-1 shadow-md grid grid-cols">
            <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mt-2 sm:text-xs sm:ml-3">
              <div class="m-3">
                <p class="font-bold sm:text-sm mb-2 sm:text-center">Selecciones la Plaza</p>
                  <select v-model="plazaFiltro" class="w-40 sm:w-full mb-3" type="text">
                    <option disabled value="">Selecionar...</option>     
                    <option v-for="(item, index) in plazasValidas" :value="item.squareCatalogId" :key="index">{{ item.squareName }}</option>                
                  </select>
              </div>
              <div class=" m-3">
                <p class="font-bold mb-2 sm:text-sm sm:text-center">Seleccione una fecha</p>
                <input v-model="fechaFiltro" class="border w-40 sm:w-full" type="date"/>
                <span class="block text-xs text-gray-600">*Fecha de Elaboración</span>
              </div>
              <div class="m-3">
                <p class="font-bold sm:text-sm mb-2 sm:text-center">Escriba la Referencia</p>
                <input v-model="referenciaFiltro" class="border w-40 text-center sm:w-full" placeholder="PM-000000"/>
              </div>   
            </div>
        <!--////////////////////////////////////////////////////////////////////
         ////                    BOTONES DE NAVEGACION                   //////
        ////////////////////////////////////////////////////////////////////-->
            <div class="mt-10 mb-4 text-center">
              <button id="Limpiar" @click="limpiar_filtros" class="w-32 botonIconLimpiar">
                <img src="../../assets/img/escoba.png" class="mr-2" width="25" height="2"/>
                <span>Limpiar</span>
              </button>
              <button id="Buscar" @click="filtro_Dtc" class="w-32 botonIconBuscar">
                <img src="../../assets/img/lupa.png" class="mr-2" width="25" height="2"/>
                <span>Buscar</span>
              </button>
          </div> 
        </div>
    
      <!--////////////////////////////////////////////////////////////////////
      ////                      MODAL CAMBIAR STATUS                   //////
      ////////////////////////////////////////////////////////////////////-->
      <div class="sticky inset-0">
        <div v-if="modalCambiarStatus" class="rounded-lg justify-center absolute inset-x-0 md:w-69 lg:w-69 xl:w-69 mx-auto px-12 py-1 sm:p-2">
          <div class="rounded-lg border bg-white border-gray-700 px-12 py-10 shadow-2xl">
            <p class="text-gray-900 font-thin text-md">Seguro que quieres cambiar el status de la referencia {{ dtcEdit.referenceNumber }}</p>
            <div>
              <div class="mt-5">
                <p class="mb-1 sm:text-sm">Status DTC</p>
                <select v-model="statusEdit" class="w-full" type="text">
                  <option value="">Selecionar...</option>     
                  <option value="1">Inconcluso</option>  
                  <option value="2">Concluido</option>                                                                  
                  <option value="3">Sellado</option>                                                                                                                               
                  <option v-if="tipoUsuario == 10" value="4">GMMEP</option>  
                </select> 
              </div>
              <div class="mt-5">
                <p class="mb-1 sm:text-sm">Motivo del Cambio</p>
                <textarea
                v-model="motivoCambio"
                class="appearance-none block bg-grey-lighter container mx-auto text-grey-darker  border-black rounded-lg py-4 mb-0 h-24 placeholder-gray-500 border"
                placeholder="Motivo del Cambio"
                v-bind:maxlength="limite"
                />
                <span class="text-gray-500">{{ restante }}/300</span>
              </div>
            </div>
            <div class="justify-end flex mt-5">
              <button @click="editar_status_dtc" class="botonIconCrear m-4">Aceptar</button>
              <button @click="modalCambiarStatus = false, statusEdit = '', motivoCambio =''" class="botonIconCancelar m-4">Cancelar</button>
            </div>
          </div>
        </div>
      </div>
        <div class="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto" style="height:450px;">
          <table class="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped">
            <!--/////////////////////////////////////////////////////////////////
            ////                           HEADER TABLA                      ////
            ////////////////////////////////////////////////////////////////////-->
            <thead>
                <tr class="text-md text-gray-400 font-normal bg-blue-800">                
                    <th class="cabeceraTable">Referencia</th>
                    <th class="cabeceraTable">Fecha de Elaboracion</th>
                    <th class="cabeceraTable">Fecha de Siniestro</th>
                    <th class="cabeceraTable">Registro en Sistema</th>
                    <th class="cabeceraTable">Folio</th>
                    <th class="cabeceraTable">N° de Reporte</th>
                    <th class="cabeceraTable">N° de Siniestro</th>
                    <th class="cabeceraTable">Fecha de Falla</th>
                    <th class="cabeceraTable">Fotografias</th>
                    <th class="cabeceraTable" v-if="tipoUsuario == 4 || tipoUsuario == 10">Cambiar Status</th>
                    <th class="cabeceraTable">Descargar</th>
                </tr>
            </thead>
            <!--/////////////////////////////////////////////////////////////////
            ////                          BODY TABLA                          ////
            ////////////////////////////////////////////////////////////////////-->
            <tbody>
                <tr class="h-12 text-gray-900 text-sm text-center" v-for="(item, key) in infoDTC" :key="key">                
                  <td class="cuerpoTable">{{ item.referenceNumber }}</td>
                  <td class="cuerpoTable">{{ item.elaborationDate | formatDate }}</td>
                  <td class="cuerpoTable">{{ item.sinisterDate | formatDate}}</td>
                  <td class="cuerpoTable">{{ item.dateStamp | formatDate}}</td>
                  <td class="cuerpoTable">
                    <input class="text-center border-0 shadow-none" v-model="item.failureNumber" type="text" placeholder="Sin Información" readonly/>
                  </td>
                  <td class="cuerpoTable">
                    <input class="text-center border-0 shadow-none" v-model="item.reportNumber" type="text" placeholder="Sin Información" readonly/>
                  </td>
                  <td class="cuerpoTable">
                    <input class="text-center border-0 shadow-none" v-model="item.sinisterNumber" type="text" placeholder="Sin Información" readonly/>
                  </td>
                  <td class="cuerpoTable">{{ item.failureDate | formatDate }}</td>
                  <td>
                    <div>
                      <button
                      @click="abrirCarrusel(item)"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td class="cuerpoTable" v-if="tipoUsuario == 4 || tipoUsuario == 10">
                    <div>
                      <button 
                        class="botonIconBuscar"
                        @click="abrir_modal_editar(item)">
                        Cambiar Status
                      </button>
                    </div>
                  </td>
                  <td class="cuerpoTable">
                  <!-- <input type="checkbox"> -->
                  <div v-if="tipoUsuario != 8">
                    <button
                        @click="Descargar_PDF(item,2)"
                        class="botonIconBorrarCard mr-2">
                        <img src="../../assets/img/pdf.png" class="mr-2 sm:m-0" width="15" height="15" />
                        <span class="text-xs sm:hidden">Firmado</span>
                    </button>
                    <button
                        v-if="item.statusId >= 3"
                        @click="Descargar_PDF(item,3)"
                        class="botonIconBorrarCard">
                        <img src="../../assets/img/pdf.png" class="mr-2 sm:m-0" width="15" height="15" />
                        <span class="text-xs sm:hidden">Sellado</span>
                    </button>
                  </div>
                  <div v-else>
                    <button
                      @click="Descargar_PDF(item,1)"
                      class="botonIconBorrarCard mr-2">
                      <img src="../../assets/img/pdf.png" class="mr-2 sm:m-0" width="15" height="15" />
                      <span class="text-xs sm:hidden">Sin Firma</span>
                    </button>
                  </div>
                  </td>
                </tr>
            </tbody>
          </table>
        </div>  
      </div>  
    </div>
      
</div>
</template>

<script>
import Axios from "axios";
const API = process.env.VUE_APP_URL_API_PRODUCCION
import Nav from "../../components/Navbar";
import moment from "moment";
import ServiceFiltrosDTC from "../../services/FiltrosDTCServices"
import ServiceReportPDF from "../../services/ReportesPDFService"
//import CardListDTC from "../../components/DTC/CardListaDTC.vue";
import ImagenesCard from "../../components/DTC/ImagenesCard";
//import Carrusel from "../../components/Carrusel";
//import EventBus from "../../services/EventBus.js";
//import Generico from "../../components/Header/HeaderGenerico";

export default {
  name: "ConcentradoDTC",
  components: {
    Nav,
    ImagenesCard,
    //Carrusel
    //Generico
    //CardListDTC,
  },

/////////////////////////////////////////////////////////////////////
////                      DATA                                    ////
/////////////////////////////////////////////////////////////////////
data: function (){
    return {
      plazaFiltro: '',
      infoDTC:[],
      fechaFiltro: '',
      referenciaFiltro: '',
      filtroVista: false,
      modalCambiarStatus: false,
      dtcEdit: {},
      motivoCambio:"",
      statusEdit: "",
      limite:300,
      carruselModal: false,
      dtcImg: {}
    }
  },
/////////////////////////////////////////////////////////////////////
////                       CICLOS DE VIDA                        ////
/////////////////////////////////////////////////////////////////////
beforeMount: function () {
  this.filtroVista = this.$route.name == 'ConcentradoDTC' ? true : false
  this.infoDTC =  this.$store.getters["DTC/getlistaInfoDTC"](this.filtroVista);
  //console.log(this.infoDTC)
  this.tipoUsuario = this.$store.getters['Login/getTypeUser'];
  
  let listaPlazasValias = []
  let todasPlazas = this.$store.getters['Login/getListaPlazas']  
  for(let plaza of todasPlazas){      
      if(this.infoDTC.some(dtc => dtc.squareCatalogId == plaza.squareCatalogId)){
        plaza["referenceSquare"] = this.infoDTC.find(dtc2 => dtc2.squareCatalogId == plaza.squareCatalogId).referenceSquare
        listaPlazasValias.push(plaza)        
      }
  }
  this.plazasValidas = listaPlazasValias   
},
/////////////////////////////////////////////////////////////////////
////                       COMPUTADOS                            ////
/////////////////////////////////////////////////////////////////////
computed:{
    restante(){
        return  this.motivoCambio.length
    }
},
/////////////////////////////////////////////////////////////////////
////                           METODOS                           ////
/////////////////////////////////////////////////////////////////////
methods:{
abrirCarrusel : function (item){
  this.carruselModal = true
  this.dtcImg = item
},
editar_status_dtc: function (){
  let user = this.$store.getters['Login/getUserForDTC']
  //Crea un objeto con los elementos necesarios para hacer un evento post
  let objeActualizado = {
        "ReferenceNumber": this.dtcEdit.referenceNumber,
        "StatusId": parseInt(this.statusEdit),
        "UserId": user.idUser,
        "Comment": this.motivoCambio,
      }
    console.log(objeActualizado)
    if( this.statusEdit != '' && this.motivoCambio != '')
    {
      //Evento post que llama a la api 
    Axios.post(`${API}/Pdf/ActualizarDtcAdministratores/${this.dtcEdit.referenceNumber.split('-')[0]}`, objeActualizado)    
      .then(response => {
        console.log(response)
        this.statusEdit = ''
        this.motivoCambio = ''   
        let info = this.$store.getters['Login/getUserForDTC']  
        this.$store.dispatch('DTC/buscarListaDTC', info)
        this.modalCambiarStatus = false                                
      })
      .catch(Ex => {
        console.log(Ex);
      });
    }
    else
    {
            this.$notify.warning({
          title: "Ups!",
          msg: `NO SE HA LLENADO LOS CAMPOS.`,
          position: "bottom right",
          styles: {
            height: 100,
            width: 500,
          },
        });
    }
},
//Abre el Modal Para editar el status
abrir_modal_editar : function (item){
  this.modalCambiarStatus = true
  //Toma la variable y la iguala al objeto item que trae toda la fila 
  this.dtcEdit = item
},
Descargar_PDF: function (infoDtc, status){
      ServiceReportPDF.generar_pdf_correctivo(infoDtc.referenceNumber, status, false)
      },
filtro_Dtc: async function () {  
      if( this.plazaFiltro != '' || this.fechaFiltro != '' || this.referenciaFiltro != ''){        
        let listaFiltrada = await ServiceFiltrosDTC.filtrarDTC(this.filtroVista, this.plazaFiltro, this.fechaFiltro, this.referenciaFiltro, false)
        console.log(listaFiltrada)
        this.$nextTick().then(() => {      
            this.infoDTC = listaFiltrada            
        }) 
      }
      //Si no ingresa ningún filtro 
      else
      {
        this.$notify.warning({
          title: "Ups!",
          msg: `NO SE HA LLENADO NINGUN CAMPO PARA FILTRAR.`,
          position: "bottom right",
          styles: {
            height: 100,
            width: 500,
          },
        });
      }
  
  },
limpiar_filtros: function() {     
    if(this.plazaFiltro != '' || this.fechaFiltro != '' || this.referenciaFiltro != '')
    {        
        this.modalLoading = true                            
        this.$nextTick().then(() => {             
        this.infoDTC = this.$store.getters["DTC/getlistaInfoDTC"](this.filtroVista);  
        this.fechaFiltro = "";
        this.referenciaFiltro = "";            
        this.plazaFiltro = ""; 
      }) 
    }
    else{
      this.$notify.warning({
          title: "Ups!",
          msg: `NO SE HA LLENADO NINGUN CAMPO.`,
          position: "bottom right",
          styles: {
            height: 100,
            width: 500,
          },
        });
    }      
  }
},
/////////////////////////////////////////////////////////////////////
////                           FILTROS                           ////
/////////////////////////////////////////////////////////////////////
  filters: {
    formatDate: function (value) {
      return moment(value.substring(0, 10)).format("DD/MM/YYYY");
    },
  }, 

};

</script>

<style>

</style>