<template>
    <div class="container mx-auto">
        <!--///////////////////////////////////////////////////////////////////
        ////                          TITULO                            ////
        ////////////////////////////////////////////////////////////////////-->
        <HeaderGenerico :titulo="'Concentrado DTC Facturados e Instalados'" :tipo="'CDTCF'" />
        <div class="rounded-lg shadow-xl sm:mt-3">
          <table class="w-full rounded-lg">
          <thead class="">
            <tr>
              <th class="p-3 text-sm sm:text-xs sm:w-8 text-white font-semibold tracking-wide cabeceraTable rounded-l-lg">Referencia</th>
              <th class="p-3 text-sm sm:text-xs text-white font-semibold tracking-wide cabeceraTable sm:hidden">Usuario</th>
              <th class="p-3 text-sm sm:text-xs sm:w-8 text-white font-semibold tracking-wide cabeceraTable">Tipo de Falla</th>
              <th class="p-3 text-sm sm:text-xs sm:w-8 text-white font-semibold tracking-wide cabeceraTable rounded-r-lg">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="p-3 sm:w-8 text-sm text-gray-700 text-center sm:text-xs">CER-21039</td>
              <td class="p-3 text-sm text-gray-700 text-center sm:text-xs sm:hidden">Luis Emiliano Torres</td>
              <td class="p-3 sm:w-8 text-sm text-gray-700 text-center sm:text-xs">Fin de vida util</td>
              <td class="P-3 sm:w-8 w-50 text-center">
                  <multiselect v-model="selectMulti" @close="acciones_mapper()" placeholder="Seleccione una Accion" label="title" track-by="title" class="multi sm:w-32 sm:h-auto sm:ml-4" :options="opticones_select_acciones()" :option-height="200" :custom-label="customLabel"  :show-labels="false">
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
                        <h1 class="text-center text-4xl font-bold sm:text-2xl">Anexos Generados</h1>
                        <div class="flex justify-center w-full sm:overflow-auto sm:h-60 md:overflow-auto md:h-60 lg:overflow-auto lg:h-60 xl:overflow-auto xl:h-70">
                            <table class="tablaf mt-6">
                                <thead>
                                    <tr class="text-sm text-center text-white trTable sm:text-xs">
                                        <th class="w-24 md:w-34 lg:w-49 xl:w-54 cabeceraTable font-medium sticky top-0">Referencia</th>
                                        <th class="w-24 md:w-34 lg:w-49 xl:w-54 cabeceraTable font-medium sm:hidden sticky top-0">Usuario</th>
                                        <th class="w-24 md:w-34 lg:w-49 xl:w-54 cabeceraTable font-medium sticky top-0">Acciones</th>
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
                      <!--////////////////////////////////////////////////////////////////////
                      ////                        BOTONES MODAL AGREGAR COMP             ////
                      ////////////////////////////////////////////////////////////////////-->    
                      <div class=" flex justify-center mt-8">          
                        <div class="inline-flex">
                            <button @click="botoncancelar_modal()" class="botonIconCancelar font-boton">Cancelar</button>
                        </div>
                      </div>
                    </div>
                </div>
        </div>
    </div>
</template>

<script>

import HeaderGenerico from "../../../components/Header/HeaderGenerico";
import Multiselect from "vue-multiselect";

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
        lista_DTC_Filtrada: [{referenceNumber: 'CER-21039',user:'Emiliano'}],
        showModal: false,     
        selectMulti:'', 
        selectMultiModal:'',              
        }
    },
    /////////////////////////////////////////////////////////////////////
    ////                           METODOS                           ////
    /////////////////////////////////////////////////////////////////////
    methods:{
    acciones_mapper(){     
      console.log(this.selectMulti.title);          
      if(this.selectMulti.title == 'Anexos Generados'){
        this.showModal = true;
        console.log(this.showModal);
      } 
    },
    customLabel ({ title }) {
      return `${title}`
    },
    opticones_select_acciones(){
            const options= [                
            { title: 'Anexos Generados', accionCss: 'terminar', img: '/img/list.png' }, //0
            { title: 'Generar Anexo', accionCss: 'terminar', img: '/img/slide.png' },//1
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
    acciones_mapper_modal(){

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