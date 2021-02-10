<template>
<div class="relative">
    <Nav></Nav>
    <div class="flex justify-center">
        <div class="grid gap-4 grid-cols-1 pl-3 pr-3">                
            <h1 class="text-black text-center text-4xl mt-3 mb-1 sm:mb-1">Concentrado DTC</h1>
        <!--/////////////////////////////////////////////////////////////////
         ////                    FILTROS DE NAVEGACION                      ////
        ////////////////////////////////////////////////////////////////////-->
        <div class="mt-1 mb-5 flex justify-center sm:block sm:p-1 sm:pr-2 border sm:m-1 shadow-md">
            <div class="inline-flex mt-2 sm:text-xs sm:ml-3">
              <div class="m-3">
                <p class="font-bold sm:text-sm mb-5">Selecciones la Plaza</p>
                  <select v-model="plazaFiltro" class="w-full mb-3" type="text">
                    <option disabled value="">Selecionar...</option>     
                    <option v-for="(item, index) in plazasValidas" :value="item.squareCatalogId" :key="index">{{ item.squareName }}</option>                
                  </select>
              </div>
              <div class="m-3">
                <p class="font-bold mb-5 sm:text-sm">Seleccione una fecha</p>
                <input v-model="fechaFiltro" class="border w-40" type="date"/>
                <span class="block text-xs text-gray-600">*Fecha de Elaboración</span>
              </div>
              <div class="m-3">
                <p class="font-bold sm:text-sm mb-5">Escriba la Referencia</p>
                <input v-model="referenciaFiltro" class="border w-40" placeholder="PM-000000"/>
              </div>   
            </div>
        <!--/////////////////////////////////////////////////////////////////
         ////                    BOTONES DE NAVEGACION                   ////
        ////////////////////////////////////////////////////////////////////-->
            <div class="mt-10 text-center">
              <button id="Limpiar" @click="limpiar_filtros" class="w-32 bg-white tracking-wide text-gray-800 font-bold rounded border-b-2 border-red-500 hover:border-red-600 hover:bg-red-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center ml-4 mr-4">
                <img src="../../assets/img/bin.png" class="mr-2" width="25" height="2"/>
                <span>Limpiar</span>
              </button>
            
              <button id="Buscar" @click="filtro_Dtc" class="w-32 bg-white tracking-wide text-gray-800 font-bold rounded border-b-2 border-blue-500 hover:border-blue-600 hover:bg-blue-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                <img src="../../assets/img/lupa.png" class="mr-2" width="25" height="2"/>
                <span>Buscar</span>
              </button>
          </div>
        </div>

        <div class="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative" style="height:550px;">
            <table class="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative">
            <!--/////////////////////////////////////////////////////////////////
            ////                           HEADER TABLA                      ////
            ////////////////////////////////////////////////////////////////////-->
            <thead>
                <tr class="text-md text-gray-400 font-normal bg-blue-800">                
                    <th class="py-2 px-3 sticky top-0 border-b border-gray-200 bg-blue-800">Referencia</th>
                    <th class="py-2 px-3 sticky top-0 border-b border-gray-200 bg-blue-800">Fecha de Elaboracion</th>
                    <th class="py-2 px-3 sticky top-0 border-b border-gray-200 bg-blue-800">Fecha de Siniestro</th>
                    <th class="py-2 px-3 sticky top-0 border-b border-gray-200 bg-blue-800">Registro en Sistema</th>
                    <th class="py-2 px-3 sticky top-0 border-b border-gray-200 bg-blue-800">Folio</th>
                    <th class="py-2 px-3 sticky top-0 border-b border-gray-200 bg-blue-800">N° de Reporte</th>
                    <th class="py-2 px-3 sticky top-0 border-b border-gray-200 bg-blue-800">N° de Siniestro</th>
                    <th class="py-2 px-3 sticky top-0 border-b border-gray-200 bg-blue-800">Fecha de Falla</th>
                    <th class="py-2 px-3 sticky top-0 border-b border-gray-200 bg-blue-800">Acciones</th>
                </tr>
            </thead>
            <!--/////////////////////////////////////////////////////////////////
            ////                          BODY TABLA                          ////
            ////////////////////////////////////////////////////////////////////-->
            <tbody>
                <tr class="h-12 text-gray-900 text-sm text-center" v-for="(item, key) in infoDTC" :key="key">                
                  <td class="border-dashed border-t border-gray-200 px-3">{{ item.referenceNumber }}</td>
                  <td class="border-dashed border-t border-gray-200 px-3">{{ item.elaborationDate | formatDate }}</td>
                  <td class="border-dashed border-t border-gray-200 px-3">{{ item.sinisterDate | formatDate}}</td>
                  <td class="border-dashed border-t border-gray-200 px-3">{{ item.dateStamp | formatDate}}</td>
                  <td class="border-dashed border-t border-gray-200 px-3">
                    <input class="text-center border-0 shadow-none" v-model="item.failureNumber" type="text" placeholder="Sin Información" readonly/>
                  </td>
                  <td class="border-dashed border-t border-gray-200 px-3">
                    <input class="text-center border-0 shadow-none" v-model="item.reportNumber" type="text" placeholder="Sin Información" readonly/>
                  </td>
                  <td class="border-dashed border-t border-gray-200 px-3">
                    <input class="text-center border-0 shadow-none" v-model="item.sinisterNumber" type="text" placeholder="Sin Información" readonly/>
                  </td>
                  <td class="border-dashed border-t border-gray-200 px-3">{{ item.failureDate | formatDate }}</td>
                  <td class="border-dashed border-t border-gray-200 px-3">
                  <!-- <input type="checkbox"> -->
                  <button
                      @click="Mostrar_Mas()"
                      class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 ml-14 rounded inline-flex items-center border-2 border-green-700">
                      <img src="../../assets/img/more.png" class="mr-2 sm:m-0" width="15" height="15" />
                      <span class="text-xs sm:hidden">Más</span>
                  </button>
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

