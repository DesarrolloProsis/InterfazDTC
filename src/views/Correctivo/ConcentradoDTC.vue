<template>
<div class="relative">
    <Nav></Nav>
    <div class="flex justify-center">
        <div class="grid gap-4 grid-cols-1 py-3 px-3">                
        <!-- <Generico :titulo="'CONCENTRADO DTC'" :tipo="'DTC'"></Generico>  -->
          <h1 class="text-black text-center text-4xl mt-3 mb-1 sm:mb-1 sm:text-2xl font-bold">Autorizado GMMEP</h1>
        <!--/////////////////////////////////////////////////////////////////
         ////                    FILTROS DE NAVEGACION                      ////
        ////////////////////////////////////////////////////////////////////-->
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
        <div class="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative" style="height:450px;">
            <table class="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative">
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
import Nav from "../../components/Navbar";
import moment from "moment";
import ServiceFiltrosDTC from "../../services/FiltrosDTCServices"
import ServiceReportPDF from "../../services/ReportesPDFService"
//import Generico from "../../components/Header/HeaderGenerico";

export default {
  name: "ConcentradoDTC",
  components: {
    Nav,
    //Generico
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
    }
  },
/////////////////////////////////////////////////////////////////////
////                       CICLOS DE VIDA                        ////
/////////////////////////////////////////////////////////////////////
beforeMount: function () {
  this.filtroVista = this.$route.name == 'ConcentradoDTC' ? true : false
  this.infoDTC =  this.$store.getters["DTC/getlistaInfoDTC"](this.filtroVista);
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
////                           METODOS                           ////
/////////////////////////////////////////////////////////////////////
methods:{
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