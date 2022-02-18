<template>
    <div class="container mx-auto">
        <!--///////////////////////////////////////////////////////////////////
        ////                          TITULO                            ////
        ////////////////////////////////////////////////////////////////////-->
        <HeaderGenerico 
          @limpiar-filtros="limpiar_filtros" 
          @filtrar-dtc="filtro_dtc" 
          @buscar-gmmep="guardar_palabra_busqueda" 
          :titulo="'Concentrado DTC Facturados e Instalados'" 
          :tipo="'CDTCF'" 
        />
        <div class="rounded-lg shadow-xl sm:mt-3 xl:overflow-auto xl:h-75">
          <table class="w-full rounded-lg mt-4">
          <thead class="">
            <tr>
              <th class="p-3 text-sm sm:text-xs sm:w-8 text-white font-semibold tracking-wide cabeceraTable  rounded-l-lg">Referencia</th>
              <th class="p-3 text-sm sm:text-xs text-white font-semibold tracking-wide cabeceraTable sm:hidden">Usuario</th>
              <th class="p-3 text-sm sm:text-xs sm:w-8 text-white font-semibold tracking-wide  cabeceraTable">Tipo de Falla</th>
              <th class="p-3 text-sm sm:text-xs sm:w-8 text-white font-semibold tracking-wide  cabeceraTable rounded-r-lg">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="dtc in lista_DTC_Filtrada" :key="dtc.referenceNumber" :class="{'hidden': dtc.typeFaultId == 0}">
              <td class="p-3 sm:w-8 text-sm text-gray-700 text-center sm:text-xs">{{dtc.referenceNumber}}</td>
              <td class="p-3 text-sm text-gray-700 text-center sm:text-xs sm:hidden">{{dtc.userName}}</td>
              <td class="p-3 sm:w-8 text-sm text-gray-700 text-center sm:text-xs">{{dtc.faultDescription}}</td>
              <td class="P-3 sm:w-8 w-50 text-center">
                  <multiselect v-model="selectMulti" @close="acciones_mapper(dtc)" placeholder="Seleccione una Accion" label="title" track-by="title" class="multi sm:w-32 sm:h-auto sm:ml-4" :options="opticones_select_acciones()" :option-height="200" :custom-label="customLabel"  :show-labels="false">
                    <template slot="option" slot-scope="props">                                                
                      <div class="option__desc">
                      <span class="option__title inline-flex sm:text-xs">
                      <img :src="props.option.img" class="mr-5 sm:w-4 sm:mr-1" width="15" height="15">    
                      {{ props.option.title }}</span>
                      </div>
                    </template>
                  </multiselect>
                </td>
            </tr>
          </tbody>
        </table>
        </div>   
        <!--//////////////////////////////////////////////////////////////////
        ////                         MODAL AGREGAR COMPONENTE            ////
        //////////////////////////////////////////////////////////////////-->
        <div class="sticky inset-0 font-titulo " :class="{'modal-container': showModal}">
                <div v-if="showModal" class="rounded-lg p-2 grid grid-cols-1 content-center h-full">
                    <div class="container mx-auto rounded-lg border bg-white border-gray-400 px-4 py-10">
                      <div class="flex flex-col">
                        <div class="flex flex-row-reverse">
                          <button @click="botoncancelar_modal()" class="p-4 mr-10"><img src="../../../assets/img/cerrarmodal.png" alt="cerrarmodal" width="20" height="25"></button>
                        </div>
                        <div>
                          <h1 class="text-center text-4xl font-bold sm:text-2xl">Anexos Generados</h1>
                        </div>
                      </div>
                        <div class="flex justify-center w-full sm:overflow-auto sm:h-60 md:overflow-auto md:h-60 lg:overflow-auto lg:h-60 xl:overflow-auto xl:h-70">
                            <table class="tablaf mt-6">
                                <thead>
                                    <tr class="text-sm text-center text-white trTable sm:text-xs">
                                        <th class="w-24 md:w-34 lg:w-49 xl:w-54 cabeceraTable font-medium sticky top-0 rounded-l-lg">Referencia</th>
                                        <th class="w-24 md:w-34 lg:w-49 xl:w-54 cabeceraTable font-medium sm:hidden sticky top-0">Usuario</th>
                                        <th class="w-24 md:w-34 lg:w-49 xl:w-54 cabeceraTable font-medium sticky top-0 rounded-r-lg">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                      <td class="p-2 text-center text-xs">CAR-21039-AN-1</td>
                                      <td class="p-2 text-center text-xs sm:hidden">Luis Emiliano Torres</td>
                                      <td>
                                        <multiselect v-model="selectMultiModal" 
                                          @close="acciones_mapper_modal()" 
                                          placeholder="Seleccione una Accion"
                                          label="title"
                                          track-by="title"
                                          class="multi sm:w-32 sm:h-auto sm:ml-4"
                                          :options="opticones_select_acciones_modal()"
                                          :option-height="50" 
                                          :custom-label="customLabel" 
                                          :show-labels="false">
                                        <template slot="option" slot-scope="props">                                                
                                            <div class="option__desc">
                                            <span class="option__title inline-flex sm:text-xs">
                                            <img :src="props.option.img" class="mr-5 sm:w-4 sm:mr-1" width="15" height="15">    
                                            {{ props.option.title }}</span>
                                            </div>
                                          </template>
                                        </multiselect>
                                        </td>
                                      </tr>
                                      <tr>
                                      <td class="p-2 text-center text-xs">CAR-21039-AN-1</td>
                                      <td class="p-2 text-center text-xs sm:hidden">Luis Emiliano Torres</td>
                                      <td>
                                        <multiselect v-model="selectMultiModal" 
                                          @close="acciones_mapper_modal()" 
                                          placeholder="Seleccione una Accion"
                                          label="title"
                                          track-by="title"
                                          class="multi sm:w-32 sm:h-auto sm:ml-4"
                                          :options="opticones_select_acciones_modal()"
                                          :option-height="50" 
                                          :custom-label="customLabel" 
                                          :show-labels="false">
                                        <template slot="option" slot-scope="props">                                                
                                            <div class="option__desc">
                                            <span class="option__title inline-flex sm:text-xs">
                                            <img :src="props.option.img" class="mr-5 sm:w-4 sm:mr-1" width="15" height="15">    
                                            {{ props.option.title }}</span>
                                            </div>
                                          </template>
                                        </multiselect>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td class="p-2 text-center text-xs">CAR-21039-AN-1</td>
                                      <td class="p-2 text-center text-xs sm:hidden">Luis Emiliano Torres</td>
                                      <td>
                                        <multiselect v-model="selectMultiModal" 
                                          @close="acciones_mapper_modal()" 
                                          placeholder="Seleccione una Accion"
                                          label="title"
                                          track-by="title"
                                          class="multi sm:w-32 sm:h-auto sm:ml-4"
                                          :options="opticones_select_acciones_modal()"
                                          :option-height="50" 
                                          :custom-label="customLabel" 
                                          :show-labels="false">
                                        <template slot="option" slot-scope="props">                                                
                                            <div class="option__desc">
                                            <span class="option__title inline-flex sm:text-xs">
                                            <img :src="props.option.img" class="mr-5 sm:w-4 sm:mr-1" width="15" height="15">    
                                            {{ props.option.title }}</span>
                                            </div>
                                          </template>
                                        </multiselect>
                                      </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>  
                    
                    </div>
                </div>
        </div>
        <!--////////////////////////////////////////////////////////////////////
        ////                      MODAL CAMBIAR STATUS                   //////
        ////////////////////////////////////////////////////////////////////-->
        <div class="sticky inset-0" :class="{'modal-container': modalCambiarStatus}">
          <div v-if="modalCambiarStatus" class="rounded-lg justify-center absolute inset-x-0 md:w-69 lg:w-69 xl:w-69 mx-auto px-12 py-1 sm:p-2 mt-48 sm:-mt-32">
            <div class="rounded-lg border bg-white border-gray-700 px-12 py-10 shadow-2xl">
              <p class="text-gray-900 font-thin text-md">Seguro que quieres cambiar el estatus de la referencia <b class="font-bold">{{dtcCambiarestatus.referenceNumber}}</b></p>
              <div>
                <div class="mt-5">
                  <p class="mb-1 sm:text-sm">Estatus DTC</p>
                  <select v-model="statusEdit" class="w-full is_valid" type="text">
                    <option value="">Selecionar...</option>     
                    <option value="1">Inconcluso</option>  
                    <option value="2">Concluido</option>                                                                  
                    <option value="3">Sellado</option>                                                                                                                               
                    <option v-if="tipoUsuario == 10" value="4">GMMEP</option>  
                  </select> 
                </div>
                <div class="mt-5">
                  <p class="mb-1 sm:text-sm">Motivo del Cambio</p>
                  <textarea v-model="motivoCambio" class="appearance-none block bg-grey-lighter container mx-auto text-grey-darker is_valid border-black rounded-lg py-4 mb-0 h-24 placeholder-gray-500 border" placeholder="Motivo del Cambio" v-bind:maxlength="limite"/>
                  <span class="text-gray-500">{{ restante }}/300</span>
                </div>
              </div>
              <div class="justify-center flex mt-5">
                <button  class="botonIconCrear m-4">Aceptar</button>
                <button @click="modalCambiarStatus = false" class="botonIconCancelar m-4">Cancelar</button>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script>