export default {
  name: "EditarComponente",
  components: {
    Nav,
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
    }
  },
/////////////////////////////////////////////////////////////////////
////                       CICLOS DE VIDA                        ////
/////////////////////////////////////////////////////////////////////
beforeMount: function () {
  this.infoDTC =  this.$store.getters["DTC/getlistaInfoDTC"];
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
Mostrar_Mas: function (){
        console.log("Mostar Más")
        this.$router.push({
        path: "/ConcentradoDetallesDTC"
        });
    },
filtro_Dtc: function () {  
      if( this.plazaFiltro != '' || this.fechaFiltro != '' || this.referenciaFiltro != '')
      {
        this.infoDTC  = []
        let _lista_completa  = this.$store.getters["DTC/getlistaInfoDTC"]; 
        let listaFiltrada = _lista_completa  
        //Si filtra por plaza y fecha
        if (this.plazaFiltro != "" && this.fechaFiltro != "" && this.referenciaFiltro != "")
        {
          listaFiltrada = _lista_completa.filter(dtc => dtc.squareCatalogId == this.plazaFiltro)
          let formatFecha = moment(this.fechaFiltro).format("DD/MM/YYYY");
          let newArray = [];
          for (let item of listaFiltrada) {
            if (moment(item.elaborationDate).format("DD/MM/YYYY") == formatFecha) {
              newArray.push(item);
            }
          }
          listaFiltrada = newArray
          newArray = [];
          for (let item of _lista_completa) {          
            if (item.referenceNumber.includes(this.referenciaFiltro.toUpperCase())) {
              newArray.push(item);
            }
          }
          listaFiltrada = newArray
        }
        else if (this.plazaFiltro != "" && this.fechaFiltro != "")
        {
          listaFiltrada = _lista_completa.filter(dtc => dtc.squareCatalogId == this.plazaFiltro)
          let formatFecha = moment(this.fechaFiltro).format("DD/MM/YYYY");
          let newArray = [];
          for (let item of listaFiltrada) {
            if (moment(item.elaborationDate).format("DD/MM/YYYY") == formatFecha) {
              newArray.push(item);
            }
          }
          listaFiltrada = newArray
        }
        //Si filtra por  plaza y referencia
        else if (this.referenciaFiltro != "" && this.plazaFiltro != "") {     
          listaFiltrada = _lista_completa.filter(dtc => dtc.squareCatalogId == this.plazaFiltro)
          let newArray = [];
          for (let item of _lista_completa) {          
            if (item.referenceNumber.includes(this.referenciaFiltro.toUpperCase())) {
              newArray.push(item);
            }
          }
          listaFiltrada = newArray
        }
        //Si filtra solo por la plaza
        else if(this.plazaFiltro != "" && this.referenciaFiltro == "" && this.fechaFiltro == ""){      
          listaFiltrada = _lista_completa.filter(dtc => dtc.squareCatalogId == this.plazaFiltro)
        }
        //Si filtra solo port la fecha
        else if (this.fechaFiltro != "" && this.plazaFiltro == "" && this.referenciaFiltro == "") {    
          let formatFecha = moment(this.fechaFiltro).format("DD/MM/YYYY");
          let newArray = [];
          for (let item of _lista_completa) {
            if (moment(item.elaborationDate).format("DD/MM/YYYY") == formatFecha) {
              newArray.push(item);
            }
          }
          listaFiltrada = newArray   
        }
        //Si filtra solo por la Referencia
        else if (this.referenciaFiltro != "") {     
          let newArray = [];
          for (let item of _lista_completa) {          
            if (item.referenceNumber.includes(this.referenciaFiltro.toUpperCase())) {
              newArray.push(item);
            }
          }
          listaFiltrada = newArray
        }
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
        //let info = this.$store.getters["DTC/getlistaInfoDTC"];
        this.modalLoading = true 
        //this.$store.dispatch('DTC/buscarListaDTC', info)                      
        this.$nextTick().then(() => {             
        this.infoDTC = this.$store.getters["DTC/getlistaInfoDTC"];  
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