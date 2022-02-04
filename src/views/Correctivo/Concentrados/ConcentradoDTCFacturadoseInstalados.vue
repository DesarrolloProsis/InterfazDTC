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
                  <multiselect v-model="selectMulti" @close="acciones_mapper(item)" placeholder="Seleccione una Accion" label="title" track-by="title" class="multi sm:w-32 sm:h-auto sm:ml-4" :options="opticones_select_acciones()" :option-height="200" :custom-label="customLabel"  :show-labels="false">
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
        }
    },
    /////////////////////////////////////////////////////////////////////
    ////                           METODOS                           ////
    /////////////////////////////////////////////////////////////////////
    methods:{
      acciones_mapper(item){                
      if(this.value.title == 'Editar'){
        this.editarUsuario(item)
      }if(this.value.title == 'Deshabilitar'){
        this.borrar_usuario(item)
      }if(this.value.title == 'Habilitar'){
        this.habilitar_usuario(item)
      }if(this.value.title == 'Agregar Plaza'){
        this.infoUser = item
        this.modalAddPlaza = true
      }if(this.value.title == 'Eliminar Plaza'){
        this.plazasUserForDelete = item.plazasLimpias
        this.infoUser = item
        this.modalEliminarPlaza = true
      }
      this.value = ""  
    },
      customLabel ({ title }) {
      return `${title}`
      },
        opticones_select_acciones(){
            const options= [                
            { title: 'Generar anexo 1.A/1.B', accionCss: 'terminar', img: '/img/download.ea0ec6db.png' }, //0
            { title: 'Editar', accionCss: 'terminar', img: '/img/add.36624e63.png' },//1
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
    }
}
</script>