import HeaderGenerico from "../../../components/Header/HeaderGenerico";
import Multiselect from "vue-multiselect";
import ServiceFiltrosDTC from "../../../services/FiltrosDTCServices"
//const API = process.env.VUE_APP_URL_API_PRODUCCION

export default {
    name: "DTCFacturados",
    components:{
        HeaderGenerico,
        Multiselect
    },
    /////////////////////////////////////////////////////////////////////
    ////                      DATA                                   ////
    /////////////////////////////////////////////////////////////////////
    data: function (){
    return {      
        loadingTabla: false,
        lista_DTC_Filtrada: [],
        showModal: false,
        modalCambiarStatus: false,     
        selectMulti:'', 
        selectMultiModal:'',
        infoDTC: [],
        lista_dtc: [],       
        plazasValidas: [],
        dtcCambiarestatus:{},             
        }
    },
    /////////////////////////////////////////////////////////////////////
    ////                       CICLOS DE VIDA                        ////
    /////////////////////////////////////////////////////////////////////
    beforeMount: function () {
      this.filtroVista = undefined
      this.infoDTC =  this.$store.getters["DTC/GET_LISTA_DTC"](this.filtroVista);  
      this.lista_DTC_Filtrada = this.infoDTC
      console.log(this.lista_DTC_Filtrada)
    },
    /////////////////////////////////////////////////////////////////////
    ////                           METODOS                           ////
    /////////////////////////////////////////////////////////////////////
    methods:{
    acciones_mapper(dtc){     
      console.log(this.selectMulti.title);
      console.log(dtc)          
      if(this.selectMulti.title == 'Anexos Generados'){
        this.showModal = true;
        console.log(this.showModal);
        this.selectMulti = '';
      }
      else if(this.selectMulti.title == 'Generar Anexo'){
        if (dtc.typeFaultId === 2) {
          this.$router.push(`/Anexo1A`);
          this.selectMulti = '';
        } else if (dtc.typeFaultId === 3){
          this.$router.push(`/Anexo1B`);
          this.selectMulti = '';
        }
        

      } 
      else if(this.selectMulti.title == 'Cambiar Estatus'){
        this.modalCambiarStatus = true;
        this.dtcCambiarestatus = dtc;
        console.log(this.dtcCambiarestatus);
        this.selectMulti = '';
        console.log(this.modalCambiarStatus);
      } 
    },
    customLabel ({ title }) {
      return `${title}`
    },
    opticones_select_acciones(){
            const options= [                
            { title: 'Anexos Generados', accionCss: 'terminar', img: '/img/list.03b04500.png' }, //0
            { title: 'Generar Anexo', accionCss: 'terminar', img: '/img/slide.44400136.png' },//1
            { title: 'Cambiar Estatus', accionCss: 'editar', img: '/img/flechas.a7d6bd28.png' },//2
            ]
            let filtroOpciones = []
            filtroOpciones.push(options[0])
            filtroOpciones.push(options[1])
            filtroOpciones.push(options[2])
            // if(item.statusId >= 3 && !item.escaneadobool){
            // filtroOpciones.push(options[3])
            // }

            return filtroOpciones
    },
    botoncancelar_modal: function (){ 
    this.selectMulti = "";
    this.showModal = false; 
    document.body.classList.remove("modal-open");
    },
    opticones_select_acciones_modal(){
            const options= [                
            { title: 'Editar', accionCss: 'editar', img: '/img/pencil.04ec78bc.png' }, //0
            ]
            let filtroOpciones = []
            filtroOpciones.push(options[0])
            // if(item.statusId >= 3 && !item.escaneadobool){
            // filtroOpciones.push(options[3])
            // }

            return filtroOpciones
    },
    guardar_palabra_busqueda: function(newPalabra){  
    if (newPalabra != "") {   
      this.lista_DTC_Filtrada = [] 
      setTimeout(async () => {
        let array_filtrado = this.infoDTC.filter(item => {
          return item.referenceNumber.toUpperCase().includes(newPalabra.toUpperCase())
        })       
        this.lista_DTC_Filtrada = array_filtrado;
      },1000)
    }
    else{
      this.lista_DTC_Filtrada = this.infoDTC
    }
  }, 
  filtro_dtc: async function (objFiltro) {     
    if( objFiltro.plazaFiltro != '' || objFiltro.fechaFiltro != '' || objFiltro.referenciaFiltro != ''){      
      this.lista_DTC_Filtrada = []   
      setTimeout(async () => {
        let listaFiltrada = await ServiceFiltrosDTC.filtrarDTC(this.filtroVista, objFiltro.plazaFiltro, objFiltro.fechaFiltro, objFiltro.referenciaFiltro, undefined, false, undefined)    
        this.$nextTick().then(() => {      
            this.lista_DTC_Filtrada = listaFiltrada            
        }) 
      },1000)
    }  
    else{
      this.$notify.warning({
        title: "Ups!",
        msg: `NO SE HA LLENADO NINGUN CAMPO PARA FILTRAR.`,
        position: "bottom right",
        styles: { height: 100, width: 500 },
      });
    }
  },
  limpiar_filtros: function() {             
    this.modalLoading = true                            
    this.$nextTick().then(() => {             
      this.lista_DTC_Filtrada = this.infoDTC
    })           
  },
  }
}
</script>

<style scoped>
.modal-container{
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.5);
}
</style>