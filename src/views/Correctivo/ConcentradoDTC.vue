<template>
<div>
    <Nav></Nav>
    <div class="flex justify-center">
        <div class="grid gap-4 grid-cols-1 py-3 px-3">                
        <!-- <Generico :titulo="'CONCENTRADO DTC'" :tipo="'DTC'"></Generico>  -->
        <!--/////////////////////////////////////////////////////////////////////
        ////                         MODAL CARRUSEL                        /////
        ////////////////////////////////////////////////////////////////////-->
        <div class="sticky inset-0">
          <div v-if="carruselModal" class="rounded-lg border max-w-2xl h-69 justify-center absolute inset-x-0 bg-white mx-auto border-gray-700 shadow-2xl">          
            <div class="justify-center text-center block">            
                <Carrusel @cerrar-modal-carrusel="carruselModal = false, arrayImagenesCarrusel = []" :arrayImagenes="arrayImagenesCarrusel"></Carrusel>
            </div>
          </div>
        </div>
        <!--/////////////////////////////////////////////////////////////////////
        /////                    FILTROS DE NAVEGACION                      ////
        ////////////////////////////////////////////////////////////////////-->   
      <HeaderGenerico @limpiar-filtros="limpiar_filtros" @filtrar-dtc="filtro_dtc" :titulo="'Autorizado GMMEP'" :tipo="'DTC'"></HeaderGenerico>       
      <!--////////////////////////////////////////////////////////////////////
      ////                      MODAL CAMBIAR STATUS                   //////
      ////////////////////////////////////////////////////////////////////-->
      <div class="sticky inset-0">
        <div v-if="modalCambiarStatus" class="rounded-lg justify-center absolute inset-x-0 md:w-69 lg:w-69 xl:w-69 mx-auto px-12 py-1 sm:p-2 -mt-10 sm:-mt-32">
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
            <div class="justify-center flex mt-5">
              <button @click="editar_status_dtc" class="botonIconCrear m-4">Aceptar</button>
              <button @click="modalCambiarStatus = false, statusEdit = '', motivoCambio =''" class="botonIconCancelar m-4">Cancelar</button>
            </div>
          </div>
        </div>
      </div>
        <div class="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto sm:mb-24" style="height:450px;">
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
                    <th class="cabeceraTable">PDF</th>
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
                      <button @click="abrirCarrusel(item)" class="botonIconCrear" :class="{'bg-gray-400 hover:bg-gray-400': item.imgbool }" :disabled=" item.imgbool ">
                        <img src="../../assets/img/image-mini.png" class="justify-center" width="15" height="15"/>
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
                        @click="descargar_PDF(item,2)"
                        class="botonIconBorrarCard mr-2">
                        <img src="../../assets/img/pdf-firmado.png" class="mr-2 sm:m-0" width="15" height="15" />
                        <span class="text-xs sm:hidden">Firmado</span>
                    </button>
                    <button
                        v-if="item.statusId >= 3"
                        @click="descargar_PDF(item,3)"
                        class="botonIconBorrarCard" :class="{'hidden': item.escaneadobool  }" :disabled=" item.escaneadobool ">
                        <img src="../../assets/img/pdf-sellado.png" class="mr-2 sm:m-0" width="15" height="15" />
                        <span class="text-xs sm:hidden">Sellado</span>
                    </button>
                    <button
                        v-if="item.statusId >= 3"
                        @click="descargar_PDF(item,3)"
                        class="botonIconBorrarCard" :class="{'hidden': item.escaneadobool != 1 }">
                        <img src="../../assets/img/pdf-sellado.png" class="mr-2 sm:m-0" width="15" height="15" />
                        <span class="text-xs sm:hidden">Subir Sellado</span>
                    </button>
                  </div>
                  <div v-else>
                    <button
                      @click="descargar_PDF(item,1)"
                      class="botonIconBorrarCard mr-2">
                      <img src="../../assets/img/pdf.png" class="mr-2 sm:m-0" width="15" height="15" />
                      <span class="text-xs sm:hidden w-24">Sin Firma</span>
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
import Carrusel from "../../components/Carrusel";
import HeaderGenerico from "../../components/Header/HeaderGenerico";
import CookiesService from '../../services/CookiesService'

export default {
  name: "ConcentradoDTC",
  components: {
    Nav,    
    Carrusel,
    HeaderGenerico
  },

/////////////////////////////////////////////////////////////////////
////                      DATA                                    ////
/////////////////////////////////////////////////////////////////////
data: function (){
    return {      
      infoDTC:[],            
      filtroVista: false,
      modalCambiarStatus: false,
      dtcEdit: {},
      motivoCambio:"",
      statusEdit: "",
      limite:300,
      carruselModal: false,
      dtcImg: {},
      arrayImagenesCarrusel: []
    }
  },
/////////////////////////////////////////////////////////////////////
////                       CICLOS DE VIDA                        ////
/////////////////////////////////////////////////////////////////////
beforeMount: function () {
  this.filtroVista = true
  this.infoDTC =  this.$store.getters["DTC/GET_LISTA_DTC"](this.filtroVista);  
  this.tipoUsuario = this.$store.state.Login.cookiesUser.rollId
  let listaPlazasValias = []
  let todasPlazas = this.$store.state.Login.listaPlazas //this.$store.getters['Login/getListaPlazas']  
  for(let plaza of todasPlazas){      
      if(this.infoDTC.some(dtc => dtc.squareCatalogId == plaza.squareCatalogId)){
        plaza["referenceSquare"] = this.infoDTC.find(dtc2 => dtc2.squareCatalogId == plaza.squareCatalogId).referenceSquare
        listaPlazasValias.push(plaza)        
      }
      console.log(listaPlazasValias)
      return listaPlazasValias
  }
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
abrirCarrusel : async function (item){  
  this.dtcImg = item
  await Axios.get(`${API}/dtcData/EquipoDañado/Images/GetPaths/${item.referenceNumber.split('-')[0]}/${item.referenceNumber}`, CookiesService.obtener_bearer_token())
    .then((response) => {              
        if(response.status != 404){                 
          if(response.data.length > 0){
            let array = response.data.map(imgData => {
              return {
                "fileName": imgData, 
                "image": `${API}/dtcData/EquipoDañado/Images/${item.referenceNumber.split('-')[0]}/${item.referenceNumber}/${imgData}`
              }
            })            
            this.arrayImagenesCarrusel = {
              array_img: array,
              referenceNumber: item.referenceNumber,
            };  
            this.carruselModal = true
          }
          else{
            this.$notify.warning({
            title: "Ups!",
            msg: `SIN FOTOS.`,
            position: "bottom right",
            styles: {
              height: 100,
              width: 500,
            },
          });
        }   
      }                   
    })
    .catch((error) => {   
      if(error.response.status == 401)
        CookiesService.token_no_autorizado()       
    });      
},
editar_status_dtc: function (){
  let user = this.$store.getters['Login/GET_USEER_ID_PLAZA_ID']
  //Crea un objeto con los elementos necesarios para hacer un evento post
  let objeActualizado = {
        "ReferenceNumber": this.dtcEdit.referenceNumber,
        "StatusId": parseInt(this.statusEdit),
        "UserId": user.idUser,
        "Comment": this.motivoCambio,
      }    
    if( this.statusEdit != '' && this.motivoCambio != '')
    {
      //Evento post que llama a la api 
    Axios.post(`${API}/Pdf/ActualizarDtcAdministratores/${this.dtcEdit.referenceNumber.split('-')[0]}`, objeActualizado, CookiesService.obtener_bearer_token())  
      .then(() => {        
        this.statusEdit = ''
        this.motivoCambio = ''   
        let info = this.$store.getters['Login/GET_USEER_ID_PLAZA_ID']  
        this.$store.dispatch('DTC/BUSCAR_LISTA_DTC', info)
        this.modalCambiarStatus = false                                
      })
      .catch(error => {
        if(error.response.status == 401)
            CookiesService.token_no_autorizado()
        console.log(error);
      });
    }
    else{
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
abrir_modal_editar : function (item){
  this.modalCambiarStatus = true
  //Toma la variable y la iguala al objeto item que trae toda la fila 
  this.dtcEdit = item
},
descargar_PDF: function (infoDtc, status){
    ServiceReportPDF.generar_pdf_correctivo(infoDtc.referenceNumber, status, false)
},
filtro_dtc: async function (objFiltro) {   
  if( objFiltro.plazaFiltro != '' || objFiltro.fechaFiltro != '' || objFiltro.referenciaFiltro != ''){        
    let listaFiltrada = await ServiceFiltrosDTC.filtrarDTC(this.filtroVista, objFiltro.plazaFiltro, objFiltro.fechaFiltro, objFiltro.referenciaFiltro, undefined, false)    
    this.$nextTick().then(() => {      
        this.infoDTC = listaFiltrada            
    }) 
  }  
  else{
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
  this.modalLoading = true                            
  this.$nextTick().then(() => {             
    this.infoDTC = this.$store.getters["DTC/GET_LISTA_DTC"](this.filtroVista);              
  })           
},
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